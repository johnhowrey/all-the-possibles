import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { useOnboardingGate, track, AtpEvent } from "@atp/core";
import { ScreenContainer, Headline, Subtitle, NotchedButton, StepMark, space } from "@atp/ui";
import { APP_ID } from "./_layout";

const STEPS = [
  {
    title: "Just a timer.",
    body: "Start your fast, watch the clock, end it when you're ready. Nothing else.",
  },
  {
    title: "No plans. No articles.",
    body: "Window doesn't tell you how to fast or what to eat — it just times the window.",
  },
  {
    title: "No accounts. No ads.",
    body: "Pay once for custom window lengths, or stick with 16:8, 18:6, or 20:4 for free, forever.",
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
