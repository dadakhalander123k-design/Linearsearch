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
    indigo: 'bg-indigo-600 dark:bg-indigo-500',
    emerald: 'bg-emerald-500 dark:bg-emerald-400',
    amber: 'bg-amber-500 dark:bg-amber-400',
    purple: 'bg-purple-600 dark:bg-purple-500',
  };

  return (
    <div className="w-full space-y-1.5">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="text-slate-700 dark:text-slate-300">{label}</span>
          <div className="flex items-center gap-2">
            {sublabel && <span className="text-slate-500 dark:text-slate-400 font-normal">{sublabel}</span>}
            {showPercentage && <span className="font-mono text-indigo-600 dark:text-indigo-400">{clamped}%</span>}
          </div>
        </div>
      )}
      <div className={`w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorClasses[color]}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
