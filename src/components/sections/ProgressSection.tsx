import { useState } from 'react';
import { 
  BarChart3, 
  Award, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Flame, 
  BookOpen, 
  Gamepad2, 
  PlaySquare, 
  FlaskConical, 
  HelpCircle, 
  Trophy,
  ShieldAlert,
  Search
} from 'lucide-react';
import { UserProgressState, SectionId } from '../../types';
import { ACHIEVEMENTS_DATA } from '../../data/achievementsData';
import { ResetModal } from '../common/ResetModal';
import { sound } from '../../audio/soundEngine';

interface ProgressSectionProps {
  progress: UserProgressState;
  overallProgress: number;
  onResetProgress: () => void;
  onOpenCertificate: () => void;
  onNavigate: (section: SectionId) => void;
}

export function ProgressSection({
  progress,
  overallProgress,
  onResetProgress,
  onOpenCertificate,
  onNavigate,
}: ProgressSectionProps) {
  const [showResetModal, setShowResetModal] = useState<boolean>(false);

  // Derive Rank Title based on XP
  let rankTitle = 'Beginner Searcher';
  let nextRankXp = 50;
  if (progress.xp >= 150) {
    rankTitle = 'Linear Search Grandmaster';
    nextRankXp = 200;
  } else if (progress.xp >= 100) {
    rankTitle = 'Algorithm Analyst';
    nextRankXp = 150;
  } else if (progress.xp >= 50) {
    rankTitle = 'Sequential Scout';
    nextRankXp = 100;
  }

  const handleConfirmReset = () => {
    sound.playClick();
    onResetProgress();
    setShowResetModal(false);
  };

  const isCertificateUnlocked = overallProgress >= 100 || progress.isQuizCompleted;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              Mastery Dashboard
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Overall Completion: {overallProgress}%
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Learning Progress & Milestones
          </h2>
        </div>

        {isCertificateUnlocked && (
          <button
            onClick={onOpenCertificate}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-extrabold shadow-md hover:brightness-105 transition flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>View Certificate</span>
          </button>
        )}
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* XP Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Experience</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
            {progress.xp} <span className="text-sm font-sans font-bold text-amber-500">XP</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Rank: <strong className="text-slate-800 dark:text-slate-200">{rankTitle}</strong>
          </p>
        </div>

        {/* Modules Progress Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Theory Modules</span>
            <BookOpen className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
            {progress.completedTheoryModules.length} <span className="text-sm font-sans font-normal text-slate-400">/ 10</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full"
              style={{ width: `${(progress.completedTheoryModules.length / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Game Challenges Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Challenge Levels</span>
            <Gamepad2 className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
            {progress.completedGameLevels.length} <span className="text-sm font-sans font-normal text-slate-400">/ 5</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full"
              style={{ width: `${(progress.completedGameLevels.length / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Quiz Score Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Mastery Quiz</span>
            <HelpCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
            {progress.isQuizCompleted ? `${progress.quizScore}/10` : 'Not Taken'}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Status: <strong className={progress.isQuizCompleted ? 'text-emerald-500' : 'text-slate-400'}>
              {progress.isQuizCompleted ? 'Passed (≥70%)' : 'Pending'}
            </strong>
          </p>
        </div>
      </div>

      {/* Curriculum Section Breakdown */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Curriculum Category Progress
        </h3>

        <div className="space-y-4">
          {[
            {
              title: 'Learn Theory (10 Modules)',
              completed: progress.completedTheoryModules.length,
              total: 10,
              icon: BookOpen,
              section: 'learn' as SectionId,
            },
            {
              title: 'Visualize Linear Search',
              completed: 1,
              total: 1,
              icon: Search,
              section: 'visualize' as SectionId,
            },
            {
              title: 'Challenge Games (5 Levels)',
              completed: progress.completedGameLevels.length,
              total: 5,
              icon: Gamepad2,
              section: 'game' as SectionId,
            },
            {
              title: 'Mastery Quiz (10 Questions)',
              completed: progress.isQuizCompleted ? 1 : 0,
              total: 1,
              icon: HelpCircle,
              section: 'quiz' as SectionId,
            },
          ].map((cat, idx) => {
            const Icon = cat.icon;
            const pct = Math.round((cat.completed / cat.total) * 100);
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {cat.title}
                    </h4>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {cat.completed} of {cat.total} finished ({pct}%)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-28 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      sound.playNavigate();
                      onNavigate(cat.section);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Open
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements Showcase */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Achievements & Badges
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {progress.achievements.length} of {ACHIEVEMENTS_DATA.length} Unlocked
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS_DATA.map((ach) => {
            const isUnlocked = progress.achievements.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{ach.icon}</span>
                  {isUnlocked ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold">
                      Unlocked
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 font-mono text-[10px]">
                      Locked
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                  {ach.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Danger Zone: Reset Progress */}
      <div className="p-6 rounded-3xl bg-red-50/40 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-red-900 dark:text-red-300 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            Reset Progress
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Clear all completed modules, quiz answers, earned XP, and restart your curriculum from scratch.
          </p>
        </div>

        <button
          onClick={() => setShowResetModal(true)}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs shadow-xs transition shrink-0"
        >
          Reset All Progress
        </button>
      </div>

      {/* Reset Progress Confirmation Modal */}
      <ResetModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirmReset={handleConfirmReset}
      />
    </div>
  );
}
