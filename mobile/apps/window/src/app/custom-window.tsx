import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { track } from "@atp/core";
import { ScreenContainer, Headline, Subtitle, Stepper, NotchedButton, AtpText, space } from "@atp/ui";
import { useFasting } from "../fasting";

export default function CustomWindow() {
  const { startFast } = useFasting();
  const [hours, setHours] = useState(14);

  const onStart = async () => {
    await startFast(hours);
    track("fast_started", { hours, custom: true });
    router.replace("/");
  };

  return (
    <ScreenContainer>
      <View style={{ marginTop: space.xl }}>
        <Headline>Custom window</Headline>
        <Subtitle>How many hours do you want to fast?</Subtitle>
      </View>

      <View style={{ marginTop: space.xxxl, alignItems: "center" }}>
        <Stepper
          value={hours}
          min={1}
          max={48}
          decreaseLabel="Decrease fasting hours"
          increaseLabel="Increase fasting hours"
          onDecrease={() => setHours((h) => Math.max(1, h - 1))}
          onIncrease={() => setHours((h) => Math.min(48, h + 1))}
        />
      </View>

      <View style={{ marginTop: space.xxxl, alignItems: "flex-start" }}>
        <NotchedButton label={`Start ${hours}h fast`} onPress={onStart} fullWidth />
      </View>

      <View style={{ marginTop: "auto", paddingBottom: space.lg }}>
        <AtpText variant="labelSmall" color="#6B6355" onPress={() => router.back()}>
          Cancel
        </AtpText>
      </View>
    </ScreenContainer>
  );
}
