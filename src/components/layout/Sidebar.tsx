import { 
  LayoutGrid, 
  BookOpen, 
  Sparkles, 
  Gamepad2, 
  HelpCircle, 
  TrendingUp, 
  Search,
  X
} from 'lucide-react';
import { SectionId, UserProgressState } from '../../types';
import { sound } from '../../audio/soundEngine';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentSection: SectionId;
  onNavigate: (section: SectionId) => void;
  progress: UserProgressState;
  onToggleTheme?: () => void;
  onToggleSound?: () => void;
  overallProgress: number;
}

export function Sidebar({
  isOpen,
  onClose,
  currentSection,
  onNavigate,
  progress,
  overallProgress,
}: SidebarProps) {
  const navItems: { id: SectionId; label: string; icon: typeof LayoutGrid; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'learn', label: 'Learn', icon: BookOpen, badge: `${progress.completedTheoryModules.length}/10` },
    { id: 'visualize', label: 'Visualize', icon: Sparkles },
    { id: 'game', label: 'Game', icon: Gamepad2, badge: `${progress.completedGameLevels.length}/5` },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle, badge: progress.isQuizCompleted ? 'Done' : '10 Qs' },
    { id: 'progress', label: 'Progress', icon: TrendingUp, badge: `${overallProgress}%` },
  ];

  return (
    <>
      {/* Backdrop (closes sidebar when clicking outside on mobile & tablet) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          aria-label="Close navigation overlay"
        />
      )}

      {/* Navigation Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col select-none shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Main Navigation"
      >
        {/* Top Brand Section */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo Icon Container */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 shrink-0">
              <Search className="w-5 h-5" />
            </div>

            {/* Product Title, Topic & Version Badge */}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight leading-none">
                  AlgoLearn
                </h1>
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 rounded-md">
                  v1.0
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Linear Search
              </p>
            </div>
          </div>

          {/* Close Button (X) */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-slate-200/80 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
            aria-label="Close navigation"
            title="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu Label */}
        <div className="px-5 pt-5 pb-2 text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
          Navigation Menu
        </div>

        {/* Navigation Items */}
        <nav className="px-3 py-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playNavigate();
                  onNavigate(item.id);
                  // Close drawer on mobile and tablet upon navigation
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold shadow-xs border border-indigo-200/70 dark:border-indigo-800/60'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  </div>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full whitespace-nowrap ${
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
      </aside>
    </>
  );
}


