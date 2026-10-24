---
name: pdt
description: Use when work in a lernapps repository depends on how the lernapps.net platform is meant to work — its roles, what they exchange, its principles (free, thanks, no hidden data collection), the MVP being built, or how the system is built. Explains where the platform design and the architecture live and how to read them with the pdt42 and arc42 CLIs.
---

# The lernapps.net platform design

lernapps.net is designed as a platform in the sense of the Platform Design Toolkit (PDT, Boundaryless). The design is a pdt42 model in the repo [lernapps/docs](https://github.com/lernapps/docs), folder `docs/pdt42/`; rendered at <https://lernapps.net/docs/platform-design/>.

## Read it

```sh
git clone --depth 1 https://github.com/lernapps/docs /tmp/lernapps-docs
cd /tmp/lernapps-docs
npm ci                                     # the pdt42 CLI, pinned in package.json
npx pdt42 --dir docs/pdt42 get --type <type>   # list the elements of a type
npx pdt42 --dir docs/pdt42 get <id>            # one element, with what references it
```

The version is pinned in `package.json`. Each chapter is Markdown: prose explains why, `pdt42` blocks hold the model.

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

## The architecture

The architecture of the whole system is an arc42 model in the same repo, folder `docs/arc42/`; rendered at <https://lernapps.net/docs/architecture/>. One building block per repository; its interfaces name the pdt42 channels they realise (`x-realises`) and what they do not deliver yet (`x-missing-<channel>`).

```sh
npx arc42 --dir docs/arc42 get --type building-block   # the parts, one per repository
npx arc42 --dir docs/arc42 get --type interface        # what each part offers, and which channels it realises
npx arc42 --dir docs/arc42 get <id>                    # one element, e.g. bb-catalog
```

How to write arc42 is in the skill [arc42-language](https://github.com/doctoolchain/arc42-language).

Read the design and the architecture; change them only in lernapps/docs.
