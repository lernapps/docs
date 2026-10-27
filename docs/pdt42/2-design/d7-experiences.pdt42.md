# Assemble the platform experiences

*Adults in an acute moment and creators each have their journey: teachers who have to take over a class at short notice, parents who notice that their child struggles with something they cannot help with, and creators, because supply does not come by itself (D4). Each experience takes one role's point of view in one core relationship (D4) and orders transactions (D5) and services (D6) into a journey.*

Adults rarely plan ahead: they look for an app when they need it now. What they feel is relief, not excitement: "it fits and it runs right away". This shapes every step: trust has to be built in rather than checked, one app counts more than a collection, and anything asked afterwards must take a single click.

In every journey, the thank-you after use is a step of its own. The platform is free, and thanks is what keeps it alive: every user should understand this, without the platform being pushy about it.

## An app in class within minutes

The journey of a teacher who has to take over a class at short notice, for a colleague and perhaps outside their own subject: find an app for this topic and grade, see at a glance that it may be used, put it on the projector or the class's devices, and say thanks afterwards. It may be used because the platform lists only apps that pass its checks of fitness for use and serves each one itself, under lernapps.net and its privacy notice (KD-21).

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
value-proposition: The right active-learning app for this topic and grade, even outside your subject, running in class within minutes, safe to use without checking it yourself
steps: s-finding, t-find-app, s-fitness-clarity, t-confirm-fitness, s-start-right-away, t-bring-app, t-use-in-class, s-giving-back, t-thank-creator-adult, t-give-feedback
activities:
  - Keeping listings comparable and current
  - Listing only apps that meet the fitness criteria, so trust is built in
  - Serving every listed app under lernapps.net, under one privacy notice
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

## Help where a child struggles

The journey of a parent who notices that their child struggles with a topic and cannot help, for lack of time or because they do not know the subject well enough: find an app for exactly that topic, let the child start right away and practise, and say thanks afterwards. The child keeps coming back to the app, or finds the next one alone, for as long as it needs; the child may also be the one who notices the gap. The app starts from lernapps.net like every listed app (KD-21), so parents do not have to judge a stranger's address.

```pdt42
:::canvas
id: cv-x-child-struggles
canvas: platform-experience
of: x-child-struggles
:::
```

```pdt42
:::experience
id: x-child-struggles
title: Help where a child struggles
core-entity: e-adopters
roles: e-students, e-creators
relationship: r-adults-students
value-proposition: When your child struggles and you cannot help: an app for exactly that topic, to start right away and come back to
steps: s-finding, t-find-app, s-fitness-clarity, t-confirm-fitness, t-bring-app, s-start-right-away, t-learn-with-app, s-student-finding, t-return-to-app, s-giving-back, t-thank-creator-adult
activities:
  - Keeping listings findable by topic and grade
  - Keeping apps startable without installation or sign-up
resources:
  - The listings
  - The apps themselves, contributed by creators and served under lernapps.net
costs:
  - The platform owner's time
  - Near-zero operating costs
revenues:
  - No money: the platform is free
  - Thanks, which keep creators contributing and the platform alive
:::
```

## List an app and hear it is used

The journey of the supply side: a creator who built an app for their own class lists it with almost no effort and then hears whether and how it helped elsewhere. Creators do not start for the reach, but use and praise keep them going (D4). The thanks they receive come from the one click every user is asked for. The platform serves a copy of the app under lernapps.net (KD-21), so the creator stays the author but no longer answers to schools for data protection; in return the app needs a licence that allows the copy.

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
value-proposition: Build your app faster with good guidance, list it in minutes without answering to schools for data protection yourself, and hear with every thank-you when it helped a class beyond your own
steps: s-building-guidance, s-listing-help, t-list-app, t-use-in-class, s-use-insight, t-thank-creator-adult, t-give-feedback, t-recommend-app
activities:
  - Maintaining the guidance for building apps
  - Checking and publishing listings
  - Publishing and updating a copy of every listed app under lernapps.net
  - Returning thanks and feedback to creators
resources:
  - The guidance for building apps
  - The listings
  - The copies of the listed apps
  - The thanks and feedback, counted anonymously
costs:
  - The platform owner's time, later shared with co-owners (D6)
  - A small service for anonymous thanks, without tracking
revenues:
  - No money: the platform is free
  - Thanks as the currency that keeps creators contributing
:::
```

## Prepare for a test with the family's assistant

The journey of a parent whose child has a test coming up: the parent's AI assistant looks for an app for the topic and, when none fits, reads photos of the school material, agrees the scope with the child and writes content of its own. The parent submits it, the platform checks it and builds an app, and the child practises with it at a temporary address. The learning state stays in the child's browser, and the photos go to the family's assistant only. The family wrote the content, so no other creator is thanked. A preparation that helped can be kept and checked for the catalog.

```pdt42
:::canvas
id: cv-x-prepare-for-test
canvas: platform-experience
of: x-prepare-for-test
:::
```

```pdt42
:::experience
id: x-prepare-for-test
title: Prepare for a test with the family's assistant
core-entity: e-adopters
roles: e-students, e-creators
relationship: r-adults-students
value-proposition: A test next week and a child who is not ready: your assistant turns the school material into practice of its own, ready to open within minutes, with nothing about your child leaving the family
steps: s-finding, t-find-app, s-preparation-guidance, s-temporary-preview, t-hand-over-preparation, t-practise-for-test
activities:
  - Checking and building each submission, and answering with what to correct
  - Publishing temporary apps and deleting them when they end
  - Keeping the guidance for the family's assistant current
resources:
  - The guidance for the family's assistant
  - The explainer template and the checks of the platform
  - GitHub for the form, the builds and the temporary addresses
costs:
  - The platform owner's time
  - Near-zero operating costs: GitHub builds and serves the previews
revenues:
  - No money: the platform is free
  - Preparations that proved themselves, which can enter the catalog
:::
```
