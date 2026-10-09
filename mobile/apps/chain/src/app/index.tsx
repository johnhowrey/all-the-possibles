import { useCallback } from "react";
import { ScrollView, Text, View } from "react-native";
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
  NotchedButton,
  ListRow,
  LoadingState,
  EmptyState,
  useAtpTheme,
  space,
} from "@atp/ui";
import { APP_ID, ENTITLEMENT_ID, FREE_HABIT_LIMIT } from "./_layout";
import { useHabits, computeStreak, isDoneToday } from "../habits";

function streakLabel(n: number): string {
  if (n === 0) return "—";
  return `${n} day${n === 1 ? "" : "s"}`;
}

export default function Home() {
  const { hasCompletedOnboarding, isLoading: onboardingLoading } = useOnboardingGate(APP_ID);
  const { habits, isLoading: habitsLoading, reload, toggleToday } = useHabits();

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );
  const { isEntitled, isLoading: paywallLoading } = usePaywallGate(APP_ID, ENTITLEMENT_ID, {
    kind: "locked-feature",
  });
  const { colors, accent } = useAtpTheme();

  if (onboardingLoading || habitsLoading || paywallLoading) {
    return (
      <ScreenContainer>
        <LoadingState />
      </ScreenContainer>
    );
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  const atFreeLimit = !isEntitled && habits.length >= FREE_HABIT_LIMIT;
  const longestStreak = habits.reduce((max, h) => Math.max(max, computeStreak(h.completedDates)), 0);

  const onAddHabit = () => {
    router.push(atFreeLimit ? "/paywall" : "/add-habit");
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: space.xxl }}>
      <Letterhead />

      <View style={{ marginTop: space.xxl }}>
        <Headline>Your habits</Headline>
        <Subtitle>Don&apos;t break the chain.</Subtitle>
      </View>

      {habits.length === 0 ? (
        <EmptyState
          title="No habits yet"
          body="Add the first thing you want to keep doing every day."
          actionLabel="Add a habit"
          onAction={onAddHabit}
        />
      ) : (
        <View style={{ marginTop: space.xl }}>
          <LedgerPanel>
            <DotLeaderRow
              label="Longest chain"
              value={streakLabel(longestStreak)}
              emphasis
            />
            <Divider />
            {habits.map((habit) => {
              const streak = computeStreak(habit.completedDates);
              const done = isDoneToday(habit);
              return (
                <DotLeaderRow
                  key={habit.id}
                  label={habit.name}
                  value={streakLabel(streak)}
                  valueColor={done ? accent : undefined}
                  onPress={() => toggleToday(habit.id)}
                  accessibilityLabel={`${habit.name}, ${streakLabel(streak)}. ${
                    done ? "Marked done today. Tap to undo." : "Tap to mark done today."
                  }`}
                  leadingAdornment={
                    <Text
                      style={{
                        marginRight: space.sm,
                        color: done ? accent : colors.hairline,
                        fontWeight: "700",
                      }}
                    >
                      {done ? "✓" : "○"}
                    </Text>
                  }
                />
              );
            })}
          </LedgerPanel>

          <View style={{ marginTop: space.xl, alignItems: "flex-start" }}>
            <NotchedButton label="+ Add habit" onPress={onAddHabit} />
          </View>
        </View>
      )}

      <View style={{ marginTop: space.xxxl, paddingBottom: space.lg }}>
        <Divider dashed />
        {!isEntitled && (
          <View style={{ marginTop: space.md }}>
            <ListRow
              label={`Free plan — ${Math.max(0, FREE_HABIT_LIMIT - habits.length)} habit slots left`}
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
