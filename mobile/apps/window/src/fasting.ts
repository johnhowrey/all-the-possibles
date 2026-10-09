import { useCallback, useEffect, useState } from "react";
import { getJson, setJson } from "@atp/core";
import { APP_ID } from "./app/_layout";

export interface CurrentFast {
  startedAt: string; // ISO timestamp
  targetHours: number;
}

export interface CompletedFast {
  startedAt: string;
  endedAt: string;
  targetHours: number;
}

const CURRENT_KEY = "current_fast";
const HISTORY_KEY = "fast_history";

export function formatElapsed(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function fastDurationHours(fast: CompletedFast): number {
  return (new Date(fast.endedAt).getTime() - new Date(fast.startedAt).getTime()) / 3_600_000;
}

export function useFasting(): {
  current: CurrentFast | null;
  history: CompletedFast[];
  isLoading: boolean;
  startFast: (targetHours: number) => Promise<void>;
  endFast: () => Promise<void>;
  reload: () => Promise<void>;
} {
  const [current, setCurrent] = useState<CurrentFast | null>(null);
  const [history, setHistory] = useState<CompletedFast[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const reload = useCallback(async () => {
    const [storedCurrent, storedHistory] = await Promise.all([
      getJson<CurrentFast>(APP_ID, CURRENT_KEY),
      getJson<CompletedFast[]>(APP_ID, HISTORY_KEY),
    ]);
    setCurrent(storedCurrent ?? null);
    setHistory(storedHistory ?? []);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let ignore = false;
    Promise.all([
      getJson<CurrentFast>(APP_ID, CURRENT_KEY),
      getJson<CompletedFast[]>(APP_ID, HISTORY_KEY),
    ]).then(([storedCurrent, storedHistory]) => {
      if (ignore) return;
      setCurrent(storedCurrent ?? null);
      setHistory(storedHistory ?? []);
      setIsLoading(false);
    });
    return () => {
      ignore = true;
    };
  }, []);

  const startFast = useCallback(async (targetHours: number) => {
    const next: CurrentFast = { startedAt: new Date().toISOString(), targetHours };
    setCurrent(next);
    await setJson(APP_ID, CURRENT_KEY, next);
  }, []);

  const endFast = useCallback(async () => {
    if (!current) return;
    const completed: CompletedFast = {
      startedAt: current.startedAt,
      endedAt: new Date().toISOString(),
      targetHours: current.targetHours,
    };
    const nextHistory = [...history, completed];
    setHistory(nextHistory);
    setCurrent(null);
    await Promise.all([
      setJson(APP_ID, HISTORY_KEY, nextHistory),
      setJson(APP_ID, CURRENT_KEY, null),
    ]);
  }, [current, history]);

  return { current, history, isLoading, startFast, endFast, reload };
}
