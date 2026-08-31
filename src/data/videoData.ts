import { VideoLesson } from '../types';

export const VIDEO_LESSONS: VideoLesson[] = [
  {
    id: 1,
    title: '1. What Is Linear Search?',
    durationSeconds: 90,
    durationLabel: '1:30',
    description: 'Learn what searching means, everyday real-life examples, arrays and indexes, and how linear search examines items one by one.',
    topicsCovered: [
      'What searching means',
      'Real-life example (School bags & Books)',
      'Definition of Linear Search',
      'Array and index starting from 0',
      'Checking items one by one',
      'Finding the target',
      'What happens when target is missing'
    ],
    chapters: [
      {
        time: 0,
        title: 'Introduction to Searching',
        description: 'Searching is finding a specific item from a collection. Like finding your favorite toy in a line.',
        visualState: {
          array: [12, 7, 25, 4, 18],
          target: 25,
          currentIndex: -1,
          status: 'idle',
          message: 'Imagine 5 boxes in a row. How do we find item 25?'
        }
      },
      {
        time: 15,
        title: 'Indexes & Positions',
        description: 'Computers number list positions from 0, 1, 2, 3, 4. Index is position, Value is the contents.',
        visualState: {
          array: [12, 7, 25, 4, 18],
          target: 25,
          currentIndex: 0,
          status: 'check',
          message: 'Index 0 holds value 12. Index 1 holds value 7.'
        }
      },
      {
        time: 35,
        title: 'Checking One by One',
        description: 'Start at index 0. Compare value with target. 12 != 25, so move to index 1. 7 != 25, so move to index 2.',
        visualState: {
          array: [12, 7, 25, 4, 18],
          target: 25,
          currentIndex: 1,
          status: 'compare',
          message: 'Checking Index 1: Value 7 != Target 25 ❌'
        }
      },
      {
        time: 55,
        title: 'Item Found & Stopping',
        description: 'At index 2, value is 25. Target matches! Stop immediately and report index 2.',
        visualState: {
          array: [12, 7, 25, 4, 18],
          target: 25,
          currentIndex: 2,
          status: 'found',
          message: 'Index 2: Value 25 == Target 25 ✅ MATCH FOUND! Stop search.'
        }
      },
      {
        time: 75,
        title: 'Missing Item Case',
        description: 'If we search for 99 and reach the end with no match, we report Not Found.',
        visualState: {
          array: [12, 7, 25, 4, 18],
          target: 99,
          currentIndex: 4,
          status: 'not_found',
          message: 'Reached end of array. 99 is not in the list! ❌'
        }
      }
    ]
  },
  {
    id: 2,
    title: '2. Linear Search Step by Step & Time Complexity',
    durationSeconds: 110,
    durationLabel: '1:50',
    description: 'Master the algorithm mechanics, counting comparisons, best vs worst cases, and understanding O(n) notation.',
    topicsCovered: [
      'Start at index 0',
      'Compare current value with target',
      'Move to the next index',
      'Count comparisons',
      'Found vs Not-found termination',
      'Best Case (1 check) vs Worst Case (n checks)',
      'O(n) Time Complexity'
    ],
    chapters: [
      {
        time: 0,
        title: 'The 4-Step Loop',
        description: 'Look → Compare → Move → Repeat. This simple loop powers every linear search.',
        visualState: {
          array: [10, 25, 7, 18, 30],
          target: 18,
          currentIndex: 0,
          status: 'check',
          message: 'Step 1: Check Index 0 (Value 10) against Target (18).'
        }
      },
      {
        time: 25,
        title: 'Stepping Through the Array',
        description: 'We check index 0 (10), index 1 (25), index 2 (7). Each step adds 1 to comparison count.',
        visualState: {
          array: [10, 25, 7, 18, 30],
          target: 18,
          currentIndex: 2,
          status: 'compare',
          message: 'Comparisons so far: 3. Checking Index 2 (Value 7).'
        }
      },
      {
        time: 50,
        title: 'Found at Index 3',
        description: 'Index 3 has value 18. Comparison #4 matches target! Result returned: index 3.',
        visualState: {
          array: [10, 25, 7, 18, 30],
          target: 18,
          currentIndex: 3,
          status: 'found',
          message: 'Comparison 4: 18 == 18 ✅ Found after 4 checks!'
        }
      },
      {
        time: 75,
        title: 'Best, Average, and Worst Cases',
        description: 'Best case: Item is at index 0 (1 check). Worst case: Item is at the end or missing (n checks).',
        visualState: {
          array: [10, 25, 7, 18, 30],
          target: 30,
          currentIndex: 4,
          status: 'check',
          message: 'Worst case: checking 30 at index 4 takes 5 comparisons.'
        }
      },
      {
        time: 95,
        title: 'Big-O: O(n) Efficiency',
        description: 'Because checks grow in direct proportion to list size n, linear search is O(n).',
        visualState: {
          array: [10, 25, 7, 18, 30],
          target: 18,
          currentIndex: 3,
          status: 'idle',
          message: 'Summary: Linear Search checks at most n elements. Time Complexity is O(n).'
        }
      }
    ]
  }
];
