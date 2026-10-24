# How lernapps.net works

Why the platform exists, what people get from it and which part of the system delivers it. Follow a link for the details.

> The goal, in the platform design's words: Free to use, kept alive by thanks. Adults and students find an active-learning app they can use right away, confident that it may be used under data protection law; creators list theirs with almost no effort and hear when it helped. A thank-you, free and anonymous, is what keeps the platform alive: running it costs almost nothing, and thanks are what keep creators building.

## Who takes part

- **[Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters):** Adults who come across apps built by others, browse them and bring them to their students or their own children: teachers and parents.
- **[App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators):** Engaged people who build small educational apps, typically with AI tools, for a gap they noticed themselves.
- **[Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students):** The learners the apps are built for.
- **[Platform owner](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-platform-owner):** Oliver Jägle owns and shapes the platform strategy.

## The parts of the system

The platform is built from one part per repository. The journeys and flows below name them where they help; a fuller description of each follows at the end.

- **[Website](../architecture/#05-building-blocks.arc42.md:el-bb-website):** Gives the platform its face at lernapps.net, the privacy notice that covers every served app, and the shared header, footer and checks every platform site is built with.
- **[Catalog](../architecture/#05-building-blocks.arc42.md:el-bb-catalog):** Lets adults and students find, trust and start apps, and lets creators list them; it serves a copy of every listed app under lernapps.net.
- **[Tooling](../architecture/#05-building-blocks.arc42.md:el-bb-tooling):** Gives a creator's AI assistant the guidance, the commands and the workflows to build an app that keeps the platform's rules.
- **[App templates](../architecture/#05-building-blocks.arc42.md:el-bb-app-templates):** Provides the three kinds of app (quiz, explainer and interactive app) as templates that already keep the platform's rules.
- **[Docs](../architecture/#05-building-blocks.arc42.md:el-bb-docs):** Holds the models of the platform: why it exists, who carries it and how the system is built.
- **[Organisation](../architecture/#05-building-blocks.arc42.md:el-bb-org):** Holds the rules and decisions that every repository of the platform follows.

## How to read a journey

A journey is a sequence of steps people take. Where the platform helps with a step, it offers a service, and a part of the system provides it through one of its interfaces: the pages, links, templates or commands people actually use.

For example: in the step "Find an app for a topic and grade", the platform offers the service "Finding apps by topic and grade", which the interface "Catalog pages" of the part "Catalog" provides.

A dashed block marks where a part does not yet deliver what the journey needs, and says what is missing.

## The journeys

Teachers and parents bring an app to learners, in class and at home; creators build an app, list it and hear that it helped.

### [An app in class within minutes](../platform-design/#2-design/d7-experiences.pdt42.md:el-x-app-in-minutes)

The journey of a teacher who has to take over a class at short notice, for a colleague and perhaps outside their own subject: find an app for this topic and grade, see at a glance that it may be used, put it on the projector or the class's devices, and say thanks afterwards. It may be used because the platform lists only apps that pass its checks of fitness for use and serves each one itself, under lernapps.net and its privacy notice.

Mainly for [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters); also involves [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators), [Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students). What they get: The right active-learning app for this topic and grade, even outside your subject, running in class within minutes, safe to use without checking it yourself.

1. [Find an app for a topic and grade](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-find-app)
   - **[Finding apps by topic and grade](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-finding)**
     - For [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters): Helps adults find a fitting app in one place.
     - Delivered by: [Catalog pages (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-catalog-pages).
1. [Confirm an app may be used](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-confirm-fitness)
   - **[Clarity on fitness for use](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-fitness-clarity)**
     - For [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters): Answers whether an app may be used, before an adult passes it on to a learner: it sends nothing to third parties, keeps only its own data in the browser and needs no installation or sign-up.
     - Delivered by: [Catalog pages (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-catalog-pages), [Home pages (Website)](../architecture/#05-building-blocks.arc42.md:el-if-home-pages), [Listing (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-listing).
1. [Bring an app to students](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-bring-app)
   - **[Starting an app right away](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-start-right-away)**
     - For [Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students): Students open an app an adult brought to them and start right away, without installation or sign-up: a link or QR code is enough.
     - Delivered by: [Served apps (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-served-apps).
1. [Use an app in class](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-use-in-class)
1. [Thank the creator](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-thank-creator-adult) · [Give feedback from classroom use](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-give-feedback)
   - **[Giving feedback and thanks](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-giving-back)**
     - For [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters), [Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students): Makes it easy for adults and students to give feedback, recommendations and thanks, without accounts and without identifying students. It explains, without being pushy, that a thank-you is what keeps the free platform alive.
     - ┆ Not yet: [Thanks (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-thanks): A click opens a prepared e-mail from the sender's own account; thanks and feedback arrive, but they are neither anonymous nor counted, and recommendations are not recorded.

### [Help where a child struggles](../platform-design/#2-design/d7-experiences.pdt42.md:el-x-child-struggles)

The journey of a parent who notices that their child struggles with a topic and cannot help, for lack of time or because they do not know the subject well enough: find an app for exactly that topic, let the child start right away and practise, and say thanks afterwards. The child keeps coming back to the app, or finds the next one alone, for as long as it needs; the child may also be the one who notices the gap. The app starts from lernapps.net like every listed app, so parents do not have to judge a stranger's address.

Mainly for [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters); also involves [Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students), [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators). What they get: When your child struggles and you cannot help: an app for exactly that topic, to start right away and come back to.

1. As in the journey “An app in class within minutes”: [Find an app for a topic and grade](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-find-app) · [Confirm an app may be used](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-confirm-fitness) · [Bring an app to students](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-bring-app).
1. [Learn with an app](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-learn-with-app)
   - Happens inside the app, without the platform.
1. [Return to an app](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-return-to-app)
   - **[Finding apps for a topic one struggles with](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-student-finding)**
     - For [Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students): Helps students return to apps and find new ones on their own, for the topic they struggle with.
     - Delivered by: [Catalog pages (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-catalog-pages).
1. As in the journey “An app in class within minutes”: [Thank the creator](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-thank-creator-adult).

### [List an app and hear it is used](../platform-design/#2-design/d7-experiences.pdt42.md:el-x-list-and-hear-back)

The journey of the supply side: a creator who built an app for their own class lists it with almost no effort and then hears whether and how it helped elsewhere. Creators do not start for the reach, but use and praise keep them going. The thanks they receive come from the one click every user is asked for. The platform serves a copy of the app under lernapps.net, so the creator stays the author but no longer answers to schools for data protection; in return the app needs a licence that allows the copy.

Mainly for [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators); also involves [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters). What they get: Build your app faster with good guidance, list it in minutes without answering to schools for data protection yourself, and hear with every thank-you when it helped a class beyond your own.

1. Building the app:
   - **[Guidance for building apps](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-building-guidance)**
     - For [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators): Helps creators build apps with their AI assistant that are easy to use and fit the platform. Creators get it even if nobody else uses their app.
     - Delivered by: [Archetypes (App templates)](../architecture/#05-building-blocks.arc42.md:el-if-archetypes), [Guidance (Tooling)](../architecture/#05-building-blocks.arc42.md:el-if-guidance), [Home pages (Website)](../architecture/#05-building-blocks.arc42.md:el-if-home-pages), [Tooling CLI (Tooling)](../architecture/#05-building-blocks.arc42.md:el-if-tooling-cli).
1. [List an app](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-list-app)
   - **[Help to list an app](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-listing-help)**
     - For [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators): The first listing is the biggest hurdle for creators; this service takes the effort out of it.
     - Delivered by: [Listing (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-listing).
1. [Use an app in class](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-use-in-class) · [Thank the creator](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-thank-creator-adult) · [Give feedback from classroom use](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-give-feedback) · [Recommend an app](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-recommend-app)
   - **[Insight into use and feedback](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-use-insight)**
     - For [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators): Shows creators whether and how their app is used, with feedback and thanks. Seeing this is what keeps creators building.
     - ┆ Not yet: [Site frame (Website)](../architecture/#05-building-blocks.arc42.md:el-if-site-frame): Only visits to an app's page in the catalog are counted, not the use of the app itself, and only the platform owner sees the totals.
     - ┆ Not yet: [Thanks (Catalog)](../architecture/#05-building-blocks.arc42.md:el-if-thanks): Thanks reach the creator only if the platform owner passes them on.

## How the parts work together

Behind the journeys: how a creator's app gets into the catalog, and how the system keeps itself current. The architecture describes these flows step by step.

- **[Build and list an app](../architecture/#06-runtime-view.arc42.md:el-rs-build-and-list).** A creator finds no fitting app and decides to build one. Their AI assistant follows the tooling's guidance, creates the app from one of the app templates and checks it; the app's repository runs the tooling's actions. The assistant opens the listing pull request; the catalog checks the entry and, at the platform owner's request, has a review agent look at the app; the owner approves; the catalog publishes a copy. Parts involved: [Website](../architecture/#05-building-blocks.arc42.md:el-bb-website), [Catalog](../architecture/#05-building-blocks.arc42.md:el-bb-catalog), [Tooling](../architecture/#05-building-blocks.arc42.md:el-bb-tooling), [App templates](../architecture/#05-building-blocks.arc42.md:el-bb-app-templates), [Organisation](../architecture/#05-building-blocks.arc42.md:el-bb-org).
- **[A listed app gets a new version](../architecture/#06-runtime-view.arc42.md:el-rs-app-update).** The creator releases a new version. The catalog builds a copy from that release and replaces the served copy; the address stays the same and never stops working. Parts involved: [Catalog](../architecture/#05-building-blocks.arc42.md:el-bb-catalog), [Tooling](../architecture/#05-building-blocks.arc42.md:el-bb-tooling).
- **[A building block gets a new commit](../architecture/#06-runtime-view.arc42.md:el-rs-block-update).** The site frame, the tooling or the app templates get a new commit on their main line. Renovate, an update service, opens a pull request in every repository that uses the block at a fixed version; it is merged when the checks pass. Inside the tooling, a change of the guidance has been measured by its evaluations before this point. Parts involved: [Website](../architecture/#05-building-blocks.arc42.md:el-bb-website), [Tooling](../architecture/#05-building-blocks.arc42.md:el-bb-tooling), [App templates](../architecture/#05-building-blocks.arc42.md:el-bb-app-templates), [Catalog](../architecture/#05-building-blocks.arc42.md:el-bb-catalog), [Docs](../architecture/#05-building-blocks.arc42.md:el-bb-docs).
- **[A platform site is published](../architecture/#06-runtime-view.arc42.md:el-rs-site-published).** A change is merged to a site's main line: the website, the catalog, the docs or the tooling's pages. The tooling's site actions build the site, run site-check from the site frame on the built pages, and deploy them to GitHub Pages under lernapps.net. A failing check stops the deploy. Parts involved: [Docs](../architecture/#05-building-blocks.arc42.md:el-bb-docs), [Tooling](../architecture/#05-building-blocks.arc42.md:el-bb-tooling), [Website](../architecture/#05-building-blocks.arc42.md:el-bb-website).

## Ideas

Services the platform design names but no journey needs yet. Each is discussed in its own issue.

- **[Building on existing apps](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-build-on-apps)**
  - For [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators): Lets creators start from an existing app instead of from scratch, and lets others build on theirs.
  - Issue: [lernapps/docs#52](https://github.com/lernapps/docs/issues/52).
- **[Contributing best practices to the guidance](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-contribute-practices)**
  - For [App creators](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators): Lets experienced creators bring their own best practices into the guidance for building apps. Whoever shapes the guidance shapes the platform, so this is the path from creator to co-owner.
  - Issue: [lernapps/docs#53](https://github.com/lernapps/docs/issues/53).
- **[Assembling apps for a class](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-class-sets)**
  - For [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters): Lets adults bundle apps for one class and bring them to students in one step, so students start without installation or sign-up.
  - Channel: [Passing apps on to a class](../platform-design/#2-design/d5-transactions.pdt42.md:el-ch-collections).
  - Would support: [Bring an app to students](../platform-design/#2-design/d5-transactions.pdt42.md:el-t-bring-app).
  - Issue: [lernapps/docs#54](https://github.com/lernapps/docs/issues/54).
- **[From using to adapting apps](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-adapt-apps)**
  - For [Adopting adults](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters), [Students](../platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students): Opens the path from using apps to making them: adults and students adapt an app or build their own, using the guidance for building apps.
  - Issue: [lernapps/docs#55](https://github.com/lernapps/docs/issues/55).

## For reference: the parts of the system

One part per repository. Each is described as a whole in the architecture and in detail in its own repository. The creators' own app repositories are outside the system; they use the tooling.

The parts work with these systems outside the system:

- [Creator's AI assistant](../architecture/#03-system-context.arc42.md:el-actor-ai-assistant): the AI tool a creator builds and lists an app with; it reads the guidance and runs the CLI
- [Renovate](../architecture/#03-system-context.arc42.md:el-actor-renovate): dependency update service that keeps the versions the repositories use up to date
- [GoatCounter](../architecture/#03-system-context.arc42.md:el-actor-goatcounter): hosted counting service for the platform's own pages
- [GitHub](../architecture/#03-system-context.arc42.md:el-actor-github): repositories, issues, pull requests, Actions and Pages
- [E-mail](../architecture/#03-system-context.arc42.md:el-actor-email): mail system that carries thanks and feedback
- [GitHub Actions of the app repositories](../architecture/#03-system-context.arc42.md:el-actor-app-repo-actions): workflows in creators' app repositories that use the tooling's actions

### Parts that deliver what the journeys need

#### [Website](../architecture/#05-building-blocks.arc42.md:el-bb-website) ([lernapps/lernapps.github.io](https://github.com/lernapps/lernapps.github.io))

The website at lernapps.net: the home page that tells the platform's story in plain language, the privacy notice and the imprint that cover every served app, and the entry point for AI assistants. It provides the shared frame every site of the platform is built with.

- **[Home pages](../architecture/#05-building-blocks.arc42.md:el-if-home-pages):** The home page, the privacy notice and the imprint, and the root llms.txt that leads AI assistants to the other parts of the platform.
  - Serves: [Guidance for building apps](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-building-guidance), [Clarity on fitness for use](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-fitness-clarity)
  - Works with, outside the system: [Creator's AI assistant](../architecture/#03-system-context.arc42.md:el-actor-ai-assistant)
- **[Site frame](../architecture/#05-building-blocks.arc42.md:el-if-site-frame):** The shared header, footer, styles and counting snippet of every platform site, and site-check, the check every site runs on its built pages before it is deployed.
  - Serves: [Insight into use and feedback](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-use-insight)
  - ┆ Not yet: Only visits to an app's page in the catalog are counted, not the use of the app itself, and only the platform owner sees the totals.
  - Used by: [Catalog](../architecture/#05-building-blocks.arc42.md:el-bb-catalog), [Tooling](../architecture/#05-building-blocks.arc42.md:el-bb-tooling), [Docs](../architecture/#05-building-blocks.arc42.md:el-bb-docs)
  - Works with, outside the system: [Renovate](../architecture/#03-system-context.arc42.md:el-actor-renovate), [GoatCounter](../architecture/#03-system-context.arc42.md:el-actor-goatcounter)

#### [Catalog](../architecture/#05-building-blocks.arc42.md:el-bb-catalog) ([lernapps/apps](https://github.com/lernapps/apps))

The catalog is the core of the platform. For adults and students, it makes apps findable by topic and grade, serves a copy of every listed app under lernapps.net and keeps it current, and takes the thanks of adults and students. For creators, it takes their entries and helps them list; it checks each entry and, at the platform owner's request, has a review agent look at the app.

- **[Catalog pages](../architecture/#05-building-blocks.arc42.md:el-if-catalog-pages):** The pages where adults and students find an app for a topic and grade, see its fitness for use, and find the way to build an app when none fits.
  - Serves: [Finding apps by topic and grade](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-finding), [Finding apps for a topic one struggles with](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-student-finding), [Clarity on fitness for use](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-fitness-clarity)
- **[Listing](../architecture/#05-building-blocks.arc42.md:el-if-listing):** How a creator, through their AI assistant, lists an app: an entry by pull request, checked automatically (what the app sends to third parties and keeps in the browser, whether its links and topics hold, and that its licence allows the copy) and, at the platform owner's request, by a review agent, an AI that checks the app against a checklist, with the result as a comment on the pull request.
  - Serves: [Help to list an app](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-listing-help), [Clarity on fitness for use](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-fitness-clarity)
  - Works with, outside the system: [Creator's AI assistant](../architecture/#03-system-context.arc42.md:el-actor-ai-assistant), [GitHub](../architecture/#03-system-context.arc42.md:el-actor-github)
- **[Served apps](../architecture/#05-building-blocks.arc42.md:el-if-served-apps):** The copy of every listed app that lernapps.net serves and links: built from the release the creator publishes at their own address, and served under one address that keeps working.
  - Serves: [Starting an app right away](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-start-right-away)
- **[Thanks](../architecture/#05-building-blocks.arc42.md:el-if-thanks):** A thank-you and feedback in one click from the catalog or an app, counted openly and passed on to the creator. The interface stays the same when its realisation changes.
  - Serves: [Insight into use and feedback](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-use-insight), [Giving feedback and thanks](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-giving-back)
  - ┆ Not yet: A click opens a prepared e-mail from the sender's own account; thanks and feedback arrive, but they are neither anonymous nor counted, and recommendations are not recorded.
  - ┆ Not yet: Thanks reach the creator only if the platform owner passes them on.
  - Works with, outside the system: [E-mail](../architecture/#03-system-context.arc42.md:el-actor-email)

#### [Tooling](../architecture/#05-building-blocks.arc42.md:el-bb-tooling) ([lernapps/tooling](https://github.com/lernapps/tooling))

Everything a creator's AI assistant needs to build an app that meets the platform's rules: the guidance by phase and the skills, the CLI that creates an app and checks it, and the workflows an app's repository runs. It also holds the actions every platform site is checked and deployed with.

- **[App actions](../architecture/#05-building-blocks.arc42.md:el-if-app-actions):** The reusable workflows and actions an app's repository runs to check and build the app and to publish the creator's own release, at the creator's address.
  - Works with, outside the system: [GitHub Actions of the app repositories](../architecture/#03-system-context.arc42.md:el-actor-app-repo-actions), [GitHub](../architecture/#03-system-context.arc42.md:el-actor-github)
- **[Guidance](../architecture/#05-building-blocks.arc42.md:el-if-guidance):** The guidance by phase, the skills and the documentation that AI assistants read to build and list an app.
  - Serves: [Guidance for building apps](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-building-guidance)
  - Works with, outside the system: [Creator's AI assistant](../architecture/#03-system-context.arc42.md:el-actor-ai-assistant)
- **[Site actions](../architecture/#05-building-blocks.arc42.md:el-if-site-actions):** The actions every platform site is built, checked and deployed with, and the previews of its pull requests: the website, the catalog, the docs and the tooling's own pages.
  - Used by: [Website](../architecture/#05-building-blocks.arc42.md:el-bb-website), [Catalog](../architecture/#05-building-blocks.arc42.md:el-bb-catalog), [Docs](../architecture/#05-building-blocks.arc42.md:el-bb-docs)
- **[Tooling CLI](../architecture/#05-building-blocks.arc42.md:el-if-tooling-cli):** The command line an assistant and the workflows run: create an app from an archetype, check it against the rules, update it.
  - Serves: [Guidance for building apps](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-building-guidance)
  - Used by: [Catalog](../architecture/#05-building-blocks.arc42.md:el-bb-catalog)
  - Works with, outside the system: [Creator's AI assistant](../architecture/#03-system-context.arc42.md:el-actor-ai-assistant), [GitHub Actions of the app repositories](../architecture/#03-system-context.arc42.md:el-actor-app-repo-actions), [Renovate](../architecture/#03-system-context.arc42.md:el-actor-renovate)

#### [App templates](../architecture/#05-building-blocks.arc42.md:el-bb-app-templates) ([lernapps/app-templates](https://github.com/lernapps/app-templates))

The templates and runtimes of the three archetypes: quiz, explainer and interactive app. They carry the rules every app has to meet into the code, so a creator does not have to know them.

- **[Archetypes](../architecture/#05-building-blocks.arc42.md:el-if-archetypes):** The template and runtime of each archetype, which the tooling creates apps from and apps build with.
  - Serves: [Guidance for building apps](../platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-building-guidance)
  - Used by: [Tooling](../architecture/#05-building-blocks.arc42.md:el-bb-tooling)
  - Works with, outside the system: [Renovate](../architecture/#03-system-context.arc42.md:el-actor-renovate)

### Parts that support the others

These parts deliver nothing to the journeys themselves; the platform is designed, decided and kept consistent with them.

#### [Docs](../architecture/#05-building-blocks.arc42.md:el-bb-docs) ([lernapps/docs](https://github.com/lernapps/docs))

The models of the platform: the platform design, the business model and the architecture of the whole system, each in a modelling language that people and AI assistants can read and check, rendered as pages.

- **[Models](../architecture/#05-building-blocks.arc42.md:el-if-models):** The platform design, the business model and the architecture as pages under lernapps.net/docs/, and a skill that lets an AI assistant work with the platform design.

#### [Organisation](../architecture/#05-building-blocks.arc42.md:el-bb-org) ([lernapps/.github](https://github.com/lernapps/.github))

The organisation's rules that hold for every repository: the profile, the governance, the templates for issues and pull requests, and the decision issues.

- **[Organisation rules](../architecture/#05-building-blocks.arc42.md:el-if-org-rules):** The rules, governance and templates every repository of the organisation follows, and the decisions that concern several repositories.
  - Works with, outside the system: [GitHub](../architecture/#03-system-context.arc42.md:el-actor-github)

---

Generated when the docs are built, from the platform design and the architecture. The build fails when a part of one names something the other does not have, so this page cannot drift from the two models.

