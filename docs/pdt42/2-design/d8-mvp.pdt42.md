# Set up the Minimum Viable Platform

```pdt42
:::canvas
id: cv-mvp
canvas: mvp
of: mvp-first-thanks
:::
```

*Draft for discussion. The MVP tests whether the platform's riskiest assumptions hold with the real ecosystem: whether supply comes about, and whether thanks works as the currency of a free platform.*

Two constraints shape every test. There is no tracking (KD-18), so no rate can be measured: nobody knows how many uses a thank-you is out of. And users are not accompanied or observed, because people who know they are watched would behave differently, above all when saying thanks. The tests therefore measure outcomes that need neither: whether thanks arrive at all, and whether creators stay. With 5 to 10 creators and up to 10 teachers, the criteria are small absolute numbers, and the conversations with creators are the main source. This is a learning MVP, not a statistical test.

## First apps, first thanks

All three experiences take part. The platform owner invites the creators personally and helps with their first listing (concierge); teachers are reached through the owner's contacts. Thanks and feedback run through the real anonymous click from the start, so what is tested is what will be built.

```pdt42
:::mvp
id: mvp-first-thanks
title: First apps, first thanks
experiences: x-app-in-minutes, x-practice-tonight, x-list-and-hear-back
base:
  - 5 to 10 potential creators from the platform owner's network
  - Up to 10 teachers, reached through the owner's contacts
  - The Mathe-Karte as a first app
  - The docs site and the GitHub organisation lernapps with its workflows
implementation: Concierge: the owner invites creators and teachers personally and helps with the first listing; thanks and structured feedback run through the real anonymous click; users are not accompanied or observed
status: planned
:::
```

## Assumptions

### Creators list an app when it costs minutes

Reach is no reason for creators to start (D4), so the first listing has to cost almost nothing. If they do not list even when invited personally, there is nothing to test the rest with.

```pdt42
:::assumption
id: a-creators-list
title: Creators list an app when it costs minutes
mvp: mvp-first-thanks
kind: attraction
riskiest: yes
test: Invite the 5 to 10 creators personally and help with the first listing
criteria: At least 5 creators list an app within 2 weeks
status: open
:::
```

### Thanks arrive

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

### Thanks keep creators

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

### Teachers use an app without checking it themselves

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

### An app runs in class within minutes

The value proposition for teachers in an acute moment. Measured the same way as trust, through an answer in the structured feedback.

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

### The way thanks is asked for makes a difference

Thanks should be well integrated without being pushy. Without tracking, two wordings or placements can still be compared: the platform shows one of them at random, so both reach about the same number of users.

```pdt42
:::assumption
id: a-thanks-wording
title: The way thanks is asked for makes a difference
mvp: mvp-first-thanks
kind: other
riskiest: no
test: Show one of two wordings or placements at random and count the thanks per variant
status: open
:::
```

### School networks let the thanks through

The thanks has to reach the platform from school networks, which often filter. Without tracking, the origin of a thank-you is unknown, so teachers try it once and report.

```pdt42
:::assumption
id: a-school-filters
title: School networks let the thanks through
mvp: mvp-first-thanks
kind: other
riskiest: no
test: Ask the teachers to send one thank-you from their school network and say whether it worked
status: open
:::
```

### Parents find the platform the evening before a test

Parents are not in the base yet; this is tested once the first assumptions hold.

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

### The platform owner can run the platform alone

The platform has one owner (KD-09) and no money. The effort of the MVP shows whether that is sustainable until co-owners join (D6).

```pdt42
:::assumption
id: a-owner-alone
title: The platform owner can run the platform alone
mvp: mvp-first-thanks
kind: business-model
riskiest: no
test: The owner notes the hours spent on the MVP each week
status: open
:::
```
