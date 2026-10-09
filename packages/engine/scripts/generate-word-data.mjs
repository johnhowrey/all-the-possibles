// Builds per-length word lists for the game's dictionary from the
// MIT-licensed "an-array-of-english-words" package (not the engine's
// runtime dependency — this script runs once, and its output is what
// ships). Only plain lowercase a-z words are kept: no proper nouns,
// abbreviations, or words with punctuation, since ladder steps swap a
// single letter and must stay a plain word.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import words from "an-array-of-english-words" with { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));

// most-common-words-by-language's JS entrypoint has an undeclared lodash
// dependency and fails to load; its data is a plain one-word-per-line file,
// so we read that directly instead of going through its (broken) API.
function getWordsList(language, count) {
  const path = fileURLToPath(
    new URL(
      `../../../node_modules/most-common-words-by-language/build/resources/${language}.txt`,
      import.meta.url,
    ),
  );
  const lines = readFileSync(path, "utf8").split("\n").filter(Boolean);
  return lines.slice(0, count);
}
const outDir = join(__dirname, "..", "src", "data");
mkdirSync(outDir, { recursive: true });

const MIN_LENGTH = 3;
const MAX_LENGTH = 7;
// How many of the most-common English words count as "common" for puzzle
// curation and par calculation. Keeps the daily puzzle's par reachable with
// everyday vocabulary, even though validation of a player's own guesses
// uses the full dictionary below.
const COMMON_WORD_RANK_CUTOFF = 4000;

/** @type {Record<number, Set<string>>} */
const byLength = {};
for (let len = MIN_LENGTH; len <= MAX_LENGTH; len++) byLength[len] = new Set();

for (const raw of words) {
  const word = raw.toLowerCase();
  if (!/^[a-z]+$/.test(word)) continue;
  if (word.length < MIN_LENGTH || word.length > MAX_LENGTH) continue;
  byLength[word.length].add(word);
}

for (let len = MIN_LENGTH; len <= MAX_LENGTH; len++) {
  const list = Array.from(byLength[len]).sort();
  writeFileSync(
    join(outDir, `words-${len}.json`),
    JSON.stringify(list),
    "utf8",
  );
  console.log(`words-${len}.json: ${list.length} words`);
}

const commonWords = getWordsList("english", COMMON_WORD_RANK_CUTOFF).map((w) =>
  w.toLowerCase(),
);
/** @type {Record<number, Set<string>>} */
const commonByLength = {};
for (let len = MIN_LENGTH; len <= MAX_LENGTH; len++) commonByLength[len] = new Set();
for (const word of commonWords) {
  if (!/^[a-z]+$/.test(word)) continue;
  if (word.length < MIN_LENGTH || word.length > MAX_LENGTH) continue;
  if (!byLength[word.length].has(word)) continue; // must also be in the full dictionary
  commonByLength[word.length].add(word);
}

for (let len = MIN_LENGTH; len <= MAX_LENGTH; len++) {
  const list = Array.from(commonByLength[len]).sort();
  writeFileSync(
    join(outDir, `common-words-${len}.json`),
    JSON.stringify(list),
    "utf8",
  );
  console.log(`common-words-${len}.json: ${list.length} words`);
}
