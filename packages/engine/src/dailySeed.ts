import type { DateKey } from "./types";

/** Puzzle #1 falls on this date. Change only with a plan for renumbering. */
export const EPOCH_DATE_KEY: DateKey = "2026-01-01";

/** Formats a Date using its *local* calendar date, not UTC. */
export function toDateKey(date: Date): DateKey {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey: DateKey): { year: number; month: number; day: number } {
  const parts = dateKey.split("-").map(Number);
  const [year, month, day] = parts;
  if (parts.length !== 3 || year === undefined || month === undefined || day === undefined) {
    throw new Error(`Invalid DateKey: ${dateKey}`);
  }
  return { year, month, day };
}

/** Returns the date `delta` days before (negative) or after (positive) `dateKey`. */
export function addDays(dateKey: DateKey, delta: number): DateKey {
  const { year, month, day } = parseDateKey(dateKey);
  const utc = new Date(Date.UTC(year, month - 1, day));
  utc.setUTCDate(utc.getUTCDate() + delta);
  const resultYear = utc.getUTCFullYear();
  const resultMonth = String(utc.getUTCMonth() + 1).padStart(2, "0");
  const resultDay = String(utc.getUTCDate()).padStart(2, "0");
  return `${resultYear}-${resultMonth}-${resultDay}`;
}

function daysBetween(fromKey: DateKey, toKey: DateKey): number {
  const from = parseDateKey(fromKey);
  const to = parseDateKey(toKey);
  const fromUtc = Date.UTC(from.year, from.month - 1, from.day);
  const toUtc = Date.UTC(to.year, to.month - 1, to.day);
  return Math.round((toUtc - fromUtc) / 86_400_000);
}

/** 1-based puzzle number for a date, counting up from the epoch regardless of bank size. */
export function puzzleNumberForDate(dateKey: DateKey): number {
  return daysBetween(EPOCH_DATE_KEY, dateKey) + 1;
}

/** Which bank entry plays on a given date, cycling once the bank is exhausted. */
export function puzzleBankIndexForDate(dateKey: DateKey, bankLength: number): number {
  if (bankLength <= 0) throw new Error("bankLength must be positive");
  const dayIndex = daysBetween(EPOCH_DATE_KEY, dateKey);
  return ((dayIndex % bankLength) + bankLength) % bankLength;
}
