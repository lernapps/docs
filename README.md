# docs

Platform-level documentation of lernapps.net, served at <https://lernapps.net/docs/>.

This repo holds documents about **the platform as a whole and how the repos relate**. A document about a single repo lives in that repo, e.g. the app overview in [lernapps/apps](https://github.com/lernapps/apps) and the architecture of the Mathe-Karte in [lernapps/mathe-karte](https://github.com/lernapps/mathe-karte) ([ORGANIZATION.md §3.1](https://github.com/lernapps/.github/blob/main/ORGANIZATION.md#where-to-find-what)).

## Contents

| Path | Purpose | Published at |
|---|---|---|
| `docs/vision.md` | Why lernapps.net exists: the problem, personas, gaps, non-goals | `/docs/vision/` |
| `docs/biz42/` | The organisation: what it is accountable for, objectives, risks, capabilities, products ([biz42](https://github.com/mrsimpson/biz42)); cross-references the platform design | `/docs/about/` |
| `docs/pdt42/` | The product: platform design in the [pdt42](https://github.com/mrsimpson/pdt42) DSL (Platform Design Toolkit); cross-references the organisation | `/docs/platform-design/` |
| `skills/pdt/` | Agent skill for other repos: where the platform design lives and how to read it with the pdt42 CLI | – |
| `site/` | Index page, style, template for the vision page; `spa.css` fits the biz42 and pdt42 apps under the shared header | `/docs/` |
| `.vibe/` | Planning log of the platform design (not published) | – |
| `.agents/skills/` | Agent skills for authoring biz42 and arc42 | – |

Planned: cross-repo decisions as ADRs (manifest protocol, license, naming, reserved paths); today they are `decision` issues in [lernapps/.github](https://github.com/lernapps/.github/issues?q=label%3Adecision).

## Build

```bash
npm ci                  # the biz42 and pdt42 CLIs, marked and the shared site frame, pinned in package.json
npm run build           # scripts/build.sh: validates biz42 and pdt42, builds everything into _site/
npm run check           # lernapps-check: no external resources, links resolve, privacy notice and imprint linked
python3 -m http.server -d _site 8000   # preview; links assume the /docs/ prefix
```

Every page gets the header and footer of all lernapps.net sites (`lernapps-frame` from `@lernapps/site`, the shared site frame in [lernapps.github.io](https://github.com/lernapps/lernapps.github.io/tree/main/site-frame)), so the docs look and navigate like the home page and the app overview. Renovate keeps the CLIs and the site frame current.

Before a commit that touches a model, `.githooks/pre-commit` validates it and checks that blocks and the prose explaining them change together (`pdt42 diff --staged`, `biz42 diff --staged`). Activate it once per clone:

```bash
git config core.hooksPath .githooks
```

After reviewing a finding, accept it for one commit with `PDT42_CONSISTENT=<commit>` or `BIZ42_CONSISTENT=<commit>` (the command prints the value).

GitHub Pages serves the `gh-pages` branch: `pages.yml` publishes `main` at its root, with the shared site actions of [lernapps/tooling](https://github.com/lernapps/tooling), the same for every site. Every pull request gets a preview at `https://lernapps.net/docs/pr-preview/pr-<number>/` (`pr-preview.yml`), built with `SITE_PATH_PREFIX` and `SITE_PREVIEW` (banner and `noindex`) and with `PDT42_DIFF_BASE` set to the base branch, so it also contains `platform-design-diff/` and `about-diff/`: the changes of the platform design (pdt42) and of the organisation (biz42) since the merge base, each as one page, plus `changes.json`. One comment on the pull request, updated on every push, links the preview and the change pages and lists the changed elements (`scripts/docs-review-summary.mjs`). The preview is removed when the pull request closes. Locally: `PDT42_DIFF_BASE=origin/main npm run build` (compares commits, not the working tree).

## License

The texts in this repo are licensed under [CC BY-SA 4.0](LICENSE) (Creative Commons Attribution-ShareAlike 4.0 International). This covers the few scripts and templates as well, so the whole repo has one license. Contributions are made under the same license.
