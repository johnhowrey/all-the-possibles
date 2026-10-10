import { StyleSheet, Text, View } from "react-native";
import { useAtpTheme } from "../theme";
import { type } from "../tokens/typography";
import { space } from "../tokens/spacing";

/** The studio's one recurring signature across every app's home screen:
 * a small centered letterhead with a hairline beneath it, like the top
 * of a receipt. Keep the brand name — not the app name — here. */
export function Letterhead({ studioName = "ALL THE POSSIBLES" }: { studioName?: string }) {
  const { colors } = useAtpTheme();
  return (
    <View style={[styles.wrap, { borderBottomColor: colors.ink }]}>
      <Text style={[type.kicker, { color: colors.inkSecondary }]}>{studioName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    paddingBottom: space.md,
    borderBottomWidth: 1,
  },
});
