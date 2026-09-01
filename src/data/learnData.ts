import { TheoryModule } from '../types';

export const LEARN_MODULES: TheoryModule[] = [
  // ─── TOPIC 01: WHAT IS SEARCHING? ──────────────────────────────────────
  {
    id: 1,
    slug: 'what-is-searching',
    badge: 'Module 01',
    title: '1. What Is Searching?',
    subtitle: 'Finding a specific value from a collection of data',
    summary: 'Searching means finding a particular item from a collection of items.',
    realLifeExample: {
      icon: 'BookOpen',
      title: 'Everyday Analogy: Finding a Name in an Attendance List',
      description: 'Imagine a teacher with a list of students: Aarav, Riya, Kiran, Meera, Rahul. To find "Meera", the teacher looks through the names until Meera is found. Computers perform similar searches using algorithms.'
    },
    computerExamples: [
      "Finding a student's name in a school attendance roster",
      "Looking up a friend's phone number in a contacts list",
      "Searching for a product on an online shopping store",
      "Looking up a player's username in a multiplayer game",
      "Finding a saved document or file on your computer hard drive",
      "Finding the highest score on a gaming leaderboard"
    ],
    keyTakeaway: 'Searching = Finding a required value inside a collection of data.',
    content: [
      {
        type: 'paragraph',
        text: 'Imagine you have a box containing many books and you want to find one specific book. You look through the books until you find the one you need. That simple process is called searching.'
      },
      {
        type: 'paragraph',
        text: 'In computer science, we often have a collection of data and need to find a particular value inside it. For example, consider an array [ 12, 7, 25, 4, 18 ] where we want to find the value 25. The computer needs a systematic way to locate 25 inside the collection. That is the fundamental purpose of a searching algorithm.'
      },
      {
        type: 'visual_diagram',
        heading: 'Visual Search Diagram',
        data: {
          title: 'Searching an Array Collection for Target: 25',
          array: [12, 7, 25, 4, 18],
          highlightIndex: 2,
          target: 25,
          caption: 'We are searching the collection to find the value 25 stored inside the array.'
        }
      },
      {
        type: 'callout',
        alertType: 'info',
        heading: 'Think About It',
        text: 'Whether you are looking for your keys in a bag or searching for a contact on your phone, you are performing a search process. A search algorithm is simply a clear recipe a computer follows to do this.'
      }
    ]
  },

  // ─── TOPIC 02: WHAT IS LINEAR SEARCH? ──────────────────────────────────
  {
    id: 2,
    slug: 'what-is-linear-search',
    badge: 'Module 02',
    title: '2. What Is Linear Search?',
    subtitle: 'Checking every item sequentially one by one from left to right',
    summary: 'Linear Search checks elements one by one from the beginning until the required value is found or the array ends.',
    realLifeExample: {
      icon: 'Users',
      title: 'Core Intuition: Sequential Inspection',
      description: 'Linear Search is one of the simplest searching techniques. It starts at the first element, checks the next, then the next, moving sequentially from left to right until the target is found or there are no more elements.'
    },
    keyTakeaway: 'Linear Search = Check one element at a time until the target is found.',
    content: [
      {
        type: 'paragraph',
        text: 'Linear Search is one of the simplest searching techniques. It starts at the first element, then checks the next element, then the next. It continues moving from left to right until either the target is found or there are no more elements to check.'
      },
      {
        type: 'step_trace',
        heading: 'Step-by-Step Search Progression for Target = 42',
        data: {
          array: [10, 25, 7, 42, 18],
          target: 42,
          steps: [
            { step: 1, index: 0, val: 10, match: false, note: 'Step 1: Check 10 → 10 ≠ 42 (Not Found, move right)' },
            { step: 2, index: 1, val: 25, match: false, note: 'Step 2: Check 25 → 25 ≠ 42 (Not Found, move right)' },
            { step: 3, index: 2, val: 7, match: false, note: 'Step 3: Check 7 → 7 ≠ 42 (Not Found, move right)' },
            { step: 4, index: 3, val: 42, match: true, note: 'Step 4: Check 42 → 42 == 42 (FOUND! Stop searching)' }
          ]
        }
      },
      {
        type: 'callout',
        alertType: 'warning',
        heading: 'Important Concept',
        text: 'Linear Search does NOT jump directly to the middle or guess positions. It checks elements sequentially in a single straight line from start to finish.'
      }
    ]
  },

  // ─── TOPIC 03: UNDERSTANDING POSITIONS & INDEXES ───────────────────────
  {
    id: 3,
    slug: 'understanding-positions',
    badge: 'Module 03',
    title: '3. Understanding Positions & Indexes',
    subtitle: 'How computers number and access array positions starting from 0',
    summary: 'An index tells us the position of an element in an array.',
    realLifeExample: {
      icon: 'Hash',
      title: 'Zero-Based Indexing',
      description: 'Computers number array positions starting from 0. An array index tells us WHERE an element is located in memory, while the value is WHAT is stored inside that box.'
    },
    keyTakeaway: 'Index tells us WHERE an array element is located.',
    content: [
      {
        type: 'paragraph',
        text: 'Computers usually number array positions starting from 0. Position and index are closely related, but remember that in programming languages (like C, Java, Python, and JavaScript), array indexing always starts at 0.'
      },
      {
        type: 'index_diagram',
        heading: 'Visual Array & Index Structure',
        data: {
          array: [15, 8, 23, 42, 11],
          highlightIndex: 3,
          label: 'The value 42 is stored at index 3.'
        }
      },
      {
        type: 'table',
        heading: 'Linear Search + Index Walkthrough for Target = 42',
        data: [
          { index: 0, value: 15, label: 'Check index 0 → 15 → Not Found' },
          { index: 1, value: 8, label: 'Check index 1 → 8 → Not Found' },
          { index: 2, value: 23, label: 'Check index 2 → 23 → Not Found' },
          { index: 3, value: 42, label: 'Check index 3 → 42 → FOUND! (Target = 42 found at index 3)' },
          { index: 4, value: 11, label: 'Index 4 is not checked because we already stopped.' }
        ]
      },
      {
        type: 'callout',
        alertType: 'tip',
        heading: 'Think About It',
        text: 'If an array has 5 elements, the valid index numbers are 0, 1, 2, 3, and 4. The 4th item in natural speech is stored at index 3!'
      }
    ]
  },

  // ─── TOPIC 04: HOW DOES LINEAR SEARCH WORK? ───────────────────────────
  {
    id: 4,
    slug: 'how-it-works',
    badge: 'Module 04',
    title: '4. How Does Linear Search Work?',
    subtitle: 'The Compare → Move → Compare → Move search cycle',
    summary: 'Linear Search moves through an array from left to right and compares each element with the target.',
    realLifeExample: {
      icon: 'Repeat',
      title: 'The Search Rhythm: COMPARE → MOVE',
      description: 'Linear Search repeatedly performs: COMPARE → MOVE → COMPARE → MOVE until the target is found or the array ends.'
    },
    keyTakeaway: 'Linear Search repeatedly performs: COMPARE → MOVE → COMPARE → MOVE until the target is found or the array ends.',
    content: [
      {
        type: 'paragraph',
        text: 'Let us follow a clear step-by-step visual example searching for Target = 12 in the array [ 18, 5, 31, 12, 44 ].'
      },
      {
        type: 'step_trace',
        heading: 'Visual Execution Steps (Target = 12)',
        data: {
          array: [18, 5, 31, 12, 44],
          target: 12,
          steps: [
            { step: 1, index: 0, val: 18, match: false, note: 'Step 1: Check 18 == 12 ? NO (18 ≠ 12) → Move to next element.' },
            { step: 2, index: 1, val: 5, match: false, note: 'Step 2: Check 5 == 12 ? NO (5 ≠ 12) → Move to next element.' },
            { step: 3, index: 3, val: 31, match: false, note: 'Step 3: Check 31 == 12 ? NO (31 ≠ 12) → Move to next element.' },
            { step: 4, index: 3, val: 12, match: true, note: 'Step 4: Check 12 == 12 ? YES! Match found at index 3. STOP SEARCHING.' }
          ]
        }
      },
      {
        type: 'flowchart',
        heading: 'Linear Search Decision Flow',
        data: [
          { step: 'START', desc: 'Initialize search at index 0' },
          { step: 'CHECK ELEMENT', desc: 'Is array[i] == target?' },
          { step: 'IF YES', desc: 'FOUND → Return current index i → STOP' },
          { step: 'IF NO', desc: 'Move to next element (i = i + 1)' },
          { step: 'IF ARRAY ENDS', desc: 'NO match found in entire array → Return -1 (NOT FOUND)' }
        ]
      }
    ]
  },

  // ─── TOPIC 05: LINEAR SEARCH ALGORITHM ────────────────────────────────
  {
    id: 5,
    slug: 'the-algorithm',
    badge: 'Module 05',
    title: '5. Linear Search Algorithm',
    subtitle: 'The complete formal algorithm, pseudocode, and decision flow',
    summary: 'An algorithm is a step-by-step procedure used to solve a problem.',
    realLifeExample: {
      icon: 'ListChecks',
      title: 'Formal Algorithm Recipe',
      description: 'Start at index 0. Compare array[i] with target. If equal, return i. Otherwise increase i. If all elements checked without match, return -1.'
    },
    keyTakeaway: 'Linear Search repeatedly compares the target with each array element until a match is found.',
    content: [
      {
        type: 'step_list',
        heading: 'Complete Linear Search Algorithm Steps',
        data: [
          'Step 1: Start from the first element of the array (index i = 0).',
          'Step 2: Compare the current element array[i] with the target value.',
          'Step 3: If the current element equals the target, return its index i.',
          'Step 4: If it does not match, move to the next element (i = i + 1).',
          'Step 5: Repeat the comparison until the target is found or the array ends.',
          'Step 6: If every element has been checked and the target was not found, return "Not Found" (-1).'
        ]
      },
      {
        type: 'code',
        heading: 'Pseudocode (Computer Recipe)',
        data: `LINEAR_SEARCH(array, target)

1. For i = 0 to n - 1
2.     If array[i] == target
3.         Return i
4. Return -1

// Notes:
// i represents the current index.
// n represents the number of elements in the array.
// -1 means the target was not found.`
      },
      {
        type: 'flowchart',
        heading: 'Visual Algorithm Flow',
        data: [
          { step: 'START', desc: 'Set i = 0' },
          { step: 'CHECK array[i]', desc: 'Is array[i] == target?' },
          { step: 'YES branch', desc: 'Return index i (Match Found)' },
          { step: 'NO branch', desc: 'Increase i by 1' },
          { step: 'REMAINING?', desc: 'If i < n, check next element; otherwise Return -1 (NOT FOUND)' }
        ]
      },
      {
        type: 'table',
        heading: 'Example Trace: Array [4, 9, 15, 21, 30] searching for Target = 21',
        data: [
          { index: 0, value: 4, label: 'i = 0 → 4 ≠ 21 (No match, continue)' },
          { index: 1, value: 9, label: 'i = 1 → 9 ≠ 21 (No match, continue)' },
          { index: 2, value: 15, label: 'i = 2 → 15 ≠ 21 (No match, continue)' },
          { index: 3, value: 21, label: 'i = 3 → 21 == 21 ✓ (Match! Return Index 3)' }
        ]
      }
    ]
  },

  // ─── TOPIC 06: WHAT IF WE CANNOT FIND IT? ─────────────────────────────
  {
    id: 6,
    slug: 'item-not-found',
    badge: 'Module 06',
    title: '6. What If We Cannot Find It?',
    subtitle: 'Understanding the NOT FOUND case and safe termination',
    summary: 'Sometimes the target value does not exist in the array. Linear Search checks every element and reports NOT FOUND.',
    realLifeExample: {
      icon: 'SearchX',
      title: 'Everyday Analogy: Book Not on the Shelf',
      description: 'Imagine looking for a specific book on a shelf. You check every book one by one. If you reach the last book and still haven\'t found it, the book is simply not on that shelf.'
    },
    keyTakeaway: 'If Linear Search checks every element without finding the target, the result is NOT FOUND (return -1).',
    content: [
      {
        type: 'paragraph',
        text: 'Sometimes the target value does not exist in the array. Linear Search checks every element from start to finish. If none of them matches the target, the algorithm safely terminates and reports that the value was not found.'
      },
      {
        type: 'not_found_visual',
        heading: 'Searching for Missing Target = 50 in [10, 25, 7, 42, 18]',
        data: {
          array: [10, 25, 7, 42, 18],
          target: 50,
          comparisons: [
            { val: 10, res: '10 ≠ 50 ✗' },
            { val: 25, res: '25 ≠ 50 ✗' },
            { val: 7, res: '7 ≠ 50 ✗' },
            { val: 42, res: '42 ≠ 50 ✗' },
            { val: 18, res: '18 ≠ 50 ✗' }
          ]
        }
      },
      {
        type: 'callout',
        alertType: 'warning',
        heading: 'Important Concept & Return Values',
        text: 'The search must stop after the final element has been checked. The algorithm must not continue searching beyond the array boundaries. In programming implementations: Found → return the index (e.g. 3). Not Found → return -1.'
      }
    ]
  },

  // ─── TOPIC 07: HOW MANY ITEMS DO WE CHECK? ────────────────────────────
  {
    id: 7,
    slug: 'best-average-worst-case',
    badge: 'Module 07',
    title: '7. How Many Items Do We Check?',
    subtitle: 'How target position determines the number of comparisons',
    summary: 'The number of elements Linear Search checks depends on where the target is located.',
    realLifeExample: {
      icon: 'Scale',
      title: 'Location Determines Work',
      description: 'The farther the target is from the beginning of the array, the more elements Linear Search must check.'
    },
    keyTakeaway: 'The farther the target is from the beginning, the more elements Linear Search may need to check.',
    content: [
      {
        type: 'paragraph',
        text: 'The number of elements Linear Search checks depends on where the target is located. Sometimes the target is at the very beginning, in the middle, at the end, or not present at all.'
      },
      {
        type: 'comparison_cases',
        heading: 'The 4 Search Scenarios',
        data: [
          {
            title: 'Case 1 — Target First (Best Case)',
            array: [25, 10, 40, 8, 17],
            target: 25,
            targetIndex: 0,
            checks: 1,
            badge: '1 check',
            desc: 'Target is the very first element. Only 1 comparison needed (25 == 25 ✓).'
          },
          {
            title: 'Case 2 — Target in the Middle (Average Case)',
            array: [10, 20, 30, 40, 50],
            target: 30,
            targetIndex: 2,
            checks: 3,
            badge: '3 checks',
            desc: 'Check: 10 → 20 → 30 ✓. Takes 3 comparisons to find 30.'
          },
          {
            title: 'Case 3 — Target Last (Worst Case)',
            array: [10, 20, 30, 40, 50],
            target: 50,
            targetIndex: 4,
            checks: 5,
            badge: '5 checks',
            desc: 'Check: 10 → 20 → 30 → 40 → 50 ✓. Takes 5 comparisons (all elements).'
          },
          {
            title: 'Case 4 — Target Not Present (Worst Case)',
            array: [10, 20, 30, 40, 50],
            target: 99,
            targetIndex: -1,
            checks: 5,
            badge: '5 checks (Not Found)',
            desc: 'Check: 10 → 20 → 30 → 40 → 50 (All fail). Result = Not Found.'
          }
        ]
      }
    ]
  },

  // ─── TOPIC 08: HOW FAST IS LINEAR SEARCH? ─────────────────────────────
  {
    id: 8,
    slug: 'time-complexity',
    badge: 'Module 08',
    title: '8. How Fast Is Linear Search?',
    subtitle: 'Understanding Time Complexity, O(n), Best Case, and Worst Case',
    summary: 'Linear Search checks elements one by one. If there are n elements, it may need up to n checks, giving it a time complexity of O(n).',
    realLifeExample: {
      icon: 'Zap',
      title: 'What Does O(n) Mean?',
      description: 'As the number of elements (n) increases, the amount of work Linear Search may need to do also increases proportionally in a direct straight line.'
    },
    keyTakeaway: 'Linear Search is easy to implement, but its worst-case time grows linearly with the size of the array.',
    content: [
      {
        type: 'paragraph',
        text: 'Linear Search checks elements one by one. If there are n elements, the algorithm may need to check all n elements in the worst case. This gives Linear Search a time complexity of O(n). In simple terms: 10 elements → up to 10 checks; 100 elements → up to 100 checks; 1,000 elements → up to 1,000 checks.'
      },
      {
        type: 'complexity_breakdown',
        heading: 'Time Complexity Breakdown',
        data: [
          {
            caseType: 'Best Case',
            notation: 'O(1)',
            comparisons: '1 comparison',
            badge: 'Fastest',
            explanation: 'The target happens to be the very first element (index 0). Only 1 check is needed regardless of array size.'
          },
          {
            caseType: 'Average Case',
            notation: 'O(n)',
            comparisons: '≈ n / 2 comparisons',
            badge: 'Expected',
            explanation: 'The target is somewhere in the array. On average, approximately half the elements need to be checked.'
          },
          {
            caseType: 'Worst Case',
            notation: 'O(n)',
            comparisons: 'n comparisons',
            badge: 'Maximum Work',
            explanation: 'The target is at the very end of the array OR does not exist at all. All n elements must be inspected.'
          }
        ]
      },
      {
        type: 'callout',
        alertType: 'tip',
        heading: 'Important Takeaway',
        text: 'Linear Search is simple and useful, but it can become slow for very large collections because it may need to inspect every single item one by one.'
      }
    ]
  },

  // ─── TOPIC 09: WHERE DO WE USE LINEAR SEARCH? ─────────────────────────
  {
    id: 9,
    slug: 'real-life-uses',
    badge: 'Module 09',
    title: '9. Where Do We Use Linear Search?',
    subtitle: 'Real-world scenarios, small datasets, unsorted arrays, and when to use it',
    summary: 'Linear Search is useful when data is small, unsorted, or when simplicity is more important than advanced searching performance.',
    realLifeExample: {
      icon: 'Compass',
      title: 'Practical Application Rule',
      description: 'Linear Search is especially useful when the data is small or unsorted and a simple, direct solution is sufficient.'
    },
    keyTakeaway: 'Linear Search is especially useful when the data is small or unsorted and a simple solution is sufficient.',
    content: [
      {
        type: 'key_value_cards',
        heading: '5 Real-World & Software Examples',
        data: [
          {
            title: '1. Contact List',
            badge: 'Everyday',
            description: 'Looking through a small contact list on your phone to find a person’s name.'
          },
          {
            title: '2. Shopping List',
            badge: 'Tasks',
            description: 'Scanning down a grocery list to check whether a particular item is already written.'
          },
          {
            title: '3. Attendance List',
            badge: 'Classroom',
            description: 'Searching for a student’s name across an attendance roll call sheet.'
          },
          {
            title: '4. Unsorted Data',
            badge: 'Programming',
            description: 'Searching an array where values are not arranged in any specific sorted order.'
          },
          {
            title: '5. Small Collections',
            badge: 'Efficiency',
            description: 'For a small number of elements (e.g. 10 to 50 items), Linear Search is simple, fast, and needs zero extra overhead.'
          }
        ]
      },
      {
        type: 'use_case_comparison',
        heading: 'When is Linear Search a Good Choice?',
        data: {
          good: [
            'Small arrays and lists',
            'Unsorted data (where items appear in random order)',
            'Simple programs and scripts',
            'Learning and basic algorithmic implementations',
            'Situations where simplicity and low memory are priorities'
          ],
          caution: [
            'For very large sorted datasets (e.g. millions of items), other algorithms such as Binary Search can be much faster when their sorted requirements are satisfied.'
          ]
        }
      }
    ]
  },

  // ─── TOPIC 10: LINEAR SEARCH IN CODE ──────────────────────────────────
  {
    id: 10,
    slug: 'linear-search-in-code',
    badge: 'Module 10',
    title: '10. Linear Search in Code',
    subtitle: 'Working, beginner-friendly implementations in C, Java, and Python with step walkthrough',
    summary: 'See how a loop and conditional comparison implement Linear Search across C, Java, and Python.',
    realLifeExample: {
      icon: 'Code2',
      title: 'Core Pattern Across All Languages',
      description: 'A loop visits each index (i), an if statement compares arr[i] == target, returning the index if matched or -1 if the loop finishes without a match.'
    },
    keyTakeaway: 'The loop visits each index, the condition checks for a match, and -1 indicates the element was not found.',
    content: [
      {
        type: 'step_list',
        heading: 'Part A — The Universal Algorithm Recipe',
        data: [
          '1. Start from index 0.',
          '2. Compare the current element arr[i] with the target.',
          '3. If they are equal, return the current index i.',
          '4. Otherwise move to the next index.',
          '5. Continue until the target is found or the array ends.',
          '6. If the target is not found after checking all items, return -1.'
        ]
      },
      {
        type: 'multi_code',
        heading: 'Working Implementations: C, Java, & Python',
        data: {
          c: `#include <stdio.h>

int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i; // Found at index i
        }
    }

    return -1; // Not found
}

int main() {
    int arr[] = {10, 25, 7, 42, 18};
    int n = 5;
    int target = 42;

    int result = linearSearch(arr, n, target);

    if (result != -1) {
        printf("Element found at index %d\\n", result);
    } else {
        printf("Element not found\\n");
    }

    return 0;
}`,
          cExplanation: [
            'arr[] stores the values.',
            'n stores the number of elements.',
            'target is the value we want to find.',
            'The for loop checks each element from 0 to n-1.',
            'If a match is found, the index is returned.',
            'If the loop finishes without a match, -1 is returned.'
          ],
          java: `public class LinearSearch {

    static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i; // Found at index i
            }
        }

        return -1; // Not found
    }

    public static void main(String[] args) {
        int[] arr = {10, 25, 7, 42, 18};
        int target = 42;

        int result = linearSearch(arr, target);

        if (result != -1) {
            System.out.println("Element found at index " + result);
        } else {
            System.out.println("Element not found");
        }
    }
}`,
          javaExplanation: [
            'int[] arr creates our array of integers.',
            'arr.length gives the total number of items.',
            'The for loop iterates through every position i.',
            'If arr[i] == target, return index i immediately.',
            'Returns -1 if the loop completes without finding a match.'
          ],
          python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Found at index i

    return -1  # Not found


arr = [10, 25, 7, 42, 18]
target = 42

result = linear_search(arr, target)

if result != -1:
    print("Element found at index", result)
else:
    print("Element not found")`,
          pythonExplanation: [
            'arr is a Python list containing the numbers.',
            'range(len(arr)) generates indices from 0 to len(arr) - 1.',
            'arr[i] accesses the current element.',
            'If arr[i] == target, returns index i.',
            'Returns -1 if the element is not found.'
          ]
        }
      },
      {
        type: 'table',
        heading: 'Part E — Code Walkthrough for Array: [10, 25, 7, 42, 18] & Target: 42',
        data: [
          { index: 0, value: 10, label: 'i = 0 → 10 == 42 ? ✗ (No match)' },
          { index: 1, value: 25, label: 'i = 1 → 25 == 42 ? ✗ (No match)' },
          { index: 2, value: 7, label: 'i = 2 → 7 == 42 ? ✗ (No match)' },
          { index: 3, value: 42, label: 'i = 3 → 42 == 42 ? ✓ (Match found! RETURN 3)' }
        ]
      },
      {
        type: 'complexity_summary',
        heading: 'Part F — Complexity Summary',
        data: {
          time: 'O(n) — In the worst case, every element may need to be checked.',
          space: 'O(1) — It uses only a small, constant amount of additional memory for variables (i, target).'
        }
      }
    ]
  },

  // ─── TOPIC 11: REAL-WORLD APPLICATIONS & EDGE CASES ─────────────────────
  {
    id: 11,
    slug: 'real-world-applications-edge-cases',
    badge: 'Module 11',
    title: '11. Real-World Applications & Edge Cases',
    subtitle: 'Duplicate elements, empty collections, single-item lookups, and practical optimizations',
    summary: 'Linear search handles diverse data structures and real-world edge cases effortlessly, including duplicates, empty inputs, and non-numeric searches.',
    realLifeExample: {
      icon: 'Layers',
      title: 'Everyday Analogy: Finding Keys in Multiple Pockets',
      description: 'When looking through the pockets of your jacket, you check the first pocket, then the next. If you find your keys early, you stop immediately. If a pocket has two identical coins, you pick the first one you touch.'
    },
    computerExamples: [
      "Searching for a contact by name or phone number in an address book",
      "Scanning a database table without an indexed primary key",
      "Finding an active network socket connection from an open connections array",
      "Locating a specific word or character in an unformatted text document",
      "Verifying if a freshly entered username is already taken in memory",
      "Checking sensor telemetry records for an anomaly threshold"
    ],
    keyTakeaway: 'Linear search gracefully handles unsorted data, empty inputs, and duplicate values by returning the first matching index found.',
    content: [
      {
        type: 'paragraph',
        text: 'In practical software engineering, data is not always clean integers in neat order. Programs frequently search through strings, user objects, database rows, and collections that may be empty or contain duplicates.'
      },
      {
        type: 'key_value_cards',
        heading: 'Crucial Edge Cases to Consider',
        data: [
          {
            title: '1. Empty Array (n = 0)',
            badge: 'Edge Case',
            description: 'Loop condition (0 < 0) immediately evaluates to false. The function instantly returns -1 safely without runtime errors.'
          },
          {
            title: '2. Single Element (n = 1)',
            badge: 'Edge Case',
            description: 'Only 1 comparison is performed. If it matches target, returns 0. Otherwise, the loop terminates and returns -1.'
          },
          {
            title: '3. Duplicate Values',
            badge: 'Behavior',
            description: 'Standard linear search returns the FIRST occurrence (lowest index). If you need ALL occurrences, collect matching indices in a list.'
          }
        ]
      },
      {
        type: 'visual_diagram',
        heading: 'Duplicate Element Search: Array [14, 9, 25, 9, 40] with Target = 9',
        data: {
          title: 'First Occurrence Returned at Index 1',
          array: [14, 9, 25, 9, 40],
          highlightIndex: 1,
          target: 9,
          caption: 'Target 9 exists at both index 1 and index 3. Standard linear search stops at index 1 and returns 1.'
        }
      },
      {
        type: 'multi_code',
        heading: 'Searching Objects and Strings in Real Applications',
        data: {
          c: `// Searching array of user records by ID
struct User {
    int id;
    char name[50];
};

int findUserById(struct User users[], int size, int targetId) {
    for (int i = 0; i < size; i++) {
        if (users[i].id == targetId) {
            return i; // User found
        }
    }
    return -1; // User not found
}`,
          cExplanation: [
            'Iterates through struct User records sequentially.',
            'Compares user.id with the target search ID.',
            'Returns the array index where the user record resides.'
          ],
          cpp: `// Finding string in vector
#include <vector>
#include <string>

int findStudent(const std::vector<std::string>& students, const std::string& name) {
    for (size_t i = 0; i < students.size(); ++i) {
        if (students[i] == name) {
            return static_cast<int>(i);
        }
    }
    return -1;
}`,
          cppExplanation: [
            'Accepts std::vector of student names as strings.',
            'Uses size_t for safe index bounds checking.',
            'Returns matching index or -1 if the student is absent.'
          ],
          java: `// Search an array of objects
class Employee {
    int id;
    String department;
}

public static int findByDept(Employee[] list, String dept) {
    for (int i = 0; i < list.length; i++) {
        if (list[i].department.equalsIgnoreCase(dept)) {
            return i;
        }
    }
    return -1;
}`,
          javaExplanation: [
            'Iterates over an array of Employee objects.',
            'Uses equalsIgnoreCase() for robust case-insensitive string matching.',
            'Returns index of first employee matching the target department.'
          ],
          python: `# Finding all matching indices in Python
def linear_search_all(arr, target):
    matches = []
    for i in range(len(arr)):
        if arr[i] == target:
            matches.append(i)
    return matches  # Returns list of all indices

scores = [85, 92, 85, 78, 85]
# Returns [0, 2, 4] for target 85
print(linear_search_all(scores, 85))`,
          pythonExplanation: [
            'Rather than stopping at the first match, continues through the full array.',
            'Appends each matching index to a results list.',
            'Returns a complete list of occurrences [0, 2, 4].'
          ]
        }
      },
      {
        type: 'callout',
        alertType: 'tip',
        heading: 'Early Exit Optimization',
        text: 'Always return the index immediately when a match is found rather than continuing the loop. This ensures your best case stays O(1) and average search time is cut in half (n/2 comparisons)!'
      }
    ]
  },

  // ─── TOPIC 12: LINEAR SEARCH VS BINARY SEARCH & MASTER SUMMARY ───────────
  {
    id: 12,
    slug: 'linear-vs-binary-search-master-summary',
    badge: 'Module 12',
    title: '12. Linear Search vs. Binary Search & Summary',
    subtitle: 'Choosing the right searching algorithm, sorting tradeoffs, and complete curriculum synthesis',
    summary: 'Compare Linear Search with Binary Search, understand when sorting justifies the logarithmic speedup, and review the complete linear search mastery checklist.',
    realLifeExample: {
      icon: 'Scale',
      title: 'Everyday Analogy: Finding a Word in an Unsorted Pile vs. a Dictionary',
      description: 'If papers are scattered randomly on a table, you have no choice but to scan one by one (Linear Search). But in a printed dictionary sorted alphabetically from A to Z, you can open the middle and eliminate half the pages at each step (Binary Search).'
    },
    computerExamples: [
      "Unsorted grocery shopping cart items → Linear Search (fastest, no sort overhead)",
      "Sorted national voter ID registry (100 million entries) → Binary Search (sub-millisecond lookups)",
      "Small cached lists (< 50 items) → Linear Search (low CPU cache miss overhead)",
      "Dynamic linked lists where middle jumps are impossible → Linear Search",
      "Single one-off search on raw data → Linear Search (avoid O(n log n) sorting cost)"
    ],
    keyTakeaway: 'Use Linear Search for unsorted or small datasets where sorting is impractical. Use Binary Search when data is already sorted and searched repeatedly.',
    content: [
      {
        type: 'paragraph',
        text: 'A foundational question in computer science is: when should you use Linear Search over faster algorithms like Binary Search? The answer depends on data volume, whether the collection is already sorted, and how frequently searches occur.'
      },
      {
        type: 'comparison_cases',
        heading: 'Head-to-Head: Linear Search vs Binary Search',
        data: {
          items: [
            {
              criterion: 'Time Complexity (Worst)',
              linear: 'O(n) — Linear time (checks up to n items)',
              binary: 'O(log n) — Logarithmic time (divides search space in half)'
            },
            {
              criterion: 'Data Prerequisite',
              linear: 'None! Works on unsorted, random, and duplicate data',
              binary: 'STRICT: Data MUST be sorted beforehand'
            },
            {
              criterion: 'Data Structure Support',
              linear: 'Arrays, Linked Lists, Streams, Files, Trees',
              binary: 'Arrays with random index access (O(1) indexing)'
            },
            {
              criterion: 'Implementation Simplicity',
              linear: 'Trivial (single loop, ~5 lines of code)',
              binary: 'Moderate (tracking low, high, mid pointers & overflow)'
            },
            {
              criterion: 'Best Used For',
              linear: 'Small arrays (n < 50), unsorted lists, single search queries',
              binary: 'Large sorted arrays (n > 10,000) with frequent repeated lookups'
            }
          ]
        }
      },
      {
        type: 'step_list',
        heading: 'Linear Search Master Rulebook',
        data: [
          'Step 1: Always verify if data is sorted. If unsorted, Linear Search is your direct, zero-overhead solution.',
          'Step 2: Start pointer at index 0 and inspect element arr[i] against target.',
          'Step 3: If arr[i] == target, return index i immediately (Early Termination).',
          'Step 4: Increment pointer i by 1 and repeat until i == array.length.',
          'Step 5: If the loop finishes without finding target, safely return -1 (Not Found).',
          'Step 6: Remember: Best Case = O(1) (first item), Worst Case = O(n) (last item or not present), Space = O(1).'
        ]
      },
      {
        type: 'complexity_summary',
        heading: 'Complete Linear Search Formula Matrix',
        data: {
          time: 'Best: O(1) | Average: O(n/2) = O(n) | Worst: O(n)',
          space: 'O(1) Auxiliary Space (In-place algorithm requiring no extra memory)'
        }
      },
      {
        type: 'callout',
        alertType: 'success',
        heading: 'Curriculum Mastery Complete!',
        text: 'You have mastered all 12 core theory modules! Continue to the Interactive Visualizer, Challenge Games, and Mastery Quiz to earn your Official Certificate of Mastery!'
      }
    ]
  }
];
