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
| `site/` | Index page, style, template for the vision page | `/docs/` |
| `.vibe/` | Planning log of the platform design (not published) | – |
| `.agents/skills/` | Agent skills for authoring biz42 and arc42 | – |

Planned: cross-repo decisions as ADRs (manifest protocol, license, naming, reserved paths); today they are `decision` issues in [lernapps/.github](https://github.com/lernapps/.github/issues?q=label%3Adecision).

## Build

```bash
./scripts/build.sh      # validates biz42 and pdt42, builds everything into _site/
python3 -m http.server -d _site 8000   # preview; links assume the /docs/ prefix
```

No npm dependencies: the biz42 and pdt42 CLIs and `marked` run via `npx` with pinned versions.

GitHub Pages serves the `gh-pages` branch: `pages.yml` publishes `main` at its root. Every pull request gets a preview at `https://lernapps.net/docs/pr-preview/pr-<number>/` (`pr-preview.yml`), built with `SITE_PATH_PREFIX` and `SITE_PREVIEW` (banner and `noindex` on the static pages) and with `PDT42_DIFF_BASE` set to the base branch, so it also contains `platform-design-diff/`: the platform design's changes since the merge base, as one page, plus `changes.json`. One comment on the pull request, updated on every push, links the preview and the change page and lists the changed elements. The preview is removed when the pull request closes. Locally: `PDT42_DIFF_BASE=origin/main ./scripts/build.sh` (compares commits, not the working tree).

## License

The texts in this repo are licensed under [CC BY-SA 4.0](LICENSE) (Creative Commons Attribution-ShareAlike 4.0 International). This covers the few scripts and templates as well, so the whole repo has one license. Contributions are made under the same license.
