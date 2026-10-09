registerLevel({
  id: "senior",
  num: "04",
  title: "Senior",
  promise: "Own an area: frame the problem, choose a design, keep it operable, and grow other engineers.",
  audience: "Engineers who already ship reliable changes inside a system and are ready to own an area: its design, its health, and the growth of the people who change it. Scope defines this level, not a title.",
  prerequisites: "Junior outcomes, especially release discipline, data-change sequencing, and incident first response.",
  buildsOn: "Junior work is changing a system safely. Senior work is keeping an area sensible for the next six months, and making it changeable by people who are not you. The unit of work becomes the problem and the area, not the ticket.",
  note: "One path. Must-know lessons open Technical leader. Should-know lessons are marked and can be skipped. Caching and the abuse path on an orders feature are part of the gate.",
  pace: "About 30–45 hours. This is an estimate, not a schedule.",
  canDo: [
    "Frame a problem in outcomes and non-goals, and reject a solution that does not match the evidence.",
    "Propose a design with real options, tradeoffs, and a staged rollout, then land the first stage.",
    "Keep interfaces and stored data compatible while the area changes.",
    "Make operability part of the design: failure behavior, signals, and rollback.",
    "Review for systemic risk and hand a junior an outcome they can own.",
    "Say when a cache is unsafe, and name the abuse path of a feature while the design is still cheap to change.",
  ],
  modules: [
    {
      id: "4.0",
      title: "Placement",
      summary: "An alternate check for people who can already own an area.",
      why: "The gate is the design and the area, not the number of notes you opened.",
      lessons: [
        {
          id: "4.0",
          title: "Check this level",
          track: "core",
          placement: true,
          concept: [
            { type: "p", text: "This check is an alternate way through the gate. Completing it opens Technical leader. Completing every must-know lesson also opens Technical leader." },
            { type: "p", text: "The must-know work is framing, a design with a rollout, a compatible interface, evolving stored data, failure behavior, a staged release, review and delegation, a cache you can refuse, the abuse path of one feature, and a capstone that uses them together." },
          ],
          example: {
            title: "A design note from an area you already own",
            start: "You have written a decision record for a real system. You have not used this site's orders scenario.",
            steps: [
              { t: "Map it", d: "Rewrite the problem as outcomes and non-goals, then the option you refused and why." },
              { t: "The gap", d: "If the note never says what happens when a dependency times out, leave that line unchecked." },
            ],
            end: "The note is evidence. The missing failure mode is still a lesson.",
          },
          exercise: {
            prompt: "Write a short account of an area you have owned, or of the orders designs in this level. Check a line only when the account shows it.",
            constraints: [
              "Include a non-goal and a rollout step.",
              "Include one failure behavior and one abuse with a control.",
              "A line without evidence stays unchecked.",
            ],
            done: "An account someone could review, with unchecked lines pointing at lessons.",
            rubric: [
              "I can frame a problem with constraints and non-goals, and reject a solution that does not match the evidence.",
              "I can compare options, record the decision, and name a staged rollout.",
              "I can keep an interface compatible while callers move, including retries.",
              "I can evolve stored data with expand, migrate, and contract, and give each state one meaning.",
              "I can specify what the design does when a dependency fails, including a signal and a first runbook step.",
              "I can break a migration into shippable steps and name the step where rollback stops being a redeploy.",
              "I can set a budget, name the dominant cost, and name an abuse path with a control.",
              "I can say when a cache is unsafe, including what may be stale and what stays the source of truth.",
              "I can review for systemic risk, including a generated design, and hand someone else an outcome.",
              "I can write a design note and a small function that records a key and its effect in one conditional write.",
            ],
            model: [
              { type: "p", text: "A passing account frames double submission as the problem, refuses a client-only disable, names the step where rollback stops being a redeploy, says reserve times out without retrying a non-idempotent write, and blocks a cache that can outlive a price change. A tool list is not the account." },
            ],
          },
        },
      ],
    },
    {
      id: "4.1",
      title: "Problem framing",
      summary: "Outcomes, constraints, and non-goals before a design.",
      why: "A careful design of the wrong problem is expensive, and seniors are the people asked to start the design.",
      lessons: [
        {
          id: "4.1",
          title: "Problem framing",
          track: "must",
          concept: [
            { type: "p", text: "Write the outcome for a user or an operator, the constraints (time, data, reliability, headcount), and the non-goals." },
            { type: "p", text: "Keep the problem separate from the first design that appeared in a meeting. \"We need microservices\" is not a problem statement. It is a solution that arrived early." },
            { type: "p", text: "Name who is affected and what done looks like in observable terms." },
            { type: "p", text: "Read the current code and prior incidents before proposing structure. Evidence beats analogy." },
            { type: "p", text: "If the evidence is missing, the next step is a question or a measurement, not a redesign." },
          ],
          example: {
            title: "\"We need a cache\" is not the problem",
            start: "A meeting opens with a request to add a cache in front of the order page.",
            steps: [
              { t: "Ask what is slow, for whom", d: "Operators say the order page is slow when an order has many lines. Buyers on small orders have not complained. That is a narrower problem than \"the site needs a cache.\"" },
              { t: "Write non-goals", d: "You are not redesigning checkout. You are not choosing a cache product in this note." },
              { t: "Name the missing evidence", d: "You do not yet know the query count. The next step is the measurement from [[3.7]], not a design for cache invalidation." },
            ],
            end: "The problem is the order page's cost at a realistic number of lines. A cache is one option you have not earned yet.",
          },
          exercise: {
            prompt: "A stakeholder message says \"we need to split the monolith.\" Rewrite it as a problem statement that could be deployment coupling, unclear ownership, or failure isolation. Include the evidence you would require, two non-goals, and two success measures. Where evidence is absent, list the questions that block the design.",
            constraints: [
              "The problem statement does not name a solution as if it were the problem.",
              "Each success measure is observable.",
              "A question blocks the design when you cannot choose among the three problems without it.",
            ],
            done: "A reader can see which problem you are willing to work on, what you are not doing, and which questions you refuse to skip.",
            rubric: [
              "I rewrote the request as one or more problems: deployment coupling, unclear ownership, or failure isolation.",
              "I included the evidence I would require, two non-goals, and two observable success measures.",
              "Where evidence is missing, I listed the questions that block the design.",
            ],
            model: [
              { type: "p", text: "One defensible framing, not the only one: \"Independent changes in checkout and billing cannot ship separately, and a billing failure takes checkout down.\" Evidence you would require: which deploys are blocked on unrelated code, and which incidents spread across both. Non-goals: a new language, and splitting teams before the code boundaries exist. Measures: a checkout fix ships without a billing release; a billing outage does not fail checkout payment-status reads. Blocking question: if the last five incidents were all bad data in one module, failure isolation is the problem and a split may not be. If you cannot get the incident list, you do not have a design yet." },
            ],
          },
        },
        {
          id: "4.1b",
          title: "A requirement from product or design",
          track: "core",
          thread: "Orders",
          concept: [
            { type: "p", text: "A stakeholder message is the previous lesson. A working session with a product manager or a designer is this one. They bring the user outcome and the cases. You bring what the system can and cannot promise." },
            { type: "p", text: "Agree on examples before a design: one normal, one boundary, one failure. Write the non-goal in the room, while changing it is still cheap. \"Also support this other case\" after the design is a new problem, and you name it as one." },
            { type: "p", text: "Say what will stay the same. A designer who thinks the address form can update a shipped order, and a product manager who thinks it cannot, need that sentence before anyone draws a screen." },
          ],
          example: {
            title: "The gift note that grew a second meaning",
            start: "A designer wants a gift note on the order. In the session they also want it to be the delivery instruction when the note mentions a door code.",
            steps: [
              { t: "Examples", d: "Normal: a birthday sentence stored and printed on the slip. Boundary: an empty note leaves the field absent. Failure: a note over the length is rejected and the order still places." },
              { t: "The non-goal", d: "The note is not parsed into a delivery instruction. Door codes stay in the field that already exists. That split is written down before the design." },
            ],
            end: "The session produced examples and a non-goal. It did not produce a design of the wrong problem.",
          },
          exercise: {
            prompt: "You are in a working session about letting the buyer change the delivery address. The product manager wants it any time before delivery. The designer has drawn a form that also edits the gift note. Write the examples you would agree, the non-goal, and what stays the same. Name the question that blocks a design if you cannot answer it in the room.",
            constraints: [
              "One normal example, one boundary, one failure.",
              "The gift note does not ride along unless you give a reason to expand the problem.",
              "What stays the same includes a shipped or delivered order.",
            ],
            done: "A session note the product manager and the designer could both accept as the problem.",
            rubric: [
              "I wrote a normal example, a boundary, and a failure for the address change.",
              "I named a non-goal that keeps the gift note out of this change, or I justified including it.",
              "I named what stays the same, and one question that blocks the design if it is unanswered.",
            ],
            model: [
              { type: "p", text: "Normal: an unshipped order gets a new address and the buyer sees it on the next read. Boundary: a change in the hour the warehouse marks it shipped is rejected. Failure: an empty address is rejected and the old address remains. Non-goal: editing the gift note. What stays the same: delivered orders, and the charge amount. Blocking question: which state, exactly, counts as shipped? Without that, the form is a guess." },
            ],
          },
        },
      ],
    },
    {
      id: "4.2",
      title: "Design and tradeoffs",
      summary: "Options, the hard part, and a decision the next editor can find.",
      why: "Senior impact is the set of choices the team has to live with.",
      lessons: [
        {
          id: "4.2a",
          title: "Options, tradeoffs, and a decision record",
          track: "must",
          thread: "Orders",
          concept: [
            { type: "p", text: "Bring at least two options, plus the option to do nothing or do a smaller thing. For each: benefit, cost, and risk." },
            { type: "p", text: "Name the hard part out loud: consistency, migration, latency, or operational load." },
            { type: "p", text: "Prefer the smallest design that meets the outcome. Complexity is a weekly cost, not a one-time fee." },
            { type: "p", text: "Record the decision and the reason where the next editor will find it: a short design note next to the code, or the team's design log." },
          ],
          example: {
            title: "When to send the receipt mail",
            start: "The outcome is that a buyer receives a receipt after payment. Three options are already in the room: send inside the payment transaction, send from a job after commit, or do nothing new because support will email receipts by hand.",
            steps: [
              { t: "Name the hard part", d: "The hard part is a payment that commits and a mail send that fails. Doing the send inside the transaction couples a flaky dependency to the charge." },
              { t: "Recommend the small design", d: "Commit the payment, then enqueue a receipt. The job retries. Doing nothing keeps a human in the loop at a volume you can show. Sending inside the transaction is rejected because mail downtime would fail charges." },
              { t: "Five lines", d: "Decision, why, what it does not solve (a buyer whose address is wrong), the first rollout step, and where the note lives." },
            ],
            end: "The next editor can find the reason without asking you.",
          },
          exercise: {
            prompt: "Design \"prevent double submission of an order.\" Compare an idempotency key, a unique database constraint, and a client-only disable. Recommend one, state what it does not solve, and name the first rollout step. Add a five-line decision record.",
            constraints: [
              "Include the option of doing the smaller thing, and say why client-only disable is or is not enough.",
              "Name the hard part.",
              "The decision record is five lines and says where it will live.",
            ],
            done: "A recommendation, a gap it does not close, a first rollout step, and a five-line record.",
            rubric: [
              "I compared an idempotency key, a unique constraint, and a client-only disable.",
              "I recommended one, said what it does not solve, and named the first rollout step.",
              "The decision record is about five lines and includes the reason.",
            ],
            model: [
              { type: "p", text: "The hard part is a retry after the order committed and the response was lost. Client-only disable does not see that retry, or a second client. A unique constraint on a client-generated request id, or an idempotency key stored with the first result, both close it. A strong recommendation is the key stored with the first result, with a unique constraint as the backstop so two racing requests cannot both insert. It does not solve a buyer who intentionally places two different orders. First rollout step: accept the key on create-order for one client, and record duplicates you would have written. Decision record, next to the create-order code: we store the key with the first result; client-only disable is not the control; we are not deduping distinct orders; first step is one client; revisit if duplicates remain above the rate you name." },
            ],
          },
        },
        {
          id: "4.2b",
          title: "Build, buy, or operate",
          track: "should",
          concept: [
            { type: "p", text: "For one component, compare a library, a managed service, and an in-house implementation. Judge capability, lock-in, operating burden, and failure handling. Recommend one." },
            { type: "p", text: "Capability is whether it does the job. Lock-in is the cost of leaving, not the monthly price. A store you can rebuild from the order database is cheaper to leave than a vendor format only that vendor can read." },
            { type: "p", text: "Operating burden includes who is paged, what you back up, and what you do when the vendor is down. Failure handling is what the caller is allowed to believe in that moment: failed, unknown, or retry with a key. A managed service you cannot explain in an incident is not free." },
            { type: "p", text: "A recommendation that lists features and skips the pager is incomplete. Say who is woken up, and say the option you did not pick because of that cost." },
          ],
          example: {
            title: "Who runs the queue",
            start: "You need a queue for receipt jobs. The team is small.",
            steps: [
              { t: "Three options", d: "A library inside the app process. A managed queue. A queue you install and operate." },
              { t: "Burden", d: "The library fails when the app fails and gives you no replay. The managed queue has an outage mode you must name. The one you operate pages you for disks and upgrades." },
            ],
            end: "The recommendation includes the operating cost in a paragraph, not only the feature list.",
          },
          exercise: {
            prompt: "Decide whether the idempotency store from the previous lesson is a library, a managed service, or a table you operate. Put the operating cost in one paragraph.",
            constraints: [
              "Compare capability, lock-in, operating burden, and failure handling.",
              "Recommend one.",
              "The paragraph says who is woken up when it fails.",
            ],
            done: "One recommendation and one paragraph of operating cost.",
            rubric: [
              "I compared a library, a managed service, and a table we operate.",
              "I recommended one.",
              "The operating-cost paragraph says what fails and who responds.",
            ],
            model: [
              { type: "p", text: "A table you already operate is often the smallest store: the key and the first result sit in the same database as the order, and the failure mode is the database you already know how to restore. A library that only lives in one process misses a second app instance. A managed service adds lock-in and a second outage domain. Recommend the table unless the order database cannot take the write. Operating cost: the table is backed up with the orders, and the people already on call for the database are the people on call for this. You do not add a new pager." },
            ],
          },
        },
      ],
    },
    {
      id: "4.3",
      title: "Interfaces that survive change",
      summary: "A contract with errors, retries, and a field you will not expose.",
      why: "The interface is the part you can no longer change freely once others depend on it.",
      lessons: [
        {
          id: "4.3",
          title: "Interfaces that survive change",
          track: "must",
          concept: [
            { type: "p", text: "Stable operations, explicit errors, and a written compatibility rule. Expose the operation the caller needs. Do not force every caller to understand your storage row." },
            { type: "p", text: "Evolve with an overlap window, as in [[3.5]]. Count callers before you remove the old behavior. \"We announced it\" is not a migration." },
            { type: "p", text: "Internal interfaces used by several teams deserve the same rule as public ones. Friendship is not a contract." },
            { type: "p", text: "Error semantics belong in the contract: which failures the caller can retry, which are permanent, and which are unknown. A timeout after a possible commit is unknown. Retrying it blindly can double-apply." },
          ],
          example: {
            title: "A version field that leaked",
            start: "An inventory API returns the storage row version \"so clients can be helpful.\"",
            steps: [
              { t: "The caller bug", d: "A client stores the version and sends it back on the next reserve. A legitimate update by another process makes the client's version stale. The client now fails every call, or overwrites a change it never read." },
              { t: "What to expose instead", d: "Expose `reserved` or a specific error: unknown item, not enough stock, conflict. Keep the row version inside the service." },
            ],
            end: "Callers depend on the operation, not on the storage layout.",
          },
          exercise: {
            prompt: "Specify `reserve_inventory`: inputs, success result, errors (unknown item, not enough stock, conflict), and the retry rule when the caller timed out after the reserve may have succeeded. Name one field you will not expose, such as the storage row version, and the caller bug it would create if you did.",
            constraints: [
              "Unknown, after a timeout, is different from \"definitely failed.\"",
              "The retry rule uses an idempotency key or an equivalent you specify.",
              "The hidden field is tied to a caller bug, not just a preference.",
            ],
            done: "A contract a caller could implement against, including the timeout case.",
            rubric: [
              "I specified inputs, the success result, and the errors for unknown item, not enough stock, and conflict.",
              "A timeout after a possible reserve is unknown, and the retry rule does not double-reserve.",
              "I named a field I will not expose and the caller bug it would create.",
            ],
            model: [
              { type: "p", text: "Inputs: sku, quantity, idempotency key. Success: a reservation id and the quantity reserved. Errors: unknown item and not enough stock are permanent. Conflict means the key was reused with a different body. A timeout is unknown: the caller retries with the same key, and the service returns the original reservation if it landed. Do not expose the storage row version. If you do, clients will send it back and fail whenever another writer advanced the row, which is a bug the client cannot fix because it does not own the row." },
            ],
          },
        },
      ],
    },
    {
      id: "4.4",
      title: "Privacy and personal data",
      summary: "Collect less, delete on purpose, and say who may see a record.",
      why: "Logs and retention already touch this. The area owner still has to decide what the order is allowed to remember.",
      lessons: [
        {
          id: "4.4",
          title: "Privacy and personal data",
          track: "core",
          thread: "Orders",
          concept: [
            { type: "p", text: "Personal data is data about a person: a name, an email, an address, a payment instrument, and an identifier that can be linked to that person. An order id is personal data when it points at a buyer's order. Amount, currency, and a state that does not name the person can remain for an accounting window you state. Collect the smallest set that the order needs to ship and to support. A field you might want later is not a reason to store it now." },
            { type: "p", text: "Say who may see what. The buyer sees their order. A packer sees the address and not the full payment instrument. An analyst sees counts, not a list of streets, unless a named job requires the streets and has a retention limit. [[2.8]] already kept the phone number out of the log. The same habit applies to the address." },
            { type: "p", text: "A deletion request removes or irreversibly detaches the personal data you do not have a duty to keep. What you must keep, such as a charge amount and date for a window you state here, stays, and the request is answered by saying what remains and why. A later lesson on evolving stored data uses that same window. Deletion is not \"we dropped the table.\"" },
            { type: "p", text: "The order row is not the only copy. Logs, backups, analytics, caches, and event payloads can still hold the address. Blanking the row is the first step. The rule also says how long those copies live, and that a new read does not return the personal fields. A backup you cannot edit today is named, with the date it ages out." },
            { type: "p", text: "Write the rule next to the data, the way a compatibility rule sits next to an interface. A later editor should not have to guess whether the gift note is personal data. It is, if it can name a person or a place." },
          ],
          example: {
            title: "The address outlives the order",
            start: "A buyer asks you to delete their data. Orders from last year still hold the delivery address. Accounting must keep the charge amount and the date for seven years.",
            steps: [
              { t: "Split the record", d: "Amount, currency, and date stay for seven years. The street, the gift note, the buyer email, and the order id that points at the buyer are personal. If that id is the link back to the person, replace it with an accounting reference that does not identify them, or state the duty that requires keeping the link." },
              { t: "Delete and record", d: "Blank those fields and write a marker that a deletion ran. A second request finds the marker and does not fail. Logs, the cache, analytics, and event payloads stop returning the address. Backups age out on the date you name." },
            ],
            end: "The buyer can be told what remains and why. The address is gone from new reads. The charge amount is not.",
          },
          exercise: {
            prompt: "For the orders area, list the fields a placed order stores. Mark which are personal, including any identifier that points at the buyer. Write the rule for who may see the address, and the steps for a deletion request that arrives while you must still keep the charge for a stated window. Name the other copies of the personal data and how long they may keep it.",
            constraints: [
              "Minimization: name one field you will not add, and why.",
              "The address rule names at least two roles and what each may see.",
              "The deletion steps are safe to run twice, they say what remains, and they name logs, backups, analytics, caches, and event payloads.",
            ],
            done: "A field list, a visibility rule, and a deletion sequence someone else could follow.",
            rubric: [
              "I marked personal fields, including an order id linked to a person, and named one field I will not store.",
              "I said who may see the address and who may not.",
              "The deletion request removes personal fields from new reads, keeps the charge for a stated reason, and is safe to run twice.",
              "I named the other copies and how long they may keep the personal data.",
            ],
            model: [
              { type: "p", text: "Personal: buyer email, delivery address, gift note, and the order id while it points at that buyer. Amount, currency, and a state that does not name the person can stay. Do not store the card number. The buyer and the packer may see the address until delivery. An analyst sees counts. Support may see the address for an open order and not after deletion. Deletion blanks email, address, and gift note, replaces the order id with an accounting reference that does not identify the buyer, writes `deleted_at`, and leaves amount and date for seven years. A second run sees the marker and stops. Logs and the cache drop the address now. Analytics and event payloads are rebuilt without it. Backups age out on a date you name, and the reply to the buyer says so." },
            ],
          },
        },
      ],
    },
    {
      id: "4.5",
      title: "Data evolution at area scale",
      summary: "Writers, readers, backfills, and one meaning per state.",
      why: "Area owners spend more time evolving data than inventing algorithms. Drift and ambiguous states cause the slow incidents.",
      lessons: [
        {
          id: "4.5a",
          title: "Evolving stored data",
          track: "must",
          thread: "Orders",
          concept: [
            { type: "p", text: "A schema change is a product change. Plan writers, readers, and backfills, building on the expand-migrate-contract sequence from [[3.4]]." },
            { type: "p", text: "Put a constraint in the database when it must always hold, such as uniqueness or a foreign key. Keep a rule in the application when it is a workflow that legitimately changes." },
            { type: "p", text: "One source of truth. A sync that can be rebuilt is safer than two stores that both accept writes. Dual-write without a reconciliation plan will drift." },
            { type: "p", text: "Delete and archive on purpose: retention, privacy requests, and the ability to restore a mistake within a stated window. [[4.4]] is the rule for what a deletion request removes and what a duty to keep will leave behind." },
          ],
          example: {
            title: "Two order tables that both accept writes",
            start: "Checkout writes `orders`. A new billing service also writes `orders_v2`. A job copies one way, most of the time.",
            steps: [
              { t: "Name the drift", d: "A failed copy leaves a paid order in one table and a draft in the other. Support refunds the wrong one." },
              { t: "Pick a source of truth", d: "Checkout remains the source of truth for the order. Billing reads a stream it can rebuild. It does not accept its own conflicting writes to order status." },
            ],
            end: "There is one writer for status. The copy can be thrown away and rebuilt.",
          },
          exercise: {
            prompt: "A status string has acquired the meanings draft, paid, shipped, canceled, and refunded, and canceled orders were sometimes stored as `deleted`. Plan an explicit state model: transition rules and the expand-migrate-contract steps. State the retention rule for refunded orders.",
            constraints: [
              "Each state has one meaning. `deleted` is not a synonym for canceled unless you prove it on the rows.",
              "The migration follows expand, migrate, contract.",
              "Retention says how long a refunded order can be restored, and what happens after.",
            ],
            done: "A reader can see allowed transitions, the migration order, and how long a refunded order stays restorable.",
            rubric: [
              "I wrote transition rules for draft, paid, shipped, canceled, and refunded.",
              "The migration is expand, then migrate, then contract, and old rows remain readable during the transition.",
              "I stated a retention rule for refunded orders, including a restore window.",
            ],
            model: [
              { type: "p", text: "Draft may become paid or canceled. Paid may become shipped, canceled, or refunded. Shipped may become refunded. Canceled and refunded are terminal. `deleted` is not a state. Expand: add an explicit status column, still accepting the old string. Migrate: map old values, and map `deleted` only where a comparison shows the order was canceled rather than removed for a privacy request. Contract: stop writing the old string once readers use the new column. Retention: keep refunded orders restorable for a window you name, such as 90 days, then archive without the payment secret. A privacy deletion is a different path from cancel, and it does not reuse `deleted` as a status." },
            ],
          },
        },
        {
          id: "4.5b",
          title: "When one word means five states",
          track: "should",
          thread: "Orders",
          concept: [
            { type: "p", text: "If one status field means five different things, the words are wrong. Rename the model so each state has one meaning, and show that old and new interpretations match on real rows." },
            { type: "p", text: "The categories come from fields already on the row: a cancel reason, an erasure timestamp, a refund date. A new name with no field behind it is a guess. The comparison job lists ids where the new status does not match those fields." },
            { type: "p", text: "A comparison query or job is the proof. A meeting where everyone agrees on the words is not. Ten hand-checked rows are a spot check. They are not a substitute for the full list." },
            { type: "p", text: "A disagreement list that is not empty stops the contract. Fix the mapping or the rows first. Contracting over a non-empty list writes the ambiguity into the new column." },
          ],
          example: {
            title: "Deleted, counted two ways",
            start: "Fifty rows have status `deleted`. Support says they were canceled. The privacy job says some were erasure requests.",
            steps: [
              { t: "Split the meanings on the rows", d: "Rows with a cancel reason and no erasure flag are canceled. Rows with an erasure flag are not canceled orders. They are gone on purpose." },
              { t: "Prove it", d: "A query lists ids in the old set that the new mapping classifies differently from a hand review of ten rows. You do not contract until that list is empty or explained." },
            ],
            end: "The word `deleted` is retired because it was doing two jobs, and the rows agree.",
          },
          exercise: {
            prompt: "Using the status mess from the previous lesson, show how you would prove old and new meanings agree, especially for canceled orders stored as `deleted`. Describe the comparison query or job.",
            constraints: [
              "Use real-row categories, not only the new names.",
              "The comparison can fail. Say what you do when it does.",
              "Do not contract the old column in this lesson.",
            ],
            done: "A comparison a teammate could run, and a stop rule when old and new disagree.",
            rubric: [
              "I separated at least two meanings that used to share one word, using fields on the row.",
              "I described a comparison query or job that lists disagreements.",
              "I said what happens when the comparison is not empty.",
            ],
            model: [
              { type: "p", text: "Classify `deleted` plus a cancel reason and no erasure timestamp as canceled. Classify `deleted` plus an erasure timestamp as a privacy deletion, which is outside the status model. The job emits ids where the new status does not match that rule. If the list is not empty, fix the mapping or the rows before any contract step. Ten hand-checked rows are the spot check. They are not a substitute for the full comparison." },
            ],
          },
        },
      ],
    },
    {
      id: "4.6",
      title: "Reliability and operability",
      summary: "Failure behavior, a signal, and a runbook someone else can use.",
      why: "A design that works only when every dependency is healthy is a demo.",
      lessons: [
        {
          id: "4.6a",
          title: "Failure, signals, and a runbook",
          track: "must",
          concept: [
            { type: "p", text: "Failure modes for the design: dependency down, bad deploy, bad data, overload. For each, the behavior is fail fast, retry with a limit and backoff, or degrade one feature." },
            { type: "p", text: "Timeouts on every remote call. Bounded retries. Do not retry a non-idempotent write unless you have an idempotency strategy from [[4.3]]." },
            { type: "p", text: "An SLO in plain language: the measurement, the target, and the consequence of missing it (page, ticket, or accepted risk)." },
            { type: "p", text: "A runbook the on-call engineer can use: how to tell it is this failure, how to stop the bleeding, who decides. Link it from the alert." },
          ],
          example: {
            title: "Receipt mail is allowed to lag",
            start: "Payment has committed. The mail provider is down.",
            steps: [
              { t: "Degrade one feature", d: "The charge stands. Receipt mail retries with a limit and backoff. Checkout does not fail because mail failed." },
              { t: "The signal", d: "The SLO is plain: 99 percent of receipts leave within 15 minutes. Missing it opens a ticket, not a page, unless the backlog is growing without bound. The alert links the runbook." },
              { t: "First runbook step", d: "Check the queue depth and the provider status. Do not replay the charges." },
            ],
            end: "The design says what still works when mail does not, and the on-call engineer does not have to invent that at night.",
          },
          exercise: {
            prompt: "For `reserve_inventory`, specify behavior when the database times out and when a retry arrives after a successful reserve whose response was lost. Define one alert and the first runbook step.",
            constraints: [
              "The timeout case says what the caller should believe: failed, or unknown.",
              "The lost-response retry must not create a second reservation.",
              "The alert is something an on-call engineer can see, and the runbook's first step is concrete.",
            ],
            done: "Two behaviors, one alert, and a first step that does not make the incident worse.",
            rubric: [
              "I specified reserve behavior when the database times out.",
              "I specified behavior when a retry arrives after a reserve whose response was lost.",
              "I defined one alert and the first runbook step.",
            ],
            model: [
              { type: "p", text: "A database timeout after the reserve may have committed is unknown, not a clean failure. The caller retries with the same idempotency key. If the row exists, return it. If it does not, reserve once. Do not reserve again because the client is impatient. Alert: the rate of unknown reserve results, or reserve errors, over a threshold you state. First runbook step: look up the idempotency key before anyone retries by hand. The SLO in one sentence: successful reserves complete within a second you name, and missing that target pages if checkout is blocked." },
            ],
          },
        },
        {
          id: "4.6b",
          title: "A blameless review",
          track: "should",
          concept: [
            { type: "p", text: "Facilitate a blameless review. Timeline, contributing factors, one class of failure to remove, and a habit or guard that changes. Decline a thirty-item action list." },
            { type: "p", text: "Blameless means the action is a guard, not a person. Contributing factors are conditions: a timeout treated as a clean failure, a missing key, a manual retry on top. Character is not a factor you record." },
            { type: "p", text: "The junior write-up is the first account of what users saw. This review decides the habit. It does not collect a second copy of the timeline and stop there." },
            { type: "p", text: "Extra ideas go to a parking list. The parking list is not a commitment. A list of thirty actions is a way to finish none, and naming a person as the action item is the blame you declined." },
          ],
          example: {
            title: "A review that ends in one habit",
            start: "Mail retries ran without a limit and filled the queue. Nobody is the villain.",
            steps: [
              { t: "Timeline", d: "When the provider failed, when retries started, when the queue alert fired, when someone capped the retries." },
              { t: "One class", d: "Unbounded retries of a side effect. The guard is a retry limit, already the design rule, now enforced in review for new jobs." },
              { t: "Decline the rest", d: "A list of thirty improvements is a way to finish none. Park them." },
            ],
            end: "The team leaves with one class of failure and one habit. People are not the action items.",
          },
          exercise: {
            prompt: "Write the agenda and the expected output of a review after a bad retry duplicated reservations.",
            constraints: [
              "Include a timeline and contributing factors.",
              "The output is one class of failure and one habit or guard.",
              "Say what you will do with the other ideas that come up.",
            ],
            done: "An agenda someone else could facilitate, and an expected output that is short on purpose.",
            rubric: [
              "The agenda has a timeline and contributing factors, and it is blameless.",
              "The expected output names one class of failure and one habit or guard.",
              "I declined a long action list and said where extra ideas go.",
            ],
            model: [
              { type: "p", text: "Agenda: what users saw, a timeline of the retry, what we believed about the first reserve, and the factors (timeout treated as failure, no idempotency key, a manual retry on top). Output: the class is \"retry of a write that might have succeeded.\" The habit is that unknown results retry only with the same key, and the runbook's first step is the key lookup. Further ideas go to a parking list. They are not commitments." },
            ],
          },
        },
      ],
    },
    {
      id: "4.7",
      title: "Delivery strategy",
      summary: "Ship the risky assumption first, and know the last reversible step.",
      why: "A correct design that cannot be shipped in stages will stall the area or land as one irreversible weekend.",
      lessons: [
        {
          id: "4.7",
          title: "Delivery strategy",
          track: "must",
          thread: "Orders",
          concept: [
            { type: "p", text: "Slice by risk. Prove the risky assumption with a thin vertical change before building the full path." },
            { type: "p", text: "Use a dark launch, a flag, or a small audience when rolling back the data is hard. Each mechanism needs a decision point: continue, fix, or back out." },
            { type: "p", text: "Protect the merge rate. A branch that cannot integrate for weeks is a second product." },
            { type: "p", text: "The plan says which step is the last one where rollback is still a redeploy." },
          ],
          example: {
            title: "The risky piece of receipts",
            start: "The full design is a template system, a preference center, and retries. The risky assumption is that the provider will accept your payload.",
            steps: [
              { t: "Thin slice", d: "Send one plain receipt for one internal order. No preferences. Merge it this week." },
              { t: "Decision point", d: "If the provider rejects the payload, fix that before the template system. If it works, continue." },
              { t: "Last redeploy", d: "Rollback is a redeploy until you start writing a new receipt status that old code cannot read. Name that step before you reach it." },
            ],
            end: "The risky assumption is tested in production while rollback is still a redeploy.",
          },
          exercise: {
            prompt: "Break the status-model migration from [[4.5]] into shippable steps. Mark the step where rollback stops being a redeploy, what you will watch at that step, and the decision rule for backing out.",
            constraints: [
              "The first step is thin enough to merge on its own.",
              "Name the step where old code can no longer read the data.",
              "The decision rule is checkable. \"If it feels bad\" is not a rule.",
            ],
            done: "An ordered list, a marked point of no easy return, a signal to watch, and a back-out rule.",
            rubric: [
              "The migration is a sequence of shippable steps, not one branch.",
              "I marked the step where rollback stops being a redeploy and what I will watch there.",
              "The decision rule for backing out is specific.",
            ],
            model: [
              { type: "p", text: "Steps: add the new column and write both (rollback is still a redeploy, old code ignores the column); backfill in batches and run the comparison job; switch readers to the new column behind a small audience; stop writing the old string; drop the old string. Rollback stops being a redeploy when readers depend on the new column and writers stop producing the old one. Watch the comparison mismatch count. Back out if mismatches rise after the reader switch: restore the old reader path before you drop anything. A branch that holds all five steps is a second product. Merge the first step alone." },
            ],
          },
        },
      ],
    },
    {
      id: "4.8",
      title: "Technical debt",
      summary: "Name it, size it, and give it a trigger.",
      why: "An owned area accumulates debt. A portfolio bucket later is not a substitute for naming the debt while you own it.",
      lessons: [
        {
          id: "4.8",
          title: "Name, size, and pay down debt",
          track: "core",
          thread: "Orders",
          concept: [
            { type: "p", text: "Technical debt is a named shortcut that charges interest: extra time on every later change, or a failure you already know how to hit. \"The code is old\" is not a name. \"Order status is one string that means five states, and canceled was sometimes stored as deleted\" is a name." },
            { type: "p", text: "Size it in the currency of the area: people-weeks to pay it down, or the incidents and the slow changes it causes. A coarse number is enough if you say what it counts. An uncounted debt becomes a mood." },
            { type: "p", text: "Pay it down when a trigger hits: a date, a scale, a change that would otherwise touch the mess, or a contract. Without a trigger it is a wish. The trigger belongs on the same list as features. A later level will ask you to keep that list in one place. Here you write the debt so that list has something real to hold." },
            { type: "p", text: "Do not pay it down by hiding a rewrite inside the next feature. A slice that leaves the area safer, with the behavior pinned, is the payment. [[3.3b]] is that move at a smaller scale." },
          ],
          example: {
            title: "The status string has a balance",
            start: "Every order change takes longer because status is a free-form string. Last quarter a refund treated a deleted row as a canceled order.",
            steps: [
              { t: "Name and size", d: "Debt: one status field, five meanings, plus deleted. Size: about two people-weeks to give each state one meaning, and one incident already paid as interest." },
              { t: "Trigger", d: "The next change that writes a new status, or the end of the quarter, whichever comes first. Until then it is on the list, not in a side conversation." },
            ],
            end: "The debt has a name, a size, and a trigger. It is no longer a complaint.",
          },
          exercise: {
            prompt: "Pick one debt in the orders area: the status string, the per-line query you already counted, or a dual write you invent from the lessons. Name it, size it, give it a trigger, and say the first slice you would pay. Say what you will not rewrite in that slice.",
            constraints: [
              "The name is specific enough that a newcomer can find it in the code or the data.",
              "The size says what it counts: people-weeks, incidents, or change delay.",
              "The trigger is a date, a scale, or the next change that would touch it.",
            ],
            done: "A debt entry you could put on a shared list.",
            rubric: [
              "I named a specific debt and sized it in a unit I defined.",
              "I gave it a trigger that would move it onto the list for real.",
              "The first slice pays part of it down and names what I will not rewrite.",
            ],
            model: [
              { type: "p", text: "Debt: the order page issues one query per line. Size: the earlier count still stands, about 51 queries at 50 lines, and every new line-item feature pays that. Trigger: the next change to the order page, or 20 requests per second, whichever first. First slice: one batched read, with the current totals pinned by a test. I will not add a cache in that slice, and I will not rewrite checkout." },
            ],
          },
        },
      ],
    },
    {
      id: "4.9",
      title: "Performance, cost, and security constraints",
      summary: "A budget, the dominant cost, and the abuse path.",
      why: "Seniors are expected to prevent both a rewrite for speed and a query that will not survive real data, and to close the abuse path while the data model is still cheap to change.",
      lessons: [
        {
          id: "4.9a",
          title: "Budgets, cost, and abuse paths",
          track: "must",
          thread: "Orders",
          concept: [
            { type: "p", text: "Set a budget before optimizing: latency, throughput, or money. Measure the current path. Find the dominant cost with evidence: query count, payload size, chatty calls, accidental nested work." },
            { type: "p", text: "Fix the worst offender and measure again. Extra complexity that saves a small constant factor needs a reason tied to the budget." },
            { type: "p", text: "Security is a design constraint for this feature: spoofed caller, tampered price or quantity, cross-tenant read, replay. Authorization sits next to the object, not only at the front door. Least privilege for credentials. An audit record for sensitive actions (who, what, when), stored without the secret itself." },
            { type: "p", text: "Know how this area hears about a critical flaw in a dependency and who may ship the bump." },
          ],
          example: {
            title: "Ten thousand queries, then a bound",
            start: "Export my orders reads one query per order. The budget is a job that stays under a row cap you set.",
            steps: [
              { t: "Evidence", d: "At 10,000 orders the export issues about 10,000 queries. That is the dominant cost. You have not guessed. You counted. The order page's per-line queries were already counted earlier. This is a different shape." },
              { t: "Fix and refuse", d: "One query with a limit, or an async job with a row cap, brings the count under the budget. Caching the whole export would also be faster and would copy personal data. You refuse it." },
            ],
            end: "The export meets the budget with the smallest extra mechanism. The cache of the export is written down as a refusal, with the reason.",
          },
          exercise: {
            prompt: "An export reads one query per order. At 10,000 orders, estimate the query count, recommend a bounded read, and state the complexity you refused and why. Then threat-model \"export my orders\": two abuses (another tenant's data, and exports large enough to degrade the database) and a control for each.",
            constraints: [
              "The performance recommendation is tied to a budget, even if the budget is one sentence.",
              "The refused complexity is named, not just \"something fancier.\"",
              "Authorization for the export is next to the order, not only a login check. The large export has a bound.",
            ],
            done: "A query count, a recommendation, a refusal, two abuses, and two controls.",
            rubric: [
              "I estimated the query count for the export and recommended a bounded read.",
              "I named a complexity I refused, such as caching the export, and why.",
              "I named two abuses of export and a control for each.",
            ],
            model: [
              { type: "p", text: "Ten thousand orders means about 10,000 queries. Recommend one query with a page size, or an async job with a row cap. Refuse a cache of the export until that plan misses a budget you state, because the cache would copy personal data and can serve another tenant's rows. Export abuses: another tenant's orders, controlled by checking the owner on the query itself; an export large enough to degrade the database, controlled by a page size or an async job with a row cap. Audit who exported what and when, without storing the order contents again as a secret. A critical dependency flaw is handled by the person allowed to ship a bump, using the dependency list from [[2.10]]." },
            ],
          },
        },
        {
          id: "4.9b",
          title: "A capacity sketch",
          track: "should",
          concept: [
            { type: "p", text: "Requests per second times work per request, compared with a limit you can explain: connections, rows read, or a vendor quota. The sketch exists to catch absurd designs, not to replace measurement." },
            { type: "p", text: "Write the multiplication in the open. Two export requests a second, each reading ten thousand orders one query at a time, is about twenty thousand queries a second before any other feature. If the limit you can explain is two hundred simple queries a second, the design is already absurd. You do not need a benchmark to refuse it. You need the benchmark later, on the shape you kept. The order page's fifty-one queries were counted earlier. This sketch uses the export." },
            { type: "p", text: "The limit has to be something you could defend: a connection pool, a row budget, a vendor quota, or a number you measured last month and dated. \"The database is big\" is not a limit. A sketch with no limit is a mood." },
            { type: "p", text: "Say what the sketch cannot tell you. It cannot tell you the latency, the lock, or the one query that is expensive on its own. Those are measurements. The sketch's job is to stop a design that cannot survive the napkin from becoming a project. [[1.11]] is the growth intuition. [[2.15]] is the clock. This page is the napkin between them." },
          ],
          example: {
            title: "A sketch that says no",
            start: "Two export requests per second, 10,000 queries each, and a database you believe can do about 200 simple queries per second.",
            steps: [
              { t: "Multiply", d: "2 times 10,000 is about 20,000 queries per second, before any other feature." },
              { t: "Compare", d: "That is far past the limit you stated. The design is absurd on a napkin. A single bounded query per export is 2 queries per second. You still measure, and you do not build the per-order loop while hoping." },
            ],
            end: "The sketch killed a design. It did not produce a precise capacity number.",
          },
          exercise: {
            prompt: "Sketch the per-order export at 2 requests per second with 10,000 orders, against a limit you can explain. Say whether that version survives the napkin.",
            constraints: [
              "Show the multiplication.",
              "The limit is connections, rows, or a quota, and you say which.",
              "Say what the sketch cannot tell you.",
            ],
            done: "A short sketch with a yes or no, and one limit you could explain to a teammate.",
            rubric: [
              "I multiplied requests per second by work per request.",
              "I compared that with a limit I can explain.",
              "I said the sketch catches an absurd design and does not replace a measurement.",
            ],
            model: [
              { type: "p", text: "2 requests times 10,000 queries is about 20,000 queries per second. If the database budget for this export is 200 queries per second, the per-order export does not survive the napkin. One bounded query per request is 2 queries per second, which fits that budget. The sketch does not tell you the real latency. It tells you not to ship the per-order loop and then measure your way out of it." },
            ],
          },
        },
      ],
    },
    {
      id: "4.10",
      title: "Caching",
      summary: "A copy that can be wrong, and when to refuse one.",
      why: "A review that blocks a cache on staleness needs a shared meaning for what the cache is.",
      lessons: [
        {
          id: "4.10",
          title: "Caching",
          track: "must",
          thread: "Orders",
          concept: [
            { type: "p", text: "A cache stores a copy of a result so the next reader can skip the expensive read. The copy can be wrong the moment the source changes. Staleness is that gap. It is the property of a cache, not a bug you discover later." },
            { type: "p", text: "Decide what may be stale, and for how long. A product title can be minutes old. A price or a stock count that decides whether you take money cannot be as old as a title, unless you re-check the source at the moment of the charge or the reservation. The source of truth stays the source. The cache is a hint." },
            { type: "p", text: "Invalidate on purpose: a time limit, or an event that says the source changed. A missed event leaves the old copy. Say what you do then. Serving the stale value, or refusing to serve it and reading the source, are both policies. Silence is not." },
            { type: "p", text: "Refuse a cache when you do not have evidence the honest read is too slow, or when a stale value causes a failure you will not accept. A join that meets the budget does not need a cache to look sophisticated. [[4.9]] is that budget. The review lesson will ask you to block a migration that cannot roll back and a missing owner check. A stale cache is the same kind of block." },
          ],
          example: {
            title: "The price that outlived the change",
            start: "Checkout caches the price it showed the buyer. A merchandiser changes the price. The cache still holds the old one.",
            steps: [
              { t: "Name the staleness", d: "The buyer can be charged the old price until the cache entry dies. If that is unacceptable, the charge must read the source, not the cache." },
              { t: "The policy", d: "The page may show a cached price for sixty seconds. The charge reads the current price and rejects the order if it differs from what the buyer confirmed. A missed invalidation then delays the page, and it does not mis-charge." },
            ],
            end: "The cache has a job and a limit. The charge does not trust it.",
          },
          exercise: {
            prompt: "A design caches the inventory count shown on the product page and uses that same count to decide whether `reserve_inventory` succeeds. Say what may be stale, how it is invalidated, and whether you accept this design. If you refuse it, say what you would cache instead, or why you would cache nothing yet.",
            constraints: [
              "Separate the display from the reservation.",
              "Name the failure when the cached count is wrong.",
              "Tie the refusal or the acceptance to a budget or to a failure you will not accept.",
            ],
            done: "A staleness policy, and a yes or no on using the cache for the reservation.",
            rubric: [
              "I said how stale the displayed count may be and what invalidates it.",
              "I refused to let the cached count decide whether the reservation succeeds, or I named the failure I accept if I did not refuse.",
              "The source of truth for stock stays the reservation, not the cache.",
            ],
            model: [
              { type: "p", text: "The page may show a count up to thirty seconds old, invalidated when a reservation commits or when the time limit hits. A missed event shows a stale count and the next reservation corrects it. The reservation itself reads the source. Using the cache to decide success can reserve stock you do not have, or refuse stock you do. That failure is not acceptable, and you do not need a cache there until a measurement says the source read missed a budget. The cache is a hint for the page. It is not the inventory." },
            ],
          },
        },
      ],
    },
    {
      id: "4.11",
      title: "Review and mentoring",
      summary: "Systemic risk in review, and an outcome someone else can own.",
      why: "Review and delegation are the highest-leverage writing a senior does. Personal heroics cap the team at one person.",
      lessons: [
        {
          id: "4.11",
          title: "Review and mentoring",
          track: "must",
          concept: [
            { type: "p", text: "Review design risk, test gaps, and operability gaps. Leave formatting to automation." },
            { type: "p", text: "For a large change, review the approach before a thousand lines exist." },
            { type: "p", text: "A blocking comment names the failure mode and the question that would resolve it. A non-blocking comment is labeled as a preference." },
            { type: "p", text: "Track repeated defects in the area and turn them into a checklist or a test template." },
            { type: "p", text: "Delegate an outcome, not a line-by-line prescription. Give the context a junior cannot see: users, history, constraints, and the risk boundary. Let them choose the design inside that boundary. Intervene when the risk shows up, not when the style differs." },
            { type: "p", text: "Feedback names a behavior and its effect, close to the work." },
            { type: "p", text: "One area must not be understandable by only you. Decision notes, a paired scary change, then the next change handed over, are the practical test." },
            { type: "p", text: "Generated code gets the same review. A draft that ships a migration that cannot roll back, or that skips an owner check, is a systemic risk even when the diff is tidy. A stale cache, the question from the caching lesson, is the same kind of block. Ask it of a tool the same way you ask it of a teammate." },
          ],
          example: {
            title: "A blocking comment with a question",
            start: "A generated design adds a required address column in one step, and the export of orders does not check the owner. The author has written the approach, not a thousand lines.",
            steps: [
              { t: "Block on the failure mode", d: "`Old orders fail to read the moment this column is required, and there is no expand step to roll back to. What do readers do before the backfill finishes? I can't approve the approach until that has an answer. The export also returns any order id the caller supplies. Where is the owner check?`" },
              { t: "Label the preference", d: "`Preference: I would keep the export next to the order module rather than in a new service. Not blocking.`" },
            ],
            end: "The author knows the questions that unblock the review, and they are free to ignore your taste.",
          },
          exercise: {
            prompt: "Review a generated design that adds a required column in one migration and exports orders without an owner check. Write one blocking comment about the migration or the missing owner check, including the question that would unblock it, and one non-blocking suggestion. Then take a task you would normally do yourself and write the context note, the risk to watch, and the point where you want to be consulted. Leave the design choice to the other engineer.",
            constraints: [
              "The blocking comment names the failure mode and a question.",
              "The non-blocking comment is labeled as a preference.",
              "The delegation note does not prescribe the design. It does name users, a constraint, and a risk boundary.",
            ],
            done: "Two review comments and a handoff note someone else could start from.",
            rubric: [
              "The blocking comment is about a migration that cannot roll back or a missing owner check, and it includes the question that would unblock it.",
              "The other comment is labeled as a preference.",
              "The handoff gives context and a consult point, and it leaves the design choice open.",
              "I would block the same failure if a tool had drafted the design, and I would also block a stale cache.",
            ],
            model: [
              { type: "p", text: "Blocking: `A required column with no expand step fails every old order read, and a redeploy cannot put the column back to optional once writers depend on it. What do readers return before the backfill finishes? The export also needs an owner check on the order, not only a login check. I need both before I can review an implementation.` Preference: `I would name the export the way the order module is named. Not blocking.` Handoff: `Buyers have been shown another tenant's orders twice this quarter. The constraint is that a migration stays reversible until readers require the new column, and the owner check sits on the query. Please own the approach. The risk is a required column or an export that trusts the caller. Consult me before either of those. A stale cache would get the same block. The design inside that boundary is yours.`" },
            ],
          },
        },
      ],
    },
    {
      id: "4.12",
      title: "Area capstone",
      summary: "One design that uses the level's must-know outcomes together.",
      why: "Separate notes do not show that framing, rollout, failure, and review are one decision.",
      lessons: [
        {
          id: "4.12",
          title: "Stop a double shipment",
          track: "must",
          thread: "Orders",
          concept: [
            { type: "p", text: "This is the finished piece for the level. The scenario is a retried `charge_succeeded` event that can create two shipments. Any language is fine for the small function. The design note is the senior work." },
            { type: "p", text: "Bring the must-know outcomes into one place: the problem and its non-goals, two options, a compatibility window, what happens when the write fails, the step where rollback stops being a redeploy, a cache you refuse or accept, and an abuse with a control." },
            { type: "p", text: "The hard step is the race. Two workers can both see no shipment yet. A lookup followed by a later insert loses that race. The function records the dedupe key and the shipment in one conditional write, so the second worker finds the key and does not insert." },
          ],
          example: {
            title: "A note that fits on two pages",
            start: "The problem is double shipment after a retried charge event. You will not redesign the warehouse.",
            steps: [
              { t: "Options", d: "A conditional insert of the key with the shipment, a lock around a check-then-insert, or a client that promises not to retry. You recommend the conditional insert. The client promise is refused. The lock is the option you did not pick." },
              { t: "The function", d: "In one transaction, insert the shipment only when `charge:<charge_id>` is absent, and insert that key in the same statement's transaction. A second worker's insert conflicts and returns the stored shipment id. A timeout after the commit is unknown, and the retry hits the key." },
            ],
            end: "A reader can see the problem, the refusal, the failure mode, and the first shippable step.",
          },
          exercise: {
            prompt: "Write a design note for stopping a second shipment when `charge_succeeded` is delivered twice, and implement the conditional write in any language. Include a non-goal, two other options you did not pick, the data compatibility window, the behavior when the database times out, the last step where rollback is still a redeploy, whether a cache is involved, and one abuse with a control. Hand the first slice to someone else in a short context note.",
            constraints: [
              "The function records the dedupe key and the shipment in one conditional write. A lookup followed by a later insert does not pass.",
              "A second worker returns the first shipment id and does not insert another row.",
              "The context note leaves the warehouse workflow to the other person and names the risk you still want to see.",
            ],
            done: "A note and a function another engineer could review in one sitting.",
            rubric: [
              "The note frames double shipment, names a non-goal, and compares at least two options besides the one I recommend.",
              "The function records the key and the shipment in one conditional write, and the note covers a timeout, the compatibility window, and the last redeploy-safe step.",
              "I accepted or refused a cache with a reason, named one abuse and a control, and wrote a handoff that leaves a design choice open.",
            ],
            model: [
              { type: "p", text: "Problem: a retried charge event creates two shipments. Non-goal: redesigning the warehouse, and changing the delivery address. Options: one transaction that inserts the shipment only when the charge key is absent, a lock around a check-then-insert, or a client that promises not to retry. Recommend the conditional insert. The function commits the key and the shipment together and returns the stored id when the key conflicts. Old charge events with no key stay readable and are not backfilled in this slice. A timeout retries the same key. Rollback is a redeploy until readers require the key. No cache: the shipment row is the source of truth. Abuse: a caller who reserves stock for another tenant's charge, controlled by an owner check on that charge. Handoff: they may design the warehouse screen. Consult you before a path that inserts a shipment without the key." },
            ],
          },
        },
      ],
    },
    {
      id: "4.13",
      title: "Evidence for the next level",
      summary: "What you can show, how you ask for feedback, and the case for technical leadership.",
      why: "Technical leadership is a claim about direction across areas. The evidence is a decision that held, not a title.",
      lessons: [
        {
          id: "4.13",
          title: "Evidence for the next level",
          track: "core",
          career: true,
          thread: "Orders",
          concept: [
            { type: "p", text: "Technical leader assumes you have owned an area through a design, a painful incident, and real mentoring. The evidence is those three, not a design document alone." },
            { type: "p", text: "Ask for feedback on the decision record and on a handoff that worked without you. A question about whether you seem senior is not answerable from the work." },
            { type: "p", text: "The case names a bet or a boundary you are ready to set across teams. It does not ask for a staff title or a manager title. Those are mixes the next level already refuses to collapse into one mold." },
          ],
          example: {
            title: "The question is the handoff",
            start: "You send the double-shipment note and the context note you gave someone else.",
            steps: [
              { t: "The artifact", d: "The decision, the first slice that shipped, and what the other person chose inside the boundary." },
              { t: "The question", d: "`Did the boundary hold? Where did they have to come back because I kept a decision I should have given away?`" },
            ],
            end: "They can answer from the notes. The case for the next level is that answer.",
          },
          exercise: {
            prompt: "Write the handoff question you would ask after someone else shipped the first slice of the double-shipment design. Ask whether the boundary held, and where they had to come back because you kept a decision. Name two Senior outcomes the note shows and one that is still thin. Then write two sentences that make the case for starting Technical leader.",
            constraints: [
              "The question points at the design note or the handoff.",
              "The case is about direction across areas, not a title.",
              "A thin should-know lesson can be named without treating it as a blocked gate.",
            ],
            done: "A note someone could answer, and a two-sentence case.",
            rubric: [
              "The note names two must-know outcomes I can show and one that is still thin.",
              "The question points at the design or the handoff.",
              "The case for Technical leader is about bets and boundaries, not a title.",
            ],
            model: [
              { type: "p", text: "`The shipment guard inserts the key and the row together, refuses a cache, and the handoff left the warehouse screen to someone else. I am still thin on a capacity sketch. Did the boundary keep them from inserting a shipment without the key?` The case: I can frame an area and leave a decision with someone else. Technical leader is next because the next work is which problems get the group's attention, not another design inside one area." },
            ],
          },
        },
      ],
    },
  ],
});
