import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { Redirect, router } from "expo-router";
import { useOnboardingGate, usePaywallGate, track, AtpEvent } from "@atp/core";
import {
  ScreenContainer,
  Letterhead,
  Headline,
  Subtitle,
  LedgerPanel,
  DotLeaderRow,
  Divider,
  Stepper,
  TextChoiceRow,
  NotchedButton,
  ListRow,
  LoadingState,
  space,
} from "@atp/ui";
import { APP_ID, ENTITLEMENT_ID } from "./_layout";

const TIP_OPTIONS = [
  { value: 15, label: "15%" },
  { value: 20, label: "20%" },
  { value: 25, label: "25%" },
];
const FREE_SPLITS = 3;

function currency(n: number): string {
  return n.toFixed(2);
}

export default function Home() {
  const { hasCompletedOnboarding, isLoading: onboardingLoading } = useOnboardingGate(APP_ID);
  const [billTotal, setBillTotal] = useState(84.5);
  const [billInput, setBillInput] = useState("84.50");
  const [peopleCount, setPeopleCount] = useState(3);
  const [tipPct, setTipPct] = useState(20);
  const [savedMessage, setSavedMessage] = useState(false);

  const {
    isEntitled,
    isLoading: paywallLoading,
    shouldShowPaywall,
    useCount,
    presentPaywall,
    recordFeatureUse,
  } = usePaywallGate(APP_ID, ENTITLEMENT_ID, { kind: "after-n-uses", freeUses: FREE_SPLITS });

  if (onboardingLoading || paywallLoading) {
    return (
      <ScreenContainer>
        <LoadingState />
      </ScreenContainer>
    );
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  if (shouldShowPaywall) {
    router.push("/paywall");
  }

  const tipAmount = (billTotal * tipPct) / 100;
  const totalWithTip = billTotal + tipAmount;
  const perPerson = totalWithTip / peopleCount;

  const onBillChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, "");
    setBillInput(cleaned);
    const parsed = Number.parseFloat(cleaned);
    if (!Number.isNaN(parsed) && parsed >= 0) {
      setBillTotal(parsed);
    }
  };

  const onDoneSplitting = async () => {
    await recordFeatureUse();
    track(AtpEvent.AppOpen, { action: "split_completed" });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 1800);
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: space.xxl }}>
      <Letterhead />

      <View style={{ marginTop: space.xxl }}>
        <Headline>Split the bill</Headline>
        <Subtitle>Fair to the penny.</Subtitle>
      </View>

      <View style={{ marginTop: space.xl }}>
        <LedgerPanel>
          <View style={{ flexDirection: "row", alignItems: "baseline", marginTop: space.sm }}>
            <Subtitle style={{ fontStyle: "normal", fontSize: 13 }}>Bill total</Subtitle>
            <View
              style={{
                flex: 1,
                marginHorizontal: space.sm,
                marginBottom: 4,
                borderBottomWidth: 1,
                borderStyle: "dotted",
                borderBottomColor: "#C9BFA8",
              }}
            />
            <Text style={{ fontFamily: "Fraunces_600SemiBold", fontSize: 16, color: "#2B2620" }}>$</Text>
            <TextInput
              value={billInput}
              onChangeText={onBillChange}
              keyboardType="decimal-pad"
              accessibilityLabel="Bill total in dollars"
              style={{
                fontFamily: "Fraunces_600SemiBold",
                fontSize: 16,
                color: "#2B2620",
                minWidth: 56,
                padding: 0,
              }}
            />
          </View>
          <DotLeaderRow label={`Tip (${tipPct}%)`} value={`$${currency(tipAmount)}`} />
          <Divider />
          <DotLeaderRow label="Total" value={`$${currency(totalWithTip)}`} />
          <DotLeaderRow
            label={`Per person (×${peopleCount})`}
            value={`$${currency(perPerson)}`}
            emphasis
          />
        </LedgerPanel>
      </View>

      <View
        style={{
          marginTop: space.xxl,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: "#2B2620",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: space.md,
          }}
        >
          <Subtitle style={{ fontStyle: "normal" }}>Split between</Subtitle>
          <Stepper
            value={peopleCount}
            min={2}
            max={20}
            decreaseLabel="Decrease number of people"
            increaseLabel="Increase number of people"
            onDecrease={() => setPeopleCount((n) => Math.max(2, n - 1))}
            onIncrease={() => setPeopleCount((n) => Math.min(20, n + 1))}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: space.md,
            borderTopWidth: 1,
            borderStyle: "dashed",
            borderTopColor: "#D8CFBA",
          }}
        >
          <Subtitle style={{ fontStyle: "normal" }}>Tip</Subtitle>
          <TextChoiceRow
            options={TIP_OPTIONS}
            selected={tipPct}
            onSelect={setTipPct}
            accessibilityLabel="Tip percentage"
          />
        </View>
      </View>

      <View style={{ marginTop: space.xxl, alignItems: "flex-start" }}>
        <NotchedButton
          label={savedMessage ? "Saved ✓" : "Done splitting"}
          onPress={onDoneSplitting}
        />
      </View>

      <View style={{ marginTop: space.xxxl }}>
        <Divider dashed />
        {!isEntitled && (
          <View style={{ marginTop: space.md }}>
            <ListRow
              label={`Free plan — ${Math.max(0, FREE_SPLITS - useCount)} free splits left`}
              onPress={presentPaywall}
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
