#!/usr/bin/env node
// Builds the start page of the docs (/docs/), the overview: the platform as it is meant to be, what people get from it and which part
// of the system delivers it. Everything comes from the two models, joined where they meet:
//   platform design (pdt42): experience → steps (transactions, and the services that support them) → channel
//   architecture (arc42):    interface with `x-realises: <channels>` → building block; what an interface does not
//                            deliver yet: `x-missing-<channel>: <text>` for one channel, `x-missing: <text>` for all
// Where an interface does not deliver yet, the page marks it in place, as a dashed block. Services no journey uses
// are ideas, listed at the end with the issue their prose links to.
// site/overview.yaml holds only headings and the texts that lead into each part, with placeholders the script fills
// from the models; it names no element of a model. The script fails when the models do not fit together, so the
// page cannot drift from them: an interface names a channel that does not exist, or an experience needs a service
// that no interface realises, or a flow names a part its sequence diagram does not show (or the other way round).
// The flows are drawn from their sequence diagrams in the architecture: every arrow carries the order to the part
// it points at.
// Rules of this script that the models do not show: the people on the page are the roles of the journeys; a part's
// addresses are the deployment nodes under lernapps.net that host it; the trailing steps of a journey that flow
// back to its main role are shown as what that role gets back; a block's first sentence is its job; an interface's
// `x-risk` names the risk that holds while it does not deliver; a step before any transaction, or in a relationship that
// is not core, is building the app.
//
//   node scripts/overview.mjs <site-dir>   (writes <site-dir>/index.html (German frame), <site-dir>/en/index.html and
//                                           <site-dir>/overview.md, the same content)
import { execFile, execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, isAbsolute, join } from "node:path";
import { promisify } from "node:util";
import { parse } from "yaml";

const out = process.argv[2] ?? "_site";
const meta = parse(readFileSync("site/overview.yaml", "utf8"));
const run = promisify(execFile);

// --- the models ---------------------------------------------------------------------------------------------------
const arc = JSON.parse(execFileSync("arc42", ["--dir", "docs/arc42", "get", "--format", "json"], { encoding: "utf8" }));
const arcById = new Map(arc.elements.map((e) => [e.id, e]));
const pdtList = JSON.parse(execFileSync("pdt42", ["--dir", "docs/pdt42", "get", "--format", "json"], { encoding: "utf8" }));
const KINDS = new Set(["platform", "entity", "experience", "service", "transaction", "channel", "relationship"]);
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
for (const i of interfaces) if (i.extensions?.risk && arcById.get(i.extensions.risk)?.kind !== "risk") errors.push(`${i.id}: x-risk names '${i.extensions.risk}', which is no risk of the architecture`);
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
// The first sentence of a chapter's lead (the paragraph under its title), read from the file of one of its elements.
const leadOf = (e) => {
  const file = isAbsolute(e.loc.file) ? e.loc.file : join("docs/pdt42", e.loc.file); // pdt42 gives paths relative to its dir
  const text = readFileSync(file, "utf8").replace(/^# .*\n+/, "").split(/\n\s*\n/)[0].replace(/^\*|\*$/g, "");
  return firstSentence(prose({ loc: { prose: text } }));
};
const issuesOf = (e) => [...(e?.loc?.prose ?? "").matchAll(/\[([^\]]+)\]\((https:\/\/github\.com\/[^)]+\/issues\/\d+)\)/g)].map((m) => ({ text: m[1], url: m[2] }));
const firstSentence = (text) => (text.match(/^.+?[.!?](?=\s|$)/) ?? [text])[0];
const sentence = (text) => (text ? text.charAt(0).toUpperCase() + text.slice(1) + (/[.!?]$/.test(text) ? "" : ".") : "");
const lower = (text) => (/^[A-Z]{2}/.test(text) ? text : text.charAt(0).toLowerCase() + text.slice(1)); // keeps "AI …"
const fill = (template, values) => template.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? "");
const job = (bb) => firstSentence(prose(bb)); // a block's first sentence is its job
const pdtUrl = (e) => `platform-design/#${e.loc.file}:el-${e.id}`; // the page is the root of the docs site
const arcUrl = (e) => `architecture/#${basename(e.loc.file)}:el-${e.id}`;

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
const roles = [...new Set(journeys.flatMap((j) => [j.core, ...j.roles]))];
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
          risk: i.extensions?.risk ? arcById.get(i.extensions.risk) : null,
          parts: users.filter((u) => u.kind === "building-block"),
          outside: users.filter((u) => u.kind === "actor" && u.type === "system"),
        };
      });
    return { bb, offers, delivers: offers.some((o) => o.channels.length) };
  });
// Where each part can be found: its addresses under lernapps.net (deployment view) and its repository.
const addressesOf = (bb) =>
  arc.elements.filter((e) => e.kind === "deployment-node" && e.parent && arcById.get(e.parent)?.type === "environment" && /lernapps\.net/.test(e.title) && list(e.hosts).includes(bb.id)).map((e) => e.title);
// The tools people bring themselves: the systems outside the platform that a person addresses directly in a journey.
// A person actor names its role in its description, "(pdt42 <role id>)".
const broughtBy = (role) => [
  ...new Set(
    [...behind.values()].flatMap(({ seq }) =>
      seq.messages
        .filter((m) => arcById.get(m.from.id)?.type === "person" && (arcById.get(m.from.id)?.description ?? "").includes(`pdt42 ${role.id})`))
        .filter((m) => arcById.get(m.to.id)?.kind === "actor" && arcById.get(m.to.id)?.type === "system")
        .map((m) => arcById.get(m.to.id)),
    ),
  ),
];
// How the parts work together: the runtime scenarios of the architecture that involve at least two parts; a
// The sequence diagram of a runtime scenario, read from its chapter: the `:::diagram` block with `scenario: <id>`
// and its aliases (name in the diagram = element id), then the Mermaid sequence that follows it.
const sequenceOf = (sc) => {
  const text = readFileSync(sc.loc.file, "utf8");
  const block = [...text.matchAll(/:::diagram\n([\s\S]*?):::/g)].find((d) => d[1].includes(`scenario: ${sc.id}\n`));
  if (!block) return null;
  const alias = Object.fromEntries((block[1].match(/aliases: (.+)/)?.[1] ?? "").split(/,\s*/).map((pair) => pair.split("=")));
  const body = text.slice(block.index).match(/```mermaid\n([\s\S]*?)```/)?.[1] ?? "";
  const participants = [...body.matchAll(/^\s*participant (\w+) as (.+)$/gm)].map(([, key, name]) => ({ key, id: alias[key] ?? key, name: arcById.get(alias[key])?.title ?? name.trim() })); // named as in the model
  const byKey = new Map(participants.map((p) => [p.key, p]));
  // In order: the arrows, and the notes that open a section (`Note over a,b: <step>`).
  const items = [...body.matchAll(/^\s*(?:Note over [\w,]+\s*:\s*(.+)|(\w+)\s*(-->>|->>)\s*(\w+)\s*:\s*(.+))$/gm)].map(([, note, from, arrow, to, label]) =>
    note ? { note: note.trim() } : { from: byKey.get(from), to: byKey.get(to), label: label.trim(), reply: arrow === "-->>" },
  );
  return { participants, items, messages: items.filter((i) => !i.note), notes: items.filter((i) => i.note).map((i) => i.note) };
};
// A scenario that tells a journey names it (`x-experience`) and is drawn inside that journey; the others are the
// flows behind the journeys.
const allScenarios = arc.elements
  .filter((e) => e.kind === "runtime-scenario")
  .sort((a, b) => a.loc.line - b.loc.line)
  .map((sc) => ({ sc, parts: list(sc.involves).map((id) => arcById.get(id)).filter((e) => e?.kind === "building-block"), seq: sequenceOf(sc) }));
const behind = new Map(allScenarios.filter((f) => f.sc.extensions?.experience).map((f) => [f.sc.extensions.experience, f]));
const scenarios = allScenarios.filter((f) => !f.sc.extensions?.experience);
{
  const wrong = [
    ...[...behind.keys()].filter((id) => !experiences.some((x) => x.id === id)).map((id) => `${behind.get(id).sc.id}: x-experience names '${id}', which is no experience of the platform design`),
    ...experiences.filter((x) => !behind.has(x.id)).map((x) => `${x.id}: no runtime scenario tells this experience (x-experience)`),
    // The diagram of a journey covers all of it: every step the platform helps with opens a section, a note named
    // after one of the step's transactions, or after its service where it has none.
    ...journeys.flatMap((j) => {
      const notes = new Set(behind.get(j.x.id)?.seq?.notes ?? []);
      return j.steps
        .filter((st) => st.services.length)
        .map((st) => (st.ts.length ? st.ts.map((t) => t.title) : st.services.map((v) => v.s.title)))
        .filter((titles) => !titles.some((t) => notes.has(t)))
        .map((titles) => `${behind.get(j.x.id)?.sc.id}: no section of its sequence diagram for the step '${titles.join(" · ")}' of ${j.x.id}`);
    }),
  ];
  wrong.push(...allScenarios.flatMap(({ sc, parts, seq }) => {
    if (!seq) return [`${sc.id}: no sequence diagram`];
    const shown = new Set(seq.participants.filter((p) => seq.messages.some((m) => m.from === p || m.to === p)).map((p) => p.id));
    return [
      ...parts.filter((b) => !shown.has(b.id)).map((b) => `${sc.id}: involves ${b.id}, but no arrow of its sequence diagram reaches it`),
      ...[...shown].filter((id) => arcById.get(id)?.kind === "building-block" && !parts.some((b) => b.id === id)).map((id) => `${sc.id}: its sequence diagram shows ${id}, which it does not involve`),
    ];
  }));
  if (wrong.length) {
    console.error(`overview: a flow and its sequence diagram do not fit together:\n- ${wrong.join("\n- ")}`);
    process.exit(1);
  }
}
// Section intros: what the models say about the section, then the frame's sentence on why to read it.
// The page guide: every section's heading and why to read it.
const guide = [
  ["roles-h", meta.roles],
  ["parts-h", meta.parts],
  ["experiences-h", meta.experiences],
  ["building-h", meta.building],
  ["ideas-h", meta.ideas],
  ["blocks-h", meta.blocks],
  ["read-on-h", meta.readOn],
].map(([id, m]) => [id, m.heading, m.why]);
const intro = {
  parts: `${leadOf(blocks[0].bb)} ${meta.parts.intro}`,
  experiences: `${meta.experiences.intro} ${leadOf(experiences[0])}`,
};
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
    const risks = [...new Map(v.delivery.filter((d) => d.missing && d.iface.extensions?.risk).map((d) => [d.iface.extensions.risk, arcById.get(d.iface.extensions.risk)])).values()];
    if (risks.length) lines.push({ parts: [`${meta.notYet.risk} `, ...join2(risks.map((r) => L(r.title, arcUrl(r)))), "."] });
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
const descOf = (u) => lower(u.description?.replace(/\s*\(pdt42[^)]*\)/, "") ?? "");
// How the platform helps build an app: the interfaces that realise the channels of the step before any transaction
// ("Building the app"), and everything else the outside systems that use them in a journey require, grouped by the
// part that provides them.
// A building step is one before any transaction, or one whose transactions all belong to a relationship that is not
// core (the creator and their assistant): the platform supports it, but does not stand between the two.
const isBuildingStep = (st) => !st.ts.length || st.ts.every((t) => pdtById.get(t.relationship)?.core === false);
const buildChannels = new Set(journeys.flatMap((j) => j.steps.filter((st) => st.services.length && isBuildingStep(st)).flatMap((st) => st.services.map((v) => v.s.channel))));
const buildIfaces = new Set(interfaces.filter((i) => list(i.extensions?.realises).some((ch) => buildChannels.has(ch))).map((i) => i.id));
const inJourneys = new Set([...behind.values()].flatMap(({ seq }) => seq.participants.map((p) => p.id)));
const builders = arc.elements.filter((e) => e.kind === "actor" && e.type === "system" && inJourneys.has(e.id) && list(e.requires).some((id) => buildIfaces.has(id)));
for (const u of builders) for (const id of list(u.requires)) buildIfaces.add(id);
const building = blocks
  .map(({ bb, offers }) => ({ bb, offers: offers.filter(({ i }) => buildIfaces.has(i.id)).map((o) => ({ ...o, by: [...builders.filter((u) => list(u.requires).includes(o.i.id)), ...o.parts] })) }))
  .filter((b) => b.offers.length);
const siteOf = (bb) => ({ addresses: addressesOf(bb), repo: bb.extensions?.repo });
// Each part keeps one colour on the whole page: in the site map and in the flows.
const PALETTE = ["#2563eb", "#0d9488", "#9333ea", "#ea580c", "#db2777", "#65a30d"];
const colourOf = (id) => {
  const k = blocks.findIndex((b) => b.bb.id === id);
  return k < 0 ? null : PALETTE[k % PALETTE.length];
};
// A flow's sequence diagram as SVG: a column per participant, time runs down, every arrow numbered and labelled
// with the order to the participant it points at; replies dashed. Labels wrap to the width between the columns.
const sequenceSvg = ({ sc, seq }) => {
  const ps = seq.participants.filter((p) => seq.messages.some((m) => m.from === p || m.to === p));
  // Drawn at its natural size, never scaled: the columns share the width of the page, down to a minimum.
  const COL = Math.max(72, Math.min(150, Math.floor(860 / ps.length))), HEAD = 46, LINE = 15, CH = 6.4;
  const x = (p) => COL / 2 + ps.indexOf(p) * COL;
  const wrap = (text, width) => {
    const lines = [""];
    for (const w of text.split(" ")) (lines.at(-1) && (lines.at(-1).length + w.length + 1) * CH > width ? lines.push(w) : (lines[lines.length - 1] = lines.at(-1) ? `${lines.at(-1)} ${w}` : w));
    return lines;
  };
  let y = HEAD + 16;
  let k = 0;
  const rows = seq.items.map((m) => {
    if (m.note) {
      // A section: a line across the diagram, the step's title on it.
      const row = `<g class="section-row"><line x1="4" y1="${y + 10}" x2="${ps.length * COL - 4}" y2="${y + 10}"/><text x="8" y="${y + 6}">${esc(m.note)}</text></g>`;
      y += 26;
      return row;
    }
    k += 1;
    const self = m.from === m.to;
    const x1 = x(m.from), x2 = x(m.to);
    const width = self ? 2 * COL - 30 : Math.max(Math.abs(x2 - x1) - 24, 2 * COL - 40); // a short arrow's label may reach past its ends
    const lines = wrap(m.label, width);
    const top = y + lines.length * LINE + 6; // the arrow below its label
    const colour = colourOf(m.to.id);
    const style = colour ? ` style="--c:${colour}"` : "";
    const lx = self ? x1 + 18 : (x1 + x2) / 2;
    const text = `<text class="lbl" x="${lx}" y="${y + 10}" text-anchor="${self ? "start" : "middle"}">${lines.map((l, i) => `<tspan x="${lx}" dy="${i ? LINE : 0}">${esc(l)}</tspan>`).join("")}</text>`;
    const arrow = self
      ? `<path class="arrow${colour ? " part" : ""}" d="M${x1} ${top} h14 v14 h-10" marker-end="url(#${sc.id}-head)"/>`
      : `<line class="arrow${m.reply ? " reply" : ""}${colour ? " part" : ""}" x1="${x1}" y1="${top}" x2="${x2 + (x2 > x1 ? -4 : 4)}" y2="${top}" marker-end="url(#${sc.id}-head)"/>`;
    const nx = self ? x1 : x1 + (x2 > x1 ? 12 : -12);
    const row = `<g${style}>${text}${arrow}<circle class="num" cx="${nx}" cy="${top}" r="8"/><text class="num-t" x="${nx}" y="${top + 3.5}" text-anchor="middle">${k}</text></g>`;
    y = top + (self ? 30 : 18);
    return row;
  });
  const h = y + 6, w = ps.length * COL;
  const heads = ps
    .map((p) => {
      const colour = colourOf(p.id);
      return `<g class="head${colour ? " part" : ""}"${colour ? ` style="--c:${colour}"` : ""}><line class="life" x1="${x(p)}" y1="${HEAD}" x2="${x(p)}" y2="${h}"/><rect x="${x(p) - COL / 2 + 8}" y="4" width="${COL - 16}" height="${HEAD - 12}" rx="${(HEAD - 12) / 2}"/>${(() => {
        const lines = wrap(p.name, COL - 34); // bold, so wider than the labels
        const top = 4 + (HEAD - 12) / 2 + 4.5 - ((lines.length - 1) * 13) / 2;
        return `<text x="${x(p)}" y="${top}" text-anchor="middle">${lines.map((l, i) => `<tspan x="${x(p)}" dy="${i ? 13 : 0}">${esc(l)}</tspan>`).join("")}</text>`;
      })()}</g>`;
    })
    .join("");
  return `<div class="sequence"><svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(sc.title)}"><defs><marker id="${sc.id}-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="tip"/></marker></defs>${heads}${rows.join("")}</svg></div>`;
};
// The same as text: one numbered line per arrow.
const sequenceLines = ({ seq }) => seq.items.map((m) => (m.note ? `*${m.note}*` : `${m.from.name} ${m.reply ? "⇢" : "→"} ${m.to.name}: ${m.label}`));
const stepHow = (st) => (st.services.length || !st.ts.length ? null : [meta.reading.insideApp]);
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
  const v = meta.vision.en;
  M.push(`# ${v.claim[0]} ${v.claim[1]}`, "", v.text, "", `[${v.link}](vision/)`, "", `## ${meta.title}`, "", meta.lead, "", `> ${meta.narrativeLabel} ${platform.narrative}`, "", meta.guide.heading, "");
  for (const [, head, why] of guide) M.push(`- **${head}:** ${why}`);
  M.push("", `## ${meta.roles.heading}`, "", meta.roles.intro, "");
  for (const r of roles) M.push(`- **${r.title}:** ${firstSentence(prose(r))}${broughtBy(r).map((u) => ` ${meta.roles.brings} ${descOf(u)}.`).join("")}`);
  M.push("", `## ${meta.parts.heading}`, "", intro.parts, "");
  for (const { bb } of blocks) {
    const { addresses, repo } = siteOf(bb);
    const where = [
      addresses.length ? `${meta.parts.address} ${addresses.map((a) => `[${a}](https://${a}/)`).join(", ")}` : meta.parts.noAddress,
      repo ? `${meta.parts.repo} [${repo}](https://github.com/${repo})` : null,
    ].filter(Boolean);
    M.push(`- **${md([L(bb.title, arcUrl(bb))])}:** ${job(bb)} ${where.join(" · ")}`);
  }
  M.push("", `## ${meta.experiences.heading}`, "", intro.experiences, "");
  M.push(`### ${meta.reading.heading}`, "", meta.reading.intro, "", example, "", meta.notYet.explained, "");
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
    M.push("", `**${meta.experiences.behind}**`, "");
    for (const l of sequenceLines(behind.get(j.x.id))) M.push(l.startsWith("*") ? `\n${l}\n` : `1. ${l}`);
    M.push("");
  }
  M.push(`## ${meta.building.heading}`, "", meta.building.intro, "");
  for (const { bb, offers } of building) {
    const where = addressesOf(bb);
    M.push(`### ${md([L(bb.title, arcUrl(bb))])}${where.length ? ` (${where.map((a) => `[${a}](https://${a}/)`).join(", ")})` : ""}`, "");
    for (const { i, by } of offers) M.push(`- **${i.title}:** ${prose(i)} ${meta.building.usedBy} ${names(by)}.`);
    M.push("");
  }
  M.push(`### ${meta.building.flows}`, "", meta.building.flowsIntro, "");
  for (const f of scenarios) {
    M.push(`#### ${md([L(f.sc.title, arcUrl(f.sc))])}`, "", prose(f.sc), "");
    for (const l of sequenceLines(f)) M.push(l.startsWith("*") ? `\n${l}\n` : `1. ${l}`);
    M.push("");
  }
  M.push("", `## ${meta.ideas.heading}`, "", meta.ideas.intro, "");
  for (const v of ideas) mdService(v, "", { idea: true });
  M.push("", `## ${meta.blocks.heading}`, "", meta.blocks.intro, "");
  for (const [heading, intro, group] of [
    [meta.blocks.delivering, null, blocks.filter((b) => b.delivers)],
    [meta.blocks.supporting, meta.blocks.supportingIntro, blocks.filter((b) => !b.delivers)],
  ]) {
    M.push(`### ${heading}`, "", ...(intro ? [intro, ""] : []));
    for (const { bb, offers } of group) {
      M.push(`#### ${md([L(bb.title, arcUrl(bb))])}${bb.extensions?.repo ? ` (${md([L(bb.extensions.repo, `https://github.com/${bb.extensions.repo}`)])})` : ""}`, "");
      for (const { i, services, notYet, risk, parts, outside } of offers) {
        M.push(`- **${i.title}:** ${prose(i)}`);
        if (services.length) M.push(`  - ${meta.blocks.delivers} ${names(services)}`);
        for (const m of notYet) M.push(`  - ┆ ${meta.notYet.label} ${sentence(m)}`);
        if (risk) M.push(`  - ${meta.notYet.risk} ${md([L(risk.title, arcUrl(risk))])}.`);
        if (parts.length) M.push(`  - ${meta.blocks.usedBy} ${names(parts)}`);
        if (outside.length) M.push(`  - ${meta.blocks.outside} ${names(outside)}`);
      }
      M.push("");
    }
  }
  M.push(`## ${meta.readOn.heading}`, "", meta.readOn.intro, "");
  for (const d of meta.readOn.items) M.push(`- **[${d.title}](${d.href}):** ${d.text}`);
  M.push("", "---", "", meta.sources.text, "");
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
          <div class="behind"><h4>${esc(meta.experiences.behind)}</h4>${sequenceSvg(behind.get(j.x.id))}</div>
        </article>`,
    )
    .join("");
  const ideasHtml = ideas.map((v) => htmlService(v, { idea: true })).join("");
  const blockHtml = ({ bb, offers }) => `
          <li class="block">
            <h4><a href="${esc(arcUrl(bb))}">${esc(bb.title)}</a></h4>
            ${bb.extensions?.repo ? `<p class="repo"><a href="https://github.com/${esc(bb.extensions.repo)}">${esc(bb.extensions.repo)}</a></p>` : ""}
            <ul class="offers">${offers
              .map(
                ({ i, services, notYet, risk, parts, outside }) =>
                  `<li><strong>${esc(i.title)}</strong>: ${esc(prose(i))}${services.length ? `<span class="meta"> ${esc(meta.blocks.delivers)} ${esc(names(services))}.</span>` : ""}${notYet.map((m) => `<span class="not-yet">${esc(meta.notYet.label)} ${esc(sentence(m))}</span>`).join("")}${risk ? `<span class="meta"> ${esc(meta.notYet.risk)} <a href="${esc(arcUrl(risk))}">${esc(risk.title)}</a>.</span>` : ""}${parts.length ? `<span class="meta"> ${esc(meta.blocks.usedBy)} ${esc(names(parts))}.</span>` : ""}${outside.length ? `<span class="meta"> ${esc(meta.blocks.outside)} ${esc(names(outside))}.</span>` : ""}</li>`,
              )
              .join("")}</ul>
          </li>`;
  // The page in each language: the vision and the preamble in that language; in German, a cut, then the rest in
  // English, because it comes from the English models. Asset links climb out of the language folder.
  const page = (lang) => {
    const t = lang === "de" ? meta.de : meta;
    const v = meta.vision[lang];
    const up = lang === "de" ? "" : "../";
    const href = (h) => (h.endsWith("/") ? h : up + h);
    return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta name="color-scheme" content="light dark">
  <title>${esc(t.title)} – lernapps.net</title>
  <meta name="description" content="${esc(t.lead)}">
  <link rel="canonical" href="https://lernapps.net/docs/${lang === "de" ? "" : "en/"}">
  <link rel="stylesheet" href="${up}stil.css">
  <link rel="stylesheet" href="${up}start.css">
  <link rel="stylesheet" href="${up}overview.css">
</head>
<body>
  <main id="main-content" tabindex="-1">
    <header class="hero">
      <div class="wrap">
        <div class="eyebrow">${esc(v.label)}</div>
        <h1><span>${esc(v.claim[0])}</span> <span class="second">${esc(v.claim[1])}</span></h1>
        <p>${esc(v.text)}</p>
        <a class="cta vision-link" href="vision/">${esc(v.link)} →</a>
      </div>
    </header>
    <div class="wrap overview">
      <section aria-labelledby="intro-h" class="intro">
        <h2 class="section" id="intro-h">${esc(t.title)}</h2>
        <p class="lead">${esc(t.lead)}</p>
        <nav class="guide" aria-label="${esc(t.guide.heading)}"><span>${esc(t.guide.heading)}</span><ul>${guide.map(([id, head, why]) => `<li><a href="#${id}">${esc(head)}</a> – ${esc(lang === "de" ? meta.de.why[id] : why)}</li>`).join("")}</ul></nav>
      </section>${lang === "de" ? `
      <p class="cut">${esc(meta.de.cut)}</p>
      <div lang="en">` : ""}
      <blockquote class="narrative"><span>${esc(meta.narrativeLabel)}</span> <a href="${esc(pdtUrl(platform))}">${esc(platform.narrative)}</a></blockquote>
      <section aria-labelledby="roles-h">
        <h2 class="section" id="roles-h">${esc(meta.roles.heading)}</h2>
        <p class="lead">${esc(meta.roles.intro)}</p>
        <ul class="roles">${roles.map((r) => `<li><strong>${esc(r.title)}</strong><span>${esc(firstSentence(prose(r)))}</span>${broughtBy(r).map((u) => `<span class="brings">${esc(meta.roles.brings)} ${esc(descOf(u))}.</span>`).join("")}</li>`).join("")}</ul>
      </section>
      <section aria-labelledby="parts-h">
        <h2 class="section" id="parts-h">${esc(meta.parts.heading)}</h2>
        <p class="lead">${esc(intro.parts)}</p>
        <ul class="parts">${blocks
          .map(({ bb }) => {
            const { addresses, repo } = siteOf(bb);
            const where = addresses.length ? `${esc(meta.parts.address)} ${addresses.map((a) => `<a href="https://${esc(a)}/">${esc(a)}</a>`).join(", ")}` : esc(meta.parts.noAddress);
            return `<li style="--c:${colourOf(bb.id)}"><a href="${esc(arcUrl(bb))}"><strong>${esc(bb.title)}</strong></a><span>${esc(job(bb))}</span><span class="where">${where}</span>${repo ? `<span class="where">${esc(meta.parts.repo)} <a href="https://github.com/${esc(repo)}">${esc(repo)}</a></span>` : ""}</li>`;
          })
          .join("")}</ul>
      </section>
      <section aria-labelledby="experiences-h">
        <h2 class="section" id="experiences-h">${esc(meta.experiences.heading)}</h2>
        <p class="lead">${esc(intro.experiences)}</p>
        <div class="reading">
          <h3 id="reading-h">${esc(meta.reading.heading)}</h3>
          <p>${esc(meta.reading.intro)}</p>
          <p class="example">${esc(example)}</p>
          <p class="not-yet">${esc(meta.notYet.explained)}</p>
        </div>${journeysHtml}
      </section>
      <section aria-labelledby="building-h">
        <h2 class="section" id="building-h">${esc(meta.building.heading)}</h2>
        <p class="lead">${esc(meta.building.intro)}</p>
        <ul class="building">${building
          .map(({ bb, offers }) => {
            const where = addressesOf(bb);
            return `<li style="--c:${colourOf(bb.id)}"><h3><a href="${esc(arcUrl(bb))}">${esc(bb.title)}</a>${where.map((a) => ` <a class="where" href="https://${esc(a)}/">${esc(a)}</a>`).join("")}</h3><ul>${offers.map(({ i, by }) => `<li><strong>${esc(i.title)}:</strong> ${esc(prose(i))} <span class="meta">${esc(meta.building.usedBy)} ${esc(names(by))}.</span></li>`).join("")}</ul></li>`;
          })
          .join("")}</ul>
        <h3 class="group" id="flows-h">${esc(meta.building.flows)}</h3>
        <p class="lead">${esc(meta.building.flowsIntro)}</p>
        <ul class="together">${scenarios
          .map((f) => `<li><h3><a href="${esc(arcUrl(f.sc))}">${esc(f.sc.title)}</a></h3><p>${esc(prose(f.sc))}</p>${sequenceSvg(f)}</li>`)
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
      <section aria-labelledby="read-on-h" class="read-on">
        <h2 class="section" id="read-on-h">${esc(meta.readOn.heading)}</h2>
        <p class="lead">${esc(meta.readOn.intro)}</p>
        <ul class="documents">${meta.readOn.items.map((d) => `<li><a href="${esc(href(d.href))}"><strong>${esc(d.title)}</strong></a><span>${esc(d.text)}</span></li>`).join("")}</ul>
      </section>
      <footer class="sources">
        <p>${esc(meta.sources.text)} <a href="${up}overview.md">This page as text</a></p>
      </footer>${lang === "de" ? `
      </div>` : ""}
    </div>
  </main>
</body>
</html>
`;
  };
  writeFileSync(join(out, "index.html"), page("de"));
  mkdirSync(join(out, "en"), { recursive: true });
  writeFileSync(join(out, "en", "index.html"), page("en"));
}
console.log(`overview: ${journeys.length} experiences, ${ideas.length} ideas, ${blocks.length} building blocks → ${out}/`);
