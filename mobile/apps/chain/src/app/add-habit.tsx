import { useState } from "react";
import { TextInput, View } from "react-native";
import { router } from "expo-router";
import { track } from "@atp/core";
import { ScreenContainer, Headline, Subtitle, NotchedButton, AtpText, space } from "@atp/ui";
import { useHabits } from "../habits";

export default function AddHabit() {
  const { habits, addHabit } = useHabits();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onAdd = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Give it a name first.");
      return;
    }
    if (habits.some((h) => h.name.toLowerCase() === trimmed.toLowerCase())) {
      setError("You already have a habit with that name.");
      return;
    }
    await addHabit(trimmed);
    track("habit_added");
    router.back();
  };

  return (
    <ScreenContainer>
      <View style={{ marginTop: space.xl }}>
        <Headline>New habit</Headline>
        <Subtitle>What do you want to keep doing every day?</Subtitle>
      </View>

      <View style={{ marginTop: space.xxl }}>
        <TextInput
          value={name}
          onChangeText={(t) => {
            setName(t);
            setError(null);
          }}
          placeholder="e.g. Stretch for 5 minutes"
          placeholderTextColor="#B8AE94"
          autoFocus
          accessibilityLabel="Habit name"
          style={{
            fontFamily: "Fraunces_600SemiBold",
            fontSize: 22,
            color: "#2B2620",
            borderWidth: 0,
            borderBottomWidth: 1,
            borderBottomColor: "#2B2620",
            paddingBottom: space.sm,
          }}
        />
        {error && (
          <View style={{ marginTop: space.sm }}>
            <AtpText variant="labelSmall" color="#B3261E">
              {error}
            </AtpText>
          </View>
        )}
      </View>

      <View style={{ marginTop: space.xxl, flexDirection: "row", gap: space.lg }}>
        <NotchedButton label="Add habit" onPress={onAdd} />
      </View>

      <View style={{ marginTop: "auto", paddingBottom: space.lg }}>
        <AtpText variant="labelSmall" color="#6B6355" onPress={() => router.back()}>
          Cancel
        </AtpText>
      </View>
    </ScreenContainer>
  );
}
