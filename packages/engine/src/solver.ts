import {
  isCommonWord,
  isValidWord,
  commonNeighborsOf,
  neighborsOf,
} from "./wordList";

type NeighborFn = (word: string) => string[];

function findShortestPath(
  start: string,
  end: string,
  neighborsOfWord: NeighborFn,
): string[] | null {
  const from = start.toLowerCase();
  const to = end.toLowerCase();
  if (from === to) return [from];
  if (from.length !== to.length) return null;

  const visited = new Set<string>([from]);
  const parent = new Map<string, string>();
  let frontier = [from];

  while (frontier.length > 0) {
    const nextFrontier: string[] = [];
    for (const word of frontier) {
      for (const neighbor of neighborsOfWord(word)) {
        if (visited.has(neighbor)) continue;
        visited.add(neighbor);
        parent.set(neighbor, word);
        if (neighbor === to) {
          return reconstructPath(parent, from, to);
        }
        nextFrontier.push(neighbor);
      }
    }
    frontier = nextFrontier;
  }
  return null;
}

function reconstructPath(
  parent: Map<string, string>,
  start: string,
  end: string,
): string[] {
  const path = [end];
  let current = end;
  while (current !== start) {
    const prev = parent.get(current);
    if (!prev) throw new Error("broken path reconstruction");
    path.push(prev);
    current = prev;
  }
  return path.reverse();
}

/**
 * Shortest word-ladder path from `start` to `end` over the full dictionary,
 * inclusive of both ends. Returns null if either word isn't in the
 * dictionary, they're different lengths, or no path exists.
 */
export function shortestPath(start: string, end: string): string[] | null {
  if (!isValidWord(start) || !isValidWord(end)) return null;
  return findShortestPath(start, end, neighborsOf);
}

/** Minimum number of steps (letter swaps) between start and end, or null if unreachable. */
export function parSteps(start: string, end: string): number | null {
  const path = shortestPath(start, end);
  return path ? path.length - 1 : null;
}

/**
 * Shortest path restricted to everyday-vocabulary words. This is what
 * puzzle "par" is calibrated against, so the displayed target is reachable
 * without needing obscure words — a player who finds an even shorter path
 * through a rarer word still wins, just further under par.
 */
export function shortestCommonPath(start: string, end: string): string[] | null {
  if (!isCommonWord(start) || !isCommonWord(end)) return null;
  return findShortestPath(start, end, commonNeighborsOf);
}

export function commonParSteps(start: string, end: string): number | null {
  const path = shortestCommonPath(start, end);
  return path ? path.length - 1 : null;
}
