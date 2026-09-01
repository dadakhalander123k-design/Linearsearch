import { useState, useEffect } from 'react';
import { 
  LayoutGrid, 
  BookOpen, 
  Sparkles, 
  Gamepad2, 
  HelpCircle, 
  TrendingUp, 
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
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  // Click-anywhere-on-main-content to close open sidebar without blocking interactions
  useEffect(() => {
    if (!isOpen) return;

    const handleDocumentClick = (event: MouseEvent | TouchEvent) => {
      const sidebarEl = document.getElementById('main-navigation-sidebar');
      if (sidebarEl && !sidebarEl.contains(event.target as Node)) {
        onClose();
      }
    };

    // Attach after the open event finishes to avoid immediate trigger
    const timer = setTimeout(() => {
      document.addEventListener('click', handleDocumentClick);
      document.addEventListener('touchend', handleDocumentClick);
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('touchend', handleDocumentClick);
    };
  }, [isOpen, onClose]);

  const navItems: { id: SectionId; label: string; icon: typeof LayoutGrid; badge: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid, badge: 'Overview' },
    { id: 'learn', label: 'Learn', icon: BookOpen, badge: `${progress.completedTheoryModules.length} / 12` },
    { id: 'visualize', label: 'Visualize', icon: Sparkles, badge: `${progress.completedVideos.length} / 2` },
    { id: 'game', label: 'Game', icon: Gamepad2, badge: `${progress.completedGameLevels.length} / 5` },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle, badge: progress.isQuizCompleted ? 'Done' : '10 Qs' },
    { id: 'progress', label: 'Progress', icon: TrendingUp, badge: `${overallProgress}%` },
  ];

  return (
    <>
      {/* Navigation Sidebar Panel */}
      <aside
        id="main-navigation-sidebar"
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
        className={`group/sidebar fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-[#0B1025] border-r border-[#E1E7F0] dark:border-[#25204B] flex flex-col select-none shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Main Navigation"
      >
        {/* Top Header with Close Button (X) */}
        <div className="p-4 sm:p-5 flex items-center justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-10 h-10 rounded-xl border border-[#E1E7F0] dark:border-[#25204B] text-[#506080] hover:text-[#11182D] dark:text-[#AAB6D1] dark:hover:text-[#F5F7FF] hover:bg-[#F1F4F9] dark:hover:bg-[#0D132C] transition active:scale-95 flex items-center justify-center cursor-pointer shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-[#4F46F5]/30"
            aria-label="Close navigation"
            title="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu Label (Appears exactly ONCE) */}
        <div className="px-5 pb-2 text-[11px] font-bold tracking-wider text-[#8290A8] dark:text-[#7885A5] uppercase font-mono">
          NAVIGATION MENU
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
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46F5]/40 ${
                  isActive
                    ? 'bg-[#EEF0FF] dark:bg-[rgba(108,76,255,0.18)] text-[#4F46F5] dark:text-[#F5F7FF] font-semibold shadow-xs border border-[#DCE3EF] dark:border-[#38306E]'
                    : 'text-[#506080] dark:text-[#AAB6D1] hover:bg-[#F1F4F9] dark:hover:bg-[#0D132C] hover:text-[#11182D] dark:hover:text-[#F5F7FF]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#4F46F5] dark:text-[#6C4CFF]' : 'text-[#8290A8] dark:text-[#7885A5]'}`} />
                  </div>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ml-2 transition-opacity duration-150 ease-in-out ${
                    isSidebarHovered
                      ? 'opacity-100'
                      : 'opacity-0 group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100'
                  } ${
                    isActive
                      ? 'bg-[#4F46F5]/10 dark:bg-[#6C4CFF]/20 text-[#4F46F5] dark:text-[#AAB6D1] font-bold border border-[#4F46F5]/20 dark:border-[#6C4CFF]/30'
                      : 'bg-[#F1F4F9] dark:bg-[#0D132C] text-[#8290A8] dark:text-[#7885A5] border border-[#E1E7F0] dark:border-[#25204B]'
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


