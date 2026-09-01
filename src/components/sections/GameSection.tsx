import { useState } from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  ArrowRight, 
  Check, 
  FlaskConical,
  Flame
} from 'lucide-react';
import { GAME_LEVELS } from '../../data/gameData';
import { UserProgressState, SectionId } from '../../types';
import { sound } from '../../audio/soundEngine';

interface GameSectionProps {
  progress: UserProgressState;
  onCompleteLevel: (levelId: number) => void;
  onNavigate: (section: SectionId) => void;
}

export function GameSection({
  progress,
  onCompleteLevel,
  onNavigate,
}: GameSectionProps) {
  const [activeLevelId, setActiveLevelId] = useState<number>(1);
  const activeLevel = GAME_LEVELS.find((l) => l.id === activeLevelId) || GAME_LEVELS[0];
  const isLevelCompleted = progress.completedGameLevels.includes(activeLevel.id);
  const allLevelsCompleted = progress.completedGameLevels.length >= 5;

  // Level 1 state
  const [l1CurrentStep, setL1CurrentStep] = useState<number>(0);
  const [l1Completed, setL1Completed] = useState<boolean>(false);

  // Level 2 state
  const [l2Comparisons, setL2Comparisons] = useState<number>(0);
  const [l2CurrentIndex, setL2CurrentIndex] = useState<number>(-1);
  const [l2Solved, setL2Solved] = useState<boolean>(false);

  // Level 3 state
  const [l3Choice, setL3Choice] = useState<'found' | 'not_found' | null>(null);
  const [l3Feedback, setL3Feedback] = useState<string | null>(null);

  // Level 4 state
  const [l4Prediction, setL4Prediction] = useState<number | null>(null);
  const [l4Feedback, setL4Feedback] = useState<string | null>(null);

  // Level 5 Master state
  const [l5Array, setL5Array] = useState<number[]>([14, 28, 5, 39, 72, 18, 91]);
  const [l5Target, setL5Target] = useState<number>(72);
  const [l5CurrentIdx, setL5CurrentIdx] = useState<number>(-1);
  const [l5Comparisons, setL5Comparisons] = useState<number>(0);
  const [l5Solved, setL5Solved] = useState<boolean>(false);

  const handleResetLevel = () => {
    sound.playClick();
    if (activeLevel.id === 1) {
      setL1CurrentStep(0);
      setL1Completed(false);
    } else if (activeLevel.id === 2) {
      setL2Comparisons(0);
      setL2CurrentIndex(-1);
      setL2Solved(false);
    } else if (activeLevel.id === 3) {
      setL3Choice(null);
      setL3Feedback(null);
    } else if (activeLevel.id === 4) {
      setL4Prediction(null);
      setL4Feedback(null);
    } else if (activeLevel.id === 5) {
      setL5CurrentIdx(-1);
      setL5Comparisons(0);
      setL5Solved(false);
    }
  };

  const handleOpenOrReplayLevel = (levelId: number) => {
    sound.playClick();
    if (levelId === 1) {
      setL1CurrentStep(0);
      setL1Completed(false);
    } else if (levelId === 2) {
      setL2Comparisons(0);
      setL2CurrentIndex(-1);
      setL2Solved(false);
    } else if (levelId === 3) {
      setL3Choice(null);
      setL3Feedback(null);
    } else if (levelId === 4) {
      setL4Prediction(null);
      setL4Feedback(null);
    } else if (levelId === 5) {
      setL5CurrentIdx(-1);
      setL5Comparisons(0);
      setL5Solved(false);
    }
    setActiveLevelId(levelId);
  };

  const handleFinishLevel = (levelId: number) => {
    onCompleteLevel(levelId);
  };

  // Tracker milestones definition
  const milestones = [
    { num: '01', title: 'Find the Number', levelId: 1 },
    { num: '02', title: 'Find It Quickly', levelId: 2 },
    { num: '03', title: 'Is It There?', levelId: 3 },
    { num: '04', title: 'Count the Comparisons', levelId: 4 },
    { num: '05', title: 'Linear Search Master', levelId: 5 },
    { num: '06', title: 'Completion', isTrophy: true, levelId: 6 },
  ];

  // Exactly 6 Completion Cards (5 Game Levels + 1 Lab Sandbox)
  const COMPLETION_CARDS = [
    {
      id: 1,
      badge: 'LEVEL 01',
      category: 'BASICS',
      title: 'Find the Number',
      description: 'Check the elements one by one until you find the target number.',
      isLab: false,
    },
    {
      id: 2,
      badge: 'LEVEL 02',
      category: 'SPEED SEARCH',
      title: 'Find It Quickly',
      description: 'Move through the array from left to right and stop as soon as the target is found.',
      isLab: false,
    },
    {
      id: 3,
      badge: 'LEVEL 03',
      category: 'PRESENCE CHECK',
      title: 'Is It There?',
      description: 'Determine whether the target exists in the array by comparing it with each element.',
      isLab: false,
    },
    {
      id: 4,
      badge: 'LEVEL 04',
      category: 'COMPLEXITY',
      title: 'Count the Comparisons',
      description: 'Track how many elements Linear Search checks before finding the target or reaching the end.',
      isLab: false,
    },
    {
      id: 5,
      badge: 'LEVEL 05',
      category: 'MASTER CHALLENGE',
      title: 'Linear Search Master',
      description: 'Apply Linear Search confidently and understand its search process, comparisons, and results.',
      isLab: false,
    },
    {
      id: 6,
      badge: 'Sandbox',
      category: 'CUSTOM ARRAYS',
      title: 'Interactive Linear Search Lab',
      description: 'Experiment with your own arrays, choose a target value, and watch Linear Search check each element step by step.',
      actionLabel: 'Open Linear Search Lab',
      isLab: true,
    },
  ];

  const isCompletionView = activeLevelId === 6;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      
      {/* ─── 1. TOP HORIZONTAL PROGRESS TRACKER ─── */}
      <div className="py-4 px-2 sm:px-6">
        <div className="relative flex items-center justify-between max-w-4xl mx-auto">
          {/* Horizontal Connecting Track Line running behind circles */}
          <div className="absolute left-6 right-6 top-[22px] h-[2px] bg-[#E2E8F0] dark:bg-[rgba(99,102,241,0.2)] -z-0" />

          {milestones.map((m) => {
            const isMilestoneActive = m.levelId === activeLevelId;
            const isMilestoneCompleted = m.isTrophy 
              ? allLevelsCompleted 
              : progress.completedGameLevels.includes(m.levelId);

            return (
              <div 
                key={m.num} 
                className="relative z-10 flex flex-col items-center group cursor-pointer"
                onClick={() => {
                  handleOpenOrReplayLevel(m.levelId);
                }}
              >
                {/* Milestone Circular Indicator */}
                <div className="h-11 flex items-center justify-center">
                  {isMilestoneActive ? (
                    // Active Level: Large purple/indigo outer ring + solid center + white dot
                    <div className="w-10 h-10 rounded-full bg-[#4F46E5] dark:bg-[#6366F1] flex items-center justify-center shadow-lg ring-4 ring-[#4F46E5]/25 dark:ring-[#6366F1]/40 transition-transform transform scale-105">
                      <div className="w-3 h-3 rounded-full bg-white shadow-xs" />
                    </div>
                  ) : isMilestoneCompleted ? (
                    // Completed Level
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                      {m.isTrophy ? (
                        <Trophy className="w-4 h-4 text-white" />
                      ) : (
                        <Check className="w-4 h-4 stroke-[3]" />
                      )}
                    </div>
                  ) : m.isTrophy ? (
                    // Final Trophy Circle (Incomplete)
                    <div className="w-9 h-9 rounded-full border-2 border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] bg-white dark:bg-[#0F172A] flex items-center justify-center shadow-2xs">
                      <Trophy className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8]" />
                    </div>
                  ) : (
                    // Inactive Level Circle
                    <div className="w-8 h-8 rounded-full border-2 border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] bg-white dark:bg-[#0F172A] flex items-center justify-center shadow-2xs">
                      <div className="w-2.5 h-2.5 rounded-full border border-[#E2E8F0] dark:border-slate-600 bg-[#F1F5F9] dark:bg-[#16203B]" />
                    </div>
                  )}
                </div>

                {/* Milestone Number */}
                <span className={`text-[11px] font-mono font-bold mt-2 ${
                  isMilestoneActive 
                    ? 'text-[#4F46E5] dark:text-[#818CF8] font-extrabold' 
                    : isMilestoneCompleted
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-[#64748B] dark:text-[#94A3B8]'
                }`}>
                  {m.num}
                </span>

                {/* Milestone Label Underneath */}
                <span className={`text-[10px] sm:text-xs font-semibold text-center max-w-[76px] sm:max-w-[100px] line-clamp-1 sm:line-clamp-2 mt-0.5 leading-tight ${
                  isMilestoneActive 
                    ? 'text-[#4F46E5] dark:text-[#818CF8] font-bold' 
                    : 'text-[#475569] dark:text-[#94A3B8]'
                }`}>
                  {m.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Level Banner Pill */}
        <div className="flex justify-center mt-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] dark:bg-[rgba(99,102,241,0.18)] border border-[rgba(79,70,229,0.2)] dark:border-[rgba(99,102,241,0.3)] text-[#4F46E5] dark:text-[#818CF8] text-xs font-mono font-extrabold tracking-wide uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#4F46E5] dark:text-[#818CF8]" />
            {isCompletionView ? (
              <span>COMPLETION & SANDBOX • 5 CHALLENGE LEVELS & INTERACTIVE LAB</span>
            ) : (
              <span>LEVEL 0{activeLevel.levelNumber} • LEVEL {activeLevel.levelNumber}: {activeLevel.title.toUpperCase()}</span>
            )}
          </div>
        </div>
      </div>

      {/* ─── 2. PROGRESS SUMMARY CARD ─── */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          {/* Metadata Row: Yellow Pill + Progress Text */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-0.5 rounded-full text-xs font-mono font-extrabold bg-[#FEF3C7] dark:bg-amber-950/60 text-[#92400E] dark:text-amber-300 shadow-2xs border border-amber-200 dark:border-amber-800/60">
              {isCompletionView ? 'Completion & Sandbox' : `Level ${activeLevel.levelNumber} of 5`}
            </span>
            <span className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
              {progress.completedGameLevels.length}/5 Levels Completed
            </span>
          </div>

          {/* Current Level Title */}
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
            {isCompletionView ? 'Linear Search Game Completion' : activeLevel.title}
          </h2>
        </div>

        {/* Right Status Badge */}
        {isCompletionView ? (
          allLevelsCompleted ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ECFDF5] dark:bg-emerald-950/80 border border-emerald-300/90 dark:border-emerald-800 text-[#059669] dark:text-emerald-300 font-bold text-xs shadow-2xs self-start sm:self-center">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>All 5 Levels Completed</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-950/80 border border-amber-300/90 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-bold text-xs shadow-2xs self-start sm:self-center">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>{5 - progress.completedGameLevels.length} Level(s) Remaining</span>
            </div>
          )
        ) : isLevelCompleted ? (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ECFDF5] dark:bg-emerald-950/80 border border-emerald-300/90 dark:border-emerald-800 text-[#059669] dark:text-emerald-300 font-bold text-xs shadow-2xs self-start sm:self-center">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>Completed & Saved</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F1F5F9] dark:bg-[#16203B] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] text-[#64748B] dark:text-[#94A3B8] font-semibold text-xs self-start sm:self-center">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>In Progress</span>
          </div>
        )}
      </div>

      {/* ─── 4. INTERACTIVE GAMEPLAY ENGINE OR COMPLETION SECTION ─── */}
      {isCompletionView ? (
        /* ============================================================ */
        /* 6-CARD COMPLETION & LAB GRID */
        /* ============================================================ */
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] shadow-xs space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] dark:bg-[rgba(99,102,241,0.18)] border border-[rgba(79,70,229,0.2)] dark:border-[rgba(99,102,241,0.3)] text-[#4F46E5] dark:text-[#818CF8] text-xs font-mono font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Linear Search Curriculum Cards</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
                Linear Search Game Levels & Interactive Sandbox
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] max-w-2xl">
                Master every step of Linear Search through 5 sequential challenges, then experiment with custom arrays in the Interactive Lab.
              </p>
            </div>

            {/* The Exactly Six Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {COMPLETION_CARDS.map((card) => {
                const isCardDone = !card.isLab && progress.completedGameLevels.includes(card.id);

                return (
                  <div
                    key={card.id}
                    className={`rounded-2xl border p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 ${
                      card.isLab
                        ? 'bg-gradient-to-br from-[#EEF2FF] via-indigo-50/50 to-[#EEF2FF] dark:from-[#16203B] dark:via-[#1E2B4D] dark:to-[#16203B] border-[rgba(79,70,229,0.3)] dark:border-[rgba(99,102,241,0.4)] shadow-xs hover:border-[#4F46E5] dark:hover:border-[#6366F1]'
                        : isCardDone
                        ? 'bg-white dark:bg-[#0F172A] border-emerald-300/80 dark:border-emerald-900/60 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-700'
                        : 'bg-white dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] shadow-xs hover:border-[#CBD5E1] dark:hover:border-[rgba(129,140,248,0.35)]'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Level Badge + Category Header */}
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-extrabold uppercase tracking-wider ${
                          card.isLab
                            ? 'bg-indigo-100 dark:bg-indigo-950/60 text-[#4F46E5] dark:text-[#818CF8] border border-indigo-200 dark:border-indigo-800'
                            : 'bg-[#EEF2FF] dark:bg-[rgba(99,102,241,0.18)] text-[#4F46E5] dark:text-[#818CF8] border border-[rgba(79,70,229,0.2)] dark:border-[rgba(99,102,241,0.3)]'
                        }`}>
                          {card.badge}
                        </span>

                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
                            card.isLab
                              ? 'text-[#4F46E5] dark:text-[#818CF8]'
                              : 'text-[#64748B] dark:text-[#94A3B8]'
                          }`}>
                            {card.category}
                          </span>
                          {!card.isLab && isCardDone && (
                            <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Title */}
                      <h4 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-snug">
                        {card.title}
                      </h4>

                      {/* Card Description */}
                      <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed min-h-[44px]">
                        "{card.description}"
                      </p>
                    </div>

                    {/* Divider & Bottom Action Button */}
                    <div className="pt-4 mt-4 border-t border-[#E2E8F0] dark:border-[rgba(99,102,241,0.18)] flex items-center justify-between">
                      {card.isLab ? (
                        <button
                          onClick={() => {
                            sound.playNavigate();
                            onNavigate('lab');
                          }}
                          className="w-full py-2.5 px-4 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
                        >
                          <FlaskConical className="w-4 h-4" />
                          <span>Open Linear Search Lab</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            handleOpenOrReplayLevel(card.id);
                          }}
                          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-98 cursor-pointer ${
                            isCardDone
                              ? 'bg-[#F1F5F9] dark:bg-[#16203B] hover:bg-[#E2E8F0] dark:hover:bg-[#1E2B4D] text-[#475569] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)]'
                              : 'bg-[#0F172A] dark:bg-[#F8FAFC] hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-[#0F172A]'
                          }`}
                        >
                          <span>{isCardDone ? `Replay Level 0${card.id}` : `Play Level 0${card.id}`}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Footer for Completion View */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] flex items-center justify-between">
            <button
              onClick={() => {
                handleOpenOrReplayLevel(1);
              }}
              className="px-4 py-2 rounded-xl border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] text-xs font-semibold text-[#475569] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#16203B] cursor-pointer"
            >
              ← Back to Level 01
            </button>

            <button
              onClick={() => {
                sound.playNavigate();
                onNavigate('quiz');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition"
            >
              <span>Take Mastery Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] shadow-xs space-y-6">
          {/* Objective banner */}
          <div className="p-4 rounded-2xl bg-[#F1F5F9] dark:bg-[#16203B] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#4F46E5] dark:text-[#818CF8] uppercase tracking-wider">
                Objective
              </span>
              <button
                onClick={handleResetLevel}
                className="text-xs text-[#64748B] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retry / Reset</span>
              </button>
            </div>
            <p className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
              {activeLevel.objective}
            </p>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
              {activeLevel.description}
            </p>
          </div>

        {/* ---------------- LEVEL 01: CLICK SEQUENCE ---------------- */}
        {activeLevel.id === 1 && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#090D1A] text-white space-y-4 border border-[rgba(99,102,241,0.2)]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Target to find: <strong className="text-amber-400 font-extrabold text-sm">7</strong></span>
                <span className="text-[#818CF8]">Rule: Click from index 0 sequentially</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 py-4">
                {activeLevel.sampleArray.map((num, idx) => {
                  const isPast = idx < l1CurrentStep;
                  const isCurrent = idx === l1CurrentStep;
                  const isTargetFound = isPast && num === activeLevel.target;

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (idx === l1CurrentStep) {
                          if (num === activeLevel.target) {
                            sound.playFound();
                            setL1CurrentStep(idx + 1);
                            setL1Completed(true);
                            handleFinishLevel(1);
                          } else {
                            sound.playStep();
                            setL1CurrentStep(idx + 1);
                          }
                        } else {
                          sound.playIncorrect();
                        }
                      }}
                      className={`w-16 h-20 rounded-2xl flex flex-col items-center justify-center font-mono border-2 transition cursor-pointer ${
                        isTargetFound
                          ? 'bg-emerald-600/30 border-emerald-400 text-emerald-300 shadow-lg'
                          : isPast
                          ? 'bg-[#16203B]/60 border-[rgba(99,102,241,0.18)] text-slate-500'
                          : isCurrent
                          ? 'bg-[#4F46E5]/40 border-amber-400 text-amber-300 ring-2 ring-amber-400 animate-pulse'
                          : 'bg-[#16203B] border-[rgba(99,102,241,0.2)] text-white hover:border-slate-500'
                      }`}
                    >
                      <span className="text-[10px] text-slate-400">idx {idx}</span>
                      <span className="text-lg font-bold">{num}</span>
                    </button>
                  );
                })}
              </div>

              {l1Completed ? (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-1">
                  <h4 className="text-emerald-300 font-extrabold text-sm">🎉 Level 1 Complete!</h4>
                  <p className="text-xs text-slate-300">You inspected 4 → 9 → 2 → 7 in sequential order and found target 7!</p>
                </div>
              ) : (
                <p className="text-center text-xs text-slate-400 font-mono">
                  Click the boxes in order starting from index 0. Current target to click: Index {l1CurrentStep}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ---------------- LEVEL 02: BUDGET SEARCH ---------------- */}
        {activeLevel.id === 2 && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#090D1A] text-white space-y-4 border border-[rgba(99,102,241,0.2)]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Target to find: <strong className="text-amber-400 font-extrabold text-sm">23</strong></span>
                <span className="text-amber-300">Comparison Budget: {l2Comparisons} / {activeLevel.maxComparisons}</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 py-4">
                {activeLevel.sampleArray.map((num, idx) => {
                  const isChecked = idx <= l2CurrentIndex;
                  const isMatch = isChecked && num === activeLevel.target;

                  return (
                    <div
                      key={idx}
                      className={`w-16 h-20 rounded-2xl flex flex-col items-center justify-center font-mono border-2 transition ${
                        isMatch
                          ? 'bg-emerald-600/30 border-emerald-400 text-emerald-300 shadow-lg'
                          : isChecked
                          ? 'bg-[#16203B] border-[rgba(99,102,241,0.2)] text-slate-400'
                          : 'bg-[#16203B] border-[rgba(99,102,241,0.2)] text-white'
                      }`}
                    >
                      <span className="text-[10px] text-slate-400">idx {idx}</span>
                      <span className="text-lg font-bold">{isChecked ? num : '?'}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center">
                {!l2Solved ? (
                  <button
                    onClick={() => {
                      const nextIdx = l2CurrentIndex + 1;
                      if (nextIdx < activeLevel.sampleArray.length) {
                        setL2CurrentIndex(nextIdx);
                        setL2Comparisons(nextIdx + 1);
                        if (activeLevel.sampleArray[nextIdx] === activeLevel.target) {
                          sound.playFound();
                          setL2Solved(true);
                          handleFinishLevel(2);
                        } else {
                          sound.playStep();
                        }
                      }
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white font-bold text-xs shadow-xs cursor-pointer active:scale-95 transition"
                  >
                    Step & Inspect Next Item
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-1 w-full">
                    <h4 className="text-emerald-300 font-extrabold text-sm">🎉 Level 2 Complete!</h4>
                    <p className="text-xs text-slate-300">Found 23 at Index 2 using exactly 3 comparisons!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ---------------- LEVEL 03: IS IT THERE? ---------------- */}
        {activeLevel.id === 3 && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#090D1A] text-white space-y-4 border border-[rgba(99,102,241,0.2)]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Target to evaluate: <strong className="text-amber-400 font-extrabold text-sm">10</strong></span>
                <span className="text-[#818CF8]">Array: [3, 14, 8, 21, 5]</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 py-4">
                {activeLevel.sampleArray.map((num, idx) => (
                  <div key={idx} className="w-16 h-20 rounded-2xl bg-[#16203B] border border-[rgba(99,102,241,0.2)] flex flex-col items-center justify-center font-mono">
                    <span className="text-[10px] text-slate-400">idx {idx}</span>
                    <span className="text-lg font-bold text-white">{num}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-center text-xs text-slate-300">
                  After checking all elements sequentially, does the number <strong>10</strong> exist in this array?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      sound.playIncorrect();
                      setL3Choice('found');
                      setL3Feedback('❌ Incorrect. Look closely: 3, 14, 8, 21, 5 — none of these are 10!');
                    }}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      l3Choice === 'found' ? 'bg-red-500/20 border-red-500 text-red-300' : 'bg-[#16203B] border-[rgba(99,102,241,0.2)] text-white hover:bg-[#1E2B4D]'
                    }`}
                  >
                    Yes, It is Present
                  </button>

                  <button
                    onClick={() => {
                      sound.playCorrect();
                      setL3Choice('not_found');
                      setL3Feedback('✅ Correct! 10 is Not Found in the array after 5 comparisons.');
                      handleFinishLevel(3);
                    }}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      l3Choice === 'not_found' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-[#16203B] border-[rgba(99,102,241,0.2)] text-white hover:bg-[#1E2B4D]'
                    }`}
                  >
                    Not Found ❌
                  </button>
                </div>

                {l3Feedback && (
                  <p className="text-center text-xs font-mono font-bold mt-2 text-[#818CF8]">
                    {l3Feedback}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ---------------- LEVEL 04: COUNT THE COMPARISONS ---------------- */}
        {activeLevel.id === 4 && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#090D1A] text-white space-y-4 border border-[rgba(99,102,241,0.2)]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Array: [7, 4, 12, 9, 20, 5]</span>
                <span className="text-amber-400 font-bold">Target = 20</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 py-4">
                {activeLevel.sampleArray.map((num, idx) => (
                  <div key={idx} className="w-16 h-20 rounded-2xl bg-[#16203B] border border-[rgba(99,102,241,0.2)] flex flex-col items-center justify-center font-mono">
                    <span className="text-[10px] text-slate-400">idx {idx}</span>
                    <span className="text-lg font-bold text-white">{num}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-center text-xs text-slate-300">
                  How many items will Linear Search compare before finding 20?
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[1, 2, 3, 4, 5, 6].map((count) => (
                    <button
                      key={count}
                      onClick={() => {
                        setL4Prediction(count);
                        if (count === 5) {
                          sound.playCorrect();
                          setL4Feedback('✅ Spot on! 20 is at index 4 (the 5th element), so exactly 5 comparisons are made.');
                          handleFinishLevel(4);
                        } else {
                          sound.playIncorrect();
                          setL4Feedback(`❌ ${count} comparisons is incorrect. 20 is at index 4 (5th box).`);
                        }
                      }}
                      className={`w-12 h-10 rounded-xl font-mono font-bold text-xs border transition cursor-pointer ${
                        l4Prediction === count
                          ? count === 5
                            ? 'bg-emerald-600 border-emerald-400 text-white'
                            : 'bg-red-600 border-red-400 text-white'
                          : 'bg-[#16203B] border-[rgba(99,102,241,0.2)] text-white hover:bg-[#1E2B4D]'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>

                {l4Feedback && (
                  <p className="text-center text-xs font-mono font-bold mt-2 text-[#818CF8]">
                    {l4Feedback}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ---------------- LEVEL 05: LINEAR SEARCH MASTER ---------------- */}
        {activeLevel.id === 5 && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#090D1A] text-white space-y-4 border border-[rgba(99,102,241,0.2)]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Target to locate: <strong className="text-amber-400 font-extrabold text-sm">{l5Target}</strong></span>
                <span className="text-[#818CF8] font-bold">Comparisons: {l5Comparisons}</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 py-4">
                {l5Array.map((num, idx) => {
                  const isChecked = idx <= l5CurrentIdx;
                  const isMatch = isChecked && num === l5Target;
                  const isCurrent = idx === l5CurrentIdx;

                  return (
                    <div
                      key={idx}
                      className={`w-14 h-18 sm:w-16 sm:h-20 rounded-2xl flex flex-col items-center justify-center font-mono border-2 transition ${
                        isMatch
                          ? 'bg-emerald-600/40 border-emerald-400 text-emerald-300 shadow-xl'
                          : isCurrent
                          ? 'bg-[#4F46E5]/40 border-amber-400 text-amber-300 ring-2 ring-amber-400 animate-pulse'
                          : isChecked
                          ? 'bg-[#16203B]/60 border-[rgba(99,102,241,0.18)] text-slate-500'
                          : 'bg-[#16203B] border-[rgba(99,102,241,0.2)] text-white'
                      }`}
                    >
                      <span className="text-[10px] text-slate-400">idx {idx}</span>
                      <span className="text-base sm:text-lg font-bold">{num}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                {!l5Solved ? (
                  <button
                    onClick={() => {
                      const nextIdx = l5CurrentIdx + 1;
                      if (nextIdx < l5Array.length) {
                        setL5CurrentIdx(nextIdx);
                        setL5Comparisons(nextIdx + 1);
                        if (l5Array[nextIdx] === l5Target) {
                          sound.playLevelComplete();
                          setL5Solved(true);
                          handleFinishLevel(5);
                        } else {
                          sound.playStep();
                        }
                      }
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs cursor-pointer active:scale-95 transition"
                  >
                    Step & Check Index {l5CurrentIdx + 1}
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-2 w-full">
                    <h4 className="text-emerald-300 font-extrabold text-base">🎉 Linear Search Complete!</h4>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-300">
                      <span>Level Score: 100%</span>
                      <span>•</span>
                      <span>Comparisons: {l5Comparisons}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-bold">Status: Completed ✓</span>
                    </div>
                    <div className="pt-2 flex items-center justify-center gap-3">
                      <button
                        onClick={handleResetLevel}
                        className="px-4 py-2 rounded-xl border border-[rgba(99,102,241,0.2)] bg-[#16203B] hover:bg-[#1E2B4D] text-slate-300 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Replay Level 05</span>
                      </button>
                      <button
                        onClick={() => {
                          sound.playClick();
                          setActiveLevelId(6);
                        }}
                        className="px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer active:scale-95 transition"
                      >
                        <Trophy className="w-3.5 h-3.5 text-amber-300" />
                        <span>View Game Completion →</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Level Navigation Footer */}
        <div className="pt-4 border-t border-[#E2E8F0] dark:border-[rgba(99,102,241,0.18)] flex items-center justify-between">
          <button
            onClick={() => {
              if (activeLevelId > 1) {
                handleOpenOrReplayLevel(activeLevelId - 1);
              }
            }}
            disabled={activeLevelId === 1}
            className="px-4 py-2 rounded-xl border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] text-xs font-semibold text-[#475569] dark:text-[#94A3B8] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:bg-[#F1F5F9] dark:hover:bg-[#16203B]"
          >
            Previous Level
          </button>

          {activeLevelId < 5 ? (
            <button
              onClick={() => {
                handleOpenOrReplayLevel(activeLevelId + 1);
              }}
              className="px-5 py-2 rounded-xl bg-[#0F172A] dark:bg-[#F8FAFC] text-white dark:text-[#0F172A] text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-95 transition"
            >
              <span>Next Level</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playClick();
                setActiveLevelId(6);
              }}
              className="px-5 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer active:scale-95 transition"
            >
              <span>View Game Completion</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    )}
    </div>
  );
}

