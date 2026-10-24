# How lernapps.net works

What people get from the platform, which part of the system delivers it, and how far it is built. Follow a link for the details.

> The idea, in the platform design's words: Free to use, kept alive by thanks. Adults and students find an active-learning app they can use right away, confident that it may be used; creators list theirs with almost no effort and hear when it helped. A thank-you, free and anonymous, is what keeps the platform alive.

Today, 6 of the 8 services the three journeys need are built, and 2 only in part: “Giving feedback and thanks” and “Insight into use and feedback”. What is missing is described right after the journeys.

## Who takes part

- **[Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters):** Adults who come across apps built by others, browse them and bring them to their students or their own children: teachers and parents.
- **[App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators):** Engaged people who build small educational apps, typically with AI tools, for a gap they noticed themselves.
- **[Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students):** The learners the apps are built for.
- **[Platform owner](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-platform-owner):** Oliver Jägle owns and shapes the platform strategy.

Around them: [School gatekeepers](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-gatekeepers), [Teacher platforms (commercial or non-profit)](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-teacher-platforms), [Social media](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-social-media), [GitHub](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-github), [AI assistants](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-ai-assistants).

## How to read a journey

A journey is a sequence of steps people take. Where the platform helps with a step, it offers a service. The service reaches people through a channel, such as a page, a link or a template. A part of the system delivers the channel through one of its interfaces.

For example: in the step "Find an app for a topic and grade", the platform offers the service "Finding apps by topic and grade". It reaches people through the channel "One place to find apps", which the interface "Catalog pages" of the part "Catalog" delivers.

## The three journeys

The first two journeys bring an app to learners, in class and at home. The third is the creator's: building an app, listing it and hearing that it helped.

### [An app in class within minutes](../platform-design/#2-design/d7-experiences.pdt42.md:el-x-app-in-minutes)

The journey of a teacher a few minutes before a lesson: find an app for this topic and grade, see at a glance that it may be used, put it on the projector or the class's devices, and say thanks afterwards. It may be used because the platform lists only apps that pass its checks of fitness for use and serves each one itself, under lernapps.net and its privacy notice.

Mainly for [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters); also involves [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators), [Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students). What they get: The right active-learning app for this topic and grade, running in class within minutes, safe to use without checking it yourself.

1. [Find an app for a topic and grade](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-find-app)
   - **[Finding apps by topic and grade](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-finding)** — Built
     - For [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters): Helps adults find a fitting app in one place.
     - Channel: [One place to find apps](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-app-overview).
     - Delivered by: [Catalog pages (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-catalog-pages).
1. [Confirm an app may be used](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-confirm-fitness)
   - **[Clarity on fitness for use](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-fitness-clarity)** — Built
     - For [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters): Answers whether an app may be used, before an adult passes it on to a learner.
     - Channel: [Visible fitness for use](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-fitness-signal).
     - Delivered by: [Catalog pages (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-catalog-pages), [Home pages (Website)](../architecture/#05-building-blocks.arc42.md:el-if-home-pages), [Listing (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-listing).
1. [Bring an app to students](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-bring-app)
   - **[Starting an app right away](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-start-right-away)** — Built
     - For [Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students): Students open an app an adult brought to them and start right away, without installation or sign-up: a link or QR code is enough.
     - Channel: [Starting an app from a link](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-direct-start).
     - Delivered by: [Served apps (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-served-apps).
1. [Use an app in class](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-use-in-class)
1. [Thank the creator](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-thank-creator-adult) · [Give feedback from classroom use](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-give-feedback)
   - **[Giving feedback and thanks](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-giving-back)** — Partly built
     - For [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters), [Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students): Makes it easy for adults and students to give feedback, recommendations and thanks, without accounts and without identifying students. It explains, without being pushy, that a thank-you is what keeps the free platform alive.
     - Channel: [Returning use and praise to creators](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-feedback).
     - Delivered by: [Thanks (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-thanks).

### [Practice tonight, before the test](../platform-design/#2-design/d7-experiences.pdt42.md:el-x-practice-tonight)

The journey of a parent the evening before a test: find an app the child can start right away for the topic of tomorrow's test, let the child practise, and say thanks afterwards; the child can come back to the app or find the next one alone. The setting is the kitchen table, not the classroom, and the goal is the same as the child's: the next test. The app starts from lernapps.net like every listed app, so parents do not have to judge a stranger's address.

Mainly for [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters); also involves [Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students), [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators). What they get: Tonight, before tomorrow's test: an app your child can start right away.

1. As in the journey “An app in class within minutes”: [Find an app for a topic and grade](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-find-app) · [Confirm an app may be used](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-confirm-fitness) · [Bring an app to students](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-bring-app).
1. [Learn with an app](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-learn-with-app)
   - Happens inside the app, without the platform.
1. [Return to an app](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-return-to-app)
   - **[Finding apps before a test](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-student-finding)** — Built
     - For [Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students): Helps students return to apps and find new ones for their topic on their own, for instance before a test.
     - Channel: [One place to find apps](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-app-overview) (See above.)
     - Delivered by: [Catalog pages (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-catalog-pages).
1. As in the journey “An app in class within minutes”: [Thank the creator](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-thank-creator-adult).

### [List an app and hear it is used](../platform-design/#2-design/d7-experiences.pdt42.md:el-x-list-and-hear-back)

The journey of the supply side: a creator who built an app for their own class lists it with almost no effort and then hears whether and how it helped elsewhere. Creators do not start for the reach, but use and praise keep them going. The thanks they receive come from the one click every user is asked for. The platform serves a copy of the app under lernapps.net, so the creator stays the author but no longer answers to schools for data protection; in return the app needs a licence that allows the copy.

Mainly for [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators); also involves [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters). What they get: Build your app faster with good guidance, list it in minutes without answering to schools for data protection yourself, and hear with every thank-you when it helped a class beyond your own.

1. Building the app:
   - **[Guidance for building apps](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-building-guidance)** — Built
     - For [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators): Helps creators build apps with their AI assistant that are easy to use and fit the platform. Creators get it even if nobody else uses their app.
     - Channel: [Guidance an AI assistant can follow](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-guidance).
     - Delivered by: [Archetypes (App templates)](../architecture/#05-building-blocks.arc42.md:el-if-archetypes), [Guidance (Tooling)](../architecture/#05-building-blocks.arc42.md:el-if-guidance), [Home pages (Website)](../architecture/#05-building-blocks.arc42.md:el-if-home-pages), [Tooling CLI (Tooling)](../architecture/#05-building-blocks.arc42.md:el-if-tooling-cli).
1. [List an app](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-list-app)
   - **[Help to list an app](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-listing-help)** — Built
     - For [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators): Takes the effort out of the first listing, the hurdle for creators.
     - Channel: [Effortless listing](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-listing).
     - Delivered by: [Listing (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-listing).
1. [Use an app in class](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-use-in-class) · [Thank the creator](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-thank-creator-adult) · [Give feedback from classroom use](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-give-feedback) · [Recommend an app](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-recommend-app)
   - **[Insight into use and feedback](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-use-insight)** — Partly built
     - For [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators): Shows creators whether and how their app is used, with feedback and thanks. This is the reputation flow that keeps them.
     - Channel: [Use and praise made visible to the creator](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-creator-insight).
     - Delivered by: [Site frame (Website)](../architecture/#05-building-blocks.arc42.md:el-if-site-frame), [Thanks (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-thanks).

## What is missing

The journeys hold up to the point where use and praise should flow back to the creator. These channels are delivered only in part: what the interfaces that deliver them do not do yet, and which services that affects.

### [Returning use and praise to creators](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-feedback)

- [Thanks (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-thanks): Today a click opens a prepared e-mail from the sender's own account; thanks and feedback arrive, but they are neither anonymous nor counted, and recommendations are not recorded.
- Affects: [Giving feedback and thanks](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-giving-back).

### [Use and praise made visible to the creator](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-creator-insight)

- [Site frame (Website)](../architecture/#05-building-blocks.arc42.md:el-if-site-frame): Only visits to an app's page in the catalog are counted, not the use of the app itself, and only the platform owner sees the totals.
- [Thanks (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-thanks): Thanks reach the creator only if the platform owner passes them on.
- Affects: [Insight into use and feedback](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-use-insight).

## Planned services

The platform design names these services too. The three journeys do not require them, and none is built yet.

- **[Building on existing apps](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-build-on-apps)** — Not built yet
  - For [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators): Lets creators start from an existing app instead of from scratch, and lets others build on theirs.
- **[Contributing best practices to the guidance](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-contribute-practices)** — Not built yet
  - For [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators): Lets experienced creators bring their own best practices into the guidance for building apps. Whoever shapes the guidance shapes the platform, so this is the path from creator to co-owner.
- **[Assembling apps for a class](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-class-sets)** — Not built yet
  - For [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters): Lets adults bundle apps for one class and bring them to students in one step, so students start without installation or sign-up.
  - Channel: [Passing apps on to a class](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-collections).
  - Would support: [Bring an app to students](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-bring-app).
- **[From using to adapting apps](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-adapt-apps)** — Not built yet
  - For [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters), [Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students): Opens the path from using apps to making them: adults and students adapt an app or build their own, using the guidance for building apps.

## Where this leaves the platform

6 of the 8 services the journeys need are in place. Open are “Giving feedback and thanks” and “Insight into use and feedback”. Back to the idea at the top: these decide whether the platform can live on thanks.

## For reference: the parts of the system

One part per repository. Each is described as a whole in the architecture and in detail in its own repository. The creators' own app repositories are outside the system; they use the tooling.

The parts work with these systems outside the system:

- [Renovate](../architecture/#03-system-context.arc42.md:el-actor-renovate): dependency update service that keeps the versions the repositories use up to date
- [Creator's AI assistant](../architecture/#03-system-context.arc42.md:el-actor-ai-assistant): AI assistants, a partner the platform designs for
- [GitHub](../architecture/#03-system-context.arc42.md:el-actor-github): repositories, issues, pull requests, Actions and Pages
- [E-mail](../architecture/#03-system-context.arc42.md:el-actor-email): mail system that carries thanks and feedback today
- [GitHub Actions of the app repositories](../architecture/#03-system-context.arc42.md:el-actor-app-repo-actions): workflows in creators' app repositories that use the tooling's actions
- [GoatCounter](../architecture/#03-system-context.arc42.md:el-actor-goatcounter): hosted counting service for the platform's own pages

### Parts that deliver the channels

#### [App templates](../architecture/#05-building-blocks.arc42.md:el-bb-app-templates) ([lernapps/app-templates](https://github.com/lernapps/app-templates))

The templates and runtimes of the three archetypes: quiz, explainer and interactive app. They carry the rules every app has to meet into the code, so a creator does not have to know them.

- **[Archetypes](../architecture/#05-building-blocks.arc42.md:el-if-archetypes):** The template and runtime of each archetype, which the tooling creates apps from and apps build with.
  - Delivers the channel: [Guidance an AI assistant can follow](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-guidance)
  - Used by: [Tooling](../architecture/#05-building-blocks.arc42.md:el-bb-tooling)
  - Works with, outside the system: [Renovate](../architecture/#03-system-context.arc42.md:el-actor-renovate)

#### [Catalog](../architecture/#05-building-blocks.arc42.md:el-bb-catalog) ([lernapps/apps](https://github.com/lernapps/apps))

The catalog is the core of the platform. For adults and students, it makes apps findable by topic and grade, serves a copy of every listed app under lernapps.net and keeps it current, and takes the thanks of adults and students. For creators, it takes their entries and helps them list; it checks each entry and, at the platform owner's request, has a review agent look at the app.

- **[Catalog pages](../architecture/#05-building-blocks.arc42.md:el-if-catalog-pages):** The pages where adults and students find an app for a topic and grade, see its fitness for use, and find the way to build an app when none fits.
  - Delivers the channel: [One place to find apps](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-app-overview), [Visible fitness for use](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-fitness-signal)
- **[Listing](../architecture/#05-building-blocks.arc42.md:el-if-listing):** How a creator, through their AI assistant, lists an app: an entry by pull request, checked automatically (what the app sends to third parties and keeps in the browser, whether its links and topics hold, and that its licence allows the copy) and, at the platform owner's request, by a review agent, an AI that checks the app against a checklist, with the result as a comment on the pull request.
  - Delivers the channel: [Effortless listing](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-listing), [Visible fitness for use](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-fitness-signal)
  - Works with, outside the system: [Creator's AI assistant](../architecture/#03-system-context.arc42.md:el-actor-ai-assistant), [GitHub](../architecture/#03-system-context.arc42.md:el-actor-github)
- **[Served apps](../architecture/#05-building-blocks.arc42.md:el-if-served-apps):** The copy of every listed app that lernapps.net serves and links: built from the release the creator publishes at their own address, and served under one address that keeps working.
  - Delivers the channel: [Starting an app from a link](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-direct-start)
- **[Thanks](../architecture/#05-building-blocks.arc42.md:el-if-thanks):** A thank-you and feedback in one click from the catalog or an app. Today it is realised as a prepared e-mail to the platform owner; the interface stays the same when the realisation changes.
  - Delivers the channel: [Returning use and praise to creators](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-feedback), [Use and praise made visible to the creator](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-creator-insight)
  - Works with, outside the system: [E-mail](../architecture/#03-system-context.arc42.md:el-actor-email)

#### [Tooling](../architecture/#05-building-blocks.arc42.md:el-bb-tooling) ([lernapps/tooling](https://github.com/lernapps/tooling))

Everything a creator's AI assistant needs to build an app that meets the platform's rules: the guidance by phase and the skills, the CLI that creates an app and checks it, and the workflows an app's repository runs. It also holds the actions every platform site is checked and deployed with.

- **[App actions](../architecture/#05-building-blocks.arc42.md:el-if-app-actions):** The reusable workflows and actions an app's repository runs to check and build the app and to publish the creator's own release, at the creator's address.
  - Works with, outside the system: [GitHub Actions of the app repositories](../architecture/#03-system-context.arc42.md:el-actor-app-repo-actions), [GitHub](../architecture/#03-system-context.arc42.md:el-actor-github)
- **[Guidance](../architecture/#05-building-blocks.arc42.md:el-if-guidance):** The guidance by phase, the skills and the documentation that AI assistants read to build and list an app.
  - Delivers the channel: [Guidance an AI assistant can follow](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-guidance)
  - Works with, outside the system: [Creator's AI assistant](../architecture/#03-system-context.arc42.md:el-actor-ai-assistant)
- **[Site actions](../architecture/#05-building-blocks.arc42.md:el-if-site-actions):** The actions every platform site is built, checked and deployed with, and the previews of its pull requests: the website, the catalog, the docs and the tooling's own pages.
  - Used by: [Website](../architecture/#05-building-blocks.arc42.md:el-bb-website), [Catalog](../architecture/#05-building-blocks.arc42.md:el-bb-catalog), [Docs](../architecture/#05-building-blocks.arc42.md:el-bb-docs)
- **[Tooling CLI](../architecture/#05-building-blocks.arc42.md:el-if-tooling-cli):** The command line an assistant and the workflows run: create an app from an archetype, check it against the rules, update it.
  - Delivers the channel: [Guidance an AI assistant can follow](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-guidance)
  - Used by: [Catalog](../architecture/#05-building-blocks.arc42.md:el-bb-catalog)
  - Works with, outside the system: [Creator's AI assistant](../architecture/#03-system-context.arc42.md:el-actor-ai-assistant), [GitHub Actions of the app repositories](../architecture/#03-system-context.arc42.md:el-actor-app-repo-actions), [Renovate](../architecture/#03-system-context.arc42.md:el-actor-renovate)

#### [Website](../architecture/#05-building-blocks.arc42.md:el-bb-website) ([lernapps/lernapps.github.io](https://github.com/lernapps/lernapps.github.io))

The website at lernapps.net: the home page that tells the platform's story in plain language, the privacy notice and the imprint that cover every served app, and the entry point for AI assistants. It provides the shared frame every site of the platform is built with.

- **[Home pages](../architecture/#05-building-blocks.arc42.md:el-if-home-pages):** The home page, the privacy notice and the imprint, and the root `llms.txt` that leads AI assistants to the other parts of the platform.
  - Delivers the channel: [Guidance an AI assistant can follow](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-guidance), [Visible fitness for use](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-fitness-signal)
  - Works with, outside the system: [Creator's AI assistant](../architecture/#03-system-context.arc42.md:el-actor-ai-assistant)
- **[Site frame](../architecture/#05-building-blocks.arc42.md:el-if-site-frame):** The shared header, footer, styles and counting snippet of every platform site, and `site-check`, the check every site runs on its built pages before it is deployed.
  - Delivers the channel: [Use and praise made visible to the creator](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-creator-insight)
  - Used by: [Catalog](../architecture/#05-building-blocks.arc42.md:el-bb-catalog), [Tooling](../architecture/#05-building-blocks.arc42.md:el-bb-tooling), [Docs](../architecture/#05-building-blocks.arc42.md:el-bb-docs)
  - Works with, outside the system: [Renovate](../architecture/#03-system-context.arc42.md:el-actor-renovate), [GoatCounter](../architecture/#03-system-context.arc42.md:el-actor-goatcounter)

### Parts that support the others

These parts deliver no channel themselves; the platform is designed, decided and kept consistent with them.

#### [Docs](../architecture/#05-building-blocks.arc42.md:el-bb-docs) ([lernapps/docs](https://github.com/lernapps/docs))

The models of the platform: the platform design, the business model and the architecture of the whole system, each in a modelling language that people and AI assistants can read and check, rendered as pages.

- **[Models](../architecture/#05-building-blocks.arc42.md:el-if-models):** The platform design, the business model and the architecture as pages under lernapps.net/docs/, and a skill that lets an AI assistant work with the platform design.

#### [Organisation](../architecture/#05-building-blocks.arc42.md:el-bb-org) ([lernapps/.github](https://github.com/lernapps/.github))

The organisation's rules that hold for every repository: the profile, the governance, the templates for issues and pull requests, and the decision issues.

- **[Organisation rules](../architecture/#05-building-blocks.arc42.md:el-if-org-rules):** The rules, governance and templates every repository of the organisation follows, and the decisions that concern several repositories.
  - Works with, outside the system: [GitHub](../architecture/#03-system-context.arc42.md:el-actor-github)

---

Generated when the docs are built, from the platform design and the architecture. The build fails when a part of one names something the other does not have, so this page cannot drift from the two models.

