# Improvement checklist

Topic and content improvements for the curriculum. Site features are out of scope for now.

Rounds 1–4 come from the first content review and were addressed in `40efb8b`. Rounds 5–10 come from the second review and are addressed in edition 2. Lesson ids below are the ids after the renumber.

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

- [x] **3.6 queue order.** A broker may reorder. Order is a guarantee only when that system documents it.
- [x] **3.6 exactly-once effect.** A dedupe key gives an exactly-once effect. Delivery stays at-least-once.
- [x] **3.6 atomic key and effect.** The stock key and the reservation commit in one transaction.
- [x] **3.6 effects outside the database.** The confirmation uses an outbox.
- [x] **4.4 order id.** An order id linked to a person is personal data.
- [x] **4.4 copies of the data.** Deletion names logs, backups, analytics, caches, and event payloads.

## 6. Give the capstones their hard parts

- [x] **4.12 Senior capstone.** The problem is a double shipment. The function records the key and the shipment in one conditional write.
- [x] **5.9 Technical leader capstone.** `apply_charge` records the key and the charge in one transaction.
- [x] **Order address column.** The order already stores an address by 3.9a. Lesson 3.11 updates that field. Lesson 3.4 still teaches a new nullable column, on buyer email.

## 7. Vary repeated scenarios

- [x] **Delivery address change.** 3.9a, 3.9b, 3.11, and 4.1b keep it. The Senior capstone is the double shipment.
- [x] **Query counts.** 3.7b discovers the 51-query page. 4.8 cites that count as debt. 4.9a and 4.9b use a per-order export.
- [x] **Review scenario.** 4.10 keeps the inventory cache. 4.11 reviews a migration that cannot roll back and a missing owner check.

## 8. Align prompts and rubrics

- [x] **5.8 Delivery systems.** The prompt asks for the generated-code policy, and the concept is five paragraphs.
- [x] **Placement rubrics.** One line per must-know lesson: 18, 13, 7, 10, and 6.
- [x] **1.0 Beginner placement.** Includes search, sorting, and growth.
- [x] **1.17 Beginner career lesson.** The reader can be a friend, a community forum, or a mentor.
- [x] **Career lesson template.** Each level asks a different question: the program, the change packet, the rollback, the handoff, or the work after this path.
- [x] **2.13 Modules, coupling, and cohesion.** Starts from the Beginner split and asks for one reason to change and an import to refuse.

## 9. Fix numbering and cross-references

- [x] **Module numbers in teaching order.** Ids match the order of the modules, from 1.14 through 4.13.
- [x] **Renumber in one pass.** Saved edition 1 progress copies forward when the rubric length is unchanged. Changed exercises are left unchecked.
- [x] **Forward references into locked levels.** The query lesson and the debt lesson name the later idea without a link into a closed level.
- [x] **Forward reference within a level.** Privacy states its own retention window. Data evolution points back to it.

## 10. Deepen the remaining thin lessons

- [x] 3.2b A switch for a risky rollout
- [x] 3.5b Abuses of one operation
- [x] 3.9b Pairing so someone else can drive
- [x] 4.2b Build, buy, or operate
- [x] 4.5b When one word means five states
- [x] 4.6b A blameless review
