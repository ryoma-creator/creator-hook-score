"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-white/10 bg-surface/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🎯</span>
          <span className="font-bold text-lg gradient-text group-hover:opacity-80 transition">
            Hook Score
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/check"
            className="text-sm font-medium text-white/70 hover:text-white transition"
          >
            Check Hook
          </Link>
        </nav>
      </div>
    </header>
  );
}
