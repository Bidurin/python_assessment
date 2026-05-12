// Python Complete Course — Full Question Bank
// 75 questions | 14 sections | Intermediate–Hard
// Code snippet → predict output style throughout
// Balanced answer distribution across A/B/C/D
// Classes & OOP removed — questions redistributed to Strings, Loops, Dictionaries

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
        options: ['True', 'Error', 'None', 'False'],
        answer: 3,
        explain: 'Floating-point arithmetic is not exact. 0.1+0.2 = 0.30000000000000004. So x==0.3 is False. Use math.isclose() for float comparisons.'
      },
      {
        q: 'What is the output?\n\na = b = c = []\nb.append(1)\nprint(a, c)',
        options: ['[] []', '[1] [1]', '[1] []', 'Error'],
        answer: 1,
        explain: 'a = b = c = [] makes all three names point to the SAME list. Appending to b also changes a and c. All three print [1].'
      },
      {
        q: 'What is the output?\n\nx = 5\ny = x\nx += 10\nprint(y)',
        options: ['5', '15', '10', 'Error'],
        answer: 0,
        explain: 'Integers are immutable. y=x copies the value 5. x+=10 rebinds x to 15. y is still 5.'
      },
      {
        q: 'What does this print?\n\nprint(type(10 / 2))\nprint(type(10 // 2))',
        options: [
          "<class 'int'> and <class 'int'>",
          "<class 'int'> and <class 'float'>",
          "<class 'float'> and <class 'float'>",
          "<class 'float'> and <class 'int'>"
        ],
        answer: 3,
        explain: '10/2 always returns float (5.0) in Python 3. 10//2 returns int (5). / always gives float; // gives int when both operands are int.'
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
        explain: 's[::-1] reverses the string using step -1. "Python" reversed is "nohtyP".'
      },
      {
        q: 'What does this print?\n\ntext = "  hello world  "\nprint(text.strip().title())',
        options: ['  hello world  ', 'hello world', 'Hello World', 'Error'],
        answer: 2,
        explain: '.strip() removes whitespace → "hello world". .title() capitalises each word → "Hello World".'
      },
      {
        q: 'What is the output?\n\ns = "abcdef"\nprint(s[1:5:2])',
        options: ['bd', 'ace', 'abcd', 'bdf'],
        answer: 0,
        explain: 's[1:5:2] starts at index 1, stops before 5, steps 2. Indices 1→b, 3→d. Result: "bd".'
      },
      {
        q: 'What does this output?\n\ndata = "2024-05-15"\nparts = data.split("-")\nprint(parts[-1])',
        options: ['2024', '05', 'Error', '15'],
        answer: 3,
        explain: '.split("-") gives ["2024","05","15"]. parts[-1] is the last element → "15".'
      },
      {
        q: 'What is the output?\n\ns = "hello"\nprint(s.center(11, "*"))',
        options: ['***hello***', '**hello***', '***hello**', 'hello*****'],
        answer: 0,
        explain: '.center(11,"*") pads the string to width 11 with * on both sides. "hello" is 5 chars, so 3 stars each side → "***hello***".'
      },
      {
        q: 'What does this print?\n\nwords = "the quick brown fox"\nresult = " ".join(w.capitalize() for w in words.split())\nprint(result)',
        options: [
          'the quick brown fox',
          'The Quick Brown Fox',
          'THE QUICK BROWN FOX',
          'Error'
        ],
        answer: 1,
        explain: 'split() → ["the","quick","brown","fox"]. capitalize() makes first letter upper, rest lower. join → "The Quick Brown Fox".'
      },
      {
        q: 'What is the output?\n\ntext = "banana"\nprint(text.count("an"))\nprint(text.find("na"))',
        options: [
          '2 and 1',
          '2 and 2',
          '1 and 2',
          'Error'
        ],
        answer: 1,
        explain: '.count("an") finds non-overlapping occurrences: b-AN-ANa → 2. .find("na") returns first index: ba-NA → index 2.'
      },
      {
        q: 'What is the output?\n\ns = "Hello, World!"\nprint(s.startswith("Hello"))\nprint(s.endswith("world!"))',
        options: [
          'True and True',
          'True and False',
          'False and True',
          'False and False'
        ],
        answer: 1,
        explain: '.startswith("Hello") → True. .endswith("world!") → False because "W" is uppercase in "World!" but the check uses lowercase "w". String methods are case-sensitive.'
      },
      {
        q: 'What does this print?\n\ntext = "  python  "\nparts = [text.strip(), text.lstrip(), text.rstrip()]\nprint(len(parts[0]), len(parts[1]), len(parts[2]))',
        options: ['6 8 8', '6 8 10', '8 8 6', '6 6 6'],
        answer: 0,
        explain: 'strip() removes both sides → "python" len=6. lstrip() removes left only → "python  " len=8. rstrip() removes right only → "  python" len=8.'
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
        q: 'What is the output?\n\nprint(-7 // 2)\nprint(-7 % 2)',
        options: ['-3 and -1', '-4 and 1', '-3 and 1', '-4 and -1'],
        answer: 1,
        explain: 'Floor division rounds toward negative infinity. -7//2=-4. Modulo: -7=(-4)*2+r → r=1. So -7%2=1.'
      },
      {
        q: 'What is the output?\n\nx = 2\nprint(x ** 3 ** 2)',
        options: ['8', '64', '729', '512'],
        answer: 3,
        explain: 'Exponentiation is right-associative. 3**2=9 first, then 2**9=512. NOT (2**3)**2=64.'
      },
      {
        q: 'What does this print?\n\nimport math\nprint(math.ceil(-2.3))\nprint(math.floor(-2.3))',
        options: ['-2 and -3', '-3 and -2', '-2 and -2', '-3 and -3'],
        answer: 0,
        explain: 'ceil(-2.3) rounds toward zero → -2. floor(-2.3) rounds away from zero → -3.'
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
        explain: 'bool is a subclass of int. True==1, False==0. True+True=2. True*5=5.'
      },
      {
        q: 'What is the output?\n\nprint(bool(0), bool(""), bool([]), bool(0.0))',
        options: [
          'True True True True',
          'False False False False',
          'False False False True',
          'False True False True'
        ],
        answer: 1,
        explain: '0, empty string, empty list, and 0.0 are all falsy. bool() of each returns False.'
      },
      {
        q: 'What does this print?\n\nx = []\nif not x:\n    print("empty")\nelse:\n    print("has items")',
        options: ['empty', 'has items', 'False', 'Error'],
        answer: 0,
        explain: 'An empty list is falsy. "not x" → True. So "empty" is printed.'
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
        explain: '72 is not >=90, not >=75, but IS >=60 → grade="C". Once a condition is True, remaining elif/else are skipped.'
      },
      {
        q: 'What does this print?\n\nx = 15\nresult = "odd" if x % 2 != 0 else "even"\nprint(result)',
        options: ['odd', 'even', '15', 'Error'],
        answer: 0,
        explain: '15%2=1 which != 0 → True → result="odd".'
      },
      {
        q: 'What is the output?\n\nval = None\nif val:\n    print("truthy")\nelif val is None:\n    print("it is None")\nelse:\n    print("falsy")',
        options: ['truthy', 'it is None', 'falsy', 'Error'],
        answer: 1,
        explain: 'None is falsy so first if skipped. elif val is None → True → prints "it is None".'
      },
      {
        q: 'What does this nested conditional print?\n\nx = 7\nif x > 5:\n    if x > 10:\n        print("big")\n    else:\n        print("medium")\nelse:\n    print("small")',
        options: ['big', 'small', 'medium', 'Error'],
        answer: 2,
        explain: 'x=7>5 enters outer if. x=7 NOT >10 → inner else → prints "medium".'
      },
      {
        q: 'What is the output?\n\ndef check(n):\n    return "positive" if n > 0 else ("zero" if n == 0 else "negative")\n\nprint(check(-5))',
        options: ['positive', 'zero', 'Error', 'negative'],
        answer: 3,
        explain: 'n=-5 → not >0 → evaluate second ternary: n!=0 → "negative".'
      },
      {
        q: 'What is the output?\n\nx = 10\ny = 20\nz = 30\nif x < y and y < z:\n    print("ascending")\nelif x > y or y > z:\n    print("not ascending")\nelse:\n    print("equal")',
        options: ['not ascending', 'equal', 'ascending', 'Error'],
        answer: 2,
        explain: 'x<y is True (10<20) AND y<z is True (20<30). Both True → "ascending" is printed.'
      },
      {
        q: 'What does this print?\n\nnum = 42\nif num % 2 == 0:\n    if num % 3 == 0:\n        print("div by 6")\n    else:\n        print("div by 2 only")\nelse:\n    print("odd")',
        options: ['div by 2 only', 'odd', 'Error', 'div by 6'],
        answer: 3,
        explain: '42%2=0 → enters even branch. 42%3=0 → enters inner if → prints "div by 6". 42 is divisible by both 2 and 3, so by 6.'
      },
      {
        q: 'What is the output?\n\nage = 17\ncountry = "UK"\nif age >= 18 or country == "UK":\n    print("allowed")\nelse:\n    print("denied")',
        options: ['denied', 'True', 'allowed', 'Error'],
        answer: 2,
        explain: 'age>=18 is False but country=="UK" is True. False OR True → True → prints "allowed".'
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
        explain: 'range(2,10,3): starts at 2, steps by 3, stops before 10. Values: 2, 5, 8.'
      },
      {
        q: 'What does this print?\n\ntotal = 0\nfor n in [10, 20, 30, 40]:\n    if n == 30:\n        break\n    total += n\nprint(total)',
        options: ['100', '30', '60', '70'],
        answer: 1,
        explain: '10 added (10), 20 added (30), n==30 → break. total=30.'
      },
      {
        q: 'What is the output?\n\ncount = 0\nwhile count < 5:\n    count += 2\nprint(count)',
        options: ['4', '5', '6', 'Infinite loop'],
        answer: 2,
        explain: 'count: 0→2→4→6. When count=6, 6<5 is False → exits. Prints 6.'
      },
      {
        q: 'What does this print?\n\nresult = []\nfor i in range(4):\n    if i % 2 == 0:\n        continue\n    result.append(i)\nprint(result)',
        options: ['[0, 2]', '[0, 1, 2, 3]', 'Error', '[1, 3]'],
        answer: 3,
        explain: 'continue skips even numbers. Only odd values 1 and 3 are appended → [1, 3].'
      },
      {
        q: 'What is the output?\n\npairs = [(1,"a"),(2,"b"),(3,"c")]\nfor num, letter in pairs:\n    print(num, letter, end=" ")',
        options: [
          '(1,a) (2,b) (3,c)',
          '1 a 2 b 3 c',
          '[1,2,3] [a,b,c]',
          'Error'
        ],
        answer: 1,
        explain: 'Tuple unpacking in a for loop: each (num, letter) pair is unpacked. Prints each pair separated by space on same line.'
      },
      {
        q: 'What does this print?\n\nresult = []\nfor i in range(1, 6):\n    if i == 3:\n        continue\n    if i == 5:\n        break\n    result.append(i)\nprint(result)',
        options: ['[1, 2, 4]', '[1, 2, 3, 4]', '[1, 2]', 'Error'],
        answer: 0,
        explain: 'i=1→append, i=2→append, i=3→continue(skip), i=4→append, i=5→break. result=[1,2,4].'
      },
      {
        q: 'What is the output?\n\nfor i in range(3):\n    for j in range(3):\n        if i == j:\n            print(i, end=" ")',
        options: ['0 0 1 1 2 2', '0 1 2 0 1 2', 'Error', '0 1 2'],
        answer: 3,
        explain: 'Only prints when i==j: (0,0)→0, (1,1)→1, (2,2)→2. Output: "0 1 2".'
      },
      {
        q: 'What does this print?\n\ntotal = 0\nfor i in range(1, 11):\n    total += i\nprint(total)',
        options: ['50', '110', '55', '45'],
        answer: 2,
        explain: 'Sum of 1 to 10: 1+2+...+10 = 55. range(1,11) goes from 1 to 10 inclusive.'
      },
      {
        q: 'What is the output?\n\ndata = [3, 1, 4, 1, 5, 9]\nmax_val = data[0]\nfor x in data:\n    if x > max_val:\n        max_val = x\nprint(max_val)',
        options: ['3', '1', '5', '9'],
        answer: 3,
        explain: 'Manual max loop: starts at 3, updates when x>max_val. 4>3→4, 5>4→5, 9>5→9. Final max_val=9.'
      },
      {
        q: 'What does this print?\n\nresult = {}\nfor char in "mississippi":\n    result[char] = result.get(char, 0) + 1\nprint(result["s"])',
        options: ['2', '3', '4', '5'],
        answer: 2,
        explain: 'Counts character frequencies. "s" appears 4 times in "mississippi": m-i-SS-i-SS-i-pp-i → 4.'
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
        explain: '.sort() sorts IN PLACE and returns None. Use sorted(nums) to get a new list.'
      },
      {
        q: 'What is the output?\n\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)',
        options: ['[1, 2, 3]', '[4]', '[1, 2, 3, 4]', 'Error'],
        answer: 2,
        explain: 'b=a does NOT copy — both point to the same list. Appending to b also modifies a. Use a.copy() for independence.'
      },
      {
        q: 'What is the output?\n\nmatrix = [[1,2],[3,4],[5,6]]\nflat = [x for row in matrix for x in row]\nprint(flat)',
        options: [
          '[[1,2],[3,4],[5,6]]',
          '[1, 3, 5]',
          'Error',
          '[1, 2, 3, 4, 5, 6]'
        ],
        answer: 3,
        explain: 'Nested list comprehension: outer loop over rows, inner over items. Flattens all values → [1,2,3,4,5,6].'
      },
      {
        q: 'What is the output?\n\ndef mystery(lst):\n    seen = set()\n    result = []\n    for x in lst:\n        if x not in seen:\n            seen.add(x)\n            result.append(x)\n    return result\n\nprint(mystery([3, 1, 4, 1, 5, 9, 2, 6, 5]))',
        options: [
          '[3, 1, 4, 1, 5, 9, 2, 6, 5]',
          '[1, 2, 3, 4, 5, 6, 9]',
          '[3, 1, 4, 5, 9, 2, 6]',
          'Error'
        ],
        answer: 2,
        explain: 'mystery() removes duplicates preserving order. 1 and 5 appear twice — first occurrence kept. Result: [3,1,4,5,9,2,6].'
      },
      {
        q: 'What is the output?\n\nnums = [1, 2, 3, 4, 5]\nprint(list(filter(lambda x: x % 2 == 0, nums)))',
        options: ['[1, 3, 5]', '[2, 4]', '[1, 2, 3, 4, 5]', 'Error'],
        answer: 1,
        explain: 'filter() keeps elements where the lambda returns True. x%2==0 is True for even numbers → [2, 4].'
      }
    ]
  },

  // ── 8. Tuples & Sets ─────────────────────────────────────────────────────
  {
    id: 'tuples_sets',
    label: 'Tuples & Sets',
    starred: false,
    color: '#a855f7',
    questions: [
      {
        q: 'What does this print?\n\nt = ([1, 2], [3, 4])\nt[0].append(99)\nprint(t)',
        options: [
          'TypeError — tuple is immutable',
          '([1, 2], [3, 4])',
          '([1, 2, 99], [3, 4])',
          'Error'
        ],
        answer: 2,
        explain: 'The tuple is immutable but the list inside is mutable. Appending to t[0] modifies the list in place.'
      },
      {
        q: 'What is the output?\n\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(a & b)\nprint(a - b)',
        options: [
          '{1, 2} and {3, 4}',
          '{3, 4} and {1, 2}',
          '{3, 4} and {1, 2, 3, 4, 5, 6}',
          'Error'
        ],
        answer: 1,
        explain: 'a & b is intersection: {3,4}. a - b is difference (in a but not b): {1,2}.'
      },
      {
        q: 'What is the output?\n\ns = {1, 2, 2, 3, 3, 3}\ns.add(2)\nprint(len(s))',
        options: ['7', '4', '6', '3'],
        answer: 3,
        explain: 'Sets remove duplicates. {1,2,2,3,3,3} stores {1,2,3}. Adding 2 again changes nothing. len=3.'
      },
      {
        q: 'What does this print?\n\nx, *y, z = [1, 2, 3, 4, 5]\nprint(x, y, z)',
        options: [
          '1 [2, 3, 4] 5',
          '1 [2, 3, 4, 5] None',
          '[1, 2, 3, 4, 5] [] None',
          'Error'
        ],
        answer: 0,
        explain: 'Extended unpacking: x=1 (first), z=5 (last), *y captures the rest → [2,3,4].'
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
        q: 'What does this print?\n\nemp = {"name": "Priya"}\nprint(emp.get("salary", 0))\nprint(emp["city"])',
        options: [
          '0 and None',
          'None then KeyError',
          '0 then KeyError',
          'KeyError on first line'
        ],
        answer: 2,
        explain: '.get("salary",0) returns 0 safely. emp["city"] raises KeyError because "city" is missing.'
      },
      {
        q: 'What does this print?\n\nd = {"x": 1, "y": 2, "z": 3}\nd2 = {k: v*2 for k, v in d.items() if v > 1}\nprint(d2)',
        options: [
          "{'x': 2, 'y': 4, 'z': 6}",
          "{'x': 1}",
          'Error',
          "{'y': 4, 'z': 6}"
        ],
        answer: 3,
        explain: 'Filter v>1: y,z pass. Values doubled. Result: {"y":4,"z":6}.'
      },
      {
        q: 'What is the output?\n\nfrom collections import defaultdict\nd = defaultdict(list)\nd["a"].append(1)\nd["a"].append(2)\nd["b"].append(3)\nprint(dict(d))',
        options: [
          "{'a': 1, 'b': 3}",
          "{'a': [1, 2], 'b': [3]}",
          "{'a': [1], 'b': [3]}",
          'KeyError'
        ],
        answer: 1,
        explain: 'defaultdict(list) auto-creates empty list for missing keys. Result: {"a":[1,2],"b":[3]}.'
      },
      {
        q: 'What does this print?\n\nd = {"a": 1, "b": 2}\nd.update({"b": 99, "c": 3})\nprint(d)',
        options: [
          "{'a': 1, 'b': 99, 'c': 3}",
          "{'a': 1, 'b': 2, 'c': 3}",
          "{'b': 99, 'c': 3}",
          'Error'
        ],
        answer: 0,
        explain: '.update() merges in the new dict. Existing "b" overwritten with 99. New "c" added. "a" unchanged.'
      },
      {
        q: 'What is the output?\n\nd = {"a": 3, "b": 1, "c": 2}\nprint(min(d, key=lambda k: d[k]))',
        options: ['a', 'b', 'c', 'Error'],
        answer: 1,
        explain: 'min() over dict iterates keys. key=lambda k: d[k] compares by value. Smallest value is d["b"]=1 → key "b".'
      },
      {
        q: 'What does this print?\n\nd = {}\nfor i in range(5):\n    d[i] = i ** 2\nprint(d[3])',
        options: ['3', '6', '9', 'KeyError'],
        answer: 2,
        explain: 'Loop builds {0:0, 1:1, 2:4, 3:9, 4:16}. d[3] = 3**2 = 9.'
      },
      {
        q: 'What is the output?\n\nscores = {"Alice": 85, "Bob": 92, "Carol": 78}\ntop = max(scores, key=scores.get)\nprint(top)',
        options: ['85', 'Bob', 'Alice', '92'],
        answer: 1,
        explain: 'max() over dict gives the key with highest value. scores.get as key function → Bob has 92 (highest). Returns the key "Bob".'
      },
      {
        q: 'What does this print?\n\nd = {"x": 10, "y": 20, "z": 30}\nkeys = [k for k, v in d.items() if v > 15]\nprint(keys)',
        options: ['[10, 20, 30]', "['x']", "['y', 'z']", 'Error'],
        answer: 2,
        explain: 'List comprehension over items: v>15 filters y(20) and z(30). Keys of those: ["y","z"].'
      },
      {
        q: 'What is the output?\n\nd1 = {"a": 1, "b": 2}\nd2 = {"b": 3, "c": 4}\nmerged = {**d1, **d2}\nprint(merged)',
        options: [
          "{'a': 1, 'b': 2, 'c': 4}",
          "{'a': 1, 'b': 3, 'c': 4}",
          "{'a': 1, 'b': 2, 'b': 3, 'c': 4}",
          'Error'
        ],
        answer: 1,
        explain: '{**d1, **d2} unpacks both dicts. When keys clash, the last one wins — d2["b"]=3 overwrites d1["b"]=2. Result: {"a":1,"b":3,"c":4}.'
      }
    ]
  },

  // ── 10. File Handling ────────────────────────────────────────────────────
  {
    id: 'fileio',
    label: 'File Handling',
    starred: false,
    color: '#64748b',
    questions: [
      {
        q: 'Which is the safest way to read a file?\n\n# A\nf = open("data.txt")\ncontent = f.read()\nf.close()\n\n# B\nwith open("data.txt") as f:\n    content = f.read()',
        options: [
          'A — more explicit control',
          'B — with auto-closes even if an error occurs',
          'Both are identical',
          'Neither — you need try/except'
        ],
        answer: 1,
        explain: 'The with statement auto-closes the file even if an exception occurs. Option A risks leaving the file open on error.'
      },
      {
        q: 'What is the output?\n\nwith open("test.txt", "w") as f:\n    f.write("hello")\n    f.write("world")\n\nwith open("test.txt") as f:\n    print(f.read())',
        options: ['hello\\nworld', 'hello world', 'Error', 'helloworld'],
        answer: 3,
        explain: '.write() does not add newlines automatically. Two writes → "helloworld" as one continuous string.'
      },
      {
        q: 'What happens when you open a file with mode "a"?\n\nwith open("log.txt", "a") as f:\n    f.write("new line\\n")',
        options: [
          'Appends to existing content without erasing',
          'Overwrites all existing content',
          'Raises error if file exists',
          'Creates a new file always'
        ],
        answer: 0,
        explain: 'Mode "a" adds to the end of existing content. Mode "w" would overwrite. "a" creates the file if it does not exist.'
      }
    ]
  },

  // ── 11. Functions ★ ──────────────────────────────────────────────────────
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
        explain: 'Default argument used when not provided. greet("Priya") uses greeting="Hello". greet("Rohan","Hi") overrides it.'
      },
      {
        q: 'What is the output?\n\nx = 10\n\ndef change():\n    x = 99\n    print(x)\n\nchange()\nprint(x)',
        options: ['99 and 99', '10 and 10', 'Error', '99 and 10'],
        answer: 3,
        explain: 'Inside change(), x=99 creates a LOCAL variable. It does not affect global x=10. LEGB scope rule.'
      },
      {
        q: 'What is the output? (Closures)\n\ndef outer(x):\n    def inner(y):\n        return x + y\n    return inner\n\nadd5 = outer(5)\nprint(add5(3))',
        options: ['8', '5', '3', 'Error'],
        answer: 0,
        explain: 'outer(5) returns inner with x=5 captured in closure. add5(3) → x+y = 5+3 = 8.'
      },
      {
        q: 'What is the output?\n\ndef f(a, b=[], c=None):\n    b.append(a)\n    return b\n\nprint(f(1))\nprint(f(2))\nprint(f(3, [], None))',
        options: [
          '[1] then [2] then [3]',
          '[1] then [2] then [1,2,3]',
          '[1] then [1, 2] then [3]',
          'Error'
        ],
        answer: 2,
        explain: 'Mutable default b=[] is created ONCE and reused. f(1)→[1], f(2) reuses same list→[1,2]. f(3,[]) uses a new list→[3].'
      }
    ]
  },

  // ── 12. Error Handling ──────────────────────────────────────────────────
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
        explain: 'int("abc") raises ValueError. except ValueError runs → "bad value". finally ALWAYS runs → "done".'
      },
      {
        q: 'What does this print?\n\ndef divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return -1\n    finally:\n        print("called")\n\nprint(divide(10, 0))',
        options: [
          'called then -1',
          '-1 then called',
          'called then ZeroDivisionError',
          'Error'
        ],
        answer: 0,
        explain: 'finally runs BEFORE the return is handed back. So "called" prints first, then -1 is returned and printed.'
      },
      {
        q: 'What is the output?\n\ntry:\n    lst = [1, 2, 3]\n    print(lst[5])\nexcept IndexError as e:\n    print(f"Caught: {type(e).__name__}")',
        options: [
          'Caught: Error',
          'Caught: IndexError',
          'None',
          'Caught: ListError'
        ],
        answer: 1,
        explain: 'lst[5] raises IndexError. type(e).__name__ gives the class name as a string → "IndexError".'
      }
    ]
  },

  // ── 13. Recursion & Algorithms ★ ─────────────────────────────────────────
  {
    id: 'recursion',
    label: 'Recursion & Algorithms',
    starred: true,
    color: '#b45309',
    questions: [
      {
        q: 'What is the output?\n\ndef factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))',
        options: ['60', '120', '24', 'RecursionError'],
        answer: 1,
        explain: 'factorial(5)=5*4*3*2*1=120. Base case n==0 returns 1.'
      },
      {
        q: 'What is the output?\n\ndef fib(n, memo={}):\n    if n in memo:\n        return memo[n]\n    if n <= 1:\n        return n\n    memo[n] = fib(n-1, memo) + fib(n-2, memo)\n    return memo[n]\n\nprint(fib(7))',
        options: ['13', '11', '21', 'RecursionError'],
        answer: 0,
        explain: 'Memoized Fibonacci. Sequence: 0,1,1,2,3,5,8,13. Index 7 (0-based) = 13.'
      },
      {
        q: 'What is the time complexity of this?\n\ndef has_duplicate(lst):\n    seen = set()\n    for item in lst:\n        if item in seen:\n            return True\n        seen.add(item)\n    return False',
        options: [
          'O(n²) — nested loop',
          'O(n log n) — sorting involved',
          'O(n) — single pass, set lookup is O(1)',
          'O(1) — constant time'
        ],
        answer: 2,
        explain: 'Single loop over n items. Set membership is O(1) average. Total: O(n).'
      },
      {
        q: 'What does this function return?\n\ndef transform(text):\n    return " ".join(word[::-1] for word in text.split())\n\nprint(transform("hello world python"))',
        options: [
          '"nohtyp dlrow olleh"',
          '"hello world python"',
          'Error',
          '"olleh dlrow nohtyp"'
        ],
        answer: 3,
        explain: 'split() → ["hello","world","python"]. Each reversed: "olleh","dlrow","nohtyp". join → "olleh dlrow nohtyp".'
      }
    ]
  },

  // ── 15. Advanced Python ──────────────────────────────────────────────────
  // Merged: Comprehensions & Generators + Decorators + Modules & Imports
  {
    id: 'advanced',
    label: 'Advanced Python',
    starred: false,
    color: '#0891b2',
    questions: [
      {
        q: 'What is the output?\n\ndef gen_count(n):\n    for i in range(n):\n        yield i * 2\n\ng = gen_count(4)\nprint(next(g))\nprint(next(g))',
        options: ['0 and 1', '0 and 2', '2 and 4', 'Error'],
        answer: 1,
        explain: 'yield pauses the function. First next(g) → i=0 → yield 0. Second → i=1 → yield 2.'
      },
      {
        q: 'What does this print?\n\ndef loud(func):\n    def wrapper(*args):\n        print("Calling", func.__name__)\n        return func(*args)\n    return wrapper\n\n@loud\ndef add(a, b):\n    return a + b\n\nresult = add(3, 4)',
        options: [
          'Prints "Calling add"; result is 7',
          'Raises SyntaxError',
          'Prints "Calling add" only; returns None',
          'Returns 7 silently'
        ],
        answer: 0,
        explain: '@loud wraps add with wrapper. add(3,4) → wrapper runs → prints "Calling add" → calls original add → returns 7.'
      },
      {
        q: 'What does this print?\n\nevens = {x: x**2 for x in range(6) if x % 2 == 0}\nprint(evens)',
        options: [
          '{0:0, 1:1, 2:4, 3:9, 4:16, 5:25}',
          '{2: 4, 4: 16}',
          'Error',
          '{0: 0, 2: 4, 4: 16}'
        ],
        answer: 3,
        explain: 'Dict comprehension: even numbers 0,2,4 pass. 0²=0, 2²=4, 4²=16 → {0:0, 2:4, 4:16}.'
      },
      {
        q: 'What is the output?\n\nimport os\npath = "/home/user/docs/report.pdf"\nprint(os.path.basename(path))\nprint(os.path.dirname(path))',
        options: [
          'report.pdf and /home/user/docs',
          '/home/user/docs and report.pdf',
          'report and /home/user/docs',
          'Error'
        ],
        answer: 0,
        explain: 'os.path.basename() returns the filename: "report.pdf". os.path.dirname() returns the directory: "/home/user/docs".'
      },
      {
        q: 'What does this print?\n\ndef repeat(n):\n    def decorator(func):\n        def wrapper(*args):\n            for _ in range(n):\n                func(*args)\n        return wrapper\n    return decorator\n\n@repeat(3)\ndef say(msg):\n    print(msg)\n\nsay("hi")',
        options: [
          'hi',
          'hi hi hi on one line',
          'hi printed 3 times on separate lines',
          'Error'
        ],
        answer: 2,
        explain: '@repeat(3) is a decorator factory. wrapper calls func 3 times. Each print(msg) outputs on its own line.'
      }
    ]
  }
]
