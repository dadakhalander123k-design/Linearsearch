import { useState, useEffect } from 'react';
import { SectionId, UserProgressState, Achievement } from './types';
import { progressManager } from './services/progressManager';
import { sound } from './audio/soundEngine';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { OverviewSection } from './components/sections/OverviewSection';
import { LearnSection } from './components/sections/LearnSection';
import { VisualizeSection } from './components/sections/VisualizeSection';
import { LabSection } from './components/sections/LabSection';
import { GameSection } from './components/sections/GameSection';
import { VideoSection } from './components/sections/VideoSection';
import { QuizSection } from './components/sections/QuizSection';
import { ProgressSection } from './components/sections/ProgressSection';
import { AchievementToast } from './components/common/AchievementToast';
import { CertificateModal } from './components/certificate/CertificateModal';
import { ResetModal } from './components/common/ResetModal';
import { CompletionModal } from './components/common/CompletionModal';

export default function App() {
  const [currentSection, setCurrentSection] = useState<SectionId>('overview');
  const [progress, setProgress] = useState<UserProgressState>(progressManager.getProgress());
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState<boolean>(false);
  const [unlockedAchievementId, setUnlockedAchievementId] = useState<string | null>(null);

  // Subscribe to progress manager updates & achievement unlock events
  useEffect(() => {
    const unsubscribe = progressManager.subscribe((newProgress, unlocked) => {
      setProgress(newProgress);
      if (unlocked) {
        setUnlockedAchievementId(unlocked);
      }
    });
    return unsubscribe;
  }, []);

  // Overall progress percentage across all curriculum parts
  const overallProgress = progressManager.getOverallProgressPercentage();

  // Check for 100% completion celebration trigger (strictly on genuine 100% completion)
  useEffect(() => {
    if (overallProgress === 100 && !progress.hasCelebrated100Percent) {
      setIsCompletionModalOpen(true);
      progressManager.markCelebrationShown();
    }
  }, [overallProgress, progress.hasCelebrated100Percent]);
  useEffect(() => {
    if (progress.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [progress.theme]);

  // Navigation handler
  const handleNavigate = (section: SectionId) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      {/* Navigation Sidebar (Desktop + Mobile overlay drawer) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentSection={currentSection}
        onNavigate={handleNavigate}
        progress={progress}
        onToggleTheme={() => progressManager.toggleTheme()}
        onToggleSound={() => progressManager.toggleSound()}
        overallProgress={overallProgress}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        isSidebarOpen ? 'lg:pl-72' : 'lg:pl-0'
      }`}>
        {/* Top Header */}
        <Header
          currentSection={currentSection}
          onOpenMobileMenu={() => setIsSidebarOpen((prev) => !prev)}
          progress={progress}
          onToggleTheme={() => progressManager.toggleTheme()}
          onToggleSound={() => progressManager.toggleSound()}
          onOpenResetModal={() => setIsResetModalOpen(true)}
          overallProgress={overallProgress}
        />

        {/* Dynamic Section View with Balanced Centering */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {currentSection === 'overview' && (
            <OverviewSection onNavigate={handleNavigate} />
          )}

          {currentSection === 'learn' && (
            <LearnSection
              progress={progress}
              onCompleteModule={(id) => progressManager.completeTheoryModule(id)}
              onNavigate={handleNavigate}
            />
          )}

          {currentSection === 'visualize' && (
            <VisualizeSection />
          )}

          {currentSection === 'lab' && (
            <LabSection
              onCompleteLabActivity={(id) => progressManager.completeLabActivity(id)}
            />
          )}

          {currentSection === 'game' && (
            <GameSection
              progress={progress}
              onCompleteLevel={(id) => progressManager.completeGameLevel(id)}
              onNavigate={handleNavigate}
            />
          )}

          {currentSection === 'video' && (
            <VideoSection
              progress={progress}
              onCompleteVideo={(id) => progressManager.completeVideo(id)}
              onNavigate={handleNavigate}
            />
          )}

          {currentSection === 'quiz' && (
            <QuizSection
              progress={progress}
              onCompleteQuiz={(score, total) => progressManager.completeQuiz(score, total)}
              onNavigate={handleNavigate}
              onOpenCertificate={() => setIsCertificateOpen(true)}
            />
          )}

          {currentSection === 'progress' && (
            <ProgressSection
              progress={progress}
              overallProgress={overallProgress}
              onResetProgress={() => progressManager.resetProgress()}
              onOpenCertificate={() => setIsCertificateOpen(true)}
              onNavigate={handleNavigate}
            />
          )}
        </main>
      </div>

      {/* Achievement Unlocked Toast Notification */}
      <AchievementToast
        achievementId={unlockedAchievementId}
        onClose={() => setUnlockedAchievementId(null)}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        progress={progress}
        onUpdateName={(name) => progressManager.setLearnerName(name)}
      />

      {/* Reset Progress Confirmation Modal */}
      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmReset={() => progressManager.resetProgress()}
      />

      {/* 100% Congratulatory Completion Modal */}
      <CompletionModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        progress={progress}
        onOpenCertificate={() => setIsCertificateOpen(true)}
      />
    </div>
  );
}
