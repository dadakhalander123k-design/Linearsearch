export type SectionId = 
  | 'overview' 
  | 'learn' 
  | 'visualize' 
  | 'lab' 
  | 'game' 
  | 'video' 
  | 'quiz' 
  | 'progress';

export interface TheoryModule {
  id: number;
  slug: string;
  title: string;
  badge: string;
  subtitle: string;
  summary: string;
  realLifeExample?: {
    icon: string;
    title: string;
    description: string;
  };
  computerExamples?: string[];
  keyTakeaway: string;
  content: Array<{
    type: 
      | 'paragraph' 
      | 'callout' 
      | 'table' 
      | 'array_visual' 
      | 'code' 
      | 'step_list' 
      | 'key_value_cards'
      | 'visual_diagram'
      | 'step_trace'
      | 'index_diagram'
      | 'flowchart'
      | 'not_found_visual'
      | 'comparison_cases'
      | 'complexity_breakdown'
      | 'use_case_comparison'
      | 'multi_code'
      | 'complexity_summary';
    heading?: string;
    text?: string;
    alertType?: 'info' | 'success' | 'warning' | 'tip';
    data?: any;
  }>;
}

export interface VideoLesson {
  id: number;
  title: string;
  durationSeconds: number;
  durationLabel: string;
  description: string;
  topicsCovered: string[];
  chapters: {
    time: number;
    title: string;
    description: string;
    codeSnippet?: string;
    visualState?: {
      array: number[];
      target: number;
      currentIndex: number;
      status: 'check' | 'compare' | 'found' | 'not_found' | 'idle';
      message: string;
    };
  }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  context?: string;
  codeSnippet?: string;
  options: {
    key: string;
    label: string;
    text: string;
  }[];
  correctKey: string;
  explanation: string;
}

export interface GameLevel {
  id: number;
  title: string;
  levelNumber: number;
  badge: string;
  objective: string;
  description: string;
  type: 'click_sequence' | 'budget_search' | 'boolean_detect' | 'count_comparisons' | 'master_search';
  sampleArray: number[];
  target: number;
  maxComparisons?: number;
  isTargetPresent?: boolean;
  expectedComparisons?: number;
  hint: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserProgressState {
  completedTheoryModules: number[]; // Array of module ids
  completedVideos: number[];        // Array of video ids
  completedGameLevels: number[];    // Array of game level ids
  completedLabActivities: string[]; // Set of lab experiment ids
  isQuizCompleted: boolean;
  quizScore: number;
  quizTotal: number;
  achievements: string[];           // Array of achievement IDs
  learnerName: string;
  completionDate?: string;
  hasCelebrated100Percent?: boolean;
  soundEnabled: boolean;
  theme: 'light' | 'dark';
}
