# Improvement checklist

Topic and content improvements for the curriculum. Site features are out of scope for now.

Rounds 1–4 come from the first content review and were addressed in `40efb8b`. Rounds 5–10 come from the second review and were addressed in `e96aac4`. Rounds 11–16 come from the third review and are open. All lesson ids are the ids after the renumber.

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

## How to work rounds 11–16

- Each item names the file, the lesson id, the field to edit, what to change, and how to tell it is done.
- Line numbers are from commit `e96aac4`. They shift as you edit, so search for the quoted text.
- Lesson fields: `concept` (paragraph list), `example` (`title`, `start`, `steps`, `end`), and `exercise` (`prompt`, `constraints`, `done`, `rubric`, `model`).
- Saved progress copies forward only when a rubric keeps the same number of lines. Changing a rubric's length resets that lesson's checks. Do it only where an item says so.
- Keep the house style: short declarative sentences, no brand names, and `[[id]]` links only to earlier lessons.
- After editing, run the curriculum through Node and confirm that every `[[id]]` resolves and none points forward.

## 11. Give each capstone a problem at its own level

The dedupe pattern ("store a key with the result so a retry does not repeat the effect") is already taught in 3.5a and 3.6. The 4.12 capstone reuses 3.6's own worked example, and 5.9 asks for the same function a third time.

- [ ] **4.12 Senior capstone: replace double shipment with a guarded status transition.** File `js/curriculum/senior.js`, lesson `4.12`, starting around line 773.
  - [ ] Module and lesson `title`: change "Stop a double shipment" to "Guard the order status model" or similar.
  - [ ] `concept`: the scenario is the explicit status model from [[4.5a]] (draft, paid, shipped, canceled, refunded). The hard part is two writers racing: a cancel and the warehouse's "mark shipped" both read `paid`, and both write. A read followed by a write loses that race. The function performs a transition as one conditional update, for example `UPDATE orders SET status = 'shipped' WHERE id = ? AND status = 'paid'`, and treats zero rows updated as a refused transition.
  - [ ] `example`: a cancel and a ship arriving within the same second. Show that check-then-write lets both succeed, and that the conditional update lets exactly one succeed, while the other gets a conflict it can report.
  - [ ] `exercise.prompt`: write a design note for enforcing the transition rules from 4.5a, and implement `transition(order_id, from_state, to_state)` in any language. Keep the existing list of design-note parts, which fit this problem naturally:
    - the compatibility window while the old status string is still written
    - behavior when the database times out
    - the last step where rollback is still a redeploy
    - whether a cache may hold status (it may not decide a transition)
    - one abuse with a control, such as a buyer calling "mark shipped" on their own order, controlled by a role check
  - [ ] `exercise.constraints`: the transition is one conditional update. A read followed by a separate write does not pass. A disallowed transition (for example, shipped back to paid) is refused by the rules, not by the caller.
  - [ ] `exercise.rubric`: keep three lines so saved progress carries forward. Replace "records the key and the shipment in one conditional write" with "performs the transition in one conditional update and reports a lost race as a conflict".
  - [ ] `exercise.model`: rewrite for the transition.
  - [ ] Done when: no part of 4.12 mentions a dedupe key, `charge_succeeded`, or a shipment insert.

- [ ] **4.13 Senior evidence lesson: follow the new capstone.** File `js/curriculum/senior.js`, lesson `4.13`, around lines 836, 844, and 857. Replace "double-shipment" and "The shipment guard inserts the key and the row together" with the status-transition capstone. The question becomes whether the boundary kept someone from writing status without the conditional update.

- [ ] **4.0 Senior placement: check the capstone line.** File `js/curriculum/senior.js`, lesson `4.0`. If a rubric line or the model mentions double shipment or a conditional write of a key, change it to the guarded transition. Keep the rubric at 10 lines.

- [ ] **5.9 Technical leader capstone: replace `apply_charge` with a reconciliation query.** File `js/curriculum/leader.js`, lesson `5.9`, around lines 564–605.
  - [ ] `concept`, second paragraph: the small piece of code is a reconciliation query or job that lists mismatches between charges and orders. That means charges with no order, orders marked paid with no charge, and charges recorded twice for one `charge_id`. Leadership needs evidence that the incident fix held, and this is that evidence.
  - [ ] `example` step "The function" (line 583): replace `apply_charge` with the query. It runs daily, and its output is the kill criterion for the "stop duplicate charges" bet: duplicates stay at zero for six weeks.
  - [ ] `exercise.prompt` and `exercise.constraints` (line 588 onward): replace "a function … that checks the dedupe key and records the charge in one atomic step" and "A string builder is not enough". Require a query or job that lists the three mismatch kinds, plus a sentence on who reads the output and what count triggers action.
  - [ ] `exercise.rubric` (line 598): keep three lines. In the third line, replace "the function records the key and the charge in one atomic step" with "a reconciliation query lists the mismatches and names who acts on a non-zero count".
  - [ ] `exercise.model` (line 601): replace the `apply_charge` sentence with the query and its owner. The incident action "make the retry use the key" stays, because that is the fix the query verifies.
  - [ ] Done when: 5.9 asks for no idempotency or dedupe code, and its code piece measures whether a bet is working.

- [ ] **README capstone rows.** File `README.md`.
  - [ ] Line 186: change "A double-shipment design and a conditional write" to "A guarded status transition and a conditional update".
  - [ ] Line 221: change "an atomic charge function" to "a reconciliation query".
  - [ ] Line 209: change "a function that records a dedupe key and the charge in one step" to "a reconciliation query that shows whether the duplicate-charge fix held".
  - [ ] Add a line to the Senior section that names the capstone as a guarded status transition.

## 12. Fix the two wrong answers in 3.6 Queues

File `js/curriculum/junior.js`, lesson `3.6`, exercise around lines 512–527.

- [ ] **Email key order.** The model (line 527) says "The email consumer records its key before sending, and a second delivery skips the send." A crash after recording the key and before sending loses the email.
  - [ ] `concept`, last paragraph: add the tradeoff in two or three sentences:
    - Record the key before sending, and a crash can lose the email.
    - Record it after sending, and a crash can send it twice.
    - An email cannot be made exactly once from your side. Pick the failure you accept, or pass the key to a provider that accepts an idempotency key.
  - [ ] `exercise.model`: state the choice, for example "record after sending, and accept a rare duplicate confirmation, because a missing confirmation costs a support call".
  - [ ] Add no new rubric line. The third line already covers the outbox and email.
  - [ ] Done when: the model names which failure it accepts.

- [ ] **Impossible sweep.** The model says "If the order row exists and the outbox row was never written, nothing is published. A sweep that writes the outbox for those rows closes the gap." The outbox row commits in the same transaction as the order, so that state cannot happen.
  - [ ] `exercise.model`: replace those two sentences. When the publish fails, the outbox row is still there, and the publisher retries it until the broker accepts it. The order exists before the message does, so the consumers' keys handle the retry.
  - [ ] `exercise.prompt` (line 512): the question "Say what happens if the publish itself fails after the order row is stored" can stay. The answer is the publisher's retry from the outbox.
  - [ ] Done when: no sentence in 3.6 describes an order row without its outbox row.

## 13. Fix the event-payload claim in 4.4 Privacy

File `js/curriculum/senior.js`, lesson `4.4`.

- [ ] **Event payloads are not rebuilt.** The model (line 326) says "Analytics and event payloads are rebuilt without it." Event logs and queues are often append-only.
  - [ ] `concept`, copies paragraph (line 299): add that events should carry ids, not the address. A consumer that needs the address reads it from the order, which minimization already requires. Payloads that already hold personal data age out by the queue's retention, and the retention is named.
  - [ ] `example` step "Delete and record" (line 307): replace "event payloads stop returning the address" with "new events carry only the order id. Old payloads age out on the queue's retention date."
  - [ ] `exercise.model` (line 326): replace "Analytics and event payloads are rebuilt without it" with "Analytics is rebuilt without it. Events carry the order id, not the address, and old payloads age out on the stated retention."
  - [ ] Optional: in 3.6 `concept`, add one sentence that an event names the order by id and does not copy personal fields. 4.4 can then link back to [[3.6]].
  - [ ] Done when: no sentence in 4.4 claims an event payload is edited after the fact.

## 14. Teach the address-versus-shipped race in the Junior capstone

4.1b names the boundary case (senior.js line 149: "a change in the hour the warehouse marks it shipped is rejected"). Since round 11 moves the Senior capstone to status transitions, 3.11 is the place to close this at Junior scale. The 3.11 model also has the check-then-write race itself.

- [ ] **3.11 conditional update.** File `js/curriculum/junior.js`, lesson `3.11`, around lines 815–852.
  - [ ] `exercise.constraints`: add "The shipped check and the address write are one conditional update, for example `UPDATE … WHERE id = ? AND shipped = false`. Zero rows updated means the order shipped first."
  - [ ] `exercise.model` (line 852): replace "rejects when `shipped` is true, and otherwise stores the address" with the conditional update and what zero rows means. Link to [[2.14]] for the lost-update idea.
  - [ ] If round 11 lands, 4.12 becomes the Senior version of this move. In 4.12 `concept`, say "3.11 guarded one field. This guards the whole state model."
  - [ ] Done when: the 3.11 model contains no separate read of `shipped` before the write.

## 15. Make the capstone rubrics fit

- [ ] **3.11 data step.** File `js/curriculum/junior.js`, lesson `3.11`. The address column already exists, so the required "data step" is now "an empty address stays empty", which is not a step.
  - [ ] Pick one option. Option A is recommended because it keeps the rubric at three lines.
    - **Option A.** Make the data step real: old orders store the address as one free-text field, and the new write stores structured fields (street, city, postal code) in new nullable columns. Old rows keep reading from the free-text field until a backfill, using expand, migrate, contract from [[3.4]]. Update `prompt`, the second `rubric` line, and `model` to match.
    - **Option B.** Drop "a data step" from `prompt` and from the second `rubric` line. Keep "the rollback is a redeploy or a stated repair".
  - [ ] Update the "release note" step in `example` to match. It currently says "No new column."
  - [ ] Done when: the data step in the model is an actual change to stored data, or it is gone from the prompt and the rubric.

- [ ] **4.12 forced parts.** These are solved by round 11, because a status transition has a real compatibility window, a real cache question, and a real abuse. If round 11 is deferred, at minimum:
  - [ ] Change the abuse in the model (line 811) from "a caller who reserves stock for another tenant's charge" to "a forged `charge_succeeded` from a producer that is not the charge service, controlled by accepting events only from the charge service's credentials".
  - [ ] Rewrite "insert that key in the same statement's transaction" (line 793) as "insert the key and the shipment in one transaction".

## 16. Smaller fixes

- [ ] **2.11 Automated checks is the thinnest must-know concept (about 410 characters).** File `js/curriculum/graduate.js`, lesson `2.11`, around line 845. Expand the `concept` to about 800 characters, adding:
  - [ ] What the one command runs: tests, a linter, and a formatter check. Each is cheap to run and catches a different class of defect.
  - [ ] Exit codes: zero means pass and non-zero means fail. A script that prints errors and exits zero hides failures from automation.
  - [ ] The same command runs locally and on the shared line, which links forward to the pipeline in 2.12 without a `[[ ]]` link.
  - [ ] Keep the exercise and rubric unchanged.

- [ ] **5.8 concept length (about 1,600 characters).** File `js/curriculum/leader.js`, lesson `5.8`, around line 516.
  - [ ] Trim the fifth paragraph (culture, rewards, taste, leaving the group more able) to three sentences.
  - [ ] Shorten the generated-code part of the fourth paragraph to the policy and the failure it prevents.
  - [ ] Target about 1,100 characters. Keep the exercise and rubric unchanged.

- [ ] **3.9b example does not match the exercise.** File `js/curriculum/junior.js`, lesson `3.9b`, `example.start` (line 735). Change "the empty-input rejection on the easy slice" to the unshipped-address slice the exercise uses. Rewrite the two steps to name the order-update seam and the "what counts as shipped" call point, matching the third concept paragraph.

- [ ] **Recount after rounds 11–16.** Rerun the module and lesson counts, the must-know lists, and the placement rubric lengths. Update `README.md` wherever a count or capstone description changed.
