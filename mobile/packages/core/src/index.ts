export { atpConfig } from "./config";

export { getJson, setJson, removeJson, clearAppData, useStoredFlag } from "./storage/storage";

export { initAnalytics, track, trackScreen, AtpEvent } from "./analytics/analytics";

export { initErrorReporting, captureException } from "./errors/errors";

export {
  isConfigured as isPurchasesConfigured,
  configurePurchases,
  getOfferings,
  purchasePackage,
  restorePurchases,
  useEntitlement,
} from "./purchases/purchases";
export type { PurchaseResult } from "./purchases/purchases";

export { useOnboardingGate } from "./onboarding/useOnboardingGate";

export { usePaywallGate } from "./paywall/usePaywallGate";
export type { PaywallTrigger } from "./paywall/usePaywallGate";

export {
  openManageSubscription,
  openSupportEmail,
  openPrivacyPolicy,
  openTerms,
} from "./settings/settingsLinks";
export type { AppSupportInfo } from "./settings/settingsLinks";
