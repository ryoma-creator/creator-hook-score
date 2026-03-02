interface TipCardProps {
  index: number;
  tip: string;
}

export default function TipCard({ index, tip }: TipCardProps) {
  const icons = ["💡", "🚀", "✨"];
  return (
    <div className="glass-card p-4 flex items-start gap-3 hover:border-white/20 transition">
      <span className="text-2xl mt-0.5">{icons[index % icons.length]}</span>
      <div>
        <p className="text-xs text-white/40 font-medium mb-1">
          Tip #{index + 1}
        </p>
        <p className="text-sm text-white/90 leading-relaxed">{tip}</p>
      </div>
    </div>
  );
}
