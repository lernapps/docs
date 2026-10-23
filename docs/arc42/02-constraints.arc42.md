# Architecture Constraints

The constraints come from outside the system's design: from law, from the economic platform model (pdt42) and from
the rules of the organisation. Where the platform itself chose a way, such as serving a copy of every listed app or
checking fitness instead of trusting declarations, that choice is a decision in chapter 9, not a constraint here.

## Organisational constraints

## Data protection law decides whether an app may be used in school

Data protection law (GDPR) and terms of use can completely prevent an app from being used in class; there is no
way around them. The platform model names them its only moat and decides not to fight it but to ease the
interaction with it ([KD-05](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-05-the-only-moat-is-data-protection-law-and-terms-of-use-e3)). Every other constraint on data follows from this one.

```arc42
:::constraint
id: con-data-protection-law
title: Data protection law decides whether an app may be used in school
category: organizational
source: GDPR; pdt42 E3 moat "Data protection law and terms of use", KD-05
:::
```

## The apps collect nothing

A listed app collects no data at all: no accounts, no counters, no cookies, no requests to third parties, nothing
kept about a learner. This holds for every archetype and every creator, without exception. The system has to make this easy to
meet and has to check it.

```arc42
:::constraint
id: con-apps-collect-nothing
title: The apps collect nothing
category: organizational
source: pdt42 KD-18, PP1; owner decision 2026-10-23
:::
```

## The platform counts only openly and only totals

On its own pages, the platform may count single interactions to learn whether valuable use happens: only explicit
actions, only totals, explained right where the click happens, without cookies or browser storage and without
personal data. Codes in referral links name a wave or a channel, never a person, and stay in the address only,
because storing them in the browser would need consent (§ 25 TDDDG).

```arc42
:::constraint
id: con-open-counting
title: The platform counts only openly and only totals
category: organizational
source: pdt42 KD-18, § 25 TDDDG; owner decision 2026-10-23
:::
```

## The creator stays the author

The creator keeps the copyright, the licence, the repository and their own address, and decides on new versions.
Whatever the platform does with an app, it does not change the app's content, and it serves only what the creator's
licence allows.

```arc42
:::constraint
id: con-creator-stays-author
title: The creator stays the author
category: organizational
source: copyright law; pdt42 KD-21 "authorship and serving are separated"
:::
```

## Free, without income

The platform is free to use and lives on thanks; no money is to be earned ([KD-17](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-17-acute-moments-and-thanks-as-the-currency-d7), [KD-20](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-20-idealistic-free-possibly-a-verein-later)). Apart from the domain,
there is no budget for hosting, services or licences.

```arc42
:::constraint
id: con-free
title: Free, without income
category: organizational
source: pdt42 KD-17, KD-20
:::
```

## One owner, and later an association

One person owns and runs the platform today ([KD-09](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-09-oliver-jägle-alone-owns-the-platform-2026-09-30)). If it takes off, it may become a registered association that
belongs to those who fill it with life ([KD-20](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-20-idealistic-free-possibly-a-verein-later)). Nothing in the system may depend on that one person beyond their
role as owner.

```arc42
:::constraint
id: con-one-owner
title: One owner, and later an association
category: organizational
source: pdt42 KD-09, KD-20; biz42 owner-platform
:::
```

## Technical constraints

## The apps run in the browser only

A listed app runs entirely in the browser: no server, no database, no installation. This answers the question
adults ask before bringing an app to students ([Frontend-only architecture](https://lernapps.net/docs/platform-design/#1-exploration/e3-assets-moats.pdt42.md:el-as-frontend-only)) and holds for all time.

```arc42
:::constraint
id: con-apps-browser-only
title: The apps run in the browser only
category: technical
source: pdt42 E3 asset "Frontend-only architecture", KD-04, KD-05
:::
```

## The platform is static for now

The platform's own sites are static today. A backend for the platform may come later, but never for the apps and
never with accounts for students ([KD-07](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-07-attention-for-contributed-apps-is-the-scarce-resource-e6)).

```arc42
:::constraint
id: con-platform-static-for-now
title: The platform is static for now
category: technical
source: pdt42 KD-07; owner decision 2026-10-23
:::
```

## GitHub is the means of production

GitHub is part of the platform's infrastructure, not a partner: repositories, issues, pull requests, Actions and
Pages carry every contribution and every publication ([D1](https://lernapps.net/docs/platform-design/#2-design/d1-ecosystem.pdt42.md), [KD-10](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-10-six-peer-roles-github-as-means-of-production-d1)).

```arc42
:::constraint
id: con-github-means-of-production
title: GitHub is the means of production
category: technical
source: pdt42 D1 platform-lernapps, KD-10
:::
```

## Creators build through their AI assistant

Creators build and list their apps through an AI assistant; the platform has to design for assistants as a partner
([KD-10](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-10-six-peer-roles-github-as-means-of-production-d1), [KD-11](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-11-portraits-of-the-six-peer-roles-d2)). Everything a creator needs from the platform has to be readable and usable by an assistant.

```arc42
:::constraint
id: con-ai-assistants
title: Creators build through their AI assistant
category: technical
source: pdt42 KD-10, KD-11, e-ai-assistants
:::
```
