import { Platform } from "react-native";
import { useEffect, useState } from "react";
import type { CustomerInfo, PurchasesOffering, PurchasesPackage } from "react-native-purchases";
import { atpConfig, warnMissingKeyOnce } from "../config";

/**
 * Thin wrapper over the RevenueCat SDK. Every app calls configurePurchases()
 * once at startup; everything else (offerings, purchase, restore, the
 * `useEntitlement` hook) works the same way regardless of which app or
 * which product (one-time unlock vs. subscription) is behind it.
 *
 * With no API key set, `isConfigured()` stays false and every call below
 * resolves to an empty/not-entitled result instead of throwing, so the
 * app's UI can still be developed and tested before a RevenueCat account
 * exists.
 */

let configured = false;

export function isConfigured(): boolean {
  return configured;
}

export async function configurePurchases(appId: string): Promise<void> {
  const apiKey =
    Platform.OS === "ios" ? atpConfig.revenueCatApiKeyIos : atpConfig.revenueCatApiKeyAndroid;

  if (!apiKey) {
    warnMissingKeyOnce(
      Platform.OS === "ios"
        ? "EXPO_PUBLIC_REVENUECAT_API_KEY_IOS"
        : "EXPO_PUBLIC_REVENUECAT_API_KEY_ANDROID",
    );
    return;
  }

  const Purchases = (await import("react-native-purchases")).default;
  Purchases.configure({ apiKey, appUserID: null });
  if (__DEV__) {
    // Verbose RevenueCat logs only in development builds.
    const { LOG_LEVEL } = await import("react-native-purchases");
    Purchases.setLogLevel(LOG_LEVEL.WARN);
  }
  configured = true;
  void appId; // reserved for future per-app analytics tagging on the RevenueCat side
}

export async function getOfferings(): Promise<PurchasesOffering | null> {
  if (!configured) return null;
  const Purchases = (await import("react-native-purchases")).default;
  const offerings = await Purchases.getOfferings();
  return offerings.current;
}

export type PurchaseResult =
  | { status: "success"; customerInfo: CustomerInfo }
  | { status: "cancelled" }
  | { status: "error"; message: string };

export async function purchasePackage(pkg: PurchasesPackage): Promise<PurchaseResult> {
  if (!configured) return { status: "error", message: "Purchases not configured" };
  const Purchases = (await import("react-native-purchases")).default;
  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    return { status: "success", customerInfo };
  } catch (error) {
    const e = error as { userCancelled?: boolean; message?: string };
    if (e.userCancelled) return { status: "cancelled" };
    return { status: "error", message: e.message ?? "Unknown purchase error" };
  }
}

export async function restorePurchases(): Promise<CustomerInfo | null> {
  if (!configured) return null;
  const Purchases = (await import("react-native-purchases")).default;
  return Purchases.restorePurchases();
}

/** True once the named entitlement is active on the current customer. */
export function useEntitlement(entitlementId: string): {
  isActive: boolean;
  isLoading: boolean;
  customerInfo: CustomerInfo | null;
} {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

  useEffect(() => {
    if (!configured) {
      setIsLoading(false);
      return;
    }

    let mounted = true;
    let unsubscribe: (() => void) | undefined;

    import("react-native-purchases").then(({ default: Purchases }) => {
      if (!mounted) return;
      const applyInfo = (info: CustomerInfo) => {
        setCustomerInfo(info);
        setIsActive(Boolean(info.entitlements.active[entitlementId]));
        setIsLoading(false);
      };
      Purchases.getCustomerInfo().then(applyInfo);
      Purchases.addCustomerInfoUpdateListener(applyInfo);
      unsubscribe = () => Purchases.removeCustomerInfoUpdateListener(applyInfo);
    });

    return () => {
      mounted = false;
      unsubscribe?.();
    };
  }, [entitlementId]);

  return { isActive, isLoading, customerInfo };
}
