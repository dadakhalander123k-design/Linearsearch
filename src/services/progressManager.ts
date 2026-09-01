import { UserProgressState } from '../types';
import { ACHIEVEMENTS } from '../data/achievementsData';
import { sound } from '../audio/soundEngine';

const STORAGE_KEY = 'algolearn_linear_search_progress_v1';

export const INITIAL_PROGRESS: UserProgressState = {
  completedTheoryModules: [],
  completedVideos: [],
  completedGameLevels: [],
  completedLabActivities: [],
  isQuizCompleted: false,
  quizScore: 0,
  quizTotal: 10,
  achievements: [],
  learnerName: 'Young Explorer',
  soundEnabled: true,
  theme: 'light',
};

type ProgressListener = (state: UserProgressState, newAchievement?: string) => void;

class ProgressManager {
  private state: UserProgressState = INITIAL_PROGRESS;
  private listeners: ProgressListener[] = [];

  constructor() {
    this.loadState();
  }

  private loadState() {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.state = {
          ...INITIAL_PROGRESS,
          ...parsed,
        };
        sound.setMuted(!this.state.soundEnabled);
      }
    } catch {
      this.state = { ...INITIAL_PROGRESS };
    }
  }

  private saveState() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {}
  }

  public subscribe(listener: ProgressListener): () => void {
    this.listeners.push(listener);
    listener(this.state);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify(newAchievement?: string) {
    this.saveState();
    this.listeners.forEach(l => l({ ...this.state }, newAchievement));
  }

  public getState(): UserProgressState {
    return { ...this.state };
  }

  public getProgress(): UserProgressState {
    return { ...this.state };
  }

  public resetProgress() {
    this.resetAllProgress();
  }

  public setLearnerName(name: string) {
    this.state.learnerName = name || 'Young Explorer';
    this.notify();
  }

  public toggleSound(): boolean {
    this.state.soundEnabled = !this.state.soundEnabled;
    sound.setMuted(!this.state.soundEnabled);
    this.notify();
    return this.state.soundEnabled;
  }

  public toggleTheme(): 'light' | 'dark' {
    this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
    sound.playThemeToggle();
    this.notify();
    return this.state.theme;
  }

  public setTheme(theme: 'light' | 'dark') {
    this.state.theme = theme;
    this.notify();
  }

  // --- Progress & Achievements Checkers ---

  private checkAchievements() {
    const unlockedNow: string[] = [];
    const current = new Set(this.state.achievements);

    // 1. First Search: Complete your first learning activity
    const totalActivities = 
      this.state.completedTheoryModules.length + 
      this.state.completedVideos.length + 
      this.state.completedGameLevels.length + 
      (this.state.isQuizCompleted ? 1 : 0);

    if (totalActivities >= 1 && !current.has('first_search')) {
      current.add('first_search');
      unlockedNow.push('first_search');
    }

    // 2. Search Explorer: Complete 6 theory modules (half of 12)
    if (this.state.completedTheoryModules.length >= 6 && !current.has('search_explorer')) {
      current.add('search_explorer');
      unlockedNow.push('search_explorer');
    }

    // 3. Video Learner: Watch both video lessons
    if (this.state.completedVideos.length >= 2 && !current.has('video_learner')) {
      current.add('video_learner');
      unlockedNow.push('video_learner');
    }

    // 4. Game Player: Complete all 5 game levels
    if (this.state.completedGameLevels.length >= 5 && !current.has('game_player')) {
      current.add('game_player');
      unlockedNow.push('game_player');
    }

    // 5. Quiz Champion: Complete entire quiz
    if (this.state.isQuizCompleted && !current.has('quiz_champion')) {
      current.add('quiz_champion');
      unlockedNow.push('quiz_champion');
    }

    // 6. Linear Search Master: Complete all 20 required activities (12 theory, 2 videos, 5 games, 1 quiz)
    const isMaster = 
      this.state.completedTheoryModules.length >= 12 &&
      this.state.completedVideos.length >= 2 &&
      this.state.completedGameLevels.length >= 5 &&
      this.state.isQuizCompleted;

    if (isMaster && !current.has('linear_search_master')) {
      current.add('linear_search_master');
      unlockedNow.push('linear_search_master');
      if (!this.state.completionDate) {
        this.state.completionDate = new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
      }
    }

    this.state.achievements = Array.from(current);
    return unlockedNow;
  }

  // --- Activities ---

  public completeTheoryModule(moduleId: number) {
    if (!this.state.completedTheoryModules.includes(moduleId)) {
      this.state.completedTheoryModules = Array.from(new Set([...this.state.completedTheoryModules, moduleId]));
      sound.playCorrect();
      const unlocked = this.checkAchievements();
      this.notify(unlocked[0]);
    }
  }

  public completeVideo(videoId: number) {
    if (!this.state.completedVideos.includes(videoId)) {
      this.state.completedVideos = Array.from(new Set([...this.state.completedVideos, videoId]));
      sound.playCorrect();
      const unlocked = this.checkAchievements();
      this.notify(unlocked[0]);
    }
  }

  public completeGameLevel(levelId: number) {
    if (!this.state.completedGameLevels.includes(levelId)) {
      this.state.completedGameLevels = Array.from(new Set([...this.state.completedGameLevels, levelId]));
      sound.playLevelComplete();
      const unlocked = this.checkAchievements();
      this.notify(unlocked[0]);
    }
  }

  public completeLabActivity(activityId: string) {
    if (!this.state.completedLabActivities.includes(activityId)) {
      this.state.completedLabActivities = Array.from(new Set([...this.state.completedLabActivities, activityId]));
      sound.playCorrect();
      this.notify();
    }
  }

  public completeQuiz(score: number, total: number = 10) {
    this.state.isQuizCompleted = true;
    this.state.quizScore = score;
    this.state.quizTotal = total;
    sound.playLevelComplete();
    const unlocked = this.checkAchievements();
    this.notify(unlocked[0]);
  }

  public getOverallProgressPercentage(): number {
    // 12 theory modules + 5 game levels + 2 visualization lessons + 1 mastery quiz = 20 total activities
    const TOTAL_REQUIRED_ACTIVITIES = 20;
    const completedCount = 
      this.state.completedTheoryModules.length +
      this.state.completedGameLevels.length +
      this.state.completedVideos.length +
      (this.state.isQuizCompleted ? 1 : 0);
    
    return Math.min(100, Math.max(0, Math.round((completedCount / TOTAL_REQUIRED_ACTIVITIES) * 100)));
  }

  public isFullyCompleted(): boolean {
    return (
      this.state.completedTheoryModules.length >= 12 &&
      this.state.completedVideos.length >= 2 &&
      this.state.completedGameLevels.length >= 5 &&
      this.state.isQuizCompleted === true
    );
  }

  public markCelebrationShown() {
    this.state.hasCelebrated100Percent = true;
    this.saveState();
  }

  public resetAllProgress() {
    const savedTheme = this.state.theme;
    const savedSound = this.state.soundEnabled;
    const savedName = this.state.learnerName;

    this.state = {
      ...INITIAL_PROGRESS,
      theme: savedTheme,
      soundEnabled: savedSound,
      learnerName: savedName,
    };
    sound.playClick();
    this.notify();
  }
}

export const progressManager = new ProgressManager();
