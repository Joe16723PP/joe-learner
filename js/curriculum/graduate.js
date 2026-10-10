registerLevel({
  id: "graduate",
  num: "02",
  title: "New graduate",
  promise: "Use the everyday practices of a software team.",
  audience: "People who can already write small programs and want to work the way a team works. Recent graduates and self-taught programmers who finished the beginner outcomes belong here.",
  prerequisites: "The beginner outcomes. You can write functions and use lists, dictionaries, sets, stacks, and queues without looking up the basics.",
  buildsOn: "Beginner work is a program in isolation. This level is the same skills under team conditions: history, other people's code, tests, failure, and shared tools. Syntax and data-structure introductions stop here.",
  note: "Must-know is the gate. Should-know is judgment that makes the first year smoother, and it does not lock Junior. Automated checks and deployment are part of the gate. Examples use Git, HTTP, and SQL. They do not assume one company stack.",
  pace: "About 30–45 hours for the must-know lessons. Should-know work is extra. This is an estimate, not a schedule.",
  canDo: [
    "Clone a project, create a branch, make a focused commit, and merge or rebase onto the main line with a resolved conflict.",
    "Read an unfamiliar small codebase and trace one behavior from its entry point to the data it changes.",
    "Add tests that fail when a bug is present, debug from a reproduction, and describe the change for a reviewer.",
    "Keep secrets out of the repository, parameterize queries and commands, and separate user-facing errors from log records.",
    "Run one check command before sharing a change, and describe how that change moves through environments with a way to undo it.",
  ],
  modules: [
    {
      id: "2.0",
      title: "Placement",
      summary: "An alternate check for people who can already do this level.",
      why: "Team practice is a set of outcomes. A diploma is not one of them.",
      lessons: [
        {
          id: "2.0",
          title: "Check this level",
          track: "core",
          placement: true,
          concept: [
            { type: "p", text: "This check is an alternate way through the gate. Completing it opens Junior. Completing every must-know lesson also opens Junior. You do not need both." },
            { type: "p", text: "Must-know here is the team bar: history, reading code, tests, debugging, a project someone else can run, JSON and HTTP, SQL, errors and logs, review, security habits, automated checks, and a release across environments." },
            { type: "p", text: "Should-know can wait. Do not check a line you cannot show. Junior assumes these outcomes are fluent." },
          ],
          example: {
            title: "A change packet instead of a course",
            start: "You have shipped small changes on a team. You have not used this site's contact book.",
            steps: [
              { t: "One packet", d: "A branch, a focused commit, a test that failed before the fix, a review note, and a secret that stayed out of the diff." },
              { t: "The gap", d: "If you cannot say what a 409 means, or how a migration of one row stays in a transaction, leave that line unchecked and open the lesson." },
            ],
            end: "The packet is the evidence. The unchecked line is the next lesson.",
          },
          exercise: {
            prompt: "Assemble a small change packet for a function you already know, or for the contact book. Check a line only when the packet shows it.",
            constraints: [
              "The packet includes a commit message that says why, and a conflict or a rebase you can describe.",
              "A test fails on the bug and passes after the fix.",
              "Secrets, SQL, and the user-facing error are handled as the lessons describe, or the matching line stays unchecked.",
            ],
            done: "A packet another person could review, with unchecked lines pointing at the lesson you still need.",
            rubric: [
              "I can branch, commit with a why, and resolve a conflict or rebase onto the main line.",
              "I can trace one behavior in code I did not write, from the entry point to the data it changes.",
              "I can add a test that fails for a bug and passes after the fix.",
              "I can debug from a reproduction and keep that reproduction as a test.",
              "I can lay out a project someone else can clone, install, and test, with configuration from the environment.",
              "I can parse JSON and CSV and reject a bad element with a reason.",
              "I can choose an HTTP status and a timeout behavior a caller can act on.",
              "I can write a query that stays in the database, use a transaction, and say what a join is for.",
              "I can separate a user-facing error from a log line, and keep a secret out of the log.",
              "I can review a small change, including a generated diff, with a specific comment and a condition for approval.",
              "I can keep a secret out of the repository and out of a prompt, and parameterize a query or command.",
              "I can run one check command before sharing a change.",
              "I can describe how a release moves from local to the shared line to staging to production, and how a rollback differs from a data repair.",
            ],
            model: [
              { type: "p", text: "A passing packet is a branch that strips spaces and then rejects letters in a phone, with both intentions in the commit message, a test that failed first, a log line without the phone number, and a README command that exits non-zero when that test is broken. The rollback sentence names a redeploy. If any of that is missing, the matching lesson is still the work." },
            ],
          },
        },
      ],
    },
    {
      id: "2.1",
      title: "Version control",
      summary: "History, branches, and a conflict resolved on purpose.",
      why: "Teams remember and share work through history. Without it, collaboration becomes exchanging copies of files.",
      lessons: [
        {
          id: "2.1",
          title: "Version control",
          track: "must",
          concept: [
            { type: "p", text: "A repository is the project plus its history. A commit is a snapshot with a message. A branch is a name for a line of work. The main line is the branch the team treats as the shared current state." },
            { type: "p", text: "Daily commands: `status`, `diff`, `log`, `add`, `commit`. The message's first line states the why. Add a body only when the why is not obvious from the change." },
            { type: "p", text: "Work on a feature branch, then integrate the main line back. A textual conflict means both sides edited the same lines. Resolve by preserving both intentions, then run the tests. A conflict marker left in the file is not a resolution." },
            { type: "p", text: "Do not commit secrets, machine-local paths, or generated build output. Use an ignore file." },
            { type: "p", text: "Clone, push, and pull. Committed means saved in your repository. Pushed means shared. A commit nobody else can see is not yet collaboration." },
            { type: "seq", title: "A change the team can see", items: [
              { h: "Branch", p: "Name a line of work and commit there." },
              { h: "Integrate", p: "Bring the main line in. Resolve conflicts by keeping both intentions." },
              { h: "Share", p: "Push. Until then, the history exists only on your machine." },
            ] },
          ],
          example: {
            title: "Two greetings edited the same line",
            start: "A shared repository with one file, `notes`, containing the line `Hello.` Main is at that commit. You will not rewrite history.",
            steps: [
              { t: "Branch A", d: "Create branch A and change the line to `Hello, and welcome.` Commit. The message is `Greet people who are new to the notes`." },
              { t: "Branch B from main", d: "From the original commit, branch B changes the same line to `Hello. Read the warnings first.` Commit." },
              { t: "Merge and keep both", d: "Merge B into A. The conflict is one line. The resolution is `Hello, and welcome. Read the warnings first.` Run whatever check the repository has, then commit the merge. `git log` shows both parents." },
            ],
            end: "The merged line carries both intentions, and the history still explains why each sentence exists.",
          },
          exercise: {
            prompt: "Start from a shared repository that contains `formatPhone(raw)`. On branch A, change the function to strip spaces. On branch B, change the same lines to reject letters. Merge B into A, resolve the conflict so both behaviors exist (strip spaces, then reject if letters remain), and write a commit message that states why both rules are there.",
            constraints: [
              "Both changes must touch the same lines so Git reports a conflict.",
              "The resolution strips spaces first, then rejects the result if any letter remains.",
              "Show `git log` with both parents, and do not commit secrets or local paths.",
            ],
            done: "`git log` shows the merge and both lines of work. A phone number with spaces is accepted after stripping. A phone number that still contains a letter is rejected.",
            rubric: [
              "Branch A strips spaces and branch B rejects letters, and those edits conflicted.",
              "The merge keeps both rules, in that order, and the commit message says why both are there.",
              "`git log` still shows both parents' work in a way a teammate can read.",
            ],
            model: [
              { type: "p", text: "One resolution, in JavaScript:" },
              { type: "pre", lang: "javascript", code: "function formatPhone(raw) {\n  const stripped = raw with spaces removed;\n  if (any character in stripped is a letter) throw new Error(\"letters\");\n  return stripped;\n}\n" },
              { type: "p", text: "A message that states the why: `Accept spaced numbers and still reject letters.`" },
            ],
          },
        },
      ],
    },
    {
      id: "2.2",
      title: "Reading code you did not write",
      summary: "One behavior, from the entry point to the data it changes.",
      why: "Most professional time is spent reading. A change to code you cannot trace is how defects ship.",
      lessons: [
        {
          id: "2.2",
          title: "Reading code you did not write",
          track: "must",
          concept: [
            { type: "p", text: "Find an entry point: `main`, a request handler, a job function, or the test that calls the behavior. Start there. A random file in the middle has no obligation to explain itself." },
            { type: "p", text: "Follow one call chain. At each function, write down inputs, outputs, and data that gets stored. Separate what the code does from how it loops. A reader who only narrates syntax has not understood it." },
            { type: "p", text: "Mark unknown words and unknown callers. Search for the definition and for other call sites. A word that appears once may be a name. A word that appears in three modules is part of the domain." },
            { type: "p", text: "Read tests as claims about behavior. A test named for a situation is a sentence the last author was willing to stand behind." },
          ],
          example: {
            title: "A one-page map of a tiny expense list",
            start: "Three functions you did not write. `main` reads commands. `add_expense` checks the amount. `store.save` appends a record.",
            steps: [
              { t: "Entry", d: "`main` is the entry. The command `add 12 lunch` is the behavior you will follow. You will not describe the `list` command." },
              { t: "One chain", d: "Input: the text `12` and `lunch`. `add_expense` rejects a non-numeric amount and otherwise returns a record. Output of the chain: `store.save` is called with that record. Stored data: one new row, with the amount as an integer count of cents if the function converted it, or as the original text if it did not. Write which one you actually saw." },
              { t: "A question the code does not answer", d: "Example of the right kind of question: the code stores a category string and never checks it. You do not yet know whether categories are a closed set." },
            ],
            end: "One page: entry point, the record that gets stored, the path for `add`, and one question. You did not rewrite the program.",
          },
          exercise: {
            prompt: "Read the issue tracker below. You did not write it. Produce a one-page map: entry point, the main data values, and the path for `done`. Also list two questions the code did not answer. Do not rewrite it.",
            constraints: [
              "Follow `done` only. Mention other commands only when they explain a value `done` reads.",
              "Name the data that is written, not the loop that writes it.",
              "The two questions must be things a reader cannot settle from this code.",
            ],
            done: "A one-page map names the entry point, the issue fields, the path for `done` including the store update, and two unanswered questions.",
            rubric: [
              "The map names the entry point and the path for marking an issue done.",
              "It names the data that gets stored, including status.",
              "It lists two questions the code does not answer, and I did not rewrite the program.",
            ],
            files: [
              {
                name: "tracker/main",
                code: `let store = load("issues.db"); // or start empty
let nextId = highest stored id, or 1 if the file is empty;

while (true) {
  const line = readLine();
  if (line === "") continue;
  const parts = line.split(" ");
  const command = parts[0];

  if (command === "add") {
    const title = the rest of the line;
    const issue = issues.create(store, title, nextId);
    nextId = issue.id + 1;
    console.log(issue.id, issue.title, issue.status);
  }

  if (command === "done") {
    const idText = parts[1];
    issues.markDone(store, idText);
    console.log("done", idText);
  }

  if (command === "assign") {
    const idText = parts[1];
    const owner = parts[2];
    issues.assign(store, idText, owner);
    console.log("assigned", idText, owner);
  }

  if (command === "list") {
    const which = parts[1] or "open";
    for (const issue of issues.select(store, which)) {
      console.log(issue.id, issue.status, issue.title);
    }
  }

  if (command === "show") {
    const idText = parts[1];
    const issue = issues.find(store, idText);
    if (issue is missing) {
      console.log("missing", idText);
    } else {
      console.log(issue.id, issue.title, issue.status, issue.owner);
      for (const note of issue.notes) console.log("note", note);
    }
  }

  if (command === "note") {
    const idText = parts[1];
    const text = the rest of the line;
    issues.addNote(store, idText, text);
  }

  if (command === "reopen") {
    const idText = parts[1];
    issues.reopen(store, idText);
    console.log("open", idText);
  }

  if (command === "quit") {
    store.save("issues.db");
    break;
  } else {
    console.log("unknown command");
  }
}
`,
              },
              {
                name: "tracker/issues",
                code: `function create(store, title, nextId) {
  if (title is blank) throw new EmptyTitle();
  const issue = {
    id: nextId,
    title: title,
    status: "open",
    owner: "unassigned",
    notes: [],
  };
  store.insert(issue);
  return issue;
}

function markDone(store, idText) {
  const issue = store.find(idText);
  if (issue is missing) throw new MissingIssue();
  if (issue.status === "done") return issue;
  issue.status = "done";
  store.update(issue);
  return issue;
}

function assign(store, idText, owner) {
  const issue = store.find(idText);
  if (issue is missing) throw new MissingIssue();
  if (owner is blank) throw new EmptyOwner();
  issue.owner = owner;
  store.update(issue);
  return issue;
}

function addNote(store, idText, text) {
  const issue = store.find(idText);
  if (issue is missing) throw new MissingIssue();
  if (text is blank) return issue;
  issue.notes.push(text);
  store.update(issue);
  return issue;
}

function reopen(store, idText) {
  const issue = store.find(idText);
  if (issue is missing) throw new MissingIssue();
  issue.status = "open";
  store.update(issue);
  return issue;
}

function select(store, which) {
  const rows = store.all();
  if (which === "all") return rows;
  if (which === "done") return rows where status is "done";
  return rows where status is "open";
}

function find(store, idText) {
  return store.find(idText);
}
`,
              },
              {
                name: "tracker/store",
                code: `let memory = [];

function insert(issue) {
  memory.push(copy of issue);
}

function update(issue) {
  for (let index = 0; index < memory.length; index++) {
    const row = memory[index];
    if (String(row.id) === String(issue.id)) {
      memory[index] = copy of issue;
      return;
    }
  }
  throw new MissingIssue();
}

function find(idText) {
  for (const row of memory) {
    if (String(row.id) === String(idText)) return copy of row;
  }
  return missing;
}

function all() {
  return copy of memory;
}

function save(path) {
  write one line per issue:
    id, status, owner, title separated by "|"
    then one "note|" line for each note
  a title is not allowed to contain "|"
}

function load(path) {
  if (the file is missing) {
    memory = [];
    return;
  }
  read lines
  when a line has four fields, start a new issue
  when a line starts with "note|", push onto the current issue
  lines with any other shape are skipped
  this loader does not count skipped lines
}
`,
              },
            ],
            model: [
              { type: "p", text: "Entry point: the command loop in `tracker/main`. `done ID` calls `issues.markDone`, which loads the issue, sets `status` to `done` unless it is already done, and `store.update` replaces the record. `quit` is what writes the file. Two questions the code leaves open: what should happen when `done` is asked to mark a missing id (the function raises, and `main` does not catch it), and whether `owner` is supposed to mean a person who may close the issue or only a label, since `markDone` never reads `owner`." },
            ],
          },
        },
      ],
    },
    {
      id: "2.3",
      title: "Testing small units",
      summary: "Arrange, act, assert. Fail first when the bug is local.",
      why: "Tests are how a change stays correct after the author has forgotten the details.",
      lessons: [
        {
          id: "2.3",
          title: "Testing small units",
          track: "must",
          concept: [
            { type: "p", text: "A test calls a function and checks the result. Arrange the inputs. Act by calling the function. Assert the result you expect." },
            { type: "p", text: "Three kinds of case: typical, boundary, and failure. A typical case shows the ordinary path. A boundary sits on a value where the rule changes. A failure is an input the function must reject." },
            { type: "p", text: "Test through the public function. Reaching into local steps makes tests break when the insides are rearranged even if the behavior held." },
            { type: "p", text: "A bug fix starts by showing a failing test when the defect is deterministic and local. The test fails on the old code and passes on the new code. That order is the evidence." },
            { type: "p", text: "Name tests for the situation: `test(\"rejects a non-leap 29 Feb\")`. Keep tests deterministic: no network, and no \"today's date\" unless the clock is passed in." },
          ],
          example: {
            title: "Tests first for a pass mark",
            start: "A function `passed(score)` does not exist yet. The rule is: scores from 0 to 100 inclusive, pass at 60 and above, reject anything outside the range.",
            steps: [
              { t: "Write the claims", d: "Typical: 80 passes. Boundary: 60 passes and 59 fails. Failure: -1 and 101 raise a documented error. Names: `test(\"passes at 60\")`, `test(\"fails at 59\")`, `test(\"rejects 101\")`." },
              { t: "Watch them fail", d: "Against a stub that always returns true, `test(\"fails at 59\")` fails. That is the point of writing the test first. A test that passes against a stub that ignores its input is not testing the rule." },
              { t: "Implement until they pass", d: "The function returns a boolean for in-range scores and raises for the rest. It does not read the clock and it does not ask for input." },
            ],
            end: "The four tests pass. The names still describe situations if you delete the function bodies and read only the test list.",
          },
          exercise: {
            prompt: "Specify `parseDate(text)` for `YYYY-MM-DD`, returning `{ year, month, day }`. Write tests first for a valid date, 29 Feb 2024, 29 Feb 2023, 31 Apr 2024, and `2020/01/01`. The last three must fail against a stub that accepts any 10-character string. Then implement until the tests pass. Invalid dates raise a documented exception. They do not return `null`.",
            constraints: [
              "Tests call `parseDate` only. They do not inspect helper steps.",
              "The stub stage is real: run the last three tests against the stub and record the failure before you implement the rules.",
              "No test uses today's date or the network.",
            ],
            done: "The valid date and 29 Feb 2024 pass. 29 Feb 2023, 31 Apr 2024, and `2020/01/01` raise the documented exception. You saw the last three fail against the stub first.",
            rubric: [
              "I wrote the five tests before the real implementation, and the last three failed against a stub that accepts any 10-character string.",
              "A valid `YYYY-MM-DD` and 29 Feb 2024 return `{ year, month, day }`.",
              "29 Feb 2023, 31 Apr 2024, and `2020/01/01` raise a documented exception and do not return null.",
            ],
            model: [
              { type: "p", text: "The stub fails the leap-year case, the impossible day, and the slash format because all three are 10 characters and the stub returns an object anyway. The implementation checks the hyphens, the numeric fields, the month lengths, and the leap rule from [[1.6]]. Name the exception in one place, for example `InvalidDate`, and use it for every rejection." },
            ],
          },
        },
      ],
    },
    {
      id: "2.4",
      title: "Debugging a defect",
      summary: "Reproduce, narrow, and keep the reproduction as a test.",
      why: "Print-tracing does not scale past a few functions. A repeatable bug is a solvable bug.",
      lessons: [
        {
          id: "2.4",
          title: "Debugging a defect",
          track: "must",
          concept: [
            { type: "p", text: "Reproduce with the smallest input that shows the bug. If you cannot reproduce it, you do not have a fix yet. A fix you cannot replay is a guess." },
            { type: "p", text: "Narrow the location: which function returns the first wrong value. A debugger (step over versus step into, inspect locals) beats scattering prints through code you do not own. Step over runs a call as one unit. Step into follows it. Use into when that call is the one you suspect." },
            { type: "p", text: "When history is available, bisect to find the first bad commit. You are searching the history, not reading every commit." },
            { type: "p", text: "Separate a wrong value from a wrong belief about who calls the function. The callee can be doing what it was written to do, for a caller that should not be using it that way." },
            { type: "p", text: "After the fix, keep the reproduction as a test. [[1.13]] kept a failing input beside a small program. Here the test is that memory." },
          ],
          example: {
            title: "The total that skips the last item",
            start: "A function `total(items)` is reported as \"sometimes short.\" You can run it.",
            steps: [
              { t: "Smallest input", d: "`total([1])` returns 0. One element is enough. A five-element list would have hidden which index was dropped." },
              { t: "First wrong function", d: "Step into `total`. The loop condition stops before the last index. The caller passed the right list. The first wrong value is the return from `total`, not a value the caller computed later." },
              { t: "Keep it", d: "Add a test whose name is the situation: one element must be the total. It fails before the fix and passes after." },
            ],
            end: "`total([1])` returns 1, and the test remains. You did not need a theory about the rest of the program.",
          },
          exercise: {
            prompt: "This program sorts a list and then binary-searches it. It misses an item that is present because the sort comparator and the search comparator disagree. Write the smallest input, name the first wrong function, fix one side so they agree, and add a regression test.",
            constraints: [
              "The input should be as small as you can make it and still show a present item reported missing.",
              "Change one comparator, not both, and say which one you changed.",
              "The regression test fails on the old pair of comparators and passes after the fix.",
            ],
            done: "A case such as `Anne` and `anne` is found after the fix, and the test names the situation.",
            snippets: [
              {
                caption: "Sort, then search",
                lang: "text",
                code: `names = ["bob", "Anne", "cara"]

sort names using compare_sensitive
# compare_sensitive orders by the raw characters, so uppercase and lowercase differ

binary_search names for "anne" using compare_folded
# compare_folded treats uppercase and lowercase as the same letter

# "anne" is present if folding is the rule, and absent if sensitivity is the rule.
# The search reports missing.
`,
              },
            ],
            rubric: [
              "I wrote the smallest input that shows a present item reported missing.",
              "I named the first wrong function and changed one comparator so the sort and the search agree.",
              "A regression test fails before the fix and passes after it.",
            ],
            model: [
              { type: "p", text: "Smallest input: `[\"Anne\"]` searching for `anne`. The sort and the search are answering different questions. Pick one rule. If the product rule is case-folding, sort with the folded comparator too. If the product rule is case-sensitive, search with the sensitive comparator and look for `Anne`. The first wrong value is the index returned by the search, and it is wrong because the list is ordered by a different rule than the search assumes. Binary search from [[1.10]] is valid only for the order it was given." },
            ],
          },
        },
      ],
    },
    {
      id: "2.5",
      title: "Command line, layout, and configuration",
      summary: "A project someone else can clone, install, and test.",
      why: "The first day on a team is clone, install, run. A project that only runs on the author's laptop blocks that.",
      lessons: [
        {
          id: "2.5",
          title: "Command line, layout, and configuration",
          track: "must",
          thread: "Contact book",
          concept: [
            { type: "p", text: "The working directory is where a relative path starts. An absolute path starts from the root of the filesystem and does not depend on where you are. Program arguments are the words after the command. Exit codes: 0 for success, non-zero for failure. Callers, including automation, use the code because they cannot read your sentence." },
            { type: "p", text: "One pipe sends the output of a command to the input of the next. That is enough to read a log line and count matches. This is not a shell course." },
            { type: "pre", lang: "shell", caption: "Count matching lines", code: "grep ERROR sample.log | wc -l\n" },
            { type: "p", text: "A project contains source, tests, and a dependency file. One command runs the tests." },
            { type: "p", text: "Configuration that changes per machine comes from the environment or a local untracked file. Paths and passwords do not live in source." },
            { type: "p", text: "Isolate project dependencies from the system interpreter, with a virtual environment or the language's equivalent. The system's interpreter is shared with everything else installed on the machine." },
          ],
          example: {
            title: "A path from the environment",
            start: "A program reads `cities.txt` from the current directory. A teammate needs the file to live somewhere else on their machine.",
            steps: [
              { t: "Read the environment", d: "Look up `CITIES_PATH`. If it is unset, use `cities.txt`. Document both the variable and the default." },
              { t: "Ignore the local file", d: "The real path on the teammate's machine stays out of the repository. The ignore file lists it if they keep a local config in the folder." },
              { t: "Prove the layout", d: "From a clean directory, the README's install command and test command are enough. The tests exit 0." },
            ],
            end: "The same source runs against two different files, and neither path was committed.",
          },
          exercise: {
            prompt: "Restructure the contact book into a project: source directory, test directory, dependency file, ignore file, and a README with the exact install and test commands. Read the data-file path from an environment variable with a documented default.",
            constraints: [
              "A teammate following only the README can run the tests on a clean machine.",
              "The path and any password stay out of source. The default path is written in the README.",
              "One command runs the tests and returns a non-zero exit code when a test fails.",
            ],
            done: "The README commands work from a clean checkout, and changing the environment variable changes the file the program reads.",
            rubric: [
              "The project has source, tests, a dependency file, an ignore file, and a README with exact install and test commands.",
              "The data-file path comes from an environment variable with a documented default.",
              "A teammate who has only the README can run the tests, and a failing test exits non-zero.",
            ],
            model: [
              { type: "p", text: "Use `CONTACTS_PATH`, default `contacts.txt`. The README lists the install command, the test command, and those two path facts. The ignore file includes the environment file if you keep one, and it includes whatever the tests generate. The dependency file is how the clean machine gets the test runner. It is not a comment that says \"install stuff.\"" },
            ],
          },
        },
      ],
    },
    {
      id: "2.6",
      title: "Structured data and HTTP",
      summary: "JSON, CSV, and status codes a caller must act on.",
      why: "Programs talk to other programs through formats and protocols. Guessing the payload shape is a production defect.",
      lessons: [
        {
          id: "2.6a",
          title: "JSON and CSV",
          track: "must",
          concept: [
            { type: "p", text: "JSON values are object, array, string, number, boolean, and null. Parsing rejects trailing commas and comments. Decode, then validate types and required fields. Do not assume a parsed object has the shape you hoped." },
            { type: "p", text: "CSV has a header, quoted commas, and newlines inside quotes. Splitting on every comma is not a CSV parser. Use a real parser. A field like `\"Ada, analyst\"` is one column, and a hand-rolled split will turn it into two." },
          ],
          example: {
            title: "A task list with one bad element",
            start: "A file of tasks. Each task should have a string `id`, a string `title`, and a boolean `done`.",
            steps: [
              { t: "Reject the file that is not JSON", d: "A trailing comma after the last field is a parse error. Report that the file did not parse. Do not try to guess a task out of it." },
              { t: "Then validate", d: "This file parses. The element at index 1 has no `id`. The loader rejects it and reports index 1, not a generic \"bad file.\"" },
              { t: "CSV, separately", d: "The line `Ada,\"hello, team\",1` is three columns when a CSV parser reads it, and four fragments when you split on every comma." },
            ],
            end: "Parse errors and shape errors are different reports. The index of a bad element is part of the shape error.",
          },
          exercise: {
            prompt: "Given a JSON file of tasks `{id, title, done}`, write a loader that rejects a task missing `id` or with a non-boolean `done`, and reports the index of the bad element.",
            constraints: [
              "A file that is not valid JSON fails at parse time, before any index is reported.",
              "Validation runs only after a successful parse.",
              "The error names the index. The first element is index 0.",
            ],
            done: "A missing `id` and a string `done` are both rejected with the right index. A well-formed list loads.",
            rubric: [
              "The loader rejects a task missing id and reports that element's index.",
              "The loader rejects a non-boolean done and reports that element's index.",
              "Invalid JSON is a parse failure, and a valid list of well-shaped tasks loads.",
            ],
            model: [
              { type: "p", text: "For `[{id: 1, title: \"a\", done: false}, {title: \"b\", done: true}]` the bad index is 1. For `done: \"yes\"` the value parsed, and it is the wrong type. Both are validation errors. A trailing comma never reaches validation." },
            ],
          },
        },
        {
          id: "2.6b",
          title: "HTTP status and timeouts",
          track: "must",
          concept: [
            { type: "p", text: "HTTP is a contract between programs: method, URL, headers, body, status code. GET reads. POST submits or creates. PUT or PATCH replaces or updates. DELETE removes." },
            { type: "p", text: "Status classes a caller must act on: 2xx success (200, 201), 400 the caller must change the request, 401 or 403 the caller lacks identity or permission, 404 missing, 409 conflict, 429 or 503 try later, 500 the server failed. 409 is a conflict the caller has to resolve, not a hint to send the same request again unchanged. 429 and 503 are the ones that mean try later." },
            { type: "table", caption: "What the caller does", headers: ["Status", "Action"], rows: [
              ["200, 201", "show_result"],
              ["400, 409", "fix_request"],
              ["401, 403", "not_allowed"],
              ["404", "missing"],
              ["429, 503", "retry"],
              ["500", "server_failure"],
            ] },
            { type: "p", text: "Every network call needs a timeout. A call that can wait forever will eventually do so." },
          ],
          example: {
            title: "A GET that must come back",
            start: "You call GET `/tasks/1` and you have to decide what the program does next.",
            steps: [
              { t: "Send a bounded call", d: "The request carries a timeout of a few seconds. If nothing comes back, the outcome is \"no response,\" which is not a 200 and not a 404." },
              { t: "Read a 200", d: "Status 200, body is a JSON task. Action: `show_result`. Then validate the body with the loader from the previous lesson. A 200 with a missing `id` is still a shape error." },
              { t: "Read a 404", d: "Action: `missing`. Do not retry it on a loop. The resource is not there." },
            ],
            end: "The caller has a next action for the status, and the call cannot sit open until the process is killed.",
          },
          exercise: {
            prompt: "Write `interpret_status(code) -> action` where action is one of `show_result`, `fix_request`, `not_allowed`, `missing`, `retry`, or `server_failure`. A table of tests covers 200, 201, 400, 401, 403, 404, 409, 429, 500, and 503.",
            constraints: [
              "Map 409 to `fix_request` and 429 and 503 to `retry`.",
              "Tests name the status and the action. They do not open a network connection.",
              "An unlisted code needs a decision you write down. Pick one action and test it.",
            ],
            done: "The ten codes in the table match the actions above, and each one has a test.",
            rubric: [
              "200 and 201 are show_result. 400 and 409 are fix_request.",
              "401 and 403 are not_allowed, 404 is missing, 429 and 503 are retry, and 500 is server_failure.",
              "A test covers each of those codes and does not use the network.",
            ],
            model: [
              { type: "p", text: "The table in the concept is the mapping. For an unlisted code such as 418, `server_failure` is a reasonable bucket if you document that unknown codes are treated as the server failing the contract. The important part is that the caller has one action, not a silent fall-through." },
            ],
          },
        },
      ],
    },
    {
      id: "2.7",
      title: "Relational data",
      summary: "Tables, joins, transactions, and queries that stay in the database.",
      why: "A large share of application work is reading and changing structured records safely.",
      lessons: [
        {
          id: "2.7",
          title: "Relational data",
          track: "must",
          concept: [
            { type: "p", text: "A table holds rows. Each row has the same columns. A primary key identifies one row. One-to-many: a contact has many notes. A foreign key points at the parent row." },
            { type: "p", text: "Queries you should be able to write by hand: select columns, filter, join two tables, insert, update, delete." },
            { type: "p", text: "An `UPDATE` or `DELETE` without a restrictive `WHERE` changes every row. A transaction is a group of writes that succeeds or fails together. If the product rule says both rows must exist, a failure on the second write rolls back the first." },
            { type: "p", text: "An index is a structure the database maintains so a lookup is not a full scan. Tie this back to [[1.11]]. This is not a tuning course. It is the same choice you already made between scanning a list and looking up a key." },
            { type: "p", text: "Application code that loads the whole table to filter one user hides the query and will not survive real data sizes. Filter in the query." },
            { type: "p", text: "`NULL` in a column means no value, which is different from an empty string. In the \"contacts with no notes\" query, the missing note shows up as `NULL` because the join found no child row. That is not the same as a note whose body is empty." },
          ],
          example: {
            title: "Authors and books, five rows",
            start: "Two tables: `authors(id, name)` and `books(id, author_id, title)`. Three authors. Two of them have a book. One author has none. Five rows in total.",
            steps: [
              { t: "Join", d: "Books for author 1, with the author's name. The foreign key `books.author_id` matches `authors.id`." },
              { t: "Absence", d: "Authors with no books: a left join, then `WHERE books.id IS NULL`. The author row is kept. The book columns are null." },
              { t: "A guarded update", d: "`UPDATE authors SET name = 'Ada Lovelace' WHERE id = 1`. Without the `WHERE`, every author would be renamed." },
            ],
            end: "You can point at the five rows and say what each query returns. The update touches one row.",
          },
          exercise: {
            prompt: "Design two tables, `contacts` and `notes`, with keys and a foreign key. Write these queries and say what each returns on a sample of five rows you also write down: all notes for one contact, newest first; contacts that have no notes; update of one contact's phone by primary key; a transaction that inserts a contact and their first note, so a failed note insert does not leave the contact half-created if the product rule says both must exist.",
            constraints: [
              "Write the five rows on paper before the queries. Include one contact with two notes and one contact with none.",
              "The update names a primary key in the WHERE clause.",
              "The transaction commits only if both inserts succeed. Say what a rollback leaves behind.",
            ],
            done: "Each query has a stated result on your five rows, and the transaction description says the contact is absent if the note insert fails.",
            rubric: [
              "The two tables have primary keys and notes.contact_id references contacts.",
              "I wrote five sample rows and the result of each query, including contacts with no notes and an update by primary key.",
              "The insert of a contact and a first note is one transaction, and a failed note insert does not leave the contact behind.",
            ],
            model: [
              { type: "pre", lang: "sql", code: "SELECT body\nFROM notes\nWHERE contact_id = 1\nORDER BY created_at DESC;\n\nSELECT contacts.name\nFROM contacts\nLEFT JOIN notes ON notes.contact_id = contacts.id\nWHERE notes.id IS NULL;\n\nUPDATE contacts\nSET phone = '5550100'\nWHERE id = 1;\n\nBEGIN;\nINSERT INTO contacts (id, name, phone) VALUES (4, 'Noor', '5550101');\nINSERT INTO notes (contact_id, body, created_at)\nVALUES (4, 'first', '2026-01-01T00:00:00Z');\nCOMMIT;\n" },
              { type: "p", text: "If the note insert fails, `ROLLBACK` removes the contact insert too. An index on `notes.contact_id` keeps \"all notes for this contact\" from becoming a scan of every note as the table grows. That is the [[1.11]] choice, applied to a table." },
            ],
          },
        },
      ],
    },
    {
      id: "2.8",
      title: "Errors, logging, and what the user sees",
      summary: "Three failures, two audiences, and no secrets in the log.",
      why: "Silent failure and secrets in logs are both common first-job mistakes, and both outlive the original change.",
      lessons: [
        {
          id: "2.8",
          title: "Errors, logging, and what the user sees",
          track: "must",
          thread: "Contact book",
          concept: [
            { type: "p", text: "Three different failures: bad input, a missing or down dependency, and a defect. Handle the first with a clear message. For the second, say what happened and whether retry makes sense. Let defects be visible. Do not hide them behind a message that says everything is fine." },
            { type: "p", text: "Catching an exception means you have a next step. Log it and re-raise, or recover into a defined state. An empty handler deletes evidence." },
            { type: "p", text: "A user-facing message says what the person can do. A log record says what the program saw: operation, relevant ids, error type." },
            { type: "p", text: "Never put passwords, tokens, or full payment data in logs. Avoid putting personal data there unless the record is useless without a narrowly chosen id." },
            { type: "p", text: "Levels in practice: error means someone may need to act, info marks a normal milestone, debug is detail you can turn on while investigating." },
          ],
          example: {
            title: "Rewrite one log line",
            start: "A bad log line from a lookup: `lookup failed phone=+15551212 error=ParseError`.",
            steps: [
              { t: "Split the audiences", d: "The user needs an action. The operator needs to find the record. The phone number serves neither better than an id, and it is personal data." },
              { t: "Rewrite", d: "`operation=lookup contact_id=42 error_type=ParseError`. Level: error, if someone may need to repair the file." },
            ],
            end: "An operator can find contact 42. The phone number is not in the log.",
          },
          exercise: {
            prompt: "Extend contact lookup. A missing name produces the message `No contact named <name>`. A data file that fails to parse logs the file path and error type, and the user sees `The contact book could not be loaded`. Given a bad example log line that includes the phone number, rewrite the log so an operator can find the contact id without the phone number.",
            constraints: [
              "The missing-name case is bad input. The parse case is a broken dependency, the file. Do not use one message for both.",
              "The rewritten log includes an id and an error type, and it does not include the phone number.",
              "Do not catch the parse error and then do nothing.",
            ],
            done: "The two user-facing messages match the two failures, and the rewritten log line can be used to find the contact without the phone number.",
            rubric: [
              "A missing name produces No contact named <name>.",
              "A file that fails to parse logs the path and error type, and the user sees The contact book could not be loaded.",
              "The rewritten log line identifies the contact without including the phone number.",
            ],
            model: [
              { type: "p", text: "Bad line: `lookup phone=+15551212 failed`. Replacement: `operation=lookup contact_id=42 error_type=NotFound` only if that is the truth. For the parse failure the user message stays general, and the log is `operation=load path=contacts.txt error_type=ParseError`. The path is the operator's handle. The phone number is not." },
            ],
          },
        },
      ],
    },
    {
      id: "2.9",
      title: "Code review",
      summary: "A small change, a specific comment, and a condition for approval.",
      why: "Review is the main teaching channel on a team and the last check before a defect is shared.",
      lessons: [
        {
          id: "2.9",
          title: "Code review",
          track: "must",
          concept: [
            { type: "p", text: "As the author: a small change, a description of the behavior, how you tested, and what you did not test. Link the failing case if there was a bug." },
            { type: "p", text: "As the reviewer, in order: correctness, tests, failure behavior, names that mislead, then style. Automation should carry formatting." },
            { type: "p", text: "Comments are specific. \"This is wrong because a retry will insert a second note\" is a review. \"I would have written this differently\" is a preference. Label it that way." },
            { type: "p", text: "Ask a question when you do not understand. A review is about the code." },
            { type: "p", text: "A tool may draft the change. You still trace it, run it, and explain it. A generated diff that fixes the bug and also renames unrelated functions is two changes. Ask for the extra one to leave, the same way you would ask a teammate." },
          ],
          example: {
            title: "One blocking comment on an empty handler",
            start: "A change catches a write error around saving a note and then continues as if the save worked.",
            steps: [
              { t: "Order", d: "Correctness first. The empty handler reports success after a failed write. Style is irrelevant until that is said." },
              { t: "The comment", d: "`This treats a failed save as success. A retry will insert a second note if the first write actually landed and the error happened on the acknowledgement. Please keep the error visible or make the save idempotent, and add a test for the failure.`" },
              { t: "What you do not say", d: "You do not open with a rename. If you want a different name and the behavior is otherwise right, mark that comment as a preference." },
            ],
            end: "The author knows what would make the change acceptable: visible failure or a defined retry, plus a test.",
          },
          exercise: {
            prompt: "Review this change. It fixes an off-by-one in a date range, adds no test, and renames three unrelated functions. Write three comments: one that blocks merge until a test exists, one question about the renames, and one sentence stating the condition for approval.",
            constraints: [
              "The blocking comment names the missing case, including a boundary such as a range of one day.",
              "The question about renames is a question, not a verdict.",
              "The approval sentence is checkable by the next reviewer.",
            ],
            done: "Three comments, in the roles the prompt asked for, specific enough that the author could act without asking what you meant.",
            snippets: [
              {
                caption: "The change",
                lang: "diff",
                code: `function days_inclusive(start, end):
-  return end - start
+  return end - start + 1

-function get_user(id):
+function fetch_user(id):
   return users.lookup(id)

-function calc(invoice):
+function compute_total(invoice):
   return invoice.subtotal + invoice.tax

-function data(id):
+function invoice(id):
   return invoices.lookup(id)

 function report(id):
-  user = get_user(id)
-  amount = calc(data(id))
+  user = fetch_user(id)
+  amount = compute_total(invoice(id))
   return user.name, amount, days_inclusive(user.start, user.end)
`,
              },
            ],
            rubric: [
              "One comment blocks merge until a test covers the inclusive range, and it names a boundary.",
              "One comment asks why the three renames are in this change.",
              "One sentence states the condition for approval.",
              "I would give the same comments if a tool had generated the diff: the extra renames still have to leave or be justified.",
            ],
            model: [
              { type: "p", text: "Blocking: `A range of one day, start == end, used to return 0 and now returns 1. There is no test that fails on the old return value. Please add that case before merge.` Question: `Did fetch_user, compute_total, and invoice need to change for the range fix, or can those renames be a separate commit?` Approval: `I will approve when the one-day range is tested and the renames are either justified or moved out.`" },
            ],
          },
        },
      ],
    },
    {
      id: "2.10",
      title: "Security habits",
      summary: "Secrets, parameters, and the difference between who and whether.",
      why: "These failures are easy to write and expensive to undo. They are part of the gate because \"security comes later\" ships the hole now.",
      lessons: [
        {
          id: "2.10",
          title: "Security habits",
          track: "must",
          concept: [
            { type: "p", text: "Secrets stay out of source, logs, and chat pastes. If one leaks, it is rotated. Presence in git history still counts as leaked. Deleting the file in a later commit does not remove the secret from older commits." },
            { type: "p", text: "Do not build SQL or shell commands by concatenating raw user text. Pass parameters to the database. Pass argument lists to process APIs, so a space in the input is still one argument and not a second command." },
            { type: "p", text: "Validate on the boundary: type, length, and allowed set. Reject early. Code inside the boundary can then trust what passed." },
            { type: "p", text: "Store passwords only as a slow password hash from a current library. Do not invent a hash. Do not store passwords so they can be decrypted." },
            { type: "p", text: "Authentication answers who is calling. Authorization answers whether this caller may touch this record. A logged-in user is not allowed to do every action." },
            { type: "p", text: "Dependencies can contain flaws. Know the file that lists them so you can update a known-bad version." },
            { type: "p", text: "Secrets stay out of prompts and out of text you paste into a tool. A prompt is another log. If a token or a password lands there, treat it as leaked and rotate it. Describe the shape of the bug. Do not paste the live credential that makes the bug happen." },
          ],
          example: {
            title: "A password that landed in a log",
            start: "A failed login logs the email and the password the person typed, so an operator can \"see what they entered.\"",
            steps: [
              { t: "Name the failure", d: "The secret is in a log. Anyone who can read logs can use it. The log is also likely to be copied into a ticket." },
              { t: "Replace the habit", d: "Log the operation and the error type. Do not log the password. If this already shipped, rotate the affected passwords. They are leaked." },
            ],
            end: "The next login failure is diagnosable without storing a reusable secret. The old log line is treated as a leak, not as a closed incident, until the passwords are rotated.",
          },
          exercise: {
            prompt: "Four defects are sketched below. For each, name the failure and the replacement habit.",
            constraints: [
              "Name the habit, not a product brand.",
              "The login sketch is about the query. The token sketch is about where the secret lives. The delete sketch is about authorization.",
              "Do not propose a hash you invented.",
            ],
            done: "Each defect has a failure name and a replacement: parameters, a secret store plus rotation, an owner or role check on the specific record, or a prompt that describes the bug without the secret.",
            snippets: [
              {
                caption: "Login lookup",
                lang: "text",
                code: `lookup(typed_email):
  query = "SELECT id FROM users WHERE email = '" + typed_email + "'"
  return database.run(query)
`,
              },
              {
                caption: "Config file committed to the repository",
                lang: "text",
                code: `api_token = "live-token-placed-in-source"
`,
              },
              {
                caption: "Delete by id",
                lang: "text",
                code: `delete_note(caller, note_id):
  if caller is logged in:
    database.delete("notes", note_id)
`,
              },
              {
                caption: "A prompt that includes the token",
                lang: "text",
                code: `Help me debug this header:
Authorization: Bearer live-token-pasted-into-the-prompt
`,
              },
            ],
            rubric: [
              "The login lookup is named as concatenation into SQL, and the replacement is a parameterized query.",
              "The token is named as a leaked secret, and the replacement is a secret store plus rotation.",
              "The delete is named as a missing authorization check, and the replacement is an owner or role check on that note.",
              "The prompt is named as a leaked secret, and the replacement is to rotate the token and describe the bug without pasting it.",
            ],
            model: [
              { type: "p", text: "Parameters mean the email is data, not part of the query text. The token is removed from source and from history as far as you can, and it is rotated because history still counts. The delete checks that this caller may delete this note. Being logged in only answers who they are." },
            ],
          },
        },
      ],
    },
    {
      id: "2.11",
      title: "Automated checks",
      summary: "One command the team runs before a change is shared.",
      why: "Human memory is a bad place to store \"remember to run the tests.\"",
      lessons: [
        {
          id: "2.11",
          title: "Automated checks",
          track: "must",
          thread: "Contact book",
          concept: [
            { type: "p", text: "One command runs the checks the team agrees to share: tests, a linter, and a formatter check. Tests catch a wrong result. A linter catches a defect in the shape of the code. A formatter check catches a diff that is only whitespace. Each one is cheap enough to run on every change." },
            { type: "p", text: "The command's exit code is the result. Zero means pass. Non-zero means fail. A script that prints errors and then exits zero hides the failure from anything that only looks at the code." },
            { type: "p", text: "The same command runs on your machine and on the shared line. A later lesson's pipeline runs that same command before it promotes a release, so a green result locally is the check the shared line will trust." },
            { type: "p", text: "A failing check blocks sharing the change. Fix the cause. Disabling the check to get a green result hides the next failure too. Keep the command fast enough that people run it. A check nobody runs is decoration." },
          ],
          example: {
            title: "A red result that stays red",
            start: "The command `check` runs the tests. You are tempted to skip one test so the command exits 0 before you push.",
            steps: [
              { t: "Break a test on purpose", d: "Change an expected value. Run `check`. The exit code is non-zero." },
              { t: "Fix the cause", d: "Restore the behavior or fix the production code. Run `check` again. Exit 0." },
              { t: "Leave the command in the README", d: "The step before push is this command, not a memory." },
            ],
            end: "The check failed when the test failed, and you did not silence it.",
          },
          exercise: {
            prompt: "Add a single project command that runs the contact-book tests and exits non-zero when a test fails. Document it in the README as the step before push. Break a test on purpose and show the command's exit code, then restore it.",
            constraints: [
              "One command. Not a paragraph of steps the teammate has to remember.",
              "Show the non-zero exit code while the test is broken.",
              "Restore the test. Do not delete it to make the command pass.",
            ],
            done: "The README names the command. You have seen a non-zero exit, and the restored command exits 0.",
            rubric: [
              "One command runs the contact-book tests.",
              "I broke a test, showed a non-zero exit code, and restored the test.",
              "The README lists that command as the step before push.",
            ],
            model: [
              { type: "p", text: "The name can be whatever your ecosystem uses, as long as it is one command and the README quotes it exactly. The exit code is the evidence, not a screenshot of a green badge with the test deleted." },
            ],
          },
        },
      ],
    },
    {
      id: "2.12",
      title: "Deployment and environments",
      summary: "What a release is, from your machine to production, and how you undo it.",
      why: "A later lesson asks for a release and a rollback note. Those words name environments, not a feeling that the code is done.",
      lessons: [
        {
          id: "2.12",
          title: "Deployment and environments",
          track: "must",
          concept: [
            { type: "p", text: "A change has three places it can exist. On your machine it is local. On the shared line it is integrated, and the check command from [[2.11]] has run. In production it is what users run. \"Released\" means the last of those, and it is the one a rollback has to reach." },
            { type: "p", text: "An environment is a configuration of that place: which database, which secrets, which feature switches. Local, staging, and production are the usual three. Staging is where you rehearse against a copy of the shape of production. It is not production with a different banner." },
            { type: "p", text: "Configuration that changes per environment comes from the environment, as [[2.5]] already required. A build artifact is the thing you ship: a package, an image, or a bundle. You build it once and promote that same artifact. Rebuilding on the production machine means you shipped a different thing than you tested." },
            { type: "p", text: "A pipeline is the repeatable path: check, build the artifact, deploy it to staging, then to production. A human may still approve the last step. The path is written down so it is not a sequence only one person remembers." },
            { type: "p", text: "Rollback is redeploying the previous artifact, flipping a switch, or repairing data. Name which one. A database change that already ran may not go backwards when the artifact does." },
          ],
          example: {
            title: "The same artifact, two environments",
            start: "The contact book tests pass locally. A teammate asks whether it is released.",
            steps: [
              { t: "Not yet", d: "Local success is the first place. The check command on the shared line is the second. Users are not running it." },
              { t: "Promote", d: "The pipeline builds one artifact from the commit you named. Staging gets that artifact and a staging database. Production gets the same artifact and the production database. You do not rebuild between them." },
              { t: "Undo", d: "Rollback is redeploying the previous artifact. The staging database is disposable. If a migration already rewrote production rows, the rollback note says the data repair too." },
            ],
            end: "Released means production is running the artifact you tested. Undo names the previous artifact, not a hope.",
          },
          exercise: {
            prompt: "Write a one-page release note for the contact book as if a team were about to run it for real. Name local, the shared line, staging, and production. Say what the pipeline does, which configuration changes per environment, and how you undo a bad release.",
            constraints: [
              "The artifact is built once and promoted. Say what it is, even if the project is only a source tree today.",
              "Secrets and the data-file path are configuration, not values baked into the artifact.",
              "The rollback says whether data needs a repair or a redeploy is enough.",
            ],
            done: "A reader can say where the change is, what the pipeline runs, and how to undo it.",
            rubric: [
              "I distinguished local, the shared line, staging, and production.",
              "The pipeline checks, builds one artifact, and promotes that artifact.",
              "The rollback names a redeploy of the previous artifact, and says whether data needs a separate repair.",
            ],
            model: [
              { type: "p", text: "Local is your checkout. The shared line is the commit whose check command exited 0. Staging runs artifact `book-42` against a disposable database and a staging path in the environment. Production runs `book-42` again, with the production path and secrets supplied outside the artifact. Rollback redeploys `book-41`. Contacts already written by `book-42` stay unless you have a repair, and the note says so." },
            ],
          },
        },
      ],
    },
    {
      id: "2.13",
      title: "Modules, coupling, and cohesion",
      summary: "One reason to change, and a direction for imports.",
      why: "\"Add a field\" becomes a twelve-file change when boundaries were accidental. First jobs are full of that tax.",
      lessons: [
        {
          id: "2.13",
          title: "Modules, coupling, and cohesion",
          track: "should",
          thread: "Contact book",
          concept: [
            { type: "p", text: "Beginner already split a program into modules and passed a record between them. `book.mjs` imports `records.mjs`. `records.mjs` does not import `book.mjs`. This lesson starts from that split." },
            { type: "p", text: "The new question is cohesion and coupling. A module should have one reason to change. If a reader would describe the file with two unrelated sentences, the file is two modules. Coupling is who else must change when this module changes." },
            { type: "p", text: "Callers should depend on a small set of functions, not on the private layout of another module. If a caller builds your filenames or reaches into your dictionary keys, it is coupled to a layout you should still be free to change." },
            { type: "p", text: "Import direction was already one way. Raise the bar: name the cycle you would refuse when a new field needs a new module, and do not split a file only to hit a line count." },
          ],
          example: {
            title: "A file that parses and sends mail",
            start: "One file loads a contact line and also sends the welcome message.",
            steps: [
              { t: "Two sentences", d: "\"This file understands the contact file format.\" \"This file delivers mail.\" Those are unrelated reasons to change. A new column and a new mail provider should not be the same edit." },
              { t: "Direction", d: "Delivery may call a function that returns a contact. The contact parser does not import the mailer. Dependencies point toward the stable core, not outward in a circle." },
            ],
            end: "A format change touches the parser. A provider change touches delivery. Neither change is a tour of the whole program.",
          },
          exercise: {
            prompt: "The contact book already has `records.mjs` and `book.mjs`, with the import pointing from the command file toward the records. Add a third module only if one of those files now has two reasons to change. Describe the change \"add an email field\": which module owns the field, which modules only pass it through, and one import you refuse.",
            constraints: [
              "Start from the two-file split. Do not re-teach how to create a file or a record.",
              "Parsing does not import command handling. Name the cycle that would create.",
              "The email description names an owner and the pass-through modules.",
            ],
            done: "Each module has one reason, imports stay one way, an import is refused, and the email change has an owner.",
            rubric: [
              "I started from the two-file split and stated each module's one reason to change.",
              "I named an import I refuse, and parsing does not import command handling.",
              "For an email field, I named the module that owns it and the modules that only pass it through.",
            ],
            model: [
              { type: "p", text: "Records still own the line format. The command file still owns input and output. Mail delivery is the third module, because sending mail is a second sentence. Storage, meaning the record, owns the email field. Parsing learns the extra column. Command handling passes the value through. Delivery may call a function that returns a contact. The parser does not import the mailer, and neither imports the command file. That cycle is the one you refuse." },
            ],
          },
        },
      ],
    },
    {
      id: "2.14",
      title: "Concurrency as a concept",
      summary: "Lost updates, locks, and one owner of the data.",
      why: "Juniors meet races in caches, background jobs, and UI callbacks. Naming the failure is the goal here. Designing concurrent systems is later work.",
      lessons: [
        {
          id: "2.14",
          title: "Concurrency as a concept",
          track: "should",
          concept: [
            { type: "p", text: "Two threads or tasks can pause while the other runs. Shared mutable data needs a rule. Without a rule, the result depends on which task woke up." },
            { type: "p", text: "A lost update: both sides read the old value and write back, so one update disappears." },
            { type: "p", text: "A lock makes a critical section one-at-a-time. Taking locks in inconsistent orders can deadlock: each side holds what the other needs, and neither can continue." },
            { type: "p", text: "Prefer one owner of the data. Other tasks send messages. Async I/O lets a program wait on input or output without freezing the whole process. It does not make CPU work faster by itself." },
          ],
          example: {
            title: "Two workers add one to the same counter",
            start: "The counter is 10. Worker A and worker B each add 1. No lock.",
            steps: [
              { t: "Both read", d: "A reads 10. B reads 10. Each has a private copy of what it thinks the counter is." },
              { t: "Both write", d: "A writes 11. B writes 11. The counter ends at 11. One increment disappeared." },
              { t: "A fix, described", d: "A lock around the read-and-write makes one worker finish before the other starts. Or a single owner receives two \"increment\" messages and applies them in order. Either way, the counter ends at 12." },
            ],
            end: "You can explain a missing increment as a pair of reads and a pair of writes. You do not need a thread library to say that.",
          },
          exercise: {
            prompt: "Describe a shared counter incremented 1,000 times by each of two workers with no lock. Explain a result below 2,000 in terms of read and write steps. Then describe one fix: a lock around the update, or a single owner that receives increment messages.",
            constraints: [
              "Use read and write steps in the explanation. Do not stop at \"it raced.\"",
              "Describe one fix. You do not need to ship production thread code.",
              "Mention deadlock only if you choose locks and you take more than one. A single lock around the counter update does not deadlock by itself.",
            ],
            done: "A reader who has not seen the counter can follow why the total can be short, and can see how the fix prevents that interleaving.",
            rubric: [
              "I explained a total below 2,000 as two workers reading the same old value and writing back.",
              "I described one fix: a lock around the update, or a single owner of increment messages.",
              "I did not need production thread code to make the explanation.",
            ],
            model: [
              { type: "p", text: "Any time both workers read the same number, one of the two writes is lost. That can happen many times across 1,000 increments each, so the result can land well below 2,000. A lock makes \"read, add one, write\" a single section. A single owner applies messages one at a time and never shares the mutable number." },
            ],
          },
        },
      ],
    },
    {
      id: "2.15",
      title: "Measuring",
      summary: "A question, a baseline, and the spread across a few runs.",
      why: "\"This feels slow\" leads people to rewrite the wrong function.",
      lessons: [
        {
          id: "2.15",
          title: "Measuring",
          track: "should",
          concept: [
            { type: "p", text: "Decide the question first: how many, how long, or how much memory. Time the operation, with a stated input size." },
            { type: "p", text: "Correctness before speed. A faster wrong function is still wrong." },
            { type: "p", text: "One baseline, one change, same data. The growth intuition from [[1.11]] is the prediction. The clock checks it." },
            { type: "p", text: "One run can be noisy. Repeat a small number of times and look at the spread before announcing a win." },
          ],
          example: {
            title: "Three runs that do not agree",
            start: "You timed one function three times on the same input: 40 ms, 55 ms, 38 ms. Someone wants to declare the middle run a regression against the first.",
            steps: [
              { t: "State the question", d: "How long does this function take on this input size? Not \"does it feel better.\"" },
              { t: "Look at the spread", d: "The three runs overlap a range of about 17 ms. The middle run is not a different design. It is the same design plus noise." },
              { t: "What you will not say", d: "You will not announce a win or a loss from one run, and you will not compare a correct baseline with a faster function that fails its tests." },
            ],
            end: "The honest summary is a range, not a single winner.",
          },
          exercise: {
            prompt: "Time linear search and binary search on a sorted list of 100, 10,000, and 100,000 integers, three runs each. Write whether the pattern matches the prediction from [[1.11]], and one conclusion you will not draw from a single noisy run.",
            constraints: [
              "Same data and the same hit-or-miss pattern for both searches at a given size.",
              "Three runs at each size. Write the spread, not only the best time.",
              "The searches must be correct. Time them only after a known case returns the right index.",
            ],
            done: "A short note says whether binary search grows more slowly, as predicted, and names one claim a single run cannot support.",
            rubric: [
              "I timed both searches at 100, 10,000, and 100,000 items, three runs each.",
              "I said whether the pattern matches the prediction from module 1.11.",
              "I named one conclusion I will not draw from a single noisy run.",
            ],
            model: [
              { type: "p", text: "Linear search's comparisons grow with the length. Binary search's comparisons grow much more slowly, a handful more each time the list gets ten times longer, as long as the list stays sorted. If one binary-search run at 10,000 items is slower than one linear run because the machine was busy, that single pair does not overturn the pattern. Look at the three-run spread before you say the prediction failed." },
            ],
          },
        },
      ],
    },
    {
      id: "2.16",
      title: "Writing for the next reader",
      summary: "Names, constraints, and a README that can stand alone.",
      why: "The next reader is often the author, months later, under pressure.",
      lessons: [
        {
          id: "2.16",
          title: "Writing for the next reader",
          track: "should",
          thread: "Contact book",
          concept: [
            { type: "p", text: "Names say what the value is once the scope is longer than a few lines. `retry_count` carries a meaning. `n` in a 40-line function does not." },
            { type: "p", text: "Comments record a constraint or a reason the code cannot show. A comment that restates the next line will rot, because the line will change and the comment will not." },
            { type: "p", text: "A README says what the project is, how to run the tests, and how configuration is supplied." },
            { type: "p", text: "If a comment says \"step 2,\" that step is often a function with a name and a test." },
          ],
          example: {
            title: "A comment that earns its place",
            start: "Two comments above two lines.",
            steps: [
              { t: "Restates the line", d: "`// add one to count` above `count = count + 1`. Delete it. The line already said that." },
              { t: "Records a constraint", d: "`// Phones are stored without spaces. Display formatting happens at the edge.` above a strip. The next reader needs the constraint, because the line only shows the strip." },
            ],
            end: "One comment remains, and it says something the code cannot.",
          },
          exercise: {
            prompt: "The function below uses `data`, `tmp`, and `flag` to validate and normalize a contact. Rename and, if needed, split it so a reader can state the job from the function name and the test names alone, without a comment that narrates the steps.",
            constraints: [
              "No comment that says step 1 or step 2.",
              "Test names describe situations: missing name, empty name, phone with letters.",
              "A reader who sees only the names can state the job.",
            ],
            done: "The renamed function or functions have tests whose names carry the situations, and the narrating comments are gone.",
            snippets: [
              {
                caption: "Before",
                lang: "text",
                code: `function handle(data) {
  // step 1: get the name
  let tmp = data["name"];
  let flag = false;
  if (tmp is missing) {
    flag = false;
  } else {
    tmp = tmp with outer spaces removed;
    if (tmp.length === 0) flag = false;
    else flag = true;
  }
  if (flag === false) return error "name required";
  // step 2: get the phone
  let tmp2 = data["phone"];
  if (tmp2 is missing) return error "phone required";
  tmp2 = tmp2 with spaces removed;
  if (tmp2 is empty) return error "phone required";
  for (const character of tmp2) {
    if (character is not a digit && character is not "+") return error "phone invalid";
  }
  // step 3: build the result
  const out = {};
  out["name"] = tmp;
  out["phone"] = tmp2;
  return out;
}
`,
              },
            ],
            rubric: [
              "The function name states the job, and the old data, tmp, and flag names are gone from the long path.",
              "Test names state the situations without a comment that narrates the steps.",
              "Any remaining comment records a constraint the code cannot show.",
            ],
            model: [
              { type: "p", text: "One split: `requireName` and `requirePhone`, called by `normalizeContact`. Tests: `test(\"rejects a missing name\")`, `test(\"rejects a blank name\")`, `test(\"rejects a phone with letters\")`, `test(\"strips spaces from a phone\")`. No step comments. A comment that earns a place would be the constraint that a leading `+` is allowed and letters are not, if the code's character test is hard to see. Often the test name is enough and the comment can go." },
            ],
          },
        },
      ],
    },
    {
      id: "2.17",
      title: "Dependencies and reproducible setup",
      summary: "A declared, pinned set that installs on a clean machine.",
      why: "\"Works on my machine\" is often an undeclared dependency or an unpinned one.",
      lessons: [
        {
          id: "2.17",
          title: "Dependencies and reproducible setup",
          track: "should",
          concept: [
            { type: "p", text: "A dependency is someone else's code pinned to a version. A lock file records the exact set that was tested, including the pieces your direct dependencies pulled in." },
            { type: "p", text: "Update on purpose. Read the notes for a major bump before taking it. An undeclared package installed only on your machine is not a dependency yet. The clean machine will not have it." },
            { type: "p", text: "The project installs from its declaration on a clean machine. That is the definition of \"works here\" that a team can use." },
          ],
          example: {
            title: "What a lock file is holding",
            start: "A lock file lists `checks 2.4.1` and `dates 1.8.0`. The declaration says only `checks` at a wide range.",
            steps: [
              { t: "What is pinned", d: "`checks` is pinned to 2.4.1 even if the declaration allows 2.4 or newer. `dates` may be there because `checks` needs it. The lock file is the set that was tested." },
              { t: "What goes missing", d: "Without the lock file, a later install can take `checks` 2.9.0. Your tests did not run on 2.9.0. The clean machine and your machine can disagree." },
            ],
            end: "You can say what is pinned and what would float if the lock file disappeared.",
          },
          exercise: {
            prompt: "Add one declared dev tool or library the tests actually use, or remove a global install and show the project still installs from its dependency file. Document the install command. If you cannot use the network, inspect the lock file in the model notes' shape and answer: what is pinned, and what would be missing if that file were not there?",
            constraints: [
              "The dependency is declared. A package that exists only because you installed it by hand does not count.",
              "The README's install command is the one you actually ran, or the inspection answers are written down.",
              "Do not take a major bump without reading its notes. This exercise does not require a bump.",
            ],
            done: "Either a clean install uses only the declaration, or your written answers name what the lock file pins and what would float without it.",
            rubric: [
              "I either showed a clean install from the dependency file, or I inspected a lock file.",
              "I can say what is pinned.",
              "I can say what would be missing or unpinned if that lock file were not there.",
            ],
            model: [
              { type: "p", text: "On the sample lock file, `checks` is pinned to 2.4.1 and `dates` to 1.8.0. Without the file, `dates` might not be declared at all, and `checks` might install a newer 2.x than the one you tested. The install command in the README has to be the command that reads this declaration, not a global install you remember." },
            ],
          },
        },
      ],
    },
    {
      id: "2.18",
      title: "Locales, text, and access",
      summary: "Strings, instants, and signals that are not color alone.",
      why: "Retrofitting strings, dates, and unlabeled controls is costly. The habit is cheap if it starts with the first user-facing feature.",
      lessons: [
        {
          id: "2.18",
          title: "Locales, text, and access",
          track: "should",
          concept: [
            { type: "p", text: "User-facing strings can be separated from logic even when you ship one language today. Concatenating plural sentences (`str(n) + \" notes\"`) breaks as soon as the grammar changes. Some languages put the number elsewhere, and many change the word for 1, for 2, and for 5." },
            { type: "p", text: "Store an instant in UTC. Format dates, numbers, and times at the edge for the reader. \"Midnight\" and \"week start\" depend on the calendar and the zone. Stored as a wall-clock string, they cannot be formatted for someone else later." },
            { type: "p", text: "If there is a UI: name controls by purpose, keep text contrast readable, and do not use color as the only signal. Keyboard use should reach the same actions as the pointer for any UI you build in exercises." },
          ],
          example: {
            title: "One count, two grammars",
            start: "The program has computed `n = 1` and wants to tell a person how many notes were found.",
            steps: [
              { t: "Separate the data", d: "Keep `n` as a number. Do not build the sentence inside the lookup." },
              { t: "Format at the edge", d: "A formatter for locale A receives the count and the message id `notes_found`. It produces `1 note found`. A formatter for locale B can use a different word order without a change to the lookup." },
            ],
            end: "The lookup still returns a count. The sentence is someone else's job, and it can change per locale.",
          },
          exercise: {
            prompt: "Take three strings: `1 notes found`, a local time shown as if UTC were the user's wall clock, and an error indicated only by red text. Rewrite the data and the output plan so a formatter could produce correct text for two locales, the timestamp stays UTC in storage, and the error has a text label as well as a color.",
            constraints: [
              "Do not concatenate the count and the word inside the logic that computed the count.",
              "Name the stored instant as UTC. Say where formatting happens.",
              "The error is understandable with the color removed.",
            ],
            done: "A short plan covers the plural, the instant, and the error label for two locales.",
            rubric: [
              "The count stays a number, and a formatter is allowed to produce different sentences for two locales.",
              "The timestamp is stored in UTC and formatted at the edge.",
              "The error has a text label as well as a color.",
            ],
            model: [
              { type: "p", text: "Store `{count: 1, message: \"notes_found\"}` and let locale A say `1 note found` while locale B uses its own plural rules. Store `2026-03-01T00:00:00Z`, and format that instant in the reader's zone when you render it. The error carries the text `The contact book could not be loaded` plus a color. The text remains if the color is removed. If there is a control, its name is its purpose, and a keyboard path reaches the same action." },
            ],
          },
        },
      ],
    },
    {
      id: "2.19",
      title: "Evidence for the next level",
      summary: "What you can show, how you ask for feedback, and the case for Junior.",
      why: "Junior is a claim that you can change a system you did not start. The evidence is a change packet, not a title.",
      lessons: [
        {
          id: "2.19",
          title: "Evidence for the next level",
          track: "core",
          career: true,
          concept: [
            { type: "p", text: "Junior assumes you can branch, test, review, and keep a secret out of the tree. The evidence is a change someone else accepted, or a packet they could accept." },
            { type: "p", text: "Ask for feedback on the review description and the test, not on whether you seem ready. A specific question gets a specific answer." },
            { type: "p", text: "The case for Junior names the must-know outcomes you can show. Should-know gaps can be named without pretending they block the gate." },
          ],
          example: {
            title: "The question is the diff",
            start: "You want a reviewer to tell you if the contact-book change is the kind of work Junior assumes.",
            steps: [
              { t: "Send the packet", d: "The branch, the test that failed first, the check command, and the sentence about what you did not test." },
              { t: "Ask one thing", d: "`Does the test fail for the bug and pass for the fix, and did I keep the phone number out of the log?`" },
            ],
            end: "They can answer from the diff. Your case for Junior is that answer plus the outcomes you can repeat.",
          },
          exercise: {
            prompt: "Write the review request you would attach to a change packet for a teammate who will run the check command. Point at the diff, the test that failed first, and the sentence about how the change moves across environments. Name two New graduate outcomes you can show and one that is still thin. Then write two sentences that make the case for starting Junior.",
            constraints: [
              "The question points at the diff, the test, or the log line.",
              "The thin outcome is a lesson you can name.",
              "The case uses outcomes. It does not use a job title or time served.",
            ],
            done: "A note a reviewer could answer, and a two-sentence case.",
            rubric: [
              "The note names two must-know outcomes I can show and one that is still thin.",
              "The question points at a behavior in the change packet.",
              "The case for Junior is about outcomes, not a title.",
            ],
            model: [
              { type: "p", text: "`The branch resolves the phone rules and the test failed before the fix. The check command is in the README. I am still thin on describing a pipeline with staging and production. Does the log line identify the contact without the phone number?` The case: I can ship a reviewed change with a test and without a leaked secret. Junior is next because those are the outcomes it assumes, and the thin one is deployment, which I can name." },
            ],
          },
        },
      ],
    },
  ],
});
