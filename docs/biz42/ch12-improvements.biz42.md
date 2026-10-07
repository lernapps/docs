# Chapter 12: Improvements

## First draft: first apps

Listing, overview, referral links and the thank-you, built for real in their simplest form, with the creators the owner knows ([pdt42 D8 `mvp-first-draft`](../platform-design/#2-design/d8-mvp.pdt42.md:el-mvp-first-draft)).

```biz42
:::ignore H006 impr-first-draft is the start of the platform, not the result of an evaluation — accepted
:::

:::improvement
id: impr-first-draft
title: Run the first draft with the owner's creators and one referral wave
type: innovative
addresses: obj-first-apps, obj-thanks, obj-teacher-use, prod-apps
:::
```

## Count clicks instead of e-mails

Once the first draft shows that thanks arrive, replace the prepared e-mail with one click, counted openly as a total, without cookies or browser storage, and show the totals on each app page.

```biz42
:::improvement
id: impr-counting
title: Count thanks and feedback with one click instead of e-mail
type: proactive
triggered-by: eval-first-draft
addresses: cap-thanks, obj-thanks
:::
```

## Check fitness automatically

Until the check runs, every listing says that its fitness is declared, not checked. The check makes the fitness signal trustworthy (lernapps/tooling#1).

```biz42
:::improvement
id: impr-fitness-check
title: Check every listed app with an agent: click through, record the network, review the source
type: proactive
triggered-by: eval-first-draft
addresses: cap-fitness-check, obj-trust
:::
```

## Guidance for building

Guidance is the benefit for creators that does not depend on reach. The talks with creators show what they need from it.

```biz42
:::improvement
id: impr-guidance
title: Publish guidance and a template for creators' AI assistants
type: innovative
triggered-by: eval-creator-talks
addresses: cap-guidance, prod-guidance, obj-agent-guidance
:::
```

## First apps, first thanks

The real MVP, once the first draft holds: about 10 teachers reached through referral waves, all three experiences ([pdt42 D8 `mvp-first-thanks`](../platform-design/#2-design/d8-mvp.pdt42.md:el-mvp-first-thanks)).

```biz42
:::improvement
id: impr-real-mvp
title: Start the real MVP with about 10 teachers reached by referral
type: innovative
triggered-by: eval-first-draft
addresses: obj-teacher-use, obj-thanks
:::
```
