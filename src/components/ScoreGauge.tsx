"use client";

import { scoreColor } from "@/lib/scoreHook";

interface ScoreGaugeProps {
  score: number;
}

export default function ScoreGauge({ score }: ScoreGaugeProps) {
  const circumference = 314;
  const offset = circumference - (score / 100) * circumference;

  const ringColor = () => {
    if (score >= 85) return "#4ade80";
    if (score >= 70) return "#34d399";
    if (score >= 50) return "#facc15";
    return "#f87171";
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-44 h-44 sm:w-48 sm:h-48">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#1e293b" strokeWidth="10" />
          <circle
            cx="60" cy="60" r="50" fill="none"
            stroke={ringColor()}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="score-ring-animate"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl font-black ${scoreColor(score)}`}>{score}</span>
          <span className="text-xs text-white/50 mt-1">/ 100</span>
        </div>
      </div>
    </div>
  );
}
