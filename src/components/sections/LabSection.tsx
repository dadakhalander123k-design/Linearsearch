import { useState, useEffect, useRef } from 'react';
import { 
  FlaskConical, 
  Play, 
  Pause, 
  StepForward, 
  RotateCcw, 
  Shuffle, 
  Sparkles, 
  Check, 
  X, 
  Info,
  CheckCircle2,
  XCircle,
  Sliders,
  ListPlus,
  AlertCircle
} from 'lucide-react';
import { sound } from '../../audio/soundEngine';

interface LabSectionProps {
  onCompleteLabActivity: (activityId: string) => void;
}

type SearchState = 'idle' | 'searching' | 'paused' | 'found' | 'not_found';

export function LabSection({ onCompleteLabActivity }: LabSectionProps) {
  const [arraySize, setArraySize] = useState<number>(8);
  const [array, setArray] = useState<number[]>([12, 7, 25, 4, 18, 33, 9, 14]);
  const [targetInput, setTargetInput] = useState<string>('25');
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchState, setSearchState] = useState<SearchState>('idle');
  const [comparisons, setComparisons] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1); // 0.5, 1, 1.5, 2
  const [log, setLog] = useState<string[]>([]);
  
  // User-defined custom array creation state
  const [customSizeInput, setCustomSizeInput] = useState<number>(8);
  const [customElements, setCustomElements] = useState<string[]>(['12', '7', '25', '4', '18', '33', '9', '14']);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [appliedSuccess, setAppliedSuccess] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);

  // Handle changing the custom array size
  const handleCustomSizeChange = (newSize: number) => {
    setValidationError(null);
    setAppliedSuccess(false);

    if (isNaN(newSize)) {
      setCustomSizeInput(newSize);
      return;
    }

    setCustomSizeInput(newSize);

    if (newSize < 1) return;
    const clamped = Math.min(Math.max(newSize, 1), 16);

    setCustomElements(prev => {
      if (clamped > prev.length) {
        const added = Array(clamped - prev.length).fill('');
        return [...prev, ...added];
      } else {
        return prev.slice(0, clamped);
      }
    });
  };

  // Handle updating an individual element input value
  const handleElementValueChange = (index: number, val: string) => {
    setValidationError(null);
    setAppliedSuccess(false);
    setCustomElements(prev => {
      const updated = [...prev];
      updated[index] = val;
      return updated;
    });
  };

  // Apply user-defined array to the Lab visualization
  const handleApplyUserArray = () => {
    // Validate size
    if (isNaN(customSizeInput) || customSizeInput < 2 || customSizeInput > 16) {
      sound.playError();
      setValidationError('Array size must be between 2 and 16.');
      return;
    }

    // Validate that all element inputs have valid numbers
    const missing: number[] = [];
    const parsed: number[] = [];

    for (let i = 0; i < customElements.length; i++) {
      const valStr = customElements[i]?.trim();
      if (valStr === '' || valStr === undefined) {
        missing.push(i + 1);
      } else {
        const n = parseInt(valStr, 10);
        if (isNaN(n)) {
          missing.push(i + 1);
        } else {
          parsed.push(n);
        }
      }
    }

    if (missing.length > 0) {
      sound.playError();
      setValidationError(`Please enter a valid number for Element ${missing.join(', ')}.`);
      return;
    }

    sound.playSuccess();
    setValidationError(null);
    setArray(parsed);
    setArraySize(parsed.length);
    handleReset(false);
    setAppliedSuccess(true);
    setTimeout(() => setAppliedSuccess(false), 3000);
  };

  // Generate random list of given size
  const handleGenerateRandom = (size = arraySize) => {
    sound.playClick();
    const newArr: number[] = [];
    const used = new Set<number>();
    while (newArr.length < size) {
      const val = Math.floor(Math.random() * 90) + 5;
      if (!used.has(val)) {
        used.add(val);
        newArr.push(val);
      }
    }
    setArray(newArr);
    setArraySize(newArr.length);
    setCustomSizeInput(newArr.length);
    setCustomElements(newArr.map(n => n.toString()));
    setValidationError(null);

    // Pick a random target (either present or not present)
    const pickPresent = Math.random() > 0.3;
    if (pickPresent && newArr.length > 0) {
      const pick = newArr[Math.floor(Math.random() * newArr.length)];
      setTargetInput(pick.toString());
    } else {
      setTargetInput((Math.floor(Math.random() * 90) + 5).toString());
    }
    handleReset(false);
  };

  const handleReset = (playSound = true) => {
    if (playSound) sound.playClick();
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setCurrentIndex(-1);
    setSearchState('idle');
    setComparisons(0);
    setLog([]);
  };

  const targetNum = parseInt(targetInput, 10);

  const stepForward = () => {
    if (isNaN(targetNum)) return;
    if (searchState === 'found' || searchState === 'not_found') return;

    const nextIdx = currentIndex + 1;

    if (nextIdx >= array.length) {
      // Reached the end -> Not found
      sound.playIncorrect();
      setSearchState('not_found');
      setLog(prev => [`❌ Index ${nextIdx - 1}: Reached end. Target ${targetNum} not found in array.`, ...prev]);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      onCompleteLabActivity('lab_search_complete');
      return;
    }

    setCurrentIndex(nextIdx);
    setComparisons(prev => prev + 1);

    const val = array[nextIdx];
    if (val === targetNum) {
      // Match found!
      sound.playFound();
      setSearchState('found');
      setLog(prev => [`🎉 Index ${nextIdx}: ${val} == ${targetNum} (FOUND! Search stops.)`, ...prev]);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      onCompleteLabActivity('lab_search_complete');
    } else {
      sound.playStep();
      setSearchState('searching');
      setLog(prev => [`Index ${nextIdx}: ${val} ≠ ${targetNum} ❌ (Mismatch, move to next)`, ...prev]);
    }
  };

  const toggleAutoPlay = () => {
    if (isNaN(targetNum)) return;
    sound.playClick();

    if (searchState === 'searching' && timerRef.current) {
      // Pause
      clearInterval(timerRef.current);
      timerRef.current = null;
      setSearchState('paused');
      return;
    }

    if (searchState === 'found' || searchState === 'not_found') {
      handleReset(false);
    }

    setSearchState('searching');
  };

  useEffect(() => {
    if (searchState === 'searching' && !timerRef.current) {
      const intervalMs = Math.round(1000 / speed);
      timerRef.current = window.setInterval(() => {
        stepForward();
      }, intervalMs);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [searchState, speed, currentIndex, array, targetNum]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
            Interactive Search Lab
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Interactive Linear Search Lab
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Create your custom array or use presets, set a target value, and watch Linear Search inspect each element one by one.
        </p>
      </div>

      {/* Custom Array Creation Panel */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <ListPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Custom Array Configuration
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose the array size, enter desired integer values, and apply to search.
              </p>
            </div>
          </div>

          {/* Size presets quick buttons */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 text-[11px] font-medium mr-1 hidden sm:inline">Size Presets:</span>
            {[4, 6, 8, 10, 12].map(sz => (
              <button
                key={sz}
                type="button"
                onClick={() => handleCustomSizeChange(sz)}
                className={`px-2.5 py-1 rounded-lg font-mono text-xs font-semibold transition ${
                  customSizeInput === sz
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Step 1 & 2: Array Size & Dynamic Element Inputs */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="w-full sm:w-56 space-y-1.5">
              <label htmlFor="custom-array-size-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Array Size (2 – 16)
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="custom-array-size-input"
                  type="number"
                  min={2}
                  max={16}
                  value={isNaN(customSizeInput) ? '' : customSizeInput}
                  onChange={(e) => {
                    const parsed = parseInt(e.target.value, 10);
                    handleCustomSizeChange(parsed);
                  }}
                  className="w-full px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex-1 text-xs text-slate-500 dark:text-slate-400 sm:pt-5">
              <span>Generating <strong className="text-indigo-600 dark:text-indigo-400 font-mono">{customElements.length}</strong> input fields below. Enter any integer for each element.</span>
            </div>
          </div>

          {/* Dynamic Element Inputs Grid */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Array Elements
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
              {customElements.map((val, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-1">
                    <span>Element {idx + 1}</span>
                    <span className="text-slate-400 font-semibold">[{idx}]</span>
                  </div>
                  <input
                    type="number"
                    value={val}
                    onChange={(e) => handleElementValueChange(idx, e.target.value)}
                    placeholder={`val`}
                    className="w-full bg-white dark:bg-slate-900 px-2 py-1.5 rounded-lg text-sm font-mono font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 text-center focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Validation Feedback & Apply Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleApplyUserArray}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold shadow-sm flex items-center gap-2 transition focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50"
              >
                <Check className="w-4 h-4" />
                <span>Apply Array</span>
              </button>

              <button
                type="button"
                onClick={() => handleGenerateRandom(customSizeInput || 8)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Randomize</span>
              </button>
            </div>

            {validationError && (
              <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {appliedSuccess && !validationError && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Custom array of {array.length} elements applied!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
        {/* Visual Array Canvas */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 text-white space-y-6 shadow-inner border border-slate-800">
          {/* Target and Status header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-slate-400">Target To Find:</span>
              <span className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-mono font-extrabold text-base shadow-sm">
                {isNaN(targetNum) ? '—' : targetNum}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono">
                <span className="text-slate-400">Comparisons:</span>
                <span className="font-bold text-indigo-400">{comparisons}</span>
              </div>

              {/* Status Badge */}
              <div className={`px-3 py-1 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 ${
                searchState === 'found'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 animate-pulse'
                  : searchState === 'not_found'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                  : searchState === 'searching'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                {searchState === 'found' && <CheckCircle2 className="w-4 h-4" />}
                {searchState === 'not_found' && <XCircle className="w-4 h-4" />}
                <span className="capitalize">{searchState}</span>
              </div>
            </div>
          </div>

          {/* Array Elements with Index and Value pointers */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span>Array Elements (N = {array.length})</span>
              <span>Linear scan: Left → Right</span>
            </div>

            <div className="overflow-x-auto pb-4 pt-2">
              <div className="flex items-center gap-3 min-w-max">
                {array.map((val, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isPast = idx < currentIndex;
                  const isMatch = isCurrent && val === targetNum;

                  return (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      {/* Pointer arrow for active index */}
                      <div className="h-5 flex items-center justify-center">
                        {isCurrent && (
                          <div className="flex flex-col items-center animate-bounce text-amber-400 font-mono text-[10px] font-bold">
                            <span>▼</span>
                          </div>
                        )}
                      </div>

                      {/* Cell box */}
                      <div
                        className={`w-14 h-16 sm:w-16 sm:h-20 rounded-2xl flex flex-col items-center justify-center font-mono transition-all duration-200 border-2 ${
                          isMatch
                            ? 'bg-emerald-600/30 border-emerald-400 text-emerald-300 scale-105 shadow-lg shadow-emerald-950 ring-4 ring-emerald-400/40'
                            : isCurrent
                            ? 'bg-indigo-600/40 border-amber-400 text-amber-300 scale-105 shadow-md ring-2 ring-amber-400/50'
                            : isPast
                            ? 'bg-slate-900/60 border-slate-700 text-slate-500 opacity-60'
                            : 'bg-slate-900 border-slate-700 text-white'
                        }`}
                      >
                        <span className="text-xs font-sans text-slate-400 text-[10px]">val</span>
                        <span className="text-base sm:text-lg font-extrabold">{val}</span>
                      </div>

                      {/* Index label */}
                      <div className="flex items-center gap-1">
                        <span className={`font-mono text-xs font-bold ${isCurrent ? 'text-amber-400' : 'text-slate-500'}`}>
                          [{idx}]
                        </span>
                      </div>

                      {/* Status indicator under cell */}
                      <div className="h-4 flex items-center justify-center">
                        {isMatch && <Check className="w-4 h-4 text-emerald-400" />}
                        {isPast && <X className="w-3.5 h-3.5 text-slate-600" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Current comparison comparison equation banner */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono">
            {currentIndex === -1 ? (
              <span className="text-xs text-slate-400">
                Ready to search. Click "Start Search" or "Step Forward".
              </span>
            ) : searchState === 'found' ? (
              <span className="text-sm font-bold text-emerald-400">
                🎉 MATCH FOUND: Array[{currentIndex}] = {array[currentIndex]} equals Target ({targetNum})!
              </span>
            ) : searchState === 'not_found' ? (
              <span className="text-sm font-bold text-red-400">
                ❌ TARGET NOT FOUND: Checked all {array.length} items without a match.
              </span>
            ) : (
              <span className="text-sm text-slate-200">
                Checking Index <strong className="text-amber-400">{currentIndex}</strong>:{' '}
                <span className="text-slate-300 font-bold">{array[currentIndex]}</span> ≠{' '}
                <span className="text-amber-300 font-bold">{targetNum}</span> ❌ (Not a match, continuing...)
              </span>
            )}
          </div>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          {/* Target Input & Quick Actions */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="search-target-number-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Search Target Number
              </label>
              <input
                id="search-target-number-input"
                type="number"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="Enter a number"
                className="w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Quick Array Presets
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[5, 8, 10, 15].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => {
                      handleCustomSizeChange(sz);
                      handleGenerateRandom(sz);
                    }}
                    className={`py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                      arraySize === sz
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {sz} items
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Playback Execution
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={toggleAutoPlay}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition"
              >
                {searchState === 'searching' ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause Search</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Start Search (Auto)</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={stepForward}
                  disabled={searchState === 'searching' || searchState === 'found' || searchState === 'not_found'}
                  className="py-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 flex items-center justify-center gap-1.5 transition"
                >
                  <StepForward className="w-3.5 h-3.5" />
                  <span>Step Forward</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleReset()}
                  className="py-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleGenerateRandom()}
                className="w-full py-2 px-3 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center gap-1.5 transition"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Generate Random List</span>
              </button>
            </div>
          </div>

          {/* Speed settings */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-500" />
                Animation Speed
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: '0.5x', val: 0.5 },
                  { label: '1x', val: 1 },
                  { label: '1.5x', val: 1.5 },
                  { label: '2x', val: 2 },
                ].map((s) => (
                  <button
                    key={s.val}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSpeed(s.val);
                    }}
                    className={`py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                      speed === s.val
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-indigo-500" />
                Active Search Array
              </span>
              <p className="font-mono text-[11px] text-slate-600 dark:text-slate-400 break-all">
                [{array.join(', ')}] ({array.length} items)
              </p>
            </div>
          </div>
        </div>

        {/* Live Step Log */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-indigo-500" />
              Live Execution Log
            </span>
            <span className="font-mono text-slate-500">{log.length} steps recorded</span>
          </div>

          <div className="h-32 overflow-y-auto p-3 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs space-y-1.5 border border-slate-800 scrollbar-thin">
            {log.length === 0 ? (
              <p className="text-slate-500 italic py-2">No steps taken yet. Press "Start Search" or "Step Forward" to begin execution.</p>
            ) : (
              log.map((item, lIdx) => (
                <div key={lIdx} className="flex items-center gap-2">
                  <span className="text-indigo-400">›</span>
                  <span>{item}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
