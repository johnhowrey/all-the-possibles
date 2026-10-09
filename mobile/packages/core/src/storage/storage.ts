import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

/** Namespaced key-value JSON storage so every app's keys don't collide. */
function namespacedKey(appId: string, key: string): string {
  return `atp:${appId}:${key}`;
}

export async function getJson<T>(appId: string, key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(namespacedKey(appId, key));
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function setJson<T>(appId: string, key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(namespacedKey(appId, key), JSON.stringify(value));
}

export async function removeJson(appId: string, key: string): Promise<void> {
  await AsyncStorage.removeItem(namespacedKey(appId, key));
}

/** Deletes every key this app has written. Used by the settings "delete my data" action. */
export async function clearAppData(appId: string): Promise<void> {
  const allKeys = await AsyncStorage.getAllKeys();
  const prefix = `atp:${appId}:`;
  const ours = allKeys.filter((k) => k.startsWith(prefix));
  if (ours.length > 0) await AsyncStorage.multiRemove(ours);
}

/** A persisted boolean/JSON flag with a loading state, for things like "has seen onboarding". */
export function useStoredFlag<T>(
  appId: string,
  key: string,
  defaultValue: T,
): {
  value: T;
  isLoading: boolean;
  setValue: (next: T) => Promise<void>;
} {
  const [value, setValueState] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getJson<T>(appId, key).then((stored) => {
      if (!mounted) return;
      if (stored !== null) setValueState(stored);
      setIsLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [appId, key]);

  const setValue = useCallback(
    async (next: T) => {
      setValueState(next);
      await setJson(appId, key, next);
    },
    [appId, key],
  );

  return { value, isLoading, setValue };
}
