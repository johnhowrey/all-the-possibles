import { puzzleNumberForDate } from "./dailySeed";
import type { PuzzleResult, ShareCardData } from "./types";

export function buildShareCard(
  result: PuzzleResult,
  streakCurrent: number,
  gameName = "Rungs",
): ShareCardData {
  const steps = result.path.length - 1;
  const rating: ShareCardData["rating"] =
    steps < result.parSteps ? "under" : steps === result.parSteps ? "at" : "over";

  return {
    gameName,
    date: result.date,
    puzzleNumber: puzzleNumberForDate(result.date),
    won: result.won,
    steps,
    parSteps: result.parSteps,
    streakCurrent,
    rating,
  };
}

/** Plain-text summary for clipboard/share fallback when image sharing isn't available. */
export function shareCardText(card: ShareCardData): string {
  const result = card.won ? `${card.steps}/${card.parSteps} par` : "didn't finish";
  const streak = card.streakCurrent > 0 ? ` 🔥 ${card.streakCurrent}` : "";
  return `${card.gameName} #${card.puzzleNumber} — ${result}${streak}`;
}
