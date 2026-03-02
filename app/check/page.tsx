"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EXAMPLES = [
  "Stop scrolling if you want to grow on TikTok",
  "I tried this hack for 30 days and it changed everything",
  "Nobody talks about this awkward mistake…",
  "Why your hooks aren't working? Here's the truth",
  "POV: you finally found the secret to going viral in 7 days",
];

export default function CheckPage() {
  const router = useRouter();
  const [hook, setHook] = useState("");

  const wordCount = hook.trim() ? hook.trim().split(/\s+/).length : 0;

  const handleCheck = () => {
    if (!hook.trim()) return;
    const encoded = encodeURIComponent(hook.trim());
    router.push(`/result?t=${encoded}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCheck();
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl sm:text-4xl font-black text-center mb-2">
          🎯 Check Your Hook
        </h1>
        <p className="text-center text-white/50 mb-10">
          Paste your video title / hook below
        </p>

        {/* Input */}
        <div className="glass-card p-6 mb-6">
          <label htmlFor="hook-input" className="text-xs text-white/40 font-medium uppercase tracking-wider mb-2 block">
            Paste your video title / hook
          </label>
          <textarea
            id="hook-input"
            value={hook}
            onChange={(e) => setHook(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='e.g. "Stop scrolling if you want to grow on TikTok"'
            rows={3}
            maxLength={300}
            className="w-full bg-transparent text-white text-lg placeholder:text-white/30 focus:outline-none resize-none leading-relaxed"
          />
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
            <span className="text-xs text-white/40">
              {wordCount} word{wordCount !== 1 ? "s" : ""} • {hook.length}/300 chars
            </span>
            <button
              onClick={handleCheck}
              disabled={!hook.trim()}
              className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 disabled:bg-white/10 disabled:text-white/30 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 disabled:hover:scale-100"
            >
              Score my hook →
            </button>
          </div>
        </div>

        {/* Examples */}
        <div>
          <p className="text-xs text-white/40 mb-3 font-medium uppercase tracking-wider">
            💡 Examples — click to autofill
          </p>
          <div className="flex flex-col gap-2">
            {EXAMPLES.map((ex, i) => (
              <button
                key={i}
                onClick={() => setHook(ex)}
                className="text-left text-sm text-white/60 hover:text-white bg-surface-light/40 hover:bg-surface-light px-4 py-3 rounded-xl border border-white/5 hover:border-white/15 transition"
              >
                &quot;{ex}&quot;
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
