import { GameLevel } from '../types';

export const GAME_LEVELS: GameLevel[] = [
  {
    id: 1,
    levelNumber: 1,
    badge: 'Level 01',
    title: 'Find the Number',
    objective: 'Find the target number 7 by clicking items in linear order from index 0.',
    description: 'Linear Search must check items one by one starting from the beginning. Click the boxes in order to find 7!',
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
    title: 'Find It Quickly',
    objective: 'Find target 23 within exactly 3 comparisons.',
    description: 'You have a comparison budget! Step through the array until you locate 23. Can you do it in exactly 3 steps?',
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
    title: 'Is It There?',
    objective: 'Inspect the array and decide: Is 10 present, or Not Found?',
    description: 'Check each item sequentially until you reach the end. Does 10 exist in this list?',
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
    title: 'Count the Comparisons',
    objective: 'Predict how many items Linear Search will check to find 20.',
    description: 'Before the computer starts, predict the exact comparison count required to find 20 in the array [7, 4, 12, 9, 20, 5].',
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
    title: 'Linear Search Master',
    objective: 'Complete the Master Challenge with a dynamic randomized array and target.',
    description: 'Put all your skills together! Step through the randomized list, track comparisons in real-time, and confirm when the target is found or absent.',
    type: 'master_search',
    sampleArray: [8, 19, 42, 15, 63, 27, 91, 34],
    target: 63,
    expectedComparisons: 5,
    hint: 'Start at index 0 and step forward one by one until the target value matches!'
  }
];
