# Runtime View

Six scenarios: the three [experiences](https://lernapps.net/docs/platform-design/#2-design/d7-experiences.pdt42.md) of the platform model, and the three flows that keep the system current.
They stop at the building blocks' boundaries; what happens inside the tooling or the app templates is in their own
runtime views, for example how a change of the guidance is measured by the evals
([tooling, chapter 6](https://github.com/lernapps/tooling/blob/main/docs/arc42/06-runtime-view.arc42.md)).

## An app in class within minutes

[A teacher has to take over a class at short notice](https://lernapps.net/docs/platform-design/#2-design/d7-experiences.pdt42.md:el-x-app-in-minutes). They find an app for the topic and grade, see
that it may be used, put it on the projector or pass its link or QR code to the class, and say thanks
afterwards. Everything the class opens is served from lernapps.net.

```arc42
:::runtime-scenario
id: rs-app-in-minutes
title: An app in class within minutes
trigger: A teacher has to take over a class at short notice
involves: bb-catalog, bb-website
:::
```

```arc42
:::diagram
id: rs-app-in-minutes-sequence
scenario: rs-app-in-minutes
notation: mermaid-sequence
aliases: teacher=actor-adopting-adult, student=actor-student, catalog=bb-catalog, website=bb-website, mail=actor-email
:::
```

```mermaid
sequenceDiagram
    participant teacher as Teacher
    participant student as Students
    participant website as Website
    participant catalog as Catalog
    participant mail as E-mail
    teacher->>catalog: find an app by topic and grade
    catalog-->>teacher: listed apps with their measured fitness
    teacher->>website: privacy notice, if asked
    teacher->>student: link or QR code to the served app
    student->>catalog: open the served app
    catalog-->>student: the app, from lernapps.net
    teacher->>catalog: thanks, one click
    catalog->>mail: thanks, as a prepared e-mail
```

## Help where a child struggles

[A parent whose child struggles with a topic looks for an app the child can start right away](https://lernapps.net/docs/platform-design/#2-design/d7-experiences.pdt42.md:el-x-child-struggles), or a
student looks for one alone. The flow is the same as in class, without passing the app on.

```arc42
:::runtime-scenario
id: rs-child-struggles
title: Help where a child struggles
trigger: A parent or a student notices a topic the student struggles with
involves: bb-catalog
:::
```

```arc42
:::diagram
id: rs-child-struggles-sequence
scenario: rs-child-struggles
notation: mermaid-sequence
aliases: parent=actor-adopting-adult, student=actor-student, catalog=bb-catalog, mail=actor-email
:::
```

```mermaid
sequenceDiagram
    participant parent as Parent
    participant student as Student
    participant catalog as Catalog
    participant mail as E-mail
    parent->>catalog: find an app for the topic the child struggles with
    catalog-->>parent: listed apps
    student->>catalog: open the served app
    catalog-->>student: the app, no sign-up, no installation
    parent->>catalog: thanks, one click
    catalog->>mail: thanks, as a prepared e-mail
```

## Build and list an app

[A creator finds no fitting app and decides to build one](https://lernapps.net/docs/platform-design/#2-design/d7-experiences.pdt42.md:el-x-list-and-hear-back). Their AI assistant follows the
tooling's guidance, creates the app from one of the app templates and checks it; the app's repository runs the
tooling's actions. The assistant opens the listing pull request; the catalog checks the entry and, at the platform owner's
request, has a review agent look at the app; the owner approves; the catalog publishes a copy.

```arc42
:::runtime-scenario
id: rs-build-and-list
title: Build and list an app
trigger: A creator finds no fitting app in the catalog
involves: bb-website, bb-catalog, bb-tooling, bb-app-templates, bb-org
:::
```

```arc42
:::diagram
id: rs-build-and-list-sequence
scenario: rs-build-and-list
notation: mermaid-sequence
aliases: creator=actor-creator, assistant=actor-ai-assistant, website=bb-website, catalog=bb-catalog, tooling=bb-tooling, templates=bb-app-templates, org=bb-org, appactions=actor-app-repo-actions, owner=actor-platform-owner
:::
```

```mermaid
sequenceDiagram
    participant creator as Creator
    participant assistant as AI assistant
    participant website as Website
    participant catalog as Catalog
    participant tooling as Tooling
    participant templates as App templates
    participant org as Organisation
    participant appactions as App repo Actions
    participant owner as Owner
    creator->>catalog: no fitting app found
    creator->>assistant: build an app for my class
    assistant->>website: llms.txt, the way in
    assistant->>tooling: guidance by phase, skills
    assistant->>tooling: create the app
    tooling->>templates: the archetype's template
    assistant->>tooling: check the app
    appactions->>tooling: check, build and publish in the app's repository
    assistant->>catalog: listing pull request with the entry
    catalog->>org: pull request template and rules
    catalog->>tooling: check the entry and the app
    catalog-->>assistant: results comment
    owner->>catalog: review on request, approve, merge
    catalog->>catalog: publish a copy under lernapps.net
```

## A listed app gets a new version

The creator releases a new version. The catalog builds a copy from that release and replaces the served copy; the address stays the
same and never stops working (`qs-update-without-gap`).

```arc42
:::runtime-scenario
id: rs-app-update
title: A listed app gets a new version
trigger: A creator releases a new version of a listed app
involves: bb-catalog, bb-tooling
:::
```

```arc42
:::diagram
id: rs-app-update-sequence
scenario: rs-app-update
notation: mermaid-sequence
aliases: appactions=actor-app-repo-actions, catalog=bb-catalog, tooling=bb-tooling, github=actor-github
:::
```

```mermaid
sequenceDiagram
    participant appactions as App repo Actions
    participant catalog as Catalog
    participant tooling as Tooling
    participant github as GitHub
    appactions->>tooling: build and publish the release in the app's repository
    catalog->>appactions: notice the new release
    catalog->>tooling: check the new version
    catalog->>github: update pull request for the entry, merged by policy
    catalog->>github: build and publish the new copy
    github-->>catalog: the same address serves the new copy
```

## A building block gets a new commit

The site frame, the tooling or the app templates get a new commit on their main line. Renovate, an update service, opens a
pull request in every repository that uses the block at a fixed version; it is merged when the checks pass. Inside the tooling, a change of the
guidance has been measured by its evaluations before this point.

```arc42
:::runtime-scenario
id: rs-block-update
title: A building block gets a new commit
trigger: A merge to the main line of the website, the tooling or the app templates
involves: bb-website, bb-tooling, bb-app-templates, bb-catalog, bb-docs
:::
```

```arc42
:::diagram
id: rs-block-update-sequence
scenario: rs-block-update
notation: mermaid-sequence
aliases: website=bb-website, tooling=bb-tooling, templates=bb-app-templates, catalog=bb-catalog, docs=bb-docs, renovate=actor-renovate, owner=actor-platform-owner
:::
```

```mermaid
sequenceDiagram
    participant website as Website
    participant tooling as Tooling
    participant templates as App templates
    participant catalog as Catalog
    participant docs as Docs
    participant renovate as Renovate
    participant owner as Owner
    website-->>renovate: new commit of the site frame
    templates-->>renovate: new commit of the archetypes
    tooling-->>renovate: new commit of the tooling
    renovate->>catalog: pull request: new pins
    renovate->>docs: pull request: new pin of the site frame
    renovate->>tooling: pull request: new pins
    owner->>catalog: merge, if not merged automatically
```

## A platform site is published

A change is merged to a site's main line: the website, the catalog, the docs or the tooling's pages. The tooling's
site actions build the site, run `site-check` from the site frame on the built pages, and deploy them to GitHub
Pages under lernapps.net. A failing check stops the deploy.

```arc42
:::runtime-scenario
id: rs-site-published
title: A platform site is published
trigger: A merge to the main line of a platform site
involves: bb-docs, bb-tooling, bb-website
:::
```

```arc42
:::diagram
id: rs-site-published-sequence
scenario: rs-site-published
notation: mermaid-sequence
aliases: docs=bb-docs, tooling=bb-tooling, website=bb-website, github=actor-github, counter=actor-goatcounter
:::
```

```mermaid
sequenceDiagram
    participant docs as A platform site
    participant tooling as Tooling
    participant website as Website
    participant github as GitHub
    participant counter as GoatCounter
    docs->>tooling: site action: build the site
    tooling->>website: site-check of the site frame on the built pages
    website-->>tooling: passed, or the deploy stops
    tooling->>github: deploy to GitHub Pages under lernapps.net
    github-->>counter: open counts from the published pages
```
