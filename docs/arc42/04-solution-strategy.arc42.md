# Solution Strategy

lernapps.net reaches its quality goals with a system that has nothing to run: static pages and apps in the browser,
built and served by GitHub, with the platform's rules carried by guidance, templates and checks instead of by people.
The strategy follows from the constraints of chapter 2 and is made of the decisions in chapter 9.

```arc42
:::solution-strategy
id: strategy-architecture
title: Static, served from one place, with the rules in the tools
addresses: qg-fast-loading, qg-accessible, qg-nothing-collected, qg-reliable, qg-learnable-for-creators
:::
```

## System decomposition

One building block per repository (chapter 5). The catalog is the core: it finds, lists, checks and serves apps and
takes the thanks. The tooling and the app templates are where the rules live for creators and their AI assistants.
The website gives the platform its face and the frame for every site; the docs hold the models; the organisation
repository holds the rules for all repositories.

| Quality goal | How the strategy reaches it | Decisions |
|---|---|---|
| Fast loading | Static pages, built in advance; quiz and explainer apps from runtimes that are built for speed | `dec-static-sites`, `dec-archetypes` |
| Accessible | Templates and the site frame bring accessibility; every page is checked before it is published | `dec-archetypes`, `dec-check-fitness` |
| Nothing collected | Apps in the browser only; the catalog measures what an app sends before it lists it; counting only on the platform's pages | `dec-check-fitness`, `dec-counting-goatcounter`, `dec-serve-copies` |
| Reliable | Every listed app served from lernapps.net under an address that keeps working; thanks behind one interface | `dec-serve-copies`, `dec-thanks-interface` |
| Learnable for creators | Guidance for AI assistants, archetypes that carry the rules, a CLI that checks | `dec-guidance-for-assistants`, `dec-archetypes` |

## Technology and communication approach

Everything is static: Eleventy for the platform's sites, Vite and Vue for the apps' runtimes, TypeScript throughout.
The repositories meet through packages and actions pinned to a commit and through pull requests; there is no API
between them (`dec-pinned-by-commit`). The only services outside GitHub are the domain, GoatCounter for the
platform's open counts and, for now, e-mail for thanks.

## Operational approach

GitHub is the means of production: Actions build, check and publish; Pages serves; Renovate keeps the pins current.
Pull requests merge by policy once their checks pass; the owner decides, and nothing waits on them. Nothing runs that costs money or needs looking after
(`qg-operable-by-one`).
