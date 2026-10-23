#!/usr/bin/env bash
# Builds the docs site into _site/ for https://lernapps.net/docs/.
# A pull request preview (pr-preview.yml) sets SITE_PATH_PREFIX=/docs/pr-preview/pr-<number>/ and
# SITE_PREVIEW=1: the biz42 app gets that base.
# The tools (biz42, pdt42, arc42, marked, the shared site frame) are pinned in package.json: run `npm ci` first.
# The shared site frame (@lernapps/site) adds the header and footer of all lernapps.net sites to every page,
# and the preview banner and noindex in a preview.
set -euo pipefail
cd "$(dirname "$0")/.."
export PATH="$PWD/node_modules/.bin:$PATH"
PREFIX="${SITE_PATH_PREFIX:-/docs/}"

rm -rf _site
mkdir -p _site/vision _site/en
cp site/index.html site/404.html site/stil.css site/start.css site/llms.txt _site/
cp site/en/index.html _site/en/

biz42 --dir docs/biz42 validate
biz42 --dir docs/biz42 build --out _site/about --base "${PREFIX}about/"

pdt42 --dir docs/pdt42 validate
pdt42 --dir docs/pdt42 build --out _site/platform-design

arc42 --dir docs/arc42 validate --strict
arc42 --dir docs/arc42 build --out _site/architecture --base "${PREFIX}architecture/"

# Review builds: with PDT42_DIFF_BASE set (e.g. origin/main in a pull request),
# also render the platform design's, the organisation's and the architecture's changes since the merge base with that ref as
# one self-contained page, and write the change as JSON (changes.json) for the PR
# comment. Compares commits (<base>...HEAD), not the working tree. Findings of
# `pdt42 diff` (block and prose not changed together) are reported, not fatal.
if [ -n "${PDT42_DIFF_BASE:-}" ]; then
  range="$PDT42_DIFF_BASE...HEAD"
  pdt42 --dir docs/pdt42 build --single-file --diff "$range" --out _site/platform-design-diff
  pdt42 --dir docs/pdt42 diff "$range" --format json > _site/platform-design-diff/changes.json || [ -s _site/platform-design-diff/changes.json ]
  # The same for the organisation (biz42).
  biz42 --dir docs/biz42 build --single-file --diff "$range" --out _site/about-diff
  biz42 --dir docs/biz42 diff "$range" --format json > _site/about-diff/changes.json || [ -s _site/about-diff/changes.json ]
  # The same for the architecture (arc42).
  arc42 --dir docs/arc42 build --single-file --diff "$range" --out _site/architecture-diff
  arc42 --dir docs/arc42 diff "$range" --format json > _site/architecture-diff/changes.json || [ -s _site/architecture-diff/changes.json ]
fi

marked --gfm -i docs/vision.md -o _site/vision/content.html
python3 - <<'PY'
template = open("site/vision.template.html", encoding="utf-8").read()
content = open("_site/vision/content.html", encoding="utf-8").read()
open("_site/vision/index.html", "w", encoding="utf-8").write(template.replace("<!-- CONTENT -->", content))
PY
rm _site/vision/content.html

# The biz42, pdt42 and arc42 apps: keep their fixed controls off the shared header (site/spa.css).
for app in _site/about _site/platform-design _site/architecture _site/architecture-diff; do
  [ -f "$app/index.html" ] || continue
  cp site/spa.css "$app/"
  sed -i '0,/<\/head>/s||<link rel="stylesheet" href="spa.css">\n</head>|' "$app/index.html"
done
lernapps-frame --site /docs/ --source https://github.com/lernapps/docs --out _site
# The usage counter of the platform sites (/lernapps-count.js, served by lernapps.github.io, see "Usage counter" in
# its README): this site's pages count their visits, never in a preview. Not part of the site frame: apps use the
# frame too, and apps are never counted.
if [ -z "${SITE_PREVIEW:-}" ]; then
  find _site -name '*.html' -exec sed -i '0,/<\/head>/s||<script src="/lernapps-count.js" defer></script>\n</head>|' {} +
fi

touch _site/.nojekyll
echo "built _site/"
