import type { PostHog } from "posthog-react-native";
import { atpConfig, warnMissingKeyOnce } from "../config";

/**
 * Thin wrapper over PostHog so every app logs the same shape of event
 * without importing the SDK directly. No-ops (and logs once) when no
 * API key is configured, so the app runs fine before the account exists.
 */

let client: PostHog | null = null;
let initAttempted = false;

/** Call once at app startup, after the app's RootLayout mounts. */
export async function initAnalytics(appId: string): Promise<void> {
  if (initAttempted) return;
  initAttempted = true;

  if (!atpConfig.postHogApiKey) {
    warnMissingKeyOnce("EXPO_PUBLIC_POSTHOG_API_KEY");
    return;
  }

  const { PostHog } = await import("posthog-react-native");
  const posthog = new PostHog(atpConfig.postHogApiKey, {
    host: atpConfig.postHogHost,
  });
  posthog.register({ app_id: appId });
  client = posthog;
}

/** Core funnel events every app fires at the same points. */
export const AtpEvent = {
  AppOpen: "app_open",
  OnboardingComplete: "onboarding_complete",
  PaywallShown: "paywall_shown",
  PaywallDismissed: "paywall_dismissed",
  PurchaseStarted: "purchase_started",
  PurchaseCompleted: "purchase_completed",
  PurchaseFailed: "purchase_failed",
  PurchaseRestored: "purchase_restored",
} as const;

export function track(event: string, properties?: Record<string, unknown>): void {
  if (!client) return;
  client.capture(event, properties as Parameters<PostHog["capture"]>[1]);
}

export function trackScreen(name: string): void {
  if (!client) return;
  client.screen(name);
}
