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
- **Decision**: The H002 hints stay open on purpose. The assets are supporting; the advantage has to come from the platform itself.

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

---

## Notes

- Exploration is optional in the PDT, but we do it to find the platformization space before designing.
- `pdt42 next` points to D1, because the E2 entities already count as started D1 work. Exploration is now done; Strategy Design continues with D1.
- Preview: `pdt42 serve` only works locally; in a cloud session build with `pdt42 build --out <dir> --single-file`.

---

## Exploration

### Tasks
*None — Exploration is done*

### Completed
- [x] E1 Identify the ecosystem and its arenas
- [x] E2 Scan the ecosystem
- [x] E3 Identify leverageable assets and moats (3 hints open on purpose, see KD-04)
- [x] E4 Choose the arena to focus on
- [x] E5 Map the value chain
- [x] E6 Apply the six Platform Plays
- [x] E7 Identify the platformization space and consolidate the brief

## Strategy Design

### Tasks
- [ ] D1 Map the ecosystem: roles, platform block and Ecosystem Canvas done; open: 7 peer roles, cluster down to five (H102)
- [ ] D2 Portray the entity-roles
- [ ] D3 Analyse the motivations to exchange value
- [ ] D4 Choose the core relationships
- [ ] D5 Identify the elementary transactions and channels
- [ ] D6 Design the learning engine
- [ ] D7 Assemble the platform experiences
- [ ] D8 Set up the Minimum Viable Platform

### Completed
*None yet*

## Growth

### Tasks
- [ ] G1 Frame the Platform Strategy Model
- [ ] G2 Characterise the network
- [ ] G3 Sketch the flywheels
- [ ] G4 Plan liquidity
- [ ] G5 Build the growth engine

### Completed
*None yet*
