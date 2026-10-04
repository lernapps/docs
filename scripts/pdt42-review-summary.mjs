#!/usr/bin/env node
// Renders the PR comment for the platform design review from the change that
// `pdt42 diff <base>...HEAD --format json` wrote (scripts/build.sh, changes.json).
// Modelled on pdt42's own scripts/platform-review.ts. Placeholders the workflow
// replaces: {{PAGE_URL}} (the diff page, unzipped) and {{ARTIFACT_URL}} (site-preview).
//
//   node scripts/pdt42-review-summary.mjs <changes.json> <base> > summary.md
import { readFileSync } from "node:fs";

const MARKER = "<!-- lernapps-docs-platform-design-review -->";
const MAX_LINES = 300; // keeps the comment well below GitHub's size limit

const [file, base = "the base"] = process.argv.slice(2);
if (!file) {
  console.error("Usage: pdt42-review-summary.mjs <changes.json> [<base>]");
  process.exit(2);
}
const diff = JSON.parse(readFileSync(file, "utf8"));
const { elements, edges, proseSections, documents } = diff.model;

const lines = [MARKER, "### Platform design review", ""];
if (elements.length + edges.length + proseSections.length === 0) {
  lines.push(`No platform design changes compared with \`${base}\`.`, "");
  lines.push(`The built site: [site-preview]({{ARTIFACT_URL}})`, "");
  process.stdout.write(`${lines.join("\n")}\n`);
  process.exit(0);
}

const sum = (key) => documents.reduce((total, d) => total + d[key], 0);
const value = (v) => {
  if (v === undefined) return "—";
  const text = Array.isArray(v) ? v.join(", ") : typeof v === "string" ? v : JSON.stringify(v);
  return `\`${text.replaceAll("`", "'").replaceAll("|", "\\|")}\``;
};

lines.push(
  `This pull request changes the platform design (\`docs/pdt42\`) compared with \`${base}\`.`,
  "",
  "**[Open the platform design review]({{PAGE_URL}})** — the changes inside their chapters, in the browser",
  "",
  "| Added | Modified | Removed | Warnings |",
  "|---:|---:|---:|---:|",
  `| ${sum("added")} | ${sum("modified")} | ${sum("removed")} | ${diff.findings.length} |`,
  "",
  "The whole built site (`platform-design/`, `platform-design-diff/`, …): [site-preview]({{ARTIFACT_URL}})",
  "",
);

if (diff.findings.length > 0) {
  lines.push("**Warnings** — a block and the prose that explains it should change together", "");
  for (const f of diff.findings) {
    lines.push(`- ${f.message} (\`${f.file}${f.line > 0 ? `:${f.line}` : ""}\`)`);
  }
  lines.push("");
}

const changes = [];
for (const e of elements) {
  const status = e.status === "unchanged" ? "prose changed" : e.status;
  const attributes = e.attributes
    .map((a) => `${a.name}: ${value(a.before)} → ${value(a.after)}`)
    .join("; ");
  changes.push(`- \`${e.id}\` (${e.kind}) — ${status}${attributes ? ` — ${attributes}` : ""}`);
}
for (const { status, edge } of edges) {
  changes.push(`- relation \`${edge.from}\` ${edge.relation} \`${edge.to}\` — ${status}`);
}
for (const { status, section } of proseSections) {
  changes.push(`- section “${section.headingPath.join(" › ") || section.file}” — ${status}`);
}
const shown = changes.slice(0, MAX_LINES);
if (changes.length > shown.length) {
  shown.push(`- … and ${changes.length - shown.length} more (see the review page)`);
}
lines.push(
  `<details><summary>Changed elements, relations and sections (${changes.length})</summary>`,
  "",
  ...shown,
  "",
  "</details>",
  "",
);
process.stdout.write(`${lines.join("\n")}\n`);
