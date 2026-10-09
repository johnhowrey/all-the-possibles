import { describe, expect, it } from "vitest";
import { PUZZLE_BANK } from "./puzzleBank";
import { commonParSteps } from "./solver";
import { isCommonWord } from "./wordList";

describe("PUZZLE_BANK integrity", () => {
  it("has unique ids", () => {
    const ids = PUZZLE_BANK.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(PUZZLE_BANK)("$id: $startWord -> $endWord", (puzzle) => {
    expect(puzzle.startWord).not.toBe(puzzle.endWord);
    expect(puzzle.startWord.length).toBe(puzzle.endWord.length);
    expect(isCommonWord(puzzle.startWord)).toBe(true);
    expect(isCommonWord(puzzle.endWord)).toBe(true);
    expect(commonParSteps(puzzle.startWord, puzzle.endWord)).toBe(puzzle.parSteps);
  });
});
