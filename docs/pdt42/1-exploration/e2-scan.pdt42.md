# Scan the ecosystem

```pdt42
:::canvas
id: cv-ecosystem-scan
canvas: ecosystem-scan
:::
```

This scan covers the focus arena "Getting apps into use" as it works today, without lernapps.net. Jobs are phrased by their outcome; how they are done today is described in the prose. The picture is based on the owners' own observations and has not yet been validated with other ecosystem representatives.

## Entities

### App creators

Engaged people who build small educational apps, typically with AI tools, for a gap they noticed themselves.

```pdt42
:::entity
id: e-creators
title: App creators
layer: long-tail
clusters:
  - Teachers
  - Parents
  - Engineers
:::
```

### Adopting adults

Adults who come across apps built by others, browse them and show them to their students. Engineers belong here too, as they also look for existing apps to re-use.

```pdt42
:::entity
id: e-adopters
title: Adopting adults
layer: long-tail
clusters:
  - Teachers
  - Parents
  - Engineers
:::
```

### Students

The learners the apps are built for. They usually get to know an app through an adult, and may later return to it on their own.

```pdt42
:::entity
id: e-students
title: Students
layer: long-tail
:::
```

### School gatekeepers

People at school whom careful teachers ask before using an app. They act as local trusted advisors. There is typically no data protection officer at school level; the computer science teacher may take that role.

```pdt42
:::entity
id: e-gatekeepers
title: School gatekeepers
layer: aggregator
clusters:
  - School director
  - Computer science teacher
:::
```

### Teacher platforms

Platforms where teachers find digital teaching offerings, some commercial, some non-profit. Some came out of government initiatives.

```pdt42
:::entity
id: e-teacher-platforms
title: Teacher platforms (commercial or non-profit)
layer: aggregator
clusters:
  - fobizz
  - Serlo
:::
```

### Social media

Where creators share their apps and where apps travel by recommendation.

```pdt42
:::entity
id: e-social-media
title: Social media
layer: aggregator
:::
```

### GitHub

Where many creators publish their apps' code. Engineers search it for apps to re-use, but there is usually little content, and hardly anything that specific.

```pdt42
:::entity
id: e-github
title: GitHub
layer: infrastructure
:::
```

### AI assistants

The tools creators build their apps with. For engineers they also replace discovery: instead of searching further, they have an assistant build their own app.

```pdt42
:::entity
id: e-ai-assistants
title: AI assistants
layer: infrastructure
clusters:
  - Claude
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
