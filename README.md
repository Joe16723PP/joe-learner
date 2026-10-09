# Joe Learner

A static teaching site for one development path, from a first program to technical leadership.

Levels describe the work, not a job title. A learner moves on by demonstrating outcomes. The next level stays closed until the must-know exercises of the current level are done. Should-know work can wait.

Concepts stay language-agnostic. Python 3 appears only in Beginner examples, where a language is required to show the idea. From New graduate upward, the subject is engineering practice. Examples use shared tools (Git, HTTP, SQL) and do not assume one company stack.

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
| Beginner | Small programs and core data structures | All 16 lessons |
| New graduate | Everyday practices of a software team | 11 must-know lessons (2.1–2.10) |
| Junior | A change inside a living system, from report through support | 4 must-know lessons |
| Senior | An area: problem, design, operability, and other engineers | 7 must-know lessons |
| Technical leader | Direction across areas: bets, decisions, boundaries, delivery | 5 must-know lessons finish this level |

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

When they finish, they can read and write small Python 3 programs, choose a fitting data structure and explain the choice, trace a program and fix simple logic bugs, and break a problem into functions that save data in a text file.

14 modules, 16 lessons. Every lesson is must-know.

| Module | What it covers |
| --- | --- |
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
| 1.14 Text files and a finished program | Data that outlives one run, and a contact book |

## New graduate

For people who can already write small programs and want to work the way a team works.

Must-know, when they finish: clone and branch, trace one behavior in unfamiliar code, add a failing test and describe the change, and keep secrets out of the repository while separating user-facing errors from logs.

17 modules, 18 lessons. Must-know is 2.1–2.10. Should-know is 2.11–2.17.

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
| 2.10 Security habits | Must-know | Secrets, parameters, and who is calling versus what they may do |
| 2.11 Automated checks | Should-know | One command the team runs before a change is shared |
| 2.12 Modules, coupling, and cohesion | Should-know | One reason to change, and a direction for imports |
| 2.13 Concurrency as a concept | Should-know | Lost updates, locks, and one owner of the data |
| 2.14 Measuring | Should-know | A question, a baseline, and the spread across a few runs |
| 2.15 Writing for the next reader | Should-know | Names, constraints, and a README that can stand alone |
| 2.16 Dependencies and reproducible setup | Should-know | A declared, pinned set that installs on a clean machine |
| 2.17 Locales, text, and access | Should-know | Strings, instants, and signals that are not color alone |

## Junior

For developers who already practice version control, testing, and review, and who are now responsible for changes inside a living system. The title on the offer letter is irrelevant.

When they finish, they can turn a vague report into a change they can undo, extend the local design, change stored data so old and new records both work, and tell from logs or metrics whether the change is healthy.

8 modules, 12 lessons. One path.

Must-know, and these open Senior:

- 3.1 Learning a codebase
- 3.2 From a report to a release
- 3.4 Data changes and migrations
- 3.7 Observability and junior-scope incidents

Should-know, which can be skipped: a feature-flag rollout, abuses of one operation, a query at a realistic size, and pairing so someone else can drive.

The rest of the path (matching an existing design, API contracts, tests that match the risk, and estimation) is taught in order and does not lock Senior.

| Module | What it covers |
| --- | --- |
| 3.1 Learning a codebase | One user action, the data it writes, and the words the code uses |
| 3.2 From report to release | A vague report becomes a change you can undo |
| 3.3 Working with an existing design | Extend the local pattern, and say so when the pattern is the defect |
| 3.4 Data changes and migrations | Expand, migrate, contract, so old and new rows both work |
| 3.5 APIs and contracts | What callers may rely on, and how a break is sequenced |
| 3.6 Testing in a larger system | Unit, integration, and the one thing you must not fake |
| 3.7 Observability and junior-scope incidents | One signal that it works, one that it fails, and the first steps |
| 3.8 Collaboration, estimation, and everyday quality | Slices, blockers, and a checklist you actually use |

## Senior

For engineers who already ship reliable changes and are ready to own an area: its design, its health, and the growth of the people who change it. Scope defines the level, not a title.

When they finish, they can frame a problem with non-goals, compare real design options and land a first stage, keep interfaces and stored data compatible, specify failure behavior, and hand another engineer an outcome they can own.

8 modules, 12 lessons. One path.

Must-know, and these open Technical leader: problem framing, the design with options and a rollout, interfaces, evolving stored data, failure behavior and a runbook, delivery strategy, and review and mentoring.

Should-know: build versus buy, repairing domain language, a blameless review, and a capacity sketch.

The budget, dominant-cost, and abuse-path lesson sits on the path and does not lock the next level.

| Module | What it covers |
| --- | --- |
| 4.1 Problem framing | Outcomes, constraints, and non-goals before a design |
| 4.2 Design and tradeoffs | Options, the hard part, and a decision the next editor can find |
| 4.3 Interfaces that survive change | Errors, retries, and a field you will not expose |
| 4.4 Data evolution at area scale | Writers, readers, backfills, and one meaning per state |
| 4.5 Reliability and operability | Failure behavior, a signal, and a runbook someone else can use |
| 4.6 Delivery strategy | Ship the risky assumption first, and know the last reversible step |
| 4.7 Performance, cost, and security constraints | A budget, the dominant cost, and the abuse path |
| 4.8 Review and mentoring | Systemic risk in review, and an outcome someone else can own |

## Technical leader

For people who already operate as seniors and now steer several engineers or several systems. Staff-level individual contributors and engineering managers both belong here, in different mixes. The curriculum is technical leadership: direction, decisions, boundaries, and delivery. It is not a people-management handbook and not one vendor's career framework.

When they finish, they can publish a strategy with kill criteria, keep features, migrations, and reliability on one ordered list, record a cross-team decision with an owner and a revisit condition, give each production behavior an owner, lead an incident, and leave a bench that can make a class of decision they used to make alone.

8 modules, 11 lessons. The scenario throughout is one checkout used by three product teams. One path.

Must-know, and these finish the level:

- 5.1 Strategy and kill criteria
- 5.3 Decisions across teams
- 5.4 Organizational architecture
- 5.5 Incident leadership
- 5.6 A bench for decisions you make alone

Should-know: external constraints you already promised, a portfolio of engineering cost, and hiring for a missing signal.

Now / next / later, saying no, and delivery stewardship are on the path and do not gate completion.

| Module | What it covers |
| --- | --- |
| 5.1 Strategy and bets | A few bets, explicit non-goals, and a way to stop |
| 5.2 Prioritization and sequencing | One list, and a sentence for the item that waits |
| 5.3 Decisions across teams | Options on the table, an owner, and a date to revisit |
| 5.4 Organizational architecture | A behavior has an owner, or a contract that makes the meeting unnecessary |
| 5.5 Quality, risk, and incident leadership | Roles in a severe incident, and a short follow-through |
| 5.6 Growing engineers and the leadership bench | A decision you currently make, made by someone else next time |
| 5.7 Communication, conflict, and saying no | Two audiences, a written decision, and a no that includes what would change it |
| 5.8 Delivery systems and stewardship | Shorten a wait you control, and reward the strategy you stated |

## The site

There is no build step and no server-side app. `index.html` loads the curriculum scripts and `js/app.js`. Pages use hash routes:

- `#/` the path
- `#/level/:id` a level
- `#/module/:id` a module and its lessons
- `#/lesson/:id` one lesson

Progress is stored in this browser under the key `joe-learner-edition-1`: which rubric lines are checked, the theme (system, light, or dark), and whether preview is on. Export and import move that JSON. Clearing progress asks for confirmation first.

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

Edition 1. Add or change a lesson in the matching curriculum file. Keep concept, worked example, and exercise together. Mark the lesson `must`, `should`, or `core` so the gate stays aligned with the outcomes above.
