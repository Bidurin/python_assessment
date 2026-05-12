// Python Complete Course — Full Question Bank
// Updated: harder questions, mixed answer positions (A/B/C/D), coding-based questions added

export const EXAM_TITLE = 'Python Complete Course Exam'

export const SECTIONS = [
  // ── 1. Variables & Data Types ★ ──────────────────────────────────────────
  {
    id: 'variables',
    label: 'Variables & Data Types',
    starred: true,
    color: '#3b82f6',
    questions: [
      {
        q: 'What is the output?\n\nx = 0.1 + 0.2\nprint(x == 0.3)',
        options: ['True', 'False', 'Error', 'None'],
        answer: 1,
        explain: 'Floating-point arithmetic is not exact. 0.1 + 0.2 evaluates to 0.30000000000000004 in Python, so x == 0.3 is False. Use math.isclose() or round() for float comparisons.'
      },
      {
        q: 'What does this print?\n\nx = 10\ny = 3.0\nprint(type(x + y))',
        options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", 'TypeError'],
        answer: 1,
        explain: 'When int and float are added, Python upcasts the result to float. 10 + 3.0 = 13.0 which is float.'
      },
      {
        q: 'What is the output?\n\na = b = c = []\nb.append(1)\nprint(a)',
        options: ['[]', '[1]', 'Error', 'None'],
        answer: 1,
        explain: 'a = b = c = [] makes all three names point to the SAME list object. Appending to b also changes a and c. Use a=[], b=[], c=[] for independent lists.'
      },
      {
        q: 'What is the output?\n\nx = 5\ny = x\nx += 10\nprint(y)',
        options: ['15', '10', '5', 'Error'],
        answer: 2,
        explain: 'Integers are immutable. y = x copies the value 5, not a reference. x += 10 rebinds x to a new int 15. y is still 5.'
      },
      {
        q: 'What does type(None) return?\n\nx = None\nprint(type(x))',
        options: ["<class 'undefined'>", "<class 'null'>", "<class 'NoneType'>", "<class 'bool'>"],
        answer: 2,
        explain: 'None is Python\'s null value. Its type is NoneType — a unique singleton. It is NOT the same as 0, False, or empty string.'
      }
    ]
  },

  // ── 2. Strings ★ ─────────────────────────────────────────────────────────
  {
    id: 'strings',
    label: 'Strings',
    starred: true,
    color: '#8b5cf6',
    questions: [
      {
        q: 'What is the output?\n\ns = "Python"\nprint(s[::-1])',
        options: ['Python', 'nohtyP', 'nohty', 'Error'],
        answer: 1,
        explain: 's[::-1] uses a slice with step -1, which reverses the string. "Python" reversed is "nohtyP".'
      },
      {
        q: 'What does this print?\n\nname = "priya"\nprint(name.upper().replace("I", "1"))',
        options: ['PRIYA', 'PR1YA', 'priya', 'Error'],
        answer: 1,
        explain: '.upper() converts to "PRIYA", then .replace("I","1") replaces uppercase I → "PR1YA". Methods chain left to right.'
      },
      {
        q: 'What is the output?\n\ns = "abcdef"\nprint(s[::2])',
        options: ['abcdef', 'ace', 'bdf', 'fed'],
        answer: 1,
        explain: 's[::2] takes every 2nd character starting from index 0: a(0), c(2), e(4) → "ace".'
      },
      {
        q: 'What does this output?\n\ntext = "error: file not found"\nprint(text.split(": ", 1))',
        options: [
          "['error', 'file', 'not', 'found']",
          "['error', 'file not found']",
          "['error: file not found']",
          'Error'
        ],
        answer: 1,
        explain: '.split(": ", 1) splits on the first occurrence of ": " only (maxsplit=1). Result is two parts: ["error", "file not found"].'
      },
      {
        q: 'What does this print?\n\nwords = ["data", "science", "python"]\nprint(" | ".join(words))',
        options: ["['data', 'science', 'python']", 'data science python', 'data | science | python', 'Error'],
        answer: 2,
        explain: '.join() concatenates list items using the separator string. " | ".join(...) places " | " between each word.'
      }
    ]
  },

  // ── 3. Numbers & Operators ───────────────────────────────────────────────
  {
    id: 'numbers',
    label: 'Numbers & Operators',
    starred: false,
    color: '#f59e0b',
    questions: [
      {
        q: 'What is the output?\n\nprint(17 // 5)\nprint(17 % 5)',
        options: ['3.4 and 2', '3 and 2', '3 and 0.4', '4 and 2'],
        answer: 1,
        explain: '// is floor division: 17//5 = 3 (rounds down). % is modulo: 17%5 = 2 (remainder).'
      },
      {
        q: 'What is the output?\n\nprint(-7 // 2)\nprint(-7 % 2)',
        options: ['-3 and -1', '-4 and 1', '-3 and 1', '-4 and -1'],
        answer: 1,
        explain: 'Floor division always rounds toward negative infinity. -7 // 2 = -4 (not -3). Modulo: -7 = (-4)*2 + r → r = 1. So -7 % 2 = 1.'
      },
      {
        q: 'What is the result?\n\nimport math\nprint(round(3.7654, 2))\nprint(math.floor(3.9))',
        options: ['3.77 and 4', '3.77 and 3', '3.76 and 3', '3.77 and 3.0'],
        answer: 1,
        explain: 'round(3.7654, 2) → 3.77. math.floor() always rounds DOWN to nearest int → 3, not 4.'
      }
    ]
  },

  // ── 4. Boolean & Comparison ──────────────────────────────────────────────
  {
    id: 'boolean',
    label: 'Boolean & Comparison',
    starred: false,
    color: '#ec4899',
    questions: [
      {
        q: 'What is the output?\n\nprint(True + True + False)\nprint(True * 5)',
        options: ['Error', 'True True', '2 and 5', 'True and 5'],
        answer: 2,
        explain: 'In Python, bool is a subclass of int. True == 1 and False == 0. True + True = 2. True * 5 = 5.'
      },
      {
        q: 'Which values are falsy in Python?',
        options: [
          '0, "", [], None, False',
          'Only False and None',
          '0 and "" only',
          'Everything except True'
        ],
        answer: 0,
        explain: 'Falsy values: False, None, 0, 0.0, "" (empty string), [] (empty list), {} (empty dict), () (empty tuple).'
      },
      {
        q: 'What is the output?\n\nx = 5\nprint(1 < x < 10)\nprint(x is 5)',
        options: ['True and True', 'True and False', 'Error', 'False and True'],
        answer: 0,
        explain: 'Python supports chained comparisons: 1 < 5 < 10 is True. For small integers, CPython caches them so x is 5 is typically True (though relying on this is not recommended).'
      }
    ]
  },

  // ── 5. If-Else Statements ★ ──────────────────────────────────────────────
  {
    id: 'ifelse',
    label: 'If-Else Statements',
    starred: true,
    color: '#10b981',
    questions: [
      {
        q: 'What is the output?\n\nscore = 72\nif score >= 90:\n    grade = "A"\nelif score >= 75:\n    grade = "B"\nelif score >= 60:\n    grade = "C"\nelse:\n    grade = "F"\nprint(grade)',
        options: ['A', 'B', 'C', 'F'],
        answer: 2,
        explain: '72 is not >=90, not >=75, but IS >=60 → grade = "C". Once a condition is True, remaining elif/else are skipped.'
      },
      {
        q: 'What does this print?\n\nx = 15\nresult = "odd" if x % 2 != 0 else "even"\nprint(result)',
        options: ['odd', 'even', '15', 'Error'],
        answer: 0,
        explain: 'Ternary if-else. 15%2=1 which != 0 → True → result = "odd".'
      },
      {
        q: 'What is the output?\n\nval = None\nif val:\n    print("truthy")\nelif val is None:\n    print("it is None")\nelse:\n    print("falsy")',
        options: ['truthy', 'falsy', 'it is None', 'Error'],
        answer: 2,
        explain: 'val is None → first condition: None is falsy → skip. Second elif checks val is None → True → prints "it is None". "elif val is None" is reached before else.'
      },
      {
        q: 'What will print?\n\nage = 20\nhas_id = True\nif age >= 18 and has_id:\n    print("Entry allowed")\nelse:\n    print("Denied")',
        options: ['Entry allowed', 'Denied', 'True', 'Error'],
        answer: 0,
        explain: 'age>=18 → True, has_id → True. True and True → True → "Entry allowed".'
      },
      {
        q: 'What does this nested conditional print?\n\nx = 7\nif x > 5:\n    if x > 10:\n        print("big")\n    else:\n        print("medium")\nelse:\n    print("small")',
        options: ['big', 'small', 'medium', 'Error'],
        answer: 2,
        explain: 'x=7 > 5 → enters outer if. x=7 is NOT > 10 → inner else → prints "medium".'
      }
    ]
  },

  // ── 6. Loops ★ ───────────────────────────────────────────────────────────
  {
    id: 'loops',
    label: 'Loops',
    starred: true,
    color: '#06b6d4',
    questions: [
      {
        q: 'What will this print?\n\nfor i in range(2, 10, 3):\n    print(i, end=" ")',
        options: ['2 5 8', '2 4 6 8', '2 3 4 5 6 7 8 9', '2 5'],
        answer: 0,
        explain: 'range(2,10,3) starts at 2, steps by 3, stops before 10. Values: 2, 5, 8.'
      },
      {
        q: 'What does this print?\n\ntotal = 0\nfor n in [10, 20, 30, 40]:\n    if n == 30:\n        break\n    total += n\nprint(total)',
        options: ['100', '30', '60', '70'],
        answer: 1,
        explain: '10 added (total=10), 20 added (total=30), n==30 triggers break. Loop exits. total = 30.'
      },
      {
        q: 'What will this print?\n\nresult = []\nfor i in range(3):\n    for j in range(3):\n        if i == j:\n            result.append(i)\nprint(result)',
        options: ['[0, 1, 2]', '[0, 0, 1, 1, 2, 2]', '[0]', 'Error'],
        answer: 0,
        explain: 'Nested loops: when i==j → append i. This happens at (0,0), (1,1), (2,2). result = [0, 1, 2].'
      },
      {
        q: 'What does enumerate() give you?\n\nitems = ["alpha", "beta", "gamma"]\nfor i, val in enumerate(items):\n    print(i, val)',
        options: [
          'Only the index — 0 1 2',
          'Only the values',
          'Both index and value — 0 alpha, 1 beta, 2 gamma',
          'Error — enumerate needs two arguments'
        ],
        answer: 2,
        explain: 'enumerate() yields (index, value) pairs. i gets the index, val gets the item.'
      },
      {
        q: 'What is the output?\n\ncount = 0\nwhile count < 5:\n    count += 2\nprint(count)',
        options: ['4', '5', '6', 'Infinite loop'],
        answer: 2,
        explain: 'count: 0→2→4→6. When count=6, 6<5 is False so loop exits. print(count) = 6. The loop overshoots 5.'
      }
    ]
  },

  // ── 7. Lists ★ ───────────────────────────────────────────────────────────
  {
    id: 'lists',
    label: 'Lists',
    starred: true,
    color: '#22c55e',
    questions: [
      {
        q: 'What is the output?\n\nitems = ["a","b","c","d","e"]\nprint(items[1:4])\nprint(items[-2:])',
        options: [
          "['b','c','d'] and ['d','e']",
          "['a','b','c'] and ['d','e']",
          "['b','c','d'] and ['e']",
          "['b','c'] and ['d','e']"
        ],
        answer: 0,
        explain: 'items[1:4] → indices 1,2,3 → ["b","c","d"]. items[-2:] → last 2 → ["d","e"].'
      },
      {
        q: 'What does .sort() return?\n\nnums = [3, 1, 4, 1, 5]\nresult = nums.sort()\nprint(result)',
        options: ['[1, 1, 3, 4, 5]', 'None', '3', 'Error'],
        answer: 1,
        explain: '.sort() sorts IN PLACE and returns None. Use sorted(nums) to get a new sorted list you can assign.'
      },
      {
        q: 'What is the output?\n\nmatrix = [[1,2],[3,4],[5,6]]\nflat = [x for row in matrix for x in row]\nprint(flat)',
        options: [
          '[[1,2],[3,4],[5,6]]',
          '[1, 2, 3, 4, 5, 6]',
          'Error',
          '[1, 3, 5]'
        ],
        answer: 1,
        explain: 'Nested list comprehension: outer loop iterates rows, inner loop iterates items in each row. Flattens to [1,2,3,4,5,6].'
      },
      {
        q: 'What is the output?\n\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)',
        options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4]', 'Error'],
        answer: 1,
        explain: 'b = a does NOT copy — both point to the same list. Appending to b also modifies a. Use b = a.copy() for independence.'
      },
      {
        q: 'What does this print?\n\nnums = [5, 3, 8, 1, 9, 2]\nprint(max(nums))\nprint(sorted(nums)[-2])',
        options: ['9 and 9', '9 and 8', '8 and 9', 'Error'],
        answer: 1,
        explain: 'max(nums) = 9. sorted(nums) = [1,2,3,5,8,9]. Index -2 is the second-last = 8.'
      }
    ]
  },

  // ── 8. Tuples ────────────────────────────────────────────────────────────
  {
    id: 'tuples',
    label: 'Tuples',
    starred: false,
    color: '#a855f7',
    questions: [
      {
        q: 'What happens when you try to modify a tuple?\n\nmy_tuple = (1, 2, 3)\nmy_tuple[0] = 99',
        options: [
          'Changes the tuple to (99, 2, 3)',
          'Raises TypeError — tuples are immutable',
          'Creates a new tuple (99, 2, 3)',
          'Raises IndexError'
        ],
        answer: 1,
        explain: 'Tuples are immutable. You cannot change, add, or remove items. Raises TypeError: tuple object does not support item assignment.'
      },
      {
        q: 'What does this print?\n\nt = ([1, 2], [3, 4])\nt[0].append(99)\nprint(t)',
        options: [
          'TypeError — tuple is immutable',
          '([1, 2], [3, 4])',
          '([1, 2, 99], [3, 4])',
          'Error'
        ],
        answer: 2,
        explain: 'The tuple itself is immutable (you cannot replace t[0]), but the list INSIDE is mutable. Appending to t[0] modifies the list object in place — the tuple still holds the same reference.'
      },
      {
        q: 'When should you use a tuple instead of a list?',
        options: [
          'When you need to sort items',
          'When the data should not change — coordinates, RGB values, DB records',
          'When you need to append items frequently',
          'Tuples and lists are interchangeable — no difference'
        ],
        answer: 1,
        explain: 'Use tuples for fixed collections that should not change: (latitude, longitude), (r,g,b), a row from a database. Immutability also makes tuples slightly faster and hashable.'
      }
    ]
  },

  // ── 9. Dictionaries ★ ────────────────────────────────────────────────────
  {
    id: 'dicts',
    label: 'Dictionaries',
    starred: true,
    color: '#ef4444',
    questions: [
      {
        q: 'What does .get() do differently from []?\n\nemp = {"name": "Priya"}\nprint(emp["salary"])      # line A\nprint(emp.get("salary"))  # line B\nprint(emp.get("salary",0))# line C',
        options: [
          'All three print None',
          'Line A raises KeyError, B prints None, C prints 0',
          'All three raise KeyError',
          'Line A prints None, B and C print 0'
        ],
        answer: 1,
        explain: '[] raises KeyError if key is missing. .get() returns None by default. .get(key, default) returns the default value.'
      },
      {
        q: 'What does this print?\n\nd = {"x": 1, "y": 2, "z": 3}\nd2 = {k: v for k, v in d.items() if v > 1}\nprint(d2)',
        options: [
          "{'x': 1, 'y': 2, 'z': 3}",
          "{'y': 2, 'z': 3}",
          "{'x': 1}",
          'Error'
        ],
        answer: 1,
        explain: 'Dict comprehension with filter: only keeps pairs where v > 1. x:1 is excluded, y:2 and z:3 pass → {"y":2,"z":3}.'
      },
      {
        q: 'What is the correct way to iterate over both keys and values?',
        options: [
          'for k, v in config:',
          'for k, v in config.items():',
          'for k, v in config.keys():',
          'for k in config.values():'
        ],
        answer: 1,
        explain: '.items() yields (key, value) pairs. .keys() yields only keys. .values() yields only values. Direct loop gives only keys.'
      },
      {
        q: 'What is the output?\n\nfrom collections import defaultdict\nd = defaultdict(int)\nwords = ["apple","banana","apple","cherry","banana","apple"]\nfor w in words:\n    d[w] += 1\nprint(d["apple"])',
        options: ['1', '2', '3', 'KeyError'],
        answer: 2,
        explain: 'defaultdict(int) initialises missing keys to 0 automatically. "apple" appears 3 times → d["apple"] = 3.'
      },
      {
        q: 'How do you safely merge two dicts in Python 3.9+?\n\nd1 = {"a": 1}\nd2 = {"b": 2}',
        options: [
          'd1.append(d2)',
          'merged = d1 + d2',
          'merged = d1 | d2',
          'merged = dict(d1, d2)'
        ],
        answer: 2,
        explain: 'The | operator merges dicts in Python 3.9+. merged = {**d1, **d2} also works in older versions. d1+d2 raises TypeError.'
      }
    ]
  },

  // ── 10. Sets ─────────────────────────────────────────────────────────────
  {
    id: 'sets',
    label: 'Sets',
    starred: false,
    color: '#f97316',
    questions: [
      {
        q: 'What is the output?\n\ns = {1, 2, 2, 3, 3, 3}\nprint(len(s))',
        options: ['6', '3', '1', 'Error'],
        answer: 1,
        explain: 'Sets automatically remove duplicates. {1,2,2,3,3,3} stores only {1,2,3}. len = 3.'
      },
      {
        q: 'What does this print?\n\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(a - b)',
        options: ['{1, 2, 3, 4, 5, 6}', '{3, 4}', '{5, 6}', '{1, 2}'],
        answer: 3,
        explain: 'a - b is set difference: elements in a that are NOT in b. 1 and 2 are only in a → {1, 2}.'
      },
      {
        q: 'Which of these creates an empty set?',
        options: ['s = {}', 's = set()', 's = []', 's = ()'],
        answer: 1,
        explain: '{} creates an empty DICT, not a set. Use set() to create an empty set. This is a very common Python gotcha.'
      }
    ]
  },

  // ── 11. File Handling ────────────────────────────────────────────────────
  {
    id: 'fileio',
    label: 'File Handling',
    starred: false,
    color: '#64748b',
    questions: [
      {
        q: 'Which is the safest way to read a file and why?\n\n# A\nf = open("data.txt")\ncontent = f.read()\nf.close()\n\n# B\nwith open("data.txt") as f:\n    content = f.read()',
        options: [
          'A — more explicit control',
          'B — with statement auto-closes even if an error occurs',
          'Both are identical',
          'Neither — you need try/except'
        ],
        answer: 1,
        explain: 'The with statement is preferred. It auto-closes the file even if an exception occurs inside the block. Option A risks leaving the file open on error.'
      },
      {
        q: 'What does mode "w" do?\n\nwith open("log.txt", "w") as f:\n    f.write("Line 1\\n")',
        options: [
          'Appends to existing content',
          'Creates or overwrites the file',
          'Raises error if file exists',
          'Opens in binary mode'
        ],
        answer: 1,
        explain: 'Mode "w" creates the file if it does not exist, or OVERWRITES it if it does. Use mode "a" to append without erasing.'
      },
      {
        q: 'How do you read a large file line by line without loading all into memory?',
        options: [
          'content = f.read() then split("\\n")',
          'lines = f.readlines() then loop',
          'for line in f: process(line)',
          'f.readline() in a while True loop'
        ],
        answer: 2,
        explain: 'Iterating directly over the file object reads one line at a time without loading the entire file. Most memory-efficient approach.'
      }
    ]
  },

  // ── 12. Functions ★ ──────────────────────────────────────────────────────
  {
    id: 'functions',
    label: 'Functions',
    starred: true,
    color: '#14b8a6',
    questions: [
      {
        q: 'What is the output?\n\ndef greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Priya"))\nprint(greet("Rohan", "Hi"))',
        options: [
          'Hello, Priya! and Hello, Rohan!',
          'Hello, Priya! and Hi, Rohan!',
          'Error — greeting has no value',
          'Priya and Rohan'
        ],
        answer: 1,
        explain: 'Default arguments are used when not provided. greet("Priya") uses greeting="Hello". greet("Rohan","Hi") overrides the default.'
      },
      {
        q: 'What does **kwargs allow?\n\ndef show(**kwargs):\n    for k, v in kwargs.items():\n        print(f"{k}={v}")\n\nshow(name="Priya", age=25)',
        options: [
          'Only positional arguments',
          'A fixed number of keyword arguments',
          'Any number of keyword arguments as a dict',
          'Error — ** is not valid syntax'
        ],
        answer: 2,
        explain: '**kwargs collects any number of keyword arguments into a dictionary. name="Priya", age=25 become {"name":"Priya","age":25} inside the function.'
      },
      {
        q: 'What is the output?\n\nx = 10\n\ndef change():\n    x = 99\n    print(x)\n\nchange()\nprint(x)',
        options: ['99 and 99', '99 and 10', '10 and 10', 'Error'],
        answer: 1,
        explain: 'Inside change(), x=99 creates a LOCAL variable. It does not affect the global x=10. This is Python scope (LEGB). change() prints 99, then global x is still 10.'
      },
      {
        q: 'What does this lambda and map produce?\n\ndouble = lambda x: x * 2\nresult = list(map(double, [1, 2, 3, 4]))\nprint(result)',
        options: ['[1, 2, 3, 4]', '[2, 4, 6, 8]', 'Error', '[1, 4, 9, 16]'],
        answer: 1,
        explain: 'lambda x: x*2 doubles its input. map() applies it to every element. list() converts → [2,4,6,8].'
      },
      {
        q: 'What is the output? (Closures)\n\ndef outer(x):\n    def inner(y):\n        return x + y\n    return inner\n\nadd5 = outer(5)\nprint(add5(3))',
        options: ['8', '5', '3', 'Error'],
        answer: 0,
        explain: 'outer(5) returns inner with x=5 captured in its closure. add5(3) calls inner(3) → x+y = 5+3 = 8. This is a closure.'
      }
    ]
  },

  // ── 13. Error Handling ──────────────────────────────────────────────────
  {
    id: 'errors',
    label: 'Error Handling',
    starred: false,
    color: '#dc2626',
    questions: [
      {
        q: 'What is the output?\n\ntry:\n    x = int("abc")\nexcept ValueError:\n    print("bad value")\nexcept TypeError:\n    print("bad type")\nfinally:\n    print("done")',
        options: [
          'bad type then done',
          'bad value then done',
          'bad value only',
          'Error — cannot chain except'
        ],
        answer: 1,
        explain: 'int("abc") raises ValueError (not TypeError). The except ValueError block runs → "bad value". finally ALWAYS runs → "done".'
      },
      {
        q: 'What does this print?\n\ndef divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None\n\nprint(divide(10, 0))\nprint(divide(10, 2))',
        options: [
          'Error and 5.0',
          'None and 5.0',
          'None and 5',
          'ZeroDivisionError and 5.0'
        ],
        answer: 1,
        explain: 'divide(10,0) triggers ZeroDivisionError → returns None. divide(10,2) succeeds → returns 10/2 = 5.0 (float division).'
      },
      {
        q: 'What is the correct way to raise a custom exception message?',
        options: [
          'throw ValueError("Invalid input")',
          'raise ValueError("Invalid input")',
          'raise new ValueError("Invalid input")',
          'error ValueError("Invalid input")'
        ],
        answer: 1,
        explain: 'Python uses raise (not throw). raise ValueError("Invalid input") raises the exception with a message. "new" and "throw" are from Java/JavaScript — not Python.'
      }
    ]
  },

  // ── 14. Classes & OOP ★ ──────────────────────────────────────────────────
  {
    id: 'oop',
    label: 'Classes & OOP',
    starred: true,
    color: '#7c3aed',
    questions: [
      {
        q: 'What is the output?\n\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return f"{self.name} speaks"\n\ndog = Animal("Rex")\nprint(dog.speak())',
        options: [
          'Animal speaks',
          'Rex speaks',
          'Error — no speak method',
          'None'
        ],
        answer: 1,
        explain: '__init__ sets self.name = "Rex". speak() returns f"{self.name} speaks" → "Rex speaks". self refers to the instance.'
      },
      {
        q: 'What does this print?\n\nclass Counter:\n    count = 0\n    def __init__(self):\n        Counter.count += 1\n\na = Counter()\nb = Counter()\nc = Counter()\nprint(Counter.count)',
        options: ['1', '0', '3', 'Error'],
        answer: 2,
        explain: 'count is a CLASS variable shared by all instances. Each __init__ call increments it. 3 instances → Counter.count = 3.'
      },
      {
        q: 'What is the output?\n\nclass Parent:\n    def greet(self):\n        return "Hello from Parent"\n\nclass Child(Parent):\n    def greet(self):\n        return super().greet() + " and Child"\n\nprint(Child().greet())',
        options: [
          'Hello from Parent',
          'Hello from Child',
          'Hello from Parent and Child',
          'Error'
        ],
        answer: 2,
        explain: 'super().greet() calls Parent\'s greet() → "Hello from Parent". Child appends " and Child" → "Hello from Parent and Child".'
      },
      {
        q: 'What does @property do?\n\nclass Circle:\n    def __init__(self, r):\n        self.r = r\n    @property\n    def area(self):\n        return 3.14 * self.r ** 2\n\nc = Circle(5)\nprint(c.area)',
        options: [
          'Error — area() needs parentheses',
          'Prints 78.5',
          'Prints the function object',
          'Prints None'
        ],
        answer: 1,
        explain: '@property allows a method to be accessed like an attribute (no parentheses). c.area calls the method and returns 3.14 * 25 = 78.5.'
      },
      {
        q: 'What is the output?\n\nclass MyClass:\n    def __repr__(self):\n        return "MyClass instance"\n    def __len__(self):\n        return 42\n\nobj = MyClass()\nprint(repr(obj))\nprint(len(obj))',
        options: [
          'Error',
          '<MyClass object> and 42',
          'MyClass instance and 42',
          'MyClass instance and Error'
        ],
        answer: 2,
        explain: '__repr__ defines what repr() returns — "MyClass instance". __len__ defines len() → 42. These are dunder (magic) methods in Python.'
      }
    ]
  },

  // ── 15. Comprehensions & Generators ─────────────────────────────────────
  {
    id: 'comprehensions',
    label: 'Comprehensions & Generators',
    starred: false,
    color: '#0891b2',
    questions: [
      {
        q: 'What is the difference between [] and () in this code?\n\nlist_comp = [x**2 for x in range(5)]\ngen_exp  = (x**2 for x in range(5))',
        options: [
          'No difference — both produce [0,1,4,9,16]',
          'list_comp is a list; gen_exp is a lazy generator that yields on demand',
          'gen_exp raises SyntaxError',
          'Both create tuples'
        ],
        answer: 1,
        explain: '[] creates a list immediately. () creates a generator that yields values one at a time (lazy). Generators are memory-efficient for large data — they do not store all values at once.'
      },
      {
        q: 'What does this print?\n\nevens = {x: x**2 for x in range(6) if x % 2 == 0}\nprint(evens)',
        options: [
          '{0:0, 1:1, 2:4, 3:9, 4:16, 5:25}',
          '{0: 0, 2: 4, 4: 16}',
          '{2: 4, 4: 16}',
          'Error'
        ],
        answer: 1,
        explain: 'Dict comprehension filtering even numbers: 0,2,4 pass the if condition. 0²=0, 2²=4, 4²=16 → {0:0, 2:4, 4:16}.'
      },
      {
        q: 'What is the output?\n\ndef gen_count(n):\n    for i in range(n):\n        yield i * 2\n\ng = gen_count(4)\nprint(next(g))\nprint(next(g))',
        options: ['0 and 1', '0 and 2', '2 and 4', 'Error'],
        answer: 1,
        explain: 'yield makes gen_count a generator. next(g) resumes from where it paused. First call → i=0 → yield 0. Second call → i=1 → yield 2.'
      }
    ]
  },

  // ── 16. Decorators ───────────────────────────────────────────────────────
  {
    id: 'decorators',
    label: 'Decorators',
    starred: false,
    color: '#be185d',
    questions: [
      {
        q: 'What does a decorator do?\n\ndef loud(func):\n    def wrapper(*args):\n        print("Calling", func.__name__)\n        return func(*args)\n    return wrapper\n\n@loud\ndef add(a, b):\n    return a + b\n\nresult = add(3, 4)',
        options: [
          'Raises SyntaxError — @loud is invalid',
          'Prints "Calling add" then result is 7',
          'Prints "Calling add" only; returns None',
          'Returns 7 silently'
        ],
        answer: 1,
        explain: '@loud wraps add with wrapper. When add(3,4) is called, wrapper runs first → prints "Calling add", then calls the original add(3,4) → returns 7.'
      },
      {
        q: 'What is the output?\n\ndef repeat(n):\n    def decorator(func):\n        def wrapper(*args):\n            for _ in range(n):\n                func(*args)\n        return wrapper\n    return decorator\n\n@repeat(3)\ndef say(msg):\n    print(msg)\n\nsay("hi")',
        options: [
          'hi',
          'hi hi hi',
          'hi printed 3 times on separate lines',
          'Error'
        ],
        answer: 2,
        explain: '@repeat(3) is a decorator factory. wrapper calls func 3 times. Each call prints "hi" on its own line — 3 separate print outputs.'
      },
      {
        q: 'Why do we use @functools.wraps(func) inside a decorator?',
        options: [
          'To make the decorator faster',
          'To preserve the original function\'s __name__ and __doc__',
          'To allow the decorator to accept arguments',
          'It is required by Python — without it decorators fail'
        ],
        answer: 1,
        explain: 'Without @wraps, the wrapper replaces the original function\'s metadata. @functools.wraps(func) copies __name__, __doc__, etc., preserving the original function\'s identity.'
      }
    ]
  },

  // ── 17. Modules & Imports ───────────────────────────────────────────────
  {
    id: 'modules',
    label: 'Modules & Imports',
    starred: false,
    color: '#059669',
    questions: [
      {
        q: 'What is the difference between these two imports?\n\nimport math\nfrom math import sqrt',
        options: [
          'No difference — both do the same thing',
          'import math requires math.sqrt(); from math import sqrt lets you use sqrt() directly',
          'from math import sqrt imports the entire math module',
          'import math is invalid Python'
        ],
        answer: 1,
        explain: 'import math: you must prefix with math.sqrt(). from math import sqrt: brings sqrt into local namespace for direct use. Both import from the same module.'
      },
      {
        q: 'What does if __name__ == "__main__": do?',
        options: [
          'Defines the main function',
          'Ensures the block only runs when the file is executed directly, not when imported',
          'Makes the file importable',
          'Runs the code only on the first import'
        ],
        answer: 1,
        explain: 'When a script is run directly, __name__ is "__main__". When imported, __name__ is the module name. This guard prevents code from running unintentionally on import.'
      },
      {
        q: 'What does this print?\n\nimport os\npath = "/home/user/docs/report.pdf"\nprint(os.path.basename(path))\nprint(os.path.dirname(path))',
        options: [
          'report.pdf and /home/user/docs',
          '/home/user/docs and report.pdf',
          'report and /home/user/docs',
          'Error'
        ],
        answer: 0,
        explain: 'os.path.basename() returns the filename: "report.pdf". os.path.dirname() returns the directory path: "/home/user/docs".'
      }
    ]
  },

  // ── 18. Coding Challenges ★ ──────────────────────────────────────────────
  {
    id: 'coding',
    label: 'Coding Challenges',
    starred: true,
    color: '#b45309',
    questions: [
      {
        q: 'Which function correctly returns the factorial of n using recursion?\n\n# Option A\ndef factorial(n):\n    return n * factorial(n - 1)\n\n# Option B\ndef factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)\n\n# Option C\ndef factorial(n):\n    return n * factorial(n)\n\n# Option D\ndef factorial(n):\n    if n == 0:\n        return 0\n    return n * factorial(n - 1)',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        answer: 1,
        explain: 'Option B is correct. It has the base case (n==0 returns 1) and the recursive step. A has no base case (infinite recursion). C recurses with same n (infinite). D returns 0 for n==0 making all factorials 0.'
      },
      {
        q: 'What is the output of this code?\n\ndef mystery(lst):\n    seen = set()\n    result = []\n    for x in lst:\n        if x not in seen:\n            seen.add(x)\n            result.append(x)\n    return result\n\nprint(mystery([3, 1, 4, 1, 5, 9, 2, 6, 5]))',
        options: [
          '[3, 1, 4, 1, 5, 9, 2, 6, 5]',
          '[1, 2, 3, 4, 5, 6, 9]',
          '[3, 1, 4, 5, 9, 2, 6]',
          'Error'
        ],
        answer: 2,
        explain: 'mystery() removes duplicates while preserving order. 1 and 5 appear twice — only the first occurrence is kept. Result: [3,1,4,5,9,2,6].'
      },
      {
        q: 'What does this function do?\n\ndef transform(text):\n    return " ".join(word[::-1] for word in text.split())\n\nprint(transform("hello world python"))',
        options: [
          '"nohtyp dlrow olleh"',
          '"olleh dlrow nohtyp"',
          '"hello world python" (unchanged)',
          'Error'
        ],
        answer: 1,
        explain: 'text.split() → ["hello","world","python"]. Each word is reversed with [::-1]: "olleh","dlrow","nohtyp". " ".join() → "olleh dlrow nohtyp".'
      },
      {
        q: 'What is the time complexity of this code?\n\ndef has_duplicate(lst):\n    seen = set()\n    for item in lst:\n        if item in seen:\n            return True\n        seen.add(item)\n    return False',
        options: [
          'O(n²) — nested loop',
          'O(n log n) — sorting involved',
          'O(n) — single pass, set lookup is O(1)',
          'O(1) — constant time'
        ],
        answer: 2,
        explain: 'Single loop over n items. Set membership check (item in seen) is O(1) average. Total: O(n). This is more efficient than sorting (O(n log n)) or nested loops (O(n²)).'
      },
      {
        q: 'What is the output?\n\ndef fibonacci(n, memo={}):\n    if n in memo:\n        return memo[n]\n    if n <= 1:\n        return n\n    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)\n    return memo[n]\n\nprint(fibonacci(7))',
        options: ['11', '13', '21', 'RecursionError'],
        answer: 1,
        explain: 'Memoized recursion: memo stores computed values. fib(7)=13. Sequence: 0,1,1,2,3,5,8,13. Index 7 (0-based) = 13.'
      }
    ]
  }
]
