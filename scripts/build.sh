#!/usr/bin/env bash
# Builds the docs site into _site/ for https://lernapps.net/docs/.
# A pull request preview (pr-preview.yml) sets SITE_PATH_PREFIX=/docs/pr-preview/pr-<number>/ and
# SITE_PREVIEW=1: the biz42 app gets that base, and the static pages a banner and noindex.
# Tools are run with pinned versions via npx; the repo has no npm dependencies.
set -euo pipefail
cd "$(dirname "$0")/.."

BIZ42=@biz42/cli@0.6.0
MARKED=marked@18.0.14
PDT42=@pdt42/cli@0.6.2
PREFIX="${SITE_PATH_PREFIX:-/docs/}"

rm -rf _site
mkdir -p _site/vision
cp site/index.html site/404.html site/stil.css _site/

npx --yes "$BIZ42" --dir docs/biz42 validate
npx --yes "$BIZ42" --dir docs/biz42 build --out _site/about --base "${PREFIX}about/"

npx --yes "$PDT42" --dir docs/pdt42 validate
npx --yes "$PDT42" --dir docs/pdt42 build --out _site/platform-design

# Review builds: with PDT42_DIFF_BASE set (e.g. origin/main in a pull request),
# also render the platform design's changes since the merge base with that ref as
# one self-contained page, and write the change as JSON (changes.json) for the PR
# comment. Compares commits (<base>...HEAD), not the working tree. Findings of
# `pdt42 diff` (block and prose not changed together) are reported, not fatal.
if [ -n "${PDT42_DIFF_BASE:-}" ]; then
  range="$PDT42_DIFF_BASE...HEAD"
  npx --yes "$PDT42" --dir docs/pdt42 build --single-file --diff "$range" --out _site/platform-design-diff
  npx --yes "$PDT42" --dir docs/pdt42 diff "$range" --format json > _site/platform-design-diff/changes.json || [ -s _site/platform-design-diff/changes.json ]
fi

npx --yes "$MARKED" --gfm -i docs/vision.md -o _site/vision/content.html
python3 - <<'PY'
import os
template = open("site/vision.template.html", encoding="utf-8").read()
content = open("_site/vision/content.html", encoding="utf-8").read()
open("_site/vision/index.html", "w", encoding="utf-8").write(template.replace("<!-- CONTENT -->", content))
# Previews: a banner and noindex on the static pages (the biz42 and pdt42 apps stay as they are).
if os.environ.get("SITE_PREVIEW"):
    banner = ('<p style="margin:0;padding:.5rem 1rem;text-align:center;background:#fcd34d;color:#0f172a;font:14px system-ui,sans-serif">'
              'Vorschau einer Änderung. Die echte Seite: <a href="https://lernapps.net/docs/">lernapps.net/docs</a></p>')
    for page in ["_site/index.html", "_site/vision/index.html"]:
        html = open(page, encoding="utf-8").read()
        html = html.replace("</head>", '  <meta name="robots" content="noindex">\n</head>', 1)
        html = html.replace("<body>", "<body>\n" + banner, 1)
        open(page, "w", encoding="utf-8").write(html)
PY
rm _site/vision/content.html

touch _site/.nojekyll
echo "built _site/"
