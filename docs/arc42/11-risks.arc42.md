# Risks and Technical Debt

The risks and debts of the overall architecture, highest first. The risks of the platform model that are not
technical, such as its untested assumptions ([D8](https://lernapps.net/docs/platform-design/#2-design/d8-mvp.pdt42.md)), are in the business model (biz42), not here. Risks inside one
building block are in that block's own architecture.

## Too few creators

Supply does not come by itself ([KD-14](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-14-supply-does-not-come-by-itself-d4)): without creators who build and list apps, the catalog stays empty, and
nothing else of the system matters. The architecture can lower the effort of building an app, but it cannot bring
creators.

```arc42
:::risk
id: risk-weak-supply
title: Too few creators
severity: high
mitigation: The owner brings in the first creators personally (KD-19); the guidance for AI assistants, the archetypes and the checks keep the effort of building and listing an app low (dec-guidance-for-assistants, dec-archetypes).
x-source: pdt42 KD-14, KD-19; biz42 risk-weak-supply
:::
```

## One owner

One person owns and runs the platform (`con-one-owner`). If they are not available, nobody approves listings,
merges updates or answers thanks, and the platform stands still.

```arc42
:::risk
id: risk-one-owner
title: One owner
severity: high
mitigation: Everything is in public repositories and documented, and the routine work is merging pull requests (dec-pinned-by-commit), so someone else can take over; later an association may own the platform (KD-20). Accepted until then.
x-source: pdt42 KD-09, KD-20
:::
```

## All apps share one origin

Every served copy and every platform site lives under lernapps.net and so shares one origin in the browser
(`dec-serve-copies`, `dec-one-domain`). An app that got past the checks could read or change what other apps keep
in the browser.

```arc42
:::risk
id: risk-shared-origin
title: All apps share one origin
severity: medium
mitigation: The catalog checks before listing and on every new version what an app keeps in the browser and what it sends (dec-check-fitness); the templates keep storage behind a wrapper.
x-source: dec-serve-copies; apps src/_data/catalog.js; tooling rule storage-through-wrapper
:::
```

## A missing copy links the creator's address

The catalog links an app's copy only when the list of served copies (`start/copies.txt`) has the copy at the
entry's commit; otherwise it links the entry's url, the creator's own address. This happens, for example, after an
update whose copy is not built yet, or when building the copy fails. People then open the app outside lernapps.net,
which the privacy notice does not cover; this contradicts `dec-serve-copies` and `qs-update-without-gap`.

```arc42
:::ignore H007 no decision yet: the proposed mitigation waits for the owner :::
:::risk
id: risk-update-gap
title: A missing copy links the creator's address
severity: medium
mitigation: "Proposed: keep linking the previous copy until the new one is live, and never fall back to the creator's address."
x-source: apps src/_data/catalog.js header; pdt42 KD-21
:::
```

## Creators do not hear when their app helped

Thanks are the currency that keeps creators contributing ([KD-17](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-17-acute-moments-and-thanks-as-the-currency-d7)). What the thanks interface does not yet
deliver is described at the interface itself (`if-thanks`, chapter 5). The risk: as long as that holds, creators do not
hear when their app helped, and stop building.

```arc42
:::risk
id: risk-thanks-not-delivered
title: Creators do not hear when their app helped
severity: medium
mitigation: The interface stays when its realisation changes (dec-thanks-interface). OPEN: how thanks will be counted and passed on to the creator.
x-source: pdt42 KD-17, KD-18; dec-thanks-interface
:::
```

## Dependence on GitHub and GoatCounter

GitHub builds, checks, hosts and serves everything, under its free plans and terms of use
(`con-github-means-of-production`). If GitHub changes those, the platform has to move. GoatCounter counts the
platform's pages.

```arc42
:::risk
id: risk-external-services
title: Dependence on GitHub and GoatCounter
severity: medium
mitigation: Everything is git repositories and static files, which another static host can serve; the domain belongs to the owner (dec-one-domain). Without GoatCounter only the counts are lost, never a page or an app.
x-source: con-github-means-of-production; dec-counting-goatcounter
:::
```

## Load time is not measured

Fast loading is a quality goal of the highest priority (`qg-fast-loading`), with p95 LCP below one second for the
catalog and the served apps. Nothing measures it yet; there is no synthetic measurement in CI.

```arc42
:::ignore H007 no decision yet: the proposed measurement waits for the owner :::
:::risk
id: risk-load-time-unmeasured
title: Load time is not measured
severity: medium
mitigation: "Proposed: a synthetic measurement in CI as the quality scenarios describe it (qs-catalog-loads-fast, qs-apps-load-fast)."
x-source: qs-catalog-loads-fast, qs-apps-load-fast
:::
```

## The review agent's place

The review agent belongs to the catalog's listing (`if-listing`). Whether its implementation fits that place has not
been checked.

```arc42
:::ignore H007 no decision yet: to be checked in the catalog's own architecture :::
:::risk
id: risk-review-agent-place
title: The review agent's place
severity: low
mitigation: Check it when the catalog's own architecture is written.
x-source: owner, 2026-10-23 (session)
:::
```
