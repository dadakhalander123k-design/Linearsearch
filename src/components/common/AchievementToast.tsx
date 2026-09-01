import { Trophy, X } from 'lucide-react';
import { ACHIEVEMENTS } from '../../data/achievementsData';

interface AchievementToastProps {
  achievementId: string | null;
  onClose: () => void;
}

export function AchievementToast({ achievementId, onClose }: AchievementToastProps) {
  if (!achievementId) return null;

  const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
  if (!achievement) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#0B1025] text-[#11182D] dark:text-[#F5F7FF] rounded-2xl shadow-2xl border border-amber-500/40 dark:border-amber-500/30">
        <div className="p-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl text-slate-950 shadow-md">
          <Trophy className="w-6 h-6 animate-bounce" />
        </div>
        <div className="flex-1 pr-2">
          <span className="text-[11px] font-bold tracking-wider uppercase text-amber-600 dark:text-amber-400 font-mono">
            Achievement Unlocked!
          </span>
          <h4 className="text-sm font-bold text-[#11182D] dark:text-[#F5F7FF]">{achievement.title}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{achievement.description}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#191F44] transition cursor-pointer"
          aria-label="Dismiss achievement notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
