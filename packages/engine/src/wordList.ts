import words3 from "./data/words-3.json" with { type: "json" };
import words4 from "./data/words-4.json" with { type: "json" };
import words5 from "./data/words-5.json" with { type: "json" };
import words6 from "./data/words-6.json" with { type: "json" };
import words7 from "./data/words-7.json" with { type: "json" };
import commonWords3 from "./data/common-words-3.json" with { type: "json" };
import commonWords4 from "./data/common-words-4.json" with { type: "json" };
import commonWords5 from "./data/common-words-5.json" with { type: "json" };
import commonWords6 from "./data/common-words-6.json" with { type: "json" };
import commonWords7 from "./data/common-words-7.json" with { type: "json" };

const WORDS_BY_LENGTH: Record<number, string[]> = {
  3: words3,
  4: words4,
  5: words5,
  6: words6,
  7: words7,
};

// A smaller, everyday-vocabulary subset of the dictionary above (ranked by
// real-world word frequency). Used to pick puzzle start/end words and to
// calculate "par," so the daily target stays reachable without needing
// obscure words — while step validation during play still accepts any
// word from the full dictionary.
const COMMON_WORDS_BY_LENGTH: Record<number, string[]> = {
  3: commonWords3,
  4: commonWords4,
  5: commonWords5,
  6: commonWords6,
  7: commonWords7,
};

const SETS_BY_LENGTH = new Map<number, Set<string>>();
function setFor(length: number): Set<string> {
  let set = SETS_BY_LENGTH.get(length);
  if (!set) {
    set = new Set(WORDS_BY_LENGTH[length] ?? []);
    SETS_BY_LENGTH.set(length, set);
  }
  return set;
}

const COMMON_SETS_BY_LENGTH = new Map<number, Set<string>>();
function commonSetFor(length: number): Set<string> {
  let set = COMMON_SETS_BY_LENGTH.get(length);
  if (!set) {
    set = new Set(COMMON_WORDS_BY_LENGTH[length] ?? []);
    COMMON_SETS_BY_LENGTH.set(length, set);
  }
  return set;
}

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

export function isValidWord(word: string): boolean {
  const normalized = word.toLowerCase();
  return setFor(normalized.length).has(normalized);
}

export function isCommonWord(word: string): boolean {
  const normalized = word.toLowerCase();
  return commonSetFor(normalized.length).has(normalized);
}

export function isOneLetterDifferent(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diffCount = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) diffCount++;
    if (diffCount > 1) return false;
  }
  return diffCount === 1;
}

function neighborsFromSet(word: string, set: Set<string>): string[] {
  const neighbors: string[] = [];
  for (let i = 0; i < word.length; i++) {
    for (const letter of ALPHABET) {
      if (letter === word[i]) continue;
      const candidate = word.slice(0, i) + letter + word.slice(i + 1);
      if (set.has(candidate)) neighbors.push(candidate);
    }
  }
  return neighbors;
}

/** Every valid dictionary word reachable from `word` by changing exactly one letter. */
export function neighborsOf(word: string): string[] {
  const normalized = word.toLowerCase();
  return neighborsFromSet(normalized, setFor(normalized.length));
}

/** Same as neighborsOf, restricted to everyday-vocabulary words. */
export function commonNeighborsOf(word: string): string[] {
  const normalized = word.toLowerCase();
  return neighborsFromSet(normalized, commonSetFor(normalized.length));
}

export function wordListSizeForLength(length: number): number {
  return setFor(length).size;
}
