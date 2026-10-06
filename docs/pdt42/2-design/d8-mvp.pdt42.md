# Set up the Minimum Viable Platform

*Draft for discussion. Two stages: a first draft that can start now with the creators the platform owner knows, and the real MVP, which needs teachers who still have to be won. The first draft also produces what is needed to win them.*

Two constraints shape every test. There is no hidden data collection (KD-18): only explicit clicks are counted, openly, so most rates cannot be measured: nobody knows how many uses a thank-you is out of. And users are not accompanied or observed, because people who know they are watched would behave differently, above all when saying thanks. The tests therefore measure outcomes that need neither: whether apps get listed, whether thanks arrive, whether creators stay. With 5 to 10 creators and about 10 teachers, the criteria are small absolute numbers, and the conversations with creators are the main source. These are learning tests, not statistical ones. Comparing two ways of asking for thanks needs far more users and is left for later.

## First draft: first apps

Starts now, with the creators the platform owner knows. It tests the supply side, whether the anonymous thanks works at all, also from school networks, and whether the platform convinces teachers on its own. For the last, the owner's contacts forward a referral link to colleagues the owner does not know: the platform itself is the pitch.

```pdt42
:::canvas
id: cv-mvp-first-draft
canvas: mvp
of: mvp-first-draft
:::
```

```pdt42
:::mvp
id: mvp-first-draft
title: First draft: first apps
experiences: x-list-and-hear-back, x-app-in-minutes
base:
  - 5 to 10 potential creators from the platform owner's network
  - Teachers reached through the owner's contacts, who forward a referral link
  - The Mathe-Karte as a first app
  - The docs site and the GitHub organisation lernapps with its workflows
implementation: Concierge: the owner invites the creators personally and helps with the first listing; listing, overview, referral links and the anonymous thanks are built for real, in their simplest form
status: planned
:::
```

### Assumptions

#### Creators list an app when it costs minutes

Reach is no reason for creators to start (D4), so the first listing has to cost almost nothing. If they do not list even when invited personally, there is nothing to test the rest with.

```pdt42
:::assumption
id: a-creators-list
title: Creators list an app when it costs minutes
mvp: mvp-first-draft
kind: attraction
riskiest: yes
test: Invite the 5 to 10 creators personally and help with the first listing
criteria: At least 5 creators list an app within 2 weeks
status: open
:::
```

#### The platform convinces teachers on its own

Trust is tested at the moment of decision: does the platform's own address convince a teacher to use an app? Warm contacts would say yes for the owner's sake, so the owner's contacts forward a referral link to subject-matching colleagues the owner does not know. Only an action counts, not a promise. The referral code is one per wave, never per person: with numbers this small, totals per person would reveal individual behaviour.

```pdt42
:::assumption
id: a-platform-convinces
title: The platform convinces teachers on its own
mvp: mvp-first-draft
kind: trust
riskiest: yes
test: The owner's contacts forward a referral link of one wave to subject-matching colleagues; count "I'll have a look" and "used in class" clicks of that wave
criteria: At least 3 teachers from the forwarded wave use an app and report it with a click
status: open
:::
```

#### The anonymous thanks works, also from school networks

The thanks has to reach the platform from school networks, which often filter, and has to step aside quietly where it cannot. Without tracking, the origin of a thank-you is unknown, so creators who teach try it once from their school and report. It is good enough if it works at most of their schools.

```pdt42
:::assumption
id: a-school-filters
title: The anonymous thanks works, also from school networks
mvp: mvp-first-draft
kind: other
riskiest: no
test: Creators who teach send one thank-you from their school network and say whether it worked
criteria: It works at most of the schools of the creators who teach
status: open
:::
```

## First apps, first thanks

The real MVP, once the first draft holds. All three experiences take part. Teachers are reached through referral links that the platform owner's contacts forward, with the platform itself as the pitch and a short letter to go with it. Thanks and feedback run through the real anonymous click; users are not accompanied or observed.

```pdt42
:::canvas
id: cv-mvp-first-thanks
canvas: mvp
of: mvp-first-thanks
:::
```

```pdt42
:::mvp
id: mvp-first-thanks
title: First apps, first thanks
experiences: x-app-in-minutes, x-practice-tonight, x-list-and-hear-back
base:
  - The apps listed in the first draft
  - Referral links and a short letter for the owner's contacts to forward
  - About 10 teachers, still to be reached through forwarding
implementation: Concierge: the owner's contacts forward referral links per wave; thanks and structured feedback run through the real anonymous click; users are not accompanied or observed
status: planned
:::
```

### Assumptions

#### The platform reaches enough teachers through forwarding

Without teachers, none of the demand-side assumptions can be tested. Reaching them is not a given: it depends on contacts forwarding the platform, and on the platform convincing on its own (tested in the first draft).

```pdt42
:::assumption
id: a-teachers-reached
title: The platform reaches enough teachers through forwarding
mvp: mvp-first-thanks
kind: attraction
riskiest: yes
test: Forwarding waves through the owner's contacts, counted per wave
criteria: At least 10 teachers from forwarded waves use an app and report it with a click
status: open
:::
```

#### Thanks arrive

The platform is free and lives on thanks (KD-17). Without tracking, the test cannot say how many users do not thank; it can only say whether thanks reach the creators at all.

```pdt42
:::assumption
id: a-thanks-arrive
title: Thanks arrive
mvp: mvp-first-thanks
kind: business-model
riskiest: yes
test: Count the anonymous thanks per listed app
criteria: At least half of the listed apps receive at least one thank-you within 4 weeks
status: open
:::
```

#### Thanks keep creators

Once their apps are used, praise and use should keep creators (D4). This decides whether thanks works as the currency.

```pdt42
:::assumption
id: a-thanks-keep-creators
title: Thanks keep creators
mvp: mvp-first-thanks
kind: business-model
riskiest: yes
test: Watch the creators' repositories for updates and new apps; talk to each creator after 6 weeks
criteria: At least 3 creators who received thanks update their app or list another within 6 weeks, and say the thanks mattered
status: open
:::
```

#### Teachers use an app without checking it themselves

Trust is built in rather than checked (KD-17): only apps that meet the fitness criteria are listed. The structured feedback after use carries the question, so no one is observed.

```pdt42
:::assumption
id: a-trust-built-in
title: Teachers use an app without checking it themselves
mvp: mvp-first-thanks
kind: trust
riskiest: yes
test: Offer "I was unsure whether I may use it" as an answer in the structured feedback
criteria: Chosen in fewer than 1 in 5 feedbacks
status: open
:::
```

#### An app runs in class within minutes

The value proposition for teachers in an acute moment, measured through an answer in the structured feedback.

```pdt42
:::assumption
id: a-running-in-minutes
title: An app runs in class within minutes
mvp: mvp-first-thanks
kind: attraction
riskiest: no
test: Offer "It took too long to get it running" as an answer in the structured feedback
criteria: Chosen in fewer than 1 in 5 feedbacks
status: open
:::
```

#### Parents find the platform the evening before a test

Parents are not in the base yet. This is tested on purpose only once the riskiest assumptions hold, so it has no test yet.

```pdt42
:::ignore H115 Tested only after the riskiest assumptions hold, once parents are reached (KD-19) :::
:::assumption
id: a-parents-find
title: Parents find the platform the evening before a test
mvp: mvp-first-thanks
kind: attraction
riskiest: no
status: open
:::
```
