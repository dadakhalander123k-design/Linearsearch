import { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  StepForward, 
  Info, 
  Cpu, 
  Layers, 
  Sliders 
} from 'lucide-react';
import { sound } from '../../audio/soundEngine';

export function VisualizeSection() {
  const [speed, setSpeed] = useState<'0.5x' | '1x' | '1.5x' | '2x'>('1x');
  const [targetInput, setTargetInput] = useState<string>('');
  const [arrayInput, setArrayInput] = useState<string>('');

  // 5 placeholder cells for the structural array placeholder
  const placeholderCells = [0, 1, 2, 3, 4];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* 3. VISUALIZE PAGE HEADER */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Visualize Linear Search
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Watch Linear Search find an element step by step.
        </p>
      </div>

      {/* 4. MAIN VISUALIZATION CONTAINER */}
      <div className="p-6 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Linear Search Visualization
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Interactive visualization will appear here.
              </p>
            </div>
          </div>

          <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-xs font-semibold">
            Framework Skeleton
          </div>
        </div>

        {/* 5. ARRAY VISUALIZATION PLACEHOLDER */}
        <div className="py-12 px-4 sm:px-8 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-dashed border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              Linear Search Visualization
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Interactive visualization will appear here.
            </p>
          </div>

          {/* Array Cell Placeholders [ ] [ ] [ ] [ ] [ ] */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            {placeholderCells.map((idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="w-14 h-16 sm:w-18 sm:h-20 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center shadow-xs">
                  <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
                <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">
                  {idx}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. CONTROL BAR SKELETON */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Target Input Skeleton */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Target
              </label>
              <input
                type="text"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="Enter target"
                className="w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Array Values Input Skeleton */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Array
              </label>
              <input
                type="text"
                value={arrayInput}
                onChange={(e) => setArrayInput(e.target.value)}
                placeholder="Array values"
                className="w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Buttons (Start / Step / Reset) */}
            <div className="space-y-1.5 sm:col-span-2 lg:col-span-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Search Controls
              </label>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => sound.playClick()}
                  className="flex-1 min-w-[80px] px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Start</span>
                </button>

                <button
                  type="button"
                  onClick={() => sound.playClick()}
                  className="flex-1 min-w-[80px] px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition"
                >
                  <StepForward className="w-3.5 h-3.5" />
                  <span>Step</span>
                </button>

                <button
                  type="button"
                  onClick={() => sound.playClick()}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Speed Controls Skeleton */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Speed
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {(['0.5x', '1x', '1.5x', '2x'] as const).map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSpeed(spd);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition ${
                    speed === spd
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {spd}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 7 & 8 & 9: STEP INFO PANEL, STATUS AREA & COMPLEXITY INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 7. STEP-BY-STEP INFORMATION PANEL & 8. STATUS AREA */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-500" />
              Current Step
            </h3>

            {/* 8. STATUS AREA */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold font-mono">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span>Ready</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              The current Linear Search step will appear here.
            </p>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
              Ready • Enter a target to begin.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-sans text-slate-500 uppercase tracking-wider block">
                Current Index
              </span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                —
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-sans text-slate-500 uppercase tracking-wider block">
                Current Value
              </span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                —
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-sans text-slate-500 uppercase tracking-wider block">
                Target
              </span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                —
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-sans text-slate-500 uppercase tracking-wider block">
                Comparisons
              </span>
              <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                0
              </span>
            </div>
          </div>
        </div>

        {/* 9. COMPLEXITY INFORMATION PLACEHOLDER */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-500" />
              Algorithm Information
            </h3>
          </div>

          <div className="space-y-3 font-mono">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-sans font-medium text-slate-600 dark:text-slate-400">
                Time Complexity
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold text-sm">
                O(n)
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-sans font-medium text-slate-600 dark:text-slate-400">
                Space Complexity
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-sm">
                O(1)
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-sans font-medium text-slate-600 dark:text-slate-400">
                Search Method
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-xs">
                Sequential
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
            Linear Search checks items one by one sequentially until the target is matched or all n elements have been examined.
          </p>
        </div>
      </div>
    </div>
  );
}
