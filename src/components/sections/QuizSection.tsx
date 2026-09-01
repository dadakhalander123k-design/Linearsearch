import { useState } from 'react';
import { 
  ArrowLeft, 
  Award, 
  Check, 
  X,
  ShieldCheck,
  RotateCcw,
  AlertCircle,
  Sparkles,
  Trophy,
  Home
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
    if (isSubmitting) return;
    setIsSubmitting(true);
    sound.playLevelComplete();
    let correct = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctKey) {
        correct++;
      }
    });

    setIsSubmitted(true);
    onCompleteQuiz(correct, totalQuestions);
    setIsSubmitting(false);
  };

  const handleRetake = () => {
    sound.playClick();
    setSelectedAnswers({});
    setEvaluatedQuestions({});
    setValidationError(null);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setCurrentQIndex(0);
  };

  // Progress and score metrics
  const answeredCount = Object.keys(evaluatedQuestions).filter(
    (id) => evaluatedQuestions[Number(id)]
  ).length;

  const correctCount = QUIZ_QUESTIONS.filter(
    (q) => selectedAnswers[q.id] === q.correctKey
  ).length;

  const incorrectCount = totalQuestions - correctCount;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  const currentQIdentifier = `CORE-${String(currentQ.id).padStart(2, '0')}`;

  // ─── FINAL RESULT / QUIZ ASSESSMENT COMPLETED ───
  if (isSubmitted) {
    const masteryGrade = 
      scorePercent >= 90
        ? '★ OUTSTANDING MASTERY (GRADE A+) ★'
        : scorePercent >= 80
        ? '★ EXCELLENT MASTERY (GRADE A) ★'
        : scorePercent >= 70
        ? '★ PROFICIENT MASTERY (GRADE B) ★'
        : '★ ASSESSMENT COMPLETE (NEEDS REVIEW) ★';

    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
        <div className="p-6 sm:p-12 rounded-3xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] shadow-xs flex flex-col items-center text-center space-y-6">
          
          {/* Top Trophy Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-700/50 flex items-center justify-center text-amber-500 dark:text-amber-400 shadow-xs">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.2]" />
          </div>

          {/* Achievement Badge */}
          <div>
            <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-emerald-400/60 dark:border-emerald-500/50 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-mono text-[11px] sm:text-xs font-extrabold uppercase tracking-widest">
              {masteryGrade}
            </span>
          </div>

          {/* Main Completion Heading & Supporting Description */}
          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-tight">
              QUIZ ASSESSMENT COMPLETED
            </h2>
            <p className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] leading-relaxed font-normal">
              {scorePercent >= 70
                ? 'Incredible performance! You demonstrated thorough command of Linear Search operations and algorithmic constraints.'
                : 'Good effort! Review the curriculum modules to strengthen your understanding of Linear Search and retake the quiz.'}
            </p>
          </div>

          {/* Large Highlighted Score Card */}
          <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#16203B] border-2 border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] shadow-xs text-center space-y-2">
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#64748B] dark:text-[#94A3B8] uppercase block">
              FINAL HIGHLIGHTED SCORE
            </span>
            <div className="text-5xl sm:text-6xl font-black text-emerald-500 dark:text-emerald-400 font-mono tracking-tight my-2">
              {scorePercent}%
            </div>
            <div>
              <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#F1F5F9] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] text-xs font-semibold text-[#475569] dark:text-[#94A3B8]">
                {correctCount} / {totalQuestions} Questions Correct
              </span>
            </div>
          </div>

          {/* Summary Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-2xl mx-auto pt-2">
            {/* CORRECT Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 text-center">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] block mb-1">
                CORRECT
              </span>
              <span className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                ✓ {correctCount}
              </span>
            </div>

            {/* INCORRECT Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/50 text-center">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] block mb-1">
                INCORRECT
              </span>
              <span className="text-xl sm:text-2xl font-black font-mono text-rose-500 dark:text-rose-400">
                {incorrectCount}
              </span>
            </div>

            {/* ACCURACY Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#EEF2FF]/60 dark:bg-[rgba(99,102,241,0.14)] border border-[rgba(79,70,229,0.2)] dark:border-[rgba(99,102,241,0.3)] text-center">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] block mb-1">
                ACCURACY
              </span>
              <span className="text-xl sm:text-2xl font-black font-mono text-[#4F46E5] dark:text-[#818CF8]">
                {scorePercent}%
              </span>
            </div>
          </div>

        </div>

        {/* Action Buttons: Retake Quiz and Back to Home */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {/* Button 1: Retake Quiz */}
          <button
            onClick={handleRetake}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white font-bold text-sm sm:text-base shadow-xs transition-all duration-150 active:scale-98 cursor-pointer"
            aria-label="Retake Quiz"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            <span>Retake Quiz</span>
          </button>

          {/* Button 2: Back to Home */}
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('overview');
            }}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white dark:bg-[#0F172A] hover:bg-[#F1F5F9] dark:hover:bg-[#16203B] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] text-[#0F172A] dark:text-[#F8FAFC] font-bold text-sm sm:text-base shadow-2xs transition-all duration-150 active:scale-98 cursor-pointer"
            aria-label="Back to Home"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2] text-[#4F46E5] dark:text-[#818CF8]" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* ─── CARD 1: QUIZ OVERVIEW & PROGRESS HEADER ─── */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] shadow-xs space-y-4">
        {/* Top Meta Line */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#EEF2FF] dark:bg-[rgba(99,102,241,0.18)] border border-[rgba(79,70,229,0.2)] dark:border-[rgba(99,102,241,0.3)] text-[#4F46E5] dark:text-[#818CF8] font-mono text-[11px] font-extrabold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>KNOWLEDGE ASSESSMENT</span>
          </div>
          <span className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] font-medium">
            Linear Search Knowledge Assessment ({totalQuestions} Questions)
          </span>
        </div>

        {/* Main Title & Description */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
            Algorithm Knowledge Check
          </h2>
          <p className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] mt-1.5 leading-relaxed max-w-3xl">
            Test your understanding of sequential array scanning, pointer movements, best/worst-case complexities, comparison limits, and search termination conditions.
          </p>
        </div>

        <div className="border-t border-[#E2E8F0] dark:border-[rgba(99,102,241,0.18)] pt-4 space-y-3">
          {/* Progress label */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
              <Sparkles className="w-4 h-4 text-[#4F46E5] dark:text-[#818CF8]" />
              <span>
                Progress: <strong className="text-[#4F46E5] dark:text-[#818CF8] font-bold">{answeredCount}</strong> / {totalQuestions} Answered
              </span>
            </div>
            <span className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
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
                  className={`min-w-[54px] sm:min-w-[62px] px-3.5 py-2.5 rounded-xl font-mono text-xs font-bold transition flex flex-col items-center justify-center shrink-0 relative cursor-pointer ${
                    isCur
                      ? 'bg-[#4F46E5] dark:bg-[#6366F1] text-white shadow-xs ring-2 ring-[#4F46E5]/30'
                      : qEvaluated
                      ? 'bg-[#F1F5F9] dark:bg-[#16203B] text-[#0F172A] dark:text-[#F8FAFC] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] hover:bg-[#E2E8F0] dark:hover:bg-[#1E2B4D]'
                      : qSelected
                      ? 'bg-[#F1F5F9] dark:bg-[#16203B] text-[#0F172A] dark:text-[#F8FAFC] border border-slate-300 dark:border-[rgba(99,102,241,0.2)]'
                      : 'bg-[#F1F5F9] dark:bg-[#16203B]/60 text-[#64748B] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] hover:bg-[#E2E8F0] dark:hover:bg-[#16203B]'
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

      {/* ─── CARD 2: QUESTION / ANSWERING CARD ─── */}
      <div className={`p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0F172A] border-2 transition shadow-xs space-y-6 ${
        isEvaluated
          ? isCorrect
            ? 'border-emerald-400 dark:border-emerald-600'
            : 'border-red-400 dark:border-red-600'
          : 'border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)]'
      }`}>
        {/* Question Header Row */}
        <div className="flex items-center justify-between gap-3">
          {/* Left: Purple Badge + Question Identifier */}
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-lg bg-[#4F46E5] dark:bg-[#6366F1] text-white font-bold text-xs tracking-wide">
              Question {String(currentQIndex + 1).padStart(2, '0')} of {String(totalQuestions).padStart(2, '0')}
            </span>
            <span className="font-mono text-xs font-extrabold text-[#4F46E5] dark:text-[#818CF8] tracking-wider">
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
            <div className="px-3 py-1 rounded-lg bg-[#F1F5F9] dark:bg-[#16203B] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] text-[#64748B] dark:text-[#94A3B8] text-xs font-semibold">
              Pending Evaluation
            </div>
          )}
        </div>

        {/* Question Title */}
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
            {currentQIndex + 1}. {currentQ.question}
          </h3>
          {currentQ.context && (
            <p className="text-xs font-mono text-[#4F46E5] dark:text-[#818CF8] bg-[#EEF2FF] dark:bg-[rgba(99,102,241,0.18)] border border-[rgba(79,70,229,0.2)] dark:border-[rgba(99,102,241,0.3)] px-3 py-1.5 rounded-xl w-fit mt-2.5">
              {currentQ.context}
            </p>
          )}
        </div>

        {/* 4 Answer Options */}
        <div className="space-y-3 pt-1">
          {currentQ.options.map((opt) => {
            const isThisOptionSelected = selectedKey === opt.key;
            const isThisOptionCorrect = opt.key === currentQ.correctKey;

            let containerClasses = 'bg-white dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] text-[#0F172A] dark:text-[#F8FAFC] hover:bg-[#F1F5F9] dark:hover:bg-[#16203B]';
            let badgeClasses = 'bg-[#F1F5F9] dark:bg-[#16203B] text-[#475569] dark:text-[#94A3B8] border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)]';

            if (isEvaluated) {
              if (isThisOptionCorrect) {
                containerClasses = 'bg-[#ECFDF5] dark:bg-emerald-950/50 border-2 border-[#10B981] text-[#064E3B] dark:text-emerald-200 font-bold shadow-xs';
                badgeClasses = 'bg-[#10B981] text-white border-[#10B981]';
              } else if (isThisOptionSelected && !isThisOptionCorrect) {
                containerClasses = 'bg-red-50 dark:bg-red-950/50 border-2 border-red-500 dark:border-red-600 text-red-950 dark:text-red-200 font-bold shadow-xs';
                badgeClasses = 'bg-red-500 text-white border-red-500';
              } else {
                containerClasses = 'bg-white/60 dark:bg-[#0F172A]/60 border-[#E2E8F0]/60 dark:border-[rgba(99,102,241,0.15)] text-[#64748B] dark:text-[#94A3B8] opacity-60';
                badgeClasses = 'bg-[#F1F5F9] dark:bg-[#16203B] text-[#64748B] dark:text-[#94A3B8] border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)]';
              }
            } else if (isThisOptionSelected) {
              containerClasses = 'bg-[#EEF2FF] dark:bg-[rgba(99,102,241,0.18)] border-2 border-[#4F46E5] dark:border-[#6366F1] text-[#0F172A] dark:text-[#F8FAFC] shadow-xs font-semibold';
              badgeClasses = 'bg-[#4F46E5] dark:bg-[#6366F1] text-white border-[#4F46E5] dark:border-[#6366F1]';
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
        <div className="pt-5 border-t border-[#E2E8F0] dark:border-[rgba(99,102,241,0.18)] flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentQIndex === 0}
            className="px-5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] text-xs font-bold text-[#475569] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#16203B] disabled:opacity-30 disabled:pointer-events-none flex items-center gap-2 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Previous</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleNextClick}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs transition cursor-pointer active:scale-98 disabled:opacity-50"
            >
              <span>
                {!isEvaluated
                  ? (currentQIndex < totalQuestions - 1 ? 'NEXT QUESTION →' : 'CHECK ANSWER →')
                  : currentQIndex < totalQuestions - 1
                  ? 'CONTINUE TO NEXT QUESTION →'
                  : 'COMPLETE & REVIEW'}
              </span>
            </button>
          </div>
        </div>

        {/* ─── TECHNICAL EXPLANATION CARD ─── */}
        {isEvaluated && currentQ.explanation && (
          <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-[#F1F5F9] dark:bg-[#16203B] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] space-y-2.5 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#4F46E5] dark:bg-[#6366F1] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                ?
              </div>
              <span className="font-bold text-sm text-[#0F172A] dark:text-[#F8FAFC]">
                Technical Explanation:
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed font-normal pl-7 sm:pl-7">
              {currentQ.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

