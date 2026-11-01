#!/usr/bin/env node
// The edits of scripts/build.sh to the pages it has built, in Node instead of sed: GNU and BSD sed differ (-i, \n in the
// replacement, the address 0,/re/), so the build ran on Linux only.
//
//   node scripts/html-edit.mjs head-link <href> <file>...   a stylesheet link before the first </head> of each file
//   node scripts/html-edit.mjs head-script <src> <dir>      a deferred script before the first </head> of every .html file below <dir>
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/** The page with `text` and a line break before its first </head>; throws when it has none. */
export function beforeHead(html, text) {
  if (!html.includes("</head>")) throw new Error("a page has no </head>");
  return html.replace("</head>", () => `${text}\n</head>`);
}

const edit = (file, change) => writeFileSync(file, change(readFileSync(file, "utf8")));
const pages = (dir) =>
  readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => join(entry.parentPath, entry.name));

const [command, first, ...rest] = process.argv.slice(2);
if (command === "head-link" && first !== undefined && rest.length > 0) {
  for (const file of rest) edit(file, (html) => beforeHead(html, `<link rel="stylesheet" href="${first}">`));
} else if (command === "head-script" && first !== undefined && rest.length === 1) {
  for (const file of pages(rest[0])) edit(file, (html) => beforeHead(html, `<script src="${first}" defer></script>`));
} else {
  console.error("Usage: html-edit.mjs head-link <href> <file>... | head-script <src> <dir>");
  process.exit(2);
}
