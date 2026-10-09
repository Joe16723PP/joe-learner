registerLevel({
  id: "leader",
  num: "05",
  title: "Technical leader",
  promise: "Set direction across areas and teams: bets, decisions, boundaries, and a group that can deliver when you are not in the room.",
  audience: "People who already operate as seniors and now steer several engineers or several systems. Staff-level individual contributors and engineering managers both belong here, in different mixes. The curriculum is the technical leadership work: direction, decisions, boundaries, and delivery. It is not a people-management handbook and not one vendor's career framework.",
  prerequisites: "Senior outcomes. You have owned an area through design, a painful incident, and real mentoring, not only through a design document.",
  buildsOn: "Senior scope is an area and the people who touch it. Technical-leader scope is direction across areas: which problems deserve the organization's engineering attention, and how the group stays able to deliver. The unit of work becomes the bet and the boundary.",
  note: "One path. Must-know lessons are the gate for finishing this level. Should-know lessons are marked and can be skipped. The scenario throughout is one checkout used by three product teams.",
  canDo: [
    "Publish a strategy with a few bets, explicit non-goals, and a way to tell that a bet is failing.",
    "Put features, migrations, and reliability work on one ordered list, and say what slips when something new jumps the queue.",
    "Record a cross-team decision with an owner, alternatives, and a revisit condition.",
    "Align team boundaries and system ownership so most changes have a clear owner.",
    "Run incident leadership and grow other people who can set direction when you are absent.",
  ],
  modules: [
    {
      id: "5.1",
      title: "Strategy and bets",
      summary: "A few bets, explicit non-goals, and a way to stop.",
      why: "Without a stated strategy, the loudest request becomes the strategy.",
      lessons: [
        {
          id: "5.1a",
          title: "Strategy and kill criteria",
          track: "must",
          thread: "Checkout",
          concept: [
            { type: "p", text: "A strategy states where the group will invest, what it will ignore, and how you will know a bet is working." },
            { type: "p", text: "Constraints come first: users, team size, reliability targets, and the time horizon. A strategy that ignores headcount is a wish list." },
            { type: "p", text: "Few bets. Each bet has an owner, a first milestone, and a kill criterion. Revisit on a schedule. New evidence can retire a bet. Stubbornness is not strategy." },
          ],
          example: {
            title: "Three bets for a small platform group",
            start: "Eight people, two quarters, one reliability target already promised. The loud request is a rewrite.",
            steps: [
              { t: "Constraints", d: "Headcount is flat. The rewrite does not fit beside the reliability target. It is a non-goal for this horizon." },
              { t: "Bets", d: "One owner for the shared schema. One measured cut in the time from merge to production. One migration with a milestone in six weeks. Each has a kill criterion: retire it if the milestone's evidence is missing at the review." },
              { t: "Revisit", d: "A date is on the calendar. The question is whether the evidence still supports the bet, not whether anyone still likes it." },
            ],
            end: "A reader can see what will be ignored and what would make you stop.",
          },
          exercise: {
            prompt: "Write a strategy of about two pages for this checkout. Context: three product teams use it (Shop, Subscriptions, and Point of sale). Engineering headcount is flat at 18 people: Checkout 8, Catalog 5, Finance 5. The horizon is two quarters. Last month a retry duplicated some charges. Tax rules live in a module that more than one team edits. Include three bets, non-goals, and one observation per bet that would make you stop.",
            constraints: [
              "Constraints come before the bets. Headcount is one of them.",
              "Each bet has an owner, a first milestone, and a kill criterion.",
              "Non-goals are specific enough that a reasonable request could be refused by pointing at them.",
            ],
            done: "Two pages a stakeholder and an engineering lead could both read, with three bets and a way to stop each one.",
            rubric: [
              "The strategy states context, constraints, three bets, and non-goals.",
              "Each bet has an owner, a first milestone, and one observation that would make me stop.",
              "The strategy does not assume extra people.",
            ],
            model: [
              { type: "p", text: "One defensible set, not the only set. Bet: one owner for tax changes, milestone a written contract other teams can call, kill it if after one quarter both teams still meet to change a rate. Bet: duplicate charges go to zero on the retry path, milestone the idempotency key in production for create-charge, kill it if the duplicate rate is not lower at the review. Bet: shorten the slowest wait from idea to production, milestone a measured baseline and one policy change, kill it if the wait does not move. Non-goals: a new frontend stack, splitting every module, hiring as the plan. Revisit on a date you put in the note." },
            ],
          },
        },
        {
          id: "5.1b",
          title: "Constraints you already promised",
          track: "should",
          thread: "Checkout",
          concept: [
            { type: "p", text: "External constraints include compliance duties, contractual uptime, and support windows you already promised. A bet that violates one of these is not available, even if the architecture would be cleaner." },
          ],
          example: {
            title: "The rewrite that misses a promise",
            start: "The cleanest architecture is a rewrite of checkout this quarter. The contract says 99.9 percent of payment attempts complete, measured monthly.",
            steps: [
              { t: "Name the constraint", d: "The uptime promise is already sold. A rewrite that puts that number at risk this quarter is not an available bet." },
              { t: "Reshape", d: "The bet becomes a thin change that protects the promise, or it waits until the promise can be renegotiated. Cleaner is not the test." },
            ],
            end: "The strategy loses a bet, on purpose, because the promise was a constraint.",
          },
          exercise: {
            prompt: "You have already promised 99.9 percent monthly completion on payment attempts, and 24-hour support for one region. Name one external constraint and the bet from your strategy that it removes or reshapes.",
            constraints: [
              "Use the checkout scenario, not a new product.",
              "The constraint is one you already promised, not one you wish you had.",
              "Show the bet before and after the constraint.",
            ],
            done: "One constraint, one bet it changes, and a sentence a stakeholder would recognize as the promise they bought.",
            rubric: [
              "I named one external constraint already promised.",
              "I showed which bet it removes or reshapes.",
              "The result still fits flat headcount and the two-quarter horizon.",
            ],
            model: [
              { type: "p", text: "The 99.9 percent promise removes \"rewrite checkout this quarter.\" The reshaped bet is the idempotent charge path, which protects the promise instead of spending the quarter on a new shape. The 24-hour support window for one region means a bet that assumes follow-the-sun coverage everywhere is also unavailable. Support hours are a constraint, not a staffing surprise." },
            ],
          },
        },
      ],
    },
    {
      id: "5.2",
      title: "Prioritization and sequencing",
      summary: "One list, and a sentence for the item that waits.",
      why: "Leadership time is mostly allocation. Unspoken allocation breeds side channels and stalled migrations.",
      lessons: [
        {
          id: "5.2a",
          title: "Now, next, and later",
          track: "core",
          thread: "Checkout",
          concept: [
            { type: "p", text: "Order work by risk and dependency. Platform work earns a slot by unblocking a named outcome, not by being infrastructure." },
            { type: "p", text: "One list holds features, migrations, and reliability work. Hidden lists become shadow roadmaps." },
            { type: "p", text: "When a new request jumps the queue, name what slips." },
            { type: "p", text: "\"Must happen eventually\" needs a trigger: a date, a scale, a contract. Without a trigger, it is a no." },
          ],
          example: {
            title: "The request that jumps",
            start: "The list is: fix duplicate charges, then the tax migration, then saved addresses. A partner asks for their payment method this month.",
            steps: [
              { t: "One list", d: "The partner work goes on the same list. It does not live in a side channel." },
              { t: "Name the slip", d: "If it jumps ahead of saved addresses, say so to the owner of saved addresses. If it jumps ahead of duplicate charges, say why a new payment method is safer than stopping double charges. Usually it is not." },
            ],
            end: "The queue is public. The person who waits hears it from you.",
          },
          exercise: {
            prompt: "Publish a now / next / later list for these eight requests, and the sentence you would say to the owner of the item you placed in later. 1. Incident follow-up: stop duplicate charges from last month's retry bug. 2. Migration: move tax out of the module two teams edit. 3. Gift cards. 4. Saved addresses. 5. One-click reorder. 6. Dark mode for the checkout page. 7. A copy change on guest checkout. 8. A partner's payment method.",
            constraints: [
              "Reliability work and the migration are on the same list as the features.",
              "Now is small enough that 18 people are not pretending to do all eight.",
              "The sentence to the later owner names what would move their item up. A trigger, not a consolation.",
            ],
            done: "A list with three bands and one sentence you could say out loud.",
            rubric: [
              "I published now, next, and later, and the incident follow-up is not buried under features.",
              "The migration is on the same list.",
              "I wrote the sentence I would say to the owner of an item in later, including what would change the answer.",
            ],
            model: [
              { type: "p", text: "Now: duplicate charges, then the tax migration's first contract. Next: the partner payment method only if it does not delay the charge fix, and saved addresses if it unblocks a measured drop-off. Later: gift cards, one-click reorder, dark mode, guest-checkout copy. Sentence to the dark-mode owner: `This is later because it does not change payment completion or the tax ownership problem. It moves up when checkout's failure rate is inside the target and the tax contract is in place. Until then it is a no, not a secret yes.`" },
            ],
          },
        },
        {
          id: "5.2b",
          title: "A portfolio of engineering cost",
          track: "should",
          thread: "Checkout",
          concept: [
            { type: "p", text: "A one-page portfolio. Rough cost in people-weeks or on-call load for four buckets: running the current system, changing it for users, paying down a named debt, and platform work. The numbers can be coarse. They must be defined." },
          ],
          example: {
            title: "Four numbers that add up",
            start: "Eighteen people, and a feeling that \"all we do is features.\"",
            steps: [
              { t: "Define the buckets", d: "Run: on-call and keeping payment completion inside target. Change: features buyers notice. Debt: the tax module two teams edit. Platform: work that unblocks a named product outcome." },
              { t: "Coarse numbers", d: "You might say half the Checkout team's weeks are run, and the tax migration is debt, not platform, because it pays down a named trap rather than shortening everyone's path." },
            ],
            end: "The migration has a bucket. The argument is about the definition, and then about the number.",
          },
          exercise: {
            prompt: "Add the portfolio sketch to the list from the previous lesson. Show which bucket the tax migration sits in, and define the four buckets in a sentence each.",
            constraints: [
              "Use people-weeks or on-call load. Say which.",
              "The four buckets are run, change, debt, and platform.",
              "The numbers can be coarse. They have to be defined.",
            ],
            done: "One page, four buckets, and a stated home for the migration.",
            rubric: [
              "I defined run, change, debt, and platform.",
              "I gave a coarse cost for each.",
              "I showed which bucket the tax migration sits in and why.",
            ],
            model: [
              { type: "p", text: "In people-weeks for a month, one coarse cut is: run 6, change 8, debt 3, platform 1, across the 18 people, with Checkout carrying most of run. The tax migration sits in debt: it pays down a module two teams must edit together. It is platform only if you redefine it as a contract that shortens other teams' path, and then you should say that. The sketch is a page, not a finance system." },
            ],
          },
        },
      ],
    },
    {
      id: "5.3",
      title: "Decisions across teams",
      summary: "Options on the table, an owner, and a date to revisit.",
      why: "Cross-team work fails in ambiguity as often as it fails from a bad idea.",
      lessons: [
        {
          id: "5.3",
          title: "Decisions across teams",
          track: "must",
          thread: "Checkout",
          concept: [
            { type: "p", text: "Frame the decision: the question, the deadline, and who is affected." },
            { type: "p", text: "Arrive with alternatives and a recommendation. A meeting that starts from a blank page spends its time inventing options badly." },
            { type: "p", text: "Record what was decided, who owns the consequence, and what evidence would cause a revisit." },
            { type: "p", text: "After the decision, commit. Re-opening it in side conversations creates a second process with less information. New evidence that hits the revisit condition is the legitimate re-open." },
            { type: "seq", title: "A decision that survives the week", items: [
              { h: "Frame", p: "The question, the deadline, who is affected." },
              { h: "Recommend", p: "Alternatives are already written. The meeting is not a blank page." },
              { h: "Record", p: "Owner, consequence, and the evidence that would reopen it." },
            ] },
          ],
          example: {
            title: "A schema note with a revisit date",
            start: "Two teams disagree on whether a foreign key lives in service A or service B. The deadline is the start of the migration next month.",
            steps: [
              { t: "Arrive with options", d: "Option 1: A owns the key and B stores a copy it can rebuild. Option 2: B owns the key and A calls B. You recommend option 1 because A is already the source of truth for the parent row." },
              { t: "Record", d: "The owner of the schema is A. The migration window is four weeks. Revisit on a stated date if callers have not moved. Side conversations do not reopen it." },
            ],
            end: "The note is the decision. The meeting is how you got there.",
          },
          exercise: {
            prompt: "Shop and Finance disagree on a shared event for \"order placed.\" Shop emits `customerEmail`, retries forever, and has no stable event id. Finance wants `account_id`, a stable event id, and at-least-once delivery with a dedupe key. Write the decision note: options, recommendation, owner of the schema, migration window, and the date you will check whether callers moved.",
            constraints: [
              "The question, the deadline, and who is affected are at the top.",
              "You recommend one option. You do not stop at \"it depends.\"",
              "The revisit condition is evidence, not a mood.",
            ],
            done: "A note the two teams could execute without another meeting to rediscover the options.",
            rubric: [
              "The note has options, a recommendation, and an owner of the schema.",
              "It includes a migration window and a date to check whether callers moved.",
              "Reopening requires the revisit condition, not a side conversation.",
            ],
            model: [
              { type: "p", text: "Question: what must `order_placed` guarantee before Finance depends on it? Deadline: before the tax migration starts reading it. Affected: Shop, Finance, and anyone retrying charges. Options: keep Shop's event and let Finance adapt; or adopt a version with `account_id`, a stable event id, and a dedupe key, and accept email only as an optional extra. Recommend the second. Shop owns the schema because Shop is the source of truth for placement. Migration window: four weeks where both shapes are accepted. Check on a date you name: if Finance is still the only consumer of the new shape and Shop clients have not moved, reopen. Until that evidence, side conversations do not reopen it." },
            ],
          },
        },
      ],
    },
    {
      id: "5.4",
      title: "Organizational architecture",
      summary: "A behavior has an owner, or a contract that makes the meeting unnecessary.",
      why: "Technical leaders are accountable for whether daily coordination is rare or endless. That outcome is structural.",
      lessons: [
        {
          id: "5.4",
          title: "Organizational architecture",
          track: "must",
          thread: "Checkout",
          concept: [
            { type: "p", text: "System boundaries and team boundaries drift together. Use that on purpose. A team that must edit five other teams' modules to ship will coordinate forever." },
            { type: "p", text: "Every production behavior has a team that can change it and is accountable when it fails. \"Everyone owns it\" means the on-call rotation owns the ambiguity." },
            { type: "p", text: "Prefer a contract between teams over shared editing rights in the same module. The contract can be an interface, a schema, or a documented operational handoff." },
            { type: "p", text: "A stream of meetings required for ordinary changes is evidence the boundary or the contract is wrong. Fix that, not the meeting notes." },
          ],
          example: {
            title: "A meeting that was a missing owner",
            start: "Every price change requires Checkout and Catalog in a room, because both edit the price function.",
            steps: [
              { t: "Name the behavior", d: "\"What the buyer is charged\" is one behavior. It needs one owner." },
              { t: "Contract or owner", d: "Either Catalog owns price and Checkout calls it, or Checkout owns price and Catalog sends a proposal. Shared edit rights are the meeting." },
            ],
            end: "Ordinary price changes no longer require both teams in a room. One team gave up the right to edit the function directly.",
          },
          exercise: {
            prompt: "Three teams: Checkout, Catalog, and Finance. Tax calculation is edited by Checkout and Finance, and there is no decider. Propose either a single owner or a contract that lets one team change without a meeting. State what the other team gives up.",
            constraints: [
              "The proposal covers ordinary tax changes, not a reorganization chart.",
              "Say what the team that does not own the module gives up.",
              "Tie the proposal to the meetings you are trying to make rare.",
            ],
            done: "One proposal, a clear owner or a clear contract, and an explicit loss for the other team.",
            rubric: [
              "I proposed a single owner or a contract for tax calculation.",
              "Ordinary tax changes no longer need both teams in a meeting.",
              "I stated what the other team gives up.",
            ],
            model: [
              { type: "p", text: "Finance owns tax rules. Checkout calls a contract: given a basket, return tax amounts and a reason code, with a compatibility window when the response changes. Checkout gives up editing the tax module. Finance gives up shipping tax changes by patching Checkout's deploy. The meeting was the shared edit. The contract replaces it. \"Everyone owns tax\" remains the on-call ambiguity you are ending." },
            ],
          },
        },
      ],
    },
    {
      id: "5.5",
      title: "Quality, risk, and incident leadership",
      summary: "Roles in a severe incident, and a short follow-through.",
      why: "Incident leadership is coordination and priority. Unscoped follow-up lists create the appearance of learning.",
      lessons: [
        {
          id: "5.5",
          title: "Incident leadership",
          track: "must",
          thread: "Checkout",
          concept: [
            { type: "p", text: "Risk appetite in operational terms: which failures are unacceptable, which are budgeted, and who may accept a new risk." },
            { type: "p", text: "During a severe incident, assign roles: lead, communicator, and operators. The lead protects the timeline and keeps the change small until users are safe. The leader does not have to be the best debugger in the room." },
            { type: "p", text: "Follow-through removes a class of failure. Pick a few corrections. A list of thirty actions is a way to finish none." },
            { type: "p", text: "If you use an error budget or an equivalent rule, state it: while reliability is inside the target, feature work proceeds; when it is not, reliability work preempts. The value is the explicit trade, not the slogan." },
            { type: "p", text: "This connects to the senior blameless review. The leader's job is to make sure the review happens and that the few actions land." },
          ],
          example: {
            title: "The lead is not the best debugger",
            start: "Payment completion has fallen through the floor. The person who knows the code best is already reading traces.",
            steps: [
              { t: "Roles", d: "You lead. Someone else communicates. The expert stays on the trace. You keep the change small: disable the new path before anyone rewrites it." },
              { t: "Status", d: "Impact, current action, next update time. The communicator sends it. You do not polish it into a novel." },
              { t: "After", d: "One class of failure, a few corrections, a review on the calendar. Thirty ideas go to a parking list." },
            ],
            end: "Users are safer before the architecture discussion starts. The review has an owner.",
          },
          exercise: {
            prompt: "Write an incident-command checklist for a severe outage and a rule for how many follow-up actions you will accept. Apply both to this scenario: payment completion dropped after a retry change, and the tempting fix is a weekend rewrite of the failing subsystem. Say what you will do this week and what you will not start.",
            constraints: [
              "The checklist assigns lead, communicator, and operators.",
              "The action-count rule is a number or a hard limit you can keep.",
              "The weekend rewrite is in the \"will not start\" list unless you can justify it as the smallest way to stop the bleeding. It almost certainly is not.",
            ],
            done: "A checklist, a limit, this week's actions, and an explicit refusal.",
            rubric: [
              "The checklist names lead, communicator, and operators, and the lead is not required to be the best debugger.",
              "I stated a rule for how many follow-up actions I will accept.",
              "For the scenario, I said what I will do this week and that I will not start the weekend rewrite.",
            ],
            model: [
              { type: "p", text: "Checklist: name the lead, the communicator, and the operators; write the timeline; stop the bleeding with the smallest change; send impact, action, and next update time; do not start a redesign while users are failing. Follow-up limit: three actions. This week: roll back or disable the retry, confirm payment completion recovers, schedule the blameless review. Will not start: a weekend rewrite of the subsystem. The class of failure is a retry of a charge that may have succeeded. One guard is the idempotency rule. The error-budget sentence, if you use one: while completion is inside 99.9 percent, feature work proceeds; while it is not, this reliability work preempts the list from [[5.2]]." },
            ],
          },
        },
      ],
    },
    {
      id: "5.6",
      title: "Growing engineers and the leadership bench",
      summary: "A decision you currently make, made by someone else next time.",
      why: "Direction that only you can explain stops when you are busy. The level is incomplete if the bench is still you.",
      lessons: [
        {
          id: "5.6a",
          title: "A bench for decisions you make alone",
          track: "must",
          thread: "Checkout",
          concept: [
            { type: "p", text: "Delegate outcomes that build judgment: a design, a vendor choice inside a budget, an incident lead. Keep the context and the risk boundary visible. This is the senior handoff, practiced on decisions that cross teams." },
            { type: "p", text: "Staff so ownership survives vacation and resignation. A single expert on a critical path is a risk." },
            { type: "p", text: "Promotion and role evidence comes from observed scope: problems solved, people unblocked, decisions that held up. Hours and heroics are weak evidence." },
            { type: "p", text: "Managers and senior individual contributors multiply differently. One builds the people system. The other sets technical direction. Staff the work you actually need. Do not force one mold." },
          ],
          example: {
            title: "The decision that only you make",
            start: "Every tax-rule exception waits for you, including the ones inside a written policy.",
            steps: [
              { t: "Name the next owner", d: "A finance-side engineer owns exceptions that fit the policy. You still review a change that alters the contract." },
              { t: "Context they lack", d: "They cannot see the checkout deploy constraint or the promise on payment completion. Write both down." },
              { t: "Evidence", d: "The test that the bench is real: you are on vacation and an ordinary exception ships without you." },
            ],
            end: "One class of decision has moved. You kept the risk boundary, not the keystrokes.",
          },
          exercise: {
            prompt: "Pick one decision you currently make yourself in this checkout scenario. Name who should make it next, the context they lack, and the review you will still do.",
            constraints: [
              "The decision is real in the scenario: tax, a charge retry, a prioritization call, or an incident lead.",
              "The next person is named by role, not by a fantasy hire you do not have.",
              "You keep a review that matches the risk, and you give up the rest.",
            ],
            done: "A handoff that would survive your vacation for that class of decision.",
            rubric: [
              "I named a decision I currently make and who makes it next.",
              "I named the context they lack.",
              "I named the review I will still do, and I left the decision itself with them.",
            ],
            model: [
              { type: "p", text: "Decision: whether a tax change ships this week. Next: the finance-side owner of the tax contract. Context they lack: Checkout can only take one risky deploy in a week, and payment completion is the promise that preempts the list. Review you still do: a change to the contract's fields or error semantics. You do not review the rate table inside the contract. If that person is on vacation, a second named owner exists, or the decision waits. A single expert is the risk you are removing." },
            ],
          },
        },
        {
          id: "5.6b",
          title: "Hiring for a missing signal",
          track: "should",
          thread: "Checkout",
          concept: [
            { type: "p", text: "Hiring is a design problem. Name the missing signal, for example \"has owned a migration\" or \"can run a blameless review,\" then sketch a loop that can observe it: a work sample, a panel, and a debrief that compares evidence rather than charisma." },
          ],
          example: {
            title: "The interview that never saw the work",
            start: "The bench cannot run a blameless review. The current loop asks people to invert a binary tree and to \"tell us about a conflict.\"",
            steps: [
              { t: "Name the signal", d: "You need to see someone facilitate a review: timeline, one class of failure, a short action list, no blame." },
              { t: "A loop", d: "A work sample is a two-page incident. The panel watches them run a 30-minute review. The debrief compares notes on that evidence. Charm is not a score." },
            ],
            end: "The loop can fail a charismatic candidate who produces thirty actions, and pass a quiet one who produces one habit.",
          },
          exercise: {
            prompt: "Write the hiring signal you are missing on the checkout bench and one exercise that would reveal it.",
            constraints: [
              "The signal is a kind of work from this level or the senior level, not a personality trait.",
              "The exercise is a work sample, a panel, or both, plus a debrief that compares evidence.",
              "Say what the exercise must not reward.",
            ],
            done: "A signal and a loop another interviewer could run without you in the room.",
            rubric: [
              "I named the missing signal as observable work.",
              "I sketched a work sample or panel that can reveal it.",
              "The debrief compares evidence, and I said what the loop must not reward.",
            ],
            model: [
              { type: "p", text: "Missing signal: has owned a migration through expand, migrate, and contract. Exercise: a two-page prompt with the status-field mess, forty minutes, then a debrief that scores the order of steps, the rollback point, and the comparison check. It must not reward a rewrite proposal or a confident voice. A second signal, if migration is already on the bench: can run the blameless review in the example above." },
            ],
          },
        },
      ],
    },
    {
      id: "5.7",
      title: "Communication, conflict, and saying no",
      summary: "Two audiences, a written decision, and a no that includes what would change it.",
      why: "A technical leader's most durable artifact is the written decision. Avoided conflict becomes a shadow roadmap.",
      lessons: [
        {
          id: "5.7",
          title: "Communication, conflict, and saying no",
          track: "core",
          thread: "Checkout",
          concept: [
            { type: "p", text: "Match the audience. A non-engineering stakeholder needs the bet, the cost, and the risk. Engineering leads also need the constraints and the rejected alternatives." },
            { type: "p", text: "Write the decision down. A spoken agreement does not survive the next urgent week." },
            { type: "p", text: "Bad news goes early: a slipping date, a rising risk, a bet that hit its kill criterion. Include the next decision you need." },
            { type: "p", text: "Numbers need a definition. \"Faster\" and \"more reliable\" are not status." },
            { type: "p", text: "Separate people from the tradeoff. State the constraint that makes both requests impossible together." },
            { type: "p", text: "Look for a shared goal before a compromise. A compromise that meets neither goal wastes the conflict." },
            { type: "p", text: "A no is complete when it includes what you will do, or what evidence would change the answer. Escalate with a recommendation when the decision sits above you." },
          ],
          example: {
            title: "A no to a second rewrite",
            start: "A peer team wants you to adopt their platform this quarter. Your strategy already refused a rewrite.",
            steps: [
              { t: "Shared goal", d: "Both of you want payment completion to stay inside the promise. Their platform might serve that later. It does not serve it this quarter at this headcount." },
              { t: "The no", d: "`We will not adopt it this quarter. We will keep the idempotent charge path. I will revisit if the duplicate-charge bet is done and you can show the platform shortens our measured path to production. The user outcome I am protecting is completed payments.`" },
            ],
            end: "The no includes the work you will do and the evidence that would move the date. The person is not the problem. The quarter is.",
          },
          exercise: {
            prompt: "Turn your strategy from [[5.1]] into a half-page brief for a non-engineering stakeholder and a separate note for engineering leads that adds one rejected alternative. Then answer a partner team that demands you adopt their platform this quarter: what you accept, what you refuse, the evidence that would move the date, and the user outcome you are protecting.",
            constraints: [
              "The stakeholder brief has the bet, the cost, and the risk. It does not require them to know the schema.",
              "The engineering note includes a rejected alternative and the constraint behind it.",
              "The answer to the partner is a complete no: what you will do, and what evidence would change it.",
            ],
            done: "Two short writings and one answer you could send.",
            rubric: [
              "The stakeholder brief is about half a page and includes bet, cost, and risk.",
              "The engineering note adds a rejected alternative.",
              "The partner answer accepts something, refuses the platform this quarter, names evidence that would move the date, and names the user outcome.",
            ],
            model: [
              { type: "p", text: "Stakeholder: `For two quarters we will stop duplicate charges and give tax one owner. The cost is that gift cards and a new checkout look wait. The risk is that a partner payment method slips. The number we mean by reliable is 99.9 percent of payment attempts completing.` Engineering: the rejected alternative is a checkout rewrite, because headcount is flat and the uptime promise is already sold. Partner: `We accept a written interface review next month. We refuse to adopt the platform this quarter. The date moves if duplicate charges are inside the kill criterion and you show a shorter measured path for one of our teams. The outcome we are protecting is that a buyer who pays once is not charged twice.`" },
            ],
          },
        },
      ],
    },
    {
      id: "5.8",
      title: "Delivery systems and stewardship",
      summary: "Shorten a wait you control, and reward the strategy you stated.",
      why: "Tools change. The habits you tolerate become the architecture, and the delivery path is where those habits are trained.",
      lessons: [
        {
          id: "5.8",
          title: "Delivery systems and stewardship",
          track: "core",
          thread: "Checkout",
          concept: [
            { type: "p", text: "The path from idea to production should be visible: decision, review, test, deploy, measure. Leaders remove wait states they cause: late review, unclear priority, scarce environments." },
            { type: "p", text: "Limit work in progress. More concurrent bets means slower completion of each. Protect focus for the bets you already named." },
            { type: "p", text: "An internal platform earns its place by shortening a measured path for a product team. A platform with no team depending on it is a hobby." },
            { type: "p", text: "Keep standards few, automated where possible, and tied to a failure they prevent. A rule nobody can explain will be bypassed." },
            { type: "p", text: "Culture is the set of behaviors that get repeated: blameless reports, written decisions, respect in review, and an on-call load a team can survive." },
            { type: "p", text: "Reward the strategy you stated. If you praise midnight heroics and ask for reliability, you will get midnight heroics." },
            { type: "p", text: "Teach taste by the decisions you approve: clarity, reversibility, and evidence." },
            { type: "p", text: "Leave the group more able than you found it: owners in place, bets written down, and fewer critical paths through one person." },
          ],
          example: {
            title: "A wait the leader was causing",
            start: "The median review sits for four days because you batch reviews on Fridays.",
            steps: [
              { t: "Name the wait", d: "Idea, decision, review, test environment, deploy. Review is the longest wait you control." },
              { t: "The policy", d: "You review approaches within one working day, and you stop accepting silent side bets that jump the queue. The Friday batch is the thing you stop doing." },
            ],
            end: "The path is shorter because a habit of yours changed, not because a tool was announced.",
          },
          exercise: {
            prompt: "Map the waits in one checkout change: idea, decision, review, test environment, deploy. Pick the longest wait you control and write the policy change that shortens it, including what you will stop doing. Then name three behaviors you will praise this month and three you will stop rewarding. Tie them to a midnight fix, a quiet migration, and a review that humiliated an author.",
            constraints: [
              "The policy change is yours. You do not assign the wait to a team you do not lead.",
              "Praise and the thing you stop rewarding are paired with the strategy: reliability, written decisions, respect in review.",
              "Each behavior is tied to one of the three situations.",
            ],
            done: "A wait map, one policy, three praises, and three stops.",
            rubric: [
              "I mapped the waits and wrote a policy that shortens the longest one I control, including what I will stop doing.",
              "I named three behaviors I will praise, tied to the situations.",
              "I named three behaviors I will stop rewarding, including midnight heroics as the path and a humiliating review.",
            ],
            model: [
              { type: "p", text: "Suppose review is the long wait. Policy: design risk is reviewed before the branch grows, within one working day, and you stop holding reviews for a weekly meeting. Praise: the quiet tax migration that merged in slices; a review comment that named a failure mode and left the author able to respond; an incident note in plain language. Stop rewarding: the midnight fix that skipped the rollback note; the rewrite branch that sat for a month; the review that mocked the author. Taste, in the decisions you approve, is clarity, reversibility, and evidence. The group is more able if the tax owner and the charge-path owner can decide without you, the bets are written, and the retry bug is not a path through one person." },
            ],
          },
        },
      ],
    },
  ],
});
