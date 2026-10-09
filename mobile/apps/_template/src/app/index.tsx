import { Text, View } from "react-native";
import { useOnboardingGate } from "@atp/core";

const APP_ID = "app-template";

/**
 * Scaffold placeholder — proves the shared platform (routing, storage,
 * analytics, purchases wiring) works end to end. Deliberately unstyled:
 * real screens get built once the visual direction is approved, on top of
 * @atp/ui, not here.
 */
export default function Index() {
  const { hasCompletedOnboarding, isLoading } = useOnboardingGate(APP_ID);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading…</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
      <Text>Platform scaffold is wired up.</Text>
      <Text>Onboarding complete: {String(hasCompletedOnboarding)}</Text>
    </View>
  );
}
