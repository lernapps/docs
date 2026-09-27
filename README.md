# docs

Platform-level documentation of lernapps.net, served at <https://lernapps.github.io/docs/>.

This repo holds documents about **the platform as a whole and how the repos relate**. A document about a single repo lives in that repo, e.g. the architecture of the map in [lernapps/map](https://github.com/lernapps/map) and that of the Mathe-Karte in [lernapps/mathe-karte](https://github.com/lernapps/mathe-karte) ([ORGANIZATION.md §3.1](https://github.com/lernapps/.github/blob/main/ORGANIZATION.md#31-repositories)).

## Contents

| Path | Purpose | Published at |
|---|---|---|
| `docs/vision.md` | Why lernapps.net exists: the problem, personas, gaps, non-goals | `/docs/vision/` |
| `docs/biz42/` | Business model in the [biz42](https://github.com/mrsimpson/biz42) DSL | `/docs/about/` |
| `site/` | Index page, style, template for the vision page | `/docs/` |
| `.vibe/` | Planning log of the edugo research phase (historical, not published) | – |
| `.agents/skills/` | Agent skills for authoring biz42 and arc42 | – |

Planned: cross-repo decisions as ADRs (manifest protocol, license, naming, reserved paths); today they are `decision` issues in [lernapps/.github](https://github.com/lernapps/.github/issues?q=label%3Adecision).

## Build

```bash
./scripts/build.sh      # validates biz42, builds everything into _site/
python3 -m http.server -d _site 8000   # preview; links assume the /docs/ prefix
```

No npm dependencies: the biz42 CLI and `marked` run via `npx` with pinned versions.

## History

This repo was `mrsimpson/edugo`, transferred on 2026-09-27; the project edugo is now lernapps.net. The web app (capability map and registry), its data, schemas and arc42 moved to [lernapps/map](https://github.com/lernapps/map) with their history.
