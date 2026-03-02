import { describe, it, expect } from "vitest";
import { scoreHook } from "../src/lib/scoreHook";

describe("scoreHook", () => {
  // 1. Empty input
  it("returns score 0 for empty string", () => {
    const r = scoreHook("");
    expect(r.score).toBe(0);
    expect(r.grade).toBe("D");
    expect(r.tips).toHaveLength(3);
  });

  // 2. Word count scoring
  it("awards +15 for word count 6-12", () => {
    const good = scoreHook("one two three four five six");     // 6 words
    const bad = scoreHook("one two three");                     // 3 words
    expect(good.signals.wordCountOk).toBe(true);
    expect(bad.signals.wordCountOk).toBe(false);
    expect(good.score).toBeGreaterThan(bad.score);
  });

  // 3. Digit detection
  it("awards +15 for digits", () => {
    const withDigit = scoreHook("7 things you need");
    const noDigit = scoreHook("things you need now");
    expect(withDigit.signals.hasDigit).toBe(true);
    expect(noDigit.signals.hasDigit).toBe(false);
  });

  // 4. Question mark
  it("awards +10 for question mark", () => {
    const q = scoreHook("Why is this happening?");
    const s = scoreHook("This is happening now");
    expect(q.signals.hasQuestion).toBe(true);
    expect(s.signals.hasQuestion).toBe(false);
    expect(q.score).toBeGreaterThan(s.score);
  });

  // 5. "you" detection (word boundary)
  it('awards +10 for standalone "you"', () => {
    const hasYou = scoreHook("What you need to know");
    const noYou = scoreHook("What everyone needs to know");
    expect(hasYou.signals.hasYou).toBe(true);
    expect(noYou.signals.hasYou).toBe(false);
  });

  // 6. Power word detection
  it("awards +20 for power words", () => {
    const power = scoreHook("The secret nobody tells you");
    const bland = scoreHook("The thing nobody tells people");
    expect(power.signals.hasPowerWord).toBe(true);
    expect(bland.signals.hasPowerWord).toBe(false);
    expect(power.score - bland.score).toBeGreaterThanOrEqual(20);
  });

  // 7. Emotion word detection
  it("awards +10 for emotion words", () => {
    const emo = scoreHook("This insane trick works");
    const noEmo = scoreHook("This simple trick works");
    expect(emo.signals.hasEmotionWord).toBe(true);
    expect(noEmo.signals.hasEmotionWord).toBe(false);
  });

  // 8. Specificity marker
  it("awards +10 for specificity markers", () => {
    const spec = scoreHook("Grew 50% in 7 days");
    expect(spec.signals.hasSpecificity).toBe(true);
    const noSpec = scoreHook("Grew a lot recently");
    expect(noSpec.signals.hasSpecificity).toBe(false);
  });

  // 9. ALL CAPS detection
  it("awards +10 for ALL CAPS words (3+ chars)", () => {
    const caps = scoreHook("STOP doing this right now");
    expect(caps.signals.hasAllCaps).toBe(true);
    const noCaps = scoreHook("Stop doing this right now");
    expect(noCaps.signals.hasAllCaps).toBe(false);
  });

  // 10. Grade boundaries
  it("assigns correct grades based on score", () => {
    // High-scoring hook hitting many signals
    const a = scoreHook("Why are YOU making these 3 secret mistakes? STOP now before in 7 days insane");
    expect(a.grade).toBe("A");

    const d = scoreHook("hello");
    expect(d.grade).toBe("D");
  });

  // 11. Always returns exactly 3 tips
  it("always returns exactly 3 tips", () => {
    expect(scoreHook("hello").tips).toHaveLength(3);
    expect(scoreHook("Why are YOU making these 3 secret mistakes? STOP now insane 50%").tips).toHaveLength(3);
    expect(scoreHook("").tips).toHaveLength(3);
  });

  // 12. Score is clamped 0-100
  it("clamps score between 0 and 100", () => {
    const r = scoreHook("Why are YOU making these 3 secret CRAZY mistakes? STOP now insane 50% in 7 days");
    expect(r.score).toBeGreaterThanOrEqual(0);
    expect(r.score).toBeLessThanOrEqual(100);
  });
});
