# Development Plan: docs (claude/adoring-euler-u4hg03 branch)

*Workflow: epcc, kept by hand (the workflows MCP server was not reachable in this session)*

## Goal
Feedback: the landing page of lernapps.net does not pick up its visitors, above all at the start. The landing page now
addresses teachers, parents and students by role, each with the motivators that bring them. This branch brings the
platform design in line with those motivators. The website follows in lernapps/lernapps.github.io on the same branch.

## Key Decisions
- Motivators are reasons a role comes for. They must not imply that teachers or parents want to avoid effort
  (user, 2026-11-01). Teachers: no "free time for preparation"; instead the app accompanies the class so teachers can
  attend to the students who need particular attention.
- Building has two sides (user): digitising one's own material where it gains most (self-checking, interactivity, AI
  tutor), and teaching something one knows well to many children. Both build for others. An app made to measure for
  one's own test is individual, not building (user): exam preparation is for parents and students.
- Building needs no programming: having worked with a coding agent once is enough (user).

## Explore
- [x] Read vision, E2, D3, D7, D8 and the landing page
- [x] Mockups (artifacts): three variants, then variant 2 with role pages

## Plan
- [x] E2: goals of teachers and creators, capabilities of creators, gains of students
- [x] E5, D3, D4, D5: teachers attend to students who need them instead of gaining free time
- [x] D7: students also prepare for their own test

## Code
- [x] Edits; `pdt42 validate` passes

## Commit
- [ ] Squash the branch, open the pull request
