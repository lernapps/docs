#!/usr/bin/env node
// Builds the overview (/docs/overview/): the platform as it is meant to be, what people get from it and which part
// of the system delivers it. Everything comes from the two models, joined where they meet:
//   platform design (pdt42): experience → steps (transactions, and the services that support them) → channel
//   architecture (arc42):    interface with `x-realises: <channels>` → building block; what an interface does not
//                            deliver yet: `x-missing-<channel>: <text>` for one channel, `x-missing: <text>` for all
// Where an interface does not deliver yet, the page marks it in place, as a dashed block. Services no journey uses
// are ideas, listed at the end with the issue their prose links to.
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
const experiences = pdtOf("experience");
const inExperience = new Set(experiences.flatMap((x) => list(x.steps)));
for (const x of experiences) {
  for (const id of list(x.steps)) {
    const s = pdtById.get(id);
    if (!s) errors.push(`${x.id}: step '${id}' does not exist`);
    else if (s.kind === "service" && !s.channel) errors.push(`${s.id} (step of ${x.id}) has no channel`);
    else if (s.kind === "service" && !realisedBy.has(s.channel)) errors.push(`${s.id} (step of ${x.id}): no interface realises its channel '${s.channel}'`);
  }
}
if (errors.length) {
  console.error(`overview: the platform design and the architecture do not fit together:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

// --- text from the models --------------------------------------------------------------------------------------------
// Prose as a reader without the models needs it: the first paragraph, links as their text, without the models'
// cross-references such as (KD-21), (D4) or (`qs-…`).
const prose = (e) =>
  (e?.loc?.prose ?? "")
    .trim()
    .split(/\n\s*\n/)[0]
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\s*\((?:(?:KD-\d+|PP\d|[DEG]\d)(?:,\s*)?)+\)/g, "")
    .replace(/\s*\(`[a-z]+-[a-z0-9-]+`\)/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
const issuesOf = (e) => [...(e?.loc?.prose ?? "").matchAll(/\[([^\]]+)\]\((https:\/\/github\.com\/[^)]+\/issues\/\d+)\)/g)].map((m) => ({ text: m[1], url: m[2] }));
const firstSentence = (text) => (text.match(/^.+?[.!?](?=\s|$)/) ?? [text])[0];
const sentence = (text) => (text ? text.charAt(0).toUpperCase() + text.slice(1) + (/[.!?]$/.test(text) ? "" : ".") : "");
const lower = (text) => (/^[A-Z]{2}/.test(text) ? text : text.charAt(0).toLowerCase() + text.slice(1)); // keeps "AI …"
const fill = (template, values) => template.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? "");
const job = (bb) => bb.extensions?.job ?? firstSentence(prose(bb)); // x-job: the part's task in one sentence
const pdtUrl = (e) => `../platform-design/#${e.loc.file}:el-${e.id}`;
const arcUrl = (e) => `../architecture/#${basename(e.loc.file)}:el-${e.id}`;

// --- the page as data ----------------------------------------------------------------------------------------------
const serviceOf = (s) => {
  const channel = s.channel ? pdtById.get(s.channel) : null;
  const delivery = channel ? (realisedBy.get(channel.id) ?? []).map((i) => ({ iface: i, block: arcById.get(i.provider), missing: missingOf(i, channel.id) })) : [];
  return { s, channel, delivery };
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
// The trailing steps that the journey's own role receives (the "hear back" of a journey) are one entry from that
// role's point of view: what it gets back.
const getsBack = (x, steps) => {
  let k = steps.length;
  while (k > 0 && steps[k - 1].ts.length && steps[k - 1].ts.every((t) => t.to === x["core-entity"])) k--;
  if (k === steps.length) return steps;
  const back = steps.slice(k);
  const services = [...new Map(back.flatMap((st) => st.services).map((v) => [v.s.id, v])).values()];
  return [...steps.slice(0, k), { back: true, ts: back.flatMap((st) => st.ts), services }];
};
const journeys = experiences.map((x) => ({ x, core: pdtById.get(x["core-entity"]), roles: list(x.roles).map((id) => pdtById.get(id)), steps: getsBack(x, stepsOf(x)) }));
// Steps an earlier journey already showed, with the same services, are one line that points back to it.
const shownJourneys = (() => {
  const shown = new Map(); // transaction id → journey
  const seenServices = new Set();
  return journeys.map((j) => {
    const steps = [];
    for (const st of j.steps) {
      const earlier = !st.back && st.ts.length && st.ts.every((t) => shown.has(t.id)) ? shown.get(st.ts[0].id) : null;
      const prev = steps.at(-1);
      if (earlier && st.services.every((v) => seenServices.has(v.s.id))) {
        if (prev?.asIn === earlier) prev.ts.push(...st.ts);
        else steps.push({ asIn: earlier, ts: [...st.ts] });
      } else steps.push(st);
      st.ts.forEach((t) => shown.has(t.id) || shown.set(t.id, j.x));
      st.services.forEach((v) => seenServices.add(v.s.id));
    }
    return { ...j, steps };
  });
})();
const ideas = pdtOf("service").filter((s) => !inExperience.has(s.id)).map(serviceOf);
const platform = pdtOf("platform")[0];
const roles = [...new Set([...journeys.flatMap((j) => [j.core, ...j.roles]), ...list(platform.owners).map((id) => pdtById.get(id))])];
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
          services: pdtOf("service").filter((sv) => list(i.extensions?.realises).includes(sv.channel)),
          notYet: list(i.extensions?.realises).map((ch) => missingOf(i, ch)).filter((m, k, all) => m && all.indexOf(m) === k),
          parts: users.filter((u) => u.kind === "building-block"),
          outside: users.filter((u) => u.kind === "actor" && u.type === "system"),
        };
      });
    return { bb, offers, delivers: offers.some((o) => o.channels.length) };
  });
// Where each part can be found: its addresses under lernapps.net (deployment view) and its repository.
const addressesOf = (bb) =>
  arc.elements.filter((e) => e.kind === "deployment-node" && e.parent && arcById.get(e.parent)?.type === "environment" && /lernapps\.net/.test(e.title) && list(e.hosts).includes(bb.id)).map((e) => e.title);
const outsideSystems = [...new Set(blocks.flatMap((b) => b.offers.flatMap((o) => o.outside)))];
// How the parts work together: the runtime scenarios of the architecture that involve at least two parts; a
// scenario named like a journey is left out, the journey itself tells it.
const scenarios = arc.elements
  .filter((e) => e.kind === "runtime-scenario" && list(e.involves).filter((id) => arcById.get(id)?.kind === "building-block").length >= 2)
  .filter((e) => !experiences.some((x) => x.title === e.title))
  .sort((a, b) => a.loc.line - b.loc.line)
  .map((sc) => ({ sc, parts: list(sc.involves).map((id) => arcById.get(id)).filter((e) => e?.kind === "building-block") }));
const example = (() => {
  const st = journeys[0].steps.find((s) => s.ts.length && s.services.length);
  const v = st.services[0];
  const d = v.delivery[0];
  return fill(meta.reading.example, { step: st.ts[0].title, service: v.s.title, iface: d.iface.title, part: d.block.title });
})();

// --- one renderer, two outputs ---------------------------------------------------------------------------------------
// A line is a list of parts: strings, and links { text, url }; a line with { notYet: true } is a dashed block.
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const L = (text, url) => ({ text, url });
const md = (parts) => parts.map((p) => (typeof p === "string" ? p : `[${p.text}](${p.url})`)).join("");
const ht = (parts) => parts.map((p) => (typeof p === "string" ? esc(p) : `<a href="${esc(p.url)}">${esc(p.text)}</a>`)).join("");
const join2 = (items, sep = ", ") => items.flatMap((it, k) => (k ? [sep, it] : [it]));
const linksTo = (els, url) => join2(els.map((e) => L(e.title, url(e))));
const names = (els) => els.map((e) => e.title).join(", "); // inside the journeys: names, not links

// A service as a head and its lines; the second time a service appears, only a short form. An interface that does
// not deliver its part yet becomes a dashed line.
const makeService = () => {
  const seen = new Set();
  return (v, { idea = false } = {}) => {
    const head = [v.s.title];
    if (seen.has(v.s.id)) return { head, lines: [{ parts: [sentence(lower(firstSentence(prose(v.s)))), " ", meta.reading.seeAbove] }] };
    seen.add(v.s.id);
    const forWhom = list(v.s.for).map((id) => pdtById.get(id)).filter(Boolean);
    const lines = [{ parts: [...(forWhom.length ? [`For ${forWhom.map((r) => lower(r.title)).join(", ")}: `] : []), prose(v.s)] }];
    const done = v.delivery.filter((d) => !d.missing);
    if (done.length) lines.push({ parts: [`${meta.reading.deliveredBy} ${done.map(({ iface, block }) => `${iface.title} (${block.title})`).join(", ")}.`] });
    for (const { iface, block, missing } of v.delivery.filter((d) => d.missing))
      lines.push({ notYet: true, parts: [`${meta.notYet.label} ${iface.title} (${block.title}): ${sentence(missing)}`] });
    if (idea) {
      if (list(v.s.supports).length) lines.push({ parts: [`${meta.ideas.wouldSupport} ${list(v.s.supports).map(title).join(", ")}.`] });
      const issues = issuesOf(v.s);
      if (issues.length) lines.push({ parts: [`${meta.ideas.issue} `, ...join2(issues.map((i) => L(i.text, i.url))), "."] });
    }
    return { head, lines };
  };
};
const stepLabel = (st) =>
  st.back
    ? [`${fill(meta.reading.getsBack, { role: lower(title(st.ts[0].to)) })} ${[...new Set(st.ts.map((t) => lower(t["value-unit"] ?? t.title)))].join("; ")}.`]
    : st.ts.length
      ? [st.ts.map((t) => t.title).join(" · ")]
      : [meta.reading.startsFrom];
const title = (id) => pdtById.get(id)?.title ?? id;
const outsideLine = (u) => `${u.title}: ${lower(u.description?.replace(/\s*\(pdt42[^)]*\)/, "") ?? "")}`;
const siteOf = (bb) => ({ addresses: addressesOf(bb), repo: bb.extensions?.repo });
const stepHow = (st) => (st.services.length || !st.ts.length || st.channel ? null : [meta.reading.insideApp]);
const asInLine = (st) => [`${fill(meta.reading.asIn, { journey: st.asIn.title })} ${st.ts.map((t) => t.title).join(" · ")}.`];

// --- Markdown -------------------------------------------------------------------------------------------------------
{
  const M = [];
  const service = makeService();
  const mdService = (v, indent, opts) => {
    const p = service(v, opts);
    M.push(`${indent}- **${md(p.head)}**`);
    for (const l of p.lines) M.push(`${indent}  - ${l.notYet ? "┆ " : ""}${md(l.parts)}`);
  };
  M.push(`# ${meta.title}`, "", meta.lead, "", `> ${meta.narrativeLabel} ${platform.narrative}`, "", meta.guide.heading, "");
  for (const [, head, why] of meta.guide.items) M.push(`- **${head}:** ${why}`);
  M.push("", `## ${meta.roles.heading}`, "", meta.roles.intro, "");
  for (const r of roles) M.push(`- **${r.title}:** ${firstSentence(prose(r))}`);
  M.push("", meta.roles.outsideIntro, "");
  for (const u of outsideSystems) M.push(`- ${outsideLine(u)}`);
  M.push("", `## ${meta.parts.heading}`, "", meta.parts.intro, "");
  for (const { bb } of blocks) {
    const { addresses, repo } = siteOf(bb);
    const where = [
      addresses.length ? `${meta.parts.address} ${addresses.map((a) => `[${a}](https://${a}/)`).join(", ")}` : meta.parts.noAddress,
      repo ? `${meta.parts.repo} [${repo}](https://github.com/${repo})` : null,
    ].filter(Boolean);
    M.push(`- **${md([L(bb.title, arcUrl(bb))])}:** ${job(bb)} ${where.join(" · ")}`);
  }
  M.push("", `## ${meta.reading.heading}`, "", meta.reading.intro, "", example, "", meta.notYet.explained, "");
  M.push(`## ${meta.experiences.heading}`, "", meta.experiences.intro, "");
  for (const j of shownJourneys) {
    M.push(`### ${md([L(j.x.title, pdtUrl(j.x))])}`, "", prose(j.x), "");
    M.push(`Mainly for ${lower(j.core.title)}; also involves ${names(j.roles.map((r) => ({ title: lower(r.title) })))}. What they get: ${sentence(j.x["value-proposition"])}`, "");
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
  M.push("", `## ${meta.ideas.heading}`, "", meta.ideas.intro, "");
  for (const v of ideas) mdService(v, "", { idea: true });
  M.push("", `## ${meta.blocks.heading}`, "", meta.blocks.intro, "");
  for (const [heading, intro, group] of [
    [meta.blocks.delivering, null, blocks.filter((b) => b.delivers)],
    [meta.blocks.supporting, meta.blocks.supportingIntro, blocks.filter((b) => !b.delivers)],
  ]) {
    M.push(`### ${heading}`, "", ...(intro ? [intro, ""] : []));
    for (const { bb, offers } of group) {
      M.push(`#### ${md([L(bb.title, arcUrl(bb))])}${bb.extensions?.repo ? ` (${md([L(bb.extensions.repo, `https://github.com/${bb.extensions.repo}`)])})` : ""}`, "", prose(bb), "");
      for (const { i, services, notYet, parts, outside } of offers) {
        M.push(`- **${i.title}:** ${prose(i)}`);
        if (services.length) M.push(`  - ${meta.blocks.delivers} ${names(services)}`);
        for (const m of notYet) M.push(`  - ┆ ${meta.notYet.label} ${sentence(m)}`);
        if (parts.length) M.push(`  - ${meta.blocks.usedBy} ${names(parts)}`);
        if (outside.length) M.push(`  - ${meta.blocks.outside} ${names(outside)}`);
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
  const htmlService = (v, opts) => {
    const p = service(v, opts);
    return `<li class="service${opts?.idea ? " idea" : ""}"><div class="service-head"><strong>${ht(p.head)}</strong></div>${p.lines
      .map((l) => (l.notYet ? `<p class="not-yet">${ht(l.parts)}</p>` : `<p>${ht(l.parts)}</p>`))
      .join("")}</li>`;
  };
  const journeysHtml = shownJourneys
    .map(
      (j) => `
        <article class="experience" aria-labelledby="${j.x.id}-h">
          <h3 id="${j.x.id}-h"><a href="${esc(pdtUrl(j.x))}">${esc(j.x.title)}</a></h3>
          <p>${esc(prose(j.x))}</p>
          <p class="who">Mainly for ${esc(lower(j.core.title))}; also involves ${esc(names(j.roles.map((r) => ({ title: lower(r.title) }))))}. <span>What they get: ${esc(sentence(j.x["value-proposition"]))}</span></p>
          <ol class="steps">${j.steps
            .map((st) => {
              if (st.asIn) return `\n            <li class="step as-in">${ht(asInLine(st))}</li>`;
              const how = stepHow(st);
              return `
            <li class="step"><div class="step-label">${ht(stepLabel(st))}</div>${how ? `<p class="how">${ht(how)}</p>` : ""}${st.services.length ? `<ul class="services">${st.services.map((v) => htmlService(v)).join("")}</ul>` : ""}</li>`;
            })
            .join("")}
          </ol>
        </article>`,
    )
    .join("");
  const ideasHtml = ideas.map((v) => htmlService(v, { idea: true })).join("");
  const blockHtml = ({ bb, offers }) => `
          <li class="block">
            <h4><a href="${esc(arcUrl(bb))}">${esc(bb.title)}</a></h4>
            ${bb.extensions?.repo ? `<p class="repo"><a href="https://github.com/${esc(bb.extensions.repo)}">${esc(bb.extensions.repo)}</a></p>` : ""}
            <p>${esc(prose(bb))}</p>
            <ul class="offers">${offers
              .map(
                ({ i, services, notYet, parts, outside }) =>
                  `<li><strong>${esc(i.title)}</strong>: ${esc(prose(i))}${services.length ? `<span class="meta"> ${esc(meta.blocks.delivers)} ${esc(names(services))}.</span>` : ""}${notYet.map((m) => `<span class="not-yet">${esc(meta.notYet.label)} ${esc(sentence(m))}</span>`).join("")}${parts.length ? `<span class="meta"> ${esc(meta.blocks.usedBy)} ${esc(names(parts))}.</span>` : ""}${outside.length ? `<span class="meta"> ${esc(meta.blocks.outside)} ${esc(names(outside))}.</span>` : ""}</li>`,
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
        <nav class="guide" aria-label="${esc(meta.guide.heading)}"><span>${esc(meta.guide.heading)}</span><ul>${meta.guide.items.map(([id, head, why]) => `<li><a href="#${id}">${esc(head)}</a> – ${esc(why)}</li>`).join("")}</ul></nav>
      </div>
    </header>
    <div class="wrap overview">
      <section aria-labelledby="roles-h">
        <h2 class="section" id="roles-h">${esc(meta.roles.heading)}</h2>
        <p class="lead">${esc(meta.roles.intro)}</p>
        <ul class="roles">${roles.map((r) => `<li><strong>${esc(r.title)}</strong><span>${esc(firstSentence(prose(r)))}</span></li>`).join("")}</ul>
        <p class="lead around">${esc(meta.roles.outsideIntro)}</p>
        <ul class="outside">${outsideSystems.map((u) => `<li>${esc(outsideLine(u))}</li>`).join("")}</ul>
      </section>
      <section aria-labelledby="parts-h">
        <h2 class="section" id="parts-h">${esc(meta.parts.heading)}</h2>
        <p class="lead">${esc(meta.parts.intro)}</p>
        <ul class="parts">${blocks
          .map(({ bb }) => {
            const { addresses, repo } = siteOf(bb);
            const where = addresses.length ? `${esc(meta.parts.address)} ${addresses.map((a) => `<a href="https://${esc(a)}/">${esc(a)}</a>`).join(", ")}` : esc(meta.parts.noAddress);
            return `<li><a href="${esc(arcUrl(bb))}"><strong>${esc(bb.title)}</strong></a><span>${esc(job(bb))}</span><span class="where">${where}</span>${repo ? `<span class="where">${esc(meta.parts.repo)} <a href="https://github.com/${esc(repo)}">${esc(repo)}</a></span>` : ""}</li>`;
          })
          .join("")}</ul>
      </section>
      <section aria-labelledby="reading-h" class="reading">
        <h2 class="section" id="reading-h">${esc(meta.reading.heading)}</h2>
        <p class="lead">${esc(meta.reading.intro)}</p>
        <p class="example">${esc(example)}</p>
        <p class="not-yet">${esc(meta.notYet.explained)}</p>
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
      <section aria-labelledby="ideas-h">
        <h2 class="section" id="ideas-h">${esc(meta.ideas.heading)}</h2>
        <p class="lead">${esc(meta.ideas.intro)}</p>
        <ul class="services ideas">${ideasHtml}</ul>
      </section>
      <details class="reference">
        <summary><h2 class="section" id="blocks-h">${esc(meta.blocks.heading)}</h2></summary>
        <p class="lead">${esc(meta.blocks.intro)}</p>
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
console.log(`overview: ${journeys.length} experiences, ${ideas.length} ideas, ${blocks.length} building blocks → ${out}/`);
