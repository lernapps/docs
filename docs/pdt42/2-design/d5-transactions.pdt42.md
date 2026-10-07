# Identify the elementary transactions and channels

*One Transactions Board per core relationship (D4). Each transaction is a repeatable action with a specific value unit; `happening: yes` marks what already occurs today, without lernapps.net. The channels are what the platform would build to lower the cost of each transaction.*

Three transactions have no platform channel on purpose: learning with an app and working on it happen inside the app itself, and students thank adults directly in class. The platform does not need to stand between them.

## Transactions Board: Creators and adults

```pdt42
:::canvas
id: cv-board-creators-adults
canvas: transactions-board
of: r-creators-adults
:::
```

### List an app

A creator makes an app available to others. It happens today, but on each creator's own website, GitHub or social media, and in no comparable form.

```pdt42
:::transaction
id: t-list-app
title: List an app
relationship: r-creators-adults
from: e-creators
to: e-adopters
direction: one-way
value-unit: An app listing: what it teaches, for whom, a link
happening: yes
channel: ch-listing
kind: goods
motivation: m-creators-adopters
job: j-make-available
:::
```

### Find an app for a topic and grade

An adult finds an app that fits their class. Today this depends on word of mouth, teacher platforms or luck.

```pdt42
:::transaction
id: t-find-app
title: Find an app for a topic and grade
relationship: r-creators-adults
from: e-creators
to: e-adopters
direction: one-way
value-unit: A matching app for one topic and one grade
happening: yes
channel: ch-app-overview
kind: goods
motivation: m-creators-adopters
job: j-find-reuse
:::
```

### Confirm an app may be used

An adult checks whether an app may be used in class. Today each teacher judges alone or asks a gatekeeper.

```pdt42
:::transaction
id: t-confirm-fitness
title: Confirm an app may be used
relationship: r-creators-adults
from: e-creators
to: e-adopters
direction: one-way
value-unit: A signal of fitness for use: frontend-only, no installation, no sign-up
happening: no
channel: ch-fitness-signal
kind: knowledge
job: j-confirm-use
:::
```

### Use an app in class

An adult puts the app into use. This is the attention creators get today, but it stays invisible to them.

```pdt42
:::transaction
id: t-use-in-class
title: Use an app in class
relationship: r-creators-adults
from: e-adopters
to: e-creators
direction: one-way
value-unit: One use of the app in a class
happening: yes
channel: ch-feedback
kind: attention
motivation: m-adopters-creators-attention
:::
```

### Give feedback from classroom use

An adult tells the creator how the app worked in class. This hardly happens today.

```pdt42
:::transaction
id: t-give-feedback
title: Give feedback from classroom use
relationship: r-creators-adults
from: e-adopters
to: e-creators
direction: one-way
value-unit: A short feedback note from one class
happening: no
channel: ch-feedback
kind: feedback
motivation: m-adopters-creators-feedback
:::
```

### Recommend an app

An adult recommends an app, and the recommendation is credited to its creator.

```pdt42
:::transaction
id: t-recommend-app
title: Recommend an app
relationship: r-creators-adults
from: e-adopters
to: e-creators
direction: one-way
value-unit: A recommendation credited to the creator
happening: no
channel: ch-feedback
kind: reputation
motivation: m-adopters-creators-reputation
:::
```

### Thank the creator

An adult thanks the creator for an app that worked in class.

```pdt42
:::transaction
id: t-thank-creator-adult
title: Thank the creator
relationship: r-creators-adults
from: e-adopters
to: e-creators
direction: one-way
value-unit: A thank-you to the creator
happening: no
channel: ch-feedback
kind: reputation
motivation: m-adopters-creators-gratitude
:::
```

## Transactions Board: Adults and students

```pdt42
:::canvas
id: cv-board-adults-students
canvas: transactions-board
of: r-adults-students
:::
```

### Bring an app to students

An adult gets an app in front of students. Today adults use every available channel: links, QR codes, the projector, school tablets.

```pdt42
:::transaction
id: t-bring-app
title: Bring an app to students
relationship: r-adults-students
from: e-adopters
to: e-students
direction: one-way
value-unit: Access to one app or a collection
happening: yes
channel: ch-collections
kind: access
motivation: m-adopters-students
job: j-bring-to-students
:::
```

### Work on their own with an app

Students work with the app on their own, which gives the teacher free time.

```pdt42
:::ignore H108 Working on an app happens in the app; no platform channel on purpose :::
:::transaction
id: t-work-alone
title: Work on their own with an app
relationship: r-adults-students
from: e-students
to: e-adopters
direction: one-way
value-unit: A stretch of lesson time the teacher can use otherwise
happening: yes
kind: other
motivation: m-students-adopters
:::
```

### Thank for bringing the app

Students thank the adult who showed them an app that helped.

```pdt42
:::ignore H108 Students thank adults directly in class; no platform channel on purpose :::
:::transaction
id: t-thank-adult
title: Thank for bringing the app
relationship: r-adults-students
from: e-students
to: e-adopters
direction: one-way
value-unit: A thank-you to the adult
happening: no
kind: reputation
motivation: m-students-adopters-gratitude
:::
```

## Transactions Board: Creators and students

```pdt42
:::canvas
id: cv-board-creators-students
canvas: transactions-board
of: r-creators-students
:::
```

### Learn with an app

Students use the app to understand the subject.

```pdt42
:::ignore H108 Learning with an app happens in the app; no platform channel on purpose :::
:::transaction
id: t-learn-with-app
title: Learn with an app
relationship: r-creators-students
from: e-creators
to: e-students
direction: one-way
value-unit: A learning session on one topic
happening: yes
kind: goods
motivation: m-creators-students
:::
```

### Return to an app

Students come back to an app on their own, for instance before the next test.

```pdt42
:::transaction
id: t-return-to-app
title: Return to an app
relationship: r-creators-students
from: e-students
to: e-creators
direction: one-way
value-unit: A return visit before a test
happening: yes
channel: ch-app-overview
kind: attention
motivation: m-students-creators
job: j-students-find
:::
```

### Thank the creator

Students thank the creator for an app that helped them.

```pdt42
:::transaction
id: t-thank-creator-student
title: Thank the creator
relationship: r-creators-students
from: e-students
to: e-creators
direction: one-way
value-unit: A thank-you to the creator
happening: no
channel: ch-feedback
kind: reputation
motivation: m-students-creators-gratitude
:::
```

## Channels

The channels the platform would need, described by what they make easier, not by how they are built; the means are decided later (D8). Several transactions share one channel. None of them needs accounts for students.

### Effortless listing

Creators describe their app in a few fields and the platform turns it into a listing. The first contribution has to cost almost nothing, because reach is only a nice-to-have for creators (D4).

```pdt42
:::channel
id: ch-listing
title: Effortless listing
medium: digital
components:
  - A few fields: what the app teaches, for whom, where to find it
  - Automatic check and publication
  - Help from the creator's AI assistant
improvement: Contributing an app takes minutes, without an own website or post
:::
```

### One place to find apps

Adults and students find apps in one place instead of by word of mouth. Referral links let people recommend the platform; who follows one takes an explicit first step ("I'll have a look"), which is counted openly per referral wave, never per person.

```pdt42
:::channel
id: ch-app-overview
title: One place to find apps
medium: digital
components:
  - Listings in one comparable format
  - Finding by topic and grade
  - Tailored to the visitor without accounts
  - Entry through referral links, with an explicit first step to have a look
improvement: Finding an app no longer depends on word of mouth or luck
:::
```

### Visible fitness for use

Every listing answers the question adults ask before using an app.

```pdt42
:::channel
id: ch-fitness-signal
title: Visible fitness for use
medium: digital
components:
  - Whether the app sends anything to third parties, checked rather than declared
  - Whether installation or sign-up is needed
improvement: Adults no longer judge fitness for use alone or wait for a gatekeeper
:::
```

### Passing apps on to a class

Adults bring one app or several to their class in one step.

```pdt42
:::channel
id: ch-collections
title: Passing apps on to a class
medium: digital
components:
  - Several apps bundled for one class
  - Works on the devices a class already uses
  - No accounts for students
improvement: Several apps reach a class in one step
:::
```

### Returning use and praise to creators

Makes use, feedback, recommendations and thanks visible to the creator, so the reputation flow keeps them (D4). Thanks is the currency of the free platform: every user should understand that a thank-you is how they keep it alive, without the platform being pushy about it.

There is no hidden data collection. Single interactions are counted openly, to learn whether valuable use happens: only explicit clicks, only totals, no cookies or browser storage, no personal data kept, and explained right where the click happens. Thanks and feedback are anonymous and structured (no free text), and they never identify a student. The apps themselves collect nothing. Creators can include the same thanks in their app; where it cannot be reached, it quietly steps aside.

```pdt42
:::channel
id: ch-feedback
title: Returning use and praise to creators
medium: digital
components:
  - Thanks and structured feedback with one click, after use
  - Optionally inside the app, if its creator includes it
  - Counted openly: only explicit clicks and totals, no accounts or free text
  - Steps aside quietly when it cannot be reached
improvement: Use and praise reach the creator instead of staying invisible, and every user knows that thanking keeps the free platform alive
:::
```
