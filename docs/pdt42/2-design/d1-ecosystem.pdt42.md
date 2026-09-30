# Map the ecosystem

```pdt42
:::canvas
id: cv-ecosystem
canvas: ecosystem
:::
```

*The entity-roles come from the ecosystem scan (E2), where each one got its platform role; this chapter adds the platform and its owner. The platform starts from the brief "Attention for small learning apps" (E7).*

Six entity-roles stand in the peer spectrum, one more than PDT recommends. They are kept on purpose: app creators, adopting adults and students form the core, teacher platforms are a channel (E12), AI assistants are what the platform has to design for, and social media is kept although little potential is expected from it. GitHub has no platform role: it is a means of production, part of the infrastructure below.

## Platform owner

Oliver Jägle owns and shapes the platform strategy. Creators who bring their own best practices into the guidance can grow into co-owners (D6). Ralf D. Müller, the second owner of the GitHub organisation, builds apps and appears among the app creators.

```pdt42
:::entity
id: e-platform-owner
title: Platform owner
role: owner
clusters:
  - Oliver Jägle
:::
```

## lernapps.net

The platform for the ecosystem of small, active-learning educational apps. The owner runs its infrastructure on GitHub, the platform's means of production: the website with the app overview, the agent guidance and starter templates, and the issue templates and GitHub Actions workflows contributions go through. Its core entity, chosen in D4, is the adopting adults. Narrative and value propositions follow in the later steps.

```pdt42
:::platform
id: platform-lernapps
title: lernapps.net
ecosystem: eco-edu-apps
brief: br-attention
owners: e-platform-owner
core-entity: e-adopters
infrastructure:
  - Website with the app overview
  - Agent guidance and starter templates
  - GitHub as the means of production: issue templates, GitHub Actions workflows, apps with their labels
:::
```
