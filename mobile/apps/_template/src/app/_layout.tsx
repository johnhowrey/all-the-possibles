import { useEffect } from "react";
import { Stack } from "expo-router";
import { initAnalytics, initErrorReporting, configurePurchases, track, AtpEvent } from "@atp/core";

// Every app in the catalog sets its own short, stable id here — used to
// namespace local storage keys and tag analytics/error events.
const APP_ID = "app-template";

export default function RootLayout() {
  useEffect(() => {
    initErrorReporting(APP_ID);
    initAnalytics(APP_ID);
    configurePurchases(APP_ID).then(() => track(AtpEvent.AppOpen));
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
