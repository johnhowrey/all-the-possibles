import { useEffect } from "react";
import { Stack } from "expo-router";
import {
  initAnalytics,
  initErrorReporting,
  configurePurchases,
  track,
  AtpEvent,
} from "@atp/core";
import { AtpThemeProvider, useAtpFonts, LoadingState } from "@atp/ui";

export const APP_ID = "window";
export const ENTITLEMENT_ID = "window_custom";
export const WINDOW_ACCENT = "#2F6F6B";

/** Free presets. Any other window length requires the unlock. */
export const PRESET_WINDOWS = [
  { value: 16, label: "16:8" },
  { value: 18, label: "18:6" },
  { value: 20, label: "20:4" },
] as const;

export default function RootLayout() {
  const fontsLoaded = useAtpFonts();

  useEffect(() => {
    initErrorReporting(APP_ID);
    initAnalytics(APP_ID);
    configurePurchases(APP_ID).then(() => track(AtpEvent.AppOpen));
  }, []);

  if (!fontsLoaded) {
    return (
      <AtpThemeProvider accent={WINDOW_ACCENT}>
        <LoadingState />
      </AtpThemeProvider>
    );
  }

  return (
    <AtpThemeProvider accent={WINDOW_ACCENT}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="paywall" options={{ presentation: "modal" }} />
        <Stack.Screen name="custom-window" options={{ presentation: "modal" }} />
      </Stack>
    </AtpThemeProvider>
  );
}
