registerLevel({
  id: "beginner",
  num: "01",
  title: "Beginner",
  promise: "Write and reason about small programs and the core data structures.",
  audience: "People who can use a computer and want to learn to program. No prior coding is assumed.",
  prerequisites: "Comfort with files, a text editor, and installing software. School arithmetic and the idea of a named quantity are enough.",
  buildsOn: "There is no previous level. This is the foundation. Later levels treat these ideas as automatic and do not spend lesson time on syntax.",
  note: "Examples in this level are Python 3. Later levels leave the language behind and teach engineering practice. This is a backend-leaning generalist path: small programs, then team practice, then orders and a shared checkout. A Junior lesson names where to specialize next.",
  pace: "About 50–70 hours for a careful pass. This is an estimate, not a schedule.",
  canDo: [
    "Read and write small Python 3 programs that take input, make decisions, repeat work, and return a result.",
    "Choose a list, dictionary, set, stack, queue, tree, or graph for a small problem and explain the choice.",
    "Trace a program by hand, read a traceback, and fix simple logic bugs.",
    "Raise and catch an exception when you have a next step, and split a small program across modules that pass records.",
    "Break a problem into functions, test the important cases, and save data in a text file.",
  ],
  modules: [
    {
      id: "1.0",
      title: "Placement",
      summary: "An alternate check for people who can already do this level.",
      why: "An experienced learner should be able to show the outcomes without sitting every lesson first.",
      lessons: [
        {
          id: "1.0",
          title: "Check this level",
          track: "core",
          placement: true,
          concept: [
            { type: "p", text: "This check is an alternate way through the gate. Completing it opens New graduate. Completing every must-know lesson also opens New graduate. You do not need both." },
            { type: "p", text: "Use it when you can already do the work. Checking a line you cannot show will strand you in the next level, which assumes these outcomes are fluent." },
            { type: "p", text: "If a line is shaky, open that lesson instead. The lessons teach the work. This page only asks whether you can do it." },
          ],
          example: {
            title: "One line you leave unchecked",
            start: "You can write small Python programs. You have never caught an exception on purpose.",
            steps: [
              { t: "Check what you can show", d: "You check the program line and the data-structure line, because you can demonstrate both." },
              { t: "Leave the rest", d: "You leave the exception line unchecked and open the exceptions lesson. The gate stays shut until that line is true or you finish the must-know lessons." },
            ],
            end: "The check matches what you can do. It is not a guess about the next level.",
          },
          exercise: {
            prompt: "Show each line with a small artifact you could hand to someone else: a short program, a data-structure choice with a reason, and a file-backed program that handles one error. Check a line only when that artifact exists.",
            constraints: [
              "Python 3 is enough. The artifact can be tiny.",
              "The data-structure line needs a reason, not only a name.",
              "Leave a line unchecked when you cannot show it yet.",
            ],
            done: "Each checked line has an artifact. Unchecked lines point you at the lesson that teaches them.",
            rubric: [
              "I can write a small Python 3 program that takes input, makes a decision, repeats work, and returns a result from a function.",
              "I can choose a list, dictionary, set, stack, queue, tree, or graph for a small problem and explain the choice.",
              "I can read a traceback, raise and catch an exception with a next step, and save a record in a text file from more than one module.",
            ],
            model: [
              { type: "p", text: "There is no single right program. A passing artifact might be a contact line parsed in one module, a total computed in another, a FileNotFoundError that starts from empty data, and a sentence that says a set was chosen because membership was the question. If you cannot produce that, the exceptions lesson and the modules lesson are the next work, and this check stays incomplete." },
            ],
          },
        },
      ],
    },
    {
      id: "1.1",
      title: "How a program runs",
      summary: "Instructions, a file, and the edit–run–read loop.",
      why: "Every later skill is a variant of writing an instruction, running it, and checking what happened. Learners who skip the loop start guessing.",
      lessons: [
        {
          id: "1.1",
          title: "How a program runs",
          track: "must",
          concept: [
            { type: "p", text: "A program is a list of instructions. The computer starts at the top and follows them downward. Later lessons change that order. Until they do, the next line is simply the next line." },
            { type: "p", text: "You write the instructions in a source file. Running the file is a separate step. Standard input is what the program reads, often what you type. Standard output is what it prints back." },
            { type: "p", text: "The habit that matters is the edit–run–read loop: change one thing, run again, and compare the output with what you expected. If you change five things and then look, you will not know which change did what." },
            { type: "seq", title: "The loop you will use on every later exercise", items: [
              { h: "Edit", p: "Change one thing in the source file." },
              { h: "Run", p: "Run that same file again." },
              { h: "Read", p: "Compare the output with what you predicted." },
            ] },
            { type: "p", text: "A first Python program asks for a name and answers:" },
            { type: "pre", lang: "python", code: "print(\"hello\")\nname = input(\"Name: \")\nprint(\"Hello,\", name)\n" },
            { type: "p", text: "`print` writes a line to standard output. `input` writes a prompt, waits, and returns the text you typed. The name `name` then refers to that text." },
          ],
          example: {
            title: "Greet the name that was typed",
            start: "An empty file named hello.py, and a terminal in that folder.",
            steps: [
              { t: "Write the three lines", d: "Save the program above. Predict the output before you run it. Include the name you plan to type.", code: "print(\"hello\")\nname = input(\"Name: \")\nprint(\"Hello,\", name)\n" },
              { t: "Run it", d: "Run `python3 hello.py`. When the prompt appears, type Ada and press Enter." },
              { t: "Read", d: "You should see hello, then Hello, Ada. Run it once more and type Bao. The second line must change. If it does not, you ran an old file or edited a different one." },
            ],
            end: "Two runs, two names, two different sentences. The source file is unchanged by the typing. Only the output changed.",
          },
          exercise: {
            prompt: "Write a program that asks for a first name and a city, then prints one sentence that includes both. Run it twice with different answers and confirm the sentence changes.",
            constraints: [
              "Ask for the two values with two separate `input` calls.",
              "Print one sentence, not two disconnected lines.",
              "Change one thing at a time if the sentence is wrong.",
            ],
            done: "Two runs with different answers produce two different sentences, and each sentence contains the name and the city from that run.",
            rubric: [
              "The program asks for a first name and a city.",
              "It prints one sentence that includes both answers.",
              "I ran it twice with different answers, and the sentence changed both times.",
            ],
            model: [
              { type: "p", text: "One version that meets the rubric:" },
              { type: "pre", lang: "python", code: "first = input(\"First name: \")\ncity = input(\"City: \")\nprint(first, \"is in\", city)\n" },
            ],
          },
        },
      ],
    },
    {
      id: "1.2",
      title: "Values, types, and variables",
      summary: "Names point at values. Kinds of values do not mix by accident.",
      why: "A large share of beginner bugs are \"this value is a different kind than I assumed.\"",
      lessons: [
        {
          id: "1.2",
          title: "Values, types, and variables",
          track: "must",
          concept: [
            { type: "p", text: "A variable name refers to a value. Assignment points the name at a new value. It does not go back and rewrite earlier uses of the old value." },
            { type: "pre", lang: "python", code: "n = 1\nalias = n\nn = 2\nprint(alias)\n" },
            { type: "p", text: "`alias` still refers to 1. The line `n = 2` points `n` somewhere else. It does not edit the 1." },
            { type: "p", text: "Values have types. The ones you need now are integers (`int`), floats (`float`), strings (`str`), booleans (`True` and `False`), and `None` for \"no value here.\"" },
            { type: "p", text: "`type(...)` asks what something is. Conversion builds a new value: `int()`, `float()`, and `str()`. Adding a number and a string raises `TypeError` until you convert one of them." },
            { type: "p", text: "A name must be assigned before it is read. Reading an unknown name raises `NameError`." },
          ],
          example: {
            title: "A score stored as text",
            start: "You have the text \"9\" and you want to add a one-point bonus.",
            steps: [
              { t: "Predict the failure", d: "This adds a string and an integer. Predict `TypeError` before you run it.", code: "score = \"9\"\nprint(score + 1)\n" },
              { t: "Convert, then add", d: "`int(score)` builds the integer 9. The name `score` still refers to the string until you assign it again.", code: "score = \"9\"\npoints = int(score) + 1\nprint(points)\nprint(type(score), type(points))\n" },
            ],
            end: "The program prints 10, then the types `str` and `int`. The original text was not edited in place.",
          },
          exercise: {
            prompt: "Start from the string `price = \"12.50\"` and the integer `quantity = 3`. Compute the total as a number and print `Total: 37.5`. Before running, write the type of `price`, `quantity`, and `total` on paper. Then print `type(...)` for each and compare.",
            constraints: [
              "Do not retype 37.5 as a literal. Compute it.",
              "Convert the price before you multiply.",
              "Write the three types before the first successful run.",
            ],
            done: "The printed total is 37.5, and the three printed types match what you wrote down. If they did not match, say which assumption was wrong.",
            rubric: [
              "I wrote the three types before running.",
              "The program prints Total: 37.5 by converting the price and multiplying.",
              "The printed types match the ones I wrote, or I can name the assumption that was wrong.",
            ],
            model: [
              { type: "pre", lang: "python", code: "price = \"12.50\"\nquantity = 3\ntotal = float(price) * quantity\nprint(\"Total:\", total)\nprint(type(price), type(quantity), type(total))\n" },
              { type: "p", text: "The types are `str`, `int`, and `float`. `price` stays a string." },
            ],
          },
        },
      ],
    },
    {
      id: "1.3",
      title: "Expressions and operators",
      summary: "Arithmetic, comparisons, precedence, and why money should be integers.",
      why: "Expressions are how programs compute. Precedence and binary floating point are the first surprises that look like \"the computer cannot add.\"",
      lessons: [
        {
          id: "1.3",
          title: "Expressions and operators",
          track: "must",
          concept: [
            { type: "p", text: "Arithmetic uses `+`, `-`, `*`, and `/`. In Python 3, `/` always produces a float: `7 / 2` is `3.5`. `//` is floor division: `7 // 2` is `3`. `%` is the remainder: `7 % 2` is `1`." },
            { type: "p", text: "Comparison operators are `==`, `!=`, `<`, `<=`, `>`, and `>=`. They produce booleans. Boolean operators are `and`, `or`, and `not`." },
            { type: "p", text: "Precedence: `*` and `/` happen before `+` and `-`. `2 + 3 * 4` is 14, not 20. Parentheses say what you mean when the default order is not the order you want." },
            { type: "p", text: "`0.1 + 0.2` is not exactly `0.3`. Binary floating point cannot represent those decimals exactly. Money and scores that must be exact should be integers (cents, or points) until display time." },
          ],
          example: {
            title: "A tip that stays in cents",
            start: "A bill of 2000 cents, a 15 percent tip, two people.",
            steps: [
              { t: "See the float surprise", d: "Run `print(0.1 + 0.2)` and `print(0.1 + 0.2 == 0.3)`. The second line is `False`. That is the reason the next step uses integers." },
              { t: "Compute in cents", d: "The tip is integer division of the percent. Each share is the total after tip, divided by the people.", code: "bill = 2000\ntip = bill * 15 // 100\ntotal = bill + tip\nshare = total // 2\nprint(tip, total, share)\n" },
            ],
            end: "Tip 300, total 2300, share 1150. Nothing in the math is a float. 2300 divided by 2 leaves no remainder.",
          },
          exercise: {
            prompt: "Write a bill splitter. Input: total in dollars and cents, number of people, tip percent. Convert the total to integer cents, compute the tip in cents, and print each person's share in cents. Include a note in a comment that the last cent may be left over when the total does not divide evenly.",
            constraints: [
              "Do not use raw floats for the money math. Parse the dollars-and-cents text into integer cents.",
              "Use integer division for the tip and the share.",
              "The comment about a leftover cent must be in the source, next to the division.",
            ],
            done: "For a total you can check by hand, the printed share in cents matches your paper arithmetic, and the source contains the leftover-cent comment.",
            rubric: [
              "The total is converted to integer cents without using a float for the money math.",
              "Tip and share are computed with integer division, and each person's share is printed in cents.",
              "A comment says the last cent may be left over when the total does not divide evenly.",
            ],
            model: [
              { type: "p", text: "Parse `12.50` as 12 dollars and 50 cents. Pad a short cents part so `12.5` still means 1250 cents. Then:" },
              { type: "pre", lang: "python", code: "text = input(\"Total: \")\nleft, _, right = text.partition(\".\")\nright = (right + \"00\")[:2]\ntotal_cents = int(left) * 100 + int(right)\npeople = int(input(\"People: \"))\ntip_percent = int(input(\"Tip percent: \"))\ntip_cents = total_cents * tip_percent // 100\n# The last cent may be left over when the total does not divide evenly.\nshare = (total_cents + tip_cents) // people\nprint(share)\n" },
            ],
          },
        },
      ],
    },
    {
      id: "1.4",
      title: "Decisions",
      summary: "Branches, boundaries, and the difference between = and ==.",
      why: "Programs that only run in a straight line cannot react to data.",
      lessons: [
        {
          id: "1.4",
          title: "Decisions",
          track: "must",
          concept: [
            { type: "p", text: "`if`, `elif`, and `else` choose a branch. Indentation is the structure: the indented lines belong to that branch and run only when the branch is chosen." },
            { type: "p", text: "Put one condition on each case. When conditions overlap, the first true branch wins, so order matters. A later `elif` is not considered once an earlier test succeeds." },
            { type: "p", text: "Boundary values belong in the condition on purpose. In `score >= 90`, the score 90 takes that branch and 89 does not. You should be able to say which branch gets which value before you run the program." },
            { type: "p", text: "`==` compares values. `=` assigns. Mixing them up is a syntax error in an `if`, or a logic bug if the assignment happens somewhere you meant to compare." },
            { type: "p", text: "Empty string, `0`, and `None` are false in a Python `if`. When the difference matters, compare explicitly: `if name == \"\":`." },
          ],
          example: {
            title: "Pass and fail at a stated boundary",
            start: "A score of 60 should pass. A score of 59 should fail. The rule is written down before the code.",
            steps: [
              { t: "Name the boundary", d: "60 takes the pass branch because the test is `score >= 60`. 59 falls through to `else`." },
              { t: "Write the branch", d: "One condition. The message is the whole body of the branch.", code: "score = int(input(\"Score: \"))\nif score >= 60:\n    print(\"pass\")\nelse:\n    print(\"fail\")\n" },
              { t: "Run both edges", d: "Run with 60, then with 59. If 60 prints fail, the comparison is pointing the wrong way." },
            ],
            end: "60 prints pass. 59 prints fail. You have checked the boundary you wrote into the condition.",
          },
          exercise: {
            prompt: "Map a numeric score to a letter: A at 90–100, B at 80–89, C at 70–79, D at 60–69, F at 0–59. Before coding, write the expected letter for 100, 90, 89, 60, 59, and 0. After coding, run those six inputs. Reject a score outside 0–100 with a short message.",
            constraints: [
              "Write the six expected letters before you run the program.",
              "Use `elif` so each range is its own case, and put the boundaries in the conditions on purpose.",
              "A score below 0 or above 100 does not receive a letter.",
            ],
            done: "The six inputs print the six letters you wrote down, and a score such as -1 or 101 prints the rejection message.",
            rubric: [
              "I wrote the expected letter for 100, 90, 89, 60, 59, and 0 before coding.",
              "Those six runs print A, A, B, D, F, and F.",
              "A score outside 0–100 prints a short rejection and no letter.",
            ],
            model: [
              { type: "p", text: "Test the outside range first, then the letters from the top. `score >= 90` catches 90 and 100. The next test only runs when that one failed, so 89 is a B." },
              { type: "pre", lang: "python", code: "score = int(input(\"Score: \"))\nif score < 0 or score > 100:\n    print(\"Score must be from 0 to 100\")\nelif score >= 90:\n    print(\"A\")\nelif score >= 80:\n    print(\"B\")\nelif score >= 70:\n    print(\"C\")\nelif score >= 60:\n    print(\"D\")\nelse:\n    print(\"F\")\n" },
            ],
          },
        },
      ],
    },
    {
      id: "1.5",
      title: "Repetition",
      summary: "Loops, accumulators, and how you know a loop will end.",
      why: "Repetition is how a program handles many items or waits for a stopping signal. A loop that never updates its condition hangs.",
      lessons: [
        {
          id: "1.5",
          title: "Repetition",
          track: "must",
          concept: [
            { type: "p", text: "`while` repeats until a condition becomes false. `for` walks a known sequence. Use `for` when you already have the items. Use `while` when you are waiting for a signal, such as a word the person types." },
            { type: "p", text: "An accumulator or a counter is updated inside the loop and initialized before the loop. Initializing inside the loop wipes the total on every pass." },
            { type: "p", text: "Off-by-one mistakes come from starting at 0 versus 1, and from whether the end value is included. `range(1, 4)` yields 1, 2, 3. It does not yield 4." },
            { type: "p", text: "`break` leaves the loop. `continue` skips to the next pass. If a loop needs several of either, rewrite the condition so the exit is visible in one place." },
            { type: "p", text: "You should be able to say how the loop ends: the condition changes, or the sequence runs out. If nothing about the condition changes, the loop will not end." },
          ],
          example: {
            title: "Add the whole numbers through n",
            start: "n is 4. The total of 1 + 2 + 3 + 4 should be 10. You will predict that before running.",
            steps: [
              { t: "Initialize before the loop", d: "`total` starts at 0 once. `i` starts at 1. Both change inside the loop.", code: "n = 4\ntotal = 0\ni = 1\nwhile i <= n:\n    total = total + i\n    i = i + 1\nprint(total)\n" },
              { t: "Check the end", d: "When `i` becomes 5, `i <= 4` is false and the loop stops. 4 was included because the test is `<=`." },
            ],
            end: "The program prints 10. If it printed 6, the end value was excluded. If it never returned, `i` was not increasing.",
          },
          exercise: {
            prompt: "Read lines until the user types `done`. Then print how many numbers were entered, their sum, and their average. If the first input is `done`, print a clear message and do not divide by zero. Ignore a blank line with a message, and keep going.",
            constraints: [
              "Stop on the word `done`, not on a fixed count.",
              "A blank line prints a short message and does not count as a number.",
              "The average is computed only when at least one number was entered.",
            ],
            done: "A run with 2, a blank line, and 4, then done, reports count 2, sum 6, and average 3. A run whose first input is done prints a message and does not crash.",
            rubric: [
              "The loop stops when the user types done, and the count, sum, and average are printed.",
              "A blank line is ignored with a message, and the loop continues.",
              "If the first input is done, the program prints a clear message and does not divide by zero.",
            ],
            model: [
              { type: "pre", lang: "python", code: "numbers = []\nwhile True:\n    line = input(\"Number or done: \")\n    if line == \"done\":\n        break\n    if line == \"\":\n        print(\"Blank line ignored\")\n        continue\n    numbers.append(float(line))\nif len(numbers) == 0:\n    print(\"No numbers entered\")\nelse:\n    total = sum(numbers)\n    print(len(numbers), total, total / len(numbers))\n" },
              { type: "p", text: "One `break` is enough because the stop word is a single condition. The empty check happens before any conversion, so a blank line is not treated as a number." },
            ],
          },
        },
      ],
    },
    {
      id: "1.6",
      title: "Functions",
      summary: "Parameters, return values, and the call stack.",
      why: "Functions are how a program stays small enough to understand and check one piece at a time.",
      lessons: [
        {
          id: "1.6",
          title: "Functions",
          track: "must",
          concept: [
            { type: "p", text: "Define a function with `def`. Parameters are its inputs. `return` sends a value back to the caller. `print` only shows text. The caller cannot use a printed value as data." },
            { type: "p", text: "Names assigned inside a function are local. They disappear when the function returns. Reading a global by accident hides where the data came from. Pass the data in." },
            { type: "p", text: "A function that only computes from its arguments is easier to test than one that asks `input()` itself. You can call it with the cases you care about and look at what it returns." },
            { type: "p", text: "A function may call another function. The call stack is the chain of calls still in progress. The most recent call is on top and finishes first. You will see this chain again in tracebacks." },
            { type: "stack", caption: "While label is waiting on is_even, is_even is the top of the stack.", items: ["is_even", "label"] },
            { type: "p", text: "Name a function for the result or the action: `is_leap_year`, `days_in_month`." },
          ],
          example: {
            title: "A function that returns a label",
            start: "You want the text \"4 is even\" as a value the caller can keep, not only as a line on the screen.",
            steps: [
              { t: "Return, do not print", d: "`is_even` returns a boolean. `label` returns a string. Neither function calls `input`.", code: "def is_even(n):\n    return n % 2 == 0\n\ndef label(n):\n    if is_even(n):\n        return str(n) + \" is even\"\n    return str(n) + \" is odd\"\n\ntext = label(4)\nprint(text)\n" },
              { t: "Check a second call", d: "`label(5)` returns `5 is odd`. The caller decides whether to print. If `label` had printed and returned nothing, `text` would be `None`." },
            ],
            end: "The printed line is `4 is even`. The value came back through `return`, and the caller stored it in `text`.",
          },
          exercise: {
            prompt: "Write `is_leap_year(year)` and `days_in_month(year, month)` so they return values and do not print. A year is a leap year if it is divisible by 4, except years divisible by 100 are not, except years divisible by 400 are. Then write `month_label(year, month)` that returns a sentence such as `February 2024 has 29 days`.",
            constraints: [
              "The three functions return values. They do not call `print` or `input`.",
              "Month numbers are 1 through 12.",
              "Check January 2024 → 31, February 2024 → 29, February 1900 → 28, February 2000 → 29.",
            ],
            done: "Those four checks match, and `month_label(2024, 2)` returns `February 2024 has 29 days`.",
            rubric: [
              "`is_leap_year` and `days_in_month` return values and do not print.",
              "January 2024 is 31, February 2024 is 29, February 1900 is 28, and February 2000 is 29.",
              "`month_label(2024, 2)` returns the sentence February 2024 has 29 days.",
            ],
            model: [
              { type: "p", text: "1900 is divisible by 100 and not by 400, so it is not a leap year. 2000 is divisible by 400, so it is. `month_label` should call `days_in_month` rather than recompute the table." },
              { type: "pre", lang: "python", code: "def is_leap_year(year):\n    if year % 400 == 0:\n        return True\n    if year % 100 == 0:\n        return False\n    return year % 4 == 0\n\ndef days_in_month(year, month):\n    if month == 2:\n        return 29 if is_leap_year(year) else 28\n    if month in (4, 6, 9, 11):\n        return 30\n    return 31\n" },
            ],
          },
        },
      ],
    },
    {
      id: "1.7",
      title: "Lists and strings",
      summary: "Order, indexes, slices, and the surprise of two names for one list.",
      why: "Most programs group values. Confusing \"change this list\" with \"make a new string,\" or aliasing one list with two names, produces bugs that look random.",
      lessons: [
        {
          id: "1.7",
          title: "Lists and strings",
          track: "must",
          concept: [
            { type: "p", text: "A list is an ordered collection. A string is an ordered sequence of characters. Indexes start at 0. Negative indexes count from the end: `-1` is the last item. `len` is the count." },
            { type: "p", text: "Slicing: `items[1:4]` includes the start index and excludes the end index. The slice is a new list. The end index is the first one you do not take." },
            { type: "p", text: "Lists can change: `append`, assign to an index, `pop`. Strings do not change in place. `\"hi\".upper()` returns a new string. The old one is still `\"hi\"`." },
            { type: "p", text: "Loop by item (`for name in names`) unless you truly need the index." },
            { type: "p", text: "Copying: `other = items` makes a second name for the same list. `other = items.copy()` makes a shallow copy. Mutating through either name of the same list surprises people. A shallow copy is enough when the items themselves are not lists you plan to mutate." },
            { type: "p", text: "A list of lists can represent a grid. The inner list is one row." },
          ],
          example: {
            title: "Two names, one list",
            start: "A list of one color. You want a second list that can grow without changing the first.",
            steps: [
              { t: "See the alias", d: "Appending through `other` changes `colors`, because both names refer to the same list.", code: "colors = [\"red\"]\nother = colors\nother.append(\"blue\")\nprint(colors)\n" },
              { t: "Copy before you change", d: "`copy()` gives you a list you can append to. The original stays a one-item list.", code: "colors = [\"red\"]\nother = colors.copy()\nother.append(\"blue\")\nprint(colors)\nprint(other)\n" },
            ],
            end: "The first program prints `['red', 'blue']`. The second prints `['red']` and then `['red', 'blue']`.",
          },
          exercise: {
            prompt: "Write `long_words(words)` that returns a new list of the words longer than 4 characters, lowercased, and does not modify the input list. Assert that after the call, the original list is still the original casing and order. Include an empty input.",
            constraints: [
              "Build a new list. Do not assign into the list that was passed in.",
              "Words of length 4 stay out. Length is counted before lowercasing, which does not change length for these letters.",
              "Include an empty list as one of the checks.",
            ],
            done: "`long_words([\"Apple\", \"fig\", \"mango\"])` returns `[\"apple\", \"mango\"]`, the input list is unchanged, and `long_words([])` returns `[]`.",
            rubric: [
              "The function returns a new list of words longer than 4 characters, lowercased.",
              "After the call, the original list still has its original casing and order.",
              "An empty input returns an empty list.",
            ],
            model: [
              { type: "pre", lang: "python", code: "def long_words(words):\n    result = []\n    for word in words:\n        if len(word) > 4:\n            result.append(word.lower())\n    return result\n" },
            ],
          },
        },
      ],
    },
    {
      id: "1.8",
      title: "Dictionaries and sets",
      summary: "Lookup by key, uniqueness, and which collection fits the question.",
      why: "Counting, grouping, and \"have I seen this?\" are daily tasks. Lists make all three clumsy.",
      lessons: [
        {
          id: "1.8",
          title: "Dictionaries and sets",
          track: "must",
          concept: [
            { type: "p", text: "A dictionary maps a key to a value. Keys are unique. Use immutable keys such as strings or numbers. Insert and update are the same syntax: `d[key] = value`." },
            { type: "p", text: "Read with `key in d` before `d[key]`, or use `d.get(key)`. A missing key raises `KeyError`. `get` returns `None`, or a default you pass, when the key is absent." },
            { type: "p", text: "A set stores unique items and answers membership. `in` on a large set is the right tool. Scanning a list each time is the slow one. [[1.11]] makes that precise." },
            { type: "p", text: "Build a frequency table like this: if the key is absent, start at 0, then add 1. Because keys are unique, a second sighting updates the same entry." },
            { type: "p", text: "Choosing: use a list when order and duplicates matter, a dictionary when you look up by name, a set when you only care about uniqueness or membership." },
          ],
          example: {
            title: "Count colors",
            start: "The list `[\"red\", \"blue\", \"red\"]`. You want the count of each color.",
            steps: [
              { t: "Start missing keys at zero", d: "The first time a color appears, the `in` test fails and the count starts at 0. Then you add 1.", code: "colors = [\"red\", \"blue\", \"red\"]\ncounts = {}\nfor color in colors:\n    if color not in counts:\n        counts[color] = 0\n    counts[color] = counts[color] + 1\nprint(counts)\n" },
              { t: "Ask a set a membership question", d: "`seen = set(colors)` then `\"blue\" in seen`. You no longer walk the list to answer \"have I seen this?\"" },
            ],
            end: "The dictionary is `{\"red\": 2, \"blue\": 1}`. The set contains each color once.",
          },
          exercise: {
            prompt: "Given a paragraph string, count the words after lowercasing and stripping simple punctuation `.,!?`. Print each word that appears more than once and its count. Then print the count of distinct words, using a set or the dictionary's keys. Check with a sentence you can count by hand, including a repeated word and a word that appears once.",
            constraints: [
              "Lowercase first, then strip the punctuation from the ends of each word.",
              "Print a word only when its count is greater than 1.",
              "Use this sentence as one check: `Cats and cats, and dogs.`",
            ],
            done: "For that sentence, the repeated words are `cats` 2 and `and` 2, and the distinct count is 3. `dogs` appears once and is not in the repeated list.",
            rubric: [
              "Words are lowercased and the punctuation `.,!?` is stripped before counting.",
              "Only words that appear more than once are printed, with their counts.",
              "The distinct count is 3 for `Cats and cats, and dogs.`, and a once-only word is excluded from the repeated list.",
            ],
            model: [
              { type: "p", text: "After cleaning, the words are `cats`, `and`, `cats`, `and`, `dogs`. A set of the keys, or `set` of the cleaned words, has size 3." },
            ],
          },
        },
      ],
    },
    {
      id: "1.9",
      title: "Stacks and queues",
      summary: "Last-in first-out, first-in first-out, and which rule fits the problem.",
      why: "These two rules show up inside language runtimes, editors, and later graph walks. The beginner goal is to apply the rule correctly on a small problem.",
      lessons: [
        {
          id: "1.9",
          title: "Stacks and queues",
          track: "must",
          concept: [
            { type: "p", text: "A stack is last in, first out. In Python, a list with `append` and `pop()` is a stack. The top is the end of the list. The item you just put on is the next one you take off." },
            { type: "p", text: "A queue is first in, first out. A waiting line. Use `collections.deque` with `append` and `popleft`. A list `pop(0)` works on small examples and moves every later item." },
            { type: "p", text: "Call stacks from [[1.6]] are stacks: the most recent call finishes first." },
            { type: "p", text: "Matching nested structure (parentheses, undo, backtracking) fits a stack. Fair waiting fits a queue. If the next item you need is the oldest one, you wanted a queue." },
          ],
          example: {
            title: "Undo is a stack",
            start: "Three edits arrive in order: type A, type B, type C. Undo should remove C first.",
            steps: [
              { t: "Push each edit", d: "Append in arrival order. The end of the list is the top.", code: "undo = []\nundo.append(\"A\")\nundo.append(\"B\")\nundo.append(\"C\")\nprint(undo.pop())\nprint(undo.pop())\n" },
              { t: "Contrast a queue", d: "The same arrivals in a deque, removed with `popleft`, come out as A then B. That is fair waiting, not undo.", code: "from collections import deque\nline = deque()\nline.append(\"A\")\nline.append(\"B\")\nline.append(\"C\")\nprint(line.popleft())\n" },
            ],
            end: "The stack prints C then B. The queue prints A. Same arrivals, different rule.",
          },
          exercise: {
            prompt: "Write `is_balanced(text)` for the brackets `()[]{}`. Walk the string. An opener pushes onto a stack. A closer must match the current top, then pop. Anything else is ignored. Return true for an empty string and for `([])`. Return false for `([)]`, `(]`, and `(`.",
            constraints: [
              "Use a stack. The top is the end of the list.",
              "A closer with an empty stack is false. A closer that does not match the top is false.",
              "Characters other than brackets are ignored. The empty string is balanced.",
            ],
            done: "`is_balanced(\"\")` and `is_balanced(\"([])\")` are true. `is_balanced(\"([)]\")`, `is_balanced(\"(]\")`, and `is_balanced(\"(\")` are false.",
            rubric: [
              "Openers push, and a closer must match the current top before a pop.",
              "The empty string and `([])` return true.",
              "`([)]`, `(]`, and `(` return false.",
            ],
            model: [
              { type: "pre", lang: "python", code: "def is_balanced(text):\n    pairs = {\")\": : \"(\", \"]\": : \"[\", \"}\" : \"{\"}\n    stack = []\n    for ch in text:\n        if ch in \"([{\":\n            stack.append(ch)\n        elif ch in pairs:\n            if not stack or stack[-1] != pairs[ch]:\n                return False\n            stack.pop()\n    return len(stack) == 0\n" },
              { type: "p", text: "`([)]` fails because `]` arrives while `(` is on top. `(` fails because the stack is not empty at the end." },
            ],
          },
        },
      ],
    },
    {
      id: "1.10",
      title: "Searching and sorting",
      summary: "Linear search, binary search, and a sort you can see.",
      why: "Search and sort are the first algorithms a learner can feel, and the first place where the shape of the data decides the method.",
      lessons: [
        {
          id: "1.10a",
          title: "Linear and binary search",
          track: "must",
          concept: [
            { type: "p", text: "Linear search checks items in order until it finds the target or runs out. It works on unsorted data. Its cost grows with the length of the list." },
            { type: "p", text: "Binary search halves a sorted list each step. It is wrong on unsorted data. One counterexample is enough to see why: in `[10, 4, 7, 3]`, a search for `3` looks at the middle, decides the target must be to the left, and never visits the `3` at the end. It returns \"missing\" for a value that is present." },
            { type: "p", text: "Sorting puts items in order. The next lesson makes one sort visible. Python's `list.sort` is what you use when you need a sort in real code and you are not studying the method." },
          ],
          example: {
            title: "Find 7 in a sorted list of seven numbers",
            start: "The sorted list `[1, 3, 4, 7, 9, 11, 15]`. You are looking for 7, and you will count comparisons.",
            steps: [
              { t: "Linear", d: "Compare 1, 3, 4, then 7. Four comparisons. The index is 3." },
              { t: "Binary", d: "The middle of seven items is index 3, value 7. One comparison. The same answer, because the list is sorted and the target sits on a middle you actually visit." },
              { t: "A miss", d: "Searching for 8 with binary search: 7 is too small, then 11 is too big, then 9 is too big, and the window is empty. Return -1." },
            ],
            end: "Both methods return index 3 for 7. Binary search used fewer comparisons. That advantage depends on the list already being sorted.",
          },
          exercise: {
            prompt: "Implement `linear_search` and `binary_search` on a list of integers. Each returns the index or -1 and counts comparisons. Run both on a sorted list for a hit, a miss, the first item, and the last item. Then run binary search on an unsorted list that contains the target and record one case where it returns -1.",
            constraints: [
              "Return both the index and the comparison count.",
              "The four sorted runs must include a hit, a miss, the first item, and the last item.",
              "The unsorted counterexample must be a list you build, different from `[10, 4, 7, 3]` if you use that one in your notes as the lesson's example. The target must be present.",
            ],
            done: "You have the index and the comparison count for the four sorted cases, and one written unsorted case where binary search returns -1 even though the target is in the list.",
            rubric: [
              "Both functions return an index or -1 and a comparison count.",
              "On one sorted list I recorded a hit, a miss, the first item, and the last item for both searches.",
              "I recorded an unsorted list that contains the target where binary search returns -1.",
            ],
            model: [
              { type: "p", text: "A correct binary search keeps `lo` and `hi` inclusive and stops when `lo` passes `hi`. One unsorted miss: `[5, 1, 4, 2, 3]` searching for `1`. The first middle is `4`, the search goes left, the next middle is `5`, and it gives up. `1` is sitting at index 1." },
            ],
          },
        },
        {
          id: "1.10b",
          title: "Sorting and stability",
          track: "must",
          why: "A sort is the first algorithm where \"equal\" still has a history. Stability is that history.",
          concept: [
            { type: "p", text: "Insertion sort walks the list and inserts each new item into the already-sorted portion on its left. The comparison and the insert are visible, which is why it is the teaching sort. For real use, call `list.sort`." },
            { type: "p", text: "A sort is stable when equal items keep their earlier relative order. That matters when you sort by last name after already sorting by first name. If two people share a last name, a stable sort leaves the first-name order alone." },
            { type: "p", text: "An unstable sort may swap those two equals. The last names are still in order, and the result is still \"sorted,\" but a fact you had already established is gone." },
          ],
          example: {
            title: "Insert three numbers, then notice equal keys",
            start: "The list `[4, 1, 3]`, unsorted. Separately, two records that compare equal on last name.",
            steps: [
              { t: "Insert", d: "Start with `[4]`. Insert 1 in front, getting `[1, 4]`. Insert 3 between them, getting `[1, 3, 4]`." },
              { t: "Stability", d: "Records already in first-name order: (`Ada`, `Ng`), then (`Bea`, `Ng`). A stable sort by last name keeps Ada before Bea. They compare equal on the new key, so their old order stands." },
            ],
            end: "`[1, 3, 4]`, and the two `Ng` records still in Ada-then-Bea order.",
          },
          exercise: {
            prompt: "You are given three people already sorted by first name: (`Ann`, `Beck`), (`Ian`, `Cole`), (`Mia`, `Cole`). Sort them by last name with insertion sort. Write the final order and one sentence on what would be wrong if the two Coles swapped.",
            constraints: [
              "Show the list after each insertion, not only the end.",
              "When last names are equal, keep the earlier relative order.",
              "The sentence must name the order you would lose.",
            ],
            done: "The final order is Ann Beck, Ian Cole, Mia Cole, and your sentence says that swapping the Coles would destroy the first-name order you already had.",
            rubric: [
              "I showed the list after each insertion.",
              "The final order keeps Ian Cole before Mia Cole.",
              "I wrote one sentence naming the first-name order a swap would lose.",
            ],
            model: [
              { type: "p", text: "Beck inserts before both Coles. Ian and Mia compare equal on last name, so Mia inserts after Ian, not before him. A swap would put Mia before Ian even though the input had already sorted them by first name." },
            ],
          },
        },
      ],
    },
    {
      id: "1.11",
      title: "How much work a solution does",
      summary: "Constant, linear, and nested work, judged by growth.",
      why: "Choosing a data structure is choosing which operations stay cheap. This is the bridge from \"I can store data\" to \"I stored it on purpose.\"",
      lessons: [
        {
          id: "1.11",
          title: "How much work a solution does",
          track: "must",
          concept: [
            { type: "p", text: "Compare growth, not microseconds on one laptop. Three shapes are enough: constant (the work does not grow with the input), linear (one pass over n items), and a nested loop that grows much faster." },
            { type: "p", text: "A single pass over n items is linear. A loop inside a loop over the same n does about `n * n` steps." },
            { type: "p", text: "Lookup in a dictionary or a set by key is treated as constant for beginner choices. Scanning a list for membership is linear. That is why [[1.8]] preferred a set for \"have I seen this?\"" },
            { type: "table", caption: "Steps, not timings. The point is the gap.", headers: ["n", "One loop", "Nested pair of loops"], rows: [
              ["10", "10", "100"],
              ["1,000", "1,000", "1,000,000"],
              ["1,000,000", "1,000,000", "1,000,000,000,000"],
            ] },
            { type: "p", text: "\"It worked on five items\" does not tell you which approach will hurt at a thousand." },
          ],
          example: {
            title: "Read the table before you time anything",
            start: "You have two sketches on paper: one loop, and a loop inside a loop. No code yet.",
            steps: [
              { t: "Fill n = 10", d: "10 steps versus 100. Both feel instant. The table is not interesting yet." },
              { t: "Fill n = 1,000 and n = 1,000,000", d: "The nested column jumps by factors of a million, then a million again. The single loop is still one pass." },
              { t: "Decide", d: "If the nested version is \"is each item of A contained in B, by scanning B,\" a set built from B turns the inner question into a constant lookup. The whole job becomes one pass to build the set plus one pass over A." },
            ],
            end: "You can say which approach will hurt before you have a timing. The clock, in the exercise, is there to check the prediction.",
          },
          exercise: {
            prompt: "Write two functions that count how many items of list A appear in list B. One scans list B for every item of A. The other puts B in a set first. Time both with 200 items and with 4,000 items using `time.perf_counter()`. Write two sentences: which grew faster, and which data-structure rule from this module explains it.",
            constraints: [
              "Use the same data for both functions at a given size.",
              "Time the work, including building the set for the second function.",
              "Write the two sentences from the 200-item run and the 4,000-item run together, not from a five-item trial.",
            ],
            done: "You have timings for both sizes and two sentences. The nested scan should grow much faster. The explanation should name linear scans versus a set lookup treated as constant.",
            rubric: [
              "I timed both functions at 200 items and at 4,000 items.",
              "One sentence says which approach grew faster.",
              "One sentence names the rule: scanning a list is linear, and a set lookup is treated as constant.",
            ],
            model: [
              { type: "p", text: "The scan does about `n * n` membership tests. The set version does one pass to build the set and one pass over A. At 4,000 items the gap is already large. A single noisy run can wobble. The shape of the gap should still match the table." },
            ],
          },
        },
      ],
    },
    {
      id: "1.12",
      title: "Trees and graphs",
      summary: "Nested structure, networks, and walks that match the shape.",
      why: "Nested documents and networks are the next shapes after flat lists. Recognizing the shape stops learners from forcing every problem into one loop.",
      lessons: [
        {
          id: "1.12a",
          title: "Trees and recursion",
          track: "must",
          concept: [
            { type: "p", text: "A tree has nodes, one root, and each other node has one parent. Children are ordered when order matters. Folders and nested replies are trees." },
            { type: "p", text: "Recursion is a function that calls itself, plus a base case that stops. A missing base case exhausts the call stack. The same walk can be written with an explicit stack, so recursion is not a different kind of magic. It is the call stack from [[1.6]] doing the bookkeeping." },
            { type: "p", text: "A depth-first walk follows a child path before the siblings. A stack matches this order: push a node, then push its children, and the child you pushed last is the next one you visit." },
          ],
          example: {
            title: "Count files in a tiny folder tree",
            start: "A root `photos` with two children, `2024` and `2025`. `2024` has one child, `a.jpg`. Three nodes besides the way you count, or four if the root counts. Count every node, including the root: 4.",
            steps: [
              { t: "Recursive count", d: "The base case is a node with no children: it contributes 1. A parent contributes 1 plus the counts of its children." },
              { t: "The same walk with a stack", d: "Push the root. While the stack is not empty, pop a node, count it, and push its children. You visit a child path before coming back to the sibling that is still on the stack." },
            ],
            end: "Both versions count 4. If the recursive version never returns, the base case is missing or the children include the parent.",
          },
          exercise: {
            prompt: "Represent a comment and two nested replies as a tree. Count the nodes with recursion and again with an explicit stack. Write down the stack contents at one moment when a reply is on top and the other branch is still waiting.",
            constraints: [
              "Include a base case you can point at.",
              "The two counts must agree.",
              "The stack snapshot must show a node that is not the root on top.",
            ],
            done: "Both counts equal the number of nodes you can see by hand, and the snapshot shows depth-first order rather than a flat loop.",
            rubric: [
              "I counted the same tree with recursion and with an explicit stack, and the counts match.",
              "The recursive function has a base case that stops.",
              "I wrote one stack snapshot with a nested reply on top and another branch still waiting.",
            ],
            model: [
              { type: "p", text: "A root with two replies, and one of those replies having a reply of its own, has 4 nodes. One legal snapshot after pushing the root's children right-to-left, then descending: the deepest reply on top, its parent under it, and the other top-level reply still waiting at the bottom." },
            ],
          },
        },
        {
          id: "1.12b",
          title: "Graphs, breadth, and cycles",
          track: "must",
          concept: [
            { type: "p", text: "A graph is nodes and edges. An edge may be one-way. Links between pages, and course prerequisites, are graphs. A tree is a graph with extra restrictions. A graph does not have to have a single root, and a node may be reached by more than one path." },
            { type: "p", text: "Represent a small graph as a dictionary of lists: each node maps to its neighbors." },
            { type: "p", text: "A breadth-first walk uses a queue and visits near nodes before far ones. A depth-first walk uses a stack. Pick the walk that matches the question. \"What is next to me?\" is breadth. \"Follow this chain to the end\" is depth." },
            { type: "p", text: "A cycle is a path back to a node already on the current path. A diamond is not a cycle: two paths can reach the same node without any path returning to a node that is still in progress. Prerequisite data with a cycle cannot be a valid order." },
            { type: "p", text: "Use two sets when you walk prerequisites. One is the current path, and a repeat there is a cycle. One is the nodes you have finished, so a diamond does not make you walk the same finished node forever, and does not get reported as a cycle." },
          ],
          example: {
            title: "A diamond is valid, a two-node loop is not",
            start: "Build tasks: `package` requires `compile` and `test`. `test` requires `compile`. Separately, `a` requires `b` and `b` requires `a`.",
            steps: [
              { t: "Draw the diamond", d: "`package` reaches `compile` directly and also through `test`. `compile` is finished the first time. The second arrival is not a cycle." },
              { t: "Walk the loop", d: "Start at `a`, step to `b`, step to `a`. `a` is still on the current path. Report the rules as invalid." },
              { t: "Breadth, briefly", d: "From `package`, a queue visits `compile` and `test` before anything that required another step. Near nodes first." },
            ],
            end: "The build tasks have a valid order, with `compile` before `test` and both before `package`. The `a`/`b` rules have no valid order.",
          },
          exercise: {
            prompt: "Represent four courses and their prerequisites as a dictionary of lists. Use `dicts` with no prerequisites, `trees` requiring `dicts`, `graphs` requiring `trees` and `dicts`, and `apps` requiring `graphs`. Write `requires(start, target)` that returns whether `target` must come before `start`, using a stack or recursion and a seen-set. Add one cyclic dataset and make the function report that the rules are invalid.",
            constraints: [
              "A shared prerequisite such as `dicts` under both `graphs` and `trees` must not be reported as a cycle.",
              "The cyclic dataset is separate: two courses that require each other.",
              "`requires(\"apps\", \"dicts\")` is true and `requires(\"trees\", \"apps\")` is false.",
            ],
            done: "The two `requires` checks match, the diamond is accepted, and the cyclic dataset is reported invalid.",
            rubric: [
              "`requires` uses a stack or recursion and distinguishes the current path from nodes already finished.",
              "`apps` requires `dicts`, and `trees` does not require `apps`.",
              "A two-course cycle is reported invalid, and the diamond in the four-course set is not.",
            ],
            model: [
              { type: "p", text: "Walk the prerequisite lists, not the dependents. If `target` appears as a prerequisite of `start` or of something `start` requires, return true. If a node appears in the current path, stop and report invalid. Mark a node finished only after its prerequisites have been walked, so the second arrival at `dicts` is a finished node, not a cycle." },
            ],
          },
        },
      ],
    },
    {
      id: "1.13",
      title: "Debugging",
      summary: "Read the traceback, predict, shrink the input, keep the failure.",
      why: "Learners who cannot read an error stop at the first mistake. Every later level depends on reproducing a failure and narrowing it.",
      lessons: [
        {
          id: "1.13",
          title: "Debugging",
          track: "must",
          concept: [
            { type: "p", text: "Read a traceback from the bottom: the exception name, the message, then the line in your file. Frames above it are callers. They show how you got there. The bug is often on the last line that is yours, not on the first line of the traceback." },
            { type: "table", headers: ["Exception", "Usual meaning"], rows: [
              ["SyntaxError", "The file is not valid Python, so it did not start."],
              ["IndentationError", "A block's indentation does not match its structure."],
              ["NameError", "A name was read before it was assigned."],
              ["TypeError", "An operation got a kind of value it cannot use."],
              ["IndexError", "An index is outside the sequence."],
              ["KeyError", "A dictionary does not have that key."],
              ["ZeroDivisionError", "A division or remainder used a zero divisor."],
            ] },
            { type: "p", text: "Predict the value before you run. Then print that value, or stop in a debugger with `breakpoint()` or an editor breakpoint, and compare. A prediction that was wrong is the finding." },
            { type: "p", text: "Shrink the input until one step is wrong. Fix that step. Re-run the original input. After a fix, keep the input that failed as a comment or a small `assert` so you can replay it." },
          ],
          example: {
            title: "A write-up for one IndexError",
            start: "This program crashes. You have not changed it yet.",
            steps: [
              { t: "Run and read from the bottom", d: "The traceback names `IndexError`, says the list index is out of range, and points at line 2 of your file.", code: "nums = [1, 2, 3, 4]\nprint(nums[4])\n" },
              { t: "Write the four lines", d: "Exception: IndexError. Line: 2. Wrong assumption: the last index is 4 because there are 4 items. Fix: `print(nums[3])` or `print(nums[-1])`." },
              { t: "Keep the failure", d: "Leave `assert nums[3] == 4` or a comment with the bad call next to the fix, so the mistake can be replayed." },
            ],
            end: "The program prints 4. The write-up names the exception, the line, the assumption, and the fix. The exercise uses different bugs, in this same shape.",
          },
          exercise: {
            prompt: "Debug three short programs. For each, write the exception name, the line, the wrong assumption, and the fix. Do not reuse the write-up from the worked example.",
            constraints: [
              "Run each program and read the traceback from the bottom.",
              "The fix should be the smallest change that matches the intention in the comment.",
              "Keep each original failing input as a comment or an assert after you fix it.",
            ],
            done: "You have a four-part write-up for each program, and each fixed program runs.",
            rubric: [
              "Program A: I named the exception, the line, the wrong assumption about the slice, and a fix.",
              "Program B: I named the exception, the line, the wrong assumption about the string, and a fix.",
              "Program C: I named the exception, the line, the wrong assumption about the key, and a fix.",
            ],
            snippets: [
              { caption: "Program A, off-by-one slice", lang: "python", code: "letters = [\"a\", \"b\", \"c\", \"d\"]\n# Keep the first three items, then read the last of those three.\nchosen = letters[0:3]\nprint(chosen[3])\n" },
              { caption: "Program B, string where an int is required", lang: "python", code: "count = \"3\"\nprint(count + 1)\n" },
              { caption: "Program C, missing key", lang: "python", code: "phones = {\"Ada\": \"555\"}\nprint(phones[\"Bea\"])\n" },
            ],
            model: [
              { type: "p", text: "A raises `IndexError` on the `print` line. The slice `letters[0:3]` has indexes 0, 1, and 2. The assumption that it has an item at index 3 is the off-by-one. Print `chosen[2]`, or compare with `-1`." },
              { type: "p", text: "B raises `TypeError` on `count + 1`. `\"3\"` is text. `int(count) + 1` is the fix." },
              { type: "p", text: "C raises `KeyError` on the lookup. `Bea` was never stored. Test `\"Bea\" in phones` or use `phones.get(\"Bea\")` before you treat the result as a phone number." },
            ],
          },
        },
      ],
    },
    {
      id: "1.15",
      title: "Exceptions",
      summary: "Raise when the caller must hear about a failure, and catch only when you have a next step.",
      why: "Later lessons ask you to raise a documented exception and to skip a bad line. Those are the same idea.",
      lessons: [
        {
          id: "1.15",
          title: "Exceptions",
          track: "must",
          concept: [
            { type: "p", text: "An exception is how a function reports a failure it cannot finish. `raise` stops the function and sends the failure up the call stack. The caller either catches it or the program stops with a traceback, which [[1.13]] taught you to read." },
            { type: "p", text: "`try` marks the code that might fail. `except SomeError` runs only when that kind of failure happens. A bare `except` hides the kind, so name the error you know how to handle." },
            { type: "p", text: "Catch an exception when you have a next step: start from empty data, tell the user, or record the failure and continue. An empty handler deletes the evidence. If you have no next step, let it propagate." },
            { type: "p", text: "Returning `None` for a failure is easy to ignore. Raising a documented exception forces the caller to notice. Later, invalid dates raise. They do not return `None`." },
            { type: "pre", code: "def require_name(name):\n    if name.strip() == \"\":\n        raise ValueError(\"name is required\")\n    return name.strip()\n\ntry:\n    label = require_name(\"  \")\nexcept ValueError:\n    label = \"guest\"\n" },
          ],
          example: {
            title: "A missing file becomes an empty list",
            start: "The program should load names from a file. On the first run the file does not exist.",
            steps: [
              { t: "The failure", d: "Opening a missing path raises `FileNotFoundError`. That is the signal. It is not a bug in `open`." },
              { t: "The next step", d: "Catch that one error and return an empty list. Any other error, such as a permission failure, still propagates.", code: "def load_names(path):\n    try:\n        with open(path) as f:\n            return [line.strip() for line in f if line.strip()]\n    except FileNotFoundError:\n        return []\n" },
            ],
            end: "A missing file starts empty. A different error still shows a traceback. The handler has a next step.",
          },
          exercise: {
            prompt: "Write `parse_score(text)` that returns an `int` from 0 to 100. Raise `ValueError` when the text is not an integer or the integer is outside 0–100. Then write a caller that reads one line: on success it prints the score, and on `ValueError` it prints `Score not accepted` and does not crash.",
            constraints: [
              "The function raises. It does not return `None` and it does not print the error itself.",
              "The caller catches `ValueError` only. Other exceptions still propagate.",
              "Check 90, `abc`, -1, and 101.",
            ],
            done: "90 prints as a score. The other three inputs print `Score not accepted` and the program continues.",
            rubric: [
              "`parse_score` returns the integer for a score from 0 to 100.",
              "It raises `ValueError` for non-integers and for numbers outside 0–100.",
              "The caller catches that error, prints the message, and does not use an empty handler.",
            ],
            model: [
              { type: "p", text: "`int(text)` itself raises `ValueError` for `abc`. Catch that inside `parse_score` only if you want one documented error, or let it propagate if the caller already handles `ValueError`. Then check the range and `raise ValueError(\"score out of range\")` for -1 and 101. The caller prints the score from the `try` and the short message from the `except`. An empty `except` would hide both cases." },
            ],
          },
        },
      ],
    },
    {
      id: "1.16",
      title: "Imports, modules, and records",
      summary: "More than one file, a name you import, and fields grouped into one record.",
      why: "A later lesson splits the contact book into modules. This is the first time a program lives in more than one file.",
      lessons: [
        {
          id: "1.16",
          title: "Imports, modules, and records",
          track: "must",
          concept: [
            { type: "p", text: "A module is a file of names. `import scores` lets another file use `scores.parse_score`. `from scores import parse_score` copies that one name into the current file. The file you run is the entry point. The files it imports do not run their own command loop." },
            { type: "p", text: "Import direction is a choice you can already feel. The entry point may import the parser. The parser does not import the entry point. A cycle means each file is waiting for the other to finish loading." },
            { type: "p", text: "A record groups the fields of one thing. A dictionary with known keys is enough: `{\"name\": \"Ada\", \"phone\": \"555\"}`. A loose pair of parallel lists, one of names and one of phones, falls out of step the first time you insert in the wrong place." },
            { type: "p", text: "Pass the record into a function. Do not make the function reach back into the other module's variables. The caller can see the inputs." },
          ],
          example: {
            title: "A contact leaves the command loop",
            start: "One file both reads lines and decides whether a phone is valid. You are about to add a second command and the file is already hard to follow.",
            steps: [
              { t: "A record", d: "A contact is `{\"name\": name, \"phone\": phone}`. Functions take that dictionary, not two unrelated arguments that might be swapped." },
              { t: "A second file", d: "`records.py` defines `parse_contact(line)` and `format_contact(contact)`. `book.py` imports them and owns the command loop. `records.py` does not import `book.py`.", code: "def parse_contact(line):\n    name, sep, phone = line.partition(\"\\t\")\n    if sep != \"\\t\" or name == \"\":\n        raise ValueError(\"bad contact line\")\n    return {\"name\": name, \"phone\": phone}\n" },
            ],
            end: "The command loop asks for a contact. The record module knows the fields. Neither file reaches into the other's locals.",
          },
          exercise: {
            prompt: "Split a tiny contact helper into two files. `records.py` provides `make_contact(name, phone)` returning a dictionary and `label(contact)` returning `name: phone`. `book.py` imports them, builds one contact from input, and prints the label. `records.py` does not import `book.py`.",
            constraints: [
              "The contact is one dictionary, not two parallel lists.",
              "`make_contact` raises `ValueError` when the name is blank or the phone contains a letter.",
              "Run `book.py`. Running `records.py` alone prints nothing.",
            ],
            done: "`book.py` prints one label. A blank name raises `ValueError` from the records module. The import arrow points from the command file toward the records file.",
            rubric: [
              "`make_contact` returns a dictionary with name and phone, and raises `ValueError` for a blank name or a phone with a letter.",
              "`book.py` imports the records module and is the only file that reads input and prints.",
              "`records.py` does not import `book.py`.",
            ],
            model: [
              { type: "p", text: "`make_contact` checks the name and that every character of the phone is a digit, a space, or `+`, then returns the dictionary. `label` reads those two keys. `book.py` calls both and prints. If `records.py` imported `book.py`, loading either file would cycle. The entry point is the only place that calls `input`." },
            ],
          },
        },
      ],
    },
    {
      id: "1.14",
      title: "Text files and a finished program",
      summary: "Data that outlives one run, and a contact book that uses the level.",
      why: "Separate exercises do not show how the pieces form a program. A program that forgets everything on exit has not yet met the reason people run software twice.",
      lessons: [
        {
          id: "1.14",
          title: "Text files and a finished program",
          track: "must",
          thread: "Contact book",
          concept: [
            { type: "p", text: "A file outlives one run. Open it, read or write, and always close it. `with open(path) as f` closes the file even when an error happens. A missing file is the `FileNotFoundError` you already catch in [[1.15]]. A contact is the record from [[1.16]], not two lists that can drift apart." },
            { type: "p", text: "One record per line. Split fields with a delimiter you chose and can describe. Reject a line that does not have the fields you expect. Skipping it silently, with a count you show the user, is a reasonable policy when the file is data you own. Hiding the count is not." },
            { type: "p", text: "A missing file is a case to handle (`FileNotFoundError`), usually by starting from empty data or telling the user the path." },
            { type: "p", text: "Before coding a whole program, write one sentence for the job, a list of commands, the data structure, and the functions. Write the function list before the command loop." },
            { type: "p", text: "A manual test list has three sessions: one normal session, one empty start, and one bad line in the file." },
            { type: "p", text: "Keep this program. New graduate lessons extend it under team conditions: history, tests, and a layout someone else can run." },
          ],
          example: {
            title: "A city list that survives a second run",
            start: "No file yet. The job is a list of city names, one per line, in `cities.txt`.",
            steps: [
              { t: "Write the plan in four lines", d: "Job: remember cities. Commands: `add`, `list`, `quit`. Data: a list of strings. Functions: `load`, `save`, `add`. The command loop is the only thing that prints prompts." },
              { t: "Load, and survive a missing file", d: "If `cities.txt` is missing, start from an empty list. If a line is blank, skip it and count it.", code: "def load(path):\n    cities = []\n    skipped = 0\n    try:\n        with open(path) as f:\n            for line in f:\n                name = line.strip()\n                if name == \"\":\n                    skipped = skipped + 1\n                else:\n                    cities.append(name)\n    except FileNotFoundError:\n        return [], 0\n    return cities, skipped\n" },
              { t: "Save on add", d: "Write every city back with `with open(path, \"w\") as f`, one name per line. Run `add`, quit, run again, and `list`. The city is still there." },
            ],
            end: "A second run prints the city from the first run. A missing file starts empty instead of crashing. This is the shape of the contact book, not the contact book itself.",
          },
          exercise: {
            prompt: "Build a command-line contact book. Commands: `add NAME PHONE`, `find NAME`, `list`, `quit`. Store contacts in a dictionary keyed by name. Reject a duplicate name with a message. Reject a phone that is not made of digits, spaces, and `+`. On startup, load `contacts.txt` if it exists. On add, rewrite the file. If a line is malformed, skip it, count it, and after loading tell the user how many lines were skipped.",
            constraints: [
              "Before coding, write one sentence for the job, the commands, the data structure, and the function list.",
              "Isolate `parse` of a line, `format` of a line, `load`, `save`, `add`, and `find`. Put parse and format in a second module. The command loop calls them and is the only place that prints menu text.",
              "Manual tests: one normal session, one empty start, and one bad line in the file.",
            ],
            done: "A contact added in one run is found in the next run. A duplicate name and a phone with a letter are rejected. A malformed line is skipped and the skip count is shown after loading.",
            rubric: [
              "I wrote the job, the commands, the dictionary, and the function list before the command loop.",
              "add, find, list, and quit work, duplicates and bad phones are rejected, and the file is rewritten on add.",
              "A missing file starts empty, a malformed line is skipped and counted, and I ran the three manual sessions.",
            ],
            model: [
              { type: "p", text: "A workable line format is the name, a tab, and the phone. `parse` raises `ValueError` or returns nothing for a line that does not split into those two fields, and `load` counts those lines inside `except` or after the failed parse. `add` checks the name and the phone before it updates the dictionary or the file. `find` returns the phone or reports that the name is missing, and the loop prints that result. The model is the shape, not a full program you should paste over your own." },
            ],
          },
        },
      ],
    },
    {
      id: "1.17",
      title: "Evidence for the next level",
      summary: "What you can show, how you ask for feedback, and the case for New graduate.",
      why: "Moving on is a claim about outcomes. A title does not carry the claim.",
      lessons: [
        {
          id: "1.17",
          title: "Evidence for the next level",
          track: "core",
          career: true,
          concept: [
            { type: "p", text: "The next level asks you to work on a team: history, other people's code, tests, and review. The evidence is work you can point at, not a title and not hours spent." },
            { type: "p", text: "Ask for feedback on a specific artifact. \"How do I get better?\" is hard to answer. \"Does this contact book still load after a bad line?\" is a question with an object." },
            { type: "p", text: "The case for New graduate is the Beginner outcomes: a small program, a justified data structure, a traceback you can read, and a program that remembers its data. Say which of those you can show, and which lesson is still open." },
          ],
          example: {
            title: "A question with the program attached",
            start: "You want a friend who already works on a team to look at the contact book.",
            steps: [
              { t: "The artifact", d: "Send the two files and the three manual sessions: a normal run, an empty start, and a bad line." },
              { t: "The question", d: "`Can you load this and tell me whether the bad line is skipped and counted? I am not asking for a job title. I want to know if this is the outcome the next level assumes.`" },
            ],
            end: "They can answer from the program. You can act on the answer.",
          },
          exercise: {
            prompt: "Write a short note you could send with your contact book. Name two Beginner outcomes you can show, one outcome that is still thin, and the question you want answered. Then write two sentences that make the case for starting New graduate, using outcomes rather than a title.",
            constraints: [
              "Attach the claim to the contact book or another program you wrote in this level.",
              "The question names a behavior the reader can check.",
              "The case does not say you are ready because of time spent or a job title.",
            ],
            done: "A note someone could answer, and a two-sentence case tied to outcomes.",
            rubric: [
              "The note names two outcomes I can show and one that is still thin.",
              "The question points at a behavior in a program I wrote.",
              "The case for New graduate is about outcomes, not a title.",
            ],
            model: [
              { type: "p", text: "`The contact book loads, rejects a bad phone, and skips a malformed line with a count. I can explain why the contacts are a dictionary. I am still thin on catching only the error I expect. Can you run the bad-line session and tell me if the count is honest?` The case: I can write a small program that remembers its data and explain the data structure. New graduate is the next work because those outcomes are the ones it assumes, and the thin one is a lesson I can name." },
            ],
          },
        },
      ],
    },
  ],
});
