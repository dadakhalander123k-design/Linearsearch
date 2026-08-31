import { useState } from 'react';
import { 
  X, 
  Award, 
  Download, 
  Printer, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  ShieldCheck, 
  Calendar 
} from 'lucide-react';
import { UserProgressState } from '../../types';
import { sound } from '../../audio/soundEngine';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgressState;
  onUpdateName: (name: string) => void;
}

export function CertificateModal({
  isOpen,
  onClose,
  progress,
  onUpdateName,
}: CertificateModalProps) {
  const [editingName, setEditingName] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>(progress.learnerName);

  if (!isOpen) return null;

  const handleSaveName = () => {
    sound.playClick();
    if (nameInput.trim()) {
      onUpdateName(nameInput.trim());
      setEditingName(false);
    }
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
        {/* Header Actions */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              Official Certificate of Mastery
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Print Certificate"
              aria-label="Print Certificate"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Frame Preview */}
        <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-amber-50/70 via-white to-amber-50/70 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-4 border-double border-amber-300 dark:border-amber-700/60 text-center space-y-6 shadow-md relative overflow-hidden">
          {/* Subtle background seal */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Award className="w-96 h-96 text-amber-600" />
          </div>

          <div className="space-y-1 relative z-10">
            <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400 tracking-widest uppercase">
              AlgoLearn Academy • Verified Certificate
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-serif">
              Certificate of Completion
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              This is to proudly certify that
            </p>
          </div>

          {/* Learner Name field */}
          <div className="relative z-10 py-2">
            {editingName ? (
              <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-indigo-500 text-center font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-800 text-base focus:outline-hidden"
                  placeholder="Enter full name"
                />
                <button
                  onClick={handleSaveName}
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="inline-block group cursor-pointer" onClick={() => setEditingName(true)}>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 dark:text-indigo-300 border-b-2 border-dashed border-indigo-300 dark:border-indigo-700 pb-1 px-4 inline-block font-serif">
                  {progress.learnerName}
                </h1>
                <span className="text-[10px] text-slate-400 block mt-1 group-hover:text-indigo-500">
                  (Click name to customize)
                </span>
              </div>
            )}
          </div>

          <div className="max-w-xl mx-auto space-y-2 relative z-10">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              has successfully completed all theory modules, interactive laboratories, sequential search challenges, and the comprehensive evaluation for:
            </p>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Linear Search Algorithm & Sequential Analysis
            </h4>
          </div>

          {/* Footer details */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-amber-200 dark:border-amber-900/60 relative z-10 text-xs">
            <div className="flex flex-col items-center">
              <span className="font-mono text-[10px] text-slate-400">Date Issued</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3 h-3 text-amber-500" />
                {currentDate}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-mono text-[10px] text-slate-400">Credential ID</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                ALGO-LS-{((progress.completedTheoryModules.length * 13 + progress.completedGameLevels.length * 29 + 104) * 8121).toString().slice(-6).padStart(6, '7')}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Verified AlgoLearn Completion Credential
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
