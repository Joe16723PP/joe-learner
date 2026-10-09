# Improvement checklist

Topic and content improvements for the curriculum. Site features are out of scope for now.

Suggested order: teach the assumed prerequisites first, then add AI-assisted development, then fix the gating contradictions.

## 1. Teach what later lessons already assume

- [ ] **Exceptions.** Add raising and catching errors to Beginner. 2.3 requires invalid dates to raise a documented exception, and 1.14 skips malformed lines, but no lesson teaches `try`/`except` or `raise`.
- [ ] **Imports, modules, and records.** Add to Beginner. 2.12 splits the contact book into modules with an import direction, but Beginner never covers `import`, multiple files, or grouping fields into a record.
- [ ] **Deployment and environments.** Add between 2.11 and 3.2: build artifacts, staging versus production, per-environment configuration, and what a pipeline does. 3.2 expects a release with a rollback note.
- [ ] **Queues, events, and at-least-once delivery.** Add at Junior or Senior. 5.3 asks for at-least-once delivery with a dedupe key, and background jobs are only named in 2.13.
- [ ] **Caching.** Add at Junior or Senior. 4.8 asks the learner to block a cache design on staleness without a lesson on caching.

## 2. Add missing topics

- [ ] **AI-assisted development.** Cover it across levels:
  - [ ] New graduate: review a generated change (2.9) and keep secrets out of prompts (2.10).
  - [ ] Junior: check generated code against the local pattern (3.3).
  - [ ] Senior: review generated code for systemic risk (4.8).
  - [ ] Technical leader: set a team policy (5.8).
- [ ] **Refactoring and legacy code.** Pin current behavior with tests, then restructure safely. 3.3 extends a pattern but does not change one.
- [ ] **Career navigation.** One short lesson per level: evidence of scope, asking for feedback, and making the case for the next level, framed as outcomes, not titles.
- [ ] **Privacy and personal data.** Data minimization, deletion requests, and who may see what. Today only 2.8 (logs) and 4.4a (retention) touch it.
- [ ] **Technical debt at Senior.** Name, size, and pay down debt in an owned area. Today it appears only as a bucket in 5.2b.
- [ ] **Working with product and design.** Practice handling requirements with a product manager or designer, beyond 4.1's stakeholder message.
- [ ] **State the path's scope.** All scenarios are backend (contact book, orders, SQL, HTTP, checkout). Either say it is a backend-leaning generalist path, or add a "where to specialize next" section after Junior (frontend, mobile, data, SRE, security).
- [ ] **Staff engineer and engineering manager split.** Technical leader says both belong there but teaches no people management. At minimum, name what is out of scope (feedback, performance conversations, onboarding) and where to learn it.

## 3. Fix gating contradictions

- [ ] **Security at Junior and Senior.** 2.10 gates because "security comes later ships the hole now," but later security is optional or non-gating (3.5b is should-know, 4.7a is core). Make the abuse path in 4.7 must-know, or fold it into a lesson that already gates.
- [ ] **Automated checks.** Move 2.11 from should-know to must-know. 2.9 review and 3.2 release both depend on it.
- [ ] **Collaboration and estimation.** 3.8a is core, but Senior's 4.6 and 4.8 assume the learner can slice work and estimate. Consider making it must-know.
- [ ] **Junior's project thread.** The README says Junior follows the orders thread, but the lessons switch between order cancel (3.1), currency billing (3.2), a profile service (3.3), the contact book (3.4), charges (3.5), coupons (3.6), and password reset (3.8). Move them onto one orders system, or correct the README.

## 4. Deepen existing content

- [ ] **Thin should-know lessons.** Expand the concept sections, which run about 220–380 characters against 700–1,200 for must-know:
  - [ ] 3.6b A query at a realistic size
  - [ ] 4.7b A capacity sketch
  - [ ] 5.1b Constraints you already promised
  - [ ] 5.2b A portfolio of engineering cost
  - [ ] 5.6b Hiring for a missing signal
- [ ] **Hands-on code after New graduate.** Every Junior exercise is a written plan or trace. Add one coding exercise per level, in any language.
- [ ] **End-of-level projects.** Add one final exercise for Junior, Senior, and Technical leader that combines the level's must-know outcomes in one scenario, like 1.14 does for Beginner.
- [ ] **Time estimates.** Add expected hours or weeks per level or module so learners and mentors can plan.
- [ ] **Starting in the middle.** Add a placement check or "test out" exercise per level, so experienced developers don't have to complete all 16 Beginner lessons first.
