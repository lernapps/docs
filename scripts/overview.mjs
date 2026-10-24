#!/usr/bin/env node
// Builds the overview (/docs/overview/): what people get from the platform, which part of the system delivers it,
// and how far it is built. Everything comes from the two models, joined where they meet:
//   platform design (pdt42): experience → steps (transactions, and the services that support them) → channel
//   architecture (arc42):    interface with `x-realises: <channels>` → building block; what an interface does not
//                            deliver yet: `x-missing-<channel>: <text>` for one channel, `x-missing: <text>` for all
// site/overview.yaml holds only headings and the texts that lead into each part, with placeholders the script fills
// from the models; it names no element of a model. The script fails when the models do not fit together, so the
// page cannot drift from them: an interface names a channel that does not exist, or an experience needs a service
// that no interface realises.
//
//   node scripts/overview.mjs <out-dir>   (writes <out-dir>/index.html and <out-dir>/overview.md, the same content)
import { execFile, execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { promisify } from "node:util";
import { parse } from "yaml";

const out = process.argv[2] ?? "_site/overview";
const meta = parse(readFileSync("site/overview.yaml", "utf8"));
const run = promisify(execFile);

// --- the models ---------------------------------------------------------------------------------------------------
const arc = JSON.parse(execFileSync("arc42", ["--dir", "docs/arc42", "get", "--format", "json"], { encoding: "utf8" }));
const arcById = new Map(arc.elements.map((e) => [e.id, e]));
const pdtList = JSON.parse(execFileSync("pdt42", ["--dir", "docs/pdt42", "get", "--format", "json"], { encoding: "utf8" }));
const KINDS = new Set(["platform", "entity", "experience", "service", "transaction", "channel"]);
const pdtById = new Map(
  await Promise.all(
    pdtList
      .filter((e) => KINDS.has(e.kind))
      .map(async (e) => {
        const { stdout } = await run("pdt42", ["--dir", "docs/pdt42", "get", e.id, "--format", "json"]);
        return [e.id, JSON.parse(stdout)];
      }),
  ),
);
const pdtOf = (kind) => [...pdtById.values()].filter((e) => e.kind === kind);
const list = (v) => (Array.isArray(v) ? v : typeof v === "string" ? v.split(",").map((s) => s.trim()) : []).filter(Boolean);
const title = (id) => pdtById.get(id)?.title ?? arcById.get(id)?.title ?? id;

// --- the join: channel → interfaces → building blocks ------------------------------------------------------------
const errors = [];
const interfaces = arc.elements.filter((e) => e.kind === "interface");
const realisedBy = new Map(); // channel id → interfaces
const missingOf = (iface, channelId) => iface.extensions?.[`missing-${channelId}`] ?? iface.extensions?.missing;
for (const i of interfaces) {
  const realises = list(i.extensions?.realises);
  for (const ch of realises) {
    if (pdtById.get(ch)?.kind !== "channel") errors.push(`${i.id}: x-realises names '${ch}', which is no channel of the platform design`);
    else realisedBy.set(ch, [...(realisedBy.get(ch) ?? []), i]);
  }
  for (const key of Object.keys(i.extensions ?? {}).filter((k) => k === "missing" || k.startsWith("missing-"))) {
    if (key === "missing" ? !realises.length : !realises.includes(key.slice("missing-".length))) errors.push(`${i.id}: x-${key} for a channel it does not realise`);
  }
}
const statusOf = (channelId) => {
  const ifs = realisedBy.get(channelId) ?? [];
  if (ifs.length === 0) return "missing";
  return ifs.some((i) => missingOf(i, channelId)) ? "partial" : "built";
};
const experiences = pdtOf("experience");
const inExperience = new Set(experiences.flatMap((x) => list(x.steps)));
for (const x of experiences) {
  for (const id of list(x.steps)) {
    const s = pdtById.get(id);
    if (!s) errors.push(`${x.id}: step '${id}' does not exist`);
    else if (s.kind === "service" && !s.channel) errors.push(`${s.id} (step of ${x.id}) has no channel`);
    else if (s.kind === "service" && statusOf(s.channel) === "missing") errors.push(`${s.id} (step of ${x.id}): no interface realises its channel '${s.channel}'`);
  }
}
if (errors.length) {
  console.error(`overview: the platform design and the architecture do not fit together:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

// --- text from the models --------------------------------------------------------------------------------------------
// Prose as a reader without the models needs it: the first paragraph, links as their text, without the models'
// cross-references such as (KD-21) or (D4).
const prose = (e) =>
  (e?.loc?.prose ?? "")
    .trim()
    .split(/\n\s*\n/)[0]
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\s*\((?:(?:KD-\d+|PP\d|[DEG]\d)(?:,\s*)?)+\)/g, "")
    .replace(/\s*\(`[a-z]+-[a-z0-9-]+`\)/g, "") // (`qs-…`): an id of the model, not text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
const firstSentence = (text) => (text.match(/^.+?[.!?](?=\s|$)/) ?? [text])[0];
const sentence = (text) => (text ? text.charAt(0).toUpperCase() + text.slice(1) + (/[.!?]$/.test(text) ? "" : ".") : "");
const lower = (text) => (/^[A-Z]{2}/.test(text) ? text : text.charAt(0).toLowerCase() + text.slice(1)); // keeps "AI …"
const andList = (items) => (items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`);
const fill = (template, values) => template.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? "");
const job = (bb) => bb.extensions?.job ?? firstSentence(prose(bb)); // x-job: the part's task in one sentence
const pdtUrl = (e) => `../platform-design/#${e.loc.file}:el-${e.id}`;
const arcUrl = (e) => `../architecture/#${basename(e.loc.file)}:el-${e.id}`;

// --- the page as data ----------------------------------------------------------------------------------------------
const serviceOf = (s) => {
  const channel = s.channel ? pdtById.get(s.channel) : null;
  const delivery = channel ? (realisedBy.get(channel.id) ?? []).map((i) => ({ iface: i, block: arcById.get(i.provider), missing: missingOf(i, channel.id) })) : [];
  return { s, channel, status: channel ? statusOf(channel.id) : "missing", delivery };
};
// The steps of an experience in their order; each transaction carries the services of the experience that support it.
// Consecutive steps that the same services support are one entry.
const stepsOf = (x) => {
  const ids = list(x.steps);
  const services = ids.map((id) => pdtById.get(id)).filter((e) => e.kind === "service");
  const placed = new Set();
  const steps = [];
  for (const id of ids) {
    const t = pdtById.get(id);
    if (t.kind !== "transaction") continue;
    const supporting = services.filter((s) => list(s.supports).includes(id));
    supporting.forEach((s) => placed.add(s.id));
    const prev = steps.at(-1);
    const same = prev && supporting.length > 0 && prev.services.length === supporting.length && prev.services.every((v, k) => v.s.id === supporting[k].id);
    if (same) prev.ts.push(t);
    else steps.push({ ts: [t], channel: t.channel ? pdtById.get(t.channel) : null, services: supporting.map(serviceOf) });
  }
  const loose = services.filter((s) => !placed.has(s.id)).map(serviceOf);
  return loose.length ? [{ ts: [], services: loose }, ...steps] : steps;
};
const journeys = experiences.map((x) => ({ x, core: pdtById.get(x["core-entity"]), roles: list(x.roles).map((id) => pdtById.get(id)), steps: stepsOf(x) }));
const journeyServices = [...new Map(journeys.flatMap((j) => j.steps.flatMap((st) => st.services)).map((v) => [v.s.id, v])).values()];

// What the journeys need but the system delivers only in part: per channel, the interfaces that fall short.
const gaps = new Map(); // channel id → { channel, shortfalls: [{ iface, block, missing }], services }
for (const v of journeyServices.filter((v) => v.status === "partial")) {
  const g = gaps.get(v.channel.id) ?? { channel: v.channel, shortfalls: v.delivery.filter((d) => d.missing), services: [] };
  g.services.push(v.s);
  gaps.set(v.channel.id, g);
}
const others = pdtOf("service").filter((s) => !inExperience.has(s.id)).map(serviceOf);
const platform = pdtOf("platform")[0];
const coreRoles = [...new Set([...journeys.flatMap((j) => [j.core, ...j.roles]), ...list(platform.owners).map((id) => pdtById.get(id))])];
const aroundRoles = pdtOf("entity").filter((e) => !coreRoles.includes(e));
const usersOf = (ifaceId) =>
  [...new Set(arc.edges.filter((e) => e.relation === "requires" && e.to === ifaceId).map((e) => e.from))].map((id) => arcById.get(id)).filter(Boolean);
const blocks = arc.elements
  .filter((e) => e.kind === "building-block")
  .sort((a, b) => a.loc.line - b.loc.line) // as chapter 5 orders them
  .map((bb) => {
    const offers = interfaces
      .filter((i) => i.provider === bb.id)
      .map((i) => {
        const users = usersOf(i.id).filter((u) => u.id !== bb.id);
        return {
          i,
          channels: list(i.extensions?.realises).map((id) => pdtById.get(id)),
          parts: users.filter((u) => u.kind === "building-block"),
          outside: users.filter((u) => u.kind === "actor" && u.type === "system"),
        };
      });
    return { bb, offers, delivers: offers.some((o) => o.channels.length) };
  });
// How the parts work together: the runtime scenarios of the architecture that involve at least two parts.
const scenarios = arc.elements
  .filter((e) => e.kind === "runtime-scenario" && list(e.involves).filter((id) => arcById.get(id)?.kind === "building-block").length >= 2)
  .filter((e) => !pdtOf("experience").some((x) => x.title === e.title)) // the journey itself tells it
  .sort((a, b) => a.loc.line - b.loc.line)
  .map((sc) => ({ sc, parts: list(sc.involves).map((id) => arcById.get(id)).filter((e) => e?.kind === "building-block") }));
const builtTitles = journeyServices.filter((v) => v.status === "built").map((v) => `“${v.s.title}”`);
const partialTitles = journeyServices.filter((v) => v.status === "partial").map((v) => `“${v.s.title}”`);
const statusLine = fill(meta.status.line, { built: builtTitles.length, total: journeyServices.length, partialCount: partialTitles.length, partial: andList(partialTitles) });
const closingText = fill(meta.closing.text, { built: builtTitles.length, total: journeyServices.length, partial: andList(partialTitles) });
const example = (() => {
  const st = journeys[0].steps.find((s) => s.ts.length && s.services.length);
  const v = st.services[0];
  const d = v.delivery[0];
  return fill(meta.reading.example, { step: st.ts[0].title, service: v.s.title, channel: v.channel.title, iface: d.iface.title, part: d.block.title });
})();

// --- one renderer, two outputs ---------------------------------------------------------------------------------------
// A line is a list of parts: strings, and links { text, url }. md() renders Markdown, ht() HTML.
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const L = (text, url) => ({ text, url });
const md = (parts) => parts.map((p) => (typeof p === "string" ? p : `[${p.text}](${p.url})`)).join("");
const ht = (parts) => parts.map((p) => (typeof p === "string" ? esc(p) : `<a href="${esc(p.url)}">${esc(p.text)}</a>`)).join("");
const join2 = (items, sep = ", ") => items.flatMap((it, k) => (k ? [sep, it] : [it]));
const linksTo = (els, url) => join2(els.map((e) => L(e.title, url(e))));

// A service as a head and its lines; the second time a service or a channel appears, only a short form.
const makeService = () => {
  const seenServices = new Set();
  const seenChannels = new Set();
  return (v) => {
    const head = [L(v.s.title, pdtUrl(v.s))];
    if (seenServices.has(v.s.id)) return { head, status: v.status, lines: [[sentence(lower(firstSentence(prose(v.s)))), " ", meta.reading.seeAbove]] };
    seenServices.add(v.s.id);
    const forWhom = list(v.s.for).map((id) => pdtById.get(id)).filter(Boolean);
    const lines = [[...(forWhom.length ? ["For ", ...linksTo(forWhom, pdtUrl), ": "] : []), prose(v.s)]];
    if (v.channel && v.status === "missing") lines.push([`${meta.reading.channel} `, L(v.channel.title, pdtUrl(v.channel)), "."]);
    if (v.delivery.length) lines.push([`${meta.reading.deliveredBy} `, ...join2(v.delivery.map(({ iface, block }) => L(`${iface.title} (${block.title})`, arcUrl(iface)))), "."]);
    if (v.status === "missing" && list(v.s.supports).length) lines.push([`${meta.others.wouldSupport} `, ...join2(list(v.s.supports).map((id) => L(title(id), pdtUrl(pdtById.get(id))))), "."]);
    return { head, status: v.status, lines };
  };
};
const stepLabel = (st) => (st.ts.length ? join2(st.ts.map((t) => [L(t.title, pdtUrl(t))]), [" · "]).flat() : [meta.reading.startsFrom]);
const stepHow = (st) => (st.services.length || !st.ts.length || st.channel ? null : [meta.reading.insideApp]);
// Steps an earlier journey already showed, with the same services, are one line that points back to it.
const condense = (journeys) => {
  const shown = new Map(); // transaction id → journey
  return journeys.map((j) => {
    const steps = [];
    for (const st of j.steps) {
      const earlier = st.ts.length && st.ts.every((t) => shown.has(t.id)) ? shown.get(st.ts[0].id) : null;
      const prev = steps.at(-1);
      if (earlier && st.services.every((v) => shown.has(`s:${v.s.id}`))) {
        if (prev?.asIn === earlier) prev.ts.push(...st.ts);
        else steps.push({ asIn: earlier, ts: [...st.ts] });
      } else steps.push(st);
      st.ts.forEach((t) => shown.has(t.id) || shown.set(t.id, j.x));
      st.services.forEach((v) => shown.set(`s:${v.s.id}`, true));
    }
    return { ...j, steps };
  });
};
const shownJourneys = condense(journeys);
const asInLine = (st) => [fill(meta.reading.asIn, { journey: st.asIn.title }), " ", ...join2(st.ts.map((t) => L(t.title, pdtUrl(t))), " · "), "."];
const gapLines = (g) => [
  ...g.shortfalls.map(({ iface, block, missing }) => [L(`${iface.title} (${block.title})`, arcUrl(iface)), `: ${sentence(missing)}`]),
  [`${meta.gaps.affects} `, ...linksTo(g.services, pdtUrl), "."],
];
const outsideSystems = [...new Set(blocks.flatMap((b) => b.offers.flatMap((o) => o.outside)))];

// --- Markdown -------------------------------------------------------------------------------------------------------
{
  const M = [];
  const service = makeService();
  const mdService = (v, indent) => {
    const p = service(v);
    M.push(`${indent}- **${md(p.head)}** — ${meta.status[p.status]}`);
    for (const l of p.lines) M.push(`${indent}  - ${md(l)}`);
  };
  M.push(`# ${meta.title}`, "", meta.lead, "", `> ${meta.narrativeLabel} ${platform.narrative}`, "", statusLine, "");
  M.push(`## ${meta.roles.heading}`, "");
  for (const r of coreRoles) M.push(`- **${md([L(r.title, pdtUrl(r))])}:** ${firstSentence(prose(r))}`);
  M.push("", `## ${meta.parts.heading}`, "", meta.parts.intro, "");
  for (const { bb } of blocks) M.push(`- **${md([L(bb.title, arcUrl(bb))])}:** ${job(bb)}`);
  M.push("");
  M.push(`## ${meta.reading.heading}`, "", meta.reading.intro, "", example, "");
  M.push(`## ${meta.experiences.heading}`, "", meta.experiences.intro, "");
  for (const j of shownJourneys) {
    M.push(`### ${md([L(j.x.title, pdtUrl(j.x))])}`, "", prose(j.x), "");
    M.push(`Mainly for ${md([L(j.core.title, pdtUrl(j.core))])}; also involves ${md(linksTo(j.roles, pdtUrl))}. What they get: ${sentence(j.x["value-proposition"])}`, "");
    for (const st of j.steps) {
      if (st.asIn) {
        M.push(`1. ${md(asInLine(st))}`);
        continue;
      }
      M.push(`1. ${md(stepLabel(st))}`);
      const how = stepHow(st);
      if (how) M.push(`   - ${md(how)}`);
      for (const v of st.services) mdService(v, "   ");
    }
    M.push("");
  }
  M.push(`## ${meta.together.heading}`, "", meta.together.intro, "");
  for (const { sc, parts } of scenarios) M.push(`- **${md([L(sc.title, arcUrl(sc))])}.** ${prose(sc)} ${meta.together.parts} ${md(linksTo(parts, arcUrl))}.`);
  M.push("");
  M.push(`## ${meta.gaps.heading}`, "", meta.gaps.intro, "");
  for (const g of gaps.values()) {
    M.push(`### ${md([L(g.channel.title, pdtUrl(g.channel))])}`, "");
    for (const l of gapLines(g)) M.push(`- ${md(l)}`);
    M.push("");
  }
  M.push(closingText, "");
  M.push(`## ${meta.others.heading}`, "", meta.others.intro, "");
  for (const v of others) mdService(v, "");
  M.push("");
  M.push(`## ${meta.blocks.heading}`, "", meta.blocks.intro, "", `${meta.blocks.outsideIntro}`, "");
  for (const u of outsideSystems) M.push(`- ${md([L(u.title, arcUrl(u))])}: ${lower(u.description?.replace(/\s*\(pdt42[^)]*\)/, "") ?? "")}`);
  M.push("");
  for (const [heading, intro, group] of [
    [meta.blocks.delivering, null, blocks.filter((b) => b.delivers)],
    [meta.blocks.supporting, meta.blocks.supportingIntro, blocks.filter((b) => !b.delivers)],
  ]) {
    M.push(`### ${heading}`, "", ...(intro ? [intro, ""] : []));
    for (const { bb, offers } of group) {
      M.push(`#### ${md([L(bb.title, arcUrl(bb))])}${bb.extensions?.repo ? ` (${md([L(bb.extensions.repo, `https://github.com/${bb.extensions.repo}`)])})` : ""}`, "", prose(bb), "");
      for (const { i, channels, parts, outside } of offers) {
        M.push(`- **${md([L(i.title, arcUrl(i))])}:** ${prose(i)}`);
        if (channels.length) M.push(`  - ${meta.blocks.delivers} ${md(linksTo(channels, pdtUrl))}`);
        if (parts.length) M.push(`  - ${meta.blocks.usedBy} ${md(linksTo(parts, arcUrl))}`);
        if (outside.length) M.push(`  - ${meta.blocks.outside} ${md(linksTo(outside, arcUrl))}`);
      }
      M.push("");
    }
  }
  M.push("---", "", meta.sources.text, "");
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, "overview.md"), `${M.join("\n").replace(/\n{3,}/g, "\n\n")}\n`);
}

// --- HTML -----------------------------------------------------------------------------------------------------------
{
  const service = makeService();
  const badge = (status) =>
    status === "partial"
      ? `<a class="status status-${status}" href="#gaps-h">${esc(meta.status[status])}</a>`
      : `<span class="status status-${status}">${esc(meta.status[status])}</span>`;
  const htmlService = (v) => {
    const p = service(v);
    return `<li class="service"><div class="service-head"><strong>${ht(p.head)}</strong> ${badge(p.status)}</div>${p.lines.map((l) => `<p>${ht(l)}</p>`).join("")}</li>`;
  };
  const journeysHtml = shownJourneys
    .map(
      (j) => `
        <article class="experience" aria-labelledby="${j.x.id}-h">
          <h3 id="${j.x.id}-h"><a href="${esc(pdtUrl(j.x))}">${esc(j.x.title)}</a></h3>
          <p>${esc(prose(j.x))}</p>
          <p class="who">Mainly for ${ht([L(j.core.title, pdtUrl(j.core))])}; also involves ${ht(linksTo(j.roles, pdtUrl))}. <span>What they get: ${esc(sentence(j.x["value-proposition"]))}</span></p>
          <ol class="steps">${j.steps
            .map((st) => {
              if (st.asIn) return `\n            <li class="step as-in">${ht(asInLine(st))}</li>`;
              const how = stepHow(st);
              return `
            <li class="step"><div class="step-label">${ht(stepLabel(st))}</div>${how ? `<p class="how">${ht(how)}</p>` : ""}${st.services.length ? `<ul class="services">${st.services.map(htmlService).join("")}</ul>` : ""}</li>`;
            })
            .join("")}
          </ol>
        </article>`,
    )
    .join("");
  const gapsHtml = [...gaps.values()]
    .map((g) => `<li class="gap"><h3><a href="${esc(pdtUrl(g.channel))}">${esc(g.channel.title)}</a></h3>${gapLines(g).map((l) => `<p>${ht(l)}</p>`).join("")}</li>`)
    .join("");
  const othersHtml = others.map(htmlService).join("");
  const blockHtml = ({ bb, offers }) => `
          <li class="block">
            <h4><a href="${esc(arcUrl(bb))}">${esc(bb.title)}</a></h4>
            ${bb.extensions?.repo ? `<p class="repo"><a href="https://github.com/${esc(bb.extensions.repo)}">${esc(bb.extensions.repo)}</a></p>` : ""}
            <p>${esc(prose(bb))}</p>
            <ul class="offers">${offers
              .map(
                ({ i, channels, parts, outside }) =>
                  `<li><a href="${esc(arcUrl(i))}"><strong>${esc(i.title)}</strong></a>: ${esc(prose(i))}${channels.length ? `<span class="meta"> ${esc(meta.blocks.delivers)} ${ht(linksTo(channels, pdtUrl))}.</span>` : ""}${parts.length ? `<span class="meta"> ${esc(meta.blocks.usedBy)} ${ht(linksTo(parts, arcUrl))}.</span>` : ""}${outside.length ? `<span class="meta"> ${esc(meta.blocks.outside)} ${ht(linksTo(outside, arcUrl))}.</span>` : ""}</li>`,
              )
              .join("")}</ul>
          </li>`;
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta name="color-scheme" content="light dark">
  <title>${esc(meta.title)} – lernapps.net</title>
  <meta name="description" content="${esc(meta.lead)}">
  <link rel="canonical" href="https://lernapps.net/docs/overview/">
  <link rel="stylesheet" href="../stil.css">
  <link rel="stylesheet" href="../start.css">
  <link rel="stylesheet" href="../overview.css">
</head>
<body>
  <main id="main-content" tabindex="-1">
    <header class="hero">
      <div class="wrap">
        <div class="eyebrow">${esc(meta.eyebrow)}</div>
        <h1>${esc(meta.title)}</h1>
        <p>${esc(meta.lead)}</p>
        <blockquote class="narrative"><span>${esc(meta.narrativeLabel)}</span> <a href="${esc(pdtUrl(platform))}">${esc(platform.narrative)}</a></blockquote>
        <p class="status-line">${esc(statusLine)}</p>
      </div>
    </header>
    <div class="wrap overview">
      <section aria-labelledby="roles-h">
        <h2 class="section" id="roles-h">${esc(meta.roles.heading)}</h2>
        <ul class="roles">${coreRoles.map((r) => `<li><a href="${esc(pdtUrl(r))}"><strong>${esc(r.title)}</strong></a><span>${esc(firstSentence(prose(r)))}</span></li>`).join("")}</ul>
      </section>
      <section aria-labelledby="parts-h">
        <h2 class="section" id="parts-h">${esc(meta.parts.heading)}</h2>
        <p class="lead">${esc(meta.parts.intro)}</p>
        <ul class="parts">${blocks.map(({ bb }) => `<li><a href="${esc(arcUrl(bb))}"><strong>${esc(bb.title)}</strong></a><span>${esc(job(bb))}</span></li>`).join("")}</ul>
      </section>
      <section aria-labelledby="reading-h" class="reading">
        <h2 class="section" id="reading-h">${esc(meta.reading.heading)}</h2>
        <p class="lead">${esc(meta.reading.intro)}</p>
        <p class="example">${esc(example)}</p>
      </section>
      <section aria-labelledby="experiences-h">
        <h2 class="section" id="experiences-h">${esc(meta.experiences.heading)}</h2>
        <p class="lead">${esc(meta.experiences.intro)}</p>${journeysHtml}
      </section>
      <section aria-labelledby="together-h">
        <h2 class="section" id="together-h">${esc(meta.together.heading)}</h2>
        <p class="lead">${esc(meta.together.intro)}</p>
        <ul class="together">${scenarios
          .map(({ sc, parts }) => `<li><a href="${esc(arcUrl(sc))}"><strong>${esc(sc.title)}</strong></a><p>${esc(prose(sc))}</p><p class="meta">${esc(meta.together.parts)} ${ht(linksTo(parts, arcUrl))}.</p></li>`)
          .join("")}</ul>
      </section>
      <section aria-labelledby="gaps-h">
        <h2 class="section" id="gaps-h">${esc(meta.gaps.heading)}</h2>
        <p class="lead">${esc(meta.gaps.intro)}</p>
        <ul class="gaps">${gapsHtml}</ul>
        <p class="closing">${esc(closingText)}</p>
      </section>
      <section aria-labelledby="others-h">
        <h2 class="section" id="others-h">${esc(meta.others.heading)}</h2>
        <p class="lead">${esc(meta.others.intro)}</p>
        <ul class="services">${othersHtml}</ul>
      </section>
      <details class="reference">
        <summary><h2 class="section" id="blocks-h">${esc(meta.blocks.heading)}</h2></summary>
        <p class="lead">${esc(meta.blocks.intro)}</p>
        <p class="lead">${esc(meta.blocks.outsideIntro)}</p>
        <ul class="outside">${outsideSystems.map((u) => `<li><a href="${esc(arcUrl(u))}">${esc(u.title)}</a>: ${esc(lower(u.description?.replace(/\s*\(pdt42[^)]*\)/, "") ?? ""))}</li>`).join("")}</ul>
        <h3 class="group">${esc(meta.blocks.delivering)}</h3>
        <ul class="blocks">${blocks.filter((b) => b.delivers).map(blockHtml).join("")}
        </ul>
        <h3 class="group">${esc(meta.blocks.supporting)}</h3>
        <p class="lead">${esc(meta.blocks.supportingIntro)}</p>
        <ul class="blocks">${blocks.filter((b) => !b.delivers).map(blockHtml).join("")}
        </ul>
      </details>
      <footer class="sources">
        <p>${esc(meta.sources.text)} <a href="../platform-design/">Platform design</a> · <a href="../architecture/">Architecture</a> · <a href="overview.md">This page as text</a></p>
      </footer>
    </div>
  </main>
</body>
</html>
`;
  writeFileSync(join(out, "index.html"), html);
}
console.log(`overview: ${journeys.length} experiences, ${others.length} further services, ${blocks.length} building blocks, ${gaps.size} gaps → ${out}/`);
