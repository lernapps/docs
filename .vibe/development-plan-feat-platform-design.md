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

### KD-03: The ecosystem scan reflects the owners' own observations (E2)
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

---

## Notes

- Exploration is optional in the PDT, but we do it to find the platformization space before designing.
- `pdt42 next` points to D1, because the E2 entities already count as started D1 work. We finish Exploration (E6, E7) first.
- Preview: `pdt42 serve` only works locally; in a cloud session build with `pdt42 build --out <dir> --single-file`.

---

## Exploration

### Tasks
- [ ] E6 Apply the six Platform Plays (`:::play`, `component.target`)
- [ ] E7 Identify the platformization space and consolidate the brief (`:::scenario`, `:::brief`)

### Completed
- [x] E1 Identify the ecosystem and its arenas
- [x] E2 Scan the ecosystem
- [x] E3 Identify leverageable assets and moats (3 hints open on purpose, see KD-04)
- [x] E4 Choose the arena to focus on
- [x] E5 Map the value chain

## Strategy Design

### Tasks
- [ ] D1 Map the ecosystem: give the eight entities a role, add the `:::platform` block and the Ecosystem Canvas (9 findings open)
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
