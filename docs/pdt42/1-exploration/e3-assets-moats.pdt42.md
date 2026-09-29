# Identify leverageable assets and moats

```pdt42
:::canvas
id: cv-vrio
canvas: vrio
:::
```

*The assets are tested in VRIO order: valuable, rare, inimitable, organised; the test stops at the first "no". The ratings are the owners' own assessment.*

None of the assets is inimitable, so none grounds a lasting advantage on its own: they are supporting assets. Together they make a free, low-doubt offering possible, but whatever advantage lernapps.net gains has to come from the platform itself, not from what the owners hold today.

## Assets

### Structured modelling DSLs as agent guidance

The owners build and use their own documentation DSLs (biz42, arc42, pdt42): structured models that both people and AI assistants can read, write and validate. The same approach can turn into the guidelines creators give their agents, so that similar apps get built quickly and efficiently instead of each one following its own principles.

Valuable, because agent guidance is what "Building the app" lacks today. Rare, because lernapps.net does not intend to earn money with it: commercial players keep such guidance to themselves, while we can give it away. Not inimitable: the DSLs are open source, and anyone can copy the approach.

```pdt42
:::asset
id: as-modelling-dsls
title: Structured modelling DSLs as agent guidance
vrio: vr
layer: infrastructure
relates-to: e-creators, e-ai-assistants
:::
```

### Frontend-only architecture

The platform and the apps it recommends run in the browser only: no server, no database, no installation, no sign-up. This removes the main doubts about fitness for use, as no personal data leaves the device, and it causes no operating costs.

Valuable, because it answers exactly the question adults ask before bringing an app to students. Not rare: many small AI-built apps are static anyway. The advantage only arises once the property is made visible.

```pdt42
:::asset
id: as-frontend-only
title: Frontend-only architecture
vrio: v
layer: infrastructure
relates-to: j-confirm-use, j-bring-to-students
:::
```

### Non-profit at near-zero marginal cost

lernapps.net is planned as a non-profit. This is sustainable because the frontend-only architecture causes no operating costs, and with good guidance the marginal cost of creating an app tends towards zero. So the whole offering can be free as well, without advertising or data collection.

Valuable, because it removes commercial doubts for adults and schools. Rare, because commercial teacher platforms cannot do this. Not inimitable: other non-profits such as Serlo show that the model can be copied.

```pdt42
:::asset
id: as-non-profit
title: Non-profit at near-zero marginal cost
vrio: vr
relates-to: e-adopters, e-creators
:::
```

## Moats

Only one position in the ecosystem cannot be bypassed. The candidates from the scan were checked for alternative routes to the same value flow:

- **Teacher platforms** (fobizz, Serlo) aggregate demand, but they are not the only route: adults also find apps by word of mouth, on social media or on GitHub.
- **School gatekeepers** can be bypassed: an entrepreneurial teacher decides alone, as described in the job "Adults confirm an app may be used".

### Data protection law and terms of use

The GDPR (DSGVO) and terms of use can completely prevent an app from being used in class; there is no alternative route around them. As the tips suggest, lernapps.net does not try to replace this position. Instead it makes the interaction with it easier, for example through the frontend-only architecture. No holder is recorded: the regulation has no actor in the model.

```pdt42
:::moat
id: mo-data-protection
title: Data protection law and terms of use
kind: regulated
arena: ar-into-use
:::
```
