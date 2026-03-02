import { Signals } from "@/lib/scoreHook";

interface SignalChecklistProps {
  signals: Signals;
}

const SIGNAL_LABELS: { key: keyof Signals; label: string; points: number }[] = [
  { key: "wordCountOk", label: "Word count 6–12", points: 15 },
  { key: "hasDigit", label: "Contains a digit", points: 15 },
  { key: "hasQuestion", label: "Question mark (?)", points: 10 },
  { key: "hasYou", label: 'Uses "you"', points: 10 },
  { key: "hasPowerWord", label: "Power word detected", points: 20 },
  { key: "hasEmotionWord", label: "Emotion word detected", points: 10 },
  { key: "hasSpecificity", label: "Specificity marker (%, $, time)", points: 10 },
  { key: "hasAllCaps", label: "ALL CAPS emphasis", points: 10 },
];

export default function SignalChecklist({ signals }: SignalChecklistProps) {
  return (
    <div className="space-y-2">
      {SIGNAL_LABELS.map(({ key, label, points }) => {
        const hit = signals[key];
        return (
          <div
            key={key}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition ${
              hit
                ? "bg-green-500/10 border-green-500/20"
                : "bg-white/5 border-white/10"
            }`}
          >
            <span className="text-lg">{hit ? "✅" : "❌"}</span>
            <span className={`flex-1 text-sm ${hit ? "text-white/90" : "text-white/50"}`}>
              {label}
            </span>
            <span
              className={`text-xs font-mono font-bold ${
                hit ? "text-green-400" : "text-white/30"
              }`}
            >
              {hit ? `+${points}` : `+0`}
            </span>
          </div>
        );
      })}
    </div>
  );
}
