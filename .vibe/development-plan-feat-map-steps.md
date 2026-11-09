# Development Plan: docs (feat/map-steps branch)

*Generated on 2026-11-09 by Vibe Feature MCP*
*Workflow: [minor](https://codemcp.github.io/workflows/workflows/minor)*

## Goal
Die Architektur nennt die Stufen-Ansicht der Lernlandkarte (lernapps/apps#227, Branch `feat/map-steps` in
lernapps/apps): Begriff „Stufe (step)“ im Glossar, ein Satz in `if-learning-map`.

## Key Decisions
- Owner (2026-11-09, in der Session von lernapps/apps#227): Die Stufe ist abgeleitet aus `requires`, nicht gespeichert
  und nicht im JSON; nur der Begriff kommt ins Glossar. Plan und Entscheidungen: lernapps/apps,
  `.vibe/development-plan-feat-map-steps.md` (KD-04, KD-05).
- Autonom bis zum Push, kein Pull Request ohne Wunsch des Owners.
- pdt42 bleibt unverändert: `s-gap-finding` nennt schon „what comes before“.

## Notes
- Modelle beschreiben den Zielzustand (AGENTS.md): keine Historie, keine Zahlen.

## Explore
### Entrance Criteria
- Feature in lernapps/apps geplant.

### Tasks

### Completed
- [x] Created development plan file
- [x] Glossar und `if-learning-map` gelesen

## Implement
### Entrance Criteria
- Wortlaut der Änderung ist klar.

### Tasks

### Completed
- [x] Glossar: `term-step`
- [x] `if-learning-map`: Seite nach Stufen

## Finalize
### Entrance Criteria
- Änderung geschrieben.

### Tasks
- [ ] Commit und Push des Branches `feat/map-steps`

### Completed
*None yet*

---
*This plan is maintained by the LLM. Tool responses provide guidance on which section to focus on and what tasks to work on.*
