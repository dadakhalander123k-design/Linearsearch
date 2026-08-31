import { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_search',
    title: 'First Search',
    description: 'Complete your first learning activity.',
    icon: '🔍',
    color: 'purple',
    unlocked: false,
  },
  {
    id: 'search_explorer',
    title: 'Search Explorer',
    description: 'Complete 5 theory modules.',
    icon: '🧭',
    color: 'blue',
    unlocked: false,
  },
  {
    id: 'video_learner',
    title: 'Video Learner',
    description: 'Watch both video lessons completely.',
    icon: '🎬',
    color: 'emerald',
    unlocked: false,
  },
  {
    id: 'game_player',
    title: 'Game Player',
    description: 'Complete all 5 game levels.',
    icon: '🎮',
    color: 'amber',
    unlocked: false,
  },
  {
    id: 'quiz_champion',
    title: 'Quiz Champion',
    description: 'Complete the entire quiz challenge.',
    icon: '🥇',
    color: 'orange',
    unlocked: false,
  },
  {
    id: 'linear_search_master',
    title: 'Linear Search Master',
    description: 'Complete the core Linear Search curriculum.',
    icon: '🏆',
    color: 'yellow',
    unlocked: false,
  },
];

export const ACHIEVEMENTS_DATA = ACHIEVEMENTS;
