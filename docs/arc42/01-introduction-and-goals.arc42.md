# Introduction and Goals

This is the architecture of lernapps.net as a whole technical system. Its scope comes from the economic platform
model in [pdt42](../pdt42/): the platform's infrastructure as [its platform strategy](https://lernapps.net/docs/platform-design/#2-design/d1-ecosystem.pdt42.md:el-platform-lernapps) names it. The platform model
says why and for whom; this architecture says how the system is built. It refers to pdt42 ids instead of repeating
them.

Every repository of the organisation lernapps is one building block of this system and stays a black box here. A
building block with an architecture of its own (tooling, app-templates) is refined only there. The learning apps'
own repositories are outside the system: towards them, the system meets their GitHub Actions.

## 1.1 Requirements Overview

The platform's job is to get small, active-learning apps into use (focus arena, [KD-02](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-02-four-arenas-in-a-pure-sequence-focus-on-getting-apps-into-use-e1-e4)). The system has to serve
three [experiences](https://lernapps.net/docs/platform-design/#2-design/d7-experiences.pdt42.md): [a teacher who takes over a class at short notice brings an app into class within minutes](https://lernapps.net/docs/platform-design/#2-design/d7-experiences.pdt42.md:el-x-app-in-minutes), [a parent whose child struggles finds an
app the child can start and come back to](https://lernapps.net/docs/platform-design/#2-design/d7-experiences.pdt42.md:el-x-child-struggles), and [a creator lists an app and hears that
it is used](https://lernapps.net/docs/platform-design/#2-design/d7-experiences.pdt42.md:el-x-list-and-hear-back).

From the platform model follow these requirements on the system:

| Requirement | What the system has to do | Source in the platform model |
|---|---|---|
| Ready for class at once | An adult passes an app to a class by link or QR code; it starts without installation or sign-up, under an address that keeps working. | [KD-08](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-08-brief-attention-for-small-learning-apps-closes-exploration-e7), [KD-17](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-17-acute-moments-and-thanks-as-the-currency-d7), [KD-21](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-21-lernappsnet-serves-a-copy-of-every-listed-app-lernappsapps58-2026-10-20), [Bring an app to students](https://lernapps.net/docs/platform-design/#2-design/d5-transactions.pdt42.md:el-t-bring-app), [Starting an app right away](https://lernapps.net/docs/platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-start-right-away) |
| Find it, or build it | Anyone looking for an app sees quickly whether one exists for the topic and grade; if none does, the way to build one is right there. | [Aggregate the scattered offering](https://lernapps.net/docs/platform-design/#1-exploration/e6-plays.pdt42.md:el-pl-aggregate), [KD-16](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-16-guidance-is-the-common-thread-of-the-learning-engine-d6), [Finding apps by topic and grade](https://lernapps.net/docs/platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-finding), [Finding apps before a test](https://lernapps.net/docs/platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-student-finding), [From using to adapting apps](https://lernapps.net/docs/platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-adapt-apps) |
| Keep the rules without effort | A creator meets the rules every listed app has to meet (no data collected, fit for class, only its own data) without expert knowledge, because guidance, templates and checks bring them along. | [Embed building in agent guidance](https://lernapps.net/docs/platform-design/#1-exploration/e6-plays.pdt42.md:el-pl-guided-building), [Make fitness for use visible](https://lernapps.net/docs/platform-design/#1-exploration/e6-plays.pdt42.md:el-pl-fitness-trust), [KD-16](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-16-guidance-is-the-common-thread-of-the-learning-engine-d6), [KD-21](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-21-lernappsnet-serves-a-copy-of-every-listed-app-lernappsapps58-2026-10-20), [Guidance for building apps](https://lernapps.net/docs/platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-building-guidance) |
| Exchange appreciation | Thanks and feedback flow with one click from adults and students to the creators and show them that their app helped. Thanks is the currency that keeps creators contributing. | [KD-12](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-12-recognition-and-feedback-are-the-missing-flows-d3), [KD-14](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-14-supply-does-not-come-by-itself-d4), [KD-17](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-17-acute-moments-and-thanks-as-the-currency-d7), [KD-18](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-18-no-hidden-data-collection-open-counting-on-the-platform-only-d5-d7-d8), [Giving feedback and thanks](https://lernapps.net/docs/platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-giving-back), [Insight into use and feedback](https://lernapps.net/docs/platform-design/#2-design/d6-learning-engine.pdt42.md:el-s-use-insight) |
| Made for AI assistants | Creators build and list apps through their AI assistant; assistants find their way through the platform's guidance and pages. | [KD-10](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-10-six-peer-roles-github-as-means-of-production-d1), [KD-11](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-11-portraits-of-the-six-peer-roles-d2), [AI assistants](https://lernapps.net/docs/platform-design/#1-exploration/e2-scan.pdt42.md:el-e-ai-assistants) |
| Provide at almost no cost | A creator provides an app without paying for hosting, domain or operation: the platform serves a copy of every listed app under lernapps.net. | [Non-profit at near-zero marginal cost](https://lernapps.net/docs/platform-design/#1-exploration/e3-assets-moats.pdt42.md:el-as-non-profit), [KD-04](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-04-no-asset-is-inimitable-e3), [KD-21](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-21-lernappsnet-serves-a-copy-of-every-listed-app-lernappsapps58-2026-10-20) |

## 1.2 Quality Goals

The five quality goals that drive the architecture, in order of priority. They describe the running system, not
the apps in the catalog: the rules the apps have to meet are constraints (chapter 2), and keeping them easy is the
quality goal "learnable for creators".

1. **Fast loading** (`qg-fast-loading`): the app catalog, and the quiz and explainer apps it serves, load in under
   a second.
2. **Accessible** (`qg-accessible`): every page of the platform and every served app can be used by everyone,
   on the devices of a class.
3. **Nothing collected** (`qg-nothing-collected`): the apps collect nothing, and the platform counts only openly and
   only totals.
4. **Reliable** (`qg-reliable`): links and QR codes passed to a class keep working, and thanks reach the creators,
   also from school networks.
5. **Learnable for creators** (`qg-learnable-for-creators`): a creator with an AI assistant gets to a listable app
   by following the guidance.

See [10-quality-requirements.arc42.md](10-quality-requirements.arc42.md) for the complete quality catalog with
priorities and measurable scenarios.

## 1.3 Stakeholders

The roles come from the platform model's [entities](https://lernapps.net/docs/platform-design/#1-exploration/e2-scan.pdt42.md) ([KD-10](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-10-six-peer-roles-github-as-means-of-production-d1)); the last rows are roles of the system itself.

| Role | Expectations |
|---|---|
| [Platform owner](https://lernapps.net/docs/platform-design/#1-exploration/e2-scan.pdt42.md:el-e-platform-owner): Oliver Jägle | A system one person can run at almost no cost, that can later pass to an association ([KD-09](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-09-oliver-jägle-alone-owns-the-platform-2026-09-30), [KD-20](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-20-idealistic-free-possibly-a-verein-later)); decisions recorded where they can be found. |
| [Adopting adults](https://lernapps.net/docs/platform-design/#1-exploration/e2-scan.pdt42.md:el-e-adopters): teachers and parents, the core entity | Find an app for a topic and grade in an acute moment, see that it may be used, start it at once ([KD-13](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-13-core-triangle-adopting-adults-first-d4), [KD-17](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-17-acute-moments-and-thanks-as-the-currency-d7)). |
| [Students](https://lernapps.net/docs/platform-design/#1-exploration/e2-scan.pdt42.md:el-e-students) | Start an app without sign-up; nothing about them is collected. |
| [App creators](https://lernapps.net/docs/platform-design/#1-exploration/e2-scan.pdt42.md:el-e-creators) | Build an app with good guidance, list it with almost no effort, hear when it helped ([KD-14](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-14-supply-does-not-come-by-itself-d4)). |
| [AI assistants](https://lernapps.net/docs/platform-design/#1-exploration/e2-scan.pdt42.md:el-e-ai-assistants) | Instructions and scaffolding that reach a working, listable app in few iterations ([KD-11](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-11-portraits-of-the-six-peer-roles-d2)). |
| [School gatekeepers](https://lernapps.net/docs/platform-design/#1-exploration/e2-scan.pdt42.md:el-e-gatekeepers) | One provider, one privacy notice, one address for every app ([KD-21](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-21-lernappsnet-serves-a-copy-of-every-listed-app-lernappsapps58-2026-10-20)). |
| Teacher platforms and social media (partners) | Links to apps that keep working; exchanges only with non-profit teacher platforms ([KD-12](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-12-recognition-and-feedback-are-the-missing-flows-d3)). |
| Future co-owners | Guidance and repositories open to contributions, a system that can be handed over ([KD-16](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-16-guidance-is-the-common-thread-of-the-learning-engine-d6), [KD-20](https://github.com/lernapps/docs/blob/main/.vibe/development-plan-feat-platform-design.md#kd-20-idealistic-free-possibly-a-verein-later)). |
| Engineers reading this architecture | The whole system on one page per view, each repo's own architecture one link away. |
