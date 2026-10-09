# Decisions log

Running log of calls made without stopping to ask, per standing instructions. Newest first.

## 2026-10-09 — Building inside the existing `all-the-possibles` repo, not a new one
The task's designated branch (`claude/casual-daily-games-pwa-hfdfey`) was pre-wired into this repo, which is John's existing app studio site. Rather than spin up a second repo (the generic default instruction), the game is added here as a new app alongside the studio site, as a monorepo. This also sets up the shared-engine goal ("same engine can power future games") more naturally than separate repos would.

## 2026-10-09 — Working name: "Rungs"
The pitched name "Chain Reaction" is heavily used elsewhere (a classic board game, an Android physics game). Picked "Rungs" instead — short, evokes the word-ladder mechanic, easy to say, not already crowded. Trivial to rename later (one constant + find/replace), so not blocking on approval.

## 2026-10-09 — Monorepo layout: `packages/engine` + `apps/rungs`
Splits pure game logic (testable, UI-free, reusable for future games) from the actual app shell/UI. npm workspaces, matching the existing repo's package manager (npm, given the existing `package-lock.json`).

## 2026-10-09 — Separate Vercel deployment for the game, not a sub-path of the studio site
PWA installability and service-worker scoping get fragile when a PWA lives under a sub-path of a larger single-page app. A second Vercel project (own subdomain/URL) keeps both sites simple and independently deployable.

## 2026-10-09 — No accounts, no cross-device sync in v1
Streak/stats/settings live in local storage on-device. Keeps v1 simple and matches "the kind of game people play for a few minutes a day" — not asking for a login to do that. Cross-device sync would need an account system; revisit only if asked.

## 2026-10-09 — Daily puzzle: curated bank, not runtime-generated
Generating a fresh valid, well-formed word ladder on the fly risks dull or broken puzzles (unsolvable, multiple very different valid solutions, obscure words). Using a small, hand-curated, automatically-validated bank instead, selected by local date. Grow the bank over time with a generator+validator tool, but puzzles going live are vetted, not auto-published.

## 2026-10-09 — Local date for daily rollover
Puzzle changes at the player's local midnight, same behavior as Wordle and similar games. Means players in different timezones can be on different puzzle numbers simultaneously — expected, not a bug.

## 2026-10-09 — Word list: open/permissive license only
Will not use any proprietary puzzle word/answer list (e.g. NYT's). Using an openly licensed word list (ENABLE/SCOWL-family) for validation and the ladder bank, per the standing instruction to respect data source terms.

## 2026-10-09 — Payments behind a `PurchaseProvider` interface; Stripe for web only
Apple requires StoreKit (not Stripe) for in-app digital purchases once this is wrapped for iOS; Google has an equivalent rule for Android. Abstracting "remove ads" behind an interface now means swapping in StoreKit/Play Billing later without touching game logic. Same treatment for ads via an `AdProvider` interface.

## 2026-10-09 — Proposed price: $2.99 one-time "Remove Ads"
A sensible default for a casual daily game's one-time unlock. One constant to change if John wants a different number.

## 2026-10-09 — Proposed analytics: Plausible
Privacy-friendly and supports goal/conversion tracking, matching the standing instruction. Needs an account/site key from John before it's live; stubbed to no-op without one.

## 2026-10-09 — Animation library: a lightweight motion library (e.g. Framer Motion) over hand-rolled CSS-only
"Polished and satisfying" animation is a stated priority; a small, well-tested motion library earns its bundle-size cost here. Revisit if it turns out to be overkill once the UI is built.
