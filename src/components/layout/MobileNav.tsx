import { useState } from 'react';
import { 
  X, 
  Compass, 
  BookOpen, 
  Eye, 
  FlaskConical, 
  Gamepad2, 
  PlaySquare, 
  HelpCircle, 
  BarChart3, 
  Search,
  Sparkles
} from 'lucide-react';
import { SectionId, UserProgressState } from '../../types';
import { sound } from '../../audio/soundEngine';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentSection: SectionId;
  onNavigate: (section: SectionId) => void;
  progress: UserProgressState;
  overallProgress: number;
}

export function MobileNav({
  isOpen,
  onClose,
  currentSection,
  onNavigate,
  progress,
  overallProgress,
}: MobileNavProps) {
  const [isNavHovered, setIsNavHovered] = useState(false);

  if (!isOpen) return null;

  const navItems: { id: SectionId; label: string; icon: typeof Compass; badge: string }[] = [
    { id: 'overview', label: 'Overview', icon: Compass, badge: 'Overview' },
    { id: 'learn', label: 'Learn', icon: BookOpen, badge: `${progress.completedTheoryModules.length} / 12` },
    { id: 'visualize', label: 'Visualize', icon: Eye, badge: `${progress.completedVideos.length} / 2` },
    { id: 'game', label: 'Game', icon: Gamepad2, badge: `${progress.completedGameLevels.length} / 5` },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle, badge: progress.isQuizCompleted ? 'Done' : '10 Qs' },
    { id: 'progress', label: 'Progress', icon: BarChart3, badge: `${overallProgress}%` },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Drawer */}
      <div 
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
        className="group/mobilenav fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white dark:bg-slate-900 shadow-2xl border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between p-5 animate-in slide-in-from-left duration-200"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">AlgoLearn</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Linear Search</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playNavigate();
                    onNavigate(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200/60 dark:border-indigo-800/60'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ml-2 transition-opacity duration-150 ease-in-out ${
                      isNavHovered
                        ? 'opacity-100'
                        : 'opacity-0 group-hover/mobilenav:opacity-100 group-focus-within/mobilenav:opacity-100'
                    } ${
                      isActive
                        ? 'bg-indigo-200/60 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Pill */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {progress.learnerName}
              </span>
            </div>
            <span className="text-xs font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
              {overallProgress}% Progress
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
