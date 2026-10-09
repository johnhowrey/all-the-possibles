import type { DateKey, Puzzle, PuzzleResult, StepAttempt } from "./types";
import { isOneLetterDifferent, isValidWord } from "./wordList";

export interface GameSessionState {
  puzzle: Puzzle;
  path: string[];
  solved: boolean;
}

export function createSession(puzzle: Puzzle): GameSessionState {
  return {
    puzzle,
    path: [puzzle.startWord.toLowerCase()],
    solved: false,
  };
}

export interface StepOutcome {
  session: GameSessionState;
  attempt: StepAttempt;
}

/** Attempts to move from the current word to `nextWord`. Invalid attempts leave the session unchanged. */
export function attemptStep(
  session: GameSessionState,
  nextWordRaw: string,
): StepOutcome {
  const current = session.path[session.path.length - 1] ?? session.puzzle.startWord;
  const nextWord = nextWordRaw.trim().toLowerCase();

  if (nextWord === current) {
    return {
      session,
      attempt: { fromWord: current, toWord: nextWord, valid: false, reason: "same-as-current" },
    };
  }
  if (!isOneLetterDifferent(current, nextWord)) {
    return {
      session,
      attempt: {
        fromWord: current,
        toWord: nextWord,
        valid: false,
        reason: "not-one-letter-different",
      },
    };
  }
  if (!isValidWord(nextWord)) {
    return {
      session,
      attempt: { fromWord: current, toWord: nextWord, valid: false, reason: "not-a-word" },
    };
  }

  const path = [...session.path, nextWord];
  const solved = nextWord === session.puzzle.endWord.toLowerCase();
  return {
    session: { ...session, path, solved },
    attempt: { fromWord: current, toWord: nextWord, valid: true },
  };
}

export function toResult(
  session: GameSessionState,
  date: DateKey,
  durationMs: number,
  gaveUp: boolean,
): PuzzleResult {
  return {
    puzzleId: session.puzzle.id,
    date,
    won: session.solved,
    path: session.path,
    parSteps: session.puzzle.parSteps,
    durationMs,
    gaveUp,
  };
}
