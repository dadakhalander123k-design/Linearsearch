import { useState } from 'react';
import { 
  ArrowLeft, 
  Award, 
  Check, 
  X,
  ShieldCheck,
  RotateCcw,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/quizData';
import { UserProgressState, SectionId } from '../../types';
import { sound } from '../../audio/soundEngine';

interface QuizSectionProps {
  progress: UserProgressState;
  onCompleteQuiz: (score: number, total: number) => void;
  onNavigate: (section: SectionId) => void;
  onOpenCertificate: () => void;
}

type GradeTier = 'excellent' | 'good' | 'keep_learning';

export function QuizSection({
  progress,
  onCompleteQuiz,
  onNavigate,
  onOpenCertificate,
}: QuizSectionProps) {
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [evaluatedQuestions, setEvaluatedQuestions] = useState<Record<number, boolean>>({});
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(progress.isQuizCompleted);

  const currentQ = QUIZ_QUESTIONS[currentQIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const isEvaluated = !!evaluatedQuestions[currentQ.id];
  const selectedKey = selectedAnswers[currentQ.id];
  const isCorrect = selectedKey === currentQ.correctKey;

  const handleSelectOption = (key: string) => {
    if (isEvaluated) return; // Prevent changing after evaluation
    sound.playClick();
    setValidationError(null);
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: key,
    }));
  };

  const handleNextClick = () => {
    setValidationError(null);

    // Case 1: Current question is not yet evaluated
    if (!isEvaluated) {
      if (!selectedKey) {
        sound.playIncorrect();
        setValidationError('Please choose an answer option before proceeding.');
        return;
      }

      // Evaluate the question now
      if (selectedKey === currentQ.correctKey) {
        sound.playCorrect();
      } else {
        sound.playIncorrect();
      }

      setEvaluatedQuestions((prev) => ({
        ...prev,
        [currentQ.id]: true,
      }));
      return;
    }

    // Case 2: Current question is already evaluated -> advance to next question or submit
    sound.playClick();
    if (currentQIndex < totalQuestions - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrev = () => {
    sound.playClick();
    setValidationError(null);
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    sound.playLevelComplete();
    let correct = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctKey) {
        correct++;
      }
    });

    setIsSubmitted(true);
    onCompleteQuiz(correct, totalQuestions);
  };

  const handleRetake = () => {
    sound.playClick();
    setSelectedAnswers({});
    setEvaluatedQuestions({});
    setValidationError(null);
    setIsSubmitted(false);
    setCurrentQIndex(0);
  };

  // Progress and score metrics
  const answeredCount = Object.keys(evaluatedQuestions).filter(
    (id) => evaluatedQuestions[Number(id)]
  ).length;

  const correctCount = QUIZ_QUESTIONS.filter(
    (q) => selectedAnswers[q.id] === q.correctKey
  ).length;

  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  // Grade determination matching reference
  let scoreTier: GradeTier = 'excellent';
  if (correctCount >= 8) {
    scoreTier = 'excellent';
  } else if (correctCount >= 6) {
    scoreTier = 'good';
  } else {
    scoreTier = 'keep_learning';
  }

  const gradeDetails = {
    excellent: {
      badgeText: 'EXCELLENT — HASHING MASTER!',
      badgeClasses: 'bg-[#ECFDF5] dark:bg-emerald-950/80 text-[#059669] dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800',
      dotClasses: 'bg-[#10B981]',
      ringClasses: 'ring-emerald-200 dark:ring-emerald-900/60',
      heading: 'Excellent — Hashing Master!',
      description: 'Outstanding achievement! You scored in the top tier and have mastered all primary hashing concepts, collision mechanics, and resolution strategies.',
    },
    good: {
      badgeText: 'GOOD — REVIEW & TRY AGAIN',
      badgeClasses: 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800',
      dotClasses: 'bg-amber-500',
      ringClasses: 'ring-amber-200 dark:ring-amber-900/60',
      heading: 'Good — Review & Try Again',
      description: 'Good performance! You understand the major hashing concepts, but reviewing collision handling and resolution strategies will strengthen your knowledge.',
    },
    keep_learning: {
      badgeText: 'KEEP LEARNING — REVIEW THEORY',
      badgeClasses: 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800',
      dotClasses: 'bg-rose-500',
      ringClasses: 'ring-rose-200 dark:ring-rose-900/60',
      heading: 'Keep Learning — Review Theory',
      description: 'Keep learning! Review the hashing fundamentals, hash functions, collisions, and resolution strategies before attempting the quiz again.',
    },
  }[scoreTier];

  const currentQIdentifier = `CORE-${String(currentQ.id).padStart(2, '0')}`;

  // ─── FINAL RESULT / GRADING SCREEN (SHOWN ONLY AFTER FINAL SUBMISSION) ───
  if (isSubmitted) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-8">
          
          {/* Top Status Row: Badge on Left, Numeric Score Meta on Right */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-extrabold uppercase tracking-wider ${gradeDetails.badgeClasses}`}>
              <span className={`w-2 h-2 rounded-full ${gradeDetails.dotClasses} animate-pulse`} />
              <span>{gradeDetails.badgeText}</span>
            </div>

            <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
              Final Score: <span className="font-mono font-bold text-slate-900 dark:text-white">{correctCount} of {totalQuestions}</span> ({scorePercent}%)
            </div>
          </div>

          {/* Main Area: Large Heading & Description on Left, Action Buttons on Right */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pt-2">
            <div className="space-y-4 max-w-2xl">
              {/* Large Grade Heading with Glowing Achievement Dot */}
              <div className="flex items-center gap-3.5">
                <div className={`w-4 h-4 rounded-full shrink-0 ${gradeDetails.dotClasses} shadow-sm ring-4 ${gradeDetails.ringClasses}`} />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  {gradeDetails.heading}
                </h2>
              </div>

              {/* Achievement Description */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {gradeDetails.description}
              </p>
            </div>

            {/* Upper-Right Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 pt-2 lg:pt-0">
              {/* Button 1: Retake Quiz */}
              <button
                onClick={handleRetake}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>Retake Quiz</span>
              </button>

              {/* Button 2: View Progress */}
              <button
                onClick={() => onNavigate('progress')}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#4F3FF5] hover:bg-[#4335E0] text-white text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>View Progress</span>
              </button>
            </div>
          </div>

          {/* Performance Guide Scale at Bottom */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {/* Scale Card 1: 8-10 Excellent */}
              <div className={`p-4 rounded-2xl border transition flex items-center gap-3 ${
                scoreTier === 'excellent'
                  ? 'bg-[#ECFDF5] dark:bg-emerald-950/50 border-2 border-emerald-400 dark:border-emerald-600 shadow-xs'
                  : 'bg-slate-50/60 dark:bg-slate-800/30 border-slate-200/80 dark:border-slate-800 opacity-60'
              }`}>
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  scoreTier === 'excellent' ? 'bg-emerald-500 ring-2 ring-emerald-300 dark:ring-emerald-800' : 'bg-slate-400'
                }`} />
                <div className="text-xs sm:text-sm">
                  <span className="font-mono font-bold text-slate-900 dark:text-white mr-1.5">8–10:</span>
                  <span className={scoreTier === 'excellent' ? 'font-bold text-emerald-950 dark:text-emerald-200' : 'text-slate-600 dark:text-slate-400'}>
                    Excellent — Hashing Master!
                  </span>
                </div>
              </div>

              {/* Scale Card 2: 6-7 Good */}
              <div className={`p-4 rounded-2xl border transition flex items-center gap-3 ${
                scoreTier === 'good'
                  ? 'bg-amber-50 dark:bg-amber-950/50 border-2 border-amber-400 dark:border-amber-600 shadow-xs'
                  : 'bg-slate-50/60 dark:bg-slate-800/30 border-slate-200/80 dark:border-slate-800 opacity-60'
              }`}>
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  scoreTier === 'good' ? 'bg-amber-500 ring-2 ring-amber-300 dark:ring-amber-800' : 'bg-slate-400'
                }`} />
                <div className="text-xs sm:text-sm">
                  <span className="font-mono font-bold text-slate-900 dark:text-white mr-1.5">6–7:</span>
                  <span className={scoreTier === 'good' ? 'font-bold text-amber-950 dark:text-amber-200' : 'text-slate-600 dark:text-slate-400'}>
                    Good — Review & Try Again
                  </span>
                </div>
              </div>

              {/* Scale Card 3: 0-5 Keep Learning */}
              <div className={`p-4 rounded-2xl border transition flex items-center gap-3 ${
                scoreTier === 'keep_learning'
                  ? 'bg-rose-50 dark:bg-rose-950/50 border-2 border-rose-400 dark:border-rose-600 shadow-xs'
                  : 'bg-slate-50/60 dark:bg-slate-800/30 border-slate-200/80 dark:border-slate-800 opacity-60'
              }`}>
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  scoreTier === 'keep_learning' ? 'bg-rose-500 ring-2 ring-rose-300 dark:ring-rose-800' : 'bg-slate-400'
                }`} />
                <div className="text-xs sm:text-sm">
                  <span className="font-mono font-bold text-slate-900 dark:text-white mr-1.5">0–5:</span>
                  <span className={scoreTier === 'keep_learning' ? 'font-bold text-rose-950 dark:text-rose-200' : 'text-slate-600 dark:text-slate-400'}>
                    Keep Learning — Review Theory
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Claim Option if passed */}
          {scorePercent >= 70 && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={onOpenCertificate}
                className="text-xs font-bold text-[#4F3FF5] dark:text-indigo-400 hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <span>📜 Claim Verified Completion Certificate →</span>
              </button>
            </div>
          )}

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* ─── CARD 1: QUIZ OVERVIEW & PROGRESS HEADER (REFERENCE IMAGE 2) ─── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        {/* Top Meta Line */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#EEF2FF] dark:bg-indigo-950/60 text-[#4F3FF5] dark:text-indigo-400 font-mono text-[11px] font-extrabold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>KNOWLEDGE ASSESSMENT</span>
          </div>
          <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Linear Search Knowledge Assessment ({totalQuestions} Questions)
          </span>
        </div>

        {/* Main Title & Description */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Algorithm Knowledge Check
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed max-w-3xl">
            Test your understanding of sequential array scanning, pointer movements, best/worst-case complexities, comparison limits, and search termination conditions.
          </p>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-3">
          {/* Progress label */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              <Sparkles className="w-4 h-4 text-[#4F3FF5]" />
              <span>
                Progress: <strong className="text-[#4F3FF5] dark:text-indigo-400 font-bold">{answeredCount}</strong> / {totalQuestions} Answered
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Pass Mark: 70%
            </span>
          </div>

          {/* Interactive Question Navigation Buttons (Q1 ... Q10) */}
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 pt-1 scrollbar-thin">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const qEvaluated = evaluatedQuestions[q.id];
              const qSelected = selectedAnswers[q.id] !== undefined;
              const isCur = idx === currentQIndex;
              const qCorrect = selectedAnswers[q.id] === q.correctKey;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    sound.playClick();
                    setValidationError(null);
                    setCurrentQIndex(idx);
                  }}
                  className={`min-w-[54px] sm:min-w-[62px] px-3.5 py-2.5 rounded-xl font-mono text-xs font-bold transition flex flex-col items-center justify-center shrink-0 relative ${
                    isCur
                      ? 'bg-[#4F3FF5] text-white shadow-sm ring-2 ring-[#4F3FF5]/30'
                      : qEvaluated
                      ? 'bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      : qSelected
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-600'
                      : 'bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="text-xs">Q{idx + 1}</span>
                  {qEvaluated ? (
                    <span className={`text-[10px] leading-none mt-0.5 font-bold ${
                      isCur 
                        ? 'text-white' 
                        : qCorrect 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : 'text-red-500 dark:text-red-400'
                    }`}>
                      {qCorrect ? '✓' : '✕'}
                    </span>
                  ) : qSelected ? (
                    <span className={`text-[10px] leading-none mt-0.5 font-bold ${isCur ? 'text-white' : 'text-slate-400'}`}>
                      •
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── CARD 2: QUESTION / ANSWERING CARD (REFERENCE IMAGES) ─── */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 transition shadow-xs space-y-6 ${
        isEvaluated
          ? isCorrect
            ? 'border-emerald-400 dark:border-emerald-600'
            : 'border-red-400 dark:border-red-600'
          : 'border-slate-200/80 dark:border-slate-800'
      }`}>
        {/* Question Header Row */}
        <div className="flex items-center justify-between gap-3">
          {/* Left: Purple Badge + Question Identifier */}
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-lg bg-[#4F3FF5] text-white font-bold text-xs tracking-wide">
              Question {String(currentQIndex + 1).padStart(2, '0')} of {String(totalQuestions).padStart(2, '0')}
            </span>
            <span className="font-mono text-xs font-extrabold text-[#4F3FF5] dark:text-indigo-400 tracking-wider">
              {currentQIdentifier}
            </span>
          </div>

          {/* Right: Evaluated Status Pill or Pending */}
          {isEvaluated ? (
            isCorrect ? (
              <div className="px-3 py-1 rounded-lg bg-[#ECFDF5] dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-[#059669] dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Correct</span>
              </div>
            ) : (
              <div className="px-3 py-1 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-600 dark:text-red-300 text-xs font-bold flex items-center gap-1.5">
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Incorrect</span>
              </div>
            )
          ) : (
            <div className="px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 text-xs font-semibold">
              Pending Evaluation
            </div>
          )}
        </div>

        {/* Question Title */}
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] dark:text-white leading-snug">
            {currentQIndex + 1}. {currentQ.question}
          </h3>
          {currentQ.context && (
            <p className="text-xs font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 px-3 py-1.5 rounded-xl w-fit mt-2.5">
              {currentQ.context}
            </p>
          )}
        </div>

        {/* 4 Answer Options */}
        <div className="space-y-3 pt-1">
          {currentQ.options.map((opt) => {
            const isThisOptionSelected = selectedKey === opt.key;
            const isThisOptionCorrect = opt.key === currentQ.correctKey;

            // Strict Visual State Resolution:
            // 1. EVALUATED:
            //    - Correct Answer => GREEN border, mint bg, green badge
            //    - Selected Incorrect Answer => RED border, light red bg, red badge
            //    - Unselected other options => Neutral dimmed
            // 2. UN-EVALUATED:
            //    - Selected => Neutral slate selected (NO green/red)
            //    - Unselected => Neutral default
            let containerClasses = 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60';
            let badgeClasses = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';

            if (isEvaluated) {
              if (isThisOptionCorrect) {
                containerClasses = 'bg-[#ECFDF5] dark:bg-emerald-950/50 border-2 border-[#10B981] text-[#064E3B] dark:text-emerald-200 font-bold shadow-xs';
                badgeClasses = 'bg-[#10B981] text-white border-[#10B981]';
              } else if (isThisOptionSelected && !isThisOptionCorrect) {
                containerClasses = 'bg-red-50 dark:bg-red-950/50 border-2 border-red-500 dark:border-red-600 text-red-950 dark:text-red-200 font-bold shadow-xs';
                badgeClasses = 'bg-red-500 text-white border-red-500';
              } else {
                containerClasses = 'bg-white/60 dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-800/60 text-slate-400 dark:text-slate-500 opacity-60';
                badgeClasses = 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700';
              }
            } else if (isThisOptionSelected) {
              containerClasses = 'bg-slate-100 dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-500 text-slate-900 dark:text-white shadow-xs font-semibold';
              badgeClasses = 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 border-slate-800 dark:border-slate-200';
            }

            return (
              <button
                key={opt.key}
                onClick={() => handleSelectOption(opt.key)}
                disabled={isEvaluated}
                className={`w-full p-4 sm:p-5 rounded-2xl border text-left flex items-center gap-4 transition ${
                  isEvaluated ? 'cursor-default' : 'cursor-pointer'
                } ${containerClasses}`}
              >
                {/* Left Option Letter Box */}
                <div
                  className={`w-8 h-8 rounded-lg font-mono font-extrabold text-xs flex items-center justify-center shrink-0 border transition ${badgeClasses}`}
                >
                  {opt.key}
                </div>

                {/* Option Text */}
                <span className="text-sm sm:text-base leading-relaxed flex-1">
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Validation error if user tries to advance without picking an option */}
        {validationError && (
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Bottom Question Navigation Controls */}
        <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentQIndex === 0}
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-2 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Previous</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleNextClick}
              className="px-6 py-3 rounded-xl bg-[#4F3FF5] hover:bg-[#4335E0] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition cursor-pointer"
            >
              <span>
                {!isEvaluated
                  ? 'NEXT QUESTION →'
                  : currentQIndex < totalQuestions - 1
                  ? 'CONTINUE TO NEXT QUESTION →'
                  : 'SUBMIT & GRADE QUIZ →'}
              </span>
            </button>
          </div>
        </div>

        {/* ─── TECHNICAL EXPLANATION CARD (SECTIONS 7 & 8: VISIBLE ONLY AFTER EVALUATION) ─── */}
        {isEvaluated && currentQ.explanation && (
          <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 space-y-2.5 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#4F3FF5] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                ?
              </div>
              <span className="font-bold text-sm text-[#0F172A] dark:text-white">
                Technical Explanation:
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal pl-7 sm:pl-7">
              {currentQ.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

