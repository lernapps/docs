# Apply the six Platform Plays

```pdt42
:::canvas
id: cv-platform-plays
canvas: platform-plays
:::
```

*The plays are applied to the value chain of "Getting apps into use" (E5). The to-be evolution of each moved component is recorded as its target on the Wardley Map.*

The scarce resource in this arena is attention for contributed apps. Building an app has become cheap; getting anyone beyond its creator to notice it has not. This makes bringing producers on top of the value chain (PP2) the most important play. The other plays serve it: they standardise how an app is offered, make its fitness for use visible, bundle the scattered offering, and tailor what each visitor sees.

## PP1 · Personalise without accounts

The platform website tailors what it shows to each visitor without the apps knowing anything about it. Two means keep it frontend-only and free of operating costs: the browser remembers the visitor's role (student, parent, teacher), grades, subjects and favourites in local storage, and teachers assemble collections of apps for their class that are carried entirely in a link or QR code. An optional backend for the website only, never for the apps and never with student accounts, stays an option for later: it could sync favourites and collections across devices and collect "used in class" feedback, at the price of operating costs and data protection duties.

```pdt42
:::play
id: pl-personalise
play: pp1
arena: ar-into-use
affects: c-discoverability, c-bring-to-students
insight: Personalise on the website only, via local storage and collections carried in a link or QR code; an optional website backend without student accounts is left for later
:::
```

## PP2 · Bring creators on top

Today creators are hidden: their apps reach only their own circle and then rot. Attention for contributed apps is the scarce resource, so the platform has to put creators and their apps in front of the adults and students looking for them.

```pdt42
:::play
id: pl-creators-up
play: pp2
arena: ar-into-use
affects: c-app, c-discoverability
insight: Attention for contributed apps is the scarce resource; the platform exists to direct it to creators and their apps
:::
```

## PP3 · Standardise making an app available

Every creator publishes differently today: own website, GitHub, social media. A uniform listing (what the app does, for whom, with a link and a QR code) makes apps comparable and easy to pass on.

```pdt42
:::play
id: pl-standard-listing
play: pp3
arena: ar-into-use
affects: c-discoverability, c-bring-to-students
insight: Standardise the listing of an app, so apps become comparable and can be passed on by link or QR code
:::
```

## PP4 · Embed building in agent guidance

Guidelines for AI assistants turn building an app into a guided process, so apps follow shared principles instead of each its own. The play acts mainly in the arena "Building the app", but it changes what reaches this arena: apps become alike enough to be compared and trusted.

```pdt42
:::play
id: pl-guided-building
play: pp4
arena: ar-into-use
affects: c-app
insight: Agent guidance makes apps follow shared principles; it acts in "Building the app", but turns the app into a comparable product here
:::
```

## PP5 · Make fitness for use visible

Today each teacher judges alone whether an app may be used, or asks a gatekeeper. A visible signal, such as a frontend-only badge and feedback from classroom use, answers the question up front. It eases the interaction with the moat of data protection law instead of fighting it.

```pdt42
:::play
id: pl-fitness-trust
play: pp5
arena: ar-into-use
affects: c-fitness-signal
insight: A visible signal of fitness for use, such as a frontend-only badge and classroom feedback, eases the interaction with data protection law
:::
```

## PP6 · Aggregate the scattered offering

Apps are spread over websites, GitHub and social media, and the people looking for them search in just as many places. One overview bundles the supply of apps and the demand of adults and students.

```pdt42
:::play
id: pl-aggregate
play: pp6
arena: ar-into-use
affects: c-discoverability
insight: Bundle scattered apps and the people looking for them in one overview
:::
```
