# Chapter 7: Measures

There is no hidden data collection (KD-18): only explicit clicks or e-mails are counted, so most rates cannot be measured. The measures are small absolute numbers, taken from the platform design's MVP (D8), and conversations with creators are the main source.

## Apps listed

Counted from the entries in lernapps/apps that come from invited creators (pdt42 D8 `a-creators-list`).

```biz42
:::measure
id: measure-apps-listed
title: Creators who list an app after a personal invitation
target: At least 5 creators list an app within 2 weeks
:::
```

## Thanks received

Counted from the thank-you e-mails per app, later from the open totals (pdt42 D8 `a-thanks-arrive-unexplained`). The test can only say whether thanks arrive at all, not how often per use.

```biz42
:::measure
id: measure-thanks
title: Listed apps that receive at least one thank-you
target: Thanks arrive for at least 3 listed apps within 4 weeks
:::
```

## Use in class through referral

Counted from use reports that carry the code of a referral wave; the code is one per wave, never per person (pdt42 D8 `a-platform-convinces`, `a-teachers-reached`).

```biz42
:::measure
id: measure-teacher-use
title: Teachers from a referral wave who report using an app in class
target: At least 3 teachers from the forwarded wave in the first draft; at least 10 teachers in the real MVP
:::
```

## Fitness checked

Counted from the entries whose fitness for use was checked by the agent-based check: clicking through the app with the network recorded, and reviewing its source code (lernapps/tooling#1).

```biz42
:::measure
id: measure-fitness-checked
title: Share of listed apps whose fitness for use was checked by an agent
target: 100% of listed apps before the real MVP
:::
```

## Guidance used

Taken from the talks with creators: what they name as reason enough to contribute without payment (pdt42 D8 `a-creators-unpaid`).

```biz42
:::measure
id: measure-guidance-use
title: Creators who built or improved an app with the guidance
target: Most creators in the first draft name the guidance or the thanks as reason enough to contribute
:::
```
