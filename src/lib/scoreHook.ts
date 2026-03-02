// ─────────────────────────────────────────────
// Creator Hook Score™ — Rule-based hook scorer
// ─────────────────────────────────────────────

export type Grade = "A" | "B" | "C" | "D";

export interface Signals {
  wordCountOk: boolean;
  hasDigit: boolean;
  hasQuestion: boolean;
  hasYou: boolean;
  hasPowerWord: boolean;
  hasEmotionWord: boolean;
  hasSpecificity: boolean;
  hasAllCaps: boolean;
}

export interface HookResult {
  score: number;       // 0-100
  grade: Grade;
  verdict: string;
  signals: Signals;
  tips: string[];      // exactly 3
  rewrites: string[];  // exactly 3 copy-paste suggestions
}

// ── Power words ──
const POWER_WORDS = [
  "free", "secret", "stop", "mistake", "why", "how", "best", "worst",
  "never", "dont", "don't", "avoid", "hidden", "truth", "fast",
];

// ── Emotion words ──
const EMOTION_WORDS = [
  "shocking", "insane", "crazy", "brutal", "embarrassing", "weird",
  "scary", "terrifying", "painful", "awkward", "obsessed", "hate", "love",
];

// ── Specificity markers ──
const SPECIFICITY_PATTERN = /%|\$|years|days|minutes|\bin\s+\d+/i;

// ── ALL CAPS word (length >= 3) ──
const ALL_CAPS_PATTERN = /\b[A-Z]{3,}\b/;

/**
 * Score a TikTok hook / video title (0–100) using rule-based heuristics.
 */
export function scoreHook(title: string): HookResult {
  const trimmed = title.trim();
  const lower = trimmed.toLowerCase();
  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const lowerWords = lower.split(/\s+/).filter(Boolean);

  // ── Signals ──
  const wordCountOk = wordCount >= 6 && wordCount <= 12;
  const hasDigit = /\d/.test(trimmed);
  const hasQuestion = trimmed.includes("?");
  const hasYou = /\byou\b/i.test(trimmed);
  const hasPowerWord = lowerWords.some((w) =>
    POWER_WORDS.some((pw) => w === pw || w.replace(/[^a-z']/g, "") === pw)
  );
  const hasEmotionWord = lowerWords.some((w) =>
    EMOTION_WORDS.some((ew) => w === ew || w.replace(/[^a-z]/g, "") === ew)
  );
  const hasSpecificity = SPECIFICITY_PATTERN.test(trimmed);
  const hasAllCaps = ALL_CAPS_PATTERN.test(trimmed);

  const signals: Signals = {
    wordCountOk,
    hasDigit,
    hasQuestion,
    hasYou,
    hasPowerWord,
    hasEmotionWord,
    hasSpecificity,
    hasAllCaps,
  };

  // ── Score ──
  let score = 0;
  if (wordCountOk)   score += 15;
  if (hasDigit)       score += 15;
  if (hasQuestion)    score += 10;
  if (hasYou)         score += 10;
  if (hasPowerWord)   score += 20;
  if (hasEmotionWord) score += 10;
  if (hasSpecificity) score += 10;
  if (hasAllCaps)     score += 10;

  score = Math.max(0, Math.min(100, score));

  // ── Grade ──
  const grade = gradeFromScore(score);
  const verdict = verdictFromGrade(grade);

  // ── Tips (exactly 3) ──
  const tips = generateTips(signals, wordCount);

  // ── Rewrites (exactly 3) ──
  const rewrites = generateRewrites(trimmed, signals);

  return { score, grade, verdict, signals, tips, rewrites };
}

function gradeFromScore(score: number): Grade {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 50) return "C";
  return "D";
}

function verdictFromGrade(grade: Grade): string {
  switch (grade) {
    case "A": return "🔥 Viral-ready hook! Ship it.";
    case "B": return "💪 Strong hook — a small tweak could make it A-tier.";
    case "C": return "👍 Decent start, but there's room to punch it up.";
    case "D": return "⚠️ Weak hook — needs serious improvement before posting.";
  }
}

/**
 * Generate exactly 3 tips, prioritized:
 * 1) word count
 * 2) specificity (digits / marker)
 * 3) power / emotion / you / question / caps (strongest missing)
 */
function generateTips(signals: Signals, wordCount: number): string[] {
  const pool: string[] = [];

  // Priority 1: word count
  if (wordCount < 6) {
    pool.push("Add 2–5 more words for clarity + punch.");
  } else if (wordCount > 12) {
    pool.push("Shorten to 6–12 words. Cut filler words.");
  }

  // Priority 2: specificity
  if (!signals.hasDigit) {
    pool.push("Add a number (e.g., '3', '7', '10x') to boost specificity.");
  }
  if (!signals.hasSpecificity) {
    pool.push("Add a concrete metric (%, $, time, or count).");
  }

  // Priority 3: power / emotion / you / question / caps
  if (!signals.hasPowerWord) {
    pool.push("Add one power word like 'secret', 'mistake', 'stop'.");
  }
  if (!signals.hasEmotionWord) {
    pool.push("Add an emotion word (e.g., 'awkward', 'insane') carefully.");
  }
  if (!signals.hasYou) {
    pool.push("Directly address the viewer with 'you'.");
  }
  if (!signals.hasQuestion) {
    pool.push("Try phrasing as a question.");
  }
  if (!signals.hasAllCaps) {
    pool.push("Add ONE emphasis word in caps (e.g., 'STOP')—don't overdo it.");
  }

  // Return exactly 3
  while (pool.length < 3) {
    pool.push("Keep testing new hooks — iteration is key to virality.");
  }
  return pool.slice(0, 3);
}

/**
 * Generate exactly 3 rewrite suggestions based on missing signals.
 * 1) Curiosity template — injects a power word if missing
 * 2) Specificity template — adds a number/time if missing
 * 3) Direct-to-viewer template — uses "you" + ALL CAPS if missing
 */
function generateRewrites(original: string, signals: Signals): string[] {
  const words = original.split(/\s+/).filter(Boolean);
  const core = words.slice(0, 8).join(" "); // keep it short for templates

  // Strip trailing punctuation for clean insertion
  const stripped = original.replace(/[?.!…]+$/, "").trim();

  // ── 1) Curiosity rewrite ──
  let curiosity: string;
  if (!signals.hasPowerWord) {
    curiosity = `The secret truth about ${stripped.toLowerCase()}`;
  } else if (!signals.hasQuestion) {
    curiosity = `Why does nobody talk about this? ${core}`;
  } else {
    curiosity = `What nobody tells you about ${stripped.toLowerCase()}`;
  }

  // ── 2) Specificity rewrite ──
  let specificity: string;
  if (!signals.hasDigit && !signals.hasSpecificity) {
    specificity = `${stripped} — 3 things you need to know in 30 days`;
  } else if (!signals.hasDigit) {
    specificity = `7 reasons why ${stripped.toLowerCase()}`;
  } else if (!signals.hasSpecificity) {
    specificity = `${stripped} (in just 5 minutes)`;
  } else {
    specificity = `${stripped} — the 90% of people don't know this`;
  }

  // ── 3) Direct-to-viewer rewrite ──
  let direct: string;
  if (!signals.hasYou && !signals.hasAllCaps) {
    direct = `STOP — you need to hear this: ${stripped.toLowerCase()}`;
  } else if (!signals.hasYou) {
    direct = `You won't believe this: ${stripped}`;
  } else if (!signals.hasAllCaps) {
    direct = `WATCH this before you ${stripped.toLowerCase()}`;
  } else {
    direct = `You NEED to see this — ${stripped.toLowerCase()}`;
  }

  return [curiosity, specificity, direct];
}

/** Map grade to Tailwind badge color classes */
export function gradeColor(grade: Grade): string {
  switch (grade) {
    case "A": return "bg-green-500/20 text-green-400 border-green-500/30";
    case "B": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "C": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "D": return "bg-red-500/20 text-red-400 border-red-500/30";
  }
}

/** Map score to a Tailwind text color */
export function scoreColor(score: number): string {
  if (score >= 85) return "text-green-400";
  if (score >= 70) return "text-emerald-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}
