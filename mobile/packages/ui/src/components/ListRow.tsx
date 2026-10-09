import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAtpTheme } from "../theme";
import { type } from "../tokens/typography";
import { space } from "../tokens/spacing";

/** A plain tappable row — used for settings items and the paywall nudge.
 * Italic Fraunces label so it still reads as part of the ledger voice,
 * not a generic list-cell. */
export function ListRow({
  label,
  onPress,
  tone = "default",
  chevron = "›",
}: {
  label: string;
  onPress: () => void;
  tone?: "default" | "muted" | "accent";
  chevron?: string;
}) {
  const { colors, accent } = useAtpTheme();
  const labelColor = tone === "muted" ? colors.inkSecondary : colors.ink;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={styles.row}
      hitSlop={{ top: 8, bottom: 8 }}
    >
      <Text style={[type.subtitle, { color: labelColor, fontStyle: "normal" }]}>{label}</Text>
      <Text style={{ color: tone === "accent" ? accent : colors.inkSecondary, fontWeight: "700" }}>
        {chevron}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: space.md,
  },
});
