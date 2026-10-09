import { describe, expect, it } from "vitest";
import { attemptStep, createSession, toResult } from "./gameSession";
import type { Puzzle } from "./types";

const puzzle: Puzzle = { id: "test", startWord: "cat", endWord: "dog", parSteps: 3 };

describe("createSession", () => {
  it("starts with just the start word", () => {
    const session = createSession(puzzle);
    expect(session.path).toEqual(["cat"]);
    expect(session.solved).toBe(false);
  });
});

describe("attemptStep", () => {
  it("rejects the same word", () => {
    const session = createSession(puzzle);
    const { session: next, attempt } = attemptStep(session, "cat");
    expect(attempt.valid).toBe(false);
    expect(attempt.reason).toBe("same-as-current");
    expect(next).toBe(session);
  });

  it("rejects a word that isn't one letter different", () => {
    const session = createSession(puzzle);
    const { attempt } = attemptStep(session, "dog");
    expect(attempt.valid).toBe(false);
    expect(attempt.reason).toBe("not-one-letter-different");
  });

  it("rejects a non-word", () => {
    const session = createSession(puzzle);
    const { attempt } = attemptStep(session, "caj");
    expect(attempt.valid).toBe(false);
    expect(attempt.reason).toBe("not-a-word");
  });

  it("accepts a valid one-letter step and advances the path", () => {
    const session = createSession(puzzle);
    const { session: next, attempt } = attemptStep(session, "cot");
    expect(attempt.valid).toBe(true);
    expect(next.path).toEqual(["cat", "cot"]);
    expect(next.solved).toBe(false);
  });

  it("detects a win on reaching the end word", () => {
    let session = createSession(puzzle);
    session = attemptStep(session, "cot").session;
    session = attemptStep(session, "dot").session;
    session = attemptStep(session, "dog").session;
    expect(session.solved).toBe(true);
    expect(session.path).toEqual(["cat", "cot", "dot", "dog"]);
  });

  it("is case-insensitive", () => {
    const session = createSession(puzzle);
    const { attempt } = attemptStep(session, "COT");
    expect(attempt.valid).toBe(true);
  });
});

describe("toResult", () => {
  it("captures win state, path, and duration", () => {
    let session = createSession(puzzle);
    session = attemptStep(session, "cot").session;
    session = attemptStep(session, "dot").session;
    session = attemptStep(session, "dog").session;
    const result = toResult(session, "2026-01-01", 42_000, false);
    expect(result).toEqual({
      puzzleId: "test",
      date: "2026-01-01",
      won: true,
      path: ["cat", "cot", "dot", "dog"],
      parSteps: 3,
      durationMs: 42_000,
      gaveUp: false,
    });
  });
});
