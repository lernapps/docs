# Design the learning engine

```pdt42
:::canvas
id: cv-learning-engine
canvas: learning-engine
:::
```

*Draft for discussion. One row per core role (D4): how it arrives, and the key challenges when onboarding, getting better and catching a new opportunity. The services answer these challenges; like the channels (D5), they say what the platform offers, not how it is built.*

The engine has to solve the supply insight from D4: creators start for themselves, so the first listing must cost almost nothing, and once their app is used, use and praise must reach them. It also opens paths from the consumption to the production side: adults and students who use apps can start adapting and building their own, with the same guidance.

## Learning engine

### App creators

Creators arrive with an app they built for their own class or child. Their hurdle is the first listing; after that, what keeps them is learning that and how their app is used.

```pdt42
:::learning-engine
id: le-creators
entity: e-creators
entry:
  - An app built for their own class or child
  - Guidance for building apps with their AI assistant
onboarding:
  - List the first app with almost no effort
getting-better:
  - Learn whether and how the app is used
  - Improve the app with feedback from classes
new-opportunity:
  - Let others build on the app and build on theirs
:::
```

### Adopting adults

Adults arrive looking for an app for one topic and grade, or through a colleague's recommendation. Once they trust the platform, they can pass apps on, give back, and eventually adapt apps themselves.

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
evolves-to: e-creators
:::
```

### Students

Students arrive through an adult. They get better at using apps on their own, for instance before a test. Some can become creators themselves, building an app for a topic they struggled with.

```pdt42
:::learning-engine
id: le-students
entity: e-students
entry:
  - An adult shows them an app
onboarding:
  - Start an app without installation or sign-up
getting-better:
  - Return to apps and find new ones for their topic before a test
  - Thank the creator
new-opportunity:
  - Build their own app
evolves-to: e-creators
:::
```

## Services

### Guidance for building apps

Helps creators build apps with their AI assistant that are easy to use and fit the platform. It is the benefit that does not depend on reach (D4), and the same guidance lets adults start building.

```pdt42
:::service
id: s-building-guidance
title: Guidance for building apps
for: e-creators
stage: onboarding
kind: empowering
:::
```

### Help to list an app

Takes the effort out of the first listing, the hurdle for creators (D4).

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

Shows creators that and how their app is used, with feedback and thanks. This is the reputation flow that keeps them (D4).

```pdt42
:::service
id: s-use-insight
title: Insight into use and feedback
for: e-creators
stage: getting-better
kind: empowering
supports: t-use-in-class, t-give-feedback, t-recommend-app
channel: ch-feedback
:::
```

### Building on existing apps

Lets creators start from an existing app instead of from scratch, and lets others build on theirs.

```pdt42
:::service
id: s-build-on-apps
title: Building on existing apps
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

Students open an app an adult brought to them and start right away, without installation or sign-up.

```pdt42
:::service
id: s-start-right-away
title: Starting an app right away
for: e-students
stage: onboarding
kind: other
supports: t-bring-app
channel: ch-collections
:::
```

### Finding apps before a test

Helps students return to apps and find new ones for their topic on their own, for instance before a test.

```pdt42
:::service
id: s-student-finding
title: Finding apps before a test
for: e-students
stage: getting-better
kind: other
supports: t-return-to-app
channel: ch-app-overview
:::
```

### Clarity on fitness for use

Answers whether an app may be used, before an adult brings it to class.

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

Makes it easy for adults and students to give feedback, recommendations and thanks, without accounts and without identifying students.

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

Opens the path from the consumption to the production side: adults and students adapt an app or build their own, using the guidance for building apps.

```pdt42
:::service
id: s-adapt-apps
title: From using to adapting apps
for: e-adopters, e-students
stage: new-opportunity
kind: other
:::
```
