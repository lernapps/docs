---
name: pdt
description: Use when work in a lernapps repository depends on how the lernapps.net platform is meant to work — its roles, what they exchange, its principles (free, thanks, no hidden data collection) or the MVP being built. Explains where the platform design lives and how to read it with the pdt42 CLI.
---

# The lernapps.net platform design

lernapps.net is designed as a platform in the sense of the Platform Design Toolkit (PDT, Boundaryless). The design is a pdt42 model in the repo [lernapps/docs](https://github.com/lernapps/docs), folder `docs/pdt42/`; rendered at <https://lernapps.net/docs/platform-design/>.

## Read it

```sh
git clone --depth 1 https://github.com/lernapps/docs /tmp/lernapps-docs
cd /tmp/lernapps-docs
npx @pdt42/cli@0.6.2 --dir docs/pdt42 get --type <type>   # list the elements of a type
npx @pdt42/cli@0.6.2 --dir docs/pdt42 get <id>            # one element, with what references it
```

Use the version pinned in `scripts/build.sh`. Each chapter is Markdown: prose explains why, `pdt42` blocks hold the model.

## Where to find what

| You need | Type | Chapter |
|---|---|---|
| Who takes part: roles, portraits | `entity` | `1-exploration/e2-scan.pdt42.md` |
| The platform, its narrative and owner | `platform` | `2-design/d1-ecosystem.pdt42.md` |
| What roles give each other | `motivation` | `2-design/d3-motivations.pdt42.md` |
| Core relationships | `relationship` | `2-design/d4-relationships.pdt42.md` |
| Transactions and channels | `transaction`, `channel` | `2-design/d5-transactions.pdt42.md` |
| How roles get better (services) | `learning-engine`, `service` | `2-design/d6-learning-engine.pdt42.md` |
| Journeys and value propositions | `experience` | `2-design/d7-experiences.pdt42.md` |
| The MVP and what it must prove | `mvp`, `assumption` | `2-design/d8-mvp.pdt42.md` |

Decisions behind the design are summarised in `.vibe/development-plan-feat-platform-design.md` (key decisions KD-xx), e.g. KD-17 (thanks as the currency) and KD-18 (no hidden data collection; the apps collect nothing).

Read the design; change it only in lernapps/docs.
