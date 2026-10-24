# Cross-cutting Concepts

The concepts that hold across several building blocks. Concepts that live inside one block, such as the evals that
measure the guidance, are in that block's own architecture.

## One domain, one site frame

Every page of the platform and every served app lives under lernapps.net (`dec-one-domain`). The website provides the
site frame that every platform site is built with: the shared header and footer, the styles, the counting snippet,
and `site-check`, which checks the built pages before a deploy. Because all sites and app copies share one origin in
the browser, an app may use only its own data there (storage, cookies); the catalog checks this before it lists an
app (`dec-serve-copies`, `dec-check-fitness`).

```arc42
:::concept
id: concept-one-origin
title: One domain, one site frame
category: structure
:::
```

## Privacy by construction

The apps collect nothing: no counters, no cookies, no requests to third parties (`con-apps-collect-nothing`). The
templates are built that way and the checks measure it. Only the platform's own pages count, openly, only totals,
through GoatCounter carried by the site frame, and explained where the click happens (`con-open-counting`,
`dec-counting-goatcounter`).

```arc42
:::concept
id: concept-privacy-by-construction
title: Privacy by construction
category: security
:::
```

## Checked rather than declared

Every rule an app or a site has to meet has an id and a check. The tooling's CLI checks an app while it is built,
the catalog checks an entry and its app before listing, and `site-check` checks a platform site before it is
deployed. What is shown about an app, such as its fitness for use, is measured, not taken from a declaration
(`dec-check-fitness`).

```arc42
:::concept
id: concept-checked-not-declared
title: Checked rather than declared
category: quality
:::
```

## Pinned and pulled forward

A repository uses another one by a pinned commit: packages from git, actions by commit, the archetypes by commit.
When a pinned block gets a new version, Renovate passes it on as a pull request, to listed apps as well;
merging is the only manual step (`dec-pinned-by-commit`).

```arc42
:::concept
id: concept-pinned-and-pulled
title: Pinned and pulled forward
category: operations
:::
```

## Check only what a change touches

Git hooks and CI run only what a change can affect: a change of only the plan or only documentation checks nothing,
other changes run the checks of the parts they touch. One classifier in the tooling decides this for every
repository, so the rule is the same everywhere.

```arc42
:::concept
id: concept-change-scope
title: Check only what a change touches
category: development
:::
```

## AI assistants as readers

AI assistants are a partner the platform designs for (`con-ai-assistants`). Every part of the platform has an
`llms.txt` that leads an assistant through it, and the files link each other; the tooling gives assistants their
guidance by phase and their skills. Learners' assistants are readers too: an explainer app gives a tutor the
learner brings the very tasks on screen, without the app sending anything.

```arc42
:::concept
id: concept-assistants-as-readers
title: AI assistants as readers
category: interoperability
:::
```

## Plain language and languages

What people read is in plain language (ISO 24495-1): German for the people the platform
serves, with the sites also in English. Contracts between parts of the system, such as schemas and manifests, are in
English (`dec-english-contracts`).

```arc42
:::concept
id: concept-plain-language
title: Plain language and languages
category: usability
:::
```

## The why in the history

Every commit says why it was made: a conventional subject and the intent, the key changes and, where they apply,
the dependencies and side effects, as the commit skill of every repository asks. The intents of the first increment
were reconstructed from the agent sessions that made the commits (lernapps/.github `history/`).

```arc42
:::concept
id: concept-why-in-history
title: The why in the history
category: development
:::
```
