import { describe, expect, it } from "vitest";
import {
  EPOCH_DATE_KEY,
  addDays,
  puzzleBankIndexForDate,
  puzzleNumberForDate,
  toDateKey,
} from "./dailySeed";

describe("toDateKey", () => {
  it("formats using local calendar fields, not UTC", () => {
    const date = new Date(2026, 2, 5); // March 5, 2026, local time
    expect(toDateKey(date)).toBe("2026-03-05");
  });

  it("zero-pads month and day", () => {
    expect(toDateKey(new Date(2026, 0, 1))).toBe("2026-01-01");
  });
});

describe("addDays", () => {
  it("adds across a month boundary", () => {
    expect(addDays("2026-01-31", 1)).toBe("2026-02-01");
  });

  it("subtracts across a year boundary", () => {
    expect(addDays("2026-01-01", -1)).toBe("2025-12-31");
  });
});

describe("puzzleNumberForDate", () => {
  it("is 1 on the epoch date", () => {
    expect(puzzleNumberForDate(EPOCH_DATE_KEY)).toBe(1);
  });

  it("increments by one per day", () => {
    const today = puzzleNumberForDate(addDays(EPOCH_DATE_KEY, 10));
    const tomorrow = puzzleNumberForDate(addDays(EPOCH_DATE_KEY, 11));
    expect(tomorrow - today).toBe(1);
  });
});

describe("puzzleBankIndexForDate", () => {
  it("is deterministic for the same date", () => {
    const a = puzzleBankIndexForDate("2026-05-01", 15);
    const b = puzzleBankIndexForDate("2026-05-01", 15);
    expect(a).toBe(b);
  });

  it("stays within bounds and cycles", () => {
    const bankLength = 15;
    for (let i = 0; i < 40; i++) {
      const index = puzzleBankIndexForDate(addDays(EPOCH_DATE_KEY, i), bankLength);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(bankLength);
    }
    const first = puzzleBankIndexForDate(EPOCH_DATE_KEY, bankLength);
    const afterOneCycle = puzzleBankIndexForDate(addDays(EPOCH_DATE_KEY, bankLength), bankLength);
    expect(afterOneCycle).toBe(first);
  });
});
