import { StyleSheet, Text, View, type TextStyle } from "react-native";
import { useAtpTheme } from "../theme";
import { type } from "../tokens/typography";
import { space } from "../tokens/spacing";

/** A receipt-style line: label, a dotted leader filling the gap, value. */
export function DotLeaderRow({
  label,
  value,
  valueStyle,
  valueColor,
  emphasis = false,
}: {
  label: string;
  value: string;
  valueStyle?: TextStyle;
  valueColor?: string;
  emphasis?: boolean;
}) {
  const { colors } = useAtpTheme();
  return (
    <View style={styles.row}>
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
