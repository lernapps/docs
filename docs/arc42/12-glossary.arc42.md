# Glossary

The terms of the learning map. The platform uses German words for people and English words in contracts (`dec-english-contracts`).

## Subject (Fach)

Subject files are the unit of the learning map (`if-learning-map`).

```arc42
:::glossary-term
id: term-subject
title: Subject (Fach)
definition: A school subject, such as Mathematics or Physics, for which the catalog has a subject model.
:::
```

## Strand (Strang)

The word "competency" is not used for strands or areas, although the KMK standards do; the platform has terms of its own.

```arc42
:::glossary-term
id: term-strand
title: Strand (Strang)
definition: A part of a subject that runs over several school years and builds on itself; a page practises competencies of one strand.
:::
```

## Explainer focus (Fokus)

Set in the subject file as `explainerFocus` (`dec-explainer-focus`).

```arc42
:::glossary-term
id: term-explainer-focus
title: Explainer focus (Fokus)
definition: What an app of a subject concentrates on, the strand (default) or the competency; with competency focus an app may practise competencies of several strands of the subject.
:::
```

## Strand app (Strang-App)

The usual app: its strand is in `strand: <subject>/<strand>`, in any subject.

```arc42
:::glossary-term
id: term-strand-app
title: Strand app (Strang-App)
definition: An app that names one strand and practises competencies of that strand only.
:::
```

## Unit app (Einheiten-App)

A unit such as "Essen" in French needs words, grammar and texts.

```arc42
:::glossary-term
id: term-unit-app
title: Unit app (Einheiten-App)
definition: An app that names a subject instead of a strand and practises competencies of several strands of it; allowed only in a subject with competency focus.
:::
```

## Competency (Baustein)

Contracts use the English word; people see "Baustein". The "requires" relation ("baut auf") is a network, not a sequence.

```arc42
:::glossary-term
id: term-competency
title: Competency (Baustein)
definition: One thing a child can learn, written as "Ich kann …"; it belongs to exactly one strand and may require other competencies.
:::
```

## Grade band (Richtstufe)

Every competency has one.

```arc42
:::glossary-term
id: term-grade-band
title: Grade band (Richtstufe)
definition: The two school years in which a competency is roughly taught (5/6, 7/8 or 9/10); it applies wherever no curriculum places the competency.
:::
```

## Review state (Status)

A subject's model is a draft until teachers of the subject look it through; the map says so on every page of the subject.

```arc42
:::glossary-term
id: term-review-state
title: Review state (Status)
definition: How far teachers of a subject reviewed its strands, competencies and requires: draft (an idea to show the principle, not reviewed), checked (one teacher), reviewed (several).
:::
```

## Curriculum (Lehrplan)

Not "Bundesland": two school types of one Land have two curricula. A curriculum may be incomplete.

```arc42
:::glossary-term
id: term-curriculum
title: Curriculum (Lehrplan)
definition: The syllabus of one Land and one school type, for example Hessen, Gymnasium; it places competencies in grades.
:::
```

## Placement (Einordnung)

A competency may be placed more than once, or not at all.

```arc42
:::glossary-term
id: term-placement
title: Placement (Einordnung)
definition: The grade or grades in which a curriculum places a competency.
:::
```
