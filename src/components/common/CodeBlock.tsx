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
    <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] bg-[#0A0E1F] dark:bg-[#070A16] text-slate-100 shadow-xs">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0F162E] dark:bg-[#0B0F1F] border-b border-[rgba(99,102,241,0.18)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {title && <span className="text-xs font-mono text-[#94A3B8] ml-2">{title}</span>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-semibold text-[#818CF8] uppercase tracking-wider">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/10 transition cursor-pointer"
            title="Copy code"
            aria-label="Copy code to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <pre className="p-4 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto text-[#E2E8F0] selection:bg-[#4F46E5]/40">
        <code>{code}</code>
      </pre>
    </div>
  );
}
