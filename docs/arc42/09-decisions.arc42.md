# Architecture Decisions

The decisions the platform made itself, as opposed to the constraints it has to follow (chapter 2). Decisions that
concern only one repository are recorded in that repository's architecture and linked from there.

## Serve a copy of every listed app

**Context.** If the catalog only linked each app at its creator's own address, the provider of that address would be
responsible for data protection, and a school's data protection officer would ask exactly
that; links would also break when an app moves, and an address like `name.github.io` reads as a private account ([KD-21](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-21-lernappsnet-serves-a-copy-of-every-listed-app-lernappsapps58-2026-10-20)).

**Decision.** When an app is listed, the catalog publishes a copy of its built release under lernapps.net and links
that copy. Authorship and serving are separated: the creator keeps the app, the licence, the repository and their own
address and decides on new versions; the copy follows the creator's releases, and delisting removes it.

**Consequences.** Every listed app falls under one provider, one privacy notice and one address that keeps working.
All copies share one origin with each other and with the platform, so an app may use only its own data in the
browser. The catalog has to build and publish copies and keep them current. Rejected: linking the creator's address.

```arc42
:::decision
id: dec-serve-copies
title: Serve a copy of every listed app
status: accepted
date: 2026-10-20
addresses: qg-reliable, qg-nothing-collected, con-data-protection-law, con-creator-stays-author
x-source: pdt42 KD-21, lernapps/apps#58
:::
```

## Check fitness, do not trust declarations

**Context.** Adults have to see at a glance that an app may be used; trust has to be built in rather than checked by
them ([KD-17](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-17-acute-moments-and-thanks-as-the-currency-d7)). What an app does with data cannot be taken from what its creator says.

**Decision.** Before an app is listed, the catalog checks it by machine: what it sends to third parties, what it
keeps in the browser, whether its links and topics hold, and the platform's rules. On request, the review agent
reviews it as part of listing.

**Consequences.** Only apps that pass are listed, and the fitness shown in the catalog is measured. The checks have
to be maintained with the rules. Rejected: declarations by the creator, or a manual review of every app.

```arc42
:::decision
id: dec-check-fitness
title: Check fitness, do not trust declarations
status: accepted
date: 2026-10-05
addresses: qg-nothing-collected, qg-accessible, qg-understandable, con-apps-collect-nothing, con-data-protection-law, risk-shared-origin
x-source: pdt42 KD-17, KD-21
:::
```

## Guidance for AI assistants is the main lever

**Context.** Supply does not come by itself ([KD-14](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-14-supply-does-not-come-by-itself-d4)), and creators build through their AI assistants ([KD-10](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-10-six-peer-roles-github-as-means-of-production-d1), [KD-11](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-11-portraits-of-the-six-peer-roles-d2)).
The platform's rules have to reach the apps without creators having to learn them.

**Decision.** The guidance for building apps, written for AI assistants, is the common thread of the platform ([KD-16](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-16-guidance-is-the-common-thread-of-the-learning-engine-d6),
[Embed building in agent guidance](https://lernapps.net/docs/platform-design/#1-exploration/e6-plays.pdt42.md:el-pl-guided-building)): process guidance by phase, skills, and the tooling's CLI that creates and checks an app.

**Consequences.** The quality of the apps depends on the guidance; the guidance has to be measured, which the evals
of the tooling do. Rejected: documentation for people only.

```arc42
:::decision
id: dec-guidance-for-assistants
title: Guidance for AI assistants is the main lever
status: accepted
date: 2026-09-30
addresses: qg-learnable-for-creators, con-ai-assistants, risk-weak-supply
x-source: pdt42 KD-16, PP4
:::
```

## Three archetypes whose templates carry the rules

**Context.** A creator should meet the rules every app has to meet (accessible, nothing collected, fast, browser
only) without knowing them.

**Decision.** Apps are built from one of three archetypes: quiz, explainer and interactive app. Each has a template
and a runtime that carry the rules into the code; the tooling creates an app from them.

**Consequences.** Quiz and explainer apps get their speed, accessibility and privacy from the runtime; the
interactive app is free in its form and relies more on the checks. Details are in the architectures of tooling and
app-templates.

```arc42
:::decision
id: dec-archetypes
title: Three archetypes whose templates carry the rules
status: accepted
date: 2026-10-08
addresses: qg-learnable-for-creators, qg-fast-loading, qg-accessible, qg-nothing-collected, con-apps-browser-only
x-source: lernapps/tooling and lernapps/app-templates architectures
:::
```

## Building blocks pinned by commit, kept current by Renovate

**Context.** The repositories use each other: the site frame, the tooling CLI and the archetypes. One owner cannot
update every repository by hand.

**Decision.** A repository uses another by a pinned commit (packages from git, actions by commit). When a pinned
block changes, Renovate passes the change on as a pull request in every repository that uses it.

**Consequences.** Every repository builds reproducibly, and updates arrive as pull requests that only need a merge.
Rejected: published npm versions, which would need a release process.

```arc42
:::decision
id: dec-pinned-by-commit
title: Building blocks pinned by commit, kept current by Renovate
status: accepted
date: 2026-10-08
addresses: qg-operable-by-one, con-free, con-one-owner, con-github-means-of-production, risk-one-owner
x-source: package.json of apps, tooling and docs; Renovate configuration of the organisation
:::
```

## Static sites with Eleventy

**Context.** The platform's sites are static (`con-platform-static-for-now`) and served by GitHub Pages.

**Decision.** The website and the catalog are built with Eleventy and the shared site frame.

**Consequences.** Pages work without JavaScript and load fast; there is nothing to operate.

```arc42
:::decision
id: dec-static-sites
title: Static sites with Eleventy
status: accepted
date: 2026-09-28
addresses: qg-fast-loading, qg-operable-by-one, con-platform-static-for-now
x-source: lernapps/.github#24
:::
```

## One domain: lernapps.net

**Context.** The platform's sites lived at `lernapps.github.io` and its project sites below it. The owner owns the
domain lernapps.net, and links that people pass on should not depend on GitHub (lernapps/.github#35).

**Decision.** lernapps.net is the custom domain of the organisation's site, lernapps.github.io. Every project site
of the organisation without a domain of its own is served under it, at `lernapps.net/<repo>/`.

**Consequences.** Links stay valid if the hosting changes; GitHub redirects the old `lernapps.github.io` addresses.
All sites share one origin in the browser, which the checks of the site frame and the catalog have to respect.

```arc42
:::decision
id: dec-one-domain
title: "One domain: lernapps.net"
status: accepted
date: 2026-10-08
addresses: qg-reliable, con-github-means-of-production, risk-external-services
x-source: lernapps/.github#35
:::
```

## Count openly with GoatCounter, on the platform's pages only

**Context.** The platform wants to learn whether valuable use happens, without collecting data ([KD-18](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-18-no-hidden-data-collection-open-counting-on-the-platform-only-d5-d7-d8)). The apps
collect nothing.

**Decision.** The platform's own pages count through GoatCounter, an external service, carried by the site frame:
only totals, without cookies or browser storage. The apps never count.

**Consequences.** Counts are totals without personal data; they cannot be deduplicated and are no ranking signal.
GoatCounter is an external dependency of the platform's pages, not of the apps.

```arc42
:::decision
id: dec-counting-goatcounter
title: Count openly with GoatCounter, on the platform's pages only
status: accepted
date: 2026-10-20
addresses: con-open-counting, con-apps-collect-nothing, qg-nothing-collected
x-source: pdt42 KD-18; owner decision 2026-10-23
:::
```

## Thanks as an interface of the catalog

**Context.** Thanks is the currency that keeps creators contributing ([KD-17](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-17-acute-moments-and-thanks-as-the-currency-d7)); it has to arrive with one click, also
from school networks ([KD-19](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-19-two-stages-before-the-platform-is-tested-with-teachers-d8-draft)).

**Decision.** Thanks is an interface of the catalog (`if-thanks`) that the catalog and the apps link to. Its
realisation can change behind it; it is realised as a prepared e-mail to the platform owner.

**Consequences.** Apps and pages do not depend on how thanks are realised. What the e-mail realisation does not
deliver yet is recorded at the interface (`if-thanks`); until then it rests on the owner (`risk-one-owner`).

```arc42
:::decision
id: dec-thanks-interface
title: Thanks as an interface of the catalog
status: accepted
date: 2026-10-23
addresses: qg-reliable, risk-thanks-not-delivered
x-source: pdt42 KD-17, KD-18; owner decision 2026-10-23
:::
```

## English contracts, the author's language inside an app

**Context.** The catalog reads every app's entry, and the platform's repositories share schemas and workflows. Apps
are built in their creators' own repositories, often in German (lernapps/.github#22).

**Decision.** Shared infrastructure is in English: repository names, identifiers, schemas such as the manifest, and
workflows. Text for learners, teachers and parents is in German. Inside an app's repository, its author decides; an
app with German names maps them to the English contract.

**Consequences.** The contract between an app and the catalog is the same for every app, whatever language its
repository uses.

```arc42
:::decision
id: dec-english-contracts
title: English contracts, the author's language inside an app
status: accepted
date: 2026-09-28
addresses: con-creator-stays-author
x-source: lernapps/.github#22; lernapps/.github ORGANIZATION.md "Language"
:::
```

## The learning map belongs to the catalog: one file per subject, one per curriculum

**Context.** The catalog shows which apps exist, not what there is to learn and which of it no app covers. A map of a subject needs the same source of truth for everyone: pages, assistants and the listing check. Curricula differ by Land and school type, are public documents of different quality, and cannot be captured all at once.

**Decision.** The catalog owns the learning map. A subject is one YAML file with its strands and, nested in them, its competencies, so a competency belongs to exactly one strand by the form of the file. A curriculum is one YAML file per subject that places competencies in grades; it may place only some of them, and every competency has a grade band that applies wherever a curriculum does not place it. Schemas are written in Zod and checked when the catalog is built, across files as well (ids, no cycles). The state of a curriculum is computed, not declared.

**Consequences.** The map stays static and readable without JavaScript, like all catalog pages (`con-platform-static-for-now`). Curricula can be contributed one by one, and a pull request is enough to add one. Subject models and curricula have to be maintained (`risk-map-upkeep`). Rejected: one file for everything, which could not grow step by step; a database, which the static platform does not have.

```arc42
:::decision
id: dec-learning-map-in-catalog
title: "The learning map belongs to the catalog: one file per subject, one per curriculum"
status: accepted
date: 2026-11-03
addresses: qg-operable-by-one, qg-understandable, qg-nothing-collected, con-platform-static-for-now, con-one-owner, risk-map-upkeep
x-source: lernapps/apps#115; lernapps/apps .vibe/development-plan-feat-learning-map.md KD-06, KD-09
:::
```

## One app, one strand; explainer format 2

**Context.** An app that covers a whole subject is too big to build and to keep; an app without a place in the subject cannot show which gap it closes. Counting what is covered and what is not only works if every competency has one owner.

**Decision.** In a subject whose explainer focus is the strand (`dec-explainer-focus`), an app may name one strand of one subject; it is recommended when the app is scoped, not required. An app without a strand (`strand: none`) is listed like any other, only not on the map. An app with a strand practises only the competencies of that strand and invents none; a missing competency is proposed to the catalog. As a rule a page practises one competency; several pages for a large competency are fine, and several competencies on one page are advised against. An explainer says its strand in format 2: its `app.yaml` has the strand or `none`, and every page names the competencies it practises, so the app's competencies are computed from its pages. Any other app lists its competencies in its catalog entry. Format 2 requires the field, so every explainer decides and none forgets; format 1 stays valid for apps that do not move.

**Consequences.** Coverage and gaps are counted without duplicates, and it is clear which app is responsible. Creators are advised to choose the strand when they plan an app; the guidance reads it from the map (`if-guidance`). The rules are enforced in three places: the catalog's listing rule `entry-learning-map` is an error (unknown id, competency of another strand); the review agent's judgements (`content-matches-competencies`, `strand-from-map`) are hints only; `lernapps check` gives early advice (warning `competencies-on-map`, hint `one-competency-per-page`). The explainer's build writes a list of its pages that the catalog reads instead of hand-written topics. Rejected: several strands per app in a subject whose strands separate; competencies belonging to several strands.

```arc42
:::decision
id: dec-one-app-one-strand
title: One app, one strand; explainer format 2
status: accepted
date: 2026-11-03
addresses: qg-learnable-for-creators, qg-understandable, con-creator-stays-author
x-source: lernapps/apps#115; lernapps/apps .vibe/development-plan-feat-learning-map.md KD-07, KD-08, KD-11
:::
```

## The subject decides whether apps stay in one strand

**Context.** In foreign languages and in German, the strands are woven together: a unit such as "Essen" needs words, grammar and texts, and many competencies of one strand require competencies of another (in French, grammar requires vocabulary and texts require both). In the sciences and in history, the strands separate: a strand of history is an epoch, and a strand of physics rarely requires another. An app that practises a unit across strands would not count as covering its grammar, and the map would show gaps that are not there (`s-gap-finding`).

**Decision.** Every subject file states the subject's explainer focus: `strand` (the default) or `competency`. With strand focus, an app stays in one strand (`dec-one-app-one-strand`). With competency focus, the competencies are what matters and the strands only illustrate; foreign languages and German have this focus. An explainer names either a strand (or `none`) or a subject, exactly one; an app with a catalog entry always has a subject there, the id of a subject of the map, whose name the catalog shows, and without a strand its competencies make it a unit app. An app that names a subject instead of a strand is a unit app: it may practise competencies of every strand of that subject, and it is allowed only in a subject with competency focus. A page practises competencies of one strand only, so the method stays the same within a strand. Prerequisites follow the order of the app: every direct prerequisite of a competency a page practises is practised or recapped on an earlier page, or linked in the page's text; a recapped competency's own prerequisites are not followed. A missing prerequisite is a gap if one of its ancestors is practised in the app, otherwise the app's entry, where a recap page helps. An app without pages has no order; there only gaps and entries are checked. With competency focus the check is stricter: the listing rejects wrong order and gaps and warns about an entry without recap, while with strand focus everything is a warning. The schema of the app cannot know the subject's focus, so `lernapps check` and the catalog check it.

**Consequences.** Coverage of languages counts what unit apps practise, and the map shows real gaps. A subject changes its focus by a pull request to its subject file, without code. Creators learn one field more and, in a language, one rule more about the order of pages (`qg-learnable-for-creators`); the explainers change nothing, and every catalog entry names its subject by its id on the map. The map research asks for each subject whether its strands separate or illustrate. Rejected: `strand: <subject>` as a value with two meanings; renaming `strand` to `focus`, which would have changed every explainer; a strand on each page, which can be computed from its competencies and could contradict them.

```arc42
:::decision
id: dec-explainer-focus
title: The subject decides whether apps stay in one strand
status: accepted
date: 2026-11-09
addresses: qg-learnable-for-creators, qg-understandable, con-creator-stays-author
x-source: lernapps/apps#226; lernapps/apps .vibe/development-plan-feat-cross-strand-languages.md KD-01 to KD-08
:::
```

## Licences: open source platform, copy-friendly apps

**Context.** The platform is built in the open; the copy of a listed app needs a licence that allows it ([KD-21](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-21-lernappsnet-serves-a-copy-of-every-listed-app-lernappsapps58-2026-10-20)).

**Decision.** The platform's own components are under the licences decided for the organisation (lernapps/.github#19).
A listed app needs a licence that allows the copy: MIT or Apache 2.0 for code, CC BY 4.0 for content.

**Consequences.** The listing has to know the app's licence.

```arc42
:::decision
id: dec-licences
title: "Licences: open source platform, copy-friendly apps"
status: accepted
date: 2026-10-20
addresses: con-creator-stays-author
x-source: lernapps/.github#19; pdt42 KD-21; owner decision 2026-10-23
:::
```
