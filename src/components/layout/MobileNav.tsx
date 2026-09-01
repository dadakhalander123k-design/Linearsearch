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
        className="group/mobilenav fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white dark:bg-[#090D1A] shadow-2xl border-r border-[#E2E8F0] dark:border-[rgba(99,102,241,0.18)] flex flex-col justify-between p-5 animate-in slide-in-from-left duration-200"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] dark:border-[rgba(99,102,241,0.18)]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#4F46E5] dark:bg-[#6366F1] flex items-center justify-center text-white shadow-xs">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-[#0F172A] dark:text-[#F8FAFC] text-base">AlgoLearn</h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Linear Search</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:bg-[#F1F5F9] dark:hover:bg-[#16203B] transition cursor-pointer"
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
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F46E5]/40 cursor-pointer ${
                    isActive
                      ? 'bg-[#EEF2FF] dark:bg-[rgba(99,102,241,0.16)] text-[#4F46E5] dark:text-[#F8FAFC] font-semibold border border-[rgba(79,70,229,0.2)] dark:border-[rgba(99,102,241,0.3)]'
                      : 'text-[#475569] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#16203B] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#4F46E5] dark:text-[#818CF8]' : 'text-[#64748B]'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ml-2 transition-opacity duration-150 ease-in-out ${
                      isNavHovered
                        ? 'opacity-100'
                        : 'opacity-0 group-hover/mobilenav:opacity-100 group-focus-within/mobilenav:opacity-100'
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
        </div>

        {/* Footer Pill */}
        <div className="pt-4 border-t border-[#E2E8F0] dark:border-[rgba(99,102,241,0.18)]">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#F1F5F9] dark:bg-[#16203B] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4F46E5] dark:text-[#818CF8]" />
              <span className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                {progress.learnerName}
              </span>
            </div>
            <span className="text-xs font-extrabold font-mono text-[#4F46E5] dark:text-[#818CF8]">
              {overallProgress}% Progress
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
