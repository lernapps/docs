# Development Plan: docs (feat/cross-strand-languages branch)

*Workflow: epcc, kept in lernapps/apps (one plan for all four repos)*

## Goal
Step 14 of lernapps/apps#226: apps for foreign languages may practise across strands. The plan, the decisions KD-01 to
KD-08 and the data are in lernapps/apps `.vibe/development-plan-feat-cross-strand-languages.md`.

## This branch
- [x] arc42 ch.9: new decision `dec-explainer-focus`; `dec-one-app-one-strand` applies to subjects with strand focus
- [x] arc42 ch.12: `term-strand` no longer says an app covers one strand; new terms explainer focus (Fokus), strand app
      (Strang-App), unit app (Einheiten-App)
- [x] arc42 ch.5: `if-learning-map`, `if-archetypes`, `if-guidance` mention the explainer focus and the subject
- [x] architecture evidence: one row for lernapps/apps#226
- [x] pdt42: checked, no statement that an app covers one strand; no change
- [x] `npm run build` (biz42, pdt42, arc42 --strict) and `npm run check` pass

## Pull request
After the pull requests in apps, app-templates and tooling (KD-08); squash the branch before.
