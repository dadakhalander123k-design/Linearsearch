import { 
  Menu, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  RotateCcw
} from 'lucide-react';
import { SectionId, UserProgressState } from '../../types';
import { sound } from '../../audio/soundEngine';
import { AlgoLearnLogo } from '../common/AlgoLearnLogo';

interface HeaderProps {
  currentSection: SectionId;
  isSidebarOpen: boolean;
  onOpenMobileMenu: () => void;
  progress: UserProgressState;
  onToggleTheme: () => void;
  onToggleSound: () => void;
  onOpenResetModal: () => void;
  overallProgress?: number;
}

export function Header({
  currentSection,
  isSidebarOpen,
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
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#0B1025]/95 backdrop-blur-md border-b border-[#E1E7F0] dark:border-[#25204B] px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between transition-colors">
      {/* LEFT: Hamburger (ONLY WHEN CLOSED) & AlgoLearn Brand Logo + Current Section */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        {/* Hamburger Menu Button: ONLY VISIBLE WHEN SIDEBAR IS CLOSED */}
        {!isSidebarOpen && (
          <button
            onClick={() => {
              sound.playClick();
              onOpenMobileMenu();
            }}
            className="w-10 h-10 rounded-xl border border-[#E1E7F0] dark:border-[#25204B] bg-white dark:bg-[#0D132C] text-[#506080] dark:text-[#AAB6D1] hover:bg-[#F8FAFC] dark:hover:bg-[#131A38] hover:text-[#11182D] dark:hover:text-[#F5F7FF] transition-all duration-150 active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46F5]/40 flex items-center justify-center shrink-0 shadow-2xs cursor-pointer"
            aria-label="Open navigation"
            title="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* AlgoLearn Official Logo */}
        <div id="header-logo-container" className="flex items-center shrink-0">
          <AlgoLearnLogo size="md" />
        </div>

        {/* Current Section Indicator Divider & Title */}
        <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-[#E1E7F0] dark:border-[#25204B]">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono bg-[#EEF0FF] dark:bg-[#6C4CFF]/15 text-[#4F46F5] dark:text-[#A58FFF] border border-[#4F46F5]/20 dark:border-[#6C4CFF]/30">
            {currentSectionName}
          </span>
        </div>
      </div>

      {/* RIGHT: Header Controls [Theme] [Audio] [Reset] */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Light / Dark Theme Toggle Button */}
        <button
          onClick={() => {
            onToggleTheme();
          }}
          className="p-2 sm:p-2.5 rounded-xl border border-[#E1E7F0] dark:border-[#25204B] bg-white dark:bg-[#0D132C] text-[#506080] dark:text-[#AAB6D1] hover:bg-[#F8FAFC] dark:hover:bg-[#131A38] hover:text-[#11182D] dark:hover:text-[#F5F7FF] transition-all duration-150 active:scale-95 flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46F5]/30 shadow-2xs"
          title={progress.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label={progress.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {progress.theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-[#506080]" />
          )}
        </button>

        {/* Sound / Audio Toggle Button */}
        <button
          onClick={() => {
            onToggleSound();
          }}
          className="p-2 sm:p-2.5 rounded-xl border border-[#E1E7F0] dark:border-[#25204B] bg-white dark:bg-[#0D132C] text-[#506080] dark:text-[#AAB6D1] hover:bg-[#F8FAFC] dark:hover:bg-[#131A38] hover:text-[#11182D] dark:hover:text-[#F5F7FF] transition-all duration-150 active:scale-95 flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46F5]/30 shadow-2xs"
          title={progress.soundEnabled ? 'Mute audio' : 'Unmute audio'}
          aria-label={progress.soundEnabled ? 'Mute audio' : 'Unmute audio'}
        >
          {progress.soundEnabled ? (
            <Volume2 className="w-4 h-4 text-[#4F46F5] dark:text-[#6C4CFF]" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#8290A8] dark:text-[#7885A5]" />
          )}
        </button>

        {/* Reset Progress Button */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenResetModal();
          }}
          className="p-2 sm:p-2.5 rounded-xl border border-[#E1E7F0] dark:border-[#25204B] bg-white dark:bg-[#0D132C] text-[#506080] dark:text-[#AAB6D1] hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:border-red-200 dark:hover:border-red-900/60 transition-all duration-150 active:scale-95 flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-500/30 shadow-2xs"
          title="Reset Progress"
          aria-label="Reset Progress"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
