interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  sublabel?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'indigo' | 'emerald' | 'amber' | 'purple';
  showPercentage?: boolean;
}

export function ProgressBar({
  value,
  label,
  sublabel,
  size = 'md',
  color = 'indigo',
  showPercentage = true,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorClasses = {
    indigo: 'bg-[#4F46E5] dark:bg-[#6366F1]',
    emerald: 'bg-emerald-500 dark:bg-emerald-400',
    amber: 'bg-amber-500 dark:bg-amber-400',
    purple: 'bg-[#6366F1] dark:bg-[#818CF8]',
  };

  return (
    <div className="w-full space-y-1.5">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="text-[#0F172A] dark:text-[#F8FAFC]">{label}</span>
          <div className="flex items-center gap-2">
            {sublabel && <span className="text-[#64748B] dark:text-[#94A3B8] font-normal">{sublabel}</span>}
            {showPercentage && <span className="font-mono text-[#4F46E5] dark:text-[#818CF8] font-bold">{clamped}%</span>}
          </div>
        </div>
      )}
      <div className={`w-full bg-[#E2E8F0] dark:bg-[#16203B] rounded-full overflow-hidden border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] ${sizeClasses[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorClasses[color]}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
