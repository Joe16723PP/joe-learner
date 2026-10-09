# Improvement checklist

Topic and content improvements for the curriculum. Site features are out of scope for now.

Rounds 1–4 come from the first content review and were addressed in `40efb8b`. Rounds 5–10 come from the second review.

Suggested order for what is open: fix accuracy first, then give the capstones their hard parts, then vary repeated scenarios, then fix numbering and the placement rubrics.

## 1. Teach what later lessons already assume

- [x] **Exceptions.** Added as 1.15.
- [x] **Imports, modules, and records.** Added as 1.16.
- [x] **Deployment and environments.** Added as 2.18, must-know.
- [x] **Queues, events, and at-least-once delivery.** Added as 3.9, must-know.
- [x] **Caching.** Added as 4.9, must-know, before 4.8 review.

## 2. Add missing topics

- [x] **AI-assisted development.** Covered across levels:
  - [x] New graduate: review a generated change (2.9) and keep secrets out of prompts (2.10).
  - [x] Junior: check generated code against the local pattern (3.3).
  - [x] Senior: review generated code for systemic risk (4.8).
  - [x] Technical leader: set a team policy (5.8).
- [x] **Refactoring and legacy code.** Added as 3.3b, change a pattern with the tests pinned.
- [x] **Career navigation.** Added an evidence lesson per level: 1.17, 2.19, 3.12, 4.19, 5.10.
- [x] **Privacy and personal data.** Added as 4.15. Accuracy fixes are in round 5.
- [x] **Technical debt at Senior.** Added as 4.16.
- [x] **Working with product and design.** Added as 4.1b.
- [x] **State the path's scope.** The README names it as backend-leaning, and 3.10 covers where to specialize next.
- [x] **Staff engineer and engineering manager split.** People management is named as out of scope in the README, 5.0, and 5.10.

## 3. Fix gating contradictions

- [x] **Security at Junior and Senior.** 4.7a is now must-know.
- [x] **Automated checks.** 2.11 is now must-know.
- [x] **Collaboration and estimation.** 3.8a is now must-know.
- [x] **Junior's project thread.** Junior now runs on one orders system.

## 4. Deepen existing content

- [x] **Thin should-know lessons.** Expanded:
  - [x] 3.6b A query at a realistic size
  - [x] 4.7b A capacity sketch
  - [x] 5.1b Constraints you already promised
  - [x] 5.2b A portfolio of engineering cost
  - [x] 5.6b Hiring for a missing signal
- [x] **Hands-on code after New graduate.** The capstones 3.11, 4.18, and 5.9 each include code in any language.
- [x] **End-of-level projects.** Added 3.11, 4.18, and 5.9.
- [x] **Time estimates.** Each level has a pace estimate.
- [x] **Starting in the middle.** Each level has a placement check (1.0–5.0). Rubric depth is in round 8.

## 5. Fix accuracy

- [ ] **3.9 queue order.** The concept says queues are first-in, first-out "unless the system says otherwise." Warn that many queues do not guarantee order.
- [ ] **3.9 "exactly-once delivery."** A dedupe key gives an exactly-once effect. Delivery is still at-least-once. Reword.
- [ ] **3.9 atomic key and effect.** Say that the dedupe key and the effect are stored in one transaction. Otherwise a crash between them brings the duplicate back.
- [ ] **3.9 effects outside the database.** The confirmation-email consumer cannot share a transaction with its key. Name the outbox pattern in the "publish failed after the row was stored" question.
- [ ] **4.15 order id.** The model answer calls the order id "not personal by itself." An identifier linked to a person is usually personal data under privacy law. Correct it.
- [ ] **4.15 copies of the data.** Deletion only blanks fields on the order row. Add the other copies: logs, backups, analytics, caches, and the event payloads from 3.9.

## 6. Give the capstones their hard parts

- [ ] **4.18 Senior capstone.** Require the race between an address change and the warehouse marking the order shipped, which 4.1b already names as the boundary. Handle it with a conditional update, building on 2.13. The idempotency key on setting an address is the weaker concern, because setting the same address twice is already safe.
- [ ] **5.9 Technical leader capstone.** `dedupe_key(event)` only builds a string. Require the meaningful code: check the key and record the effect in one atomic step.
- [ ] **Order address column.** 3.8a assumes the order already stores an address. 3.11 and 4.18 add a nullable column first. Pick one.

## 7. Vary repeated scenarios

- [ ] **Delivery address change.** Used in 3.8a, 3.8b, 3.11, 4.1b, and 4.18. Give the Senior capstone a different area-scale problem, such as the status model from 4.4a or double shipment from a retried charge event.
- [ ] **"51 queries at 50 children."** The same N+1 example appears in 3.6b, 4.7a, 4.7b, and 4.16. Vary the scenario or make each one build on the last.
- [ ] **Cached inventory count.** 4.9 and 4.8 have nearly the same exercise. Have 4.8 review a different generated design, such as a migration that cannot roll back or a missing owner check.

## 8. Align prompts and rubrics

- [ ] **5.8 Delivery systems.** The fourth rubric line asks for the generated-code policy, but the prompt does not. Add it to the prompt or drop the line.
- [ ] **5.8 concept size.** Nine ideas in about 1,750 characters. Split or trim.
- [ ] **Placement rubrics.** Each check has three rubric lines that bundle many outcomes. Use one line per must-know outcome so placement is not easier than the lessons it replaces.
- [ ] **1.0 Beginner placement.** Add search, sorting, and growth (1.10–1.11), which the rubric leaves out.
- [ ] **1.17 Beginner career lesson.** It assumes "a friend who already works on a team." Offer a community forum or a mentor as alternatives.
- [ ] **Career lesson template.** All five evidence lessons follow the same template. Vary them by level.
- [ ] **2.12 Modules, coupling, and cohesion.** Now overlaps 1.16 without referring to it. Build on 1.16 and raise the bar instead of re-teaching file splits.

## 9. Fix numbering and cross-references

- [ ] **Module numbers in teaching order.** These are out of sequence:
  - [ ] 1.15 and 1.16 come before 1.14.
  - [ ] 2.18 sits between 2.11 and 2.12.
  - [ ] 3.9 sits between 3.5 and 3.6.
  - [ ] 4.15 sits after 4.3.
  - [ ] 4.16 and 4.9 come before 4.8.
  - [ ] Senior jumps to 4.18 and 4.19, with no 4.10–4.14 or 4.17.
- [ ] **Renumber in one pass.** Lesson IDs are the keys for saved progress, so changing them affects existing learners.
- [ ] **Forward references into locked levels.** 3.6b points to 4.9, and 4.16 points to 5.2.
- [ ] **Forward reference within a level.** 4.15 relies on the retention rule in 4.4, which comes later.

## 10. Deepen the remaining thin lessons

Concept sections still run about 310–380 characters:

- [ ] 3.2b A switch for a risky rollout
- [ ] 3.5b Abuses of one operation (Junior's only security lesson, so do this first)
- [ ] 3.8b Pairing so someone else can drive
- [ ] 4.2b Build, buy, or operate
- [ ] 4.4b When one word means five states
- [ ] 4.5b A blameless review
