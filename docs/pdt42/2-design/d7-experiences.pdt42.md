# Assemble the platform experiences

*Each experience takes one role's point of view in one core relationship (D4) and orders transactions (D5) and services (D6) into a journey. Two are the core entity's, adults in an acute moment: teachers right before a lesson, parents the evening before a test. The third is the creators', because supply does not come by itself (D4).*

Adults rarely plan ahead: they look for an app when they need it now. What they feel is relief, not excitement: "it fits and it runs right away". This shapes every step: trust has to be built in rather than checked, one app counts more than a collection, and anything asked afterwards must take a single click.

In every journey, the thank-you after use is a step of its own. The platform is free, and thanks is what keeps it alive: every user should understand this, without the platform being pushy about it.

## An app in class within minutes

The journey of a teacher a few minutes before a lesson: find an app for this topic and grade, see at a glance that it may be used, put it on the projector or the class's devices, and say thanks afterwards.

```pdt42
:::canvas
id: cv-x-app-in-minutes
canvas: platform-experience
of: x-app-in-minutes
:::
```

```pdt42
:::experience
id: x-app-in-minutes
title: An app in class within minutes
core-entity: e-adopters
roles: e-creators, e-students
relationship: r-creators-adults
value-proposition: The right active-learning app for this topic and grade, running in class within minutes, safe to use without checking it yourself
steps: s-finding, t-find-app, s-fitness-clarity, t-confirm-fitness, t-bring-app, t-use-in-class, s-giving-back, t-thank-creator-adult, t-give-feedback
activities:
  - Keeping listings comparable and current
  - Listing only apps that meet the fitness criteria, so trust is built in
resources:
  - The listings
  - The signal of fitness for use
costs:
  - The platform owner's time
  - Near-zero operating costs, as the apps run in the browser
revenues:
  - No money: the platform is free
  - Thanks and feedback, which keep creators contributing and the platform alive
:::
```

## Practice tonight, before the test

The journey of a parent the evening before a test: find an app the child can start right away for the topic of tomorrow's test, let the child practise, and say thanks afterwards. The setting is the kitchen table, not the classroom, and the goal is the next test, like the students' own.

```pdt42
:::canvas
id: cv-x-practice-tonight
canvas: platform-experience
of: x-practice-tonight
:::
```

```pdt42
:::experience
id: x-practice-tonight
title: Practice tonight, before the test
core-entity: e-adopters
roles: e-students, e-creators
relationship: r-adults-students
value-proposition: Tonight, before tomorrow's test: an app your child can start right away
steps: s-finding, t-find-app, t-bring-app, s-start-right-away, t-learn-with-app, s-giving-back, t-thank-creator-adult
activities:
  - Keeping listings findable by topic and grade
  - Keeping apps startable without installation or sign-up
resources:
  - The listings
  - The apps themselves, contributed by creators
costs:
  - The platform owner's time
  - Near-zero operating costs
revenues:
  - No money: the platform is free
  - Thanks, which keep creators contributing and the platform alive
:::
```

## List an app and hear it is used

The journey of the supply side: a creator who built an app for their own class lists it with almost no effort and then hears that and how it helped elsewhere. Reach is no reason to start, but use and praise keep creators (D4). The thanks they receive is the same click every user is asked for.

```pdt42
:::canvas
id: cv-x-list-and-hear-back
canvas: platform-experience
of: x-list-and-hear-back
:::
```

```pdt42
:::experience
id: x-list-and-hear-back
title: List an app and hear it is used
core-entity: e-creators
roles: e-adopters
relationship: r-creators-adults
value-proposition: Build your app faster with good guidance, list it in minutes, and hear with every thank-you when it helped a class beyond your own
steps: s-building-guidance, s-listing-help, t-list-app, t-use-in-class, s-use-insight, t-thank-creator-adult, t-give-feedback, t-recommend-app
activities:
  - Maintaining the guidance for building apps
  - Checking and publishing listings
  - Returning thanks and feedback to creators
resources:
  - The guidance for building apps
  - The listings
  - The thanks and feedback, counted anonymously
costs:
  - The platform owner's time, later shared with co-owners (D6)
  - A small service for anonymous thanks, without tracking
revenues:
  - No money: the platform is free
  - Thanks as the currency that keeps creators contributing
:::
```
