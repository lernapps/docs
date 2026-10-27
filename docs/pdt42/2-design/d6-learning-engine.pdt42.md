# Design the learning engine

```pdt42
:::canvas
id: cv-learning-engine
canvas: learning-engine
:::
```

*One row per core role (D4): how it arrives, and the key challenges when onboarding, getting better and catching a new opportunity. The services answer these challenges; like the channels (D5), they say what the platform offers, not how it is built.*

The engine has to solve the supply insight from D4: creators start for themselves, so the first listing must cost almost nothing, and once their app is used, use and praise must reach them. It also opens paths from the consumption to the production side: adults and students who use apps can start adapting and building their own, with the same guidance.

## Learning engine

### App creators

Creators arrive with an app they built for their own class or child, or with an acute occasion of their own. Their hurdle is the first listing; after that, what keeps them is learning that and how their app is used. Experienced creators may want to bring their own best practices into the guidance, and so grow into co-owners of the platform.

```pdt42
:::learning-engine
id: le-creators
entity: e-creators
entry:
  - An app, or an acute occasion of their own such as a test of their child or exercises for a class during an absence, for their own class or child
  - Guidance for building apps with their AI assistant
onboarding:
  - List the first app with almost no effort
getting-better:
  - Learn whether and how the app is used
  - Improve the app with feedback from classes
  - Keep a solution that proved itself and offer it to others
new-opportunity:
  - Let others build on the app and build on theirs
  - Bring their own best practices into the guidance and co-own the platform
evolves-to: e-platform-owner
:::
```

### Adopting adults

Adults arrive looking for an app for one topic and grade, or through a colleague's recommendation. Once they trust the platform, they can pass apps on, give back, and eventually adapt apps themselves or have a solution made to measure when none fits.

```pdt42
:::learning-engine
id: le-adults
entity: e-adopters
entry:
  - Looking for an app for one topic and grade
  - A recommendation from a colleague
onboarding:
  - Find a fitting app and trust that it may be used
getting-better:
  - Assemble apps for their class
  - Give feedback, recommendations and thanks
new-opportunity:
  - Adapt an app or build their own
  - Get a solution made to measure for an acute occasion when no app fits
evolves-to: e-creators
:::
```

### Students

Students arrive through an adult. They get better at using apps on their own, for the topics they struggle with. Some can become creators themselves, building an app for a topic they struggled with.

```pdt42
:::learning-engine
id: le-students
entity: e-students
entry:
  - An adult shows them an app
onboarding:
  - Start an app without installation or sign-up
getting-better:
  - Return to apps and find new ones for the topics they struggle with
  - Thank the creator
new-opportunity:
  - Build their own app
evolves-to: e-creators
:::
```

## Services

### Guidance for building apps

Helps creators build apps with their AI assistant that are easy to use and fit the platform. Creators get it even if nobody else uses their app (D4). It makes building with the assistant easier.

```pdt42
:::service
id: s-building-guidance
title: Guidance for building apps
for: e-creators
stage: onboarding
kind: empowering
supports: t-build-with-assistant
channel: ch-guidance
:::
```

### Help to list an app

The first listing is the biggest hurdle for creators; this service takes the effort out of it (D4).

```pdt42
:::service
id: s-listing-help
title: Help to list an app
for: e-creators
stage: onboarding
kind: empowering
supports: t-list-app
channel: ch-listing
:::
```

### Insight into use and feedback

Shows creators whether and how their app is used, with feedback and thanks. Seeing this is what keeps creators building (D4).

```pdt42
:::service
id: s-use-insight
title: Insight into use and feedback
for: e-creators
stage: getting-better
kind: empowering
supports: t-use-in-class, t-thank-creator-adult, t-thank-creator-student, t-give-feedback, t-recommend-app
channel: ch-creator-insight
:::
```

### Building on existing apps

Lets creators start from an existing app instead of from scratch, and lets others build on theirs.

An idea, tracked in [lernapps/docs#52](https://github.com/lernapps/docs/issues/52).

```pdt42
:::service
id: s-build-on-apps
title: Building on existing apps
for: e-creators
stage: new-opportunity
kind: empowering
:::
```

### Contributing best practices to the guidance

Lets experienced creators bring their own best practices into the guidance for building apps. Whoever shapes the guidance shapes the platform, so this is the path from creator to co-owner.

An idea, tracked in [lernapps/docs#53](https://github.com/lernapps/docs/issues/53).

```pdt42
:::service
id: s-contribute-practices
title: Contributing best practices to the guidance
for: e-creators
stage: new-opportunity
kind: empowering
:::
```

### Finding apps by topic and grade

Helps adults find a fitting app in one place.

```pdt42
:::service
id: s-finding
title: Finding apps by topic and grade
for: e-adopters
stage: onboarding
kind: other
supports: t-find-app
channel: ch-app-overview
:::
```

### Starting an app right away

Students open an app an adult brought to them and start right away, without installation or sign-up: a link or QR code is enough.

```pdt42
:::service
id: s-start-right-away
title: Starting an app right away
for: e-students
stage: onboarding
kind: other
supports: t-bring-app
channel: ch-direct-start
:::
```

### Finding apps for a topic one struggles with

Helps students return to apps and find new ones on their own, for the topic they struggle with.

```pdt42
:::service
id: s-student-finding
title: Finding apps for a topic one struggles with
for: e-students
stage: getting-better
kind: other
supports: t-return-to-app
channel: ch-app-overview
:::
```

### Clarity on fitness for use

Answers whether an app may be used, before an adult passes it on to a learner: it sends nothing to third parties, accesses only its own data in the browser and needs no installation or sign-up.

```pdt42
:::service
id: s-fitness-clarity
title: Clarity on fitness for use
for: e-adopters
stage: onboarding
kind: other
supports: t-confirm-fitness
channel: ch-fitness-signal
:::
```

### Assembling apps for a class

Lets adults bundle apps for one class and bring them to students in one step, so students start without installation or sign-up.

An idea, tracked in [lernapps/docs#54](https://github.com/lernapps/docs/issues/54).

```pdt42
:::service
id: s-class-sets
title: Assembling apps for a class
for: e-adopters
stage: getting-better
kind: other
supports: t-bring-app
channel: ch-collections
:::
```

### Giving feedback and thanks

Makes it easy for adults and students to give feedback, recommendations and thanks, without accounts and without identifying students. It explains, without being pushy, that a thank-you is what keeps the free platform alive.

```pdt42
:::service
id: s-giving-back
title: Giving feedback and thanks
for: e-adopters, e-students
stage: getting-better
kind: other
supports: t-give-feedback, t-recommend-app, t-thank-creator-adult, t-thank-creator-student
channel: ch-feedback
:::
```

### From using to adapting apps

Opens the path from using apps to making them: adults and students adapt an app or build their own, using the guidance for building apps.

An idea, tracked in [lernapps/docs#55](https://github.com/lernapps/docs/issues/55).

```pdt42
:::service
id: s-adapt-apps
title: From using to adapting apps
for: e-adopters, e-students
stage: new-opportunity
kind: other
:::
```

### A temporary app made to measure

Turns the content a creator's assistant wrote for an acute occasion into an app the learners open at once, and tells the assistant what to correct.

```pdt42
:::service
id: s-temporary-preview
title: A temporary app made to measure
for: e-creators
stage: onboarding
kind: empowering
supports: t-hand-over-made-to-measure
channel: ch-temporary-preview
:::
```
