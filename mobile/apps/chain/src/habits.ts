import { useCallback, useEffect, useState } from "react";
import { getJson, setJson } from "@atp/core";
import { APP_ID } from "./app/_layout";

export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  /** ISO date strings (yyyy-mm-dd), one per day it was marked done. */
  completedDates: string[];
}

const HABITS_KEY = "habits";

function dateKey(daysAgo = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

/** Consecutive-day streak ending today (or yesterday, if today isn't
 * marked yet — missing just today doesn't break the chain until the
 * day actually passes). */
export function computeStreak(completedDates: string[]): number {
  const done = new Set(completedDates);
  let streak = 0;
  let cursor = done.has(dateKey(0)) ? 0 : 1;
  while (done.has(dateKey(cursor))) {
    streak++;
    cursor++;
  }
  return streak;
}

export function isDoneToday(habit: Habit): boolean {
  return habit.completedDates.includes(dateKey(0));
}

export function useHabits(): {
  habits: Habit[];
  isLoading: boolean;
  reload: () => Promise<void>;
  addHabit: (name: string) => Promise<void>;
  toggleToday: (id: string) => Promise<void>;
  removeHabit: (id: string) => Promise<void>;
} {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const reload = useCallback(async () => {
    const stored = await getJson<Habit[]>(APP_ID, HABITS_KEY);
    setHabits(stored ?? []);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let ignore = false;
    getJson<Habit[]>(APP_ID, HABITS_KEY).then((stored) => {
      if (ignore) return;
      setHabits(stored ?? []);
      setIsLoading(false);
    });
    return () => {
      ignore = true;
    };
    // Only on mount — screens that need fresh data after navigating back
    // (e.g. from add-habit) call the returned `reload()` from a focus effect.
  }, []);

  const persist = useCallback(async (next: Habit[]) => {
    setHabits(next);
    await setJson(APP_ID, HABITS_KEY, next);
  }, []);

  const addHabit = useCallback(
    async (name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      const habit: Habit = {
        id: `${Date.now()}`,
        name: trimmed,
        createdAt: dateKey(0),
        completedDates: [],
      };
      await persist([...habits, habit]);
    },
    [habits, persist],
  );

  const toggleToday = useCallback(
    async (id: string) => {
      const today = dateKey(0);
      const next = habits.map((h) => {
        if (h.id !== id) return h;
        const has = h.completedDates.includes(today);
        return {
          ...h,
          completedDates: has
            ? h.completedDates.filter((d) => d !== today)
            : [...h.completedDates, today],
        };
      });
      await persist(next);
    },
    [habits, persist],
  );

  const removeHabit = useCallback(
    async (id: string) => {
      await persist(habits.filter((h) => h.id !== id));
    },
    [habits, persist],
  );

  return { habits, isLoading, reload, addHabit, toggleToday, removeHabit };
}
