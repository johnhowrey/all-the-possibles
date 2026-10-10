import { Pressable, StyleSheet, Text, View, type TextStyle } from "react-native";
import type { ReactNode } from "react";
import { useAtpTheme } from "../theme";
import { type } from "../tokens/typography";
import { space } from "../tokens/spacing";

/** A receipt-style line: label, a dotted leader filling the gap, value.
 * Pass `onPress` to make the whole row tappable (e.g. "mark done today")
 * — it renders as a real button, not a div-with-onClick. */
export function DotLeaderRow({
  label,
  value,
  valueStyle,
  valueColor,
  emphasis = false,
  onPress,
  accessibilityLabel,
  leadingAdornment,
}: {
  label: string;
  value: string;
  valueStyle?: TextStyle;
  valueColor?: string;
  emphasis?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
  leadingAdornment?: ReactNode;
}) {
  const { colors } = useAtpTheme();
  const content = (
    <View style={styles.row}>
      {leadingAdornment}
      <Text style={[type.labelSmall, { color: colors.inkSecondary }]}>{label}</Text>
      <View style={[styles.leader, { borderBottomColor: colors.dotLeader }]} />
      <Text
        style={[
          emphasis ? type.ledgerHero : type.ledgerValue,
          { color: valueColor ?? colors.ink },
          valueStyle,
        ]}
      >
        {value}
      </Text>
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      onPress={onPress}
      hitSlop={{ top: 6, bottom: 6 }}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "flex-end", marginTop: space.sm },
  leader: {
    flex: 1,
    marginHorizontal: space.sm,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderStyle: "dotted",
  },
});
