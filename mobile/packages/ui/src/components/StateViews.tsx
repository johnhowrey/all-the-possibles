import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAtpTheme } from "../theme";
import { AtpText } from "./Text";
import { NotchedButton } from "./NotchedButton";
import { space } from "../tokens/spacing";

/** Standard loading state — used for font-load gating and any async
 * fetch. Keep it quiet; no spinner-plus-logo theatrics. */
export function LoadingState({ label = "Loading…" }: { label?: string }) {
  const { colors } = useAtpTheme();
  return (
    <View style={styles.center}>
      <ActivityIndicator color={colors.ink} />
      <AtpText variant="labelSmall" color={colors.inkSecondary} style={styles.spacingTop}>
        {label}
      </AtpText>
    </View>
  );
}

export function EmptyState({
  title,
  body,
  actionLabel,
  onAction,
}: {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const { colors } = useAtpTheme();
  return (
    <View style={styles.center}>
      <AtpText variant="headline" style={{ fontSize: 22, textAlign: "center" }}>
        {title}
      </AtpText>
      <AtpText
        variant="subtitle"
        color={colors.inkSecondary}
        style={[styles.spacingTop, { textAlign: "center" }]}
      >
        {body}
      </AtpText>
      {actionLabel && onAction && (
        <View style={styles.spacingTopLg}>
          <NotchedButton label={actionLabel} onPress={onAction} />
        </View>
      )}
    </View>
  );
}

export function ErrorState({
  title = "Something went wrong",
  body,
  retryLabel = "Try again",
  onRetry,
}: {
  title?: string;
  body: string;
  retryLabel?: string;
  onRetry?: () => void;
}) {
  const { colors } = useAtpTheme();
  return (
    <View style={styles.center}>
      <AtpText variant="headline" color={colors.danger} style={{ fontSize: 22, textAlign: "center" }}>
        {title}
      </AtpText>
      <AtpText
        variant="subtitle"
        color={colors.inkSecondary}
        style={[styles.spacingTop, { textAlign: "center" }]}
      >
        {body}
      </AtpText>
      {onRetry && (
        <View style={styles.spacingTopLg}>
          <NotchedButton label={retryLabel} onPress={onRetry} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: space.xxl },
  spacingTop: { marginTop: space.sm },
  spacingTopLg: { marginTop: space.xl },
});
