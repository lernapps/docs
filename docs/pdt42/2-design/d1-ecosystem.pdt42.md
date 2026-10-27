# Map the ecosystem

*The platform design describes the product: who takes part, what they exchange, and the experiences. The organisation that runs it, with its objectives, risks and capabilities, is described in the [business model](../about/) (biz42).*

```pdt42
:::canvas
id: cv-ecosystem
canvas: ecosystem
:::
```

*The entity-roles live in their home chapter, the ecosystem scan (E2): this step gave each one its platform role there, and D2 added their portraits. The ecosystem canvas below draws them with the platform and its owner, which this chapter adds. The platform starts from the brief "Attention for small learning apps" (E7).*

## lernapps.net

The platform for the ecosystem of small, active-learning educational apps. The owner runs its infrastructure on GitHub, the platform's means of production: the website with the app overview, the agent guidance and starter templates, and the issue templates and GitHub Actions workflows contributions go through, and temporary apps made to measure. Its core entity, chosen in D4, is the adopting adults.

The platform also serves every listed app itself: when an app is listed, a copy of its built bundle is published under lernapps.net and the overview links to that copy (KD-21). The creator stays the author, keeps the licence, the repository and their own address, and decides on new versions; the platform takes over delivering the app to schools, under one privacy notice and one address that keeps working.

The platform is free to use, and it lives on thanks. Every adult, student and creator should understand that a thank-you is how they keep it alive: it is what keeps creators contributing, and it costs nothing. The guidance through the platform makes this clear without being pushy.

```pdt42
:::platform
id: platform-lernapps
title: lernapps.net
ecosystem: eco-edu-apps
brief: br-attention
owners: e-platform-owner
core-entity: e-adopters
narrative: Free to use, kept alive by thanks. Adults and students find an active-learning app they can use right away, confident that it may be used under data protection law; creators list theirs with almost no effort and hear when it helped. A thank-you, free and anonymous, is what keeps the platform alive: running it costs almost nothing, and thanks are what keep creators building.
infrastructure:
  - Website with the app overview
  - Agent guidance and starter templates
  - A copy of every listed app, served under lernapps.net
  - Temporary apps made to measure, served under lernapps.net
  - GitHub as the means of production: issue templates, GitHub Actions workflows, apps with their labels
:::
```
