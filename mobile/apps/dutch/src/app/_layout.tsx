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

export const APP_ID = "dutch";
export const ENTITLEMENT_ID = "dutch_unlimited";

export default function RootLayout() {
  const fontsLoaded = useAtpFonts();

  useEffect(() => {
    initErrorReporting(APP_ID);
    initAnalytics(APP_ID);
    configurePurchases(APP_ID).then(() => track(AtpEvent.AppOpen));
  }, []);

  if (!fontsLoaded) {
    return (
      <AtpThemeProvider>
        <LoadingState />
      </AtpThemeProvider>
    );
  }

  return (
    <AtpThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="paywall" options={{ presentation: "modal" }} />
      </Stack>
    </AtpThemeProvider>
  );
}
