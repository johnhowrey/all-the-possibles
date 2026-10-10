import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { useOnboardingGate, track, AtpEvent } from "@atp/core";
import { ScreenContainer, Headline, Subtitle, NotchedButton, StepMark, space } from "@atp/ui";
import { APP_ID } from "./_layout";

const STEPS = [
  {
    title: "Split the bill, fast.",
    body: "Type the total, pick a tip, say how many people. That's the whole app.",
  },
  {
    title: "Fair to the penny.",
    body: "Every amount is worked out exactly — no rounding fudged onto whoever pays last.",
  },
  {
    title: "No accounts. No ads.",
    body: "Pay once, use it forever. The first few splits are free to try.",
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
