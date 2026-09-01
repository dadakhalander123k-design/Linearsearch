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
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#090D1A]/95 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[rgba(99,102,241,0.18)] px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between transition-colors">
      {/* LEFT: Hamburger (ONLY WHEN CLOSED) & AlgoLearn Brand Logo + Current Section */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        {/* Hamburger Menu Button: ONLY VISIBLE WHEN SIDEBAR IS CLOSED */}
        {!isSidebarOpen && (
          <button
            onClick={() => {
              sound.playClick();
              onOpenMobileMenu();
            }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] bg-white dark:bg-[#0F172A] text-[#475569] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#16203B] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] transition-all duration-150 active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5]/40 flex items-center justify-center shrink-0 shadow-xs cursor-pointer"
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
        <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-[#E2E8F0] dark:border-[rgba(99,102,241,0.18)]">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono bg-[#EEF2FF] dark:bg-[rgba(99,102,241,0.15)] text-[#4F46E5] dark:text-[#818CF8] border border-[rgba(79,70,229,0.2)] dark:border-[rgba(99,102,241,0.3)]">
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
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] bg-white dark:bg-[#0F172A] text-[#475569] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#16203B] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] transition-all duration-150 active:scale-95 flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5]/30 shadow-xs cursor-pointer"
          title={progress.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label={progress.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {progress.theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-[#475569]" />
          )}
        </button>

        {/* Sound / Audio Toggle Button */}
        <button
          onClick={() => {
            onToggleSound();
          }}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] bg-white dark:bg-[#0F172A] text-[#475569] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#16203B] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] transition-all duration-150 active:scale-95 flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5]/30 shadow-xs cursor-pointer"
          title={progress.soundEnabled ? 'Mute audio' : 'Unmute audio'}
          aria-label={progress.soundEnabled ? 'Mute audio' : 'Unmute audio'}
        >
          {progress.soundEnabled ? (
            <Volume2 className="w-4 h-4 text-[#4F46E5] dark:text-[#6366F1]" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#64748B] dark:text-[#64748B]" />
          )}
        </button>

        {/* Reset Progress Button */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenResetModal();
          }}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] bg-white dark:bg-[#0F172A] text-[#475569] dark:text-[#94A3B8] hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:border-red-200 dark:hover:border-red-900/60 transition-all duration-150 active:scale-95 flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-red-500/30 shadow-xs cursor-pointer"
          title="Reset Progress"
          aria-label="Reset Progress"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
