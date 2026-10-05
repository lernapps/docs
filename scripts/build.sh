#!/usr/bin/env bash
# Builds the docs site into _site/ for https://lernapps.github.io/docs/.
# Tools are run with pinned versions via npx; the repo has no npm dependencies.
set -euo pipefail
cd "$(dirname "$0")/.."

BIZ42=@biz42/cli@0.6.0
MARKED=marked@18.0.14
PDT42=@pdt42/cli@0.6.2

rm -rf _site
mkdir -p _site/vision
cp site/index.html site/404.html site/stil.css _site/

npx --yes "$BIZ42" --dir docs/biz42 validate
npx --yes "$BIZ42" --dir docs/biz42 build --out _site/about --base /docs/about/

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
template = open("site/vision.template.html", encoding="utf-8").read()
content = open("_site/vision/content.html", encoding="utf-8").read()
open("_site/vision/index.html", "w", encoding="utf-8").write(template.replace("<!-- CONTENT -->", content))
PY
rm _site/vision/content.html

touch _site/.nojekyll
echo "built _site/"
