# Development Plan: docs (claude/feedback-mode branch)

*Generated on 2026-11-22 by Vibe Feature MCP*
*Workflow: [epcc](https://codemcp.github.io/workflows/workflows/epcc)*

## Goal
Das Plattform-Design und die Architektur um den Feedback-Modus der Erklärer ergänzen (lernapps/app-templates#180):
Lehrkräfte und Eltern notieren Verbesserungen Block für Block in der App, nur auf ihrem Gerät, und geben sie
gesammelt als Text eines neuen Issues im Repository der App ab, mit ihrem eigenen GitHub-Konto.

## Key Decisions
- Workflow: epcc. Branch: `claude/feedback-mode`.
- `ch-feedback` gehört zum Reputationsfluss mit Dank als Währung (KD-17): ein Klick, anonym, gezählt. Der
  Feedback-Modus betrifft dagegen den Inhalt einer App, also wie sie besser wird (`le-creators`: „Improve the app
  with feedback from classes“). Deshalb eigener Kanal, `ch-feedback` bleibt unverändert (Owner, 2026-11-22).
- Neue Transaktion mit `happening: no` (Zielzustand; „happening: yes“ heißt: kommt heute ohne lernapps.net vor).
- Die Journeys der Erwachsenen bekommen den Schritt, als optionalen am Ende (Owner).
- Kein Service im Lernmotor: GitHub trägt die Notizen, es ist nur ein Kanal (Owner).
- pdt42 beschreibt nur Interaktion und Wert, arc42 nur Verantwortung und Interaktion, keine Funktionsweise (Owner).

## Notes
- Heute: `t-give-feedback` (e-adopters → e-creators, „Structured feedback from one class“, Kanal `ch-feedback`,
  Motivation `m-adopters-creators-feedback`, status potential). `ch-feedback` verlangt anonym, strukturiert, kein
  Freitext, offen gezählt; realisiert durch `if-thanks` (bb-catalog) als vorbereitete E-Mail.
- Der Feedback-Modus ist Freitext, über GitHub mit Konto, nicht anonym und nicht gezählt: passt nicht in die
  Komponenten von `ch-feedback`.
- `bb-app-templates` hat die Schnittstelle `if-archetypes` (realisiert `ch-guidance`).
- AGENTS.md: Modelle beschreiben den Zielzustand, keine Historie und keinen Umsetzungsstand.

## Explore
### Entrance Criteria
- Feature in app-templates umgesetzt (lernapps/app-templates#180).

### Tasks
### Completed
- [x] Einordnung mit dem Owner geklärt
- [x] Created development plan file
- [x] Betroffene Elemente gelesen (d5, d3, arc42 05)

## Plan
### Entrance Criteria
- Owner hat die Einordnung bestätigt.

### Änderungen

**pdt42 `d5-transactions`, Board „Creators and adults“, nach „Thank the creator“**
- Neue Transaktion `t-suggest-improvements` „Suggest improvements to the content“: e-adopters → e-creators,
  `r-creators-adults`, one-way, value-unit „Notes on an app's content, each at the place it concerns, handed over
  together“, `happening: no`, `channel: ch-content-notes`, `kind: feedback`, `motivation: m-adopters-creators-feedback`.
  Prosa: Wer das Fach kennt, Lehrkraft oder Elternteil, notiert in der App, was falsch oder unklar ist, an der Stelle,
  und gibt die Notizen der Autorin oder dem Autor; das kommt heute kaum vor.

**pdt42 `d5-transactions`, Kanäle, nach „Returning use and praise to creators“**
- Neuer Kanal `ch-content-notes` „Notes on the content, handed to the creator“, medium digital. Prosa: anders als der
  Dank (KD-17) geht es um den Inhalt; kein Service der Plattform dazwischen, GitHub trägt die Notizen. Components:
  Notizen in der App an Absatz, Abbildung oder Aufgabe; nur auf dem Gerät, die App sendet nichts; zusammen als ein
  Issue im Repository der App, mit dem eigenen GitHub-Konto; eine Notiz zeigt, wenn sich ihre Stelle geändert hat.
  improvement: Die Autorin oder der Autor erfährt genau, wo der Inhalt Arbeit braucht, von Leuten, die das Fach kennen.

**pdt42 `d7-experiences`**
- `x-app-in-minutes` und `x-child-struggles`: Schritt `t-suggest-improvements` am Ende; ein Satz in der Prosa, dass
  wer das Fach kennt, optional Verbesserungen vorschlägt.

**arc42 `05-building-blocks`, Abschnitt App templates**
- Neue Schnittstelle `if-feedback-mode` „Feedback mode of the explainer“, provider `bb-app-templates`, protocol
  „in the app's pages; notes in the browser's storage, handed over as the text of a GitHub issue“,
  `x-realises: ch-content-notes`, `x-missing-ch-content-notes`: nur der Erklärer hat ihn, Quiz und interaktive App nicht.

**Prüfung**: `npm ci`, dann `pdt42 validate`, `arc42 validate --strict` und `node scripts/overview.mjs` (über
`npm run build`).

### Tasks
- [x] Änderungen geplant
- [x] Owner bestätigt die Änderungen

### Completed
*None yet*

## Code
### Entrance Criteria
- Liste der Änderungen an pdt42 und arc42 steht.

### Tasks
- [x] d5: `t-suggest-improvements` und `ch-content-notes`
- [x] d7: Schritt in `x-app-in-minutes` und `x-child-struggles`
- [x] arc42 05: `if-feedback-mode` an `bb-app-templates`
- [x] pdt42 validate, arc42 validate --strict, npm run build: ohne Befund

### Completed
*None yet*

## Commit
### Entrance Criteria
- Modelle validieren ohne Fehler.

### Tasks
- [x] Branch zu einem Commit zusammengefasst, PR eröffnet

### Completed
*None yet*

---
*This plan is maintained by the LLM. Tool responses provide guidance on which section to focus on and what tasks to work on.*
