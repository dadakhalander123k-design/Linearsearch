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
    indigo: 'bg-[#4F46F5] dark:bg-[#6C4CFF]',
    emerald: 'bg-emerald-500 dark:bg-emerald-400',
    amber: 'bg-amber-500 dark:bg-amber-400',
    purple: 'bg-[#6C4CFF] dark:bg-[#7E60FF]',
  };

  return (
    <div className="w-full space-y-1.5">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="text-[#11182D] dark:text-[#F5F7FF]">{label}</span>
          <div className="flex items-center gap-2">
            {sublabel && <span className="text-[#506080] dark:text-[#AAB6D1] font-normal">{sublabel}</span>}
            {showPercentage && <span className="font-mono text-[#4F46F5] dark:text-[#6C4CFF] font-bold">{clamped}%</span>}
          </div>
        </div>
      )}
      <div className={`w-full bg-[#E1E7F0] dark:bg-[#0B1025] rounded-full overflow-hidden border border-[#E1E7F0] dark:border-[#25204B] ${sizeClasses[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorClasses[color]}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
