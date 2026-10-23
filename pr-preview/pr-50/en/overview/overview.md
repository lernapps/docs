# How lernapps.net works

What people get from the platform, journey by journey, which part of the system delivers it, and how far it is built. Every line comes from the platform design and the architecture; follow a link for the details.

> The idea, in the platform design's words: Free to use, kept alive by thanks. Adults and students find an active-learning app they can use right away, confident that it may be used; creators list theirs with almost no effort and hear when it helped. A thank-you, free and anonymous, is what keeps the platform alive.

**Not there yet.** What the three journeys need but the system delivers only in part today.

- **[Site frame (Website)](../architecture/#05-building-blocks.arc42.md:el-if-site-frame):** Visits to an app's page in the catalog are counted as totals, but only the platform owner sees them, not the app's creator. Affects: [Giving feedback and thanks](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-giving-back), [Insight into use and feedback](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-use-insight).
- **[Thanks (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-thanks):** Thanks are not counted, and they reach the creator only if the platform owner passes them on. Affects: [Giving feedback and thanks](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-giving-back), [Insight into use and feedback](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-use-insight).

## Who takes part

The roles of the platform design. The first three take part in the journeys below; the others are around them.

- **[Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters):** Adults who come across apps built by others, browse them and bring them to their students or their own children: teachers and parents.
- **[App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators):** Engaged people who build small educational apps, typically with AI tools, for a gap they noticed themselves.
- **[Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students):** The learners the apps are built for.
- **[School gatekeepers](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-gatekeepers):** People at school whom careful teachers ask before using an app.
- **[Teacher platforms (commercial or non-profit)](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-teacher-platforms):** Platforms where teachers find digital teaching offerings, some commercial, some non-profit.
- **[Social media](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-social-media):** Where creators share their apps and where apps travel by recommendation.
- **[GitHub](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-github):** Where many creators publish their apps' code.
- **[AI assistants](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-ai-assistants):** The tools creators build their apps with.
- **[Platform owner](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-platform-owner):** Oliver Jägle owns and shapes the platform strategy.

## The three journeys

The platform is designed around three journeys. Each is a sequence of steps between two roles. Where the platform helps with a step, it offers a service; the service reaches people through a channel, such as a page, a link or a template, and a part of the system delivers that channel. A step without a service of its own names its channel, or says that it happens inside the app. Next to each step, in small print: who gives and who receives in it.

### [An app in class within minutes](../platform-design/#2-design/d7-experiences.pdt42.md:el-x-app-in-minutes)

The journey of a teacher a few minutes before a lesson: find an app for this topic and grade, see at a glance that it may be used, put it on the projector or the class's devices, and say thanks afterwards. It may be used because the platform lists only apps that meet the fitness criteria and serves each one itself, under lernapps.net and its privacy notice.

Mainly for [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters); also involves [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators), [Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students). What they get: The right active-learning app for this topic and grade, running in class within minutes, safe to use without checking it yourself.

1. [Find an app for a topic and grade](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-find-app) (App creators → Adopting adults)
   - **[Finding apps by topic and grade](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-finding)** — Built
     - For [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters): Helps adults find a fitting app in one place.
     - Through [One place to find apps](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-app-overview): Finding an app no longer depends on word of mouth or luck.
     - It consists of: listings in one comparable format; finding by topic and grade; tailored to the visitor without accounts; entry through referral links, with an explicit first step to have a look.
     - Delivered by [Catalog pages (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-catalog-pages).
1. [Confirm an app may be used](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-confirm-fitness) (App creators → Adopting adults)
   - **[Clarity on fitness for use](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-fitness-clarity)** — Built
     - For [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters): Answers whether an app may be used, before an adult passes it on to a learner.
     - Through [Visible fitness for use](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-fitness-signal): Adults no longer judge fitness for use alone or wait for a gatekeeper.
     - It consists of: whether the app sends anything to third parties, checked rather than declared; whether the app accesses only its own data in the browser, checked; whether installation or sign-up is needed.
     - Delivered by [Catalog pages (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-catalog-pages), [Home pages (Website)](../architecture/#05-building-blocks.arc42.md:el-if-home-pages), [Listing (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-listing).
1. [Bring an app to students](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-bring-app) (Adopting adults → Students)
   - **[Starting an app right away](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-start-right-away)** — Built
     - For [Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students): Students open an app an adult brought to them and start right away, without installation or sign-up: a link or QR code is enough.
     - Through [Starting an app from a link](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-direct-start): An app reaches a class or a child in seconds, without installing anything or signing up.
     - It consists of: a link or QR code to the app, or to one topic in it; served from lernapps.net, under one address that keeps working; no installation and no accounts for students.
     - Delivered by [Served apps (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-served-apps).
1. [Use an app in class](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-use-in-class) (Adopting adults → App creators) — through [Returning use and praise to creators](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-feedback)
1. [Thank the creator](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-thank-creator-adult) (Adopting adults → App creators) · [Give feedback from classroom use](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-give-feedback) (Adopting adults → App creators)
   - **[Giving feedback and thanks](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-giving-back)** — Partly built
     - For [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters), [Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students): Makes it easy for adults and students to give feedback, recommendations and thanks, without accounts and without identifying students. It explains, without being pushy, that a thank-you is what keeps the free platform alive.
     - Through [Returning use and praise to creators](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-feedback): Use and praise reach the creator instead of staying invisible, and every user knows that thanking keeps the free platform alive.
     - It consists of: thanks and structured feedback with one click, after use; optionally inside the app, if its creator includes it; counted openly: only explicit clicks and totals, no accounts or free text; steps aside quietly when it cannot be reached.
     - Delivered by [Site frame (Website)](../architecture/#05-building-blocks.arc42.md:el-if-site-frame), [Thanks (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-thanks).
     - Not there yet: Visits to an app's page in the catalog are counted as totals, but only the platform owner sees them, not the app's creator.
     - Not there yet: Thanks are not counted, and they reach the creator only if the platform owner passes them on.

### [Practice tonight, before the test](../platform-design/#2-design/d7-experiences.pdt42.md:el-x-practice-tonight)

The journey of a parent the evening before a test: find an app the child can start right away for the topic of tomorrow's test, let the child practise, and say thanks afterwards; the child can come back to the app or find the next one alone. The setting is the kitchen table, not the classroom, and the goal is the same as the child's: the next test. The app starts from lernapps.net like every listed app, so parents do not have to judge a stranger's address.

Mainly for [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters); also involves [Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students), [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators). What they get: Tonight, before tomorrow's test: an app your child can start right away.

1. [Find an app for a topic and grade](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-find-app) (App creators → Adopting adults)
   - **[Finding apps by topic and grade](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-finding)** — Built
     - Helps adults find a fitting app in one place. (See above.)
1. [Confirm an app may be used](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-confirm-fitness) (App creators → Adopting adults)
   - **[Clarity on fitness for use](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-fitness-clarity)** — Built
     - Answers whether an app may be used, before an adult passes it on to a learner. (See above.)
1. [Bring an app to students](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-bring-app) (Adopting adults → Students)
   - **[Starting an app right away](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-start-right-away)** — Built
     - Students open an app an adult brought to them and start right away, without installation or sign-up: a link or QR code is enough. (See above.)
1. [Learn with an app](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-learn-with-app) (App creators → Students) — happens inside the app, without the platform
1. [Return to an app](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-return-to-app) (Students → App creators)
   - **[Finding apps before a test](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-student-finding)** — Built
     - For [Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students): Helps students return to apps and find new ones for their topic on their own, for instance before a test.
     - Through [One place to find apps](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-app-overview): Finding an app no longer depends on word of mouth or luck.
     - It consists of: listings in one comparable format; finding by topic and grade; tailored to the visitor without accounts; entry through referral links, with an explicit first step to have a look.
     - Delivered by [Catalog pages (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-catalog-pages).
1. [Thank the creator](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-thank-creator-adult) (Adopting adults → App creators)
   - **[Giving feedback and thanks](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-giving-back)** — Partly built
     - Makes it easy for adults and students to give feedback, recommendations and thanks, without accounts and without identifying students. (See above.)

### [List an app and hear it is used](../platform-design/#2-design/d7-experiences.pdt42.md:el-x-list-and-hear-back)

The journey of the supply side: a creator who built an app for their own class lists it with almost no effort and then hears whether and how it helped elsewhere. Creators do not start for the reach, but use and praise keep them going. The thanks they receive come from the one click every user is asked for. The platform serves a copy of the app under lernapps.net, so the creator stays the author but no longer answers to schools for data protection; in return the app needs a licence that allows the copy.

Mainly for [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators); also involves [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters). What they get: Build your app faster with good guidance, list it in minutes without answering to schools for data protection yourself, and hear with every thank-you when it helped a class beyond your own.

1. Before the first step: what the platform offers up front
   - **[Guidance for building apps](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-building-guidance)** — Built
     - For [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators): Helps creators build apps with their AI assistant that are easy to use and fit the platform. Creators get it even if nobody else uses their app.
     - Through [Guidance an AI assistant can follow](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-guidance): Building an app that keeps the platform's rules no longer needs expert knowledge, only the creator's idea and their assistant.
     - It consists of: guidance by phase, from the first question to the listing; skills that carry the rules every app has to keep; templates for three kinds of app that already keep those rules; a command that creates an app and checks it.
     - Delivered by [Archetypes (App templates)](../architecture/#05-building-blocks.arc42.md:el-if-archetypes), [Guidance (Tooling)](../architecture/#05-building-blocks.arc42.md:el-if-guidance), [Home pages (Website)](../architecture/#05-building-blocks.arc42.md:el-if-home-pages), [Tooling CLI (Tooling)](../architecture/#05-building-blocks.arc42.md:el-if-tooling-cli).
1. [List an app](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-list-app) (App creators → Adopting adults)
   - **[Help to list an app](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-listing-help)** — Built
     - For [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators): Takes the effort out of the first listing, the hurdle for creators.
     - Through [Effortless listing](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-listing): Contributing an app takes minutes, without a website, post or privacy notice of one's own.
     - It consists of: a few fields: what the app teaches, for whom, where to find it; automatic check and publication; a copy of the app served under lernapps.net, following the creator's releases; help from the creator's AI assistant.
     - Delivered by [Listing (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-listing).
1. [Use an app in class](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-use-in-class) (Adopting adults → App creators) · [Thank the creator](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-thank-creator-adult) (Adopting adults → App creators) · [Give feedback from classroom use](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-give-feedback) (Adopting adults → App creators) · [Recommend an app](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-recommend-app) (Adopting adults → App creators)
   - **[Insight into use and feedback](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-use-insight)** — Partly built
     - For [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators): Shows creators whether and how their app is used, with feedback and thanks. This is the reputation flow that keeps them.
     - Through [Returning use and praise to creators](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-feedback): Use and praise reach the creator instead of staying invisible, and every user knows that thanking keeps the free platform alive.
     - It consists of: thanks and structured feedback with one click, after use; optionally inside the app, if its creator includes it; counted openly: only explicit clicks and totals, no accounts or free text; steps aside quietly when it cannot be reached.
     - Delivered by [Site frame (Website)](../architecture/#05-building-blocks.arc42.md:el-if-site-frame), [Thanks (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-thanks).
     - Not there yet: Visits to an app's page in the catalog are counted as totals, but only the platform owner sees them, not the app's creator.
     - Not there yet: Thanks are not counted, and they reach the creator only if the platform owner passes them on.

## Services beyond the three journeys

Planned extensions: the platform design names these services too, but none of the three journeys runs through them yet, and none is built. Each names the step it would support.

- **[Building on existing apps](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-build-on-apps)** — Not built yet
  - For [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators): Lets creators start from an existing app instead of from scratch, and lets others build on theirs.
- **[Contributing best practices to the guidance](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-contribute-practices)** — Not built yet
  - For [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators): Lets experienced creators bring their own best practices into the guidance for building apps. Whoever shapes the guidance shapes the platform, so this is the path from creator to co-owner.
- **[Assembling apps for a class](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-class-sets)** — Not built yet
  - For [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters): Lets adults bundle apps for one class and bring them to students in one step, so students start without installation or sign-up.
  - Through [Passing apps on to a class](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-collections): Several apps reach a class in one step.
  - It consists of: several apps bundled for one class; works on the devices a class already uses; no accounts for students.
  - Would support: [Bring an app to students](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-bring-app).
- **[From using to adapting apps](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-adapt-apps)** — Not built yet
  - For [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters), [Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students): Opens the path from using apps to making them: adults and students adapt an app or build their own, using the guidance for building apps.

## The parts of the system

One part per repository. Each is described as a whole in the architecture and in detail in its own repository. The creators' own app repositories are outside the system; they use the tooling.

### Parts that deliver the channels

#### [App templates](../architecture/#05-building-blocks.arc42.md:el-bb-app-templates) ([lernapps/app-templates](https://github.com/lernapps/app-templates))

The templates and runtimes of the three archetypes: quiz, explainer and interactive app. They carry the rules every app has to meet into the code, so a creator does not have to know them.

- Makes possible: [Guidance an AI assistant can follow](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-guidance)
- Offers [Archetypes](../architecture/#05-building-blocks.arc42.md:el-if-archetypes): The template and runtime of each archetype, which the tooling creates apps from and apps build with.
  - Used by [Tooling](../architecture/#05-building-blocks.arc42.md:el-bb-tooling)
  - Works with, outside the system: [Renovate](../architecture/#03-system-context.arc42.md:el-actor-renovate)

#### [Catalog](../architecture/#05-building-blocks.arc42.md:el-bb-catalog) ([lernapps/apps](https://github.com/lernapps/apps))

The catalog is the core of the platform: it makes apps findable by topic and grade, takes entries from creators and helps them list, checks each entry and, on request, runs the review agent, serves a copy of every listed app under lernapps.net and keeps it current, and takes the thanks of adults and students.

- Makes possible: [One place to find apps](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-app-overview), [Visible fitness for use](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-fitness-signal), [Effortless listing](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-listing), [Starting an app from a link](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-direct-start), [Returning use and praise to creators](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-feedback)
- Offers [Catalog pages](../architecture/#05-building-blocks.arc42.md:el-if-catalog-pages): The pages where adults and students find an app for a topic and grade, see its fitness for use, and find the way to build an app when none fits.
- Offers [Listing](../architecture/#05-building-blocks.arc42.md:el-if-listing): How a creator, through their AI assistant, lists an app: an entry by pull request, checked automatically, including that its licence allows the copy, and, at the owner's request, by the review agent, with the result as a comment on the pull request.
  - Works with, outside the system: [Creator's AI assistant](../architecture/#03-system-context.arc42.md:el-actor-ai-assistant), [GitHub](../architecture/#03-system-context.arc42.md:el-actor-github)
- Offers [Served apps](../architecture/#05-building-blocks.arc42.md:el-if-served-apps): The copy of every listed app, built from the creator's release and served under one address that keeps working.
- Offers [Thanks](../architecture/#05-building-blocks.arc42.md:el-if-thanks): A thank-you and feedback in one click from the catalog or an app. Today it is realised as a prepared e-mail to the platform owner; the interface stays the same when the realisation changes.
  - Works with, outside the system: [E-mail](../architecture/#03-system-context.arc42.md:el-actor-email)

#### [Tooling](../architecture/#05-building-blocks.arc42.md:el-bb-tooling) ([lernapps/tooling](https://github.com/lernapps/tooling))

Everything a creator's AI assistant needs to build an app that meets the platform's rules: the guidance by phase and the skills, the CLI that creates an app and checks it, and the workflows an app's repository runs. It also holds the actions every platform site is checked and deployed with.

- Makes possible: [Guidance an AI assistant can follow](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-guidance)
- Offers [App actions](../architecture/#05-building-blocks.arc42.md:el-if-app-actions): The reusable workflows and actions an app's repository runs to check, build and publish the app.
  - Works with, outside the system: [GitHub Actions of the app repositories](../architecture/#03-system-context.arc42.md:el-actor-app-repo-actions), [GitHub](../architecture/#03-system-context.arc42.md:el-actor-github)
- Offers [Guidance](../architecture/#05-building-blocks.arc42.md:el-if-guidance): The guidance by phase, the skills and the documentation that AI assistants read to build and list an app.
  - Works with, outside the system: [Creator's AI assistant](../architecture/#03-system-context.arc42.md:el-actor-ai-assistant)
- Offers [Site actions](../architecture/#05-building-blocks.arc42.md:el-if-site-actions): The actions every platform site is built, checked and deployed with, and the previews of its pull requests: the website, the catalog, the docs and the tooling's own pages.
  - Used by [Website](../architecture/#05-building-blocks.arc42.md:el-bb-website), [Catalog](../architecture/#05-building-blocks.arc42.md:el-bb-catalog), [Docs](../architecture/#05-building-blocks.arc42.md:el-bb-docs)
- Offers [Tooling CLI](../architecture/#05-building-blocks.arc42.md:el-if-tooling-cli): The command line an assistant and the workflows run: create an app from an archetype, check it against the rules, update it.
  - Used by [Catalog](../architecture/#05-building-blocks.arc42.md:el-bb-catalog)
  - Works with, outside the system: [Creator's AI assistant](../architecture/#03-system-context.arc42.md:el-actor-ai-assistant), [GitHub Actions of the app repositories](../architecture/#03-system-context.arc42.md:el-actor-app-repo-actions), [Renovate](../architecture/#03-system-context.arc42.md:el-actor-renovate)

#### [Website](../architecture/#05-building-blocks.arc42.md:el-bb-website) ([lernapps/lernapps.github.io](https://github.com/lernapps/lernapps.github.io))

The website at lernapps.net: the home page that tells the platform's story in plain language, the privacy notice and the imprint that cover every served app, and the entry point for AI assistants. It provides the shared frame every site of the platform is built with.

- Makes possible: [Guidance an AI assistant can follow](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-guidance), [Visible fitness for use](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-fitness-signal), [Returning use and praise to creators](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-feedback)
- Offers [Home pages](../architecture/#05-building-blocks.arc42.md:el-if-home-pages): The home page, the privacy notice and the imprint, and the root `llms.txt` that leads AI assistants to the other parts of the platform.
  - Works with, outside the system: [Creator's AI assistant](../architecture/#03-system-context.arc42.md:el-actor-ai-assistant)
- Offers [Site frame](../architecture/#05-building-blocks.arc42.md:el-if-site-frame): The shared header, footer, styles and counting snippet of every platform site, and `site-check`, the check every site runs on its built pages before it is deployed.
  - Used by [Catalog](../architecture/#05-building-blocks.arc42.md:el-bb-catalog), [Tooling](../architecture/#05-building-blocks.arc42.md:el-bb-tooling), [Docs](../architecture/#05-building-blocks.arc42.md:el-bb-docs)
  - Works with, outside the system: [Renovate](../architecture/#03-system-context.arc42.md:el-actor-renovate), [GoatCounter](../architecture/#03-system-context.arc42.md:el-actor-goatcounter)

### Parts that support the others

These parts deliver no channel themselves; the platform is designed, decided and kept consistent with them.

#### [Docs](../architecture/#05-building-blocks.arc42.md:el-bb-docs) ([lernapps/docs](https://github.com/lernapps/docs))

The models of the platform in structured languages: the platform design (pdt42), the business model (biz42) and the architecture of the whole system (arc42), rendered as pages, and the skill to work with the platform design.

- Offers [Models](../architecture/#05-building-blocks.arc42.md:el-if-models): The platform design, the business model and the architecture as pages under lernapps.net/docs/, and the `pdt` skill.

#### [Organisation](../architecture/#05-building-blocks.arc42.md:el-bb-org) ([lernapps/.github](https://github.com/lernapps/.github))

The organisation's rules that hold for every repository: the profile, the governance, the templates for issues and pull requests, and the decision issues.

- Offers [Organisation rules](../architecture/#05-building-blocks.arc42.md:el-if-org-rules): The rules, governance and templates every repository of the organisation follows, and the decisions that concern several repositories.
  - Works with, outside the system: [GitHub](../architecture/#03-system-context.arc42.md:el-actor-github)

## Where this comes from

Generated when the docs are built, from the platform design and the architecture. The build fails when a part of one names something the other does not have, so this page cannot drift from the two models.

