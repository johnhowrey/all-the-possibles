import { describe, expect, it } from "vitest";
import { averageStepsOverPar, createInitialStats, recordResult, winRate } from "./stats";
import type { PuzzleResult } from "./types";

function result(overrides: Partial<PuzzleResult>): PuzzleResult {
  return {
    puzzleId: "p",
    date: "2026-01-01",
    won: true,
    path: ["cat", "cot", "dog"],
    parSteps: 2,
    durationMs: 1000,
    gaveUp: false,
    ...overrides,
  };
}

describe("recordResult", () => {
  it("starts a streak on the first win", () => {
    const stats = recordResult(createInitialStats(), result({ date: "2026-01-01" }));
    expect(stats.streakCurrent).toBe(1);
    expect(stats.streakBest).toBe(1);
    expect(stats.totalPlayed).toBe(1);
    expect(stats.totalWon).toBe(1);
  });

  it("continues the streak on a consecutive-day win", () => {
    let stats = recordResult(createInitialStats(), result({ date: "2026-01-01" }));
    stats = recordResult(stats, result({ date: "2026-01-02" }));
    expect(stats.streakCurrent).toBe(2);
    expect(stats.streakBest).toBe(2);
  });

  it("breaks the streak on a loss", () => {
    let stats = recordResult(createInitialStats(), result({ date: "2026-01-01" }));
    stats = recordResult(stats, result({ date: "2026-01-02", won: false }));
    expect(stats.streakCurrent).toBe(0);
    stats = recordResult(stats, result({ date: "2026-01-03" }));
    expect(stats.streakCurrent).toBe(1);
  });

  it("breaks the streak when a day is skipped", () => {
    let stats = recordResult(createInitialStats(), result({ date: "2026-01-01" }));
    stats = recordResult(stats, result({ date: "2026-01-03" })); // skipped 01-02
    expect(stats.streakCurrent).toBe(1);
  });

  it("keeps streakBest after a later break", () => {
    let stats = recordResult(createInitialStats(), result({ date: "2026-01-01" }));
    stats = recordResult(stats, result({ date: "2026-01-02" }));
    stats = recordResult(stats, result({ date: "2026-01-03", won: false }));
    expect(stats.streakCurrent).toBe(0);
    expect(stats.streakBest).toBe(2);
  });

  it("throws if the same date is recorded twice", () => {
    const stats = recordResult(createInitialStats(), result({ date: "2026-01-01" }));
    expect(() => recordResult(stats, result({ date: "2026-01-01" }))).toThrow();
  });
});

describe("winRate", () => {
  it("is 0 with no games played", () => {
    expect(winRate(createInitialStats())).toBe(0);
  });

  it("computes wins over total", () => {
    let stats = recordResult(createInitialStats(), result({ date: "2026-01-01", won: true }));
    stats = recordResult(stats, result({ date: "2026-01-02", won: false }));
    expect(winRate(stats)).toBe(0.5);
  });
});

describe("averageStepsOverPar", () => {
  it("is null with no wins", () => {
    expect(averageStepsOverPar(createInitialStats())).toBeNull();
  });

  it("averages steps taken minus par, across wins only", () => {
    let stats = recordResult(
      createInitialStats(),
      result({ date: "2026-01-01", won: true, path: ["cat", "cot", "dog"], parSteps: 2 }), // +0
    );
    stats = recordResult(
      stats,
      result({ date: "2026-01-02", won: true, path: ["a", "b", "c", "d"], parSteps: 1 }), // +2
    );
    stats = recordResult(stats, result({ date: "2026-01-03", won: false }));
    expect(averageStepsOverPar(stats)).toBe(1);
  });
});
