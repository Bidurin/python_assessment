export const SECTIONS = [
  {
    id: 'variables',
    label: 'Variables & Data Types',
    color: '#3b82f6',
    questions: [
      {
        q: 'What is the type of x after: x = 42',
        options: ['str', 'float', 'int', 'bool'],
        answer: 2,
        explain: '42 is an integer literal. Python infers the type as int.'
      },
      {
        q: 'What does this print?\n\nx = 10\ny = 3.0\nprint(type(x + y))',
        options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", 'TypeError'],
        answer: 1,
        explain: 'When int and float are added, Python upcasts to float.'
      },
      {
        q: 'Which variable name is valid?',
        options: ['1name', '_score', 'my-var', 'class'],
        answer: 1,
        explain: '_score is valid. Names cannot start with a digit, use hyphens, or be reserved keywords.'
      }
    ]
  },
  {
    id: 'strings',
    label: 'Strings',
    color: '#8b5cf6',
    questions: [
      {
        q: 'What does this print?\n\ns = "Python"\nprint(s[1:4])',
        options: ['Pyt', 'yth', 'ytho', 'ython'],
        answer: 1,
        explain: "s[1:4] gives characters at index 1,2,3 → 'y','t','h' → 'yth'."
      },
      {
        q: 'Which creates: Hello, Rohan! You scored 95\n\nname = "Rohan"\nscore = 95',
        options: [
          '"Hello, " + name + "! You scored " + score',
          'f"Hello, {name}! You scored {score}"',
          '"Hello, %s! You scored %d".format(name, score)',
          '"Hello, " + name + "! You scored " + str(score)'
        ],
        answer: 1,
        explain: 'f-strings are the modern, readable way. Option A fails because score is int.'
      }
    ]
  },
  {
    id: 'loops',
    label: 'Loops',
    color: '#06b6d4',
    questions: [
      {
        q: 'What prints?\n\nfor i in range(2, 10, 3):\n    print(i, end=" ")',
        options: ['2 5 8', '2 4 6 8', '2 3 4 5 6 7 8 9', '2 5'],
        answer: 0,
        explain: 'range(2,10,3) starts at 2, steps by 3, stops before 10. Values: 2, 5, 8.'
      },
      {
        q: 'What does continue do in a loop?',
        options: [
          'Stops the loop entirely',
          'Skips the rest of the current iteration and goes to the next',
          'Restarts the loop from the beginning',
          'Pauses execution'
        ],
        answer: 1,
        explain: 'continue skips to the next iteration. break stops the loop entirely.'
      }
    ]
  },
  {
    id: 'lists',
    label: 'Lists',
    color: '#22c55e',
    questions: [
      {
        q: 'What is the output?\n\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)',
        options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4]', 'Error'],
        answer: 1,
        explain: 'b = a does NOT copy the list — both point to the same object. Use b = a.copy() for an independent copy.'
      },
      {
        q: 'What does .sort() return?\n\nnums = [3,1,4]\nresult = nums.sort()\nprint(result)',
        options: ['[1, 3, 4]', 'None', '3', 'Error'],
        answer: 1,
        explain: '.sort() sorts IN PLACE and returns None. Use sorted(nums) to get a new sorted list.'
      }
    ]
  }
]
