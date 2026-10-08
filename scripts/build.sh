#!/usr/bin/env bash
# Builds the docs site into _site/ for https://lernapps.net/docs/.
# A pull request preview (pr-preview.yml) sets SITE_PATH_PREFIX=/docs/pr-preview/pr-<number>/ and
# SITE_PREVIEW=1: the biz42 app gets that base.
# The tools (biz42, pdt42, marked, the shared site frame) are pinned in package.json: run `npm ci` first.
# The shared site frame (@lernapps/site) adds the header and footer of all lernapps.net sites to every page,
# and the preview banner and noindex in a preview.
set -euo pipefail
cd "$(dirname "$0")/.."
export PATH="$PWD/node_modules/.bin:$PATH"
PREFIX="${SITE_PATH_PREFIX:-/docs/}"

rm -rf _site
mkdir -p _site/vision
cp site/index.html site/404.html site/stil.css _site/

biz42 --dir docs/biz42 validate
biz42 --dir docs/biz42 build --out _site/about --base "${PREFIX}about/"

pdt42 --dir docs/pdt42 validate
pdt42 --dir docs/pdt42 build --out _site/platform-design

# Review builds: with PDT42_DIFF_BASE set (e.g. origin/main in a pull request),
# also render the platform design's and the organisation's changes since the merge base with that ref as
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
fi

marked --gfm -i docs/vision.md -o _site/vision/content.html
python3 - <<'PY'
template = open("site/vision.template.html", encoding="utf-8").read()
content = open("_site/vision/content.html", encoding="utf-8").read()
open("_site/vision/index.html", "w", encoding="utf-8").write(template.replace("<!-- CONTENT -->", content))
PY
rm _site/vision/content.html

lernapps-frame --site /docs/ --source https://github.com/lernapps/docs --out _site
# The biz42 and pdt42 apps: keep their fixed menu button off the shared header (site/spa.css).
for app in _site/about _site/platform-design; do
  cp site/spa.css "$app/"
  sed -i 's|</head>|<link rel="stylesheet" href="spa.css">\n</head>|' "$app/index.html"
done

touch _site/.nojekyll
echo "built _site/"
