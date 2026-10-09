import { useEffect, useState } from "react";
import { Linking, View } from "react-native";
import { router } from "expo-router";
import type { PurchasesOffering, PurchasesPackage } from "react-native-purchases";
import {
  isPurchasesConfigured,
  getOfferings,
  purchasePackage,
  restorePurchases,
  track,
  trackScreen,
  AtpEvent,
} from "@atp/core";
import {
  ScreenContainer,
  Headline,
  Subtitle,
  Divider,
  NotchedButton,
  ListRow,
  LoadingState,
  ErrorState,
  AtpText,
  space,
} from "@atp/ui";

type ViewState =
  | { kind: "loading" }
  | { kind: "not-configured" }
  | { kind: "error"; message: string }
  | { kind: "ready"; offering: PurchasesOffering | null }
  | { kind: "purchasing" };

export default function Paywall() {
  const [state, setState] = useState<ViewState>({ kind: "loading" });
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    trackScreen("paywall");
    track(AtpEvent.PaywallShown);

    let ignore = false;

    async function fetchOfferings() {
      if (!isPurchasesConfigured()) {
        if (!ignore) setState({ kind: "not-configured" });
        return;
      }
      try {
        const offering = await getOfferings();
        if (!ignore) setState({ kind: "ready", offering });
      } catch (error) {
        if (!ignore) {
          setState({ kind: "error", message: (error as Error).message ?? "Couldn't load pricing." });
        }
      }
    }

    fetchOfferings();
    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  const load = () => {
    setState({ kind: "loading" });
    setReloadKey((k) => k + 1);
  };

  const onPurchase = async (pkg: PurchasesPackage) => {
    setState({ kind: "purchasing" });
    track(AtpEvent.PurchaseStarted);
    const result = await purchasePackage(pkg);
    if (result.status === "success") {
      track(AtpEvent.PurchaseCompleted);
      router.back();
    } else if (result.status === "cancelled") {
      load();
    } else {
      track(AtpEvent.PurchaseFailed, { message: result.message });
      setState({ kind: "error", message: result.message });
    }
  };

  const onRestore = async () => {
    const info = await restorePurchases();
    if (info && Object.keys(info.entitlements.active).length > 0) {
      track(AtpEvent.PurchaseRestored);
      router.back();
    } else {
      setState({ kind: "error", message: "No previous purchase found for this device." });
    }
  };

  const onClose = () => {
    track(AtpEvent.PaywallDismissed);
    router.back();
  };

  return (
    <ScreenContainer>
      <View style={{ marginTop: space.xl }}>
        <Headline>Unlock unlimited habits</Headline>
        <Subtitle>One payment. No subscription, ever.</Subtitle>
      </View>

      <View style={{ marginTop: space.xl, flex: 1 }}>
        {state.kind === "loading" && <LoadingState label="Checking pricing…" />}

        {state.kind === "not-configured" && (
          <ErrorState
            title="Purchases aren't set up yet"
            body="This build doesn't have a RevenueCat key configured, so there's nothing to buy yet — the free tier works as normal."
          />
        )}

        {state.kind === "error" && <ErrorState body={state.message} onRetry={load} />}

        {state.kind === "purchasing" && <LoadingState label="Completing purchase…" />}

        {state.kind === "ready" && (
          <View>
            {state.offering?.availablePackages.length ? (
              state.offering.availablePackages.map((pkg) => (
                <View key={pkg.identifier} style={{ marginBottom: space.lg }}>
                  <NotchedButton
                    label={`Unlock — ${pkg.product.priceString}`}
                    onPress={() => onPurchase(pkg)}
                    fullWidth
                  />
                </View>
              ))
            ) : (
              <AtpText variant="labelSmall">No products configured in RevenueCat yet.</AtpText>
            )}
          </View>
        )}
      </View>

      <View>
        <Divider dashed />
        <View style={{ marginTop: space.md }}>
          <ListRow label="Restore purchase" onPress={onRestore} tone="muted" chevron="↻" />
          <ListRow label="Not now" onPress={onClose} tone="muted" chevron="×" />
        </View>
        <View style={{ flexDirection: "row", gap: space.lg, marginTop: space.sm }}>
          <AtpText
            variant="labelSmall"
            color="#6B6355"
            onPress={() => Linking.openURL("https://allthepossibles.com/privacy#apps")}
          >
            Privacy policy
          </AtpText>
          <AtpText
            variant="labelSmall"
            color="#6B6355"
            onPress={() => Linking.openURL("https://allthepossibles.com/terms#apps")}
          >
            Terms
          </AtpText>
        </View>
      </View>
    </ScreenContainer>
  );
}
