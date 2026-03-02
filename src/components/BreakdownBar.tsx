interface BreakdownBarProps {
  label: string;
  points: number;
  maxPoints: number;
}

export default function BreakdownBar({ label, points, maxPoints }: BreakdownBarProps) {
  const pct = maxPoints > 0 ? (points / maxPoints) * 100 : 0;

  const barColor = () => {
    if (pct >= 80) return "bg-green-400";
    if (pct >= 50) return "bg-yellow-400";
    if (pct > 0) return "bg-orange-400";
    return "bg-red-400/50";
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-white/60 truncate">{label}</span>
          <span className="text-xs font-mono text-white/80 ml-2">
            {points}/{maxPoints}
          </span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${barColor()}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
