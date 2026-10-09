import { StyleSheet, View } from "react-native";
import { useAtpTheme } from "../theme";

const TOOTH_WIDTH = 16;
const TOOTH_HEIGHT = 9;
const TOOTH_COUNT = 22; // covers the ~352px content width at default screen padding

/** The sawtooth edge under a LedgerPanel — reads as a torn receipt rather
 * than a card, which is the one deliberate signature of the Paper Ledger
 * direction. Pure border-triangle CSS, no image assets. */
export function TornEdge() {
  const { colors } = useAtpTheme();
  return (
    <View style={styles.row}>
      {Array.from({ length: TOOTH_COUNT }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.tooth,
            {
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderTopColor: colors.panel,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", marginTop: -1 },
  tooth: {
    width: 0,
    height: 0,
    borderLeftWidth: TOOTH_WIDTH / 2,
    borderRightWidth: TOOTH_WIDTH / 2,
    borderTopWidth: TOOTH_HEIGHT,
  },
});
