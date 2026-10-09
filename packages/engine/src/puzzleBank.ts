import type { Puzzle } from "./types";

/**
 * Hand-picked, validated word ladders. `parSteps` is the shortest path
 * length over the *common-word* graph (see solver.ts `commonParSteps`) —
 * covered by a bank-integrity test so this file can't drift from what the
 * solver actually computes. Selected by date via `dailySeed.ts`, cycling
 * once exhausted. Grow this list over time with the same probe-and-verify
 * process (see packages/engine/README.md), not by generating untested
 * puzzles at runtime.
 */
export const PUZZLE_BANK: Puzzle[] = [
  { id: "p001", startWord: "full", endWord: "half", parSteps: 3 },
  { id: "p002", startWord: "cat", endWord: "dog", parSteps: 4 },
  { id: "p003", startWord: "big", endWord: "run", parSteps: 4 },
  { id: "p004", startWord: "lead", endWord: "gold", parSteps: 4 },
  { id: "p005", startWord: "love", endWord: "care", parSteps: 4 },
  { id: "p006", startWord: "soft", endWord: "firm", parSteps: 4 },
  { id: "p007", startWord: "wet", endWord: "dry", parSteps: 5 },
  { id: "p008", startWord: "love", endWord: "hate", parSteps: 5 },
  { id: "p009", startWord: "easy", endWord: "hard", parSteps: 5 },
  { id: "p010", startWord: "hope", endWord: "fear", parSteps: 6 },
  { id: "p011", startWord: "firm", endWord: "hard", parSteps: 6 },
  { id: "p012", startWord: "soft", endWord: "hard", parSteps: 6 },
  { id: "p013", startWord: "bike", endWord: "cart", parSteps: 7 },
  { id: "p014", startWord: "cold", endWord: "warm", parSteps: 7 },
  { id: "p015", startWord: "fire", endWord: "cold", parSteps: 7 },
];
