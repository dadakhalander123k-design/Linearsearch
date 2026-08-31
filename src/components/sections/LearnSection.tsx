import { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Lightbulb, 
  Check, 
  Code2, 
  ListChecks,
  Clock,
  Search
} from 'lucide-react';
import { LEARN_MODULES } from '../../data/learnData';
import { UserProgressState, SectionId } from '../../types';
import { CodeBlock } from '../common/CodeBlock';
import { sound } from '../../audio/soundEngine';

interface LearnSectionProps {
  progress: UserProgressState;
  onCompleteModule: (moduleId: number) => void;
  onNavigate: (section: SectionId) => void;
}

export function LearnSection({
  progress,
  onCompleteModule,
  onNavigate,
}: LearnSectionProps) {
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const activeModule = LEARN_MODULES.find((m) => m.id === activeModuleId) || LEARN_MODULES[0];
  const isCompleted = progress.completedTheoryModules.includes(activeModule.id);
  const totalChapters = LEARN_MODULES.length;
  const completedCount = progress.completedTheoryModules.length;
  const percentCompleted = Math.round((completedCount / totalChapters) * 100);

  const handleNext = () => {
    sound.playClick();
    if (activeModuleId < totalChapters) {
      setActiveModuleId(activeModuleId + 1);
    }
  };

  const handlePrev = () => {
    sound.playClick();
    if (activeModuleId > 1) {
      setActiveModuleId(activeModuleId - 1);
    }
  };

  const handleMarkComplete = () => {
    if (!isCompleted) {
      onCompleteModule(activeModule.id);
    }
  };

  const activeChapterNumber = String(activeModule.id).padStart(2, '0');
  const cleanTitle = activeModule.title.replace(/^\d+\.\s*/, '').toUpperCase();

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* ─── TOP COURSE HEADER CARD (REFERENCE IMAGE 3) ─── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
        {/* Top line with Curriculum badge and progress pill */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-[#EEF2FF] dark:bg-indigo-950/60 text-[#4F3FF5] dark:text-indigo-400 font-mono text-[11px] font-extrabold tracking-wider uppercase">
              CURRICULUM // VOL. 01
            </span>
            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Theory & Mathematical Foundations
            </span>
          </div>

          <div className="px-3 py-1 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-mono text-xs font-semibold">
            Progress: {completedCount} / {totalChapters} Chapters ({percentCompleted}%)
          </div>
        </div>

        {/* Course Main Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight mt-2">
            Theory of Linear Search & Sequential Algorithms
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed max-w-4xl">
            An intuitive and rigorous technical guide covering keys, element comparisons, memory indexes, time complexity phenomena, and algorithmic resolution engines.
          </p>
        </div>
      </div>

      {/* Mobile-only horizontal chapter selector */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {LEARN_MODULES.map((m) => {
          const isDone = progress.completedTheoryModules.includes(m.id);
          const isCurrent = m.id === activeModuleId;
          return (
            <button
              key={m.id}
              onClick={() => {
                sound.playClick();
                setActiveModuleId(m.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 border transition ${
                isCurrent
                  ? 'bg-[#4F3FF5] text-white border-[#4F3FF5] shadow-xs'
                  : isDone
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-100'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              <span>{m.id.toString().padStart(2, '0')}. {m.title.replace(/^\d+\.\s*/, '')}</span>
              {isDone && <Check className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-emerald-500'}`} />}
            </button>
          );
        })}
      </div>

      {/* ─── TWO COLUMN LAYOUT: SIDEBAR TOC + MAIN CONTENT (REFERENCE IMAGE 3) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: TABLE OF CONTENTS (lg:col-span-4) */}
        <div className="hidden lg:block lg:col-span-4 sticky top-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
            {/* TOC Card Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="font-mono text-xs font-extrabold text-[#0F172A] dark:text-white tracking-wider uppercase">
                TABLE OF CONTENTS
              </span>
              <span className="font-mono text-xs text-slate-400 font-medium">
                {totalChapters} Chapters
              </span>
            </div>

            {/* Chapter Items List */}
            <div className="divide-y divide-slate-100/80 dark:divide-slate-800/60">
              {LEARN_MODULES.map((m) => {
                const isDone = progress.completedTheoryModules.includes(m.id);
                const isCurrent = m.id === activeModuleId;
                const chapterNum = String(m.id).padStart(2, '0');
                const moduleName = m.title.replace(/^\d+\.\s*/, '');

                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      sound.playClick();
                      setActiveModuleId(m.id);
                    }}
                    className={`w-full py-3.5 px-4 text-left flex items-center justify-between gap-3 transition cursor-pointer border-l-4 ${
                      isCurrent
                        ? 'bg-[#EEF2FF]/60 dark:bg-indigo-950/40 border-[#4F3FF5] text-[#4F3FF5] dark:text-indigo-300 font-bold'
                        : 'bg-white dark:bg-slate-900 border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`font-mono text-xs shrink-0 ${
                        isCurrent 
                          ? 'font-extrabold text-[#4F3FF5] dark:text-indigo-400' 
                          : 'font-medium text-slate-400'
                      }`}>
                        {chapterNum}
                      </span>
                      <span className={`text-xs sm:text-sm truncate ${isCurrent ? 'font-bold' : 'font-semibold text-slate-800 dark:text-slate-200'}`}>
                        {moduleName}
                      </span>
                    </div>

                    {/* Right status indicator: Purple dot, green checkmark, or hollow circle */}
                    {isDone ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-[#4F3FF5] shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 dark:border-slate-700 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MAIN CHAPTER CONTENT CARD (lg:col-span-8) */}
        <div className="lg:col-span-8 p-6 sm:p-8 lg:p-9 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
          {/* Chapter Sub-Header: Badge + Read Time */}
          <div className="flex items-center justify-between gap-3">
            <span className="px-3 py-1 rounded-md bg-[#EEF2FF] dark:bg-indigo-950/60 text-[#4F3FF5] dark:text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
              CHAPTER {activeChapterNumber} // FUNDAMENTALS
            </span>
            <span className="text-slate-400 dark:text-slate-500 font-mono text-xs flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>Est. Read: 2 MIN</span>
            </span>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-1" />

          {/* Chapter Title */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight uppercase">
              {activeModule.id}. {cleanTitle}
            </h2>

            {/* Executive Definition */}
            <div className="mt-4">
              <span className="font-mono text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                EXECUTIVE DEFINITION
              </span>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mt-1.5 font-normal">
                {activeModule.summary}
              </p>
            </div>
          </div>

          {/* Core Intuition / Analogy Callout (Reference Image 3 styling) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#EEF2FF]/40 dark:bg-indigo-950/25 border-l-4 border-[#4F3FF5] space-y-2">
            <span className="font-mono text-xs font-extrabold text-[#4F3FF5] dark:text-indigo-400 tracking-wider uppercase block">
              CORE INTUITION // ANALOGY
            </span>
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {activeModule.realLifeExample 
                ? `"${activeModule.realLifeExample.description}"` 
                : activeModule.subtitle}
            </p>
          </div>

          {/* Computer examples if present */}
          {activeModule.computerExamples && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Search className="w-4 h-4 text-[#4F3FF5]" />
                What Computers Search For Every Day
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModule.computerExamples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2.5"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#4F3FF5] shrink-0" />
                    <span>{ex}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Rich Content Blocks */}
          <div className="space-y-6 pt-2">
            {activeModule.content.map((block, idx) => {
              if (block.type === 'paragraph') {
                return (
                  <p key={idx} className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    {block.text}
                  </p>
                );
              }

              if (block.type === 'callout') {
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-indigo-950 dark:text-indigo-200 space-y-1.5"
                  >
                    {block.heading && (
                      <h4 className="text-sm font-bold flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 shrink-0 text-[#4F3FF5]" />
                        {block.heading}
                      </h4>
                    )}
                    <p className="text-sm leading-relaxed">{block.text}</p>
                  </div>
                );
              }

              if (block.type === 'table' && Array.isArray(block.data)) {
                return (
                  <div key={idx} className="space-y-3">
                    {block.heading && (
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {block.heading}
                      </h4>
                    )}
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-100 dark:bg-slate-800/80 font-mono text-xs text-slate-700 dark:text-slate-300">
                          <tr>
                            <th className="p-3.5 border-b border-slate-200 dark:border-slate-800">Index</th>
                            <th className="p-3.5 border-b border-slate-200 dark:border-slate-800">Value</th>
                            <th className="p-3.5 border-b border-slate-200 dark:border-slate-800">Explanation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                          {block.data.map((row: any, rIdx: number) => (
                            <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                              <td className="p-3.5 font-bold text-[#4F3FF5] dark:text-indigo-400">
                                [{row.index}]
                              </td>
                              <td className="p-3.5 font-extrabold text-slate-900 dark:text-white">
                                {row.value}
                              </td>
                              <td className="p-3.5 font-sans text-xs text-slate-600 dark:text-slate-400">
                                {row.label}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              }

              if (block.type === 'array_visual' && block.data) {
                const { array, target, steps } = block.data;
                return (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-indigo-300">{block.heading}</h4>
                      <span className="text-xs font-mono font-bold px-2 py-1 rounded-md bg-amber-400/20 text-amber-300">
                        Target = {target}
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-2.5">
                      {array.map((num: number, aIdx: number) => (
                        <div key={aIdx} className="flex flex-col items-center gap-1">
                          <span className="text-[10px] font-mono text-slate-400">Index {aIdx}</span>
                          <div className="w-full py-3 rounded-xl bg-slate-800 border border-slate-700 font-mono font-extrabold text-base flex items-center justify-center">
                            {num}
                          </div>
                        </div>
                      ))}
                    </div>

                    {steps && (
                      <div className="space-y-2 pt-2 border-t border-slate-800">
                        {steps.map((st: any, sIdx: number) => (
                          <div
                            key={sIdx}
                            className={`p-2.5 rounded-xl font-mono text-xs flex items-center justify-between ${
                              st.match
                                ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold'
                                : 'bg-slate-800/60 text-slate-300'
                            }`}
                          >
                            <span>Step {st.step}: Index {st.index} ({st.val})</span>
                            <span>{st.note}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (block.type === 'step_list' && Array.isArray(block.data)) {
                return (
                  <div key={idx} className="space-y-3">
                    {block.heading && (
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <ListChecks className="w-4 h-4 text-[#4F3FF5]" />
                        {block.heading}
                      </h4>
                    )}
                    <div className="space-y-2">
                      {block.data.map((item: string, iIdx: number) => (
                        <div
                          key={iIdx}
                          className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#EEF2FF] text-[#4F3FF5] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {iIdx + 1}
                          </span>
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (block.type === 'key_value_cards' && Array.isArray(block.data)) {
                return (
                  <div key={idx} className="space-y-3">
                    {block.heading && (
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {block.heading}
                      </h4>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {block.data.map((card: any, cIdx: number) => (
                        <div
                          key={cIdx}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                              {card.title}
                            </h5>
                            {card.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                                {card.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {card.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (block.type === 'code' && block.data) {
                return (
                  <div key={idx} className="space-y-2">
                    {block.heading && (
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-[#4F3FF5]" />
                        {block.heading}
                      </h4>
                    )}
                    <CodeBlock code={block.data} title={block.heading} />
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* Key Takeaway Card */}
          <div className="p-5 rounded-2xl bg-[#EEF2FF]/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 space-y-1.5">
            <div className="flex items-center gap-2 text-[#4F3FF5] dark:text-indigo-300 text-xs font-extrabold uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4" />
              <span>Key Takeaway</span>
            </div>
            <p className="text-sm md:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
              {activeModule.keyTakeaway}
            </p>
          </div>

          {/* Bottom Module Controls */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              disabled={activeModuleId === 1}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Chapter</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleMarkComplete}
                disabled={isCompleted}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
                  isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-[#4F3FF5] hover:bg-[#4335E0] text-white shadow-xs'
                }`}
              >
                {isCompleted ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Completed ✓</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Mark Complete (+5 XP)</span>
                  </>
                )}
              </button>

              {activeModuleId < totalChapters ? (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 flex items-center gap-2 transition"
                >
                  <span>Next Chapter</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    sound.playNavigate();
                    onNavigate('visualize');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-md flex items-center gap-2 hover:brightness-105 transition"
                >
                  <span>Go to Visualize</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

