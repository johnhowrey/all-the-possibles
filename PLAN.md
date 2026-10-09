# Rungs — a daily word-ladder game

Working name: **Rungs**. Logged as a decision (see DECISIONS.md) — easy to rename later, it's one string plus a find/replace.

## Context

This repo, `all-the-possibles`, is already John's small app studio landing site (React + Vite + Tailwind + react-router, deployed to Vercel). This plan adds a new product to that studio: a daily word-ladder game, built as the first title in a small family of casual daily puzzle games sharing one engine. The studio site gets a new tile linking out to it; the game itself is its own deployable app.

## Who it's for, and the problem

People who already have a daily puzzle habit (Wordle, Connections, Spelling Bee) and want one more quick, well-made reason to open an app for two or three minutes. The problem isn't "there's no word game" — it's that most casual games either nag with ads and dark patterns, or fossilize quickly after launch with no polish. The bet here is: make the few minutes feel good (motion, sound, a streak worth protecting, a result worth posting) and get paid through ads and a fair one-time unlock instead of subscriptions or friction.

## Core user flows

1. **Open the app (returning player)** → see today's puzzle immediately, no login. If already played today, see today's completed result and share card instead.
2. **Play** → start word at top, end word at bottom, change one letter per step, each intermediate word must be valid, reach the end word. Visual/sound feedback per step (valid step, invalid attempt, solved).
3. **Finish** → win screen with step count vs. par, streak update, stats, a share card (image) and native share sheet / copy-to-clipboard fallback.
4. **Come back tomorrow** → new puzzle at local midnight rollover; streak carries if they played yesterday or today, breaks otherwise.
5. **Stats** → streak (current/best), win rate, average steps vs. par, small history.
6. **Settings** → mute sound, reduce motion, remove ads (purchase), restore purchase, about/support/legal links.
7. **First run** → a short onboarding (3 screens max) explaining the one rule (swap one letter, real words only) before the first puzzle.

## What's in v1, what waits

**In v1 (first launchable version):**
- The word-ladder engine: puzzle bank, validator, daily selection by local date, solver for par calculation.
- Full game UI: onboard, empty/pre-play, in-progress, win, already-played-today, error (e.g. puzzle failed to load) states.
- Streak + stats, stored on-device (no accounts).
- Share card image generation + Web Share API with clipboard fallback.
- Sound (small synthesized/CC0 effects) with a mute toggle; reduced-motion support.
- Installable PWA: manifest, service worker, offline play for the day's puzzle once loaded.
- Ad slot scaffolding (renders nothing until an ad network key exists) + "Remove Ads" purchase scaffolding (Stripe on web), both behind a `PurchaseProvider`/`AdProvider` interface so native IAP can be swapped in later without touching game logic.
- Landing/marketing content for the game itself, plus the studio site tile.
- Draft legal pages (privacy, terms, refund), accessibility pass, basic SEO.

**Waits for v2+:**
- Real money flowing (needs Stripe + AdSense accounts/keys from John; built but inert until then).
- Native app-store wrapping (Capacitor) and native IAP (StoreKit / Play Billing).
- Cross-device sync of stats/streak (would need accounts — explicitly out of scope unless requested).
- Additional games (Digit Hunt, etc.) reusing the shared engine package.
- Push notifications / daily reminders.
- Leaderboards or social features beyond share cards.

## Stack and hosting

- **Monorepo, npm workspaces**, added to the existing repo:
  - `packages/engine` — pure TypeScript game engine. No React, no DOM. Puzzle bank, dictionary validator, daily-seed selection, solver/par calculation, stats/streak math, share-card data model. Fully unit-testable in isolation, and reusable by future games.
  - `apps/rungs` — the actual game: Vite + React + TypeScript + Tailwind, built as an installable PWA (`vite-plugin-pwa`). Consumes `packages/engine`.
  - Existing studio site at the repo root is untouched except for one new entry linking to the game once it's deployed.
  - *Why:* the studio site and the game are different products with different audiences and release cadences; a shared engine package is what lets a second game (already pitched: Digit Hunt, Six Letters, etc.) ship fast without re-deriving streaks/stats/share-card logic.
- **Hosting:** Vercel, as a second Vercel project pointed at `apps/rungs` (own subdomain, e.g. `rungs.allthepossible.com` or a `*.vercel.app` URL until a subdomain is wired up). Keeping it a separate deploy avoids fragile PWA-scoping problems that come from installing a PWA off a sub-path of a bigger site.
- **No backend database in v1.** Stats/streak/settings live in `localStorage` via a small typed, versioned wrapper (so we can migrate the schema later without wiping anyone's streak).
- **One small serverless function** (Vercel function) once Stripe is wired up: verifies a completed Stripe Checkout session and supports "restore purchase" by email lookup. Everything else stays static.

## Data model (client-side, versioned in `localStorage`)

```
Puzzle        { id, date, startWord, endWord, parSteps, bank entry reference }
PuzzleResult  { date, won, steps, path: string[], durationMs, gaveUp }
PlayerStats   { streakCurrent, streakBest, totalPlayed, totalWon,
                resultsByDate: Record<date, PuzzleResult>, lastPlayedDate }
Settings      { soundMuted, reducedMotion, adsRemoved, schemaVersion }
```

## Third-party services

| Service | Purpose | Status |
|---|---|---|
| Vercel | Hosting, serverless function for restore-purchase | Already in use for the studio site |
| Stripe | One-time "Remove Ads" purchase (web) | **Needs API keys from John** — scaffolded but inert until then |
| Google AdSense (web) / AdMob (future native) | Ad revenue | **Needs a publisher account/key** — ad slots render nothing until configured |
| Analytics (proposing Plausible — privacy-first, has goal/conversion tracking) | Usage + conversion tracking | **Needs an account/site key** — stubbed behind an env var so nothing breaks without it |
| Meta Pixel | Facebook ad tracking | **Not added until John explicitly approves**, per standing instructions |
| Word list | Puzzle dictionary | Using an open, permissively-licensed list (e.g. ENABLE/SCOWL), **not** any proprietary word list — see Risks |

`keys.txt` doesn't exist yet in this folder, so none of the above are wired in. Nothing in v1 is blocked by this — the engine, UI, PWA shell, and scaffolding all work with zero keys. When ready, add `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, an AdSense/AdMob publisher ID, and a Plausible (or chosen analytics) site key to `keys.txt` and I'll wire them in.

## Pricing

Free to play, with ads. One-time **"Remove Ads" purchase, proposed at $2.99**, no subscription. This is a default I'm picking as a sensible casual-game price point — trivial to change later (one constant).

## Risks

- **Puzzle quality.** A badly-formed word ladder (unsolvable, multiple valid solutions with very different lengths, offensive/obscure words) ruins the daily hook fast. Mitigation: a curated, versioned puzzle bank validated by an automated solver/checker (tested), not puzzles generated fresh at runtime.
- **Word list licensing.** Will not reuse any proprietary puzzle-answer list (e.g. NYT's Wordle list) — using open word lists only, per the instruction to follow data source terms.
- **Daily rollover timezone behavior.** Using the player's local date for "today's puzzle," matching how Wordle-likes behave — means two players in different timezones may be on different puzzle numbers at the same moment. This is expected and standard, not a bug, but worth knowing going in.
- **App-store IAP rules.** Stripe can't be used for in-app digital purchases once this is wrapped for iOS — Apple requires StoreKit for that. Mitigating this now by putting purchases behind a `PurchaseProvider` interface: Stripe on web today, swapped for StoreKit/Play Billing per-platform when wrapped, without touching game logic.
- **Ad network approval.** AdSense review can be slow or picky for a single-purpose app; ad slots are built to render nothing gracefully until/unless approved.

## Phased task list

### Phase 0 — Setup
- [x] Confirm game concept with John
- [ ] Set up npm workspaces, scaffold `packages/engine` and `apps/rungs`
- [ ] `.env` / `keys.txt` wiring (gitignored), confirm no secrets committed
- [ ] DECISIONS.md started

### Phase 1 — Engine (`packages/engine`)
- [ ] Word list ingestion + validator
- [ ] Puzzle bank format + a handful of hand-curated/validated ladders to start
- [ ] Daily puzzle selection (local date → puzzle index)
- [ ] Par calculator (BFS shortest path between start/end over valid one-letter-swap words)
- [ ] Stats/streak update logic
- [ ] Share-card data model (pure data, no rendering)
- [ ] Unit tests for all of the above

### Phase 2 — Visual direction
- [ ] Propose visual direction (mood, type, color, motion feel) — **show John, wait for sign-off before building screens**

### Phase 3 — Game UI (`apps/rungs`)
- [ ] App shell, routing, state wiring to the engine
- [ ] Onboarding (first run only)
- [ ] Play screen: board, keyboard/input, per-step validation feedback
- [ ] Win screen + share card rendering + Web Share API / clipboard fallback
- [ ] Already-played-today screen
- [ ] Error state (puzzle failed to load) and loading state
- [ ] Stats/streak screen
- [ ] Settings screen (mute, reduce motion, remove ads, restore purchase, legal links)

### Phase 4 — Feel
- [ ] Animation pass (step feedback, win celebration, streak increment)
- [ ] Sound pass (step, error, win) + mute persisted
- [ ] Accessibility pass: WCAG 2.2 AA, keyboard play, screen-reader labeling, reduced motion respected

### Phase 5 — PWA
- [ ] Manifest + icon set (installable, standalone display)
- [ ] Service worker: offline play of the day's loaded puzzle, update-available prompt
- [ ] Lighthouse PWA/perf/accessibility pass

### Phase 6 — Monetization scaffolding
- [ ] `AdProvider` interface + inert placeholder implementation
- [ ] `PurchaseProvider` interface + Stripe Checkout implementation (inert without keys)
- [ ] Restore-purchase serverless function (inert without keys)

### Phase 7 — Go-to-market
- [ ] Landing content for the game (who it's for, how to play, pricing, FAQ, support/contact)
- [ ] SEO basics: titles, meta descriptions, sitemap, robots.txt, OG image, structured data
- [ ] Studio site: add a tile linking to the game
- [ ] Draft: privacy policy, terms, refund policy (marked for lawyer review), cookie consent if/when analytics needs it
- [ ] Launch checklist + 3 Facebook ad angle drafts (Meta Pixel itself stays off until approved)

### Phase 8 — Docs & reliability
- [ ] README (setup/run/deploy) for the new workspace
- [ ] CHANGELOG
- [ ] RUNBOOK (what little there is to monitor for a static PWA + one serverless function)
- [ ] Error logging for the serverless function

### Phase 9 — QA & launch
- [ ] Cross-device manual test pass (install flow, offline play, share)
- [ ] Final report: what's live, what needs John (domain/DNS, Stripe account, AdSense account, analytics account, App Store/Play submission later)
