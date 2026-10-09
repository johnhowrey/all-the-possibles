import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAtpTheme } from "../theme";
import { type } from "../tokens/typography";
import { space } from "../tokens/spacing";

const NOTCH = 16;

/** The primary CTA shape for the whole platform: a ticket-stub corner cut
 * instead of a rounded or square rect — built from an overlapping
 * rotated square clipped by the button's own bounds, no SVG needed. */
export function NotchedButton({
  label,
  onPress,
  disabled = false,
  fullWidth = false,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}) {
  const { colors } = useAtpTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        fullWidth && styles.fullWidth,
        { backgroundColor: disabled ? colors.hairline : colors.ink },
      ]}
    >
      <Text style={[type.buttonLabel, { color: colors.paper }]}>{label}</Text>
      <View style={styles.notchMask} pointerEvents="none">
        <View style={[styles.notchSquare, { backgroundColor: colors.paper }]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingVertical: space.lg - 1,
    paddingHorizontal: space.xxl,
    overflow: "hidden",
  },
  fullWidth: { alignSelf: "stretch", justifyContent: "center" },
  notchMask: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: NOTCH,
    height: NOTCH,
    overflow: "hidden",
  },
  notchSquare: {
    position: "absolute",
    width: NOTCH,
    height: NOTCH,
    bottom: -NOTCH / 2,
    right: -NOTCH / 2,
    transform: [{ rotate: "45deg" }],
  },
});
