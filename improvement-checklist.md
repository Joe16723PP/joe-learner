# Improvement checklist

Topic and content improvements for the curriculum. Site features are out of scope for now.

Rounds 1–4 come from the first content review and were addressed in `40efb8b`. Rounds 5–10 come from the second review and were addressed in `e96aac4`. Rounds 11–16 come from the third review and were addressed with the capstone retarget. All lesson ids are the ids after the renumber.

## 1. Teach what later lessons already assume

- [x] **Exceptions.** Added as 1.14.
- [x] **Imports, modules, and records.** Added as 1.15.
- [x] **Deployment and environments.** Added as 2.12, must-know.
- [x] **Queues, events, and at-least-once delivery.** Added as 3.6, must-know.
- [x] **Caching.** Added as 4.10, must-know, before 4.11 review.

## 2. Add missing topics

- [x] **AI-assisted development.** Covered across levels:
  - [x] New graduate: review a generated change (2.9) and keep secrets out of prompts (2.10).
  - [x] Junior: check generated code against the local pattern (3.3).
  - [x] Senior: review generated code for systemic risk (4.11).
  - [x] Technical leader: set a team policy (5.8).
- [x] **Refactoring and legacy code.** Added as 3.3b, change a pattern with the tests pinned.
- [x] **Career navigation.** Added an evidence lesson per level: 1.17, 2.19, 3.12, 4.13, 5.10.
- [x] **Privacy and personal data.** Added as 4.4.
- [x] **Technical debt at Senior.** Added as 4.8.
- [x] **Working with product and design.** Added as 4.1b.
- [x] **State the path's scope.** The README names it as backend-leaning, and 3.10 covers where to specialize next.
- [x] **Staff engineer and engineering manager split.** People management is named as out of scope in the README, 5.0, 5.6a, and 5.10.

## 3. Fix gating contradictions

- [x] **Security at Junior and Senior.** 4.9a is now must-know.
- [x] **Automated checks.** 2.11 is now must-know.
- [x] **Collaboration and estimation.** 3.9a is now must-know.
- [x] **Junior's project thread.** Junior now runs on one orders system.

## 4. Deepen existing content

- [x] **Thin should-know lessons.** Expanded:
  - [x] 3.7b A query at a realistic size
  - [x] 4.9b A capacity sketch
  - [x] 5.1b Constraints you already promised
  - [x] 5.2b A portfolio of engineering cost
  - [x] 5.6b Hiring for a missing signal
- [x] **Hands-on code after New graduate.** The capstones 3.11, 4.12, and 5.9 each include code in any language.
- [x] **End-of-level projects.** Added 3.11, 4.12, and 5.9.
- [x] **Time estimates.** Each level has a pace estimate.
- [x] **Starting in the middle.** Each level has a placement check (1.0–5.0).

## 5. Fix accuracy

- [x] **3.6 queue order.** A broker may reorder. Order is a guarantee only when that system documents it.
- [x] **3.6 exactly-once effect.** A dedupe key gives an exactly-once effect. Delivery stays at-least-once.
- [x] **3.6 atomic key and effect.** The stock key and the reservation commit in one transaction.
- [x] **3.6 effects outside the database.** The confirmation uses an outbox.
- [x] **4.4 order id.** An order id linked to a person is personal data.
- [x] **4.4 copies of the data.** Deletion names logs, backups, analytics, caches, and event payloads.

## 6. Give the capstones their hard parts

- [x] **4.12 Senior capstone.** The function records the key and the shipment in one conditional write. Superseded by round 11.
- [x] **5.9 Technical leader capstone.** `apply_charge` records the key and the charge in one transaction. Superseded by round 11.
- [x] **Order address column.** The order already stores an address by 3.9a. Lesson 3.11 updates that field.

## 7. Vary repeated scenarios

- [x] **Delivery address change.** 3.9a, 3.9b, 3.11, and 4.1b keep it.
- [x] **Query counts.** 3.7b discovers the 51-query page. 4.8 cites that count as debt. 4.9a and 4.9b use a per-order export.
- [x] **Review scenario.** 4.10 keeps the inventory cache. 4.11 reviews a migration that cannot roll back and a missing owner check.

## 8. Align prompts and rubrics

- [x] **5.8 Delivery systems.** The prompt asks for the generated-code policy.
- [x] **Placement rubrics.** One line per must-know lesson: 18, 13, 7, 10, and 6.
- [x] **1.0 Beginner placement.** Includes search, sorting, and growth.
- [x] **1.17 Beginner career lesson.** The reader can be a friend, a community forum, or a mentor.
- [x] **Career lesson template.** Each level asks a different question.
- [x] **2.13 Modules, coupling, and cohesion.** Starts from the Beginner split.

## 9. Fix numbering and cross-references

- [x] **Module numbers in teaching order.**
- [x] **Renumber in one pass.** Saved edition 1 progress copies forward when the rubric length is unchanged.
- [x] **Forward references into locked levels.**
- [x] **Forward reference within a level.**

## 10. Deepen the remaining thin lessons

- [x] 3.2b A switch for a risky rollout
- [x] 3.5b Abuses of one operation
- [x] 3.9b Pairing so someone else can drive
- [x] 4.2b Build, buy, or operate
- [x] 4.5b When one word means five states
- [x] 4.6b A blameless review

---

## 11. Give each capstone a problem at its own level

- [x] **4.12** is now "Guard the order status model". The function performs a transition in one conditional update. The module title stays "Area capstone". Rubric stays 3 lines.
- [x] **4.13** asks whether the boundary kept someone from writing status without the conditional update.
- [x] **4.0** last rubric line is the guarded transition. Still 10 lines.
- [x] **5.9** asks for a reconciliation query that lists the three mismatch kinds. The incident action stays "make the retry use the key". Rubric stays 3 lines.
- [x] **5.0** last rubric line matches that query. Still 6 lines.
- [x] **README** names the Senior capstone as a guarded status transition and the leader capstone as a reconciliation query.

## 12. Fix the two wrong answers in 3.6 Queues

- [x] **Email key order.** The model records the key after sending and accepts a rare duplicate confirmation. Rubric stays 4 lines.
- [x] **Impossible sweep.** A failed publish retries the outbox row that committed with the order. No sentence describes an order without its outbox row.

## 13. Fix the event-payload claim in 4.4 Privacy

- [x] **Event payloads age out.** New events carry the order id. Old payloads age out on the named retention. 4.4 links [[3.6]].

## 14. Teach the address-versus-shipped race in the Junior capstone

- [x] **3.11 conditional update.** Zero rows updated means the order shipped first. The model links [[2.14]]. 4.12 says 3.11 guarded one field and this guards the whole state model.

## 15. Make the capstone rubrics fit

- [x] **3.11 data step.** Option A: free-text addresses become nullable street, city, and postal code, using expand, migrate, and contract from [[3.4]]. Rubric stays 3 lines.
- [x] **4.12 forced parts.** Solved by the status transition: a compatibility window, a cache that must not decide the transition, and a role check on mark-shipped.

## 16. Smaller fixes

- [x] **2.11** concept covers tests, a linter, a formatter check, and exit codes. It names the pipeline in 2.12 without a `[[ ]]` link. Exercise and rubric unchanged.
- [x] **5.8** concept trimmed to the policy and three sentences on what the group rewards. Exercise and rubric unchanged.
- [x] **3.9b** example uses the unshipped-address slice, the order-update seam, and the "what counts as shipped" call point.
- [x] **Recount.** Counts unchanged: Beginner 18 modules / 20 lessons, New graduate 20 / 21, Junior 13 / 18, Senior 14 / 19, Technical leader 11 / 14. Placement rubrics stay 18, 13, 7, 10, and 6. Capstone rows in the README match the new scenarios.
