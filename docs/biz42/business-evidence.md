# Business Evidence

The model was rewritten on 2026-10-07 from the [platform design](../pdt42/) (pdt42), which the owner worked out step by step; the earlier model described the edugo approach (capability map, registry) and was replaced as a whole. Facts are cited with the platform design chapter they come from.

| Source | Derived fact | Used in (chapter/id) | Confidence | OPEN? |
| ------ | ------------ | -------------------- | ---------- | ----- |
| pdt42 D1 `platform-lernapps` (narrative), docs/vision.md | Free to use, kept alive by thanks; adults find an app they can use right away; creators list in minutes and hear when it helped | ch01 scope-lernapps | high | |
| user answer (2026-10-06), pdt42 E3 `as-non-profit` | Non-profit, no money is earned; possibly a registered association (Verein) later | ch01 scope-lernapps, ch08 owner-platform | high | Confirmed 2026-10-06 |
| pdt42 E3, KD-18 | Excluded: hidden data collection, advertising, paid offers; the app stays its creator's | ch01 scope-lernapps | high | |
| pdt42 E2 scan, docs/vision.md | AI assistants reduce building a learning app to a weekend | ch02 sig-ai-dev, ch05 opp-ai-creation | high | |
| pdt42 E2/E4 (job "Adults confirm an app may be used") | Checking whether a tool may be used takes too long; unchecked tools are used | ch02 sig-unsafe-tools | high | |
| earlier model (user answer) | Digitalpakt funded hardware, not software | ch02 sig-digitalpakt | high | |
| user answer + tum.de link (earlier model) | PISA 2026: German students at a historic low | ch02 sig-pisa, ch05 opp-pisa-window | high | |
| pdt42 D8 `a-school-filters` | School networks often filter unknown services | ch02 sig-school-filters, ch04 risk-no-thanks | medium | Test in the first draft |
| pdt42 D1, D2, D7 `x-app-in-minutes`, `x-practice-tonight` | Adults in an acute moment need one fitting app now, usable without doubt; relief, not excitement | ch03 exp-adopter | high | |
| user answer (pdt42 D4, 2026-09-30) | Creators build personal software anyway; use by others is a nice-to-have; once used, praise motivates them strongly | ch03 exp-contributor, ch04 risk-weak-supply | high | Confirmed 2026-09-30 |
| pdt42 D2, D6 | Learners try things out themselves, without account; usually through an adult | ch03 exp-learner | high | |
| pdt42 D8 `a-thanks-arrive-unexplained`, KD-17 | Thanks is the currency; it must arrive without being explained | ch04 risk-no-thanks, ch06 obj-thanks, ch07 measure-thanks | high | |
| pdt42 D8 `a-teachers-reached`, `a-platform-convinces` | Teachers are reached through referral waves; the platform itself is the pitch | ch04 risk-reach, ch06 obj-teacher-use, ch07 measure-teacher-use | high | |
| lernapps/docs#11 (Ralf D. Müller in lernapps/docs#3) | No server is necessary, not sufficient for data protection; what an app loads must be checked | ch04 risk-dsgvo, ch06 obj-trust, ch09 cap-fitness-check | high | |
| pdt42 D5 `ch-fitness-signal` | Fitness for use visible on every listing | ch05 opp-fitness-signal, ch04 risk-unsafe-adoption | high | |
| pdt42 D6 | Guidance for creators' AI assistants as a benefit independent of reach | ch05 opp-ai-creation, ch06 obj-agent-guidance | high | |
| pdt42 D8 `a-creators-list` | At least 5 creators list an app within 2 weeks | ch07 measure-apps-listed | high | |
| pdt42 D8 `a-thanks-arrive-unexplained` | Thanks arrive for at least 3 listed apps within 4 weeks | ch07 measure-thanks | high | |
| pdt42 D8 `a-platform-convinces`, `a-teachers-reached` | At least 3 teachers from the forwarded wave; about 10 in the real MVP | ch07 measure-teacher-use | high | |
| user answer (2026-10-07) | Before the real MVP, every listed app is checked by an agent: click through with the network recorded, and review the source code | ch06 obj-trust, ch07 measure-fitness-checked, ch09 cap-fitness-check, ch12 impr-fitness-check | high | Confirmed 2026-10-07 |
| pdt42 D8 `a-creators-unpaid` | Most creators name the guidance or the thanks as reason enough | ch07 measure-guidance-use | high | |
| user answer (2026-10-07) | The first draft starts at the end of October 2026; listing by mid-November, thanks and first referral wave by the end of November follow from its time frames (pdt42 D8) | ch06 obj-first-apps, obj-thanks, obj-teacher-use | high | Confirmed 2026-10-07 |
| user answer (2026-10-06) | Oliver Jägle alone is accountable for the platform; Ralf D. Müller focuses on the Mathe-Karte | ch08 owner-platform | high | Confirmed 2026-10-06 |
| lernapps/.github GOVERNANCE.md | Still describes two owners with equal rights | ch08 | high | OPEN: GOVERNANCE.md not yet updated |
| lernapps/apps (2026-10-07) | Listing from a few fields, checked against a schema; thanks and feedback by prepared e-mail | ch09 cap-listing, cap-thanks, ch10 prod-apps | high | |
| user answer (2026-10-07) | Thanks by e-mail for the MVP, to test whether it works; counted with one click later | ch09 cap-thanks, ch12 impr-counting | high | Confirmed 2026-10-07 |
| pdt42 D8 (users not observed; conversations as main source) | Evaluation by what arrives and by talks with creators | ch11 | high | |
| H006 | impr-first-draft has no triggering evaluation: it is the start | ch12 impr-first-draft | – | accepted |
| H005 | risk-reach follows from the MVP, not from an external signal | ch04 risk-reach | – | accepted |
