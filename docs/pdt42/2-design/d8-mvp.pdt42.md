# Set up the Minimum Viable Platform

*Draft for discussion. Two stages: a first draft that can start now with the creators the platform owner knows, and the real MVP, which needs teachers who still have to be won. The first draft also produces what is needed to win them.*

Two constraints shape every test. There is no tracking (KD-18), so no rate can be measured: nobody knows how many uses a thank-you is out of. And users are not accompanied or observed, because people who know they are watched would behave differently, above all when saying thanks. The tests therefore measure outcomes that need neither: whether apps get listed, whether thanks arrive, whether creators stay. With 5 to 10 creators and about 10 teachers, the criteria are small absolute numbers, and the conversations with creators are the main source. These are learning tests, not statistical ones. Comparing two ways of asking for thanks needs far more users and is left for later.

## First draft: first apps

Starts now, with the creators the platform owner knows. It tests the supply side and whether the anonymous thanks works at all, also from school networks: many of these creators are teachers or parents themselves. The apps, screenshots and a short demo that come out of it are the material for winning teachers for the real MVP.

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
experiences: x-list-and-hear-back
base:
  - 5 to 10 potential creators from the platform owner's network
  - The Mathe-Karte as a first app
  - The docs site and the GitHub organisation lernapps with its workflows
implementation: Concierge: the owner invites the creators personally and helps with the first listing; listing, overview and the anonymous thanks are built for real, in their simplest form
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

#### The anonymous thanks works, also from school networks

The thanks has to reach the platform from school networks, which often filter, and has to step aside quietly where it cannot. Without tracking, the origin of a thank-you is unknown, so creators who teach try it once from their school and report.

```pdt42
:::assumption
id: a-school-filters
title: The anonymous thanks works, also from school networks
mvp: mvp-first-draft
kind: other
riskiest: no
test: Creators who teach send one thank-you from their school network and say whether it worked
status: open
:::
```

#### The platform owner can run the platform alone

The platform has one owner (KD-09) and no money. The effort of the first draft shows whether that is sustainable until co-owners join (D6).

```pdt42
:::assumption
id: a-owner-alone
title: The platform owner can run the platform alone
mvp: mvp-first-draft
kind: business-model
riskiest: no
test: The owner notes the hours spent each week
status: open
:::
```

## First apps, first thanks

The real MVP, once the first draft holds and teachers are won. All three experiences take part. Teachers are reached through the platform owner's contacts with prepared material from the first draft. Thanks and feedback run through the real anonymous click; users are not accompanied or observed.

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
  - Material to win teachers, built from the first draft
  - About 10 teachers, still to be won through the owner's contacts
implementation: Concierge: the owner wins teachers personally with the prepared material; thanks and structured feedback run through the real anonymous click; users are not accompanied or observed
status: planned
:::
```

### Assumptions

#### Teachers can be won with prepared material

Without teachers, none of the demand-side assumptions can be tested. Winning them is not a given: it needs material made for the purpose and the owner's contacts.

```pdt42
:::assumption
id: a-teachers-won
title: Teachers can be won with prepared material
mvp: mvp-first-thanks
kind: attraction
riskiest: yes
test: Approach teachers through the owner's contacts with the prepared material
criteria: At least 10 teachers agree to use the platform in their lessons
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

Parents are not in the base yet; this is tested once the riskiest assumptions hold.

```pdt42
:::assumption
id: a-parents-find
title: Parents find the platform the evening before a test
mvp: mvp-first-thanks
kind: attraction
riskiest: no
status: open
:::
```
