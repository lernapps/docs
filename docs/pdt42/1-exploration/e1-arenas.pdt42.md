# Identify the ecosystem and its arenas

```pdt42
:::canvas
id: cv-arena-scan
canvas: arena-scan
:::
```

*The arenas form a pure sequence, following one app from need to evolution. No enabling arenas are mapped. The enabling plays lernapps.net wants to perform come later, in the value chain (E5) and the Platform Plays (E6).*

## Small, active-learning educational apps

The ecosystem consists of apps that are not only pedagogically valuable but have an explicit educational focus and promote active engagement by students. Many platforms are rather passive (e.g. Serlo) or focus on learning paths (e.g. Khan Academy). This ecosystem centres on small apps, each focused on teaching one aspect or a few closely related ones.

Value is created bottom-up today, but it does not compound. A teacher or parent notices a gap they want to close with an app — whether it is a real gap or existing solutions just don't fit does not matter. This engaged person builds an app with AI tools. It usually looks very individual: every tool follows its own principles, frameworks and so on. Then the app is used exactly once and rots afterwards.

The ecosystem already exists, but it has so far been shaped mostly top-down: ministries set up funding programmes, commission agencies or companies, receive the results and distribute them to schools — where they get stuck, because implementing large solutions in schools is hard. **We deliberately leave ministries, funding programmes and commissioned agencies out as actors of this design**: involving them would slow everything down. The top-down chain is the reason the ecosystem under-performs, not a route we act on.

We want creators to recognise existing solutions and gaps, build similar apps quickly and efficiently using guidelines for their agents, make them easily available to third parties who can use them without doubt about their fitness for use, and suggest extensions or contribute easily.

```pdt42
:::ecosystem
id: eco-edu-apps
title: Small, active-learning educational apps
context: ecosystem-mobilization
:::
```

## Spotting a need

A teacher or parent notices a gap they want to close with an app. Gaps are usually whole apps, not feature requests for an existing one. Today, whether a gap is real or existing solutions just don't fit remains unclear; we want existing solutions and gaps to be recognisable.

```pdt42
:::arena
id: ar-spotting
title: Spotting a need
outcome: Existing solutions and gaps are recognisable
focus: no
:::
```

## Building the app

Today every app is built individually, following its own principles and frameworks. With guidelines for their agents, creators should be able to build similar apps quickly and efficiently.

```pdt42
:::arena
id: ar-building
title: Building the app
outcome: Similar apps are built quickly and efficiently using agent guidelines
after: ar-spotting
focus: no
:::
```

## Getting apps into use

The core we tackle first. Making an app available and using it are considered one arena: the outcome — an app reaching a classroom it was not built for — only exists jointly, and the entities involved overlap almost completely. Third parties are mostly other adults who come across the offering, browse it and show the apps to their students; students who know an app may return and look for content themselves. Fitness for use mainly means privacy, but also the lowest possible barriers to use: no installation, no sign-up.

```pdt42
:::arena
id: ar-into-use
title: Getting apps into use
outcome: An app is used without doubt about its fitness for use, beyond the person who built it
after: ar-building
focus: yes
steps:
  - Make the app available
  - Adults come across the offering and browse it
  - Judge fitness for use (privacy, no installation, no sign-up)
  - Show the app to students
  - Students return and look for content themselves
:::
```

## Evolving the app

Instead of rotting after a single use, apps are developed further: both users and other creators suggest extensions or contribute. The sequence is deliberately linear — evolving an app does not feed back into spotting a need, because gaps are usually whole apps rather than feature requests.

```pdt42
:::arena
id: ar-evolving
title: Evolving the app
outcome: Users and creators suggest extensions or contribute, so the app does not rot
after: ar-into-use
focus: no
:::
```
