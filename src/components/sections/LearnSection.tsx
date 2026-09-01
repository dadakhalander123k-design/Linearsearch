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
  Search,
  CheckCircle,
  XCircle,
  Hash,
  Repeat,
  Zap,
  HelpCircle,
  Terminal,
  ShieldCheck,
  AlertTriangle
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
      {/* ─── TOP COURSE HEADER CARD ─── */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] shadow-xs space-y-3">
        {/* Top line with Curriculum badge and progress pill */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-[#EEF2FF] dark:bg-[rgba(99,102,241,0.18)] text-[#4F46E5] dark:text-[#818CF8] font-mono text-[11px] font-extrabold tracking-wider uppercase">
              CURRICULUM // VOL. 01
            </span>
            <span className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] font-medium">
              Theory & Mathematical Foundations
            </span>
          </div>

          <div className="px-3 py-1 rounded-lg bg-[#F1F5F9] dark:bg-[#16203B] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] text-[#475569] dark:text-[#94A3B8] font-mono text-xs font-semibold">
            Progress: {completedCount} / {totalChapters} Chapters ({percentCompleted}%)
          </div>
        </div>

        {/* Course Main Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight mt-2">
            Theory of Linear Search & Sequential Algorithms
          </h1>
          <p className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] mt-2 leading-relaxed max-w-4xl">
            An intuitive and rigorous technical guide covering keys, element comparisons, memory indexes, time complexity phenomena, and algorithmic resolution engines.
          </p>
        </div>
      </div>

      {/* ─── TWO COLUMN LAYOUT: SIDEBAR TOC + MAIN CONTENT ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* TABLE OF CONTENTS */}
        <div className="w-full lg:col-span-4 lg:sticky lg:top-6">
          <div className="rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] shadow-xs overflow-hidden">
            {/* TOC Card Header */}
            <div className="p-4 sm:p-5 border-b border-[#E2E8F0] dark:border-[rgba(99,102,241,0.18)] flex items-center justify-between">
              <span className="font-mono text-xs font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-wider uppercase">
                TABLE OF CONTENTS
              </span>
              <span className="font-mono text-xs text-[#64748B] dark:text-[#94A3B8] font-medium">
                {totalChapters} Chapters
              </span>
            </div>

            {/* Chapter Items Vertical Full-Width List */}
            <div className="divide-y divide-[#E2E8F0] dark:divide-[rgba(99,102,241,0.15)]">
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
                        ? 'bg-[#EEF2FF]/70 dark:bg-[rgba(99,102,241,0.16)] border-[#4F46E5] dark:border-[#6366F1] text-[#4F46E5] dark:text-[#818CF8] font-bold'
                        : 'bg-white dark:bg-[#0F172A] border-transparent text-[#475569] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#16203B]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`font-mono text-xs shrink-0 ${
                        isCurrent 
                          ? 'font-extrabold text-[#4F46E5] dark:text-[#818CF8]' 
                          : 'font-medium text-[#64748B]'
                      }`}>
                        {chapterNum}
                      </span>
                      <span className={`text-xs sm:text-sm leading-snug ${isCurrent ? 'font-bold' : 'font-semibold text-[#0F172A] dark:text-[#F8FAFC]'}`}>
                        {moduleName}
                      </span>
                    </div>

                    {/* Right status indicator */}
                    {isDone ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-[#4F46E5] dark:bg-[#6366F1] shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 dark:border-slate-700 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MAIN CHAPTER CONTENT CARD */}
        <div className="lg:col-span-8 p-6 sm:p-8 lg:p-9 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] shadow-xs space-y-6">
          {/* Chapter Sub-Header: Badge + Read Time */}
          <div className="flex items-center justify-between gap-3">
            <span className="px-3 py-1 rounded-lg bg-[#EEF2FF] dark:bg-[rgba(99,102,241,0.18)] text-[#4F46E5] dark:text-[#818CF8] font-mono text-xs font-bold uppercase tracking-wider">
              CHAPTER {activeChapterNumber} // FUNDAMENTALS
            </span>
            <span className="text-[#64748B] dark:text-[#94A3B8] font-mono text-xs flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>Est. Read: 2 MIN</span>
            </span>
          </div>

          <div className="border-t border-[#E2E8F0] dark:border-[rgba(99,102,241,0.18)] pt-1" />

          {/* Chapter Title */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight uppercase">
              {activeModule.id}. {cleanTitle}
            </h2>

            {/* Executive Definition */}
            <div className="mt-4">
              <span className="font-mono text-[11px] font-extrabold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-widest block">
                EXECUTIVE DEFINITION
              </span>
              <p className="text-[#475569] dark:text-[#94A3B8] text-sm sm:text-base leading-relaxed mt-1.5 font-normal">
                {activeModule.summary}
              </p>
            </div>
          </div>

          {/* Core Intuition / Analogy Callout */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#EEF2FF]/60 dark:bg-[rgba(99,102,241,0.14)] border-l-4 border-[#4F46E5] dark:border-[#6366F1] space-y-2">
            <span className="font-mono text-xs font-extrabold text-[#4F46E5] dark:text-[#818CF8] tracking-wider uppercase block">
              CORE INTUITION // ANALOGY
            </span>
            <p className="text-sm sm:text-base text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed font-medium">
              {activeModule.realLifeExample 
                ? `"${activeModule.realLifeExample.description}"` 
                : activeModule.subtitle}
            </p>
          </div>

          {/* Computer examples if present */}
          {activeModule.computerExamples && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Search className="w-4 h-4 text-[#4F46F5] dark:text-[#6C4CFF]" />
                What Computers Search For Every Day
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModule.computerExamples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#111633] border border-[#E1E7F0] dark:border-[#25204B] text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2.5"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#4F46F5] dark:bg-[#6C4CFF] shrink-0" />
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
                    className="p-5 rounded-xl bg-[#EEF2FF]/60 dark:bg-[#6C4CFF]/15 border border-[#4F46F5]/20 dark:border-[#6C4CFF]/30 text-slate-900 dark:text-slate-100 space-y-1.5"
                  >
                    {block.heading && (
                      <h4 className="text-sm font-bold flex items-center gap-2 text-[#4F46F5] dark:text-[#A58FFF]">
                        <Lightbulb className="w-4 h-4 shrink-0 text-[#4F46F5] dark:text-[#A58FFF]" />
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
                    <div className="overflow-x-auto rounded-xl border border-[#E1E7F0] dark:border-[#25204B]">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-[#F8FAFC] dark:bg-[#111633] font-mono text-xs text-slate-700 dark:text-slate-300">
                          <tr>
                            <th className="p-3.5 border-b border-[#E1E7F0] dark:border-[#25204B]">Index</th>
                            <th className="p-3.5 border-b border-[#E1E7F0] dark:border-[#25204B]">Value</th>
                            <th className="p-3.5 border-b border-[#E1E7F0] dark:border-[#25204B]">Explanation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E1E7F0] dark:divide-[#25204B] font-mono">
                          {block.data.map((row: any, rIdx: number) => (
                            <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-[#111633]/60">
                              <td className="p-3.5 font-bold text-[#4F46F5] dark:text-[#A58FFF]">
                                [{row.index}]
                              </td>
                              <td className="p-3.5 font-extrabold text-[#11182D] dark:text-[#F5F7FF]">
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
                  <div key={idx} className="p-5 rounded-2xl bg-[#080D20] text-white space-y-4 shadow-sm border border-[#25204B]">
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
                          <div className="w-full py-3 rounded-xl bg-[#111633] border border-[#25204B] font-mono font-extrabold text-base flex items-center justify-center">
                            {num}
                          </div>
                        </div>
                      ))}
                    </div>

                    {steps && (
                      <div className="space-y-2 pt-2 border-t border-[#25204B]">
                        {steps.map((st: any, sIdx: number) => (
                          <div
                            key={sIdx}
                            className={`p-2.5 rounded-xl font-mono text-xs flex items-center justify-between ${
                              st.match
                                ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold'
                                : 'bg-[#111633] text-slate-300'
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
                        <ListChecks className="w-4 h-4 text-[#4F46F5] dark:text-[#6C4CFF]" />
                        {block.heading}
                      </h4>
                    )}
                    <div className="space-y-2">
                      {block.data.map((item: string, iIdx: number) => (
                        <div
                          key={iIdx}
                          className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#111633] border border-[#E1E7F0] dark:border-[#25204B] text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#EEF2FF] dark:bg-[#6C4CFF]/20 text-[#4F46F5] dark:text-[#A58FFF] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
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
                          className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#111633] border border-[#E1E7F0] dark:border-[#25204B] space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-[#11182D] dark:text-[#F5F7FF] text-sm">
                              {card.title}
                            </h5>
                            {card.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEF2FF] dark:bg-[#6C4CFF]/20 text-[#4F46F5] dark:text-[#A58FFF]">
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

              if (block.type === 'visual_diagram' && block.data) {
                const { title, array, highlightIndex, target, caption } = block.data;
                return (
                  <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-[#080D20] border border-[#25204B] text-white space-y-4 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#25204B] pb-3">
                      <h4 className="text-xs sm:text-sm font-bold text-indigo-300 font-mono tracking-wide uppercase flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        {block.heading || title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          TARGET = {target}
                        </span>
                      </div>
                    </div>

                    <div className="overflow-x-auto py-2">
                      <div className="min-w-[320px] flex flex-col items-center gap-3">
                        <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
                          ARRAY COLLECTION
                        </span>
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                          {array.map((num: number, aIdx: number) => {
                            const isTarget = aIdx === highlightIndex;
                            return (
                              <div key={aIdx} className="flex flex-col items-center gap-1.5">
                                <span className={`text-[11px] font-mono font-bold ${isTarget ? 'text-amber-400' : 'text-slate-400'}`}>
                                  [{aIdx}]
                                </span>
                                <div
                                  className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl flex items-center justify-center font-mono text-base sm:text-lg font-extrabold transition-all duration-200 ${
                                    isTarget
                                      ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/40 shadow-lg scale-105'
                                      : 'bg-[#111633] border border-[#25204B] text-white'
                                  }`}
                                >
                                  {num}
                                </div>
                                {isTarget && (
                                  <div className="flex flex-col items-center animate-bounce mt-1">
                                    <span className="text-amber-400 text-xs font-mono font-extrabold">▲</span>
                                    <span className="text-[10px] font-mono font-extrabold text-amber-300 uppercase tracking-wider">
                                      TARGET
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {caption && (
                      <p className="text-xs sm:text-sm text-slate-300 text-center font-medium pt-1 border-t border-[#25204B]">
                        {caption}
                      </p>
                    )}
                  </div>
                );
              }

              if (block.type === 'step_trace' && block.data) {
                const { array, target, steps } = block.data;
                return (
                  <div key={idx} className="space-y-4">
                    {block.heading && (
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h4 className="text-sm font-bold text-[#11182D] dark:text-[#F5F7FF] flex items-center gap-2 font-mono uppercase">
                          <ListChecks className="w-4 h-4 text-[#4F46F5] dark:text-[#6C4CFF]" />
                          {block.heading}
                        </h4>
                        <span className="px-2.5 py-1 rounded-md bg-[#EEF2FF] dark:bg-[#6C4CFF]/15 border border-[#4F46F5]/20 dark:border-[#6C4CFF]/30 font-mono text-xs font-bold text-[#4F46F5] dark:text-[#A58FFF]">
                          Target: {target}
                        </span>
                      </div>
                    )}

                    <div className="space-y-3">
                      {steps.map((st: any, sIdx: number) => {
                        return (
                          <div
                            key={sIdx}
                            className={`p-4 rounded-xl border transition-all ${
                              st.match
                                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700/60'
                                : 'bg-[#F8FAFC] dark:bg-[#111633] border-[#E1E7F0] dark:border-[#25204B]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className={`font-mono text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                                st.match 
                                  ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300' 
                                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                              }`}>
                                Step {st.step}: Checking Index {st.index}
                              </span>
                              <span className={`text-xs font-mono font-bold flex items-center gap-1 ${
                                st.match ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'
                              }`}>
                                {st.match ? (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    FOUND!
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="w-3.5 h-3.5" />
                                    Not Match
                                  </>
                                )}
                              </span>
                            </div>

                            {/* Array visual at this step */}
                            <div className="overflow-x-auto pb-1">
                              <div className="flex items-center gap-2">
                                {array.map((val: number, aIdx: number) => {
                                  const isCurrent = aIdx === st.index;
                                  const isFound = isCurrent && st.match;
                                  const isCheckedPast = aIdx < st.index;
                                  return (
                                    <div key={aIdx} className="flex flex-col items-center gap-1">
                                      <span className="text-[10px] font-mono text-slate-400">
                                        [{aIdx}]
                                      </span>
                                      <div
                                        className={`w-10 h-11 sm:w-11 sm:h-12 rounded-xl flex items-center justify-center font-mono text-sm font-extrabold border transition-all ${
                                          isFound
                                            ? 'bg-emerald-500 text-white border-emerald-400 ring-2 ring-emerald-400/40 shadow-sm'
                                            : isCurrent
                                            ? 'bg-[#4F46F5] dark:bg-[#6C4CFF] text-white border-indigo-400 ring-2 ring-indigo-400/30'
                                            : isCheckedPast
                                            ? 'bg-slate-200 dark:bg-[#080D20] text-slate-400 border-slate-300 dark:border-[#25204B] opacity-60'
                                            : 'bg-white dark:bg-[#0B1025] text-slate-800 dark:text-slate-200 border-[#E1E7F0] dark:border-[#25204B]'
                                        }`}
                                      >
                                        {val}
                                      </div>
                                      {isCurrent && (
                                        <span className={`text-[10px] font-mono font-extrabold uppercase ${
                                          isFound ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#4F46F5] dark:text-[#A58FFF]'
                                        }`}>
                                          {isFound ? 'FOUND ✓' : 'CHECKING'}
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <p className="text-xs sm:text-sm font-mono mt-2.5 text-slate-700 dark:text-slate-300 font-medium">
                              {st.note}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              if (block.type === 'index_diagram' && block.data) {
                const { array, highlightIndex, label } = block.data;
                return (
                  <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0B1025] border border-[#E1E7F0] dark:border-[#25204B] space-y-4 shadow-xs">
                    {block.heading && (
                      <h4 className="text-sm font-bold text-[#11182D] dark:text-[#F5F7FF] font-mono uppercase flex items-center gap-2">
                        <Hash className="w-4 h-4 text-[#4F46F5] dark:text-[#6C4CFF]" />
                        {block.heading}
                      </h4>
                    )}

                    <div className="overflow-x-auto py-2">
                      <div className="min-w-[320px] flex flex-col items-center gap-3">
                        <div className="grid grid-cols-5 gap-2 sm:gap-3 w-full max-w-lg">
                          {array.map((num: number, aIdx: number) => {
                            const isHighlight = aIdx === highlightIndex;
                            return (
                              <div key={aIdx} className="flex flex-col items-center gap-1.5">
                                <div className="px-2.5 py-1 rounded-md bg-[#EEF2FF] dark:bg-[#6C4CFF]/15 border border-[#4F46F5]/20 dark:border-[#6C4CFF]/30 text-[#4F46F5] dark:text-[#A58FFF] font-mono text-xs font-bold w-full text-center">
                                  Index {aIdx}
                                </div>
                                <div
                                  className={`w-full py-3 sm:py-4 rounded-xl flex items-center justify-center font-mono text-base sm:text-lg font-extrabold border transition-all ${
                                    isHighlight
                                      ? 'bg-[#4F46F5] dark:bg-[#6C4CFF] text-white border-indigo-400 shadow-md ring-2 ring-indigo-400/40 scale-105'
                                      : 'bg-[#F8FAFC] dark:bg-[#111633] border-[#E1E7F0] dark:border-[#25204B] text-[#11182D] dark:text-[#F5F7FF]'
                                  }`}
                                >
                                  {num}
                                </div>
                                {isHighlight && (
                                  <span className="text-[10px] font-mono font-extrabold text-[#4F46F5] dark:text-[#A58FFF] uppercase tracking-wide">
                                    Target 42
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {label && (
                      <div className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#111633] border border-[#E1E7F0] dark:border-[#25204B] text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium text-center">
                        {label}
                      </div>
                    )}
                  </div>
                );
              }

              if (block.type === 'flowchart' && Array.isArray(block.data)) {
                return (
                  <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-[#080D20] text-white space-y-4 shadow-sm border border-[#25204B]">
                    {block.heading && (
                      <h4 className="text-xs sm:text-sm font-bold text-indigo-300 font-mono uppercase tracking-wider flex items-center gap-2">
                        <Repeat className="w-4 h-4 text-indigo-400" />
                        {block.heading}
                      </h4>
                    )}

                    <div className="space-y-2">
                      {block.data.map((item: any, fIdx: number) => (
                        <div key={fIdx} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-3 rounded-xl bg-[#111633] border border-[#25204B]">
                          <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded-md bg-[#4F46F5] dark:bg-[#6C4CFF] text-white shrink-0">
                            {item.step}
                          </span>
                          <span className="font-mono text-xs sm:text-sm text-slate-200 font-medium">
                            {item.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (block.type === 'not_found_visual' && block.data) {
                const { array, target, comparisons } = block.data;
                return (
                  <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0B1025] border border-red-200 dark:border-red-900/60 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h4 className="text-sm font-bold text-red-600 dark:text-red-400 font-mono uppercase flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        {block.heading}
                      </h4>
                      <span className="px-2.5 py-1 rounded-md bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900 font-mono text-xs font-bold text-red-700 dark:text-red-300">
                        Target = {target} (MISSING)
                      </span>
                    </div>

                    <div className="overflow-x-auto py-2">
                      <div className="min-w-[300px] flex items-center justify-center gap-2 sm:gap-3">
                        {array.map((num: number, aIdx: number) => (
                          <div key={aIdx} className="flex flex-col items-center gap-1.5">
                            <span className="text-[11px] font-mono text-slate-400">[{aIdx}]</span>
                            <div className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl bg-slate-100 dark:bg-[#111633] border border-slate-300 dark:border-[#25204B] text-slate-700 dark:text-slate-300 font-mono text-base font-extrabold flex items-center justify-center">
                              {num}
                            </div>
                            <span className="text-red-500 text-xs font-bold font-mono">✗</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-xs sm:text-sm text-red-900 dark:text-red-200 font-mono space-y-1">
                      <div className="font-bold flex items-center gap-2">
                        <span>Search Result: NOT FOUND ➔ Return -1</span>
                      </div>
                      <p className="text-xs font-sans text-red-700 dark:text-red-300 font-normal">
                        Every single element was checked sequentially and all comparisons failed.
                      </p>
                    </div>
                  </div>
                );
              }

              if (block.type === 'comparison_cases' && Array.isArray(block.data)) {
                return (
                  <div key={idx} className="space-y-4">
                    {block.heading && (
                      <h4 className="text-sm font-bold text-[#11182D] dark:text-[#F5F7FF] font-mono uppercase flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-500" />
                        {block.heading}
                      </h4>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {block.data.map((cCase: any, cIdx: number) => (
                        <div
                          key={cIdx}
                          className="p-5 rounded-xl bg-white dark:bg-[#0B1025] border border-[#E1E7F0] dark:border-[#25204B] space-y-3 shadow-xs"
                        >
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-[#11182D] dark:text-[#F5F7FF] text-sm">
                              {cCase.title}
                            </h5>
                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#EEF2FF] dark:bg-[#6C4CFF]/20 text-[#4F46F5] dark:text-[#A58FFF] border border-[#4F46F5]/20 dark:border-[#6C4CFF]/30">
                              {cCase.badge}
                            </span>
                          </div>

                          {/* Array preview */}
                          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                            {cCase.array.map((val: number, aIdx: number) => {
                              const isTargetMatch = aIdx === cCase.targetIndex;
                              return (
                                <div
                                  key={aIdx}
                                  className={`w-9 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold border shrink-0 ${
                                    isTargetMatch
                                      ? 'bg-emerald-500 text-white border-emerald-400 font-extrabold'
                                      : 'bg-[#F8FAFC] dark:bg-[#111633] text-slate-700 dark:text-slate-300 border-[#E1E7F0] dark:border-[#25204B]'
                                  }`}
                                >
                                  {val}
                                </div>
                              );
                            })}
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                            {cCase.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (block.type === 'complexity_breakdown' && Array.isArray(block.data)) {
                return (
                  <div key={idx} className="space-y-4">
                    {block.heading && (
                      <h4 className="text-sm font-bold text-[#11182D] dark:text-[#F5F7FF] font-mono uppercase flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#4F46F5] dark:text-[#6C4CFF]" />
                        {block.heading}
                      </h4>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {block.data.map((cItem: any, cIdx: number) => (
                        <div
                          key={cIdx}
                          className="p-5 rounded-xl bg-white dark:bg-[#0B1025] border border-[#E1E7F0] dark:border-[#25204B] space-y-2.5 shadow-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-[#11182D] dark:text-[#F5F7FF]">
                              {cItem.caseType}
                            </span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#F8FAFC] dark:bg-[#111633] text-slate-600 dark:text-slate-300 border border-[#E1E7F0] dark:border-[#25204B]">
                              {cItem.badge}
                            </span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black font-mono text-[#4F46F5] dark:text-[#A58FFF]">
                              {cItem.notation}
                            </span>
                            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                              ({cItem.comparisons})
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                            {cItem.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (block.type === 'use_case_comparison' && block.data) {
                const { good, caution } = block.data;
                return (
                  <div key={idx} className="space-y-4">
                    {block.heading && (
                      <h4 className="text-sm font-bold text-[#11182D] dark:text-[#F5F7FF] font-mono uppercase">
                        {block.heading}
                      </h4>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
                        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm font-mono uppercase">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>When Linear Search Is Ideal</span>
                        </div>
                        <ul className="space-y-2">
                          {good.map((item: string, gIdx: number) => (
                            <li key={gIdx} className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 flex items-start gap-2">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-3">
                        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm font-mono uppercase">
                          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          <span>When To Consider Other Methods</span>
                        </div>
                        <ul className="space-y-2">
                          {caution.map((item: string, cIdx: number) => (
                            <li key={cIdx} className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2">
                              <span className="text-amber-600 font-bold">!</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              }

              if (block.type === 'multi_code' && block.data) {
                const { c, cExplanation, java, javaExplanation, python, pythonExplanation } = block.data;
                return (
                  <div key={idx} className="space-y-6">
                    {block.heading && (
                      <h4 className="text-sm font-bold text-[#11182D] dark:text-[#F5F7FF] font-mono uppercase flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-[#4F46F5] dark:text-[#6C4CFF]" />
                        {block.heading}
                      </h4>
                    )}

                    {/* C Code */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 font-mono text-xs font-extrabold text-slate-700 dark:text-slate-300">
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-200 dark:bg-[#111633] text-slate-800 dark:text-slate-200">
                          PART B // C IMPLEMENTATION
                        </span>
                      </div>
                      <CodeBlock code={c} language="c" title="linear_search.c" />
                      {cExplanation && (
                        <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#111633] border border-[#E1E7F0] dark:border-[#25204B] text-xs text-slate-600 dark:text-slate-400 space-y-1">
                          <span className="font-bold text-slate-800 dark:text-slate-200 block">Explanation:</span>
                          <ul className="list-disc list-inside space-y-0.5">
                            {cExplanation.map((line: string, lIdx: number) => (
                              <li key={lIdx}>{line}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Java Code */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 font-mono text-xs font-extrabold text-slate-700 dark:text-slate-300">
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-200 dark:bg-[#111633] text-slate-800 dark:text-slate-200">
                          PART C // JAVA IMPLEMENTATION
                        </span>
                      </div>
                      <CodeBlock code={java} language="java" title="LinearSearch.java" />
                      {javaExplanation && (
                        <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#111633] border border-[#E1E7F0] dark:border-[#25204B] text-xs text-slate-600 dark:text-slate-400 space-y-1">
                          <span className="font-bold text-slate-800 dark:text-slate-200 block">Explanation:</span>
                          <ul className="list-disc list-inside space-y-0.5">
                            {javaExplanation.map((line: string, lIdx: number) => (
                              <li key={lIdx}>{line}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Python Code */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 font-mono text-xs font-extrabold text-slate-700 dark:text-slate-300">
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-200 dark:bg-[#111633] text-slate-800 dark:text-slate-200">
                          PART D // PYTHON IMPLEMENTATION
                        </span>
                      </div>
                      <CodeBlock code={python} language="python" title="linear_search.py" />
                      {pythonExplanation && (
                        <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-[#111633] border border-[#E1E7F0] dark:border-[#25204B] text-xs text-slate-600 dark:text-slate-400 space-y-1">
                          <span className="font-bold text-slate-800 dark:text-slate-200 block">Explanation:</span>
                          <ul className="list-disc list-inside space-y-0.5">
                            {pythonExplanation.map((line: string, lIdx: number) => (
                              <li key={lIdx}>{line}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              if (block.type === 'complexity_summary' && block.data) {
                const { time, space } = block.data;
                return (
                  <div key={idx} className="p-5 rounded-xl bg-[#EEF2FF]/60 dark:bg-[#6C4CFF]/15 border border-[#4F46F5]/20 dark:border-[#6C4CFF]/30 space-y-3">
                    {block.heading && (
                      <h4 className="text-xs font-mono font-extrabold uppercase text-[#4F46F5] dark:text-[#A58FFF] tracking-wider">
                        {block.heading}
                      </h4>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-[#F1F5F9] dark:bg-[#16203B] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] space-y-1">
                        <span className="text-xs font-mono font-bold text-[#64748B] dark:text-[#94A3B8] uppercase">
                          Time Complexity
                        </span>
                        <div className="text-lg font-mono font-black text-[#4F46E5] dark:text-[#818CF8]">
                          O(n)
                        </div>
                        <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                          {time}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#F1F5F9] dark:bg-[#16203B] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] space-y-1">
                        <span className="text-xs font-mono font-bold text-[#64748B] dark:text-[#94A3B8] uppercase">
                          Space Complexity
                        </span>
                        <div className="text-lg font-mono font-black text-emerald-600 dark:text-emerald-400">
                          O(1)
                        </div>
                        <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                          {space}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }

              if (block.type === 'code' && block.data) {
                return (
                  <div key={idx} className="space-y-2">
                    {block.heading && (
                      <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-[#4F46E5] dark:text-[#818CF8]" />
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
          <div className="p-5 rounded-xl bg-[#EEF2FF]/60 dark:bg-[rgba(99,102,241,0.14)] border border-[rgba(79,70,229,0.2)] dark:border-[rgba(99,102,241,0.3)] space-y-1.5">
            <div className="flex items-center gap-2 text-[#4F46E5] dark:text-[#818CF8] text-xs font-extrabold uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4" />
              <span>Key Takeaway</span>
            </div>
            <p className="text-sm md:text-base font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed">
              {activeModule.keyTakeaway}
            </p>
          </div>

          {/* Bottom Module Controls */}
          <div className="pt-6 border-t border-[#E2E8F0] dark:border-[rgba(99,102,241,0.18)] flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              disabled={activeModuleId === 1}
              className="px-5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] text-xs font-bold text-[#475569] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#16203B] disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Chapter</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleMarkComplete}
                disabled={isCompleted}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white shadow-xs'
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
                    <span>Mark Complete</span>
                  </>
                )}
              </button>

              {activeModuleId < totalChapters ? (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-[#0F172A] dark:bg-[#F8FAFC] text-white dark:text-[#0F172A] font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 flex items-center gap-2 transition cursor-pointer"
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
                  className="px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white font-bold text-xs shadow-xs flex items-center gap-2 transition cursor-pointer"
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

