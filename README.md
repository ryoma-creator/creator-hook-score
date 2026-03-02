# Creator Hook Score™

> TikTok Hook Checker — Score your hook 0–100 and get instant improvement tips.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss)
![Vitest](https://img.shields.io/badge/Vitest-1-6E9F18?logo=vitest)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow)

## Features

- **Rule-based scoring** — 8 criteria, 0–100 score, no API needed
- **Grade system** — A (85+), B (70–84), C (50–69), D (<50)
- **3 actionable tips** — prioritized by impact
- **Signals checklist** — see exactly what matched
- **Copy link & Share on X** — one-click sharing
- **100% client-side** — no database, no auth, no external APIs
- **Vercel-ready** — deploy in one click

## Pages

| Path | Description |
|------|-------------|
| `/` | Landing page (LP) |
| `/check` | Hook input form + examples |
| `/result` | Score, grade, signals, tips, share |

## Tech Stack

- **Next.js 14+** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Vitest** (unit tests)

## Getting Started

```bash
# Clone
git clone git@github.com:ryoma-creator/creator-hook-score.git
cd creator-hook-score

# Install
npm install

# Dev server
npm run dev
# → http://localhost:3000

# Run tests
npm test

# Build for production
npm run build
npm start
```

## Deploy to Vercel

1. Push to GitHub (`main` branch)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the `creator-hook-score` repository
4. Click Deploy — done!

## GitHub Setup (from scratch)

```bash
git init
git add -A
git commit -m "Initial commit: Creator Hook Score MVP"
git branch -M main
git remote add origin git@github.com:ryoma-creator/creator-hook-score.git
git push -u origin main
```

## How Scoring Works

Total: **100 points** across 8 rule-based checks:

| Signal | Points | Rule |
|--------|--------|------|
| Word count 6–12 | +15 | Sweet spot for hooks |
| Contains a digit | +15 | Numbers boost specificity |
| Question mark (?) | +10 | Triggers curiosity |
| Uses "you" | +10 | Direct address |
| Power word | +20 | "secret", "stop", "mistake"… |
| Emotion word | +10 | "insane", "awkward", "crazy"… |
| Specificity marker | +10 | %, $, "days", "in 7"… |
| ALL CAPS (3+ chars) | +10 | Pattern interrupt |

### Grades

| Grade | Score Range |
|-------|-------------|
| A | 85–100 |
| B | 70–84 |
| C | 50–69 |
| D | 0–49 |

## Running Tests

```bash
# Run once
npm test

# Watch mode
npm run test:watch
```

12 test cases covering: empty input, each signal, grade boundaries, tip count, score clamping.

## License

MIT — see [LICENSE](LICENSE)
