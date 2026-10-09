import { StyleSheet, View, type ViewStyle } from "react-native";
import type { ReactNode } from "react";
import { useAtpTheme } from "../theme";
import { space } from "../tokens/spacing";
import { TornEdge } from "./TornEdge";

/** The bordered paper panel every app's core numbers live in, with the
 * torn-edge strip underneath. Compose with DotLeaderRow children. */
export function LedgerPanel({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  const { colors } = useAtpTheme();
  return (
    <View>
      <View
        style={[
          styles.panel,
          { backgroundColor: colors.panel, borderColor: colors.hairline },
          style,
        ]}
      >
        {children}
      </View>
      <TornEdge />
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingHorizontal: space.xl,
    paddingTop: space.lg,
    paddingBottom: space.md,
  },
});
