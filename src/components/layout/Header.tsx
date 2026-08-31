import { 
  Menu, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  RotateCcw
} from 'lucide-react';
import { SectionId, UserProgressState } from '../../types';

interface HeaderProps {
  currentSection: SectionId;
  onOpenMobileMenu: () => void;
  progress: UserProgressState;
  onToggleTheme: () => void;
  onToggleSound: () => void;
  onOpenResetModal: () => void;
  overallProgress?: number;
}

export function Header({
  currentSection,
  onOpenMobileMenu,
  progress,
  onToggleTheme,
  onToggleSound,
  onOpenResetModal,
}: HeaderProps) {
  const sectionDisplayNames: Record<SectionId, string> = {
    overview: 'Overview',
    learn: 'Learn',
    visualize: 'Visualize',
    lab: 'Visualize',
    game: 'Game',
    video: 'Learn',
    quiz: 'Quiz',
    progress: 'Progress',
  };

  const currentSectionName = sectionDisplayNames[currentSection] || 'Overview';

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between transition-colors">
      {/* LEFT: Hamburger & AlgoLearn Brand + Current Section */}
      <div className="flex items-center gap-3.5">
        {/* Hamburger Menu Button */}
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 flex items-center justify-center shrink-0"
          aria-label="Open navigation"
          title="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand and Current Section Title */}
        <div className="flex flex-col">
          <h1 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
            AlgoLearn
          </h1>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5 leading-none">
            {currentSectionName}
          </span>
        </div>
      </div>

      {/* RIGHT: Header Controls [Theme] [Audio] [Reset] */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Light / Dark Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95 flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
          title={progress.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label={progress.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {progress.theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </button>

        {/* Sound / Audio Toggle Button */}
        <button
          onClick={onToggleSound}
          className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95 flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
          title={progress.soundEnabled ? 'Mute audio' : 'Unmute audio'}
          aria-label={progress.soundEnabled ? 'Mute audio' : 'Unmute audio'}
        >
          {progress.soundEnabled ? (
            <Volume2 className="w-4 h-4 text-indigo-500" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {/* Reset Progress Button */}
        <button
          onClick={onOpenResetModal}
          className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:border-red-200 dark:hover:border-red-900/60 transition active:scale-95 flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-red-500/20"
          title="Reset Progress"
          aria-label="Reset Progress"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
