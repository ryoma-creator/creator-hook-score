"use client";

export default function HeroScoreCard() {
  const score = 87;
  const circumference = 314;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="w-64 sm:w-72 bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/40">
      {/* Ring */}
      <div className="relative w-40 h-40 mx-auto mb-5">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r="50"
            fill="none" stroke="#1e293b" strokeWidth="10"
          />
          <circle
            cx="60" cy="60" r="50"
            fill="none" stroke="#4ade80" strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="score-ring-animate"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-green-400">{score}</span>
          <span className="text-[10px] text-white/40 mt-0.5">/ 100</span>
        </div>
      </div>

      {/* Label */}
      <p className="text-center text-sm font-bold text-white/90 tracking-wide">
        Creator Hook Score™
      </p>
      <p className="text-center text-xs text-green-400/80 mt-1 font-medium">
        ✅ High viral potential
      </p>
    </div>
  );
}
