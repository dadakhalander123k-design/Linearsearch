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
        className={`group/sidebar fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-[#090D1A] border-r border-[#E2E8F0] dark:border-[rgba(99,102,241,0.18)] flex flex-col select-none shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out overflow-y-auto ${
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
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] text-[#475569] hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-[#F8FAFC] hover:bg-[#F1F5F9] dark:hover:bg-[#16203B] transition active:scale-95 flex items-center justify-center cursor-pointer shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[#4F46E5]/30"
            aria-label="Close navigation"
            title="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu Label (Appears exactly ONCE) */}
        <div className="px-5 pb-2 text-[11px] font-bold tracking-wider text-[#64748B] dark:text-[#64748B] uppercase font-mono">
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
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5]/40 cursor-pointer ${
                  isActive
                    ? 'bg-[#EEF2FF] dark:bg-[rgba(99,102,241,0.16)] text-[#4F46E5] dark:text-[#F8FAFC] font-semibold shadow-xs border border-[rgba(79,70,229,0.2)] dark:border-[rgba(99,102,241,0.3)]'
                    : 'text-[#475569] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#16203B] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#4F46E5] dark:text-[#818CF8]' : 'text-[#64748B] dark:text-[#64748B]'}`} />
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
                      ? 'bg-[#4F46E5]/10 dark:bg-[#6366F1]/20 text-[#4F46E5] dark:text-[#818CF8] font-bold border border-[#4F46E5]/20 dark:border-[#6366F1]/30'
                      : 'bg-[#F1F5F9] dark:bg-[#16203B] text-[#64748B] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)]'
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


