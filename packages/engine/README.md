# @rungs/engine

Pure TypeScript game engine for Rungs (the daily word-ladder game) and, eventually, other daily puzzle games in this studio. No React, no DOM — everything here is plain functions and data, so it's fast to test and easy to reuse.

## What's in here

- `wordList.ts` — the dictionary. Two tiers: the full dictionary (any real word is accepted while playing) and a smaller "common words" subset (used to pick puzzles and calculate par, so the daily target stays reachable with everyday vocabulary).
- `solver.ts` — BFS shortest-path between two words, over either tier.
- `dailySeed.ts` — maps a player's local calendar date to a puzzle number and a bank index.
- `puzzleBank.ts` — the curated, hand-picked word ladders that actually ship.
- `gameSession.ts` — step-by-step play logic: validate a move, track the path, detect a win.
- `stats.ts` — streak/stats as a pure reducer over results.
- `shareCard.ts` — turns a result into shareable data (no rendering — that's the app's job).

## Setup

```
npm install        # from the repo root; this is an npm workspace
npm run test:engine   # from the repo root
# or, from this folder:
npm test
```

## Regenerating word data

`src/data/*.json` is generated, not hand-written. It's committed anyway so the app doesn't depend on dev-only packages at runtime.

```
npm run gen:words
```

This reads two dev dependencies:
- `an-array-of-english-words` (MIT) — the full dictionary, filtered to plain a-z words of length 3–7.
- `most-common-words-by-language` (MIT) — an English word-frequency list, used to build the "common words" subset (top 4000 by frequency, intersected with the full dictionary). Its own JS entrypoint has an undeclared `lodash` dependency and fails to load as-is, so the generator script reads its underlying data file directly instead of importing the package.

Neither package is a runtime dependency of the app — only their generated JSON output ships.

## Growing the puzzle bank

Puzzles are hand-picked and checked, not generated at runtime — a freshly generated ladder can be unsolvable in practice, have wildly different valid solutions, or lean on obscure words, any of which ruins the daily hook. To add puzzles:

1. Pick a start/end word pair (same length, both real words you'd expect a casual player to know).
2. Compute its par with `commonParSteps(start, end)` from `solver.ts` — the bank-integrity test (`puzzleBank.test.ts`) will fail if this doesn't match what you write down, so you can't typo a par value.
3. Add the entry to `PUZZLE_BANK` in `puzzleBank.ts` with a unique `id`.
4. Run the tests.

If `commonParSteps` returns `null`, the pair isn't reachable using common words alone — pick a different pair rather than falling back to the full dictionary for par (that's what would let obscure words into the "par" path).
