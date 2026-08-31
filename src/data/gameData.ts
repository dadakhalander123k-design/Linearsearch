import { GameLevel } from '../types';

export const GAME_LEVELS: (GameLevel & { category?: string })[] = [
  {
    id: 1,
    levelNumber: 1,
    badge: 'Level 01',
    category: 'BASICS',
    title: 'Find the Number',
    objective: 'Find the target number 7 by clicking items in linear order from index 0.',
    description: 'Check the elements one by one until you find the target number.',
    type: 'click_sequence',
    sampleArray: [4, 9, 2, 7, 5],
    target: 7,
    expectedComparisons: 4,
    hint: 'Click Index 0 (4), then Index 1 (9), then Index 2 (2), then Index 3 (7).'
  },
  {
    id: 2,
    levelNumber: 2,
    badge: 'Level 02',
    category: 'SPEED SEARCH',
    title: 'Find It Quickly',
    objective: 'Find target 23 within exactly 3 comparisons.',
    description: 'Move through the array from left to right and stop as soon as the target is found.',
    type: 'budget_search',
    sampleArray: [11, 6, 23, 8, 15],
    target: 23,
    maxComparisons: 3,
    expectedComparisons: 3,
    hint: '23 is at index 2. It requires checking index 0, index 1, and index 2 (3 comparisons).'
  },
  {
    id: 3,
    levelNumber: 3,
    badge: 'Level 03',
    category: 'PRESENCE CHECK',
    title: 'Is It There?',
    objective: 'Inspect the array and decide: Is 10 present, or Not Found?',
    description: 'Determine whether the target exists in the array by comparing it with each element.',
    type: 'boolean_detect',
    sampleArray: [3, 14, 8, 21, 5],
    target: 10,
    isTargetPresent: false,
    expectedComparisons: 5,
    hint: 'Examine all 5 numbers: 3, 14, 8, 21, 5. None of them equal 10!'
  },
  {
    id: 4,
    levelNumber: 4,
    badge: 'Level 04',
    category: 'COMPLEXITY',
    title: 'Count the Comparisons',
    objective: 'Predict how many items Linear Search will check to find 20.',
    description: 'Track how many elements Linear Search checks before finding the target or reaching the end.',
    type: 'count_comparisons',
    sampleArray: [7, 4, 12, 9, 20, 5],
    target: 20,
    expectedComparisons: 5,
    hint: 'Count positions: 7 (1), 4 (2), 12 (3), 9 (4), 20 (5). It takes 5 comparisons!'
  },
  {
    id: 5,
    levelNumber: 5,
    badge: 'Level 05',
    category: 'MASTER CHALLENGE',
    title: 'Linear Search Master',
    objective: 'Complete the Master Challenge with a dynamic randomized array and target.',
    description: 'Apply Linear Search confidently and understand its search process, comparisons, and results.',
    type: 'master_search',
    sampleArray: [8, 19, 42, 15, 63, 27, 91, 34],
    target: 63,
    expectedComparisons: 5,
    hint: 'Start at index 0 and step forward one by one until the target value matches!'
  }
];

