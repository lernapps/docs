# Map the ecosystem

```pdt42
:::canvas
id: cv-ecosystem
canvas: ecosystem
:::
```

*The entity-roles come from the ecosystem scan (E2), where each one got its platform role; this chapter adds the platform and its owner. The platform starts from the brief "Attention for small learning apps" (E7).*

## Platform owner

Oliver Jägle owns and shapes the platform strategy. Ralf D. Müller, the second owner of the GitHub organisation, builds apps and appears among the app creators.

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

The platform for the ecosystem of small, active-learning educational apps. The owner runs its infrastructure on GitHub: the website with the app overview, the agent guidance and starter templates, and the issue templates and GitHub Actions workflows contributions go through. Narrative, core entity and value propositions follow in the later steps.

```pdt42
:::platform
id: platform-lernapps
title: lernapps.net
ecosystem: eco-edu-apps
brief: br-attention
owners: e-platform-owner
infrastructure:
  - Website with the app overview
  - Agent guidance and starter templates
  - Issue templates and GitHub Actions workflows
:::
```
