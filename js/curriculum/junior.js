registerLevel({
  id: "junior",
  num: "03",
  title: "Junior",
  promise: "Own a change inside a system you did not start, from report through release and support.",
  audience: "Developers who already practice version control, testing, and review, and who are now responsible for changes inside a living system. This is the work of the first years shipping with a team. The title on the offer letter is irrelevant.",
  prerequisites: "New graduate must-know outcomes. Gaps in the should-know track can be filled in parallel. They are not a blocker.",
  buildsOn: "New graduate taught the tools and the habits on small projects. Junior applies them inside a system the learner did not start, with real users, history, and operational consequences. The unit of work changes from a correct function to a change that behaves in production.",
  note: "One path. Must-know lessons open Senior. Should-know lessons are marked and can be skipped. The other lessons are part of the path and do not lock the next level.",
  canDo: [
    "Turn a vague report into a reproduced behavior, a reviewable change, and a release they know how to undo.",
    "Explain the local design of the area they touched and extend it without inventing a second pattern.",
    "Change stored data so old and new records both work during the rollout.",
    "Tell, from logs or metrics, whether their change is healthy after release, and take the first steps in an incident they caused or noticed.",
  ],
  modules: [
    {
      id: "3.1",
      title: "Learning a codebase",
      summary: "One user action, the data it writes, and the words the code uses.",
      why: "Speed without a map produces changes that fight the existing design.",
      lessons: [
        {
          id: "3.1",
          title: "Learning a codebase",
          track: "must",
          thread: "Orders",
          concept: [
            { type: "p", text: "Entry points are a route, a command, a job, or a UI event. Start from a behavior, not from a random file. The behavior tells you which entry is worth opening." },
            { type: "p", text: "Draw one path: validation, read, write, response, and any call to another system. That drawing is the map. A file tree is not a map." },
            { type: "p", text: "Ownership: what this application is the source of truth for, and what it only copies or requests. If payments are the source of truth for a refund, this service is requesting a refund, not inventing one." },
            { type: "p", text: "Read recent changes in the area to see what the team has been repairing. The last five fixes are a better guide than the oldest design note." },
            { type: "p", text: "Build a glossary of domain words in the code, then check two of them with a teammate or with the tests. Wrong vocabulary causes wrong changes." },
          ],
          example: {
            title: "Cancel is a path, not a folder",
            start: "An orders service you have not seen. Someone asks what \"cancel an order\" does. You have the code and no tour.",
            steps: [
              { t: "Start at the route", d: "POST `/orders/{id}/cancel` is the entry. The body carries a reason. Authentication has already named the caller." },
              { t: "Write the path", d: "Validate the id. Read the order. If the caller does not own it, refuse. If the status is `shipped`, refuse with a conflict. Otherwise call payments to refund, set status to `canceled`, store the reason, and return the order." },
              { t: "One glossary line", d: "`hold` appears in a comment near inventory and again near a fraud check. You cannot yet say they are the same word. That becomes a question, not a guess you code against." },
            ],
            end: "One page names files, the fields written, the external refund call, and a word you refused to invent a meaning for.",
          },
          exercise: {
            prompt: "The service below is small and multi-module. You have not seen it before. Write a one-page trace of \"cancel an order\": files, data written, external calls, and two questions you could not answer from the code. Include the glossary entry for one domain word that was ambiguous.",
            constraints: [
              "Start from the cancel route, not from the store.",
              "Name what this service is the source of truth for, and what it only requests.",
              "The glossary entry states the ambiguity. It does not pick a meaning the code does not support.",
            ],
            done: "The trace is one page, names the written fields and the external call, lists two real questions, and has one glossary entry for an ambiguous word.",
            rubric: [
              "The trace starts at the cancel entry and names the files on the path.",
              "It names the data written and the external call, and it says what this service does not own.",
              "It includes two unanswered questions and one glossary entry for an ambiguous domain word.",
            ],
            files: [
              {
                name: "orders/http",
                code: `on POST /orders/{id}/cancel:
  caller = current authenticated user
  reason = body.reason
  if reason is missing or longer than 200 characters:
    return 400
  result = orders.cancel(caller, id, reason)
  return result
`,
              },
              {
                name: "orders/cancel",
                code: `cancel(caller, id, reason):
  order = store.get(id)
  if order is missing:
    return 404
  if order.owner_id != caller.id:
    return 403
  if order.status is "shipped":
    return 409
  if order.status is "canceled":
    return 200 order
  # A "hold" blocks cancel. See payments and inventory. Both use the word.
  if order.status is "hold":
    return 409
  refund = payments.refund(order.payment_id)
  if refund is not accepted:
    return 502
  order.status = "canceled"
  order.cancel_reason = reason
  store.save(order)
  return 200 order
`,
              },
              {
                name: "orders/store",
                code: `get(id):
  return the order row or missing

save(order):
  replace the row for order.id
  columns written: status, cancel_reason
  owner_id and payment_id are not changed here
`,
              },
              {
                name: "payments/client",
                code: `refund(payment_id):
  # Request a refund from the payments service.
  # This service does not decide the money movement.
  call POST /refunds {payment_id} with a timeout
  return whether the response was accepted
`,
              },
            ],
            model: [
              { type: "p", text: "Files: `orders/http`, `orders/cancel`, `orders/store`, `payments/client`. Written data: `status` and `cancel_reason`. External call: a refund request. This service is the source of truth for the order status. Payments is the source of truth for the money. Questions the code does not answer: what `payments.refund` does if the provider times out after the refund landed, and whether inventory is released. Glossary: `hold` is used as a status that blocks cancel, and the comment points at both payments and inventory, so a reader cannot tell whether it means a fraud hold or a stock hold." },
            ],
          },
        },
      ],
    },
    {
      id: "3.2",
      title: "From report to release",
      summary: "A vague report becomes a change you can undo.",
      why: "The work is finished when the behavior is in users' hands and the author knows whether it worked.",
      lessons: [
        {
          id: "3.2a",
          title: "From a report to a release",
          track: "must",
          thread: "Orders",
          concept: [
            { type: "p", text: "Restate the request as observable behavior, including what will stay the same. \"The total is wrong sometimes\" is not yet a change. A total that is wrong for one currency, and still right for another, is." },
            { type: "p", text: "Agree on examples before coding: one normal, one boundary, one failure." },
            { type: "p", text: "Slice so the first review fits in one sitting. Hidden refactors do not ride along. [[2.9]] already asked for a small change. Here the pressure to \"just clean this\" is higher because the code is not yours." },
            { type: "p", text: "The review description says: behavior, test evidence, risk, and how to undo the change. Undo is a redeploy of the previous version, a switch, or a data repair. Name which one." },
            { type: "p", text: "After release, watch the path you changed for a defined window and say what you looked at." },
          ],
          example: {
            title: "\"Search is broken\" becomes a review",
            start: "A report: search returns nothing for a name the operator can see in the database. No code yet.",
            steps: [
              { t: "Observable behavior", d: "A query for `Ada` returns the contact named `Ada`. A query for `ada` also returns it, because the bug is a case-sensitive compare. Names that truly are absent still return an empty list. That last sentence is what stays the same." },
              { t: "Examples", d: "Normal: `Ada` finds Ada. Boundary: `ada` finds Ada. Failure: an empty query is rejected and does not scan the table." },
              { t: "The description", d: "Behavior: case-insensitive name match. Tests: the three examples. Risk: other callers may depend on case-sensitive matches. Undo: redeploy the previous version. Watch: search error rate and a sample of queries for one hour." },
            ],
            end: "A reviewer can verify the claim without sitting with you. The first slice does not rewrite search.",
          },
          exercise: {
            prompt: "A vague report says \"the total is wrong sometimes.\" The log line is `currency=KWD unit=1.234 qty=2 total=2.460`. The code rounds the unit price to two decimals, then multiplies. KWD uses three minor digits, so the expected total is 2.468. USD totals that are already two decimals are fine. Write the reproduction, the acceptance examples, a fix plan that does not say \"rewrite billing,\" the review description, and the rollback note.",
            constraints: [
              "Say what stays the same, not only what changes.",
              "The fix plan is the smallest change that stops rounding before the currency's own minor units.",
              "The review description includes behavior, test evidence, risk, and how to undo the change.",
            ],
            done: "Someone else can run your examples, see the review claim, and undo the change without asking you what you meant.",
            rubric: [
              "I reproduced KWD 1.234 times 2 showing 2.460 instead of 2.468, and I named a USD case that stays the same.",
              "The acceptance examples cover one normal case, one boundary, and one failure, and the fix plan is smaller than a billing rewrite.",
              "The review description includes behavior, test evidence, risk, and a rollback of redeploy or a stated data repair.",
            ],
            model: [
              { type: "p", text: "Normal: USD 10.00 times 2 is 20.00. Boundary: KWD 1.234 times 2 is 2.468. Failure: a missing currency is rejected and no total is written. Fix: convert to integer minor units using that currency's exponent, then multiply. Do not round to two decimals first. Risk: totals already stored with the old rounding stay wrong until a repair. Undo: redeploy the previous version to stop new bad totals. Say plainly if old rows need a separate repair. Watch the line-total path for the currencies you named, for a window you name." },
            ],
          },
        },
        {
          id: "3.2b",
          title: "A switch for a risky rollout",
          track: "should",
          thread: "Orders",
          concept: [
            { type: "p", text: "Use a feature flag or a config switch when the data change is hard to undo. The flag has an owner and a removal condition. A permanent flag is an unmade decision." },
            { type: "p", text: "A code-only change that redeploys cleanly often does not need a flag. A flag you cannot delete is a second product path you now have to test forever." },
          ],
          example: {
            title: "A flag with an end date",
            start: "A new price rule must run for one merchant before it runs for all of them. Rolling the data back is expensive.",
            steps: [
              { t: "Owner and condition", d: "The owner is the person who will delete the flag. The removal condition is: that merchant has accepted the new totals for seven days, and no other merchant is still on the old path." },
              { t: "What the flag is not", d: "It is not a setting with no name and no end. If you cannot say when it dies, you have not made the decision." },
            ],
            end: "The rollout can go back to the old rule by flipping the switch, and the switch has a written end.",
          },
          exercise: {
            prompt: "Using the currency-rounding fix from the previous lesson, say whether a flag is warranted and what would make it safe to delete. Some stored totals are already wrong.",
            constraints: [
              "Distinguish stopping new bad totals from repairing old rows.",
              "If you recommend a flag, name an owner and a removal condition.",
              "If you do not, say why a redeploy is enough.",
            ],
            done: "A short recommendation a teammate could follow, including the condition that ends the flag if you use one.",
            rubric: [
              "I said whether a flag is warranted for this fix.",
              "I separated the code rollback from the already-stored totals.",
              "A flag, if I used one, has an owner and a removal condition. A decision against a flag says why.",
            ],
            model: [
              { type: "p", text: "Redeploy stops new totals from using the old rounding. It does not repair rows already stored. A flag is warranted only if some merchants must keep the old rounding for a defined window, for example an open dispute. The owner deletes it when that window is closed and the repair has been checked. If every merchant should get the fix at once, a flag is an unmade decision and a redeploy is the rollback." },
            ],
          },
        },
      ],
    },
    {
      id: "3.3",
      title: "Working with an existing design",
      summary: "Extend the local pattern, and say so when the pattern is the defect.",
      why: "Inconsistent structure is a tax on every later change in that area.",
      lessons: [
        {
          id: "3.3",
          title: "Working with an existing design",
          track: "core",
          concept: [
            { type: "p", text: "Match the local pattern unless that pattern is the defect. A second way to do the same thing costs every future reader." },
            { type: "p", text: "Extend a seam: a function, a module boundary, a clear interface. Copying a block starts a second pattern even when the copy is correct today." },
            { type: "p", text: "When the local pattern is harmful, say so in the review and keep the current change small. Schedule the cleanup as its own work with a reason." },
            { type: "p", text: "Read the tests as the specification the last author left. Update them when the intended behavior changes, and say so." },
          ],
          example: {
            title: "Nickname is the pattern",
            start: "Profiles already have an optional nickname, implemented end to end.",
            steps: [
              { t: "List the seam", d: "Input collects it. A check allows it to be absent and limits it when present. Storage has a nullable column. The HTTP representation includes the field on read and write. The display prints it when present." },
              { t: "The miss a newcomer makes", d: "They add the column and the form, and they forget the HTTP field. The form submits a value the API drops. A test that writes the field and reads it back catches that." },
            ],
            end: "The new field follows the same files as nickname. The test fails if any hop drops it.",
          },
          exercise: {
            prompt: "The profile service already implements optional nickname end to end: input, validation, a nullable column, the HTTP field, and display. Add locale by following that pattern. List every file the pattern forces you to touch. Name one step a newcomer would be likely to miss, and add a test that would catch that miss.",
            constraints: [
              "Locale stays optional, as nickname is optional, unless you have a written reason to break the pattern.",
              "Validation can differ. Nickname's length rule does not have to be copied onto a locale code. The allowed set is the point where the pattern bends, and you should say so.",
              "The test fails if the missed step drops the value.",
            ],
            done: "A list of files, one likely miss, and a test that catches it. Locale round-trips the way nickname does.",
            rubric: [
              "I listed every file the nickname pattern forced me to touch for locale.",
              "I named one step a newcomer would miss.",
              "I added a test that fails if that step is missed.",
            ],
            model: [
              { type: "p", text: "Touch input, validation, storage, the HTTP read and write, and display. A likely miss is the HTTP field: the form collects locale and the API never returns it. Another is treating locale as required. The test saves a profile with no locale and reads it back empty, and it rejects a code outside the allowed set. Copying nickname's length check would accept `not-a-locale` and reject a short valid code. Say that the seam is \"optional validated field,\" not \"string of length 1 to 40.\"" },
            ],
          },
        },
      ],
    },
    {
      id: "3.4",
      title: "Data changes and migrations",
      summary: "Expand, migrate, contract. Old and new rows both work.",
      why: "Code can roll back in minutes. Bad data often cannot.",
      lessons: [
        {
          id: "3.4",
          title: "Data changes and migrations",
          track: "must",
          thread: "Contact book",
          concept: [
            { type: "p", text: "Expand, then migrate, then contract. Add the new field before code requires it. Backfill old rows. Remove the old path only after readers no longer need it." },
            { type: "seq", title: "A stored field, in order", items: [
              { h: "Expand", p: "Add the field. Old code ignores it. New code tolerates its absence." },
              { h: "Migrate", p: "Backfill old rows in batches. The job is safe to run twice." },
              { h: "Contract", p: "When readers no longer need the old shape, require the field and remove the old path." },
            ] },
            { type: "p", text: "A migration is safe to run twice. A deploy that rolls back still works against the migrated data, or the plan says explicitly that rollback includes a data repair." },
            { type: "p", text: "On large tables, a lock or a full rewrite can stall the product. Backfill in batches. Know which statement takes a lock." },
            { type: "p", text: "During the transition, the read path understands old and new rows." },
          ],
          example: {
            title: "A nullable nickname column",
            start: "Profiles have no nickname. You will add one. Existing rows must keep working.",
            steps: [
              { t: "Expand", d: "Add a nullable column. The read path treats absence as \"no nickname.\" The write path stores one when the request has one." },
              { t: "Backfill, if you even need one", d: "Nicknames have no source to copy from. The backfill is \"leave null,\" and running it twice still leaves null. Do not invent nicknames." },
              { t: "Do not contract", d: "The field is optional. There is no second step that makes it required. Contracting it would strand every old profile." },
            ],
            end: "Old rows still read. New writes can store a nickname. Rollback of the new code leaves a column the old code ignores.",
          },
          exercise: {
            prompt: "Plan adding email to contacts that today have only phone. Write the ordered steps, what the application does when email is absent, and the concrete failure if \"email required\" code deploys before the backfill. Include the idempotent backfill rule and one check that proves the backfill finished.",
            constraints: [
              "Old contacts remain readable throughout the expand and migrate steps.",
              "The backfill is safe to run twice and does not blank an email that is already present.",
              "Name the statement that can lock a large table, and batch the backfill.",
            ],
            done: "A reader can follow the order, name the failure of requiring email too early, and say which check shows the backfill finished.",
            rubric: [
              "The plan is expand, then backfill, then contract, and reads tolerate a missing email until the contract step.",
              "I named the failure if email-required code deploys before the backfill.",
              "The backfill is safe to run twice, and one check proves it finished.",
            ],
            model: [
              { type: "p", text: "Expand: nullable `email`, writers store it when present, readers treat absence as \"no email on file.\" Migrate: fill emails from a known source in batches. A second run skips rows that already have an email. Contract only after the check passes: count of rows still missing email equals the count you have agreed may stay empty. If required-email code ships first, loading or editing an old contact fails because the field the code demands is null. Adding a nullable column is usually the cheap step. Updating every row in one statement is the step that can lock the table." },
            ],
          },
        },
      ],
    },
    {
      id: "3.5",
      title: "APIs and contracts",
      summary: "What callers may rely on, and how a break is sequenced.",
      why: "Junior work often sits on a boundary. Breaking a caller you do not run is an incident for someone else.",
      lessons: [
        {
          id: "3.5a",
          title: "Contracts and compatible change",
          track: "core",
          concept: [
            { type: "p", text: "A contract is what callers may rely on: fields, types, error codes, and any ordering or uniqueness promise." },
            { type: "p", text: "Adding a field is usually safe. Renaming, removing, or changing a type is a break. Breaks need a version or a period where both shapes are accepted, callers move, then the old shape is rejected." },
            { type: "seq", title: "A breaking field, without a flag day", items: [
              { h: "Accept both", p: "The old shape and the new shape both work." },
              { h: "Move callers", p: "Count them. An announcement is not a migration." },
              { h: "Reject the old", p: "Only after the callers you know about have moved." },
            ] },
            { type: "p", text: "Validate at the boundary. Code inside the boundary may trust a value that already passed validation." },
            { type: "p", text: "Idempotency: a retry of create or charge must not double-apply. An idempotency key stored with the first result is one concrete mechanism. The same key returns the first result. It does not perform the effect again." },
          ],
          example: {
            title: "Renaming a field by accident",
            start: "Clients send `note`. A change renames the JSON field to `body` and deploys on Tuesday.",
            steps: [
              { t: "See the break", d: "Every client that still sends `note` fails validation. You do not operate those clients. Their Tuesday is an incident." },
              { t: "The overlap", d: "Accept `note` or `body`. Prefer `body` when both are present, or reject the request if they disagree. Publish the date you will stop accepting `note`, and count the callers still sending it." },
            ],
            end: "The rename is real, and it has a window. Callers move before the old name is rejected.",
          },
          exercise: {
            prompt: "Change `amount` from a decimal string to `{currency, minor_units}`. List the caller impact and a compatible sequence: accept both, migrate callers, reject the old form. State the retry rule for \"create charge.\"",
            constraints: [
              "Say what breaks if you reject the string on the same day you add the object.",
              "The sequence names who moves during the middle step.",
              "The retry rule prevents a second charge when the same request is repeated.",
            ],
            done: "A caller who still sends `\"12.50\"` keeps working during the window, and a retried create does not charge twice.",
            rubric: [
              "I listed the caller impact of changing amount's type.",
              "The sequence accepts both shapes, moves callers, then rejects the old form.",
              "A retry of create charge with the same idempotency key returns the first result and does not charge again.",
            ],
            model: [
              { type: "p", text: "`\"amount\": \"12.50\"` and `\"amount\": {\"currency\": \"USD\", \"minor_units\": 1250}` are both accepted in the window. Callers you do not run are the impact: they break the day you reject the string. Move them, count the old shape, then reject it. Create charge stores the idempotency key with the first result. A retry with that key returns the stored result and does not create a second charge." },
            ],
          },
        },
        {
          id: "3.5b",
          title: "Abuses of one operation",
          track: "should",
          concept: [
            { type: "p", text: "Threat-model one operation. Ask what a hostile caller can spoof, replay, or read. Write two abuses and a control for each: an owner check, a key scope, a rate limit, or an audit." },
            { type: "p", text: "This is a short list for one feature, not a full security program. Two abuses you can actually close are worth more than a catalog." },
          ],
          example: {
            title: "Two ways to misuse a refund",
            start: "The operation is \"refund this payment.\" The caller is authenticated.",
            steps: [
              { t: "Replay", d: "They send the same refund twice. Control: an idempotency key, so the second call returns the first refund." },
              { t: "Someone else's payment", d: "They substitute another customer's payment id. Control: an owner check on that payment, not only a check that the caller is logged in. That is the authorization habit from [[2.10]]." },
            ],
            end: "Two abuses, two controls, both specific to this operation.",
          },
          exercise: {
            prompt: "For \"create charge,\" name two abuses and the control for each.",
            constraints: [
              "Use the operation from the previous lesson, including the amount change.",
              "Each control is one of: owner check, key scope, rate limit, or audit. You may use idempotency where replay is the abuse.",
              "Do not write a general essay about security.",
            ],
            done: "Two abuses a hostile caller can attempt, each with a control that would stop it.",
            rubric: [
              "I named two abuses of create charge.",
              "Each abuse has a control.",
              "The controls are specific to this operation.",
            ],
            model: [
              { type: "p", text: "Replay of the same charge: store an idempotency key with the first result. A charge against another customer's invoice: an owner check on that invoice, not only \"logged in.\" A third you do not have to use: a client-supplied amount that does not match the invoice, controlled by computing the amount on the server." },
            ],
          },
        },
      ],
    },
    {
      id: "3.6",
      title: "Testing in a larger system",
      summary: "Unit, integration, and the one thing you must not fake.",
      why: "A test suite nobody trusts will be bypassed. A test suite that mocks away the real risk proves nothing.",
      lessons: [
        {
          id: "3.6a",
          title: "Tests that match the risk",
          track: "core",
          thread: "Orders",
          concept: [
            { type: "p", text: "Unit tests cover logic that can be wrong alone. Integration tests cover queries, serialization, and the boundary. End-to-end tests cover a few critical paths, not every branch." },
            { type: "p", text: "Fake a collaborator you do not own. Do not fake the function whose behavior you are trying to prove. A mock that returns \"unique\" does not prove a uniqueness rule." },
            { type: "p", text: "Inject a clock and any randomness. Tests do not depend on wall time, hash iteration order, or a live third party." },
            { type: "p", text: "A flaky test is a defect. Quarantine it with a name and a reason, and fix it. A suite people ignore will be skipped on the day it mattered." },
          ],
          example: {
            title: "The mock that hid the second redemption",
            start: "A coupon may be applied once. A test mocks the database and returns \"inserted\" every time.",
            steps: [
              { t: "What the mock proves", d: "It proves your function calls the database. It does not prove a second insert is rejected." },
              { t: "What to keep real", d: "The unique constraint on `(account, coupon)` runs in a real schema. The second redemption fails there. The discount math can stay a unit test. The payment provider, which you do not own, can be faked." },
            ],
            end: "The test that matters hits the constraint. The test that only checks arithmetic does not pretend to.",
          },
          exercise: {
            prompt: "For \"apply a coupon once,\" specify one unit test, one integration test that hits a real database or a real schema, and one case that must not be mocked. Explain why.",
            constraints: [
              "The unit test is logic that can be wrong alone, such as discount math or eligibility.",
              "The integration test uses a real schema, not a mock that agrees with you.",
              "Name the unique constraint as the case you must not mock, or say what else carries the real risk.",
            ],
            done: "Three tests, each with a reason, and a sentence on why the uniqueness rule stays real.",
            rubric: [
              "I specified a unit test for discount math or eligibility.",
              "I specified an integration test against a real schema.",
              "I named the case that must not be mocked and why.",
            ],
            model: [
              { type: "p", text: "Unit: 10 percent of 2000 minor units is 200, or a coupon past its end instant is ineligible when the clock is passed in. Integration: the second insert of the same account and coupon fails on the unique constraint. Do not mock that constraint. Fake the payment provider if the test is not about payment. End-to-end, if you write one, is a single checkout that applies the coupon, not a copy of every branch." },
            ],
          },
        },
        {
          id: "3.6b",
          title: "A query at a realistic size",
          track: "should",
          thread: "Orders",
          concept: [
            { type: "p", text: "Run one query or endpoint against a realistic row count, thousands rather than five. State whether the plan is still acceptable, using the growth rules from [[1.11]] plus a measurement." },
            { type: "p", text: "Five rows hid the nested work. A thousand rows will not." },
          ],
          example: {
            title: "One query per line",
            start: "An order page loads the order, then asks for each line item in its own query. You try it with 5 lines. It feels fine.",
            steps: [
              { t: "Count", d: "At 50 lines the page issues about 51 queries. That is the nested shape from [[1.11]], in miniature." },
              { t: "Judge", d: "For a page people open all day, 51 queries is a weak plan. One query that joins the lines, or one batched read, is the acceptable shape. Measure before you add a cache." },
            ],
            end: "You refused \"it worked on five items\" as evidence.",
          },
          exercise: {
            prompt: "Estimate the query count when an order has 50 line items and the code loads each line separately. Say whether that is acceptable for this feature.",
            constraints: [
              "State the count and the rule you used.",
              "Say acceptable or not for a feature people use in the course of a normal order, and why.",
              "You may recommend a join or a batched read. You do not have to build it.",
            ],
            done: "A number, a yes or no, and the growth rule that supports it.",
            rubric: [
              "I estimated the query count at 50 line items.",
              "I said whether that plan is acceptable for this feature.",
              "The reason uses the growth rules from the beginner level or a measurement.",
            ],
            model: [
              { type: "p", text: "One query for the order plus one per line is about 51 queries. That grows linearly with the lines and is the \"loop inside the request\" you can already feel at 50. It is not acceptable as the steady plan for a page on the order path. A single join or a batched read keeps the count constant for this page. A cache is a later option if a measurement says the join is still too slow." },
            ],
          },
        },
      ],
    },
    {
      id: "3.7",
      title: "Observability and junior-scope incidents",
      summary: "One signal that it works, one signal that it fails, and the first steps.",
      why: "A change you cannot see in production is a guess. Juniors are often first to notice, and the first actions decide the size of the damage.",
      lessons: [
        {
          id: "3.7",
          title: "Observability and junior-scope incidents",
          track: "must",
          thread: "Orders",
          concept: [
            { type: "p", text: "Logs, metrics, and traces answer different questions. A log says what happened on this request. A metric says how often something happens. A trace says where the time went." },
            { type: "p", text: "Each change gets one signal that it works and one signal that it fails. Reuse the system's correlation id. Do not invent a second tracing scheme." },
            { type: "p", text: "Do not put unbounded values, such as a user id or raw search text, into metric labels. High-cardinality labels take the monitoring system down. Those details belong in logs when they are justified." },
            { type: "seq", title: "The first minutes", items: [
              { h: "Stop the bleeding", p: "Roll back, disable the path, or reject the bad input." },
              { h: "Write a timeline", p: "What changed, what users see, what you did." },
              { h: "Say it plainly", p: "Impact, current action, and the next update time." },
            ] },
            { type: "p", text: "Afterward, record what broke, why it shipped, and one guard: a test, an alert, or a checklist. The write-up does not assign personal blame." },
          ],
          example: {
            title: "A metric that would have fallen over",
            start: "You want to count failed searches. A colleague suggests a label for the raw search text.",
            steps: [
              { t: "Keep the metric small", d: "`search_failed` with a label for a small set of reasons, such as `empty` or `timeout`. Not the text the person typed." },
              { t: "Put the detail in the log", d: "The log line carries the request id. It carries the query text only if you have a reason and a retention rule. The metric stays countable." },
            ],
            end: "You can see the failure rate. You cannot accidentally create one time series per keystroke.",
          },
          exercise: {
            prompt: "For the coupon change, define one success signal and one failure signal, plus an example log line with a request id and without the coupon code. Then handle a scenario: the deploy doubled failed checkouts. Write the first three actions, the status note, and one post-incident guard.",
            constraints: [
              "The metric labels stay low-cardinality. The coupon code is not a label and not in the log line.",
              "The status note uses plain language: impact, current action, next update time. Keep it short.",
              "One guard. Not a multi-page root-cause essay, and not a list of blame.",
            ],
            done: "Two signals, one log line, three actions, a status note, and one guard.",
            rubric: [
              "I defined one success signal and one failure signal for the coupon change.",
              "The example log line has a request id and does not include the coupon code.",
              "For doubled failed checkouts I wrote the first three actions, a plain status note, and one guard.",
            ],
            model: [
              { type: "p", text: "Success: count of coupons applied. Failure: count of coupon rejections by a small reason set, such as `expired` or `already_used`. Log: `request_id=abc order_id=91 coupon_id=12 result=rejected`. Actions: roll back or disable the coupon path, start a timeline, say what buyers see (checkout failing when a coupon is entered). Status: `Checkout with a coupon is failing at about twice the usual rate. We have disabled the new coupon path. Next update in 30 minutes.` Guard: an alert on the checkout failure rate, or a test that a second redemption fails closed. No names, no essay." },
            ],
          },
        },
      ],
    },
    {
      id: "3.8",
      title: "Collaboration, estimation, and everyday quality",
      summary: "Slices, blockers, and a checklist you actually use.",
      why: "A hidden delay costs more than a wrong early estimate. Junior quality is consistency, and the team feels it in review and in handoff.",
      lessons: [
        {
          id: "3.8a",
          title: "Slices, estimates, and a personal checklist",
          track: "core",
          concept: [
            { type: "p", text: "Break work into visible slices. Estimate the next slice, state the assumption, and revise when the assumption dies. Do not estimate a whole quarter as one number." },
            { type: "p", text: "Raise a blocker early. Include what you already tried and the decision you need." },
            { type: "p", text: "In reviews and status updates, talk about behavior and risk. Disagree on the work with a reason and a suggested alternative." },
            { type: "p", text: "In code you touched, leave one small improvement that stays inside the task: a misleading name, a missing test, a dangerous comment. Do not attach a rewrite." },
            { type: "p", text: "Keep a personal checklist of repeated review comments and apply it before the next review." },
          ],
          example: {
            title: "The estimate that was really a quarter",
            start: "Someone asks how long password reset will take. The honest answer in the room is \"a quarter.\"",
            steps: [
              { t: "Slice", d: "Request a reset. Redeem a token and set a password. Expire tokens. Each slice is reviewable." },
              { t: "Estimate the next one", d: "The request slice is a few days, assuming mail delivery already exists. If that assumption dies, the estimate is revised in the open, not absorbed." },
              { t: "A blocker", d: "`I tried the mail API in the test environment and the token is dropped. I need a decision: use the existing mail path, or is reset blocked on a new one?`" },
            ],
            end: "The team can see the next slice and the assumption. They are not holding a single number that meant \"sometime.\"",
          },
          exercise: {
            prompt: "Split \"add password reset\" into reviewable slices. Mark the risky slice and the assumption that would change the estimate. Then read the two review comments below and write a five-line personal checklist. Show the checklist applied to the next slice's description.",
            constraints: [
              "Each slice can be reviewed in one sitting.",
              "The checklist comes from the sample comments, not from a generic list you already had.",
              "Applying it means you point at a line in the next slice's description and say what the checklist changed.",
            ],
            done: "A slice list with one risk and one assumption, a five-line checklist, and a before-and-after on the next slice's description.",
            snippets: [
              {
                caption: "Sample review comments",
                lang: "text",
                code: `1. Rename this. I don't like the name tmp.
2. This lets a reset token be used twice. I could not find a test that fails on the second redeem.
`,
              },
            ],
            rubric: [
              "Password reset is split into reviewable slices, with the risky slice and the assumption marked.",
              "The checklist has about five lines and responds to the two sample comments.",
              "I showed the checklist applied to the next slice's description.",
            ],
            model: [
              { type: "p", text: "Slices: request a reset without revealing whether the account exists; redeem a single-use token and set the password; expire and revoke tokens. The redeem slice is the risky one. The assumption is that mail delivery already exists. Checklist: names say what the value is; a token is single-use and tested; user-facing errors do not reveal whether the account exists; the description says what was not tested; rollback is named. Applied to the redeem slice: the description stops saying \"handle the token\" and instead says \"the second redeem of the same token fails, and the test is included.\"" },
            ],
          },
        },
        {
          id: "3.8b",
          title: "Pairing so someone else can drive",
          track: "should",
          concept: [
            { type: "p", text: "Pair on a starter task. The newer person drives. You supply context, not keystrokes. You name the risk to watch and the point at which they should call you." },
            { type: "p", text: "Driving means they make the edit. If your hands stay on the keyboard, you have a demonstration, not a pairing." },
          ],
          example: {
            title: "A note sent before the session",
            start: "A newer teammate will add the empty-input rejection on the easy slice. You already know the area.",
            steps: [
              { t: "Context", d: "Tell them which function is the seam and which test file the area already uses. Do not tell them the keystrokes." },
              { t: "Risk and the call", d: "The risk is rejecting a valid blank-optional field. They should call you before changing a validation rule that other commands share." },
            ],
            end: "They can start. You have not taken the keyboard, and they know when to stop and ask.",
          },
          exercise: {
            prompt: "Write the pairing note you would send a newer teammate before they drive the easy slice of password reset. They drive. You supply context.",
            constraints: [
              "Name the easy slice. Do not give them the implementation.",
              "Name the risk to watch and the point at which they should call you.",
              "The note is something you could send before the session, not a transcript of you typing.",
            ],
            done: "A note a newer teammate could use to start, with a risk and a stop-and-call point.",
            rubric: [
              "The note says they drive the easy slice.",
              "It supplies context they cannot see, without prescribing every line.",
              "It names the risk to watch and when they should call me.",
            ],
            model: [
              { type: "p", text: "`You'll drive the request-a-reset slice. The seam is the existing account lookup, and the tests live next to the login tests. We answer the same way whether or not the email is on file. Please don't log the token. Call me before you store a token or change the response for unknown emails. I'll review the approach when the first test is failing for the reason we want.`" },
            ],
          },
        },
      ],
    },
  ],
});
