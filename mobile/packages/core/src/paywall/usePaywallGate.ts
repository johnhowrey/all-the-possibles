import { useCallback, useEffect, useState } from "react";
import { useStoredFlag } from "../storage/storage";
import { useEntitlement } from "../purchases/purchases";

/**
 * When to show the paywall. Each app picks one at setup time:
 * - "immediate": show before the core feature is used at all.
 * - "after-n-uses": let the feature run free `freeUses` times first.
 * - "locked-feature": never auto-shows; the screen calls `presentPaywall()`
 *   itself when the user taps a locked action.
 */
export type PaywallTrigger =
  | { kind: "immediate" }
  | { kind: "after-n-uses"; freeUses: number }
  | { kind: "locked-feature" };

export function usePaywallGate(
  appId: string,
  entitlementId: string,
  trigger: PaywallTrigger,
): {
  isEntitled: boolean;
  isLoading: boolean;
  shouldShowPaywall: boolean;
  useCount: number;
  presentPaywall: () => void;
  dismissPaywall: () => void;
  recordFeatureUse: () => Promise<void>;
} {
  const { isActive: isEntitled, isLoading: isEntitlementLoading } = useEntitlement(entitlementId);
  const { value: useCount, isLoading: isCountLoading, setValue: setUseCount } = useStoredFlag(
    appId,
    "feature_use_count",
    0,
  );
  const [manuallyPresented, setManuallyPresented] = useState(false);

  const isLoading = isEntitlementLoading || isCountLoading;

  const [autoShow, setAutoShow] = useState(false);
  useEffect(() => {
    if (isLoading || isEntitled) {
      setAutoShow(false);
      return;
    }
    if (trigger.kind === "immediate") setAutoShow(true);
    else if (trigger.kind === "after-n-uses") setAutoShow(useCount >= trigger.freeUses);
    else setAutoShow(false);
  }, [isLoading, isEntitled, trigger, useCount]);

  const recordFeatureUse = useCallback(async () => {
    await setUseCount(useCount + 1);
  }, [useCount, setUseCount]);

  return {
    isEntitled,
    isLoading,
    shouldShowPaywall: !isEntitled && (autoShow || manuallyPresented),
    useCount,
    presentPaywall: () => setManuallyPresented(true),
    dismissPaywall: () => setManuallyPresented(false),
    recordFeatureUse,
  };
}
