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
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#0F172A] rounded-3xl shadow-2xl border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
        {/* Header Actions */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[rgba(99,102,241,0.18)] pb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-[#0F172A] dark:text-[#F8FAFC] text-base sm:text-lg">
              Official Certificate of Mastery
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl text-[#475569] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#16203B] transition cursor-pointer"
              title="Print Certificate"
              aria-label="Print Certificate"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:bg-[#F1F5F9] dark:hover:bg-[#16203B] transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Frame Preview */}
        <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-amber-50/70 via-white to-amber-50/70 dark:from-[#090D1A] dark:via-[#0F172A] dark:to-[#090D1A] border-2 border-amber-300 dark:border-amber-700/60 text-center space-y-6 shadow-xs relative overflow-hidden">
          {/* Subtle background seal */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Award className="w-96 h-96 text-amber-600" />
          </div>

          <div className="space-y-1 relative z-10">
            <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400 tracking-widest uppercase">
              AlgoLearn Academy • Verified Certificate
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">
              Certificate of Completion
            </h2>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] pt-1">
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
                  className="px-3 py-1.5 rounded-xl border border-[#4F46E5] text-center font-bold text-[#0F172A] dark:text-white bg-white dark:bg-[#16203B] text-base focus:outline-hidden"
                  placeholder="Enter full name"
                />
                <button
                  onClick={handleSaveName}
                  className="px-3 py-1.5 bg-[#4F46E5] dark:bg-[#6366F1] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="inline-block group cursor-pointer" onClick={() => setEditingName(true)}>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4F46E5] dark:text-[#818CF8] border-b-2 border-dashed border-[#4F46E5]/40 dark:border-[#6366F1]/40 pb-1 px-4 inline-block">
                  {progress.learnerName}
                </h1>
                <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] block mt-1 group-hover:text-[#4F46E5] dark:group-hover:text-[#818CF8]">
                  (Click name to customize)
                </span>
              </div>
            )}
          </div>

          <div className="max-w-xl mx-auto space-y-2 relative z-10">
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              has successfully completed all theory modules, interactive laboratories, sequential search challenges, and the comprehensive evaluation for:
            </p>
            <h4 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
              Linear Search Algorithm & Sequential Analysis
            </h4>
          </div>

          {/* Footer details */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-amber-200 dark:border-amber-900/60 relative z-10 text-xs">
            <div className="flex flex-col items-center">
              <span className="font-mono text-[10px] text-[#64748B] dark:text-[#94A3B8]">Date Issued</span>
              <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-1 mt-0.5">
                <Calendar className="w-3 h-3 text-amber-500" />
                {currentDate}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-mono text-[10px] text-[#64748B] dark:text-[#94A3B8]">Credential ID</span>
              <span className="font-mono font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-0.5">
                ALGO-LS-{((progress.completedTheoryModules.length * 13 + progress.completedGameLevels.length * 29 + 104) * 8121).toString().slice(-6).padStart(6, '7')}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-[#64748B] dark:text-[#94A3B8] flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Verified AlgoLearn Completion Credential
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-[#0F172A] dark:bg-[#F8FAFC] text-white dark:text-[#090D1A] text-xs font-bold hover:opacity-90 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] text-xs font-semibold text-[#475569] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#16203B] transition cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
