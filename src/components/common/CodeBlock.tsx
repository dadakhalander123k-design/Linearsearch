import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = 'java', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-[#E1E7F0] dark:border-[#25204B] bg-[#0A0F24] dark:bg-[#070B1C] text-slate-100 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0D1430] dark:bg-[#0B1025] border-b border-[#25204B]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {title && <span className="text-xs font-mono text-[#AAB6D1] ml-2">{title}</span>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-semibold text-[#6C4CFF] dark:text-[#7E60FF] uppercase tracking-wider">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/10 transition"
            title="Copy code"
            aria-label="Copy code to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <pre className="p-4 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto text-[#D5DCF7] selection:bg-[#4F46F5]/40">
        <code>{code}</code>
      </pre>
    </div>
  );
}
