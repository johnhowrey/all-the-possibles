# Decisions log

Running log of calls made without stopping to ask, per standing instructions. Newest first.

## 2026-10-09 — Building inside the existing `all-the-possibles` repo, not a new one (confirmed with John)
The task's designated branch (`claude/casual-daily-games-pwa-hfdfey`) was pre-wired into this repo, which is John's existing app studio site. Rather than spin up a second repo (the generic default instruction), the game is added here as a new app alongside the studio site, as a monorepo. Raised the tradeoff explicitly; John confirmed monorepo. Reasoning: a shared engine across future games only stays shared without duplication or a published-package dance if everything lives together; one repo means one GitHub/Vercel/CI setup to manage; splitting a folder out later is cheap, merging two repos back together is not — so the reversible choice wins by default.

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

## 2026-10-09 — Two-tier dictionary: full list for play, common-word subset for puzzle par
Using the MIT-licensed `an-array-of-english-words` (275k words) to validate any step a player types during play — any real word should count, including ones most people wouldn't think to use. But computing "par" against that same list produced paths through obscure/archaic words (e.g. "wold," "souk," "faut"), which would make the displayed par unfairly hard to hit. Added a second, smaller tier — the top 4000 English words by frequency (from the MIT-licensed `most-common-words-by-language`, intersected with the full dictionary) — and calibrate puzzle selection and par against that instead. A player who beats par via an obscure word just means they get an extra-good result, not a bug.

## 2026-10-09 — Worked around a broken dependency rather than replacing it
`most-common-words-by-language`'s own JS API fails to load (it requires `lodash` but never declares it as a dependency — an upstream bug). Its data is a plain one-word-per-line text file, so the generator script reads that file directly instead of going through the package's broken entrypoint. Keeps the MIT-licensed data without pulling in a patched fork or a different source.

## 2026-10-09 — Puzzle bank starts at 15 entries, lengths 3-4 only
Hand-verified 15 word ladders (par 3-7) using common, recognizable words. Tried for longer (5-6 letter) ladders too, but the common-word graph at those lengths is sparse enough that most interesting pairs come back unreachable or trivially 1 step apart — rather than ship mediocre ones, starting smaller and growing the bank over time (process documented in `packages/engine/README.md`). 15 unique days before the bank cycles is enough to launch and gather real feedback.

## 2026-10-09 — Bumped vitest to v5 and ran `npm audit fix`
`npm install` surfaced pre-existing vulnerabilities in the studio site's own dependencies (react-router-dom, vite) with non-breaking fixes available, plus a critical prototype-pollution RCE in vitest's transitive `tinypool` dependency once added. Fixed both — `npm audit` now reports zero vulnerabilities.

## 2026-10-09 — Animation library: a lightweight motion library (e.g. Framer Motion) over hand-rolled CSS-only
"Polished and satisfying" animation is a stated priority; a small, well-tested motion library earns its bundle-size cost here. Revisit if it turns out to be overkill once the UI is built.
