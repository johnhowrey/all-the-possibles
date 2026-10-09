import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAtpTheme } from "../theme";
import { type } from "../tokens/typography";

export function Stepper({
  value,
  onDecrease,
  onIncrease,
  decreaseLabel = "Decrease",
  increaseLabel = "Increase",
  min,
  max,
}: {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  decreaseLabel?: string;
  increaseLabel?: string;
  min?: number;
  max?: number;
}) {
  const { colors } = useAtpTheme();
  const atMin = min !== undefined && value <= min;
  const atMax = max !== undefined && value >= max;
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={decreaseLabel}
        disabled={atMin}
        onPress={onDecrease}
        style={styles.hit}
      >
        <Text style={[type.ledgerValue, { color: atMin ? colors.hairline : colors.ink }]}>‹</Text>
      </Pressable>
      <Text style={[type.ledgerTotal, { color: colors.ink, minWidth: 24, textAlign: "center" }]}>
        {value}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={increaseLabel}
        disabled={atMax}
        onPress={onIncrease}
        style={styles.hit}
      >
        <Text style={[type.ledgerValue, { color: atMax ? colors.hairline : colors.ink }]}>›</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 2 },
  hit: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
});
