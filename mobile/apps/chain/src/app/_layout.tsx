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

export const APP_ID = "chain";
export const ENTITLEMENT_ID = "chain_unlimited";
export const CHAIN_ACCENT = "#B5541A";
export const FREE_HABIT_LIMIT = 3;

export default function RootLayout() {
  const fontsLoaded = useAtpFonts();

  useEffect(() => {
    initErrorReporting(APP_ID);
    initAnalytics(APP_ID);
    configurePurchases(APP_ID).then(() => track(AtpEvent.AppOpen));
  }, []);

  if (!fontsLoaded) {
    return (
      <AtpThemeProvider accent={CHAIN_ACCENT}>
        <LoadingState />
      </AtpThemeProvider>
    );
  }

  return (
    <AtpThemeProvider accent={CHAIN_ACCENT}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="paywall" options={{ presentation: "modal" }} />
        <Stack.Screen name="add-habit" options={{ presentation: "modal" }} />
      </Stack>
    </AtpThemeProvider>
  );
}
