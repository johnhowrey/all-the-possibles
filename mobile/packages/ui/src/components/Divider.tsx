import { View } from "react-native";
import { useAtpTheme } from "../theme";
import { space } from "../tokens/spacing";

export function Divider({ dashed = false, marginVertical = space.md }: { dashed?: boolean; marginVertical?: number }) {
  const { colors } = useAtpTheme();
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderStyle: dashed ? "dashed" : "solid",
        borderTopColor: dashed ? colors.hairlineLight : colors.ink,
        marginVertical,
      }}
    />
  );
}
