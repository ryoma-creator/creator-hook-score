import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero with background image */}
        <section
          className="relative w-full min-h-[80vh] sm:min-h-[90vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        >
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-surface" />

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto px-4 py-20 text-center">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-brand-300 text-sm font-medium backdrop-blur-sm">
              Free • No Login • Instant Results
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6 text-white drop-shadow-lg">
              Is Your Hook Strong Enough{" "}
              <span className="gradient-text">to Go Viral?</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Get an instant score and fix your title in seconds.
            </p>
            <Link
              href="/check"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-lg rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/25"
            >
              🎯 Score My Hook
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-4xl mx-auto px-4 py-20">
          <h2 className="text-center text-2xl font-bold mb-10 text-white/90">
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "✍️", title: "Paste your hook", desc: "Type or paste the first line your viewers see." },
              { icon: "📊", title: "Get your score", desc: "Instant 0–100 score based on proven viral patterns." },
              { icon: "🚀", title: "Improve & share", desc: "Apply 3 actionable tips, then share your score." },
            ].map((step, i) => (
              <div key={i} className="glass-card p-6 text-center">
                <span className="text-4xl block mb-3">{step.icon}</span>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/50">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 pb-20 text-center">
          <div className="glass-card p-8 sm:p-12">
            <p className="text-3xl sm:text-4xl font-black mb-4">⚡ 3 seconds.</p>
            <p className="text-white/60 text-lg">
              That&apos;s all you get to hook a viewer.<br />
              Make every word count.
            </p>
            <Link
              href="/check"
              className="inline-block mt-8 px-6 py-3 border border-brand-500 text-brand-400 font-semibold rounded-xl hover:bg-brand-500/10 transition"
            >
              Try it free →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
