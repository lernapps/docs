# Scan the ecosystem

```pdt42
:::canvas
id: cv-ecosystem-scan
canvas: ecosystem-scan
:::
```

This scan covers the focus arena "Getting apps into use" as it works today, without lernapps.net. Jobs are phrased by their outcome; how they are done today is described in the prose. The picture is based on the platform owner's own observations and has not yet been validated with other ecosystem representatives.

## Entities

### App creators

Engaged people who build small educational apps, typically with AI tools, for a gap they noticed themselves. Ralf D. Müller, co-owner of the GitHub organisation lernapps, is one of them: he builds the Mathe-Karte and does not take part in the platform.

Portrait (D2): the lack of feedback, the wish for recognition and knowing the app helped are assumptions of the platform owner, still to be validated with creators. Creators build their apps as personal software anyway; reaching other classrooms is a nice-to-have for them, not what drives them to start. Once their apps are used, though, most engaged creators are strongly motivated by praise and use (D4).

```pdt42
:::entity
id: e-creators
title: App creators
role: peer-producer
layer: long-tail
clusters:
  - Teachers
  - Parents
  - Engineers
context:
  - Build apps with AI assistants, alongside their actual job
  - Publish on their own website, GitHub or social media
assets:
  - Their apps
  - Classroom experience (teachers) or development skills (engineers)
capabilities:
  - Build a working app in a weekend with AI assistance
potential:
  - Build on existing apps instead of starting from scratch
  - Evolve apps with feedback from use
goals:
  - Close a gap they noticed themselves, for their own class or child
pressures:
  - Little time
  - The app rots after a single use
  - No feedback whether the app works elsewhere
convenience-gains:
  - Build and publish with less effort
reach-gains:
  - The app reaches classrooms beyond their own circle
value-gains:
  - Recognition for their work
  - Knowing the app helped others learn
:::
```

```pdt42
:::canvas
id: cv-portrait-creators
canvas: entity-portrait
of: e-creators
:::
```

### Adopting adults

Adults who come across apps built by others, browse them and show them to their students. Engineers belong here too, as they also look for existing apps to re-use.

Portrait (D2): recommending apps to colleagues and the next test as a pressure are assumptions of the platform owner, still to be validated with teachers and parents.

```pdt42
:::entity
id: e-adopters
title: Adopting adults
role: peer-consumer
layer: long-tail
clusters:
  - Teachers
  - Parents
  - Engineers
context:
  - Short of time
  - Devices exist at school and at home
  - Find apps by word of mouth, on teacher platforms or on GitHub
assets:
  - Access to students
  - Devices
potential:
  - Give feedback from classroom use
  - Recommend apps to colleagues
goals:
  - Teachers: gain free time by keeping students busy, for individual support or preparation
  - Parents: support their children's learning with little time
pressures:
  - Lack of time
  - Responsibility for data protection
  - The next test
convenience-gains:
  - An app usable next week, without installation or sign-up
reach-gains:
  - Active-learning apps beyond the large, passive platforms
value-gains:
  - Certainty that an app may be used
  - Students actively doing something
:::
```

```pdt42
:::canvas
id: cv-portrait-adopters
canvas: entity-portrait
of: e-adopters
:::
```

### Students

The learners the apps are built for. They usually get to know an app through an adult, and may later return to it on their own.

Portrait (D2): recommending apps to classmates and all three gains are assumptions of the platform owner, still to be validated.

```pdt42
:::entity
id: e-students
title: Students
role: peer-consumer
layer: long-tail
context:
  - Get to know apps through an adult
  - Use them on school tablets or at home
potential:
  - Return to apps on their own
  - Recommend apps to classmates
  - Build apps themselves
goals:
  - Understand the subject to get good grades
pressures:
  - The next test
convenience-gains:
  - Quick help right before the test
reach-gains:
  - An app for exactly the topic they struggle with
value-gains:
  - Better grades
  - Understanding the subject
:::
```

```pdt42
:::canvas
id: cv-portrait-students
canvas: entity-portrait
of: e-students
:::
```

### School gatekeepers

People at school whom careful teachers ask before using an app. They act as local trusted advisors. There is typically no data protection officer at school level; the computer science teacher may take that role.

```pdt42
:::entity
id: e-gatekeepers
title: School gatekeepers
role: stakeholder
layer: aggregator
clusters:
  - School director
  - Computer science teacher
:::
```

### Teacher platforms

Platforms where teachers find digital teaching offerings, some commercial, some non-profit. Some came out of government initiatives.

Portrait (D2): apart from their reach among teachers, the portrait consists of assumptions of the platform owner, still to be validated. Commercial and non-profit platforms differ here: for commercial ones, free apps are rather unwelcome competition, so the convenience gain mainly applies to non-profit platforms.

```pdt42
:::entity
id: e-teacher-platforms
title: Teacher platforms (commercial or non-profit)
role: partner
layer: aggregator
clusters:
  - fobizz
  - Serlo
context:
  - Collect digital teaching offerings
  - Some commercial, some non-profit, some came out of government initiatives
assets:
  - Reach among teachers
goals:
  - An attractive, trustworthy offering for teachers
pressures:
  - Keeping the offering current and broad
convenience-gains:
  - More offerings without producing them themselves
reach-gains:
  - More teachers
value-gains:
  - Revenue (commercial) or mission impact (non-profit)
:::
```

```pdt42
:::canvas
id: cv-portrait-teacher-platforms
canvas: entity-portrait
of: e-teacher-platforms
:::
```

### Social media

Where creators share their apps and where apps travel by recommendation. It stays a partner, although the platform owner expects little potential from it.

Portrait (D2): kept minimal on purpose, as little potential is expected; goal and gain are assumptions.

```pdt42
:::entity
id: e-social-media
title: Social media
role: partner
layer: aggregator
context:
  - Where creators share their apps and apps travel by recommendation
potential:
  - Spread apps by recommendation
goals:
  - Engagement
reach-gains:
  - Content that gets shared
:::
```

```pdt42
:::canvas
id: cv-portrait-social-media
canvas: entity-portrait
of: e-social-media
:::
```

### GitHub

Where many creators publish their apps' code. Engineers search it for apps to re-use, but there is usually little content, and hardly anything that specific.

For lernapps.net, GitHub is a means of production rather than a partner: the platform is neither large nor prominent enough to have a relationship with GitHub. It still deliberately builds its own infrastructure on it, such as issue templates, GitHub Actions workflows, and the apps themselves with their labels. So GitHub has no platform role and appears in the platform's infrastructure instead (D1).

```pdt42
:::ignore H101 GitHub is a means of production, not a platform role (KD-10) :::
:::ignore H102 Six peer roles are kept on purpose, see D1 (KD-10) :::
```

```pdt42
:::entity
id: e-github
title: GitHub
layer: infrastructure
:::
```

### AI assistants

The tools creators build their apps with. For engineers they also replace discovery: instead of searching further, they have an assistant build their own app. They are a partner the platform has to design for: whatever lernapps.net offers creators has to work through their AI assistants.

Portrait (D2): lernapps.net plans to serve their convenience gain with better instructions and scaffolding (D3, D5). Their potential, goal and pressure are assumptions of the platform owner.

```pdt42
:::entity
id: e-ai-assistants
title: AI assistants
role: partner
layer: infrastructure
clusters:
  - Claude
context:
  - Tools creators build apps with
  - Replace discovery for engineers
  - Becoming part of every household's basic equipment
potential:
  - Build apps that follow shared guidelines, if they get them as context
goals:
  - Deliver useful results to their users
pressures:
  - Competition between providers
convenience-gains:
  - Reach a working app with fewer iterations and less guessing
value-gains:
  - Build apps that can easily be used
:::
```

```pdt42
:::canvas
id: cv-portrait-ai-assistants
canvas: entity-portrait
of: e-ai-assistants
:::
```

## Jobs in "Getting apps into use"

### Creators make their app available to others

Today creators put their apps on their own website, on GitHub or on social media, and talk about them with friends, maybe also with a teacher or a school. All of it stays local.

```pdt42
:::job
id: j-make-available
title: Creators make their app available to others
arena: ar-into-use
entities: e-creators, e-adopters, e-social-media, e-github
:::
```

### Adults find an existing app for re-use

Today adults find apps by word of mouth, on teacher platforms such as fobizz or Serlo, or — engineers in particular — on GitHub. For engineers the search usually fails: they have an AI assistant build their own app instead, which leads into "Building the app" and produces yet another one-off app.

```pdt42
:::job
id: j-find-reuse
title: Adults find an existing app for re-use
arena: ar-into-use
entities: e-adopters, e-creators, e-teacher-platforms, e-social-media, e-github
job-step: locate
:::
```

### Adults confirm an app may be used

Whether an app gets checked at all depends on each teacher's personal risk affinity. Careful teachers ask the school director or the computer science teacher; everyone else decides alone (recorded in the portrait in D1).

```pdt42
:::job
id: j-confirm-use
title: Adults confirm an app may be used
arena: ar-into-use
entities: e-adopters, e-gatekeepers
job-step: confirm
:::
```

### Adults bring the app to students

Adults use every available channel: link, QR code, projector, school tablets.

```pdt42
:::job
id: j-bring-to-students
title: Adults bring the app to students
arena: ar-into-use
entities: e-adopters, e-students
job-step: execute
:::
```

### Students find an app to prepare for the next test

Students look for apps with a different motivation than adults: to survive the next test. They usually know an app because an adult showed it to them. That they also search via social media and AI assistants is an assumption, not an observation — to be validated.

```pdt42
:::job
id: j-students-find
title: Students find an app to prepare for the next test
arena: ar-into-use
entities: e-students, e-adopters, e-creators, e-social-media, e-ai-assistants
job-step: locate
:::
```
