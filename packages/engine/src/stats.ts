import { addDays } from "./dailySeed";
import type { PlayerStats, PuzzleResult } from "./types";

export function createInitialStats(): PlayerStats {
  return {
    schemaVersion: 1,
    streakCurrent: 0,
    streakBest: 0,
    totalPlayed: 0,
    totalWon: 0,
    lastPlayedDate: null,
    resultsByDate: {},
  };
}

/**
 * Folds one day's result into stats. Throws if that date was already
 * recorded — callers should only record a given day's result once (the UI
 * shows an "already played today" state instead of replaying).
 */
export function recordResult(stats: PlayerStats, result: PuzzleResult): PlayerStats {
  if (stats.resultsByDate[result.date]) {
    throw new Error(`Result for ${result.date} was already recorded`);
  }

  const previousDay = addDays(result.date, -1);
  const continuesStreak =
    result.won && stats.lastPlayedDate === previousDay && stats.streakCurrent > 0;
  const streakCurrent = result.won ? (continuesStreak ? stats.streakCurrent + 1 : 1) : 0;

  return {
    ...stats,
    streakCurrent,
    streakBest: Math.max(stats.streakBest, streakCurrent),
    totalPlayed: stats.totalPlayed + 1,
    totalWon: stats.totalWon + (result.won ? 1 : 0),
    lastPlayedDate: result.date,
    resultsByDate: { ...stats.resultsByDate, [result.date]: result },
  };
}

export function winRate(stats: PlayerStats): number {
  if (stats.totalPlayed === 0) return 0;
  return stats.totalWon / stats.totalPlayed;
}

/** Average steps taken on won puzzles, or null if nothing's been won yet. */
export function averageStepsOverPar(stats: PlayerStats): number | null {
  const won = Object.values(stats.resultsByDate).filter((r) => r.won);
  if (won.length === 0) return null;
  const totalOverPar = won.reduce((sum, r) => sum + (r.path.length - 1 - r.parSteps), 0);
  return totalOverPar / won.length;
}
