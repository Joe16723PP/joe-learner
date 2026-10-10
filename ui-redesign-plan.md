# Joe Learner visual redesign implementation plan

## 1. Objective

Refresh the landing page so it feels warmer, more welcoming, and more human while preserving the existing product promise:

> A clear, gated learning path from first programs to technical leadership.

The redesign should improve:

- First-impression warmth
- Understanding of the learning journey
- Confidence about where to begin
- Visibility of progress for returning learners
- Visual hierarchy and perceived polish

It must not change:

- Lesson content
- Level gates
- Must-know versus should-know semantics
- Browser-only progress storage
- Hash-based routing
- Static-site architecture
- Existing lesson, module, theme, import, export, or reset behavior

The generated visual reference is only a design direction. Do not add it as a page background or production asset. Implement the interface with HTML and CSS so it remains responsive, accessible, and consistent with the existing app.

## 2. Current baseline

The current working tree already contains an initial version of this direction:

- A “Path at a glance” statistics row
- A “Your next step” journey card
- A progress meter
- A five-level vertical path
- Dynamic resume behavior
- Dynamic must-know completion counts

Relevant files:

- `js/app.js`
- `css/site.css`
- `index.html`

Treat the existing changes in these files as intentional working state. Do not reset or overwrite them.

## 3. Target landing-page structure

```text
Sticky header
├── Joe Learner brand
├── How it works anchor
├── Optional theme control
└── Start learning action

Hero section
├── Left: welcome and primary action
│   ├── Eyebrow: A teaching path
│   ├── Main headline
│   ├── Short explanation
│   ├── Primary CTA
│   ├── Secondary “How it works” link
│   └── Curriculum statistics
└── Right: Your learning path card
    ├── Active level
    ├── Must-know completion count
    ├── Progress meter
    └── Five-level path

Benefits section
├── One clear path
├── Practice that proves itself
└── Progress stays yours

Learning model section
├── Concept
├── Worked example
└── Exercise

Footer controls
├── Edition note
├── Theme
├── Preview
├── Export
├── Import
└── Clear progress
```

## 4. Header implementation

### Desktop

Use a compact sticky header with:

- Brand on the left: `Joe Learner`
- One meaningful anchor link: `How it works`
- Optional small theme control
- Primary `Start learning` button on the right

The header should remain approximately 64–72px tall, use a dark charcoal surface, keep the mint action visually dominant, and retain a thin accent rule or subtle bottom border.

Do not add account, pricing, or generic marketing links. Every navigation item must map to a real route or section.

### Mobile

At widths below the existing mobile breakpoint:

- Keep the brand visible
- Hide non-essential navigation
- Keep only the primary action or a compact menu button
- Do not create a second navigation system if the existing app already has one

## 5. Hero implementation

### Left side

Use:

- Eyebrow: `A teaching path`
- Large editorial serif heading: `From first programs to technical leadership.`
- Supporting copy based on the existing repository wording

Recommended supporting copy:

> A backend-leaning generalist path that starts with small programs, builds team practice, and grows toward owning systems, areas, and technical direction.

Do not introduce unsupported claims such as guaranteed job readiness, portfolio-building promises, people-management training, or career outcomes not represented in the README.

### Actions

Primary action:

- First-time learner: `Start at Beginner`
- Returning learner: `Resume Beginner`, `Resume Junior`, etc., using the existing resume logic

Secondary action:

- `How the levels fit`

The primary action should remain the largest control on the page.

### Curriculum statistics

Keep these values derived from the curriculum data rather than hardcoded:

- Number of levels
- Number of lessons
- Number of must-know checks

The current expected values are:

- `5 levels`
- `92 lessons`
- `54 must-know checks`

Recommended implementation:

```js
const totalLessons = LEVELS.reduce(
  (total, level) => total + lessonsIn(level).length,
  0,
);

const totalMust = LEVELS.reduce(
  (total, level) => total + mustLessons(level).length,
  0,
);
```

Use semantic markup:

```html
<dl class="path-facts" aria-label="Path at a glance">
  <div>
    <dt>5</dt>
    <dd>levels</dd>
  </div>
</dl>
```

## 6. “Your learning path” card

This is the main visual improvement from the reference image.

### Card contents

Include:

- Label: `Your next step`
- Active level title
- Completion count, for example `1/18`
- Short contextual sentence
- Horizontal progress meter
- Five-level vertical route

Example first-time state:

```text
YOUR NEXT STEP
Beginner                                0/18

Begin with one small program, then build toward larger systems.

[ empty progress bar ]

must-know exercises complete
```

Example returning state:

```text
YOUR NEXT STEP
Beginner                                1/18

Keep building from the last exercise you recorded.

[ partially filled progress bar ]

must-know exercises complete
```

### Active-level logic

Preserve the existing model:

```js
const active =
  LEVELS.find(
    (level) => isLevelUnlocked(level) && !levelGateMet(level),
  ) || LEVELS[LEVELS.length - 1];
```

The first unlocked incomplete level is active. Once a level is complete, the next unlocked level becomes active. If every level is complete, Technical leader remains the final active level.

### Progress logic

Use completed must-know lessons, not individual rubric checkboxes:

```js
const activeMust = mustLessons(active);
const activeDone = activeMust.filter(isLessonComplete).length;
```

The label must say `must-know exercises complete`. Do not label it overall mastery, skill level, or percentage learned.

### Five-level path

Keep these level states:

- Beginner
- New graduate
- Junior
- Senior
- Technical leader

Each station should show its number, level title, short promise, and current state. Possible state labels include `Open`, `Closed`, `1 of 18 must-know`, `Must-know done`, and `Gate open`.

Closed levels must remain understandable without relying only on color.

## 7. Benefits section

Convert the current plain top-border treatment into three compact card-like panels while preserving the existing meaning.

### One clear path

> Stay inside one level at a time. Later lessons remain closed until the must-know outcomes are fluent.

### Practice that proves itself

> Each lesson moves from concept to worked example to an exercise with a clear definition of done.

### Progress stays yours

> Checks stay in this browser. The page does not inspect your programs or notes.

Each card should have a small icon or CSS-built mark, serif heading, short body copy, light paper background, thin border, small radius, and restrained shadow.

Avoid emoji icons. Prefer inline SVG or simple CSS line icons. Decorative icons should use `aria-hidden="true"`.

## 8. Learning model section

Keep the existing three concepts:

- Concept
- Worked example
- Exercise

Visually distinguish this section from the hero with a lighter band or subtle border. Use three columns on desktop and one column on mobile.

Recommended hierarchy:

```text
01  Concept
    Understand the idea in the words this level uses.

02  Worked example
    Follow one small instance from start to end.

03  Exercise
    Work without the example and check the result.
```

Do not turn this into an onboarding wizard. It remains explanatory content.

## 9. Visual system

Recommended light-theme tokens:

```css
--bg: #f5efe5;
--bg-2: #ebe3d7;
--paper: #fffdf9;
--ink: #171614;
--muted: #5d625f;
--line: #d9d2c8;
--accent: #b7e6c9;
--accent-strong: #4f8b68;
--on-accent: #11251a;
--code-bg: #24211d;
--code-ink: #f7f3eb;
```

Keep level-specific accents restrained:

- Beginner: mint / sage
- New graduate: muted blue
- Junior: ochre
- Senior: muted coral
- Technical leader: muted lavender

Use those hues only for level markers, small state labels, progress fills, and active route accents.

Continue using the existing font strategy:

- Serif display font for hero and major card headings
- Sans-serif for body text and controls
- Monospace for counts, lesson IDs, and code

Avoid gradients, neon colors, heavy glassmorphism, stock photos, and excessive animation.

## 10. Dark-theme behavior

Preserve system, explicit light, and explicit dark theme behavior. Add a dark variant for the new surfaces:

```css
:root[data-theme="dark"] {
  --bg: #141615;
  --bg-2: #202522;
  --paper: #1d211f;
  --ink: #f5f1e9;
  --muted: #c3c8c3;
  --line: #3a413d;
  --accent: #a9dec0;
  --accent-strong: #9ed9bc;
  --on-accent: #102118;
}
```

The mint button, progress meter, muted copy, card boundaries, and level states must remain readable in dark mode. Do not remove the existing theme control or change its browser-storage contract.

## 11. Responsive behavior

### Desktop: 1100px and above

- Hero uses two columns
- Left copy occupies approximately 55–60%
- Journey card occupies approximately 40–45%
- Benefits use three columns
- Learning model uses three columns
- Header has the full action layout

### Tablet: 641–1099px

- Hero may remain two columns if content fits
- Reduce gap and heading size
- Keep the journey card at least approximately 320px wide
- Switch benefits to one column if necessary

### Mobile: 640px and below

Order the content as:

1. Header
2. Hero heading
3. Supporting copy
4. Primary CTA
5. Secondary link
6. Stats
7. Journey card
8. Benefits
9. Learning model
10. Footer controls

Mobile requirements:

- No horizontal scrolling
- Journey card fills available width
- Stats wrap cleanly
- Level descriptions wrap naturally
- Buttons remain approximately 44px tall or larger
- Primary CTA is full-width or nearly full-width
- Decorative lines do not clip at the viewport edge

## 12. JavaScript implementation

Continue using the existing static architecture. Do not add React, a build system, a component library, new dependencies, network APIs, or server persistence.

If `renderHome()` becomes too large, optionally extract:

```js
function pathStats() {}
function activePathState() {}
function renderJourneyCard(active, activeDone, activeMust) {}
function renderPathStations() {}
function renderHomeBenefits() {}
```

Use only the existing state:

- `state.checks`
- `state.theme`
- `state.preview`
- `state.last`
- `state.seenUnlock`

Preserve resume behavior:

```js
const resume = resumeLesson();
const started = Object.values(state.checks)
  .some((marks) => marks.some(Boolean));
```

Expected behavior:

- No progress: CTA is `Start at Beginner`
- Any recorded progress: CTA is `Resume <level>`
- CTA points to the existing resume lesson
- Completing a lesson updates the home card
- Unlocking a level still shows the existing banner

## 13. CSS implementation

Update `css/site.css` in these groups:

1. Color tokens
2. Header/navigation treatment
3. Hero layout
4. Statistics row
5. Journey card
6. Station/path states
7. Benefit cards
8. Learning model cards
9. Mobile layout
10. Dark-theme overrides
11. Reduced-motion behavior

Keep home-only selectors grouped near the existing `.home`, `.hero`, `.rules`, and `.shape` styles. Prefer existing classes such as `.button`, `.quiet`, `.kicker`, `.path`, and `.station` instead of creating duplicate button or typography systems.

Suggested class names:

```text
.home
.hero
.hero-copy
.hero-actions
.path-facts
.journey-card
.journey-head
.journey-count
.journey-copy
.journey-meter
.journey-caption
.path
.station
.station .num
.station .state
.benefits
.benefit-card
.learning-model
.learning-step
```

## 14. Cache versioning

If JavaScript or CSS changes, update the query-string cache version in `index.html` once for the implementation batch:

```html
<link rel="stylesheet" href="css/site.css?edition=7">
<script src="js/app.js?edition=7"></script>
```

Leave curriculum script versions unchanged unless curriculum files are modified.

## 15. Accessibility requirements

The implementation is complete only if:

- The page has one clear `h1`
- The journey card has a meaningful heading
- Benefits and learning steps use correct heading levels
- The progress meter has an accessible label
- Links and buttons have visible focus states
- Primary controls are keyboard reachable
- Closed states do not rely only on color
- Text remains readable in light and dark themes
- Buttons meet comfortable touch targets
- Decorative icons are hidden from screen readers
- The route remains understandable when CSS is disabled
- The “How it works” anchor works with keyboard navigation
- `prefers-reduced-motion` remains respected

## 16. Verification plan

Run from the project directory:

```bash
cd /Users/jirotjoe/Projects/joe-learner
python3 -m http.server 4173
```

### Home page

- Open `http://127.0.0.1:4173/#/`
- Confirm the hero layout renders
- Confirm statistics match the curriculum
- Confirm Beginner is active for a new browser state
- Confirm the journey card shows `0/18`
- Confirm `Start at Beginner` opens the first lesson
- Confirm `How it works` scrolls to the correct section

### Progress flow

- Open lesson `1.1`
- Complete one rubric item
- Confirm the lesson changes to `IN PROGRESS`
- Return home
- Confirm the active level card updates appropriately
- Complete all rubric items
- Confirm the station state changes correctly
- Confirm the resume link moves to the next lesson

### Gate behavior

- Confirm New graduate remains closed before Beginner’s must-know gate is complete
- Confirm unlocking behavior is unchanged
- Confirm the existing unlock banner still works
- Confirm preview mode reveals locked content without changing the gate

### Theme behavior

- Test system theme
- Test explicit light theme
- Test explicit dark theme
- Confirm contrast and card boundaries in all themes

### Responsive checks

Inspect these viewports:

- Desktop: `1280 × 900`
- Tablet: `900 × 900`
- Mobile: `390 × 844`

Check for horizontal overflow, clipped route markers, overlapping card content, usable buttons, correct statistics wrapping, and logical mobile order.

### Browser and code checks

Run:

```bash
git diff --check
```

Inspect the browser console for JavaScript errors, failed asset loads, invalid route warnings, and accessibility-related runtime errors.

Do not change saved progress keys during the redesign.

## 17. Acceptance criteria

The redesign is ready when:

- A new learner can understand what Joe Learner is within five seconds
- The first action is visually obvious
- The active level and next step are visible without navigating
- Returning learners can resume from the home page
- The five-level path remains understandable
- Must-know gates remain accurate
- The page feels warmer without becoming childish or gamified
- The visual hierarchy matches the generated reference
- The page works at desktop, tablet, and mobile widths
- Light and dark themes remain usable
- No new dependency or framework is introduced
- Existing lesson and progress behavior passes regression testing
- `git diff --check` passes

## 18. Suggested handoff sequence

1. Review the generated visual reference and this plan.
2. Inspect the current uncommitted landing-page changes.
3. Refine the light-theme visual tokens.
4. Refine the header and hero layout.
5. Refine the journey card and level states.
6. Convert the benefits section into compact cards.
7. Improve responsive behavior.
8. Test progress and gate behavior.
9. Test light, dark, desktop, tablet, and mobile views.
10. Run `git diff --check`.
11. Report changed files, screenshots inspected, and remaining visual risks.
