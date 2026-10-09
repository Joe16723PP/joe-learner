registerLevel({
  id: "senior",
  num: "04",
  title: "Senior",
  promise: "Own an area: frame the problem, choose a design, keep it operable, and grow other engineers.",
  audience: "Engineers who already ship reliable changes inside a system and are ready to own an area: its design, its health, and the growth of the people who change it. Scope defines this level, not a title.",
  prerequisites: "Junior outcomes, especially release discipline, data-change sequencing, and incident first response.",
  buildsOn: "Junior work is changing a system safely. Senior work is keeping an area sensible for the next six months, and making it changeable by people who are not you. The unit of work becomes the problem and the area, not the ticket.",
  note: "One path. Must-know lessons open Technical leader. Should-know lessons are marked and can be skipped.",
  canDo: [
    "Frame a problem in outcomes and non-goals, and reject a solution that does not match the evidence.",
    "Propose a design with real options, tradeoffs, and a staged rollout, then land the first stage.",
    "Keep interfaces and stored data compatible while the area changes.",
    "Make operability part of the design: failure behavior, signals, and rollback.",
    "Review for systemic risk and hand a junior an outcome they can own.",
  ],
  modules: [
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
              { t: "Name the missing evidence", d: "You do not yet know the query count. The next step is the measurement from [[3.6]], not a design for cache invalidation." },
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
            { type: "p", text: "Operating burden includes who is paged, what you back up, and what you do when the vendor is down. A managed service you cannot explain in an incident is not free." },
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
      title: "Data evolution at area scale",
      summary: "Writers, readers, backfills, and one meaning per state.",
      why: "Area owners spend more time evolving data than inventing algorithms. Drift and ambiguous states cause the slow incidents.",
      lessons: [
        {
          id: "4.4a",
          title: "Evolving stored data",
          track: "must",
          thread: "Orders",
          concept: [
            { type: "p", text: "A schema change is a product change. Plan writers, readers, and backfills, building on the expand-migrate-contract sequence from [[3.4]]." },
            { type: "p", text: "Put a constraint in the database when it must always hold, such as uniqueness or a foreign key. Keep a rule in the application when it is a workflow that legitimately changes." },
            { type: "p", text: "One source of truth. A sync that can be rebuilt is safer than two stores that both accept writes. Dual-write without a reconciliation plan will drift." },
            { type: "p", text: "Delete and archive on purpose: retention, privacy requests, and the ability to restore a mistake within a stated window." },
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
          id: "4.4b",
          title: "When one word means five states",
          track: "should",
          thread: "Orders",
          concept: [
            { type: "p", text: "If one status field means five different things, the words are wrong. Rename the model so each state has one meaning, and show that old and new interpretations match on real rows." },
            { type: "p", text: "A comparison query or job is the proof. A meeting where everyone agrees on the words is not." },
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
      id: "4.5",
      title: "Reliability and operability",
      summary: "Failure behavior, a signal, and a runbook someone else can use.",
      why: "A design that works only when every dependency is healthy is a demo.",
      lessons: [
        {
          id: "4.5a",
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
          id: "4.5b",
          title: "A blameless review",
          track: "should",
          concept: [
            { type: "p", text: "Facilitate a blameless review. Timeline, contributing factors, one class of failure to remove, and a habit or guard that changes. Decline a thirty-item action list." },
            { type: "p", text: "The senior module connects to the junior write-up. You are making sure the review changes one habit, not collecting blame or tasks." },
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
      id: "4.6",
      title: "Delivery strategy",
      summary: "Ship the risky assumption first, and know the last reversible step.",
      why: "A correct design that cannot be shipped in stages will stall the area or land as one irreversible weekend.",
      lessons: [
        {
          id: "4.6",
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
            prompt: "Break the status-model migration from [[4.4]] into shippable steps. Mark the step where rollback stops being a redeploy, what you will watch at that step, and the decision rule for backing out.",
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
      id: "4.7",
      title: "Performance, cost, and security constraints",
      summary: "A budget, the dominant cost, and the abuse path.",
      why: "Seniors are expected to prevent both a rewrite for speed and a query that will not survive real data, and to close the abuse path while the data model is still cheap to change.",
      lessons: [
        {
          id: "4.7a",
          title: "Budgets, cost, and abuse paths",
          track: "core",
          thread: "Orders",
          concept: [
            { type: "p", text: "Set a budget before optimizing: latency, throughput, or money. Measure the current path. Find the dominant cost with evidence: query count, payload size, chatty calls, accidental nested work." },
            { type: "p", text: "Fix the worst offender and measure again. Extra complexity that saves a small constant factor needs a reason tied to the budget." },
            { type: "p", text: "Security is a design constraint for this feature: spoofed caller, tampered price or quantity, cross-tenant read, replay. Authorization sits next to the object, not only at the front door. Least privilege for credentials. An audit record for sensitive actions (who, what, when), stored without the secret itself." },
            { type: "p", text: "Know how this area hears about a critical flaw in a dependency and who may ship the bump." },
          ],
          example: {
            title: "Fifty queries, then a join",
            start: "The order page loads one parent query and one query per child. The budget is \"the page stays under a threshold you set at 50 children.\"",
            steps: [
              { t: "Evidence", d: "At 50 children the count is 51 queries. That is the dominant cost. You have not guessed. You counted." },
              { t: "Fix and refuse", d: "A join or a batched read brings the count to a constant. A cache would also be faster and adds staleness. You refuse it until the join misses the budget." },
            ],
            end: "The page meets the budget with the smallest extra mechanism. The cache is written down as a refusal, with the reason.",
          },
          exercise: {
            prompt: "A page loads one parent query plus one query per child. Estimate the query count at 50 children, recommend a join or a batched read, and state the complexity you refused and why. Then threat-model \"export my orders\": two abuses (another tenant's data, and exports large enough to degrade the database) and a control for each.",
            constraints: [
              "The performance recommendation is tied to a budget, even if the budget is one sentence.",
              "The refused complexity is named, not just \"something fancier.\"",
              "Authorization for the export is next to the order, not only a login check. The large export has a bound.",
            ],
            done: "A query count, a recommendation, a refusal, two abuses, and two controls.",
            rubric: [
              "I estimated the query count at 50 children and recommended a join or a batched read.",
              "I named a complexity I refused, such as a cache, and why.",
              "I named two abuses of export and a control for each.",
            ],
            model: [
              { type: "p", text: "Fifty children means about 51 queries. Recommend one join or a single batched read. Refuse a cache until that plan misses a latency budget you state, because a cache can serve another tenant's count or a stale one, and you do not have evidence you need it. Export abuses: another tenant's orders, controlled by checking the owner on the query itself; an export large enough to degrade the database, controlled by a page size or an async job with a row cap. Audit who exported what and when, without storing the order contents again as a secret. A critical dependency flaw is handled by the person allowed to ship a bump, using the dependency list from [[2.10]]." },
            ],
          },
        },
        {
          id: "4.7b",
          title: "A capacity sketch",
          track: "should",
          concept: [
            { type: "p", text: "Requests per second times work per request, compared with a limit you can explain: connections, rows read, or a vendor quota. The sketch exists to catch absurd designs, not to replace measurement." },
          ],
          example: {
            title: "A sketch that says no",
            start: "Twenty order-page requests per second, 51 queries each, and a database you believe can do about 200 simple queries per second.",
            steps: [
              { t: "Multiply", d: "20 times 51 is about 1,000 queries per second, before any other feature." },
              { t: "Compare", d: "That is several times the limit you stated. The design is absurd on a napkin. You still measure, but you do not build the 51-query page while hoping." },
            ],
            end: "The sketch killed a design. It did not produce a precise capacity number.",
          },
          exercise: {
            prompt: "Sketch the parent-plus-children page at 20 requests per second with 50 children, against a limit you can explain. Say whether the N+1 version survives the napkin.",
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
              { type: "p", text: "20 requests times 51 queries is about 1,020 queries per second. If the database budget for this page is 200 queries per second, the N+1 page does not survive the napkin. A join that is one query per request is 20 queries per second, which fits that budget. The sketch does not tell you the real latency. It tells you not to ship the 51-query shape and then measure your way out of it." },
            ],
          },
        },
      ],
    },
    {
      id: "4.8",
      title: "Review and mentoring",
      summary: "Systemic risk in review, and an outcome someone else can own.",
      why: "Review and delegation are the highest-leverage writing a senior does. Personal heroics cap the team at one person.",
      lessons: [
        {
          id: "4.8",
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
          ],
          example: {
            title: "A blocking comment with a question",
            start: "A design caches the price shown at checkout. The author has written the approach, not a thousand lines.",
            steps: [
              { t: "Block on the failure mode", d: "`If the cached price outlives a price change, we charge the wrong amount. What event invalidates the cache, and what do we do if that event is missed? I can't approve the approach until that has an answer.`" },
              { t: "Label the preference", d: "`Preference: I would keep the cache next to the price module rather than in the HTTP layer. Not blocking.`" },
            ],
            end: "The author knows the question that unblocks the review, and they are free to ignore your taste.",
          },
          exercise: {
            prompt: "Review a design that caches inventory counts. Write one blocking comment about staleness, including the question that would unblock it, and one non-blocking suggestion. Then take a task you would normally do yourself and write the context note, the risk to watch, and the point where you want to be consulted. Leave the design choice to the other engineer.",
            constraints: [
              "The blocking comment names the failure mode and a question.",
              "The non-blocking comment is labeled as a preference.",
              "The delegation note does not prescribe the design. It does name users, a constraint, and a risk boundary.",
            ],
            done: "Two review comments and a handoff note someone else could start from.",
            rubric: [
              "The blocking comment is about staleness and includes the question that would unblock it.",
              "The other comment is labeled as a preference.",
              "The handoff gives context and a consult point, and it leaves the design choice open.",
            ],
            model: [
              { type: "p", text: "Blocking: `A buyer can be told stock exists after the last unit was reserved. How stale may this count be for the action we are about to allow, and what updates it? I need that before I can review an implementation.` Preference: `I would name the cache the way the order module is named. Not blocking.` Handoff: `Buyers have been charged for items we could not ship twice this quarter. The constraint is that reserve_inventory remains the source of truth. Please own the approach for showing an approximate count on the product page. The risk is treating the cache as the reservation. Consult me before any change that lets the cache decide whether reserve succeeds. The design inside that boundary is yours.`" },
            ],
          },
        },
      ],
    },
  ],
});
