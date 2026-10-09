# Joe Learner

A static teaching site for one development path, from a first program to technical leadership.

Levels describe the work, not a job title. A learner moves on by demonstrating outcomes. The next level stays closed until the must-know exercises of the current level are done. Should-know work can wait.

Concepts stay language-agnostic. Python 3 appears only in Beginner examples, where a language is required to show the idea. From New graduate upward, the subject is engineering practice. Examples use shared tools (Git, HTTP, SQL) and do not assume one company stack.

This is a backend-leaning generalist path. The scenarios are a contact book, an orders service, and a shared checkout. Frontend, mobile, data, site reliability, and security are named as specializations after Junior. They are not a second curriculum. People management — feedback conversations, performance reviews, and onboarding — is out of scope. Technical leader names that boundary and does not teach it.

## Goal

Someone who finishes the path can:

- Write and reason about small programs and the core data structures.
- Work the way a software team works: history, other people's code, tests, review, and safe handling of secrets.
- Own a change inside a system they did not start, from the report through release, data migration, and support.
- Own an area: frame the problem, choose a design, keep it operable, and grow other engineers.
- Set direction across areas and teams: bets, decisions, boundaries, and a group that can deliver when they are not in the room.

Each level assumes the previous outcomes are fluent. Later lessons do not re-teach them.

## How the five levels fit

The levels are one path.

| Level | The work | Opens the next level |
| --- | --- | --- |
| Beginner | Small programs and core data structures | 18 must-know lessons, including exceptions and modules |
| New graduate | Everyday practices of a software team | 13 must-know lessons (2.1–2.11 and deployment) |
| Junior | A change inside a living orders system, from report through support | 7 must-know lessons |
| Senior | An area: problem, design, operability, and other engineers | 10 must-know lessons |
| Technical leader | Direction across areas: bets, decisions, boundaries, delivery | 6 must-know lessons finish this level |

Each level also has a placement check, with one line per must-know lesson. Completing that check opens the next level. Completing every must-know lesson also opens it. The placement lesson is not an extra requirement.

Pace on each level page is an estimate for a careful pass, not a schedule: Beginner about 50–70 hours, New graduate must-know about 30–45, Junior about 35–50, Senior about 30–45, Technical leader about 25–35.

Beginner is open from the start. New graduate must-know opens Junior. Junior must-know opens Senior. Senior must-know opens Technical leader.

New graduate has two tracks on its level page. Must-know is the default path and the gate. Should-know is visible and is not required to finish the level.

Junior, Senior, and Technical leader are single paths. Lessons that cover a must-know or should-know topic are badged. Other lessons stay on the path and do not lock the next level. Skipping a should-know lesson does not lock the next level.

Finishing a level means the learner can do the outcomes, shown by completing the must-know exercises. The check is a self-check in the browser. The page cannot see the program or the notes.

## What a lesson contains

The site is organized as level, then module, then lesson. Modules stay in teaching order. Each module page names the single previous module it assumes. The first module of a level assumes the must-know outcomes of the previous level.

A lesson has three parts, in this order:

1. **Concept.** The idea in plain language, using the terms the rest of the level uses. A trace or diagram appears when the idea is about change over time.
2. **Worked example.** One small instance with a start state, the steps, and the end state.
3. **Exercise.** One task done with the example out of sight. The prompt states the constraints and how to tell it is done: a test result, a returned value, or a short written piece with a rubric.

Three project threads run through the lessons: the **contact book** (Beginner into New graduate), **orders** (Junior and Senior), and a shared **checkout** (Technical leader).

## Beginner

For people who can use a computer and want to learn to program. No prior coding is assumed.

When they finish, they can read and write small Python 3 programs, choose a fitting data structure and explain the choice, trace a program and fix simple logic bugs, raise and catch an exception, split a small program across modules that pass records, and break a problem into functions that save data in a text file.

18 modules, 20 lessons. 18 lessons are must-know. Placement and the evidence lesson do not lock New graduate.

| Module | What it covers |
| --- | --- |
| 1.0 Placement | An alternate check for people who can already do this level |
| 1.1 How a program runs | Instructions, a file, and the edit–run–read loop |
| 1.2 Values, types, and variables | Names, kinds of values, and conversion |
| 1.3 Expressions and operators | Arithmetic, comparisons, precedence, and money as integers |
| 1.4 Decisions | Branches, boundaries, and `=` versus `==` |
| 1.5 Repetition | Loops, accumulators, and how a loop ends |
| 1.6 Functions | Parameters, return values, and the call stack |
| 1.7 Lists and strings | Order, indexes, slices, and two names for one list |
| 1.8 Dictionaries and sets | Lookup by key, uniqueness, and which collection fits |
| 1.9 Stacks and queues | Last-in first-out and first-in first-out |
| 1.10 Searching and sorting | Linear search, binary search, and a visible sort (two lessons) |
| 1.11 How much work a solution does | Constant, linear, and nested work, judged by growth |
| 1.12 Trees and graphs | Nested structure, networks, walks, and cycles (two lessons) |
| 1.13 Debugging | Tracebacks, a prediction, a smaller input, and a kept failure |
| 1.14 Exceptions | Raise, and catch only when you have a next step |
| 1.15 Imports, modules, and records | More than one file, and fields grouped into one record |
| 1.16 Text files and a finished program | Data that outlives one run, and a contact book |
| 1.17 Evidence for the next level | What you can show, and the case for New graduate |

## New graduate

For people who can already write small programs and want to work the way a team works.

Must-know, when they finish: clone and branch, trace one behavior in unfamiliar code, add a failing test and describe the change, keep secrets out of the repository and out of prompts, run one check command, and describe a release across environments with a rollback.

20 modules, 21 lessons. Must-know is 2.1–2.11 plus deployment (2.12). Should-know is 2.13–2.18. Placement (2.0) and the evidence lesson (2.19) do not lock Junior. Review includes a generated diff. Security includes a secret pasted into a prompt.

| Module | Track | What it covers |
| --- | --- | --- |
| 2.1 Version control | Must-know | History, branches, and a conflict resolved on purpose |
| 2.2 Reading code you did not write | Must-know | One behavior, from the entry point to the data it changes |
| 2.3 Testing small units | Must-know | Arrange, act, assert, and fail first when the bug is local |
| 2.4 Debugging a defect | Must-know | Reproduce, narrow, and keep the reproduction as a test |
| 2.5 Command line, layout, and configuration | Must-know | A project someone else can clone, install, and test |
| 2.6 Structured data and HTTP | Must-know | JSON, CSV, and status codes a caller must act on (two lessons) |
| 2.7 Relational data | Must-know | Tables, joins, transactions, and queries that stay in the database |
| 2.8 Errors, logging, and what the user sees | Must-know | Three failures, two audiences, and no secrets in the log |
| 2.9 Code review | Must-know | A small change, a specific comment, and a condition for approval |
| 2.10 Security habits | Must-know | Secrets, parameters, prompts, and who is calling versus what they may do |
| 2.11 Automated checks | Must-know | One command the team runs before a change is shared |
| 2.12 Deployment and environments | Must-know | Local, the shared line, staging, production, and a rollback |
| 2.13 Modules, coupling, and cohesion | Should-know | One reason to change, and a direction for imports |
| 2.14 Concurrency as a concept | Should-know | Lost updates, locks, and one owner of the data |
| 2.15 Measuring | Should-know | A question, a baseline, and the spread across a few runs |
| 2.16 Writing for the next reader | Should-know | Names, constraints, and a README that can stand alone |
| 2.17 Dependencies and reproducible setup | Should-know | A declared, pinned set that installs on a clean machine |
| 2.18 Locales, text, and access | Should-know | Strings, instants, and signals that are not color alone |
| 2.0 Placement | Alternate | An alternate check for the must-know outcomes |
| 2.19 Evidence for the next level | On the path | What you can show, and the case for Junior |

## Junior

For developers who already practice version control, testing, and review, and who are now responsible for changes inside a living system. The title on the offer letter is irrelevant.

When they finish, they can turn a vague report into a change they can undo, extend the local design, change stored data so old and new records both work, tell from logs or metrics whether the change is healthy, explain at-least-once delivery, and estimate the next slice.

The project thread is one orders system: cancel, totals, a gift note, buyer email, the charge, coupons, and a delivery-address change.

13 modules, 18 lessons. One path.

Must-know, and these open Senior:

- 3.1 Learning a codebase
- 3.2 From a report to a release
- 3.4 Data changes and migrations
- 3.6 Queues, events, and delivery
- 3.8 Observability and junior-scope incidents
- 3.9a Slices and estimates
- 3.11 Ship one order change

Should-know, which can be skipped: a feature-flag rollout, abuses of one operation, a query at a realistic size, and pairing so someone else can drive.

The rest of the path (matching an existing design, changing a pattern with tests pinned, API contracts, tests that match the risk, where to specialize, and the evidence lesson) is taught in order and does not lock Senior. Generated code is checked against the local pattern. The capstone is code, in any language, plus a review description. The address write is one conditional update, and old free-text addresses stay readable while the new columns are filled.

| Module | What it covers |
| --- | --- |
| 3.1 Learning a codebase | One user action, the data it writes, and the words the code uses |
| 3.2 From report to release | A vague report becomes a change you can undo |
| 3.3 Working with an existing design | Extend the local pattern, including a generated diff, and then change a pattern with the tests pinned |
| 3.4 Data changes and migrations | Expand, migrate, contract, for buyer email on an order |
| 3.5 APIs and contracts | What callers may rely on, and how a charge on an order changes shape |
| 3.6 Queues, events, and delivery | At-least-once delivery and a dedupe key. Must-know. Taught after contracts |
| 3.7 Testing in a larger system | Unit, integration, and the one thing you must not fake |
| 3.8 Observability and junior-scope incidents | One signal that it works, one that it fails, and the first steps |
| 3.9 Collaboration, estimation, and everyday quality | Slices for a delivery-address change. The slice lesson is must-know |
| 3.10 Where to specialize next | Frontend, mobile, data, site reliability, and security, as pointers |
| 3.11 Orders capstone | A guarded address write, with structured fields for old free-text rows |
| 3.0 Placement | An alternate check for the must-know outcomes |
| 3.12 Evidence for the next level | What you can show, and the case for Senior |

## Senior

For engineers who already ship reliable changes and are ready to own an area: its design, its health, and the growth of the people who change it. Scope defines the level, not a title.

When they finish, they can frame a problem with non-goals, compare real design options and land a first stage, keep interfaces and stored data compatible, specify failure behavior, hand another engineer an outcome they can own, refuse an unsafe cache, and name an abuse path.

14 modules, 19 lessons. One path.

Must-know, and these open Technical leader: problem framing, the design with options and a rollout, interfaces, evolving stored data, failure behavior and a runbook, delivery strategy, budgets and the abuse path (4.9a), caching (4.10), review and mentoring, and the area capstone (4.12).

Should-know: build versus buy, repairing domain language, a blameless review, and a capacity sketch.

On the path, and not part of the gate: a requirement session with product or design, privacy and deletion, technical debt, and the evidence lesson. Review treats a generated design the same way it treats a teammate's. The capstone is a design note plus a guarded status transition in any language. The function performs the transition as one conditional update.

| Module | What it covers |
| --- | --- |
| 4.1 Problem framing | Outcomes, constraints, and non-goals, then a session with product or design |
| 4.2 Design and tradeoffs | Options, the hard part, and a decision the next editor can find |
| 4.3 Interfaces that survive change | Errors, retries, and a field you will not expose |
| 4.4 Privacy and personal data | Minimization, who may see a record, and a deletion request. Taught before data evolution |
| 4.5 Data evolution at area scale | Writers, readers, backfills, and one meaning per state |
| 4.6 Reliability and operability | Failure behavior, a signal, and a runbook someone else can use |
| 4.7 Delivery strategy | Ship the risky assumption first, and know the last reversible step |
| 4.8 Technical debt | Name it, size it, and give it a trigger |
| 4.9 Performance, cost, and security constraints | A budget, the dominant cost, and the abuse path. The abuse-path lesson is must-know |
| 4.10 Caching | What may be stale, and when to refuse a cache. Must-know. Taught before review |
| 4.11 Review and mentoring | Systemic risk in review, including a generated design, and an outcome someone else can own |
| 4.12 Area capstone | A guarded status transition and a conditional update |
| 4.0 Placement | An alternate check for the must-know outcomes |
| 4.13 Evidence for the next level | What you can show, and the case for technical leadership |

## Technical leader

For people who already operate as seniors and now steer several engineers or several systems. Staff-level individual contributors and engineering managers both belong here, in different mixes. The curriculum is technical leadership: direction, decisions, boundaries, and delivery. It is not a people-management handbook and not one vendor's career framework.

When they finish, they can publish a strategy with kill criteria, keep features, migrations, and reliability on one ordered list, record a cross-team decision with an owner and a revisit condition, give each production behavior an owner, lead an incident, and leave a bench that can make a class of decision they used to make alone.

11 modules, 14 lessons. The scenario throughout is one checkout used by three product teams. One path. Feedback conversations, performance reviews, and onboarding are named as out of scope.

Must-know, and these finish the level:

- 5.1 Strategy and kill criteria
- 5.3 Decisions across teams
- 5.4 Organizational architecture
- 5.5 Incident leadership
- 5.6 A bench for decisions you make alone
- 5.9 Set direction for checkout

Should-know: external constraints you already promised, a portfolio of engineering cost, and hiring for a missing signal.

Now / next / later, saying no, and delivery stewardship are on the path and do not gate completion. Delivery stewardship includes a team policy for generated code. The capstone is the strategy, the decision, the boundary, the incident action, and a reconciliation query that shows whether the duplicate-charge fix held.

| Module | What it covers |
| --- | --- |
| 5.1 Strategy and bets | A few bets, explicit non-goals, and a way to stop |
| 5.2 Prioritization and sequencing | One list, and a sentence for the item that waits |
| 5.3 Decisions across teams | Options on the table, an owner, and a date to revisit |
| 5.4 Organizational architecture | A behavior has an owner, or a contract that makes the meeting unnecessary |
| 5.5 Quality, risk, and incident leadership | Roles in a severe incident, and a short follow-through |
| 5.6 Growing engineers and the leadership bench | A decision you currently make, made by someone else next time |
| 5.7 Communication, conflict, and saying no | Two audiences, a written decision, and a no that includes what would change it |
| 5.8 Delivery systems and stewardship | Shorten a wait you control, reward the strategy you stated, and set a policy for generated code |
| 5.9 Checkout capstone | Strategy, decision, boundary, incident action, and a reconciliation query |
| 5.0 Placement | An alternate check for the must-know outcomes |
| 5.10 Evidence for what you do next | The case for technical direction, a specialization, or the people-management work this path leaves out |

## The site

There is no build step and no server-side app. `index.html` loads the curriculum scripts and `js/app.js`. Pages use hash routes:

- `#/` the path
- `#/level/:id` a level
- `#/module/:id` a module and its lessons
- `#/lesson/:id` one lesson

Progress is stored in this browser under the key `joe-learner-edition-2`: which rubric lines are checked, the theme (system, light, or dark), and whether preview is on. A saved edition 1 file is copied forward once. Checks move with the lesson when its rubric is unchanged. Placement checks, and lessons whose exercise changed, are left unchecked. Export and import move that JSON. Clearing progress asks for confirmation first.

A lesson marked as placement satisfies that level's gate on its own. The must-know lessons remain the teaching path. The level page shows a pace estimate.

Preview lets you read a locked level. Turning it off puts those lessons back behind the gate. The lesson files are in the page, so the gate is a study rule. It is not a way to hide the text from someone who reads the source.

A lesson is complete when every rubric line is checked. On a small screen the module list opens from the header.

Serve the folder with any static file server, then open the site:

```bash
python3 -m http.server
```

Then visit `http://127.0.0.1:8000/`.

## Project layout

```
index.html                 Page shell
css/site.css               Layout, light and dark themes
js/register.js             registerLevel()
js/app.js                  Routing, gates, progress, rendering
js/curriculum/beginner.js  Level 1
js/curriculum/graduate.js  Level 2
js/curriculum/junior.js    Level 3
js/curriculum/senior.js    Level 4
js/curriculum/leader.js    Level 5
```

Edition 2. Add or change a lesson in the matching curriculum file. Keep concept, worked example, and exercise together. Mark the lesson `must`, `should`, or `core` so the gate stays aligned with the outcomes above. Lesson ids follow teaching order. Changing an id needs a progress map in `js/app.js`.
