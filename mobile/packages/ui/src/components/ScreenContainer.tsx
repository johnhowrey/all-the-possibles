import { StyleSheet, View, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { ReactNode } from "react";
import { useAtpTheme } from "../theme";
import { space } from "../tokens/spacing";

export function ScreenContainer({
  children,
  style,
}: {
  children: ReactNode;
  style?: ViewStyle;
}) {
  const { colors } = useAtpTheme();
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.paper }]} edges={["top", "bottom"]}>
      <View style={[styles.content, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { flex: 1, paddingHorizontal: space.xxl, paddingTop: space.lg },
});
