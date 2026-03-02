"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScoreGauge from "@/components/ScoreGauge";
import GradeBadge from "@/components/GradeBadge";
import SignalChecklist from "@/components/SignalChecklist";
import TipCard from "@/components/TipCard";
import { scoreHook } from "@/lib/scoreHook";

function RewriteRow({ index, text }: { index: number; text: string }) {
  const [copied, setCopied] = useState(false);
  const labels = ["🧠 Curiosity", "📐 Specificity", "👤 Direct"];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="glass-card p-4 flex items-start gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-1">
          {labels[index]}
        </p>
        <p className="text-sm text-white/90 leading-relaxed break-words">
          &quot;{text}&quot;
        </p>
      </div>
      <button
        onClick={handleCopy}
        className={`flex-shrink-0 px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
          copied
            ? "bg-green-500/20 border-green-500/30 text-green-400"
            : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20"
        }`}
      >
        {copied ? "✓ Copied" : "Copy"}
      </button>
    </div>
  );
}

function ResultContent() {
  const searchParams = useSearchParams();
  const hookText = searchParams.get("t") ?? "";
  const result = scoreHook(hookText);

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      alert("Link copied to clipboard! 🎉");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = pageUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      alert("Link copied to clipboard! 🎉");
    }
  };

  const handleShareX = () => {
    const text = `My Creator Hook Score™ is ${result.score}/100. Try yours:`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(pageUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!hookText) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-white/50">No hook text provided.</p>
        <Link href="/check" className="px-6 py-2 bg-brand-500 text-white font-bold rounded-xl">
          Go to Check →
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-2xl mx-auto px-4 py-12 w-full">
      {/* Hook preview */}
      <div className="glass-card p-5 mb-8">
        <p className="text-xs text-white/40 mb-2 font-medium uppercase tracking-wider">Your Hook</p>
        <p className="text-lg text-white/90 font-medium leading-relaxed">&quot;{hookText}&quot;</p>
      </div>

      {/* Score + Grade */}
      <div className="flex flex-col items-center gap-4 mb-4">
        <ScoreGauge score={result.score} />
        <GradeBadge grade={result.grade} />
      </div>

      {/* Verdict */}
      <p className="text-center text-white/70 text-lg mb-10">{result.verdict}</p>

      {/* Signals checklist */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-white/70 mb-4 uppercase tracking-wider">
          📊 Detected Signals
        </h2>
        <SignalChecklist signals={result.signals} />
      </div>

      {/* Tips */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-white/70 mb-4 uppercase tracking-wider">
          🚀 Improvement Tips
        </h2>
        <div className="space-y-3">
          {result.tips.map((tip, i) => (
            <TipCard key={i} index={i} tip={tip} />
          ))}
        </div>
      </div>

      {/* Rewrite Suggestions */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-white/70 mb-1 uppercase tracking-wider">
          ✏️ Rewrite Suggestions
        </h2>
        <p className="text-xs text-white/40 mb-4">Copy & paste — ready to use</p>
        <div className="space-y-3">
          {result.rewrites.map((rw, i) => (
            <RewriteRow key={i} index={i} text={rw} />
          ))}
        </div>
      </div>

      {/* Share buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <button
          onClick={handleCopyLink}
          className="flex-1 px-6 py-3 glass-card hover:border-white/20 text-white font-semibold text-center transition hover:scale-[1.02] active:scale-95"
        >
          📋 Copy link
        </button>
        <button
          onClick={handleShareX}
          className="flex-1 px-6 py-3 bg-black border border-white/20 hover:border-white/40 text-white font-semibold rounded-2xl text-center transition hover:scale-[1.02] active:scale-95"
        >
          𝕏 Share on X
        </button>
      </div>

      {/* Try again */}
      <div className="text-center">
        <Link
          href="/check"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95"
        >
          🔄 Try again
        </Link>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center py-20">
            <p className="text-white/50 animate-pulse">Calculating score...</p>
          </div>
        }
      >
        <ResultContent />
      </Suspense>
      <Footer />
    </>
  );
}
