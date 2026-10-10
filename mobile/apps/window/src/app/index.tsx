import { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Redirect, router, useFocusEffect } from "expo-router";
import { useOnboardingGate, usePaywallGate } from "@atp/core";
import {
  ScreenContainer,
  Letterhead,
  Headline,
  Subtitle,
  LedgerPanel,
  DotLeaderRow,
  Divider,
  TextChoiceRow,
  NotchedButton,
  ListRow,
  LoadingState,
  useAtpTheme,
  space,
} from "@atp/ui";
import { APP_ID, ENTITLEMENT_ID, PRESET_WINDOWS } from "./_layout";
import { useFasting, formatElapsed, fastDurationHours } from "../fasting";

export default function Home() {
  const { hasCompletedOnboarding, isLoading: onboardingLoading } = useOnboardingGate(APP_ID);
  const { current, history, isLoading: fastingLoading, reload, startFast, endFast } = useFasting();
  const { isEntitled, isLoading: paywallLoading } = usePaywallGate(APP_ID, ENTITLEMENT_ID, {
    kind: "locked-feature",
  });
  const [selectedPreset, setSelectedPreset] = useState<number>(16);
  const [now, setNow] = useState(() => Date.now());
  const { accent } = useAtpTheme();

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  useEffect(() => {
    if (!current) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [current]);

  if (onboardingLoading || fastingLoading || paywallLoading) {
    return (
      <ScreenContainer>
        <LoadingState />
      </ScreenContainer>
    );
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  const longestFastHours = history.reduce((max, f) => Math.max(max, fastDurationHours(f)), 0);

  const onPickCustom = () => {
    router.push(isEntitled ? "/custom-window" : "/paywall");
  };

  const elapsedMs = current ? now - new Date(current.startedAt).getTime() : 0;
  const targetMs = current ? current.targetHours * 3_600_000 : 0;
  const goalReached = current ? elapsedMs >= targetMs : false;
  const remainingMs = current ? Math.max(0, targetMs - elapsedMs) : 0;

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: space.xxl }}>
        <Letterhead />

        <View style={{ marginTop: space.xxl }}>
          <Headline>{current ? "Fasting" : "Ready to fast"}</Headline>
          <Subtitle>{current ? "Just a timer. Nothing else." : "Pick a window and start."}</Subtitle>
        </View>

        {current ? (
          <View style={{ marginTop: space.xl }}>
            <LedgerPanel>
              <DotLeaderRow label="Elapsed" value={formatElapsed(elapsedMs)} emphasis />
              <Divider />
              <DotLeaderRow label="Target" value={`${current.targetHours}h`} />
              <DotLeaderRow
                label={goalReached ? "Status" : "Remaining"}
                value={goalReached ? "Goal reached" : formatElapsed(remainingMs)}
                valueColor={goalReached ? accent : undefined}
              />
            </LedgerPanel>

            <View style={{ marginTop: space.xl, alignItems: "flex-start" }}>
              <NotchedButton label="End fast" onPress={endFast} />
            </View>
          </View>
        ) : (
          <View style={{ marginTop: space.xl }}>
            <LedgerPanel>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Subtitle style={{ fontStyle: "normal" }}>Window</Subtitle>
                <TextChoiceRow
                  options={[
                    ...PRESET_WINDOWS.map((p) => ({ value: p.value, label: p.label })),
                    { value: -1, label: "Custom" },
                  ]}
                  selected={selectedPreset}
                  onSelect={(v) => (v === -1 ? onPickCustom() : setSelectedPreset(v))}
                  accessibilityLabel="Fasting window length"
                />
              </View>
            </LedgerPanel>

            <View style={{ marginTop: space.xl, alignItems: "flex-start" }}>
              <NotchedButton
                label={`Start fasting (${selectedPreset}h)`}
                onPress={() => startFast(selectedPreset)}
                fullWidth
              />
            </View>
          </View>
        )}

        {history.length > 0 && (
          <View style={{ marginTop: space.xxl }}>
            <LedgerPanel>
              <DotLeaderRow label="Fasts completed" value={`${history.length}`} />
              <DotLeaderRow label="Longest fast" value={`${longestFastHours.toFixed(1)}h`} emphasis />
            </LedgerPanel>
          </View>
        )}

        <View style={{ marginTop: space.xxxl, paddingBottom: space.lg }}>
          <Divider dashed />
          {!isEntitled && (
            <View style={{ marginTop: space.md }}>
              <ListRow
                label="Unlock custom fasting windows"
                onPress={() => router.push("/paywall")}
                tone="muted"
              />
            </View>
          )}
          <ListRow label="Settings" onPress={() => router.push("/settings")} tone="muted" chevron="⚙" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
