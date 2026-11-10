# Development Plan: docs (feat/preview-cleanup branch)

*Generated on 2026-11-10 by Vibe Feature MCP*
*Workflow: [minor](https://codemcp.github.io/workflows/workflows/minor)*

## Goal

Vorschauen geschlossener PRs täglich von gh-pages entfernen (lernapps/tooling#275): Aufruf des wiederverwendbaren
Workflows `preview-cleanup.yml` von lernapps/tooling (ab v0.8.3).

## Key Decisions

- Eigene Datei `.github/workflows/preview-cleanup.yml`: täglich um 27 4 UTC und von Hand (mit Probelauf).
  Andere Minute als die anderen Site-Repos, damit nicht alle gleichzeitig laufen.
- Alle Pins von lernapps/tooling auf denselben Commit gehoben (282b469, main nach #277 und #239), weil der Test
  des Pre-Push-Hooks gleiche Commits verlangt und der alte Commit den Workflow noch nicht hat.
- Owner hat das Anlegen verlangt (Sitzung zu lernapps/tooling#275).

## Notes

Die Vorschau-Action schreibt mit diesem Commit schon mit bis zu 10 Versuchen und löscht ganze Ordner.

## Explore
### Tasks
- [x] Pins und Test des Pre-Push-Hooks geprüft

### Completed
- [x] Created development plan file

## Implement
### Tasks
- [x] Aufruf-Datei angelegt, Pins gehoben

### Completed
- [x] Umsetzung

## Finalize
### Tasks
- [x] Branch als ein Commit, PR

### Completed
- [x] Fertig

---
*This plan is maintained by the LLM. Tool responses provide guidance on which section to focus on and what tasks to work on.*
