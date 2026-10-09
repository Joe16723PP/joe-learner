const STORAGE_KEY = "joe-learner-edition-1";

const HUES = {
  beginner: { light: "#1f6b45", dark: "#9ed9bc" },
  graduate: { light: "#1d4e89", dark: "#a9c8ef" },
  junior: { light: "#8a5a12", dark: "#e6c07a" },
  senior: { light: "#8c3a32", dark: "#f0a89a" },
  leader: { light: "#34327a", dark: "#c2c0f2" },
};

const state = {
  checks: {},
  theme: "system",
  preview: false,
  seenUnlock: {},
  last: null,
};

const session = {
  hideExample: {},
  fileTab: {},
  navOpen: false,
  banner: null,
  confirmReset: false,
};

let tabSeq = 0;
const index = {
  levels: new Map(),
  modules: new Map(),
  lessons: new Map(),
};

function lessonsIn(level) {
  return level.modules.flatMap((mod) => mod.lessons);
}

function mustLessons(level) {
  return lessonsIn(level).filter((lesson) => lesson.track === "must");
}

function isLessonComplete(lesson) {
  const rubric = lesson.exercise?.rubric || [];
  if (!rubric.length) return false;
  const marks = state.checks[lesson.id] || [];
  return rubric.every((_, i) => Boolean(marks[i]));
}

function placementLesson(level) {
  return lessonsIn(level).find((lesson) => lesson.placement);
}

function levelGateMet(level) {
  const placement = placementLesson(level);
  if (placement && isLessonComplete(placement)) return true;
  return mustLessons(level).every(isLessonComplete);
}

function isLevelUnlocked(level) {
  const i = LEVELS.findIndex((item) => item.id === level.id);
  if (i <= 0) return true;
  const prev = LEVELS[i - 1];
  return isLevelUnlocked(prev) && levelGateMet(prev);
}

function canRead(level) {
  return state.preview || isLevelUnlocked(level);
}

function levelById(id) {
  return index.levels.get(id);
}

function buildIndex() {
  LEVELS.forEach((level, levelIndex) => {
    index.levels.set(level.id, level);
    level.order = levelIndex;
    level.modules.forEach((mod, moduleIndex) => {
      mod.levelId = level.id;
      mod.prevId = moduleIndex === 0 ? null : level.modules[moduleIndex - 1].id;
      index.modules.set(mod.id, mod);
      mod.lessons.forEach((lesson) => {
        lesson.moduleId = mod.id;
        lesson.levelId = level.id;
        lesson.track = lesson.track || "core";
        index.lessons.set(lesson.id, lesson);
      });
    });
  });
}

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!raw || typeof raw !== "object") return;
    if (raw.checks && typeof raw.checks === "object") {
      for (const [id, marks] of Object.entries(raw.checks)) {
        if (!Array.isArray(marks)) continue;
        state.checks[id] = marks.map(Boolean);
      }
    }
    if (raw.theme === "light" || raw.theme === "dark" || raw.theme === "system") {
      state.theme = raw.theme;
    }
    state.preview = Boolean(raw.preview);
    state.last = typeof raw.last === "string" ? raw.last : null;
    if (raw.seenUnlock && typeof raw.seenUnlock === "object") {
      state.seenUnlock = raw.seenUnlock;
    }
  } catch {
    /* keep defaults */
  }
}

function save() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      checks: state.checks,
      theme: state.theme,
      preview: state.preview,
      seenUnlock: state.seenUnlock,
      last: state.last,
    }),
  );
}

function resolvedTheme() {
  if (state.theme === "light" || state.theme === "dark") return state.theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme() {
  const root = document.documentElement;
  if (state.theme === "system") delete root.dataset.theme;
  else root.dataset.theme = state.theme;
}

function applyLevelHue(levelId) {
  const root = document.documentElement;
  if (!levelId || !HUES[levelId]) {
    root.style.removeProperty("--level");
    return;
  }
  root.style.setProperty("--level", HUES[levelId][resolvedTheme()]);
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rich(text) {
  const source = String(text ?? "");
  const re = /\[\[([^\]]+)\]\]|`([^`]+)`/g;
  let out = "";
  let last = 0;
  let match;
  while ((match = re.exec(source))) {
    out += esc(source.slice(last, match.index));
    if (match[1]) out += linkRef(match[1]);
    else out += `<code>${esc(match[2])}</code>`;
    last = match.index + match[0].length;
  }
  out += esc(source.slice(last));
  return out;
}

function linkRef(id) {
  const lesson = index.lessons.get(id);
  const mod = index.modules.get(id);
  const target = lesson || mod;
  if (!target) return esc(`[[${id}]]`);
  const level = levelById(target.levelId);
  const title = lesson ? lesson.title : mod.title;
  if (!canRead(level)) return esc(title);
  const href = lesson ? `#/lesson/${encodeURIComponent(lesson.id)}` : `#/module/${encodeURIComponent(mod.id)}`;
  return `<a href="${href}">${esc(title)}</a>`;
}

function checksFor(lesson) {
  const marks = state.checks[lesson.id] || [];
  return (lesson.exercise?.rubric || []).map((_, i) => Boolean(marks[i]));
}

function statusWord(lesson) {
  if (isLessonComplete(lesson)) return "Done";
  const marks = state.checks[lesson.id] || [];
  if (marks.some(Boolean)) return "In progress";
  return "Not started";
}

function moduleStatus(mod) {
  const done = mod.lessons.filter(isLessonComplete).length;
  if (done === 0) return "none";
  if (done === mod.lessons.length) return "done";
  return "partial";
}

function focusLevel() {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (!isLevelUnlocked(level)) break;
    current = level;
    if (!levelGateMet(level)) return level;
  }
  return current;
}

function resumeLesson() {
  if (state.last && index.lessons.has(state.last)) {
    const lesson = index.lessons.get(state.last);
    const level = levelById(lesson.levelId);
    if (isLevelUnlocked(level) && !isLessonComplete(lesson)) return lesson;
  }
  const level = focusLevel();
  const all = lessonsIn(level);
  return (
    all.find((lesson) => lesson.track === "must" && !isLessonComplete(lesson)) ||
    all.find((lesson) => lesson.track === "core" && !isLessonComplete(lesson)) ||
    all.find((lesson) => !isLessonComplete(lesson)) ||
    all[0]
  );
}

function parseRoute() {
  const raw = (location.hash || "#/").replace(/^#/, "") || "/";
  const parts = raw.split("/").filter(Boolean).map(decodeURIComponent);
  if (parts.length === 0) return { name: "home" };
  if (parts[0] === "level" && parts[1]) return { name: "level", id: parts[1] };
  if (parts[0] === "module" && parts[1]) return { name: "module", id: parts[1] };
  if (parts[0] === "lesson" && parts[1]) return { name: "lesson", id: parts[1] };
  return { name: "missing" };
}

function levelFromRoute(route) {
  if (route.name === "level") return levelById(route.id) || null;
  if (route.name === "module" && index.modules.has(route.id)) {
    return levelById(index.modules.get(route.id).levelId);
  }
  if (route.name === "lesson" && index.lessons.has(route.id)) {
    return levelById(index.lessons.get(route.id).levelId);
  }
  return null;
}

function badge(track, level, lesson) {
  const hasOptional = lessonsIn(level).some((item) => item.track !== "must");
  const parts = [];
  if (hasOptional && track === "must") parts.push(`<span class="badge badge-must">Must-know</span>`);
  else if (hasOptional && track === "should") parts.push(`<span class="badge badge-should">Should-know</span>`);
  if (lesson && lesson.placement) parts.push(`<span class="badge badge-place">Placement</span>`);
  return parts.join(" ");
}

function blocksToHtml(blocks) {
  return (blocks || []).map(blockToHtml).join("");
}

function blockToHtml(block) {
  if (!block) return "";
  if (block.type === "p") return `<p>${rich(block.text)}</p>`;
  if (block.type === "ul" || block.type === "ol") {
    const tag = block.type;
    return `<${tag}>${block.items.map((item) => `<li>${rich(item)}</li>`).join("")}</${tag}>`;
  }
  if (block.type === "callout") {
    return `<aside class="callout"><h3>${esc(block.title || "Note")}</h3><p>${rich(block.text)}</p></aside>`;
  }
  if (block.type === "pre") {
    const label = block.caption || block.lang || "";
    return `${label ? `<p class="code-label">${esc(label)}</p>` : ""}<pre><code>${esc(block.code || "")}</code></pre>`;
  }
  if (block.type === "seq") {
    const title = block.title ? `<p class="caption">${esc(block.title)}</p>` : "";
    const items = (block.items || [])
      .map(
        (item, i) =>
          `<li><span class="n">${String(i + 1).padStart(2, "0")}</span><strong>${esc(item.h)}</strong><p>${rich(item.p)}</p></li>`,
      )
      .join("");
    return `${title}<ol class="seq">${items}</ol>`;
  }
  if (block.type === "stack") {
    const items = (block.items || []).map((item) => `<li>${esc(item)}</li>`).join("");
    const cap = block.caption || "Top of the stack is the first card.";
    return `<ol class="pile">${items}</ol><p class="caption">${esc(cap)}</p>`;
  }
  if (block.type === "table") {
    const head = `<tr>${(block.headers || []).map((cell) => `<th>${rich(cell)}</th>`).join("")}</tr>`;
    const rows = (block.rows || [])
      .map((row) => `<tr>${row.map((cell) => `<td>${rich(cell)}</td>`).join("")}</tr>`)
      .join("");
    const cap = block.caption ? `<p class="caption">${esc(block.caption)}</p>` : "";
    return `${cap}<div class="table-wrap"><table><thead>${head}</thead><tbody>${rows}</tbody></table></div>`;
  }
  if (block.type === "files") return filesToHtml(block.files || [], block.id || "");
  return "";
}

function filesToHtml(files, key) {
  if (!files.length) return "";
  const group = key || `files-${++tabSeq}`;
  const selected = Math.min(session.fileTab[group] || 0, files.length - 1);
  const tabs = files
    .map((file, i) => {
      const pressed = i === selected ? "true" : "false";
      return `<button type="button" role="tab" data-action="tab" data-group="${esc(group)}" data-index="${i}" aria-selected="${pressed}" id="${esc(group)}-tab-${i}">${esc(file.name)}</button>`;
    })
    .join("");
  const panel = `<pre><code>${esc(files[selected].code || "")}</code></pre>`;
  return `<div class="files"><div class="filetabs" role="tablist">${tabs}</div>${panel}</div>`;
}

function assumesLine(mod) {
  let prev = mod.prevId ? index.modules.get(mod.prevId) : null;
  while (prev && prev.lessons.every((lesson) => lesson.placement)) {
    prev = prev.prevId ? index.modules.get(prev.prevId) : null;
  }
  if (prev) {
    return `Assumes <a href="#/module/${encodeURIComponent(prev.id)}">${esc(prev.title)}</a>.`;
  }
  const level = levelById(mod.levelId);
  if (level.order === 0) return "No previous module. This is the foundation.";
  const prior = LEVELS[level.order - 1];
  return `Assumes the must-know outcomes of <a href="#/level/${prior.id}">${esc(prior.title)}</a>.`;
}

function renderHome() {
  document.title = "Joe Learner";
  const resume = resumeLesson();
  const started = Object.values(state.checks).some((marks) => marks.some(Boolean));
  const resumeLabel = started ? `Resume ${levelById(resume.levelId).title}` : "Start at Beginner";
  const stations = LEVELS.map((level) => {
    const open = isLevelUnlocked(level);
    const must = mustLessons(level);
    const done = must.filter(isLessonComplete).length;
    const placed = Boolean(placementLesson(level) && isLessonComplete(placementLesson(level)));
    let stateLabel = "Closed";
    if (open && done === must.length) stateLabel = "Must-know done";
    else if (open && placed) stateLabel = "Gate open";
    else if (open && done > 0) stateLabel = `${done} of ${must.length} must-know`;
    else if (open) stateLabel = "Open";
    return `<li class="station" style="--hue:${HUES[level.id][resolvedTheme()]}">
      <span class="num">${esc(level.num)}</span>
      <div>
        <h3><a href="#/level/${level.id}">${esc(level.title)}</a></h3>
        <p>${esc(level.promise)}</p>
        <span class="state">${esc(stateLabel)}</span>
      </div>
    </li>`;
  }).join("");

  return `<div class="home">
    <section class="hero">
      <div>
        <p class="kicker">A teaching path</p>
        <h1>From first programs to technical leadership.</h1>
        <p class="lede">Levels describe the work, not a job title. Each one assumes the previous outcomes are fluent, so later lessons do not re-teach them. The next level stays closed until the must-know exercises of this one are done. The path is a backend-leaning generalist path: programs, then team practice, then orders and a shared checkout.</p>
        <div class="hero-actions">
          <a class="button" href="#/lesson/${encodeURIComponent(resume.id)}">${esc(resumeLabel)}</a>
          <a class="quiet" href="#how">How the levels fit</a>
        </div>
      </div>
      <ol class="path">${stations}</ol>
    </section>
    <section class="rules" id="how">
      <article>
        <h2>One path</h2>
        <p>A learner is inside one level. Lessons from later levels stay off the path until the gate opens. Modules stay in the order written here.</p>
      </article>
      <article>
        <h2>Must-know opens the gate</h2>
        <p>Should-know work can wait. Skipping it does not lock the next level. Finishing means you can do the must-know outcomes.</p>
      </article>
      <article>
        <h2>Show the work</h2>
        <p>Each lesson is a concept, one worked example, and an exercise with a way to tell it is done. The check is yours, stored in this browser.</p>
      </article>
    </section>
    <section class="shape">
      <article>
        <h2>Concept</h2>
        <p>The idea in the words this level uses. A trace or a sequence appears when the idea is about change over time.</p>
      </article>
      <article>
        <h2>Worked example</h2>
        <p>A small instance with a start, the steps, and an end. You can follow it without inventing the missing pieces.</p>
      </article>
      <article>
        <h2>Exercise</h2>
        <p>One task you do with the example out of sight. The rubric is the definition of done: a result, a test, or a short written piece.</p>
      </article>
    </section>
    ${colophon()}
  </div>`;
}

function renderLevel(level) {
  document.title = `${level.title} · Joe Learner`;
  if (!canRead(level)) return locked(level);
  const must = mustLessons(level);
  const done = must.filter(isLessonComplete).length;
  const hasShould = lessonsIn(level).some((lesson) => lesson.track === "should");
  const hasCore = lessonsIn(level).some((lesson) => lesson.track === "core" && !lesson.placement && !lesson.career);
  const hasPlacement = Boolean(placementLesson(level));
  const next = LEVELS[level.order + 1];
  const alternate = hasPlacement ? " The placement check is an alternate way through the gate." : "";
  const gateCopy = next
    ? `${esc(next.title)} opens when these must-know exercises are done (${done} of ${must.length}).${alternate}`
    : `These exercises finish the level (${done} of ${must.length}).${alternate}`;
  const meter = levelGateMet(level) ? 100 : must.length ? Math.round((done / must.length) * 100) : 0;

  const paceFact = level.pace ? `<div><dt>Pace</dt><dd>${esc(level.pace)}</dd></div>` : "";
  const facts = `<dl class="facts">
    <div><dt>Who it is for</dt><dd>${esc(level.audience)}</dd></div>
    <div><dt>Prerequisites</dt><dd>${esc(level.prerequisites)}</dd></div>
    <div><dt>How it builds</dt><dd>${esc(level.buildsOn)}</dd></div>
    ${paceFact}
  </dl>`;

  const outcomes = `<h2>What you can do when you finish</h2><ul>${level.canDo
    .map((item) => `<li>${esc(item)}</li>`)
    .join("")}</ul>`;

  let modulesHtml = "";
  if (hasShould && !hasCore) {
    const side = level.modules.filter((mod) => mod.lessons.some((lesson) => lesson.placement || lesson.career));
    const sideHtml = side.length
      ? `<h2>Also on this level</h2><p>The placement check is an alternate way through the gate. The evidence lesson does not lock the next level.</p>${moduleList(side)}`
      : "";
    modulesHtml = `<p>${gateCopy}</p>${trackSection(level, "must", "Must-know", "The default path. This is the gate.")}${trackSection(
      level,
      "should",
      "Should-know",
      "Visible, and not required to finish the level.",
    )}${sideHtml}`;
  } else {
    const hasNonMust = lessonsIn(level).some((lesson) => lesson.track !== "must");
    const optionalCopy = hasShould
      ? "Should-know lessons are marked and can be skipped."
      : hasNonMust
        ? "Lessons without a must-know badge are part of the path and do not lock the next level."
        : "Every exercise in this level is part of the gate.";
    modulesHtml = `<h2>Modules</h2><p>${gateCopy} ${optionalCopy}</p>${moduleList(level.modules)}`;
  }

  return `<article class="level measure">
    <p class="kicker">Level ${esc(level.num)}</p>
    <h1>${esc(level.title)}</h1>
    <p class="lede">${esc(level.promise)}</p>
    <div class="meter" aria-hidden="true"><span style="--p:${meter}%"></span></div>
    <p>${esc(level.note || "")}</p>
    ${facts}
    ${outcomes}
    ${modulesHtml}
    ${colophon()}
  </article>`;
}

function trackSection(level, track, title, blurb) {
  const modules = level.modules.filter((mod) => mod.lessons.some((lesson) => lesson.track === track));
  return `<h2>${esc(title)}</h2><p>${esc(blurb)}</p>${moduleList(modules, track)}`;
}

function moduleList(modules, onlyTrack) {
  const items = modules
    .map((mod) => {
      const lessons = onlyTrack ? mod.lessons.filter((lesson) => lesson.track === onlyTrack) : mod.lessons;
      const extra =
        lessons.length > 1
          ? `<ul class="lesson-sub">${lessons
              .map((lesson) => {
                const level = levelById(lesson.levelId);
                return `<li><a href="#/lesson/${encodeURIComponent(lesson.id)}">${esc(lesson.title)}</a> ${badge(
                  lesson.track,
                  level,
                  lesson,
                )} <span class="status-word">${esc(statusWord(lesson))}</span></li>`;
              })
              .join("")}</ul>`
          : "";
      const primary = lessons.length === 1 ? lessons[0] : null;
      const href = primary ? `#/lesson/${encodeURIComponent(primary.id)}` : `#/module/${encodeURIComponent(mod.id)}`;
      const mark = primary ? statusWord(primary) : moduleStatus(mod) === "done" ? "Done" : moduleStatus(mod) === "partial" ? "In progress" : "Not started";
      const level = levelById(mod.levelId);
      const trackBadge = primary ? badge(primary.track, level, primary) : "";
      return `<li><a class="mod" href="${href}"><span class="mod-id">${esc(mod.id)}</span><span><strong>${esc(
        mod.title,
      )}</strong><small>${esc(mod.summary)}</small></span><span class="status-word">${trackBadge} ${esc(mark)}</span></a>${extra}</li>`;
    })
    .join("");
  return `<ol class="module-list">${items}</ol>`;
}

function renderModule(mod) {
  const level = levelById(mod.levelId);
  document.title = `${mod.title} · Joe Learner`;
  if (!canRead(level)) return locked(level);
  const lessonItems = mod.lessons
    .map(
      (lesson) => `<li><a class="mod" href="#/lesson/${encodeURIComponent(lesson.id)}"><span class="mod-id">${esc(
        lesson.id,
      )}</span><span><strong>${esc(lesson.title)}</strong></span><span class="status-word">${badge(
        lesson.track,
        level,
        lesson,
      )} ${esc(statusWord(lesson))}</span></a></li>`,
    )
    .join("");
  return `<article class="module measure">
    ${crumbs(level, mod)}
    <h1>${esc(mod.title)}</h1>
    <p class="meta">${badge(mod.lessons.length === 1 ? mod.lessons[0].track : "", level, mod.lessons.length === 1 ? mod.lessons[0] : null)} <span>${assumesLine(mod)}</span></p>
    <aside class="callout"><h3>Why it matters</h3><p>${rich(mod.why)}</p></aside>
    <h2>Lessons</h2>
    <ol class="module-list">${lessonItems}</ol>
    ${colophon()}
  </article>`;
}

function crumbs(level, mod, lesson) {
  const moduleCrumb = lesson
    ? `<a href="#/module/${encodeURIComponent(mod.id)}">${esc(mod.id)} ${esc(mod.title)}</a>`
    : `<span>${esc(mod.id)}</span>`;
  return `<p class="crumbs"><a href="#/">Path</a><span aria-hidden="true">/</span><a href="#/level/${level.id}">${esc(
    level.title,
  )}</a><span aria-hidden="true">/</span>${moduleCrumb}</p>`;
}

function renderLesson(lesson) {
  const mod = index.modules.get(lesson.moduleId);
  const level = levelById(lesson.levelId);
  document.title = `${lesson.title} · Joe Learner`;
  if (!canRead(level)) return locked(level);
  state.last = lesson.id;
  const why = lesson.why || mod.why;
  const hidden = Boolean(session.hideExample[lesson.id]);
  const example = hidden
    ? `<section class="section-block" id="example"><h2>Worked example</h2><p>The worked example is hidden so you can do the exercise without it in front of you.</p><button type="button" class="quiet" data-action="show-example" data-lesson="${esc(
        lesson.id,
      )}">Show the worked example</button></section>`
    : `<section class="section-block" id="example"><h2>Worked example</h2><p class="meta"><strong>${esc(
        lesson.example.title,
      )}</strong></p><p><strong>Start.</strong> ${rich(lesson.example.start)}</p>${stepsHtml(
        lesson.example.steps,
      )}<p><strong>End.</strong> ${rich(lesson.example.end)}</p><button type="button" class="quiet" data-action="hide-example" data-lesson="${esc(
        lesson.id,
      )}">Hide the example and work the exercise</button></section>`;

  const ahead = !isLevelUnlocked(level)
    ? `<aside class="callout"><h3>Preview</h3><p>This level is still closed in study mode. Turn preview off to keep later lessons off the path.</p></aside>`
    : "";

  return `<article class="lesson measure">
    ${crumbs(level, mod, lesson)}
    <p class="kicker">${esc(level.title)}</p>
    <h1>${esc(lesson.title)}</h1>
    <p class="meta">${badge(lesson.track, level, lesson)} ${lesson.thread ? `<span class="thread">Project thread · ${esc(lesson.thread)}</span>` : ""} <span>${assumesLine(
      mod,
    )}</span> <span class="status-word">${esc(statusWord(lesson))}</span></p>
    ${ahead}
    <div class="stepper">
      <button type="button" class="quiet small" data-action="jump" data-target="concept">Concept</button>
      <button type="button" class="quiet small" data-action="jump" data-target="example">Worked example</button>
      <button type="button" class="quiet small" data-action="jump" data-target="exercise">Exercise</button>
    </div>
    <section class="prose" id="concept">
      <h2>Concept</h2>
      ${blocksToHtml(lesson.concept)}
      <aside class="callout"><h3>Why it matters</h3><p>${rich(why)}</p></aside>
    </section>
    ${example}
    ${exerciseHtml(lesson)}
    ${pager(lesson)}
    ${colophon()}
  </article>`;
}

function stepsHtml(steps) {
  return (steps || [])
    .map((step, i) => {
      const code = step.code ? `<pre><code>${esc(step.code)}</code></pre>` : "";
      return `<h3>${esc(String(i + 1))}. ${esc(step.t)}</h3><p>${rich(step.d)}</p>${code}`;
    })
    .join("");
}

function exerciseHtml(lesson) {
  const exercise = lesson.exercise;
  const marks = checksFor(lesson);
  const constraints = (exercise.constraints || []).map((item) => `<li>${rich(item)}</li>`).join("");
  const rubric = exercise.rubric
    .map((item, i) => {
      const id = `check-${lesson.id}-${i}`;
      return `<li><label class="check"><input id="${esc(id)}" type="checkbox" data-rubric data-lesson="${esc(
        lesson.id,
      )}" data-index="${i}" ${marks[i] ? "checked" : ""}><span>${rich(item)}</span></label></li>`;
    })
    .join("");
  const snippets = (exercise.snippets || [])
    .map((snippet) => blockToHtml({ type: "pre", lang: snippet.lang, caption: snippet.caption, code: snippet.code }))
    .join("");
  const files = exercise.files ? filesToHtml(exercise.files, `ex-${lesson.id}`) : "";
  const model = exercise.model
    ? `<details class="model"><summary>Model notes, after you try</summary><div class="model-body prose">${blocksToHtml(
        exercise.model,
      )}</div></details>`
    : "";
  const doneCount = marks.filter(Boolean).length;
  return `<section class="section-block" id="exercise">
    <h2>Exercise</h2>
    <div class="prose"><p>${rich(exercise.prompt)}</p></div>
    ${constraints ? `<h3>Constraints</h3><ul class="constraints">${constraints}</ul>` : ""}
    ${files}
    ${snippets}
    <h3>How you can tell it is done</h3>
    <p>${rich(exercise.done)}</p>
    <p class="caption">Check a line when you can show it. ${doneCount} of ${exercise.rubric.length} recorded in this browser. This page cannot see your program or your notes.</p>
    <ul class="rubric">${rubric}</ul>
    ${model}
  </section>`;
}

function pager(lesson) {
  const level = levelById(lesson.levelId);
  const all = lessonsIn(level);
  const at = all.findIndex((item) => item.id === lesson.id);
  const prev = all[at - 1];
  const next = all[at + 1];
  const prevLink = prev
    ? `<a href="#/lesson/${encodeURIComponent(prev.id)}">Previous · ${esc(prev.title)}</a>`
    : `<span></span>`;
  let nextLink = "";
  if (next) nextLink = `<a class="grow" href="#/lesson/${encodeURIComponent(next.id)}">Next · ${esc(next.title)}</a>`;
  else nextLink = `<span class="grow"></span>`;
  const must = mustLessons(level);
  const left = must.filter((item) => !isLessonComplete(item)).length;
  const following = LEVELS[level.order + 1];
  let end = "";
  if (!next && following) {
    end =
      left === 0
        ? `<p class="endnote">${esc(following.title)} is open.</p><p><a class="button" href="#/level/${following.id}">Open ${esc(
            following.title,
          )}</a></p>`
        : `<p class="endnote">${left} must-know ${left === 1 ? "exercise" : "exercises"} still open before ${esc(
            following.title,
          )}.</p>`;
  }
  return `<nav class="pager" aria-label="Lessons">${prevLink}${nextLink}</nav>${end}`;
}

function resumeGate() {
  for (const level of LEVELS) {
    if (!isLevelUnlocked(level)) break;
    const left = mustLessons(level).filter((lesson) => !isLessonComplete(lesson));
    if (left.length) return { level, left };
  }
  return null;
}

function locked(level) {
  document.title = `${level.title} is closed · Joe Learner`;
  const gate = resumeGate();
  const target = gate ? gate.level : LEVELS[Math.max(0, level.order - 1)];
  const left = gate ? gate.left : [];
  const resume = left[0];
  return `<article class="lock measure">
    <p class="kicker">Closed</p>
    <h1>${esc(level.title)} is still closed</h1>
    <p>Its lessons stay off the path until the must-know exercises in ${esc(target.title)} are done. Later levels assume those outcomes are fluent.</p>
    <p class="remain">${left.length} must-know ${left.length === 1 ? "exercise" : "exercises"} still open.</p>
    ${resume ? `<a class="button" href="#/lesson/${encodeURIComponent(resume.id)}">Continue ${esc(target.title)}</a>` : ""}
    ${colophon()}
  </article>`;
}

function missing() {
  document.title = "Not on the path · Joe Learner";
  return `<article class="lock measure"><h1>That page is not on the path.</h1><p><a href="#/">Back to the path</a></p>${colophon()}</article>`;
}

function colophon() {
  const previewLabel = state.preview ? "Hide locked levels" : "Preview the path";
  const themeLabel = state.theme === "system" ? "Theme: system" : state.theme === "dark" ? "Theme: dark" : "Theme: light";
  return `<footer class="colophon">
    <p>Edition 1. Progress stays in this browser. Python is only in Beginner examples. After that, the tools are Git, HTTP, and SQL.</p>
    <button type="button" class="quiet small" data-action="theme">${themeLabel}</button>
    <button type="button" class="quiet small" data-action="preview" aria-pressed="${state.preview ? "true" : "false"}">${previewLabel}</button>
    <button type="button" class="quiet small" data-action="export">Export progress</button>
    <label class="quiet small file-btn">Import progress<input data-import type="file" accept="application/json,.json"></label>
    <button type="button" class="quiet small" data-action="reset">Clear progress</button>
  </footer>`;
}

function mast(route) {
  const level = focusLevel();
  const must = mustLessons(level);
  const done = must.filter(isLessonComplete).length;
  const showNav = route.name !== "home";
  return `<header class="mast">
    <a class="brand" href="#/">Joe Learner</a>
    <div class="mast-actions">
      <p class="mast-progress"><a href="#/level/${level.id}">${esc(level.title)} · ${done} of ${must.length}</a></p>
      ${showNav ? `<button type="button" class="quiet small nav-toggle" data-action="nav" aria-expanded="${session.navOpen ? "true" : "false"}">Modules</button>` : ""}
    </div>
  </header>`;
}

function bannerHtml() {
  if (session.confirmReset) {
    return `<div class="banner" role="status"><p>Clear every check stored in this browser?</p><button type="button" class="button small" data-action="reset-yes">Clear progress</button><button type="button" class="quiet small" data-action="reset-no">Keep it</button></div>`;
  }
  if (!session.banner) return "";
  const link = session.banner.href
    ? `<a class="button small" href="${session.banner.href}">${esc(session.banner.action || "Open it")}</a>`
    : "";
  return `<div class="banner" role="status"><p>${esc(session.banner.text)}</p>${link}<button type="button" class="quiet small" data-action="dismiss">Dismiss</button></div>`;
}

function renderRail(route) {
  const level = levelFromRoute(route);
  if (!level || !canRead(level)) return "";
  const links = LEVELS.map((item) => {
    const open = canRead(item);
    const klass = item.id === level.id ? "is-on" : "";
    const current = item.id === level.id ? ' aria-current="page"' : "";
    return `<a class="${klass}" href="#/level/${item.id}"${current}>${esc(item.title)}${open ? "" : " · closed"}</a>`;
  }).join("");
  const items = level.modules
    .map((mod) => {
      if (mod.lessons.length === 1) {
        const lesson = mod.lessons[0];
        const current = route.name === "lesson" && route.id === lesson.id;
        return `<li><a class="lesson-link" href="#/lesson/${encodeURIComponent(lesson.id)}" ${
          current ? 'aria-current="page"' : ""
        }><span class="dot ${isLessonComplete(lesson) ? "done" : ""}"></span><span><small>${esc(
          mod.id,
        )}</small><br>${esc(lesson.title)}</span></a></li>`;
      }
      const subs = mod.lessons
        .map((lesson) => {
          const current = route.name === "lesson" && route.id === lesson.id;
          const dot = isLessonComplete(lesson) ? "done" : "";
          return `<li><a class="lesson-link" href="#/lesson/${encodeURIComponent(lesson.id)}" ${
            current ? 'aria-current="page"' : ""
          }><span class="dot ${dot}"></span><span>${esc(lesson.title)}</span></a></li>`;
        })
        .join("");
      return `<li><a class="lesson-link" href="#/module/${encodeURIComponent(mod.id)}"><span class="dot ${
        moduleStatus(mod) === "done" ? "done" : moduleStatus(mod) === "partial" ? "partial" : ""
      }"></span><span><small>${esc(mod.id)}</small><br>${esc(mod.title)}</span></a><ol class="sub">${subs}</ol></li>`;
    })
    .join("");
  return `<nav class="rail ${session.navOpen ? "is-open" : ""}" aria-label="Path"><div class="rail-levels">${links}</div><h2>${esc(
    level.title,
  )}</h2><ol>${items}</ol></nav>`;
}

function renderRoute(route) {
  if (route.name === "home") return renderHome();
  if (route.name === "level") {
    const level = levelById(route.id);
    return level ? renderLevel(level) : missing();
  }
  if (route.name === "module") {
    const mod = index.modules.get(route.id);
    return mod ? renderModule(mod) : missing();
  }
  if (route.name === "lesson") {
    const lesson = index.lessons.get(route.id);
    return lesson ? renderLesson(lesson) : missing();
  }
  return missing();
}

function shell(route, mainHtml) {
  const level = levelFromRoute(route);
  applyLevelHue(level ? level.id : null);
  const rail = route.name === "home" ? "" : renderRail(route);
  return `<a class="skip" href="#main">Skip to content</a>${mast(route)}${bannerHtml()}<div class="frame ${
    rail ? "" : "frame-home"
  }">${rail}<main id="main" tabindex="-1">${mainHtml}</main></div>`;
}

function render(options = {}) {
  const route = parseRoute();
  const focusId = options.routeChange ? null : document.activeElement && document.activeElement.id;
  const y = options.routeChange ? 0 : window.scrollY;
  tabSeq = 0;
  const app = document.getElementById("app");
  app.innerHTML = shell(route, renderRoute(route));
  if (route.name === "lesson") save();
  if (options.routeChange) {
    const main = document.getElementById("main");
    if (main) main.focus();
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, y);
    if (focusId) {
      const el = document.getElementById(focusId);
      if (el) el.focus();
    }
  }
}

function setCheck(lessonId, boxIndex, value) {
  const lesson = index.lessons.get(lessonId);
  if (!lesson) return;
  const before = new Set(LEVELS.filter(isLevelUnlocked).map((level) => level.id));
  const marks = checksFor(lesson);
  marks[boxIndex] = value;
  state.checks[lessonId] = marks;
  const after = LEVELS.filter((level) => isLevelUnlocked(level) && !before.has(level.id));
  if (after.length) {
    const opened = after[0];
    session.banner = {
      text: `${opened.title} is open.`,
      href: `#/level/${opened.id}`,
      action: `Open ${opened.title}`,
    };
  }
  save();
  render();
}

function exportProgress() {
  const blob = new Blob([JSON.stringify({ ...state }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "joe-learner-progress.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function importProgress(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result));
      if (!data || typeof data !== "object" || !data.checks) throw new Error("shape");
      state.checks = {};
      for (const [id, marks] of Object.entries(data.checks)) {
        if (!index.lessons.has(id) || !Array.isArray(marks)) continue;
        state.checks[id] = marks.map(Boolean);
      }
      if (data.theme === "light" || data.theme === "dark" || data.theme === "system") state.theme = data.theme;
      state.preview = Boolean(data.preview);
      state.last = typeof data.last === "string" && index.lessons.has(data.last) ? data.last : null;
      state.seenUnlock = data.seenUnlock && typeof data.seenUnlock === "object" ? data.seenUnlock : {};
      save();
      applyTheme();
      session.banner = { text: "Progress imported into this browser." };
      render({ routeChange: true });
    } catch {
      session.banner = { text: "That file is not a progress export." };
      render();
    }
  };
  reader.readAsText(file);
}

function onClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "jump") {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(button.dataset.target)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    return;
  }
  if (action === "nav") {
    session.navOpen = !session.navOpen;
    render();
    return;
  }
  if (action === "theme") {
    const order = ["system", "light", "dark"];
    state.theme = order[(order.indexOf(state.theme) + 1) % order.length];
    save();
    applyTheme();
    render();
    return;
  }
  if (action === "preview") {
    state.preview = !state.preview;
    save();
    session.banner = state.preview
      ? { text: "Preview is on. Locked levels are visible. Turn it off to study with the gates." }
      : { text: "Preview is off. Later levels stay closed until the must-know work is done." };
    render({ routeChange: true });
    return;
  }
  if (action === "hide-example") {
    session.hideExample[button.dataset.lesson] = true;
    render();
    document.getElementById("exercise")?.scrollIntoView({ block: "start" });
    return;
  }
  if (action === "show-example") {
    session.hideExample[button.dataset.lesson] = false;
    render();
    return;
  }
  if (action === "tab") {
    session.fileTab[button.dataset.group] = Number(button.dataset.index);
    render();
    return;
  }
  if (action === "export") {
    exportProgress();
    return;
  }
  if (action === "reset") {
    session.confirmReset = true;
    render();
    return;
  }
  if (action === "reset-no") {
    session.confirmReset = false;
    render();
    return;
  }
  if (action === "reset-yes") {
    state.checks = {};
    state.last = null;
    state.seenUnlock = {};
    session.confirmReset = false;
    session.banner = { text: "Progress cleared from this browser." };
    save();
    render({ routeChange: true });
    return;
  }
  if (action === "dismiss") {
    session.banner = null;
    render();
  }
}

function onChange(event) {
  const target = event.target;
  if (target.matches("[data-rubric]")) {
    setCheck(target.dataset.lesson, Number(target.dataset.index), target.checked);
    return;
  }
  if (target.matches("[data-import]") && target.files && target.files[0]) {
    importProgress(target.files[0]);
    target.value = "";
  }
}

function assertCurriculum() {
  const moduleIds = new Set();
  const lessonIds = new Set();
  for (const level of LEVELS) {
    if (!level.modules?.length) console.error("Level has no modules", level.id);
    for (const mod of level.modules) {
      if (moduleIds.has(mod.id)) console.error("Duplicate module", mod.id);
      moduleIds.add(mod.id);
      if (!mod.lessons?.length) console.error("Module has no lessons", mod.id);
      for (const lesson of mod.lessons) {
        if (lessonIds.has(lesson.id)) console.error("Duplicate lesson", lesson.id);
        lessonIds.add(lesson.id);
        if (!lesson.exercise?.rubric?.length) console.error("Missing rubric", lesson.id);
        if (!lesson.concept?.length) console.error("Missing concept", lesson.id);
        if (!lesson.example) console.error("Missing example", lesson.id);
      }
    }
  }
}

function start() {
  buildIndex();
  assertCurriculum();
  loadState();
  applyTheme();
  const app = document.getElementById("app");
  app.addEventListener("click", onClick);
  app.addEventListener("change", onChange);
  window.addEventListener("hashchange", () => {
    session.navOpen = false;
    save();
    render({ routeChange: true });
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && session.navOpen) {
      session.navOpen = false;
      render();
    }
  });
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (state.theme === "system") render();
  });
  if (!location.hash) location.hash = "#/";
  render({ routeChange: true });
  window.JOE = {
    levels: LEVELS,
    index,
    state,
    isLessonComplete,
    isLevelUnlocked,
  };
}

start();
