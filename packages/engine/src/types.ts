/** ISO calendar date, e.g. "2026-10-09". Always the player's local date. */
export type DateKey = string;

export interface Puzzle {
  id: string;
  startWord: string;
  endWord: string;
  /** Minimum possible number of steps between startWord and endWord. */
  parSteps: number;
}

export interface PuzzleResult {
  puzzleId: string;
  date: DateKey;
  won: boolean;
  /** The full path including startWord and endWord. */
  path: string[];
  parSteps: number;
  durationMs: number;
  gaveUp: boolean;
}

export interface PlayerStats {
  schemaVersion: 1;
  streakCurrent: number;
  streakBest: number;
  totalPlayed: number;
  totalWon: number;
  lastPlayedDate: DateKey | null;
  resultsByDate: Record<DateKey, PuzzleResult>;
}

export interface Settings {
  schemaVersion: 1;
  soundMuted: boolean;
  reducedMotion: boolean;
  adsRemoved: boolean;
}

export interface ShareCardData {
  gameName: string;
  date: DateKey;
  puzzleNumber: number;
  won: boolean;
  steps: number;
  parSteps: number;
  streakCurrent: number;
  /** How `steps` compares to `parSteps`, for the share card's result color. */
  rating: "under" | "at" | "over";
}

/** A single attempted move away from the current word. */
export interface StepAttempt {
  fromWord: string;
  toWord: string;
  valid: boolean;
  reason?: "not-one-letter-different" | "not-a-word" | "same-as-current";
}
