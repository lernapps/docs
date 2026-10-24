# Quality Requirements

The quality goals describe properties of the running system. They are derived from the requirements in chapter 1,
which come from the platform model (pdt42). The first five drive the architecture; the last two are important but
give way when they conflict with the first five.

## 10.1 Quality Goals

## Fast loading

Adults look for an app in an acute moment, when a teacher takes over a class at short notice or a parent sees their child struggle ([KD-17](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-17-acute-moments-and-thanks-as-the-currency-d7)); a slow page
loses them. The core of the platform, the app catalog, and the apps it serves for the quiz and explainer archetypes
load in under a second. Interactive apps are free in their form and have no target here.

```arc42
:::quality-goal
id: qg-fast-loading
title: Fast loading
priority: high
x-iso25010: performance efficiency, time behaviour
x-derived-from: KD-17, x-app-in-minutes, x-child-struggles
:::
```

## Accessible

Every learner in a class has to be able to use an app that a teacher brings, and every adult has to be able to use
the catalog. Pages of the platform and the served apps can be used with assistive technology, with a keyboard and
on the small screens of class devices.

```arc42
:::quality-goal
id: qg-accessible
title: Accessible
priority: high
x-iso25010: usability, accessibility
x-derived-from: x-app-in-minutes, t-use-in-class
:::
```

## Nothing collected

Data protection law is the platform's only moat ([KD-05](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-05-the-only-moat-is-data-protection-law-and-terms-of-use-e3)): an app that collects data cannot be used in class. The
apps collect nothing at all. The platform counts single interactions on its own pages, openly and only as totals,
through an external counting service ([KD-18](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-18-no-hidden-data-collection-open-counting-on-the-platform-only-d5-d7-d8)).

```arc42
:::quality-goal
id: qg-nothing-collected
title: Nothing collected
priority: high
x-iso25010: security, confidentiality
x-derived-from: KD-05, KD-18, KD-21
:::
```

## Reliable

A link or QR code that a teacher has passed to a class has to work months later ([KD-08](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-08-brief-attention-for-small-learning-apps-closes-exploration-e7), [KD-21](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-21-lernappsnet-serves-a-copy-of-every-listed-app-lernappsapps58-2026-10-20)). Thanks is the
currency that keeps creators contributing ([KD-17](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-17-acute-moments-and-thanks-as-the-currency-d7)), so a thank-you has to arrive, also from filtered school networks
([KD-19](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-19-two-stages-before-the-platform-is-tested-with-teachers-d8-draft)), and an app has to keep working when the thanks or counting service cannot be reached ([KD-18](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-18-no-hidden-data-collection-open-counting-on-the-platform-only-d5-d7-d8)).

```arc42
:::quality-goal
id: qg-reliable
title: Reliable
priority: high
x-iso25010: reliability, availability and fault tolerance
x-derived-from: KD-08, KD-17, KD-18, KD-19, KD-21
:::
```

## Learnable for creators

Supply does not come by itself ([KD-14](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-14-supply-does-not-come-by-itself-d4)), and bringing creators on top is the most important play ([Bring creators on top](https://lernapps.net/docs/platform-design/#1-exploration/e6-plays.pdt42.md:el-pl-creators-up), [KD-07](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-07-attention-for-contributed-apps-is-the-scarce-resource-e6)). A
creator with an AI assistant gets to an app that meets every rule of the platform by following the guidance,
without knowing the rules beforehand.

```arc42
:::quality-goal
id: qg-learnable-for-creators
title: Learnable for creators
priority: high
x-iso25010: usability, learnability
x-derived-from: PP2, PP4, KD-14, KD-16, s-building-guidance
:::
```

## Understandable

Adults decide in a minute whether an app fits; creators decide whether to build one. The platform's pages say what
they need in plain language.

```arc42
:::quality-goal
id: qg-understandable
title: Understandable
priority: medium
x-iso25010: usability, appropriateness recognisability
x-derived-from: KD-17, KD-20
:::
```

## Operable by one person

The platform is free, run by one owner at near-zero cost, and may later pass to an association ([KD-04](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-04-no-asset-is-inimitable-e3), [KD-09](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-09-oliver-jägle-alone-owns-the-platform-2026-09-30),
[KD-20](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-20-idealistic-free-possibly-a-verein-later)). It runs without a server and without manual routine work.

```arc42
:::quality-goal
id: qg-operable-by-one
title: Operable by one person
priority: medium
x-iso25010: maintainability
x-derived-from: KD-04, KD-09, KD-20, E3 near-zero marginal cost
:::
```

## 10.2 Quality Scenarios

## Catalog loads in under a second

There is no measurement in visitors' browsers ([KD-18](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-18-no-hidden-data-collection-open-counting-on-the-platform-only-d5-d7-d8)), so the metric is synthetic.

```arc42
:::quality-scenario
id: qs-catalog-loads-fast
title: Catalog loads in under a second
quality: qg-fast-loading
stimulus: A teacher opens a page of the app catalog on a class device in a school network
response: The page is complete and usable
metric: p95 Largest Contentful Paint under 1 s over 20 synthetic runs per catalog page, mobile device profile with 4G throttling
:::
```

## Quiz and explainer apps load in under a second

The catalog only helps if the app it opens is as quick; the platform serves these apps, so their start counts too.

```arc42
:::quality-scenario
id: qs-apps-load-fast
title: Quiz and explainer apps load in under a second
quality: qg-fast-loading
stimulus: A student opens a served copy of a quiz or explainer app from a link or QR code
response: The first page of the app is usable
metric: p95 Largest Contentful Paint under 1 s over 20 synthetic runs per app, same profile as the catalog; interactive apps excluded
:::
```

## Accessible on class devices

Every page that reaches a class is checked before it is published, at the level the platform's rules name.

```arc42
:::quality-scenario
id: qs-accessible-pages
title: Accessible on class devices
quality: qg-accessible
stimulus: A platform page or a served app is published
response: The page can be used with a screen reader and a keyboard, at a width of 360 px
metric: WCAG 2.1 AA met; 0 serious or critical findings of the automated accessibility checks
:::
```

## No request before a click

What a served app sends is measured, not taken from what its creator says ([KD-21](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-21-lernappsnet-serves-a-copy-of-every-listed-app-lernappsapps58-2026-10-20), checked rather than declared).

```arc42
:::quality-scenario
id: qs-no-request-before-click
title: No request before a click
quality: qg-nothing-collected
stimulus: A student opens a served app and uses it
response: The app sends nothing to third parties and keeps only its own data in the browser
metric: 0 requests to other hosts before a click; 0 cookies; storage only under the app's own keys
:::
```

## Counting only totals

The platform's counting is open: it says where a click is counted, and keeps nothing that points to a person ([KD-18](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-18-no-hidden-data-collection-open-counting-on-the-platform-only-d5-d7-d8)).

```arc42
:::quality-scenario
id: qs-counting-totals
title: Counting only totals
quality: qg-nothing-collected
stimulus: An adult clicks a counted button on a platform page
response: The external counting service registers one count, explained where the click happens
metric: no cookie, no browser storage, no personal data kept; only totals are visible
:::
```

## Links keep working

A served copy keeps its address, whatever the creator does with their own ([KD-21](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-21-lernappsnet-serves-a-copy-of-every-listed-app-lernappsapps58-2026-10-20)).

```arc42
:::quality-scenario
id: qs-links-keep-working
title: Links keep working
quality: qg-reliable
stimulus: A student opens a link or QR code to a listed app that a teacher passed on months ago
response: The served copy of the app opens
metric: 0 broken links to listed apps in the catalog's link check
:::
```

## Update without a gap

The copy follows the creator's releases ([KD-21](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-21-lernappsnet-serves-a-copy-of-every-listed-app-lernappsapps58-2026-10-20)); while it changes, the address must not fall back to nothing or to the creator's address.

```arc42
:::quality-scenario
id: qs-update-without-gap
title: Update without a gap
quality: qg-reliable
stimulus: A creator releases a new version of a listed app
response: The address of the app serves a copy at every moment of the update
metric: 0 requests to the app's address answered without a copy during an update
:::
```

## Thanks arrive from school networks

The first draft of the platform is only a success if thanks get through the filters of school networks ([KD-19](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-19-two-stages-before-the-platform-is-tested-with-teachers-d8-draft)).

```arc42
:::quality-scenario
id: qs-thanks-arrive
title: Thanks arrive from school networks
quality: qg-reliable
stimulus: A teacher clicks "thanks" in a filtered school network
response: The thank-you is counted and reaches the creator
metric: counted in at least 80 % of the school networks of the creators who teach (KD-19 "most")
:::
```

## Apps work when the service is down

Thanks and counting are optional for the user; their failure must never break an app or a page ([KD-18](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-18-no-hidden-data-collection-open-counting-on-the-platform-only-d5-d7-d8)).

```arc42
:::quality-scenario
id: qs-service-down
title: Apps work when the service is down
quality: qg-reliable
stimulus: The thanks or counting service is blocked or unavailable
response: The app and the page work as before; the thanks step steps aside quietly
metric: 0 errors and no visible disturbance
:::
```

## A creator gets to a listable app

The evals measure this with a simulated creator.

```arc42
:::quality-scenario
id: qs-creator-gets-listable-app
title: A creator gets to a listable app
quality: qg-learnable-for-creators
stimulus: A creator who does not know the rules asks an AI assistant to build an app with the platform's guidance
response: The assistant builds an app that passes lernapps check and can be listed
metric: lernapps check passes in the eval runs of each archetype; at most two questions to the creator per turn
:::
```

## A rule changes

New rules must not make listing harder: they reach creators through the tools, not through reading.

```arc42
:::quality-scenario
id: qs-rule-changes
title: A rule changes
quality: qg-learnable-for-creators
stimulus: The platform adds or changes a rule every listed app has to meet
response: Guidance, templates and checks carry the rule; creators do not have to learn it from documentation
metric: the rule has an id, a check and a guidance entry in one change; measured by reviewing the pull request
:::
```

## Decide in a minute

An adult in an acute moment ([KD-17](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-17-acute-moments-and-thanks-as-the-currency-d7)) gives the catalog about a minute.

```arc42
:::quality-scenario
id: qs-decide-in-a-minute
title: Decide in a minute
quality: qg-understandable
stimulus: A teacher who does not know lernapps.net opens the catalog for a topic and grade
response: The teacher can say whether there is a fitting app, and if not, how to get one built
metric: 4 of 5 teachers who do not know lernapps.net decide within one minute; observed once before the real MVP (KD-19)
:::
```

## No running costs

The platform is free and has no income ([KD-20](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-20-idealistic-free-possibly-a-verein-later)); its costs must stay at the domain.

```arc42
:::quality-scenario
id: qs-no-running-costs
title: No running costs
quality: qg-operable-by-one
stimulus: A month of operation with all listed apps served
response: The platform and the copies run on free hosting
metric: 0 € per month for hosting and operation, apart from the domain; measured on the invoices
:::
```

## Updates without a manual step

One owner cannot update every repo and copy by hand ([KD-09](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-09-oliver-jägle-alone-owns-the-platform-2026-09-30)).

```arc42
:::quality-scenario
id: qs-updates-without-manual-step
title: Updates without a manual step
quality: qg-operable-by-one
stimulus: A new version of a listed app or of a shared building block is released
response: The update reaches every repo and every served copy by pull request
metric: no step by the owner other than merging, where a merge is not automatic; measured by reviewing the update workflows
:::
```
