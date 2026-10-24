# How lernapps.net works

Why the platform exists, which parts it is built from, what job each part does, and how people use them. For engineers and tech leads who work on the platform or want to understand it before they read its two models. The platform design says who takes part and what they give each other; the architecture says how the system is built.

> The goal, in the platform design's words: Free to use, kept alive by thanks. Adults and students find an active-learning app they can use right away, confident that it may be used under data protection law; creators list theirs with almost no effort and hear when it helped. A thank-you, free and anonymous, is what keeps the platform alive: running it costs almost nothing, and thanks are what keep creators building.

On this page:

- **Who takes part:** the people the platform is for and the systems it relies on; the journeys are told from their views.
- **The parts and where they live:** the site map: each part's address, repository and job; the rest of the page names them.
- **How to read a journey:** how a step, a service and a part connect; read this once before the journeys.
- **The journeys:** the platform from its users' view, step by step, with the part that helps at each step and the parts working together behind it.
- **How the parts work together:** the flows behind the journeys that no user sees, for those who run or change the system.
- **Ideas:** services the platform could offer later, each with an issue to discuss it.
- **For reference: the parts of the system:** every part with its interfaces, for looking something up.

## Who takes part

The platform exists for these people. The journeys below are told from their views, so knowing them tells you whose problem a part solves.

- **Adopting adults:** Adults who come across apps built by others, browse them and bring them to their students or their own children: teachers and parents.
- **App creators:** Engaged people who build small educational apps, typically with AI tools, for a gap they noticed themselves.
- **Students:** The learners the apps are built for.
- **Platform owner:** Oliver Jägle owns and shapes the platform strategy.

The system relies on these systems outside it:

- Creator's AI assistant: the AI tool a creator builds and lists an app with; it reads the guidance and runs the CLI
- Renovate: dependency update service that keeps the versions the repositories use up to date
- GoatCounter: hosted counting service for the platform's own pages
- GitHub: repositories, issues, pull requests, Actions and Pages
- E-mail: mail system that carries thanks and feedback
- Creators' app repositories: the creators' own app repositories, whose workflows use the tooling's actions

## The parts and where they live

The platform is built from one building block per repository of the organisation, each with a job of its own. This page calls them parts. Below is the site map: where you find each part and the job it does. The journeys and flows below name these parts, so this is the list to come back to.

- **[Website](../architecture/#05-building-blocks.arc42.md:el-bb-website):** Gives the platform its face at lernapps.net and the frame every platform site is built with. Address: [lernapps.net](https://lernapps.net/) · Repository: [lernapps/lernapps.github.io](https://github.com/lernapps/lernapps.github.io)
- **[Catalog](../architecture/#05-building-blocks.arc42.md:el-bb-catalog):** Lets adults and students find, trust and start apps, and lets creators list them; it is the core of the platform. Address: [lernapps.net/apps](https://lernapps.net/apps/) · Repository: [lernapps/apps](https://github.com/lernapps/apps)
- **[Tooling](../architecture/#05-building-blocks.arc42.md:el-bb-tooling):** Gives a creator's AI assistant everything it needs to build an app that meets the platform's rules: the guidance by phase and the skills, the CLI that creates an app and checks it, and the workflows an app's repository runs. Address: [lernapps.net/tooling](https://lernapps.net/tooling/) · Repository: [lernapps/tooling](https://github.com/lernapps/tooling)
- **[App templates](../architecture/#05-building-blocks.arc42.md:el-bb-app-templates):** Provides the three kinds of app, quiz, explainer and interactive app, as templates and runtimes that already keep the platform's rules. No page of its own; it lives in its repository. · Repository: [lernapps/app-templates](https://github.com/lernapps/app-templates)
- **[Docs](../architecture/#05-building-blocks.arc42.md:el-bb-docs):** Holds the models of the platform: why it exists, who carries it and how the system is built. Address: [lernapps.net/docs](https://lernapps.net/docs/) · Repository: [lernapps/docs](https://github.com/lernapps/docs)
- **[Organisation](../architecture/#05-building-blocks.arc42.md:el-bb-org):** Holds the rules and decisions that every repository of the platform follows: the profile, the governance, the templates for issues and pull requests, and the decision issues. No page of its own; it lives in its repository. · Repository: [lernapps/.github](https://github.com/lernapps/.github)

## How to read a journey

The journeys connect the people above to the parts above. A journey is a sequence of steps people take. Where the platform helps with a step, it offers a service, and a part of the system provides it through one of its interfaces: the pages, links, templates or commands people actually use. Below each journey, a diagram shows how the parts work together behind it; every arrow carries the order to the part it points at.

For example: in the step "Find an app for a topic and grade", the platform offers the service "Finding apps by topic and grade", which the interface "Catalog pages" of the part "Catalog" provides.

A dashed block marks where a part does not yet deliver what the journey needs, and says what is missing.

## The journeys

This is why the parts exist: each journey shows a person with a problem and the parts that help them solve it. Adults in an acute moment and creators each have their journey: teachers who have to take over a class at short notice, parents who notice that their child struggles with something they cannot help with, and creators, because supply does not come by itself.

### [An app in class within minutes](../platform-design/#2-design/d7-experiences.pdt42.md:el-x-app-in-minutes)

The journey of a teacher who has to take over a class at short notice, for a colleague and perhaps outside their own subject: find an app for this topic and grade, see at a glance that it may be used, put it on the projector or the class's devices, and say thanks afterwards. It may be used because the platform lists only apps that pass its checks of fitness for use and serves each one itself, under lernapps.net and its privacy notice.

Mainly for adopting adults; also involves app creators, students. What they get: The right active-learning app for this topic and grade, even outside your subject, running in class within minutes, safe to use without checking it yourself.

1. Find an app for a topic and grade
   - **Finding apps by topic and grade**
     - For adopting adults: Helps adults find a fitting app in one place.
     - Delivered by: Catalog pages (Catalog).
1. Confirm an app may be used
   - **Clarity on fitness for use**
     - For adopting adults: Answers whether an app may be used, before an adult passes it on to a learner: it sends nothing to third parties, keeps only its own data in the browser and needs no installation or sign-up.
     - Delivered by: Catalog pages (Catalog), Home pages (Website), Listing (Catalog).
1. Bring an app to students
   - **Starting an app right away**
     - For students: Students open an app an adult brought to them and start right away, without installation or sign-up: a link or QR code is enough.
     - Delivered by: Served apps (Catalog).
1. Use an app in class
   - Happens inside the app, without the platform.
1. Thank the creator · Give feedback from classroom use
   - **Giving feedback and thanks**
     - For adopting adults, students: Makes it easy for adults and students to give feedback, recommendations and thanks, without accounts and without identifying students. It explains, without being pushy, that a thank-you is what keeps the free platform alive.
     - ┆ Not yet: Thanks (Catalog): A click opens a prepared e-mail from the sender's own account; thanks and feedback arrive, but they are neither anonymous nor counted, and recommendations are not recorded.

**Behind this journey: how the parts work together**

1. Adopting adult → Catalog: find me an app for this topic and grade
1. Catalog ⇢ Adopting adult: listed apps with their measured fitness
1. Adopting adult → Website: show me the privacy notice, if asked
1. Adopting adult → Student: open this app (link or QR code)
1. Student → Catalog: serve me the app
1. Catalog ⇢ Student: the app, from lernapps.net
1. Adopting adult → Catalog: pass on my thanks (one click)
1. Catalog → E-mail: carry the thanks to the platform owner

### [Help where a child struggles](../platform-design/#2-design/d7-experiences.pdt42.md:el-x-child-struggles)

The journey of a parent who notices that their child struggles with a topic and cannot help, for lack of time or because they do not know the subject well enough: find an app for exactly that topic, let the child start right away and practise, and say thanks afterwards. The child keeps coming back to the app, or finds the next one alone, for as long as it needs; the child may also be the one who notices the gap. The app starts from lernapps.net like every listed app, so parents do not have to judge a stranger's address.

Mainly for adopting adults; also involves students, app creators. What they get: When your child struggles and you cannot help: an app for exactly that topic, to start right away and come back to.

1. As in the journey “An app in class within minutes”: Find an app for a topic and grade · Confirm an app may be used · Bring an app to students.
1. Learn with an app
   - Happens inside the app, without the platform.
1. Return to an app
   - **Finding apps for a topic one struggles with**
     - For students: Helps students return to apps and find new ones on their own, for the topic they struggle with.
     - Delivered by: Catalog pages (Catalog).
1. As in the journey “An app in class within minutes”: Thank the creator.

**Behind this journey: how the parts work together**

1. Adopting adult → Catalog: find me an app for the topic my child struggles with
1. Catalog ⇢ Adopting adult: listed apps
1. Student → Catalog: serve me the app
1. Catalog ⇢ Student: the app, no sign-up, no installation
1. Adopting adult → Catalog: pass on my thanks (one click)
1. Catalog → E-mail: carry the thanks to the platform owner

### [List an app and hear it is used](../platform-design/#2-design/d7-experiences.pdt42.md:el-x-list-and-hear-back)

The journey of the supply side: a creator who built an app for their own class lists it with almost no effort and then hears whether and how it helped elsewhere. Creators do not start for the reach, but use and praise keep them going. The thanks they receive come from the one click every user is asked for. The platform serves a copy of the app under lernapps.net, so the creator stays the author but no longer answers to schools for data protection; in return the app needs a licence that allows the copy.

Mainly for app creators; also involves adopting adults. What they get: Build your app faster with good guidance, list it in minutes without answering to schools for data protection yourself, and hear with every thank-you when it helped a class beyond your own.

1. Building the app:
   - **Guidance for building apps**
     - For app creators: Helps creators build apps with their AI assistant that are easy to use and fit the platform. Creators get it even if nobody else uses their app.
     - Delivered by: Archetypes (App templates), Guidance (Tooling), Home pages (Website), Tooling CLI (Tooling).
1. List an app
   - **Help to list an app**
     - For app creators: The first listing is the biggest hurdle for creators; this service takes the effort out of it.
     - Delivered by: Listing (Catalog).
1. What app creators get back from the other journeys: one use of the app in a class; a thank-you to the creator; structured feedback from one class; a recommendation credited to the creator.
   - **Insight into use and feedback**
     - For app creators: Shows creators whether and how their app is used, with feedback and thanks. Seeing this is what keeps creators building.
     - ┆ Not yet: Site frame (Website): Only visits to an app's page in the catalog are counted, not the use of the app itself, and only the platform owner sees the totals.
     - ┆ Not yet: Thanks (Catalog): Thanks reach the creator only if the platform owner passes them on.

**Behind this journey: how the parts work together**

1. Creator → Catalog: find me an app for my class
1. Catalog ⇢ Creator: no fitting app
1. Creator → Creator's AI assistant: build an app for my class
1. Creator's AI assistant → Website: show me the way in (llms.txt)
1. Creator's AI assistant → Tooling: give me the guidance for this phase
1. Creator's AI assistant → Tooling: create the app
1. Tooling → App templates: provide the archetype's template
1. Creator's AI assistant → Tooling: check the app
1. Creators' app repositories → Tooling: check, build and publish the app
1. Creator's AI assistant → Organisation: give me the pull request template and the rules
1. Creator's AI assistant → Catalog: list this app (pull request with the entry)
1. Catalog → Tooling: check the entry and the app
1. Catalog ⇢ Creator's AI assistant: the results, as a comment
1. Platform owner → Catalog: have the app reviewed if needed, then publish it
1. Catalog → GitHub: build and publish a copy under lernapps.net

## How the parts work together

The journeys show what users see. Behind them the parts pass work to each other in flows that no user sees. Read this if you run or change the system.

### [A listed app gets a new version](../architecture/#06-runtime-view.arc42.md:el-rs-app-update)

The creator releases a new version. The catalog builds a copy from that release and replaces the served copy; the address stays the same and never stops working.

1. Creators' app repositories → Tooling: build and publish the release
1. Catalog → Creators' app repositories: report new releases
1. Catalog → Tooling: check the new version
1. Catalog → GitHub: open and merge the entry's update pull request
1. Catalog → GitHub: build and publish the new copy
1. GitHub ⇢ Catalog: the same address serves the new copy

### [The platform passes on its updates](../architecture/#06-runtime-view.arc42.md:el-rs-block-update)

When the site frame, the tooling or the app templates improve, the platform passes the improvement on to every repository that uses them, the creators' apps included: Renovate, an update service, opens a pull request in each one, and it is merged when the checks pass. An improvement of the guidance has been measured before it is passed on.

1. Renovate → Website: report new versions of the site frame
1. Renovate → App templates: report new versions of the archetypes
1. Renovate → Tooling: report new versions of the tooling
1. Renovate → Catalog: take the new versions (pull request)
1. Renovate → Docs: take the new site frame (pull request)
1. Renovate → Tooling: take the new versions (pull request)
1. Renovate → Creators' app repositories: take the new versions (pull request)
1. Platform owner → Catalog: merge it, if not merged automatically

### [A platform site is published](../architecture/#06-runtime-view.arc42.md:el-rs-site-published)

A change is merged to a site's main line: the website, the catalog, the docs or the tooling's pages; the diagram shows the docs as the example. The tooling's site actions build the site, run site-check from the site frame on the built pages, and deploy them to GitHub Pages under lernapps.net. A failing check stops the deploy.

1. Docs → Tooling: build the site (site action)
1. Tooling → Website: check the built pages (site-check)
1. Website ⇢ Tooling: passed, or stop the deploy
1. Tooling → GitHub: publish the pages under lernapps.net
1. GitHub → GoatCounter: count the visits to the published pages

## Ideas

Services the platform design names but no journey needs. They show where the platform could grow; each is discussed in its own issue, which is the place to take part.

- **Building on existing apps**
  - For app creators: Lets creators start from an existing app instead of from scratch, and lets others build on theirs.
  - Issue: [lernapps/docs#52](https://github.com/lernapps/docs/issues/52).
- **Contributing best practices to the guidance**
  - For app creators: Lets experienced creators bring their own best practices into the guidance for building apps. Whoever shapes the guidance shapes the platform, so this is the path from creator to co-owner.
  - Issue: [lernapps/docs#53](https://github.com/lernapps/docs/issues/53).
- **Assembling apps for a class**
  - For adopting adults: Lets adults bundle apps for one class and bring them to students in one step, so students start without installation or sign-up.
  - Would support: Bring an app to students.
  - Issue: [lernapps/docs#54](https://github.com/lernapps/docs/issues/54).
- **From using to adapting apps**
  - For adopting adults, students: Opens the path from using apps to making them: adults and students adapt an app or build their own, using the guidance for building apps.
  - Issue: [lernapps/docs#55](https://github.com/lernapps/docs/issues/55).

## For reference: the parts of the system

Each part with the interfaces it offers, the services they serve and the parts that use them. Look things up here; each part is described as a whole in the architecture and in detail in its own repository.

### Parts that deliver what the journeys need

#### [Website](../architecture/#05-building-blocks.arc42.md:el-bb-website) ([lernapps/lernapps.github.io](https://github.com/lernapps/lernapps.github.io))

The home page tells the platform's story in plain language; the privacy notice and the imprint cover every served app; llms.txt is the entry point for AI assistants. The frame is the shared header and footer and site-check, the checks every site has to pass before it is published.

- **Home pages:** The home page, the privacy notice and the imprint, and the root llms.txt that leads AI assistants to the other parts of the platform.
  - Serves: Guidance for building apps, Clarity on fitness for use
  - Works with, outside the system: Creator's AI assistant
- **Site frame:** The shared header, footer, styles and counting snippet of every platform site, and site-check, the check every site runs on its built pages before it is deployed.
  - Serves: Insight into use and feedback
  - ┆ Not yet: Only visits to an app's page in the catalog are counted, not the use of the app itself, and only the platform owner sees the totals.
  - Used by: Catalog, Tooling, Docs
  - Works with, outside the system: Renovate, GoatCounter

#### [Catalog](../architecture/#05-building-blocks.arc42.md:el-bb-catalog) ([lernapps/apps](https://github.com/lernapps/apps))

For adults and students, it makes apps findable by topic and grade, serves a copy of every listed app under lernapps.net and keeps it current, and takes the thanks of adults and students. For creators, it takes their entries and helps them list; it checks each entry and, at the platform owner's request, has a review agent look at the app.

- **Catalog pages:** The pages where adults and students find an app for a topic and grade, see its fitness for use, and find the way to build an app when none fits.
  - Serves: Finding apps by topic and grade, Finding apps for a topic one struggles with, Clarity on fitness for use
- **Listing:** How a creator, through their AI assistant, lists an app: an entry by pull request, checked automatically (what the app sends to third parties and keeps in the browser, whether its links and topics hold, and that its licence allows the copy) and, at the platform owner's request, by a review agent, an AI that checks the app against a checklist, with the result as a comment on the pull request.
  - Serves: Help to list an app, Clarity on fitness for use
  - Works with, outside the system: Creator's AI assistant, GitHub
- **Served apps:** The copy of every listed app that lernapps.net serves and links: built from the release the creator publishes at their own address, and served under one address that keeps working.
  - Serves: Starting an app right away
- **Thanks:** A thank-you and feedback in one click from the catalog or an app, counted openly and passed on to the creator. The interface stays the same when its realisation changes.
  - Serves: Insight into use and feedback, Giving feedback and thanks
  - ┆ Not yet: A click opens a prepared e-mail from the sender's own account; thanks and feedback arrive, but they are neither anonymous nor counted, and recommendations are not recorded.
  - ┆ Not yet: Thanks reach the creator only if the platform owner passes them on.
  - Works with, outside the system: E-mail

#### [Tooling](../architecture/#05-building-blocks.arc42.md:el-bb-tooling) ([lernapps/tooling](https://github.com/lernapps/tooling))

It also holds the actions that build every platform site and publish it once site-check has passed.

- **App actions:** The reusable workflows and actions an app's repository runs to check and build the app and to publish the creator's own release, at the creator's address.
  - Works with, outside the system: Creators' app repositories, GitHub
- **Guidance:** The guidance by phase, the skills and the documentation that AI assistants read to build and list an app.
  - Serves: Guidance for building apps
  - Works with, outside the system: Creator's AI assistant
- **Site actions:** The actions every platform site is built, checked and deployed with, and the previews of its pull requests: the website, the catalog, the docs and the tooling's own pages.
  - Used by: Website, Catalog, Docs
- **Tooling CLI:** The command line an assistant and the workflows run: create an app from an archetype, check it against the rules, update it.
  - Serves: Guidance for building apps
  - Used by: Catalog
  - Works with, outside the system: Creator's AI assistant, Creators' app repositories, Renovate

#### [App templates](../architecture/#05-building-blocks.arc42.md:el-bb-app-templates) ([lernapps/app-templates](https://github.com/lernapps/app-templates))

They carry the rules into the code, so a creator does not have to know them.

- **Archetypes:** The template and runtime of each archetype, which the tooling creates apps from and apps build with.
  - Serves: Guidance for building apps
  - Used by: Tooling
  - Works with, outside the system: Renovate

### Parts that support the others

These parts provide no service to a journey, but they take part in the flows behind them.

#### [Docs](../architecture/#05-building-blocks.arc42.md:el-bb-docs) ([lernapps/docs](https://github.com/lernapps/docs))

They are the platform design, the business model and the architecture of the whole system, each in a modelling language that people and AI assistants can read and check, rendered as pages.

- **Models:** The platform design, the business model and the architecture as pages under lernapps.net/docs/, and a skill that lets an AI assistant work with the platform design.

#### [Organisation](../architecture/#05-building-blocks.arc42.md:el-bb-org) ([lernapps/.github](https://github.com/lernapps/.github))

- **Organisation rules:** The rules, governance and templates every repository of the organisation follows, and the decisions that concern several repositories.
  - Works with, outside the system: GitHub

---

Generated when the docs are built, from the platform design and the architecture. The build fails when a part of one names something the other does not have, so this page cannot drift from the two models.

