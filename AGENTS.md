# Joe Learner — Agent Instructions

## Quick start

This is a dependency-free static curriculum site. Read `README.md` for the lesson model and runbook. Open `index.html` directly or serve this directory with `npx serve` before verifying browser behavior.

## Boundaries

- Keep the curriculum language-agnostic except where the README explicitly allows JavaScript examples.
- Preserve the level gates, must-know versus should-know distinction, and browser self-check behavior.
- Keep learner progress local to the existing browser-storage contract; do not add network persistence.
- Do not add a build dependency or framework for a static-site change.

## Verification

There is no build step. For changes to HTML, CSS, or JavaScript, serve the directory, exercise the changed route and its local-storage path in a browser, and record the browser path and result. Check the diff for accidental changes to lesson text, route data, or saved-progress keys.

## Navigation

- `index.html` — shell and entry point
- `js/` — curriculum and interaction logic
- `css/` — site styling
- `README.md` — product model and local runbook
