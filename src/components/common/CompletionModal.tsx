import { useEffect } from 'react';
import { CheckCircle2, Award, Sparkles, X, ArrowRight, BookOpen, Gamepad2, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProgressState } from '../../types';
import { sound } from '../../audio/soundEngine';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgressState;
  onOpenCertificate: () => void;
}

export function CompletionModal({
  isOpen,
  onClose,
  progress,
  onOpenCertificate,
}: CompletionModalProps) {
  // Fire short celebratory confetti bursts when modal opens
  useEffect(() => {
    if (!isOpen) return;

    sound.playLevelComplete();

    // Subtle, high-performance confetti bursts
    const end = Date.now() + 2500;
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6', '#3b82f6'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
        disableForReducedMotion: true,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="completion-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Dimmed Backdrop Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 p-6 sm:p-8 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95 cursor-pointer"
          aria-label="Close completion dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Celebration Icon & Badge */}
        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 text-3xl">
            🎉
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Curriculum Completed</span>
          </div>

          <div className="space-y-1">
            <h2
              id="completion-title"
              className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight"
            >
              Congratulations!
            </h2>
            <p className="text-base sm:text-lg font-bold text-indigo-600 dark:text-indigo-400">
              You've completed everything!
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm pt-1 leading-relaxed">
              Excellent work — you've successfully completed the entire learning journey and mastered Linear Search fundamentals.
            </p>
          </div>
        </div>

        {/* Milestone Verification Breakdown */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3">
          <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            Milestones Completed (16 / 16)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Theory */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Theory
                </span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  {progress.completedTheoryModules.length}/10 ✓
                </span>
              </div>
            </div>

            {/* Game */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Games
                </span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  {progress.completedGameLevels.length}/5 ✓
                </span>
              </div>
            </div>

            {/* Quiz */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Quiz
                </span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  Passed ✓
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={() => {
              onClose();
              onOpenCertificate();
            }}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>View Certificate</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-700/80 transition active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
