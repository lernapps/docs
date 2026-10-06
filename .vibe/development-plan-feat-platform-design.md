# Development Plan: lernapps.net platform design (feat/platform-design branch)

*Started on 2026-09-29, following the [Platform Design Toolkit 2.2](https://docs.boundaryless.io/methodology/legacy/pdt) with the pdt42 CLI (`npx @pdt42/cli`)*

## Goal

Design lernapps.net as a platform with the Platform Design Toolkit: find where the platform opportunity lies (Exploration), design the platform for its ecosystem (Strategy Design), then plan launch and growth (Growth). The model lives in `docs/pdt42/` and is written in English; `pdt42 guide` and `pdt42 validate` are the source of truth for the status.

---

## Key Decisions

### KD-01: Ecosystem is small, active-learning educational apps (E1)
Apps with an explicit educational focus that make students active, each teaching one aspect. Value is created bottom-up today but does not compound: an app is built individually, used once, and rots.
- **Decision**: Ministries, funding programmes and commissioned agencies are deliberately left out as actors. The top-down chain is why the ecosystem under-performs, not a route we act on.

### KD-02: Four arenas in a pure sequence, focus on "Getting apps into use" (E1, E4)
Spotting a need → Building the app → Getting apps into use → Evolving the app. No feedback loop from evolving to spotting, as gaps are usually whole apps.
- **Decision**: "Getting apps into use" is the focus arena. Making an app available and using it are one arena, because the outcome only exists jointly.

### KD-03: The ecosystem scan reflects the platform owner's own observations (E2)
Eight entities, five jobs in the focus arena. Not yet validated with other ecosystem representatives; that students search via social media and AI assistants is an assumption.

### KD-04: No asset is inimitable (E3)
Modelling DSLs as agent guidance (vr, rare because we do not intend to earn money), frontend-only architecture (v), non-profit at near-zero marginal cost (vr).
- **Decision**: The H002 hints are accepted on purpose (`:::ignore H002` in E3). The assets are supporting; the advantage has to come from the platform itself.

### KD-05: The only moat is data protection law and terms of use (E3)
Regulated, in the focus arena, without a holder. Teacher platforms are not a moat (alternative routes exist), and school gatekeepers can be bypassed by an entrepreneurial teacher.
- **Decision**: Do not fight the moat; ease the interaction with it, e.g. through the frontend-only architecture.

### KD-06: Three user needs on the Wardley Map (E5)
Students understand the subject for good grades; parents want the same with little time; teachers gain free time by keeping students busy.
- **Decision**: Evolution today: app custom, bringing to students product, discoverability custom, signal of fitness for use genesis; hosting, AI assistants, devices and connectivity commodity.

### KD-07: Attention for contributed apps is the scarce resource (E6)
All six plays apply to "Getting apps into use"; PP2 (bring creators on top) is the most important, the others serve it. Targets: app custom → product, discoverability custom → product, signal of fitness for use genesis → product.
- **Decision**: Personalise on the website only, via local storage and collections carried in a link or QR code. An optional website backend (never for the apps, never with student accounts) is left for later, as an assumption to test in D8.

### KD-08: Brief "Attention for small learning apps" closes Exploration (E7)
Scenarios from the Pattern Cards E3 (niches meet), E8 (apps that work in class rise) and E12 (teacher platforms become channels). E7, E4 and E9 were left out: no visible signal, or acting mainly in "Building the app".
- **Decision**: Platformization space is "Getting apps into use", with the core relationship app creators ↔ adopting adults; students are ancillary. Standardise listing, passing on by link or QR code, and the signal of fitness for use.

### KD-09: Oliver Jägle alone owns the platform (2026-09-30)
Ralf D. Müller focuses on the apps themselves (Mathe-Karte) and does not take part in the platform.
- **Decision**: The platform owner is Oliver Jägle alone (biz42 `owner-platform`, formerly `owner-vorstand`). Ralf appears as an app creator, not as an owner. In D1, the owner entity-role holds only Oliver.
- **Open**: GOVERNANCE.md in lernapps/.github still describes two owners with equal rights on all common repositories.

### KD-10: Six peer roles, GitHub as means of production (D1)
Roles: creators peer-producer; adopting adults and students peer-consumer; school gatekeepers stakeholder; teacher platforms, social media and AI assistants partner; platform owner (Oliver Jägle) owner.
- **Decision**: GitHub has no platform role: lernapps.net is not large enough for a relationship with GitHub, so it is a means of production in the platform's infrastructure. AI assistants are a partner the platform has to design for. Social media stays a partner despite little expected potential. The six peer roles are kept on purpose; H101 (GitHub) and H102 are accepted with `:::ignore` in E2, the entities' home chapter.

### KD-11: Portraits of the six peer roles (D2)
Creators and adopting adults form the core; AI assistants seek to reach a working app with fewer iterations and to build apps that can easily be used. Instructions and scaffolding are the platform's offer to them, not a gain they seek (D3, D5).
- **Decision**: Portraits rest on E1/E2, the vision and the owner's statements. Unvalidated items are named as assumptions in each entity's prose; social media is kept minimal on purpose.

### KD-12: Recognition and feedback are the missing flows (D3)
Between the core roles, tangible values flow today (apps, access, attention); feedback, reputation and gratitude are all potential. Gratitude can flow in all directions, to a different degree in each. Money flows only to commercial teacher platforms.
- **Decision**: Exchanges with teacher platforms are limited to non-profits: for commercial ones, free apps are unwelcome competition (also in the D2 portrait and scenario E12). AI assistants receive nothing from the peers; what they need comes from the platform.

### KD-13: Core triangle, adopting adults first (D4)
Core relationships: creators ↔ adults, adults ↔ students, creators ↔ students.
- **Decision**: The core entity is the adopting adults: without them, no app reaches a classroom and no attention reaches a creator. Creators build personal software without the platform anyway; use by others is a nice-to-have for them. The triangle widens the brief, where students were ancillary, because students also look for apps themselves and gratitude flows between all three.

### KD-14: Supply does not come by itself (D4)
Creators build personal software anyway; use by others is a nice-to-have for them. Their motivation to contribute is weak, while the benefit lies with the adults. Once their apps are used, though, praise and use motivate most engaged creators strongly: the hurdle is the first contribution, and the reputation flow (D3) keeps them.
- **Decision**: Recorded as insight in D4 and as biz42 risk `risk-weak-supply` (high). biz42 `exp-contributor` reworded accordingly and now surfaces the risk. Follow-ups: D6 (a benefit for creators independent of reach, e.g. guidance; make use and praise visible to creators), G4 (where the first supply comes from), D8 (a riskiest `attraction` assumption; needs the MVP block first).

### KD-15: Generic channels, means decided in the MVP (D5)
13 transactions across the three core relationships; five channels: effortless listing, one place to find apps, visible fitness for use, passing apps on to a class, returning use and praise to creators.
- **Decision**: Channels are described by what they make easier, not by how they are built; concrete means (templates, workflows, storage, codes) are decided in D8. Learning with and working on an app happen in the app, thanks to adults in class: no platform channel on purpose.

### KD-16: Guidance is the common thread of the learning engine (D6)
Adults and students can evolve into creators; creators can grow into co-owners by bringing their best practices into the guidance. The guidance for building apps attracts creators, turns users into creators and creators into co-owners.
- **Decision**: Services stay generic like the channels. A service shared by several roles sits at one stage for all of them, so services are split per role where the roles meet them at different stages.
- **Open**: How a creator becomes co-owner (rights, procedure) belongs in GOVERNANCE.md in lernapps/.github, which still describes two owners with equal rights.

### KD-17: Acute moments, and thanks as the currency (D7)
Adults look for apps in an acute moment: teachers right before a lesson, parents the evening before a test. They feel relief, not excitement. Three experiences: "An app in class within minutes" (teachers), "Practice tonight, before the test" (parents), "List an app and hear it is used" (creators).
- **Decision**: Trust is built in rather than checked (only apps that meet the fitness criteria are listed); one app counts more than a collection; anything asked afterwards takes one click.
- **Decision**: The platform is free and lives on thanks. Every user should understand that a thank-you keeps it alive, without the platform being pushy. This is the platform's narrative (D1) and a step of its own in every experience.

### KD-18: No hidden data collection; open counting on the platform only (D5, D7, D8)
- **Decision**: Tracking means collecting data without the user's knowledge, and there is none. On the platform, single interactions are counted openly, to learn whether valuable use happens: only explicit actions ("I'll have a look", "used in class", thanks, structured feedback), only totals, no cookies or browser storage, no personal data kept, explained right where the click happens. The apps collect nothing and stay fully frontend-only.
- **Decision**: Thanks and feedback are anonymous and structured (no free text, no mailto), never identifying a student; counts motivate creators and are no ranking signal (they cannot be deduplicated). Creators may include the thanks component in their app; it steps aside quietly when unreachable.
- **Decision**: Referral links carry one code per wave or channel, never per person (small totals would reveal individual behaviour); the code travels only in the address while on the platform and is not stored in the browser (§ 25 TDDDG).
- **For D8 (means)**: a small API on a subdomain (e.g. `api.lernapps.net`, same site, CORS) instead of the same origin, which would put a proxy in front of every app load; a host without access logs, ideally in the EU; a short notice at each counted button and in the privacy notice; legal review by someone with data protection expertise. The user-facing wording is still to be polished.

### KD-19: Two stages before the platform is tested with teachers (D8, draft)
- **Decision**: A first draft ("First draft: first apps") starts now with the 5 to 10 creators the owner knows; it tests the supply side, the anonymous thanks, and whether the platform convinces teachers the owner does not know (referral links forwarded by contacts). The real MVP ("First apps, first thanks") follows with about 10 teachers reached through forwarding and tests thanks and built-in trust.
- **Decision**: No rates (no tracking) and no accompanied test group (observed users behave differently): small absolute criteria and creator conversations. Comparing ways of asking for thanks is left for when there are enough users.
- **Decision**: The school-network test succeeds if the thanks works at most of the schools of the creators who teach. Whether parents find the platform is tested only after the riskiest assumptions hold (H115 accepted).
- **Open**: the owner's weekly hours as the criterion for running the platform alone.

---

## Notes

- Exploration is optional in the PDT, but we do it to find the platformization space before designing.
- pdt42 is pinned in `scripts/build.sh` (`@pdt42/cli@0.6.2`); run the same version locally (`npx @pdt42/cli@0.6.2 …`).
- Every block type has exactly one home chapter, the chapter of the step that creates it (EG03, an error); later steps fill its blocks in there, and an element discovered later is still written there. Entities live in E2: D1 adds their roles, D2 their portraits (pdt42 0.6.2; under 0.6.1 they had to sit in D1, see mrsimpson/pdt42#38).
- Accepted deviations: `:::ignore <code> <reason> :::` inside a `pdt42` fence suppresses the next finding with that code at or after the directive, one finding per directive. It sits directly before the block it accepts (H002 before each of the three assets in E3, H101 before GitHub in E2, H108 before each of the three transactions without a channel in D5); the H102 directive follows the E2 paragraph explaining the six peer roles, as H102 is reported at the sixth one. A directive that suppresses nothing is a warning (WG06), and errors cannot be ignored (WG07).
- Review: in a pull request, `scripts/build.sh` with `PDT42_DIFF_BASE` renders the change since the merge base (`pdt42 build --single-file --diff <base>...HEAD`) into `platform-design-diff/`; the Pages workflow uploads it and comments a summary on the PR. Locally: `pdt42 diff` checks that blocks and their prose change together.
- Preview: `pdt42 serve` only works locally; in a cloud session build with `pdt42 build --out <dir> --single-file`.

---

## Exploration

### Tasks
*None — Exploration is done*

### Completed
- [x] E1 Identify the ecosystem and its arenas
- [x] E2 Scan the ecosystem
- [x] E3 Identify leverageable assets and moats (H002 ignored on purpose, see KD-04)
- [x] E4 Choose the arena to focus on
- [x] E5 Map the value chain
- [x] E6 Apply the six Platform Plays
- [x] E7 Identify the platformization space and consolidate the brief

## Strategy Design

### Tasks
- [ ] D8 Set up the Minimum Viable Platform

### Completed
- [x] D1 Map the ecosystem (H101 for GitHub and H102 ignored on purpose, see KD-10)
- [x] D2 Portray the entity-roles (many portrait items are unvalidated assumptions, named in the prose)
- [x] D3 Analyse the motivations to exchange value
- [x] D4 Choose the core relationships
- [x] D5 Identify the elementary transactions and channels (H108 ignored for three transactions without a platform channel)
- [x] D6 Design the learning engine
- [x] D7 Assemble the platform experiences

## Next actions (outside the model)

- [ ] Build the first draft in its simplest form: listing, overview, anonymous thanks (means per KD-18)
- [ ] Invite the 5 to 10 creators and help with their first listing
- [ ] Make the platform explain itself, so it convinces teachers without the owner (it is the pitch)
- [ ] Referral links per wave, and a short letter the owner's contacts can forward to subject-matching colleagues
- [ ] Reach about 10 teachers through forwarding for the real MVP

## Growth

### Tasks
- [ ] G1 Frame the Platform Strategy Model
- [ ] G2 Characterise the network
- [ ] G3 Sketch the flywheels
- [ ] G4 Plan liquidity
- [ ] G5 Build the growth engine

### Completed
*None yet*
