import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { useOnboardingGate, track, AtpEvent } from "@atp/core";
import { ScreenContainer, Headline, Subtitle, NotchedButton, StepMark, space } from "@atp/ui";
import { APP_ID } from "./_layout";

const STEPS = [
  {
    title: "Don't break the chain.",
    body: "Add a habit. Mark it done each day. Watch the streak grow.",
  },
  {
    title: "Just streaks. No noise.",
    body: "No journaling, no social feed, no coaching content — just whether you did the thing today.",
  },
  {
    title: "No accounts. No ads.",
    body: "Pay once, use it forever. Your first three habits are free to try.",
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const { completeOnboarding } = useOnboardingGate(APP_ID);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const next = async () => {
    if (isLast) {
      await completeOnboarding();
      track(AtpEvent.OnboardingComplete);
      router.replace("/");
    } else {
      setStep(step + 1);
    }
  };

  return (
    <ScreenContainer style={{ justifyContent: "space-between", paddingTop: 80, paddingBottom: 40 }}>
      <View>
        <Headline>{current.title}</Headline>
        <View style={{ marginTop: space.md }}>
          <Subtitle>{current.body}</Subtitle>
        </View>
      </View>

      <StepMark step={step + 1} />

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", gap: 6 }}>
          {STEPS.map((_, i) => (
            <View
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i === step ? "#2B2620" : "#DAD0BC",
              }}
            />
          ))}
        </View>
        <NotchedButton label={isLast ? "Get started" : "Next"} onPress={next} />
      </View>
    </ScreenContainer>
  );
}
