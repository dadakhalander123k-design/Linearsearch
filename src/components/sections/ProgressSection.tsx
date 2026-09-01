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
  Search,
  Eye
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

  const completedActivities = 
    progress.completedTheoryModules.length + 
    progress.completedGameLevels.length + 
    progress.completedVideos.length +
    (progress.isQuizCompleted ? 1 : 0);

  const TOTAL_ACTIVITIES = 20;

  const handleConfirmReset = () => {
    sound.playClick();
    onResetProgress();
    setShowResetModal(false);
  };

  const isCertificateUnlocked = overallProgress >= 100 || (
    progress.completedTheoryModules.length >= 12 &&
    progress.completedGameLevels.length >= 5 &&
    progress.completedVideos.length >= 2 &&
    progress.isQuizCompleted
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#0B1025] border border-[#E1E7F0] dark:border-[#25204B] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-[#EEF2FF] dark:bg-[#6C4CFF]/20 text-[#4F46F5] dark:text-[#A58FFF] border border-[#4F46F5]/20 dark:border-[#6C4CFF]/30">
              Mastery Dashboard
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Overall Completion: {overallProgress}%
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#11182D] dark:text-[#F5F7FF] tracking-tight mt-1">
            Learning Progress & Milestones
          </h2>
        </div>

        {isCertificateUnlocked && (
          <button
            onClick={onOpenCertificate}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-extrabold shadow-md hover:brightness-105 transition flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Award className="w-4 h-4" />
            <span>View Certificate</span>
          </button>
        )}
      </div>

      {/* Main Stats Grid - 4 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Completion Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1025] border border-[#E1E7F0] dark:border-[#25204B] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Overall Progress</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#11182D] dark:text-[#F5F7FF]">
            {overallProgress}%
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-[#111633] rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            <strong className="text-slate-800 dark:text-slate-200">{completedActivities}</strong> of {TOTAL_ACTIVITIES} Activities Done
          </p>
        </div>

        {/* Modules Progress Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1025] border border-[#E1E7F0] dark:border-[#25204B] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Theory Modules</span>
            <BookOpen className="w-4 h-4 text-[#4F46F5] dark:text-[#A58FFF]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#11182D] dark:text-[#F5F7FF]">
            {progress.completedTheoryModules.length} <span className="text-sm font-sans font-normal text-slate-400">/ 12</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-[#111633] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4F46F5] dark:bg-[#6C4CFF] rounded-full"
              style={{ width: `${(progress.completedTheoryModules.length / 12) * 100}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {Math.round((progress.completedTheoryModules.length / 12) * 100)}% Modules Completed
          </p>
        </div>

        {/* Game Challenges Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1025] border border-[#E1E7F0] dark:border-[#25204B] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Challenge Levels</span>
            <Gamepad2 className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#11182D] dark:text-[#F5F7FF]">
            {progress.completedGameLevels.length} <span className="text-sm font-sans font-normal text-slate-400">/ 5</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-[#111633] rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full"
              style={{ width: `${(progress.completedGameLevels.length / 5) * 100}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {Math.round((progress.completedGameLevels.length / 5) * 100)}% Levels Beaten
          </p>
        </div>

        {/* Quiz Score Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1025] border border-[#E1E7F0] dark:border-[#25204B] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Mastery Quiz</span>
            <HelpCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#11182D] dark:text-[#F5F7FF]">
            {progress.isQuizCompleted ? `${progress.quizScore}/10` : 'Not Taken'}
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-[#111633] rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${progress.isQuizCompleted ? (progress.quizScore / 10) * 100 : 0}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Status: <strong className={progress.isQuizCompleted ? 'text-emerald-500' : 'text-slate-400'}>
              {progress.isQuizCompleted ? `${Math.round((progress.quizScore / 10) * 100)}% Score` : 'Pending'}
            </strong>
          </p>
        </div>
      </div>

      {/* Curriculum Section Breakdown - 4 Core Learning Pillars */}
      <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#0B1025] border border-[#E1E7F0] dark:border-[#25204B] shadow-xs space-y-6">
        <h3 className="text-base font-bold text-[#11182D] dark:text-[#F5F7FF]">
          Curriculum Category Progress
        </h3>

        <div className="space-y-4">
          {[
            {
              title: 'Learn Theory (12 Modules)',
              completed: progress.completedTheoryModules.length,
              total: 12,
              icon: BookOpen,
              section: 'learn' as SectionId,
            },
            {
              title: 'Visualization Lessons (2 Lessons)',
              completed: progress.completedVideos.length,
              total: 2,
              icon: Eye,
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
              title: 'Mastery Quiz (Comprehensive Assessment)',
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
                className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#111633] border border-[#E1E7F0] dark:border-[#25204B] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#0B1025] border border-[#E1E7F0] dark:border-[#25204B] text-[#4F46F5] dark:text-[#A58FFF] shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#11182D] dark:text-[#F5F7FF]">
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
                      className="h-full bg-[#4F46F5] dark:bg-[#6C4CFF] rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      sound.playNavigate();
                      onNavigate(cat.section);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0B1025] border border-[#E1E7F0] dark:border-[#25204B] text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#191F44] transition cursor-pointer"
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
      <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#0B1025] border border-[#E1E7F0] dark:border-[#25204B] shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#11182D] dark:text-[#F5F7FF] flex items-center gap-2">
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
                    : 'bg-[#F8FAFC] dark:bg-[#111633]/50 border-[#E1E7F0] dark:border-[#25204B] opacity-60'
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
                <h4 className="text-sm font-bold text-[#11182D] dark:text-[#F5F7FF] mt-2">
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
      <div className="p-6 rounded-2xl bg-red-50/40 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-red-900 dark:text-red-300 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            Reset Progress
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Clear all completed modules, quiz answers, challenge levels, and restart your curriculum from scratch.
          </p>
        </div>

        <button
          onClick={() => setShowResetModal(true)}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs shadow-xs transition shrink-0 cursor-pointer"
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
