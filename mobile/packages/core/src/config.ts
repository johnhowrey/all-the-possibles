/**
 * Central place that reads third-party keys from the environment.
 * Expo only exposes env vars prefixed EXPO_PUBLIC_ to the JS bundle, so
 * that's the prefix every key below uses. Any key that's missing is left
 * undefined — callers degrade to a no-op rather than throwing, so a
 * developer (or app) can run fully before every account exists.
 */
export interface AtpConfig {
  revenueCatApiKeyIos?: string;
  revenueCatApiKeyAndroid?: string;
  postHogApiKey?: string;
  postHogHost?: string;
  sentryDsn?: string;
}

export const atpConfig: AtpConfig = {
  revenueCatApiKeyIos: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_IOS,
  revenueCatApiKeyAndroid: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_ANDROID,
  postHogApiKey: process.env.EXPO_PUBLIC_POSTHOG_API_KEY,
  postHogHost: process.env.EXPO_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
  sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
};

export function warnMissingKeyOnce(name: string): void {
  const seen = warnMissingKeyOnce as unknown as { _seen?: Set<string> };
  seen._seen ??= new Set<string>();
  if (seen._seen.has(name)) return;
  seen._seen.add(name);
  // eslint-disable-next-line no-console
  console.warn(
    `[@atp/core] ${name} is not set — running with that service disabled. ` +
      `Add it to .env to enable it.`,
  );
}
