import { useState } from 'react';
import { 
  Gamepad2, 
  Trophy, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  Check, 
  X, 
  FlaskConical,
  Flame,
  Award
} from 'lucide-react';
import { GAME_LEVELS } from '../../data/gameData';
import { GameLevel, UserProgressState, SectionId } from '../../types';
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

  const handleFinishLevel = (levelId: number) => {
    onCompleteLevel(levelId);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              Level {activeLevel.levelNumber} of 5
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {progress.completedGameLevels.length}/5 Completed (+15 XP each)
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            {activeLevel.title}
          </h2>
        </div>

        {/* Level indicator status */}
        {isLevelCompleted && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Completed & Saved</span>
          </div>
        )}
      </div>

      {/* Level Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {GAME_LEVELS.map((lvl) => {
          const isDone = progress.completedGameLevels.includes(lvl.id);
          const isCurrent = lvl.id === activeLevelId;
          return (
            <button
              key={lvl.id}
              onClick={() => {
                sound.playClick();
                setActiveLevelId(lvl.id);
              }}
              className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                isCurrent
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md font-bold'
                  : isDone
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-extrabold uppercase">
                  {lvl.badge}
                </span>
                {isDone ? (
                  <Check className={`w-3.5 h-3.5 ${isCurrent ? 'text-slate-950' : 'text-emerald-500'}`} />
                ) : (
                  <Flame className={`w-3.5 h-3.5 ${isCurrent ? 'text-slate-950' : 'text-amber-500'}`} />
                )}
              </div>
              <span className="text-xs font-bold mt-2 truncate">{lvl.title}</span>
            </button>
          );
        })}
      </div>

      {/* Level Card & Interactive Engine */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Objective banner */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Objective
            </span>
            <button
              onClick={handleResetLevel}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Retry / Reset</span>
            </button>
          </div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            {activeLevel.objective}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {activeLevel.description}
          </p>
        </div>

        {/* ---------------- LEVEL 01: CLICK SEQUENCE ---------------- */}
        {activeLevel.id === 1 && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-950 text-white space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Target to find: <strong className="text-amber-400 font-extrabold text-sm">7</strong></span>
                <span className="text-indigo-300">Rule: Click from index 0 sequentially</span>
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
                      className={`w-16 h-20 rounded-2xl flex flex-col items-center justify-center font-mono border-2 transition ${
                        isTargetFound
                          ? 'bg-emerald-600/30 border-emerald-400 text-emerald-300 shadow-lg'
                          : isPast
                          ? 'bg-slate-900/50 border-slate-700 text-slate-500'
                          : isCurrent
                          ? 'bg-indigo-600/40 border-amber-400 text-amber-300 ring-2 ring-amber-400 animate-pulse'
                          : 'bg-slate-900 border-slate-700 text-white hover:border-slate-500'
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
                  <p className="text-xs text-slate-300">You inspected 4 → 9 → 2 → 7 in sequential order and found target 7! (+15 XP)</p>
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
            <div className="p-6 rounded-2xl bg-slate-950 text-white space-y-4">
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
                          ? 'bg-slate-900 border-slate-600 text-slate-400'
                          : 'bg-slate-900 border-slate-700 text-white'
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
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md"
                  >
                    Step & Inspect Next Item
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-1 w-full">
                    <h4 className="text-emerald-300 font-extrabold text-sm">🎉 Level 2 Complete!</h4>
                    <p className="text-xs text-slate-300">Found 23 at Index 2 using exactly 3 comparisons! (+15 XP)</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ---------------- LEVEL 03: IS IT THERE? ---------------- */}
        {activeLevel.id === 3 && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-950 text-white space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Target to evaluate: <strong className="text-amber-400 font-extrabold text-sm">10</strong></span>
                <span className="text-indigo-300">Array: [3, 14, 8, 21, 5]</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 py-4">
                {activeLevel.sampleArray.map((num, idx) => (
                  <div key={idx} className="w-16 h-20 rounded-2xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center font-mono">
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
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition ${
                      l3Choice === 'found' ? 'bg-red-500/20 border-red-500 text-red-300' : 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800'
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
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition ${
                      l3Choice === 'not_found' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800'
                    }`}
                  >
                    Not Found ❌
                  </button>
                </div>

                {l3Feedback && (
                  <p className="text-center text-xs font-mono font-bold mt-2 text-indigo-300">
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
            <div className="p-6 rounded-2xl bg-slate-950 text-white space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Array: [7, 4, 12, 9, 20, 5]</span>
                <span className="text-amber-400 font-bold">Target = 20</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 py-4">
                {activeLevel.sampleArray.map((num, idx) => (
                  <div key={idx} className="w-16 h-20 rounded-2xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center font-mono">
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
                      className={`w-12 h-10 rounded-xl font-mono font-bold text-xs border transition ${
                        l4Prediction === count
                          ? count === 5
                            ? 'bg-emerald-600 border-emerald-400 text-white'
                            : 'bg-red-600 border-red-400 text-white'
                          : 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>

                {l4Feedback && (
                  <p className="text-center text-xs font-mono font-bold mt-2 text-indigo-300">
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
            <div className="p-6 rounded-2xl bg-slate-950 text-white space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Target to locate: <strong className="text-amber-400 font-extrabold text-sm">{l5Target}</strong></span>
                <span className="text-indigo-300 font-bold">Comparisons: {l5Comparisons}</span>
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
                          ? 'bg-indigo-600/40 border-amber-400 text-amber-300 ring-2 ring-amber-400 animate-pulse'
                          : isChecked
                          ? 'bg-slate-900/60 border-slate-700 text-slate-500'
                          : 'bg-slate-900 border-slate-700 text-white'
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
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs shadow-md"
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
                      <span className="text-amber-400 font-bold">XP Earned: +15 XP</span>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          sound.playNavigate();
                          onNavigate('lab');
                        }}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs inline-flex items-center gap-1.5"
                      >
                        <FlaskConical className="w-3.5 h-3.5" />
                        <span>Open Linear Search Lab →</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Level Navigation Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              if (activeLevelId > 1) {
                sound.playClick();
                setActiveLevelId(activeLevelId - 1);
              }
            }}
            disabled={activeLevelId === 1}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40"
          >
            Previous Level
          </button>

          {activeLevelId < 5 ? (
            <button
              onClick={() => {
                sound.playClick();
                setActiveLevelId(activeLevelId + 1);
              }}
              className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold flex items-center gap-1.5"
            >
              <span>Next Level</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playNavigate();
                onNavigate('quiz');
              }}
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5"
            >
              <span>Go to Quiz Challenge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 10. LAB AFTER GAME CALLOUT */}
      <div className="p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-indigo-950 dark:text-indigo-200 flex items-center justify-center sm:justify-start gap-2">
            <FlaskConical className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Ready for the Lab?
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            You have learned how Linear Search works. Now experiment with your own custom lists!
          </p>
        </div>
        <button
          onClick={() => {
            sound.playNavigate();
            onNavigate('lab');
          }}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 shrink-0"
        >
          <span>Open Linear Search Lab →</span>
        </button>
      </div>
    </div>
  );
}
