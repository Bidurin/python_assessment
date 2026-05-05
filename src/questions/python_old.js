// Python Complete Course — Full Question Bank
// Starred topics (*) have 5 questions. Others have 3.

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
        q: 'What is the type of x after this assignment?\n\nx = 42',
        options: ['str', 'float', 'int', 'bool'],
        answer: 2,
        explain: '42 is an integer literal. Python infers the type as int. Use type(x) to confirm — it returns <class \'int\'>.'
      },
      {
        q: 'What does this print?\n\nx = 10\ny = 3.0\nprint(type(x + y))',
        options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", 'TypeError'],
        answer: 1,
        explain: 'When int and float are added, Python upcasts the result to float. 10 + 3.0 = 13.0 which is float.'
      },
      {
        q: 'Which variable name is valid Python?',
        options: ['1name', '_score', 'my-var', 'class'],
        answer: 1,
        explain: '_score is valid. Names cannot start with a digit, use hyphens, or be reserved keywords like class.'
      },
      {
        q: 'What is the output?\n\na, b, c = 1, 2, 3\nprint(a, b, c)',
        options: ['(1, 2, 3)', '1 2 3', '[1, 2, 3]', 'Error'],
        answer: 1,
        explain: 'Multiple assignment unpacks the values into a=1, b=2, c=3. print(a,b,c) prints them space-separated: 1 2 3.'
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
        q: 'What is the output?\n\ns = "Python"\nprint(s[1:4])',
        options: ['Pyt', 'yth', 'ytho', 'ython'],
        answer: 1,
        explain: 's[1:4] gives characters at index 1,2,3 → y,t,h → "yth". Index 4 is excluded.'
      },
      {
        q: 'What does this print?\n\nname = "priya"\nprint(name.upper().replace("I", "1"))',
        options: ['PRIYA', 'PR1YA', 'priya', 'Error'],
        answer: 1,
        explain: '.upper() converts to "PRIYA", then .replace("I","1") replaces uppercase I → "PR1YA". Methods chain left to right.'
      },
      {
        q: 'Which correctly creates: Hello, Rohan! You scored 95\n\nname = "Rohan"\nscore = 95',
        options: [
          '"Hello, " + name + "! You scored " + score',
          'f"Hello, {name}! You scored {score}"',
          '"Hello, %s! You scored %d".format(name, score)',
          '"Hello, " + name + "! You scored " + str(score)'
        ],
        answer: 1,
        explain: 'f-strings are the modern readable way. Option A fails because score is int and cannot be concatenated with str directly.'
      },
      {
        q: 'What is the output?\n\ns = "  hello world  "\nprint(s.strip().title())',
        options: ['  hello world  ', 'Hello World', 'hello world', 'HELLO WORLD'],
        answer: 1,
        explain: '.strip() removes whitespace → "hello world". .title() capitalises each word → "Hello World".'
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
        q: 'What does this print?\n\nx = 5\nx **= 3\nprint(x)',
        options: ['15', '53', '125', 'Error'],
        answer: 2,
        explain: '**= is the exponentiation assignment. x **= 3 means x = x**3 = 5³ = 125.'
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
        q: 'What is the output?\n\nx = 10\nprint(x > 5 and x < 20)\nprint(x > 5 or x > 100)',
        options: ['True and True', 'True\nTrue', 'False\nTrue', 'True\nFalse'],
        answer: 1,
        explain: 'x>5 and x<20 → True. x>5 or x>100 → True (short-circuits on first True).'
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
        q: 'What is the output?\n\nprint(not True or False and not False)',
        options: ['True', 'False', 'Error', 'None'],
        answer: 1,
        explain: 'Precedence: not > and > or. Evaluates as: False or (False and True) → False or False → False.'
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
        q: 'What is the output?\n\nitems = []\nif items:\n    print("has items")\nelse:\n    print("empty")',
        options: ['has items', 'empty', '[]', 'Error'],
        answer: 1,
        explain: 'An empty list [] is falsy. "if items" → False → else branch runs → prints "empty".'
      },
      {
        q: 'What will print?\n\nage = 20\nhas_id = True\nif age >= 18 and has_id:\n    print("Entry allowed")\nelse:\n    print("Denied")',
        options: ['Entry allowed', 'Denied', 'True', 'Error'],
        answer: 0,
        explain: 'age>=18 → True, has_id → True. True and True → True → "Entry allowed".'
      },
      {
        q: 'What is wrong with this code?\n\ntemperature = 35\nif temperature > 40\n    print("Very hot")\nelif temperature > 30:\n    print("Hot")',
        options: [
          'Nothing — it works fine',
          'Missing colon after if condition',
          'elif is not valid Python',
          'print needs parentheses'
        ],
        answer: 1,
        explain: 'The if line is missing a colon (:) at the end. Every if/elif/else line must end with a colon — raises SyntaxError.'
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
        q: 'What will this print?\n\nfor i in range(1, 6):\n    if i % 2 == 0:\n        continue\n    print(i, end=" ")',
        options: ['1 3 5', '2 4', '1 2 3 4 5', '1 3 5 6'],
        answer: 0,
        explain: 'continue skips the rest of the loop body for even numbers. Only odd values 1,3,5 reach print().'
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
        q: 'What does this list comprehension produce?\n\nsales = [4200, 8800, 3100, 9500, 6700]\nresult = [s for s in sales if s > 5000]\nprint(result)',
        options: [
          '[4200, 8800, 3100, 9500, 6700]',
          '[8800, 9500, 6700]',
          '[4200, 3100]',
          '[True, True, False, True, True]'
        ],
        answer: 1,
        explain: 'Only values where s > 5000 are kept. 8800, 9500, 6700 all exceed 5000.'
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
        q: 'What does this print?\n\npoint = (10, 20, 30)\nx, y, z = point\nprint(y)',
        options: ['(10, 20, 30)', '10', '20', 'Error'],
        answer: 2,
        explain: 'Tuple unpacking assigns each element in order: x=10, y=20, z=30. print(y) prints 20.'
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
        q: 'What does this print?\n\ndata = {"region": "NORTH", "sales": 85000}\ndata["sales"] = 92000\ndata["manager"] = "Arjun"\ndel data["region"]\nprint(len(data))',
        options: ['1', '2', '3', '4'],
        answer: 1,
        explain: 'Start: 2 keys. Update sales (no new key). Add manager → 3 keys. del region → 2 keys. len = 2.'
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
        q: 'What is the output?\n\nd = {"a": 1, "b": 2, "c": 3}\nsquared = {k: v**2 for k, v in d.items()}\nprint(squared)',
        options: [
          "{'a':1,'b':2,'c':3}",
          "{'a':2,'b':4,'c':6}",
          "{'a':1,'b':4,'c':9}",
          'Error'
        ],
        answer: 2,
        explain: 'Dict comprehension: creates new dict with value squared. 1²=1, 2²=4, 3²=9.'
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
        q: 'What does this print?\n\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(a & b)\nprint(a | b)',
        options: [
          '{3,4} and {1,2,3,4,5,6}',
          '{1,2} and {5,6}',
          '{3,4} and {3,4}',
          'Error'
        ],
        answer: 0,
        explain: '& is intersection (common elements): {3,4}. | is union (all elements): {1,2,3,4,5,6}.'
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
        q: 'What does *args do?\n\ndef total(*args):\n    return sum(args)\n\nprint(total(1, 2, 3))\nprint(total(10, 20))',
        options: [
          'Error — functions need fixed parameters',
          'Prints 6 and 30',
          'Prints (1,2,3) and (10,20)',
          'Prints [1,2,3] and [10,20]'
        ],
        answer: 1,
        explain: '*args collects all positional arguments into a tuple. sum((1,2,3)) = 6. sum((10,20)) = 30.'
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
  }
]
