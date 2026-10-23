#!/usr/bin/env node
// Builds the overview (/docs/overview/): what people get from the platform, which part of the system delivers it,
// and how far it is built. Everything comes from the two models, joined where they meet:
//   platform design (pdt42): experience → steps (transactions, and the services that support them) → channel
//   architecture (arc42):    interface with `x-realises: <channels>` (and `x-missing: <what is not there yet>`)
//                            → building block, and who uses the interface (building blocks, external systems)
// site/overview.yaml holds only the headings and lead texts. The script fails when the models do not fit together,
// so the page cannot drift from them: an interface names a channel that does not exist, or an experience needs a
// service that no interface realises.
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
for (const i of interfaces) {
  for (const ch of list(i.extensions?.realises)) {
    if (pdtById.get(ch)?.kind !== "channel") errors.push(`${i.id}: x-realises names '${ch}', which is no channel of the platform design`);
    else realisedBy.set(ch, [...(realisedBy.get(ch) ?? []), i]);
  }
  if (i.extensions?.missing && !i.extensions?.realises) errors.push(`${i.id}: x-missing without x-realises`);
}
const statusOf = (channelId) => {
  const ifs = realisedBy.get(channelId) ?? [];
  if (ifs.length === 0) return "missing";
  return ifs.some((i) => i.extensions?.missing) ? "partial" : "built";
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
    .replace(/\s+/g, " ")
    .trim();
const firstSentence = (text) => (text.match(/^.+?[.!?](?=\s|$)/) ?? [text])[0];
const sentence = (text) => (text ? text.charAt(0).toUpperCase() + text.slice(1) + (/[.!?]$/.test(text) ? "" : ".") : "");
const pdtUrl = (e) => `../platform-design/#${e.loc.file}:el-${e.id}`;
const arcUrl = (e) => `../architecture/#${basename(e.loc.file)}:el-${e.id}`;

// --- the page as data ----------------------------------------------------------------------------------------------
const serviceOf = (s) => {
  const channel = s.channel ? pdtById.get(s.channel) : null;
  const delivery = channel ? (realisedBy.get(channel.id) ?? []).map((i) => ({ iface: i, block: arcById.get(i.provider) })) : [];
  const missing = delivery.map(({ iface }) => iface.extensions?.missing).filter(Boolean);
  return { s, channel, status: channel ? statusOf(channel.id) : "missing", delivery, missing };
};
// The steps of an experience in their order; each transaction carries the services of the experience that support it.
const stepsOf = (x) => {
  const ids = list(x.steps);
  const services = ids.map((id) => pdtById.get(id)).filter((e) => e.kind === "service");
  const placed = new Set();
  const steps = [];
  for (const id of ids) {
    const e = pdtById.get(id);
    if (e.kind !== "transaction") continue;
    const supporting = services.filter((s) => list(s.supports).includes(id));
    supporting.forEach((s) => placed.add(s.id));
    const prev = steps.at(-1);
    const same = (a, b) => a.length > 0 && a.length === b.length && a.every((x, k) => x.s.id === b[k].id);
    // Consecutive steps that the same services support are one entry: "Thank the creator · Give feedback".
    if (prev && same(prev.services, supporting)) prev.ts.push(e);
    else steps.push({ t: e, ts: [e], channel: e.channel ? pdtById.get(e.channel) : null, services: supporting.map(serviceOf) });
  }
  // Services that support no transaction of this experience come first, as what the experience starts from.
  const loose = services.filter((s) => !placed.has(s.id)).map(serviceOf);
  return loose.length ? [{ t: null, services: loose }, ...steps] : steps;
};
const journeys = experiences.map((x) => ({
  x,
  core: pdtById.get(x["core-entity"]),
  roles: list(x.roles).map((id) => pdtById.get(id)),
  steps: stepsOf(x),
}));
// What the journeys need but the system delivers only in part: one entry per interface that says what it is missing,
// with the services of the journeys that depend on it.
const gaps = new Map(); // interface id → { iface, block, text, services }
for (const v of journeys.flatMap((j) => j.steps.flatMap((st) => st.services))) {
  for (const { iface, block } of v.delivery) {
    if (!iface.extensions?.missing) continue;
    const g = gaps.get(iface.id) ?? { iface, block, text: iface.extensions.missing, services: [] };
    if (!g.services.some((s) => s.id === v.s.id)) g.services.push(v.s);
    gaps.set(iface.id, g);
  }
}
const others = pdtOf("service").filter((s) => !inExperience.has(s.id)).map(serviceOf);
const inJourneys = [...new Set(journeys.flatMap((j) => [j.core, ...j.roles]))];
const roles = [...inJourneys, ...pdtOf("entity").filter((e) => !inJourneys.includes(e))];
const usersOf = (ifaceIds) =>
  [...new Set(arc.edges.filter((e) => e.relation === "requires" && ifaceIds.includes(e.to)).map((e) => e.from))]
    .map((id) => arcById.get(id))
    .filter((e) => e && (e.kind === "building-block" || (e.kind === "actor" && e.type === "system")));
const blocks = arc.elements
  .filter((e) => e.kind === "building-block")
  .map((bb) => {
    const own = interfaces.filter((i) => i.provider === bb.id);
    const channels = [...new Set(own.flatMap((i) => list(i.extensions?.realises)))].map((id) => pdtById.get(id));
    const offers = own.map((i) => {
      const all = usersOf([i.id]).filter((u) => u.id !== bb.id);
      return { i, users: all.filter((u) => u.kind === "building-block"), outside: all.filter((u) => u.kind === "actor") };
    });
    return { bb, offers, channels };
  });
const delivering = blocks.filter((b) => b.channels.length);
const supporting = blocks.filter((b) => !b.channels.length);
const platform = pdtOf("platform")[0];

// --- one renderer, two outputs ---------------------------------------------------------------------------------------
// Text with links: [text, url] pairs; md renders them as Markdown, html as anchors.
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const L = (text, url) => ({ text, url });
const md = (parts) => parts.map((p) => (typeof p === "string" ? p : p.url ? `[${p.text}](${p.url})` : p.text)).join("");
const ht = (parts) => parts.map((p) => (typeof p === "string" ? esc(p) : p.url ? `<a href="${esc(p.url)}">${esc(p.text)}</a>` : esc(p.text))).join("");
const join2 = (items, sep = ", ") => items.flatMap((it, k) => (k ? [sep, it] : [it]));

const fromTo = (t) => `${title(t.from)} → ${title(t.to)}`;
const title = (id) => pdtById.get(id)?.title ?? id;
const seen = new Set();
const serviceParts = (v) => {
  const first = !seen.has(v.s.id);
  seen.add(v.s.id);
  const head = [L(v.s.title, pdtUrl(v.s))];
  if (!first) return { head, status: v.status, lines: [[firstSentence(prose(v.s)), " ", meta.experiences.seeAbove]] };
  const forWhom = list(v.s.for).map((id) => pdtById.get(id)).filter(Boolean);
  const lines = [[...(forWhom.length ? ["For ", ...join2(forWhom.map((e) => L(e.title, pdtUrl(e)))), ": "] : []), prose(v.s)]];
  if (v.channel) {
    lines.push(["Through ", L(v.channel.title, pdtUrl(v.channel)), v.channel.improvement ? `: ${sentence(v.channel.improvement)}` : "."]);
    const parts = list(v.channel.components);
    if (parts.length) lines.push([`${meta.experiences.consistsOf} `, parts.map((c) => c.charAt(0).toLowerCase() + c.slice(1)).join("; "), "."]);
  }
  if (v.status === "missing" && list(v.s.supports).length) lines.push([`${meta.others.wouldSupport} `, ...join2(list(v.s.supports).map((id) => L(title(id), pdtUrl(pdtById.get(id))))), "."]);
  if (v.delivery.length) {
    lines.push(["Delivered by ", ...join2(v.delivery.map(({ iface, block }) => L(`${iface.title} (${block.title})`, arcUrl(iface)))), "."]);
  }
  for (const m of v.missing) lines.push(["Not there yet: ", sentence(m)]);
  return { head, status: v.status, lines };
};

// Markdown
const M = [];
M.push(`# ${meta.title}`, "", meta.lead, "", `> ${meta.narrativeLabel} ${platform.narrative}`, "");
if (gaps.size) {
  M.push(`**${meta.gaps.heading}** ${meta.gaps.intro}`, "");
  for (const g of gaps.values()) M.push(`- **${md([L(`${g.iface.title} (${g.block.title})`, arcUrl(g.iface))])}:** ${sentence(g.text)} ${meta.gaps.affects} ${md(join2(g.services.map((x) => L(x.title, pdtUrl(x)))))}.`);
  M.push("");
}
M.push(`## ${meta.roles.heading}`, "", meta.roles.intro, "");
for (const r of roles) M.push(`- **${md([L(r.title, pdtUrl(r))])}:** ${firstSentence(prose(r))}`);
M.push("", `## ${meta.experiences.heading}`, "", meta.experiences.intro, "");
for (const j of journeys) {
  M.push(`### ${md([L(j.x.title, pdtUrl(j.x))])}`, "", prose(j.x), "");
  M.push(`Mainly for ${md([L(j.core.title, pdtUrl(j.core))])}; also involves ${md(join2(j.roles.map((r) => L(r.title, pdtUrl(r)))))}. What they get: ${sentence(j.x["value-proposition"])}`, "");
  for (const st of j.steps) {
    if (st.t) {
      const how = st.services.length ? "" : st.channel ? ` — through ${md([L(st.channel.title, pdtUrl(st.channel))])}` : ` — ${meta.experiences.insideApp}`;
      M.push(`1. ${st.ts.map((t) => `${md([L(t.title, pdtUrl(t))])} (${fromTo(t)})`).join(" · ")}${how}`);
    } else M.push(`1. ${meta.experiences.startsFrom}`);
    for (const v of st.services) {
      const p = serviceParts(v);
      M.push(`   - **${md(p.head)}** — ${meta.status[p.status]}`);
      for (const l of p.lines) M.push(`     - ${md(l)}`);
    }
  }
  M.push("");
}
seen.clear();
M.push(`## ${meta.others.heading}`, "", meta.others.intro, "");
for (const v of others) {
  const p = serviceParts(v);
  M.push(`- **${md(p.head)}** — ${meta.status[p.status]}`);
  for (const l of p.lines) M.push(`  - ${md(l)}`);
}
const mdBlock = ({ bb, offers, channels }) => {
  M.push(`#### ${md([L(bb.title, arcUrl(bb))])}${bb.extensions?.repo ? ` (${md([L(bb.extensions.repo, `https://github.com/${bb.extensions.repo}`)])})` : ""}`, "", prose(bb), "");
  if (channels.length) M.push(`- Makes possible: ${md(join2(channels.map((c) => L(c.title, pdtUrl(c)))))}`);
  for (const { i, users, outside } of offers) {
    M.push(`- Offers ${md([L(i.title, arcUrl(i))])}: ${prose(i)}`);
    if (users.length) M.push(`  - Used by ${md(join2(users.map((u) => L(u.title, arcUrl(u)))))}`);
    if (outside.length) M.push(`  - Works with, outside the system: ${md(join2(outside.map((u) => L(u.title, arcUrl(u)))))}`);
  }
  M.push("");
};
M.push("", `## ${meta.blocks.heading}`, "", meta.blocks.intro, "", `### ${meta.blocks.delivering}`, "");
delivering.forEach(mdBlock);
M.push(`### ${meta.blocks.supporting}`, "", meta.blocks.supportingIntro, "");
supporting.forEach(mdBlock);
M.push(`## ${meta.sources.heading}`, "", meta.sources.text, "");
const markdown = `${M.join("\n").replace(/\n{3,}/g, "\n\n")}\n`;

// HTML
seen.clear();
const badge = (status) => `<span class="status status-${status}">${esc(meta.status[status])}</span>`;
const htmlService = (v) => {
  const p = serviceParts(v);
  return `<li class="service"><div class="service-head"><strong>${ht(p.head)}</strong> ${badge(p.status)}</div>${p.lines.map((l) => `<p>${ht(l)}</p>`).join("")}</li>`;
};
const htmlBlock = ({ bb, offers, channels }) => `
          <li class="block">
            <h4><a href="${esc(arcUrl(bb))}">${esc(bb.title)}</a></h4>
            ${bb.extensions?.repo ? `<p class="repo"><a href="https://github.com/${esc(bb.extensions.repo)}">${esc(bb.extensions.repo)}</a></p>` : ""}
            <p>${esc(prose(bb))}</p>
            ${channels.length ? `<p class="realises">Makes possible: ${ht(join2(channels.map((c) => L(c.title, pdtUrl(c)))))}.</p>` : ""}
            <ul class="offers">${offers
              .map(
                ({ i, users, outside }) =>
                  `<li><a href="${esc(arcUrl(i))}">${esc(i.title)}</a>: ${esc(prose(i))}${users.length ? `<span class="used-by"> Used by ${ht(join2(users.map((u) => L(u.title, arcUrl(u)))))}.</span>` : ""}${outside.length ? `<span class="used-by"> Works with, outside the system: ${ht(join2(outside.map((u) => L(u.title, arcUrl(u)))))}.</span>` : ""}</li>`,
              )
              .join("")}</ul>
          </li>`;
const journeysHtml = journeys
  .map(
    (j) => `
        <article class="experience" aria-labelledby="${j.x.id}-h">
          <h3 id="${j.x.id}-h"><a href="${esc(pdtUrl(j.x))}">${esc(j.x.title)}</a></h3>
          <p>${esc(prose(j.x))}</p>
          <p class="who">Mainly for ${ht([L(j.core.title, pdtUrl(j.core))])}; also involves ${ht(join2(j.roles.map((r) => L(r.title, pdtUrl(r)))))}. <span>What they get: ${esc(sentence(j.x["value-proposition"]))}</span></p>
          <ol class="steps">${j.steps
            .map((st) => {
              const label = st.t
                ? `${st.ts.map((t) => `${ht([L(t.title, pdtUrl(t))])} <span class="from-to">${esc(fromTo(t))}</span>`).join(" · ")}${st.services.length ? "" : st.channel ? ` <span class="how">through ${ht([L(st.channel.title, pdtUrl(st.channel))])}</span>` : ` <span class="how">${esc(meta.experiences.insideApp)}</span>`}`
                : `<span class="how">${esc(meta.experiences.startsFrom)}</span>`;
              return `\n            <li class="step"><div class="step-label">${label}</div>${st.services.length ? `<ul class="services">${st.services.map(htmlService).join("")}</ul>` : ""}</li>`;
            })
            .join("")}
          </ol>
        </article>`,
  )
  .join("");
const journeysDone = journeysHtml; // rendered before the others reset `seen`
seen.clear();
const othersHtml = others.map(htmlService).join("");
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
      </div>
    </header>
    <div class="wrap overview">
${
  gaps.size
    ? `      <aside class="gaps" aria-labelledby="gaps-h">
        <h2 id="gaps-h">${esc(meta.gaps.heading)}</h2>
        <p>${esc(meta.gaps.intro)}</p>
        <ul>${[...gaps.values()].map((g) => `<li><strong>${ht([L(`${g.iface.title} (${g.block.title})`, arcUrl(g.iface))])}:</strong> ${esc(sentence(g.text))} ${esc(meta.gaps.affects)} ${ht(join2(g.services.map((x) => L(x.title, pdtUrl(x)))))}.</li>`).join("")}</ul>
      </aside>`
    : ""
}
      <section aria-labelledby="roles-h">
        <h2 class="section" id="roles-h">${esc(meta.roles.heading)}</h2>
        <p class="lead">${esc(meta.roles.intro)}</p>
        <ul class="roles">${roles.map((r) => `<li><a href="${esc(pdtUrl(r))}"><strong>${esc(r.title)}</strong></a><span>${esc(firstSentence(prose(r)))}</span></li>`).join("")}</ul>
      </section>
      <section aria-labelledby="experiences-h">
        <h2 class="section" id="experiences-h">${esc(meta.experiences.heading)}</h2>
        <p class="lead">${esc(meta.experiences.intro)}</p>${journeysDone}
      </section>
      <section aria-labelledby="others-h">
        <h2 class="section" id="others-h">${esc(meta.others.heading)}</h2>
        <p class="lead">${esc(meta.others.intro)}</p>
        <ul class="services">${othersHtml}</ul>
      </section>
      <section aria-labelledby="blocks-h">
        <h2 class="section" id="blocks-h">${esc(meta.blocks.heading)}</h2>
        <p class="lead">${esc(meta.blocks.intro)}</p>
        <h3 class="group">${esc(meta.blocks.delivering)}</h3>
        <ul class="blocks">${delivering.map(htmlBlock).join("")}
        </ul>
        <h3 class="group">${esc(meta.blocks.supporting)}</h3>
        <p class="lead">${esc(meta.blocks.supportingIntro)}</p>
        <ul class="blocks">${supporting.map(htmlBlock).join("")}
        </ul>
      </section>
      <section aria-labelledby="sources-h" class="sources">
        <h2 class="section" id="sources-h">${esc(meta.sources.heading)}</h2>
        <p>${esc(meta.sources.text)} <a href="../platform-design/">Platform design</a> · <a href="../architecture/">Architecture</a> · <a href="overview.md">This page as text</a></p>
      </section>
    </div>
  </main>
</body>
</html>
`;

mkdirSync(out, { recursive: true });
writeFileSync(join(out, "index.html"), html);
writeFileSync(join(out, "overview.md"), markdown);
console.log(`overview: ${journeys.length} experiences, ${others.length} further services, ${blocks.length} building blocks, ${gaps.size} gaps → ${out}/`);
