import { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
}

export function ResetModal({
  isOpen,
  onClose,
  onConfirmReset,
}: ResetModalProps) {
  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-modal-title"
    >
      <div
        className="relative w-full max-w-[420px] bg-white dark:bg-[#0B1025] rounded-3xl border border-[#E1E7F0] dark:border-[#25204B] shadow-2xl p-6 sm:p-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Warning Alert Icon */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-900/40 flex items-center justify-center text-rose-500 dark:text-rose-400 shadow-xs mb-4">
          <AlertTriangle className="w-7 h-7 stroke-[2.2]" />
        </div>

        {/* Modal Title */}
        <h3
          id="reset-modal-title"
          className="text-xl sm:text-2xl font-black text-[#11182D] dark:text-[#F5F7FF] uppercase tracking-tight"
        >
          RESET PROGRESS?
        </h3>

        {/* Modal Primary & Secondary Description */}
        <div className="mt-3 space-y-1.5">
          <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
            Are you sure you want to reset your learning progress?
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
            All completed theory chapters, watched videos, completed game levels, quiz progress, and mastery progress will be reset.
          </p>
        </div>

        {/* Bottom Action Buttons: EXIT and RESET */}
        <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl border border-[#E1E7F0] dark:border-[#25204B] bg-[#F8FAFC] dark:bg-[#111633] hover:bg-slate-100 dark:hover:bg-[#191F44] text-slate-800 dark:text-slate-200 font-extrabold text-xs sm:text-sm tracking-wide uppercase transition active:scale-95 cursor-pointer focus:outline-hidden"
          >
            EXIT
          </button>

          <button
            type="button"
            onClick={() => {
              onConfirmReset();
              onClose();
            }}
            className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-xs sm:text-sm tracking-wide uppercase flex items-center justify-center gap-1.5 transition shadow-md shadow-red-600/20 active:scale-95 cursor-pointer focus:outline-hidden"
          >
            <RotateCcw className="w-4 h-4 stroke-[2.5]" />
            <span>RESET</span>
          </button>
        </div>
      </div>
    </div>
  );
}
