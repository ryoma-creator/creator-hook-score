import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroScoreCard from "@/components/HeroScoreCard";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* ── 1) Hero — two-column, gradient bg ── */}
        <section className="relative w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 overflow-hidden">
          {/* Subtle glow accents */}
          <div className="absolute top-1/4 -left-32 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 sm:py-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left — copy */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white">
                Your Hook Sucks.{" "}
                <span className="gradient-text">Let&apos;s Fix It.</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/55 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Stop guessing. Get an instant Creator Hook Score™ and improve
                your title in seconds.
              </p>
              <Link
                href="/check"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-lg rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/25"
              >
                Score My Hook →
              </Link>
              <p className="mt-4 text-sm text-white/35">
                Free. No signup. Takes 10 seconds.
              </p>
            </div>

            {/* Right — mock score card */}
            <div className="flex-shrink-0">
              <HeroScoreCard />
            </div>
          </div>
        </section>

        {/* ── 2) Problem / empathy ── */}
        <section className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-10">
            Why your videos don&apos;t grow
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { icon: "😴", label: "Weak opening" },
              { icon: "🤷", label: "No curiosity gap" },
              { icon: "🎯", label: "No specificity" },
              { icon: "💔", label: "No emotional trigger" },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-card p-5 flex flex-col items-center gap-2"
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="text-sm text-white/70 font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-lg text-white/50 italic">
            Your content might be good.{" "}
            <span className="text-white font-semibold not-italic">
              Your hook isn&apos;t.
            </span>
          </p>
        </section>

        {/* ── 3) What you get ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            What you get
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "📊", title: "Instant score (0–100)", desc: "Know exactly where your hook stands in seconds." },
              { icon: "💡", title: "Specific improvement tips", desc: "3 prioritized, actionable fixes — not generic advice." },
              { icon: "⚡", title: "Power word detection", desc: "See which viral triggers you're using (and missing)." },
              { icon: "🔗", title: "Shareable result link", desc: "Copy your score link or share directly on X." },
            ].map((item, i) => (
              <div key={i} className="glass-card p-6 flex items-start gap-4">
                <span className="text-3xl mt-0.5">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4) Bottom CTA ── */}
        <section className="max-w-3xl mx-auto px-4 pb-20 text-center">
          <div className="glass-card p-8 sm:p-12">
            <p className="text-2xl sm:text-3xl font-black text-white mb-6">
              Ready to fix your hook?
            </p>
            <Link
              href="/check"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-lg rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/25"
            >
              Score My Hook →
            </Link>
            <p className="mt-4 text-sm text-white/40">
              Free. No signup. Takes 10 seconds.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
