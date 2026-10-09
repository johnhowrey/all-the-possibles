import { describe, expect, it } from "vitest";
import { isCommonWord, isOneLetterDifferent, isValidWord, neighborsOf } from "./wordList";

describe("isValidWord", () => {
  it("accepts a real word", () => {
    expect(isValidWord("cat")).toBe(true);
    expect(isValidWord("CAT")).toBe(true);
  });

  it("rejects gibberish", () => {
    expect(isValidWord("zzxq")).toBe(false);
  });
});

describe("isCommonWord", () => {
  it("is a subset of isValidWord", () => {
    expect(isCommonWord("cat")).toBe(true);
    expect(isValidWord("cat")).toBe(true);
  });
});

describe("isOneLetterDifferent", () => {
  it("true for a single substitution", () => {
    expect(isOneLetterDifferent("cat", "cot")).toBe(true);
  });

  it("false for identical words", () => {
    expect(isOneLetterDifferent("cat", "cat")).toBe(false);
  });

  it("false for two letters different", () => {
    expect(isOneLetterDifferent("cat", "dog")).toBe(false);
  });

  it("false for different lengths", () => {
    expect(isOneLetterDifferent("cat", "cats")).toBe(false);
  });
});

describe("neighborsOf", () => {
  it("only returns real words one letter away", () => {
    const neighbors = neighborsOf("cat");
    expect(neighbors).toContain("cot");
    expect(neighbors).toContain("bat");
    for (const word of neighbors) {
      expect(isOneLetterDifferent("cat", word)).toBe(true);
      expect(isValidWord(word)).toBe(true);
    }
  });
});
