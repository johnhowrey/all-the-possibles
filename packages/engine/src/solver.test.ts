import { describe, expect, it } from "vitest";
import { commonParSteps, parSteps, shortestCommonPath, shortestPath } from "./solver";

describe("shortestPath", () => {
  it("finds a known short ladder", () => {
    const path = shortestPath("cat", "dog");
    expect(path).not.toBeNull();
    expect(path?.[0]).toBe("cat");
    expect(path?.[path.length - 1]).toBe("dog");
    for (let i = 1; i < (path?.length ?? 0); i++) {
      const a = path?.[i - 1] ?? "";
      const b = path?.[i] ?? "";
      expect(a.length).toBe(b.length);
    }
  });

  it("returns a single-element path for identical words", () => {
    expect(shortestPath("cat", "cat")).toEqual(["cat"]);
  });

  it("returns null for different-length words", () => {
    expect(shortestPath("cat", "cats")).toBeNull();
  });

  it("returns null for a non-word", () => {
    expect(shortestPath("cat", "zzxq")).toBeNull();
  });
});

describe("parSteps", () => {
  it("matches path length minus one", () => {
    const path = shortestPath("cat", "dog");
    expect(parSteps("cat", "dog")).toBe((path?.length ?? 0) - 1);
  });
});

describe("shortestCommonPath / commonParSteps", () => {
  it("matches the puzzle bank's expectations for a known pair", () => {
    expect(commonParSteps("full", "half")).toBe(3);
  });

  it("returns null when restricted to common words makes the pair unreachable", () => {
    // "zzxq" isn't a word at all, let alone a common one.
    expect(shortestCommonPath("cat", "zzxq")).toBeNull();
  });
});
