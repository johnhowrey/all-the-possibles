import { Text, View } from "react-native";
import { useAtpTheme } from "../theme";

/** Big faint ticket-stub numeral — fills the quiet middle of an
 * onboarding screen with something on-theme instead of dead space. */
export function StepMark({ step }: { step: number }) {
  const { colors } = useAtpTheme();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} pointerEvents="none">
      <Text
        style={{
          fontFamily: "Fraunces_900Black",
          fontSize: 220,
          color: colors.hairline,
        }}
      >
        {String(step).padStart(2, "0")}
      </Text>
    </View>
  );
}
