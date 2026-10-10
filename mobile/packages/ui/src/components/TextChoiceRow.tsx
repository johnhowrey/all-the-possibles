import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAtpTheme } from "../theme";
import { type } from "../tokens/typography";

export interface TextChoiceOption<T> {
  value: T;
  label: string;
}

/** Plain, typographic choice row (e.g. tip %) — underline + color on the
 * selected option, never a pill/segmented-control background. */
export function TextChoiceRow<T extends string | number>({
  options,
  selected,
  onSelect,
  accessibilityLabel,
}: {
  options: TextChoiceOption<T>[];
  selected: T;
  onSelect: (value: T) => void;
  accessibilityLabel?: string;
}) {
  const { colors, accent } = useAtpTheme();
  return (
    <View style={styles.row} accessibilityRole="radiogroup" accessibilityLabel={accessibilityLabel}>
      {options.map((opt, i) => {
        const active = opt.value === selected;
        return (
          <View key={String(opt.value)} style={styles.item}>
            <Pressable
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
              onPress={() => onSelect(opt.value)}
              hitSlop={8}
            >
              <Text
                style={[
                  type.label,
                  {
                    color: active ? accent : colors.ink,
                    fontWeight: active ? "700" : "500",
                    textDecorationLine: active ? "underline" : "none",
                  },
                ]}
              >
                {opt.label}
              </Text>
            </Pressable>
            {i < options.length - 1 && (
              <Text style={{ color: colors.dotLeader, marginHorizontal: 6 }} accessibilityElementsHidden>
                ·
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  item: { flexDirection: "row", alignItems: "center" },
});
