# Chapter 4: Risks

## Creators have little reason to contribute

Creators build their apps as personal software for their own class or child, with or without lernapps.net. That others use their app is only a nice-to-have for them. So the supply of apps does not come by itself: if contributing costs effort, few creators will do it, and adults find too little to come back. Once an app is used, however, praise and use motivate most engaged creators strongly; the hurdle is the first contribution. Identified in the platform design (pdt42 D4, 2026-09-30).

```biz42
:::risk
id: risk-weak-supply
title: Creators have little reason to contribute their apps
severity: high
mitigation: make listing an app almost effortless, offer creators a benefit independent of reach such as better guidance when building, and make use and praise visible to creators once their app is used
:::
```

## Thanks do not arrive

The platform is free and lives on thanks. If adults do not say thanks, because the thank-you is not self-evident, takes more than a click, or does not get through school networks, creators hear nothing and nothing shows that lernapps.net is worth keeping. Likelihood is unknown until tested; impact is high, because the whole model rests on it (pdt42 D8 `a-thanks-arrive-unexplained`, `a-school-filters`).

```biz42
:::risk
id: risk-no-thanks
title: Thanks do not arrive, so creators hear nothing and the platform has no currency
severity: high
mitigation: make the thank-you a step of its own after use, explained right where the click happens; test it in the first draft without explaining it to anyone; until clicks are counted, a prepared e-mail
:::
```

## Teachers are not reached

The demand side has to be reached without advertising and without tracking: through people who pass the platform on. If too few teachers arrive, none of the demand-side assumptions can be tested (pdt42 D8 `a-teachers-reached`). Likelihood is medium; impact is high.

```biz42
:::ignore H005 risk-reach follows from the platform design's MVP, not from an external signal — accepted
:::

:::risk
id: risk-reach
title: Too few teachers are reached to test the demand side
severity: high
mitigation: referral links per wave that the owner's contacts pass on, with the platform itself as the pitch
:::
```

## Apps stay invisible

Apps built for one class or child are shared briefly, then vanish. Nobody else finds them, and their makers never learn whether they helped elsewhere. Likelihood is high; impact is high, because it is the problem lernapps.net exists to solve.

```biz42
:::risk
id: risk-invisibility
title: Small learning apps stay invisible beyond where they were made
severity: high
mitigation: one place to find apps by topic and grade, with deep links to single topics and a page per app that can be passed on
:::
```

## Data protection blocks or is bypassed

Apps that send data to third parties cannot be used in class, and teachers who need something now may use them anyway. Having no server is necessary for data protection, not sufficient: scripts, fonts, embedded content or calls to external APIs can still send data (lernapps/docs#11). Likelihood is medium; impact is high, for learners and for the platform's credibility.

```biz42
:::risk
id: risk-dsgvo
title: Data protection blocks good apps, or apps that leak data are used anyway
severity: high
mitigation: list only apps without account, installation and requests to third parties before a click; check this automatically instead of trusting what an entry declares (lernapps/tooling#1)
:::
```

## Unsafe or passive tools by default

Without a quick alternative, adults fall back on tools that want accounts, show ads or only let learners watch. Likelihood is high; impact is medium.

```biz42
:::risk
id: risk-unsafe-adoption
title: Adults fall back on unsafe or passive tools for lack of a quick alternative
severity: high
mitigation: a fitness signal on every listing, so an app can be used without checking it yourself; only apps where learners do something themselves
:::
```

## Reputation if a listed app proves harmful

If lernapps.net lists an app that later proves harmful to learners' data or learning, it is associated with the failure. Likelihood is low in the short term; impact is medium.

```biz42
:::risk
id: risk-endorsement
title: Reputational risk from listing an app that later proves harmful
severity: medium
mitigation: clear conditions for listing, checked automatically where possible; the listing says what was declared and what was checked; lernapps.net makes properties visible and does not certify apps
:::
```
