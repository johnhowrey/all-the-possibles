import { Text as RNText, type TextProps } from "react-native";
import { useAtpTheme } from "../theme";
import { type } from "../tokens/typography";

type Variant = keyof typeof type;

export function AtpText({
  variant = "label",
  color,
  style,
  ...rest
}: TextProps & { variant?: Variant; color?: string }) {
  const { colors } = useAtpTheme();
  return <RNText style={[type[variant], { color: color ?? colors.ink }, style]} {...rest} />;
}

export function Headline(props: TextProps & { color?: string }) {
  return <AtpText variant="headline" {...props} />;
}

export function Subtitle(props: TextProps & { color?: string }) {
  const { colors } = useAtpTheme();
  return <AtpText variant="subtitle" color={colors.inkSecondary} {...props} />;
}
