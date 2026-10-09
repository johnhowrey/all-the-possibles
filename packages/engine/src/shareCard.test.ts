import { describe, expect, it } from "vitest";
import { buildShareCard, shareCardText } from "./shareCard";
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

describe("buildShareCard", () => {
  it("rates a finish under par", () => {
    const card = buildShareCard(result({ path: ["cat", "dog"], parSteps: 2 }), 3);
    expect(card.steps).toBe(1);
    expect(card.rating).toBe("under");
  });

  it("rates a finish at par", () => {
    const card = buildShareCard(result({ path: ["cat", "cot", "dog"], parSteps: 2 }), 0);
    expect(card.steps).toBe(2);
    expect(card.rating).toBe("at");
  });

  it("rates a finish over par", () => {
    const card = buildShareCard(
      result({ path: ["cat", "cot", "dot", "dog"], parSteps: 2 }),
      0,
    );
    expect(card.steps).toBe(3);
    expect(card.rating).toBe("over");
  });

  it("computes the puzzle number from the date", () => {
    const card = buildShareCard(result({ date: "2026-01-01" }), 0);
    expect(card.puzzleNumber).toBe(1);
  });
});

describe("shareCardText", () => {
  it("includes the streak when present", () => {
    const card = buildShareCard(result({}), 5);
    expect(shareCardText(card)).toContain("🔥 5");
  });

  it("omits the streak emoji at zero", () => {
    const card = buildShareCard(result({}), 0);
    expect(shareCardText(card)).not.toContain("🔥");
  });

  it("reports an unfinished puzzle without a step count", () => {
    const card = buildShareCard(result({ won: false, path: ["cat"] }), 0);
    expect(shareCardText(card)).toContain("didn't finish");
  });
});
