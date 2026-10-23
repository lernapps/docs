#!/usr/bin/env node
// Renders the pull request comment of the docs preview: links to the preview and, for the platform
// design (pdt42), the organisation (biz42) and the architecture (arc42), the change since the merge base, from
// the JSON that `pdt42 diff`, `biz42 diff` and `arc42 diff <base>...HEAD --format json` wrote (scripts/build.sh). Modelled on pdt42's
// scripts/platform-review.ts. Placeholder the workflow replaces: {{SITE_URL}} (the preview of the site).
//
//   node scripts/docs-review-summary.mjs <base> > summary.md   (reads _site/*-diff/changes.json)
import { readFileSync, existsSync } from "node:fs";

const MARKER = "<!-- lernapps-docs-platform-design-review -->";
const MAX_LINES = 150; // per model; keeps the comment well below GitHub's size limit
const base = process.argv[2] ?? "the base";

const MODELS = [
  { name: "Platform design", dsl: "pdt42", dir: "docs/pdt42", page: "platform-design-diff/", key: "model" },
  { name: "Organisation", dsl: "biz42", dir: "docs/biz42", page: "about-diff/", key: "model" },
  { name: "Architecture", dsl: "arc42", dir: "docs/arc42", page: "architecture-diff/", key: "architecture" },
];

const value = (v) => {
  if (v === undefined) return "—";
  const text = Array.isArray(v) ? v.join(", ") : typeof v === "string" ? v : JSON.stringify(v);
  return `\`${text.replaceAll("`", "'").replaceAll("|", "\\|")}\``;
};

const lines = [MARKER, "### Docs review", "", "**[Open the preview of the docs]({{SITE_URL}})** — as it would be published", ""];

for (const model of MODELS) {
  const file = `_site/${model.page}changes.json`;
  if (!existsSync(file)) continue;
  const diff = JSON.parse(readFileSync(file, "utf8"));
  const { elements, diagrams = [], edges, proseSections, documents } = diff[model.key];
  lines.push(`#### ${model.name} (${model.dsl})`, "");
  if (elements.length + diagrams.length + edges.length + proseSections.length === 0) {
    lines.push(`No changes compared with \`${base}\`.`, "");
    continue;
  }
  const sum = (key) => documents.reduce((total, d) => total + d[key], 0);
  // Hints are advisory, e.g. arc42's source paths no building block claims (`arc42 diff` does not read .arc42ignore).
  const warnings = diff.findings.filter((f) => f.severity !== "hint");
  const hints = diff.findings.filter((f) => f.severity === "hint");
  lines.push(
    `**[Open the review of the changes]({{SITE_URL}}${model.page})** — the changes inside their chapters, in the browser`,
    "",
    "| Added | Modified | Removed | Warnings |",
    "|---:|---:|---:|---:|",
    `| ${sum("added")} | ${sum("modified")} | ${sum("removed")} | ${warnings.length} |`,
    "",
  );
  const finding = (f) => `- ${f.message} (\`${f.file}${f.line > 0 ? `:${f.line}` : ""}\`)`;
  if (warnings.length > 0) {
    lines.push("**Warnings** — a block and the prose that explains it should change together", "");
    for (const f of warnings) lines.push(finding(f));
    lines.push("");
  }
  if (hints.length > 0) {
    lines.push(`<details><summary>Hints (${hints.length})</summary>`, "", ...hints.map(finding), "", "</details>", "");
  }
  const changes = [];
  for (const e of elements) {
    const status = e.status === "unchanged" ? "prose changed" : e.status;
    const attributes = (e.attributes ?? []).map((a) => `${a.name}: ${value(a.before)} → ${value(a.after)}`).join("; ");
    changes.push(`- \`${e.id}\` (${e.kind}) — ${status}${attributes ? ` — ${attributes}` : ""}`);
  }
  for (const d of diagrams) changes.push(`- diagram \`${d.id ?? d.diagram?.id ?? "?"}\` — ${d.status}`);
  for (const { status, edge } of edges) changes.push(`- relation \`${edge.from}\` ${edge.relation} \`${edge.to}\` — ${status}`);
  for (const { status, section } of proseSections) {
    changes.push(`- section “${section.headingPath.join(" › ") || section.file}” — ${status}`);
  }
  const shown = changes.slice(0, MAX_LINES);
  if (changes.length > shown.length) shown.push(`- … and ${changes.length - shown.length} more (see the review page)`);
  lines.push(`<details><summary>Changed elements, relations and sections (${changes.length})</summary>`, "", ...shown, "", "</details>", "");
}

process.stdout.write(`${lines.join("\n")}\n`);
