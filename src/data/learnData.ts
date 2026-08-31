import { TheoryModule } from '../types';

export const LEARN_MODULES: TheoryModule[] = [
  {
    id: 1,
    slug: 'what-is-searching',
    badge: 'Module 01',
    title: '1. What Is Searching?',
    subtitle: 'Looking for what we need in a collection',
    summary: 'Searching means trying to find something we need from a group of items.',
    realLifeExample: {
      icon: 'BookOpen',
      title: 'Finding the word "CAT"',
      description: 'Imagine your teacher asks you to find the word "CAT" in a book. You look through the pages until you find it.'
    },
    computerExamples: [
      "A student's name in a school roster",
      "A phone number in a contacts list",
      "A product in an online store",
      "A player's username in a multiplayer game",
      "A saved file on your computer hard drive",
      "The highest game score on a leaderboard"
    ],
    keyTakeaway: 'Searching means finding a particular item from a collection of items.',
    content: [
      {
        type: 'paragraph',
        text: 'Searching is one of the most fundamental things computers do every single second. Whenever you open an app, look up a friend, or search for a video, the computer performs a search algorithm.'
      },
      {
        type: 'callout',
        alertType: 'info',
        heading: 'Think About It',
        text: 'Whether you are looking for your missing socks in a drawer or searching for a contact on a phone, you are performing a search process!'
      }
    ]
  },
  {
    id: 2,
    slug: 'what-is-linear-search',
    badge: 'Module 02',
    title: '2. What Is Linear Search?',
    subtitle: 'Checking every item one by one from start to end',
    summary: 'Linear Search is a searching method that checks every item one by one from the beginning until the required item is found.',
    realLifeExample: {
      icon: 'Users',
      title: 'The Red Ball in the Line',
      description: 'Imagine students standing in a line. Your teacher asks, "Who has the red ball?" You check the first student. If they don\'t have it, check the second. Then the third. Keep going until you find it.'
    },
    keyTakeaway: 'Never skip an item. The search always moves sequentially: First → Second → Third → Fourth → ...',
    content: [
      {
        type: 'callout',
        alertType: 'warning',
        heading: 'The Golden Rule of Linear Search',
        text: 'Never skip an item! We always inspect the elements in order: First → Second → Third → Fourth → ...'
      },
      {
        type: 'step_list',
        heading: 'Why is it called "Linear"?',
        data: [
          'Linear comes from the word "Line".',
          'It checks items in a single straight path from left to right.',
          'It does not jump ahead or look in random spots.'
        ]
      }
    ]
  },
  {
    id: 3,
    slug: 'understanding-positions',
    badge: 'Module 03',
    title: '3. Understanding Positions & Indexes',
    subtitle: 'How computers locate items in arrays starting at 0',
    summary: 'Computers identify positions inside lists using numbers called indexes, starting at 0.',
    keyTakeaway: 'Index = position in line (starts at 0). Value = the item stored at that position.',
    content: [
      {
        type: 'paragraph',
        text: 'When we store items in a list (also called an Array), computers assign a numbered badge to each spot. In computer science, we almost always start counting from 0 instead of 1!'
      },
      {
        type: 'table',
        heading: 'Array Index vs. Value Example',
        data: [
          { index: 0, value: 15, label: 'First Item (Index 0)' },
          { index: 1, value: 8, label: 'Second Item (Index 1)' },
          { index: 2, value: 23, label: 'Third Item (Index 2)' },
          { index: 3, value: 7, label: 'Fourth Item (Index 3)' },
          { index: 4, value: 19, label: 'Fifth Item (Index 4)' }
        ]
      },
      {
        type: 'callout',
        alertType: 'tip',
        heading: 'Important Distinction',
        text: 'A[2] = 23 means: The value 23 is stored at index 2.'
      }
    ]
  },
  {
    id: 4,
    slug: 'how-it-works',
    badge: 'Module 04',
    title: '4. How Does Linear Search Work?',
    subtitle: 'Step-by-step walk-through of searching for 18',
    summary: 'Follow the step-by-step comparison as we find the target number in an array.',
    keyTakeaway: 'Check each item. If it matches, STOP and celebrate! If it does not match, move forward.',
    content: [
      {
        type: 'array_visual',
        heading: 'Example Search: Target = 18',
        data: {
          array: [10, 25, 7, 18, 30],
          target: 18,
          steps: [
            { step: 1, index: 0, val: 10, match: false, note: 'Check 10: 10 ≠ 18 ❌ Not found' },
            { step: 2, index: 1, val: 25, match: false, note: 'Check 25: 25 ≠ 18 ❌ Not found' },
            { step: 3, index: 2, val: 7, match: false, note: 'Check 7: 7 ≠ 18 ❌ Not found' },
            { step: 4, index: 3, val: 18, match: true, note: 'Check 18: 18 = 18 ✅ Found!' },
            { step: 5, index: 3, val: 18, match: true, note: 'Step 5: Stop searching immediately!' }
          ]
        }
      }
    ]
  },
  {
    id: 5,
    slug: 'the-algorithm',
    badge: 'Module 05',
    title: '5. Linear Search Algorithm',
    subtitle: 'The 4-step rhythm of sequential search',
    summary: 'The universal 4-part recipe every computer uses for Linear Search.',
    keyTakeaway: '👀 Look → 🔎 Compare → ➡️ Move → 🔁 Repeat → 🎯 Found',
    content: [
      {
        type: 'callout',
        alertType: 'success',
        heading: 'The 4-Step Mental Model',
        text: 'Look → Compare → Move → Repeat'
      },
      {
        type: 'code',
        heading: 'Pseudocode (Computer Recipe)',
        data: `Start from the first item (Index 0).

For each item in the list:
    Compare the current item with the target.

    If they are equal:
        The item is found!
        Stop searching (return index).

    Otherwise:
        Move to the next item.

If we reach the end of the list:
    The item was not found.`
      }
    ]
  },
  {
    id: 6,
    slug: 'item-not-found',
    badge: 'Module 06',
    title: '6. What If We Cannot Find It?',
    subtitle: 'Handling the missing item edge case',
    summary: 'When the target is not in the list, the search checks all items to the very end.',
    keyTakeaway: 'If Linear Search reaches the end of the list without finding the target, the search reports that the item is not present.',
    content: [
      {
        type: 'array_visual',
        heading: 'Searching for 30 in [5, 12, 8, 20, 14]',
        data: {
          array: [5, 12, 8, 20, 14],
          target: 30,
          steps: [
            { step: 1, index: 0, val: 5, match: false, note: '5 ≠ 30 ❌' },
            { step: 2, index: 1, val: 12, match: false, note: '12 ≠ 30 ❌' },
            { step: 3, index: 2, val: 8, match: false, note: '8 ≠ 30 ❌' },
            { step: 4, index: 3, val: 20, match: false, note: '20 ≠ 30 ❌' },
            { step: 5, index: 4, val: 14, match: false, note: '14 ≠ 30 ❌' }
          ]
        }
      },
      {
        type: 'callout',
        alertType: 'warning',
        heading: 'Result: ❌ 30 was not found',
        text: 'There are no more items left to check in the list. The algorithm safely finishes and outputs "Not Found" (often represented as -1 in code).'
      }
    ]
  },
  {
    id: 7,
    slug: 'best-average-worst-case',
    badge: 'Module 07',
    title: '7. How Many Items Do We Check?',
    subtitle: 'Best case, average case, and worst case',
    summary: 'Depending on where the target is located, we might find it right away or need to check everyone.',
    keyTakeaway: 'Best case: 1 check. Average case: n/2 checks. Worst case: n checks (when at the end or missing).',
    content: [
      {
        type: 'key_value_cards',
        heading: 'The Three Scenarios',
        data: [
          {
            title: 'Best Case (1 check)',
            badge: 'Lucky! 🍀',
            description: 'Target is the first item! Example: Searching for 25 in [25, 10, 7, 18]. Only 1 comparison needed.'
          },
          {
            title: 'Average Case (~3 checks)',
            badge: 'Normal ⚖️',
            description: 'Target is somewhere in the middle. Example: Searching for 25 in [10, 7, 25, 18, 30]. Takes 3 comparisons.'
          },
          {
            title: 'Worst Case (5 checks)',
            badge: 'Max Effort 🐢',
            description: 'Target is last or missing. Example: Searching for 30 (or 50) in [10, 7, 25, 18, 30]. Takes 5 comparisons.'
          }
        ]
      }
    ]
  },
  {
    id: 8,
    slug: 'time-complexity',
    badge: 'Module 08',
    title: '8. How Fast Is Linear Search?',
    subtitle: 'Introduction to Time Complexity and O(n)',
    summary: 'In computer science, we express the speed of an algorithm using Big-O notation.',
    keyTakeaway: 'Linear Search has O(n) time complexity. More items in the list means proportionally more checks.',
    content: [
      {
        type: 'callout',
        alertType: 'info',
        heading: 'Time Complexity: O(n)',
        text: 'Here "n" represents the total number of items in the list. In the worst case, we must check all n items.'
      },
      {
        type: 'step_list',
        heading: 'Number of Items vs. Maximum Checks',
        data: [
          '5 items in array → at most 5 checks',
          '10 items in array → at most 10 checks',
          '100 items in array → at most 100 checks',
          '1,000 items in array → at most 1,000 checks'
        ]
      },
      {
        type: 'callout',
        alertType: 'tip',
        heading: 'Simple Rule for Beginners',
        text: 'More items can mean more checking. We don’t need complex calculus to see that searching 100 bags takes 100 times longer than 1 bag!'
      }
    ]
  },
  {
    id: 9,
    slug: 'real-life-uses',
    badge: 'Module 09',
    title: '9. Where Do We Use Linear Search?',
    subtitle: 'Everyday applications in real life and computers',
    summary: 'Linear search is used in unsorted lists, small datasets, and everyday physical searching.',
    keyTakeaway: 'Many everyday "check one by one" activities are similar to Linear Search.',
    content: [
      {
        type: 'key_value_cards',
        heading: 'Everyday Examples',
        data: [
          {
            title: '🎒 Finding a School Bag',
            badge: 'Physical',
            description: 'Checking each cubby or hook one by one until you see your bag.'
          },
          {
            title: '📚 Finding a Book',
            badge: 'Library',
            description: 'Scanning books on a shelf one after another until you spot the title.'
          },
          {
            title: '👩‍🎓 Finding a Student',
            badge: 'Classroom',
            description: 'Calling attendance or scanning a roster name by name.'
          },
          {
            title: '🎮 Finding a Game Score',
            badge: 'Gaming',
            description: 'Scanning a leaderboard to find your current high score.'
          },
          {
            title: '🛒 Finding a Product',
            badge: 'Shopping',
            description: 'Looking along a grocery aisle until you locate the item you need.'
          }
        ]
      }
    ]
  },
  {
    id: 10,
    slug: 'linear-search-in-code',
    badge: 'Module 10',
    title: '10. Linear Search in Code',
    subtitle: 'Translating the logic into Java & TypeScript',
    summary: 'See how a real loop and conditional check implement Linear Search in code.',
    keyTakeaway: 'The loop (for) walks through positions (i), the if statement compares (==), and break stops the search when found.',
    content: [
      {
        type: 'code',
        heading: 'Java Code Example',
        data: `int[] numbers = {10, 25, 7, 18, 30};
int target = 18;

for (int i = 0; i < numbers.length; i++) {
    if (numbers[i] == target) {
        System.out.println("Found at index " + i);
        break; // Stop searching once found
    }
}`
      },
      {
        type: 'step_list',
        heading: 'Code Breakdown for Beginners',
        data: [
          'int[] numbers → Creates our list of items.',
          'target → Stores the value we want to find (18).',
          'i → Keeps track of our current index/position (0, 1, 2...).',
          'numbers[i] → Accesses the value at the current position.',
          '== → Checks whether the current item equals our target.',
          'break → Stops the loop as soon as the item is found.'
        ]
      }
    ]
  }
];
