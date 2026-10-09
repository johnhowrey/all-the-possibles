import { atpConfig, warnMissingKeyOnce } from "../config";

/**
 * Thin wrapper over Sentry. No-ops to console.error when no DSN is
 * configured, so error reporting degrades gracefully before the account
 * exists instead of crashing the app that's supposed to report the crash.
 */

let initialized = false;

export function initErrorReporting(appId: string): void {
  if (initialized) return;
  initialized = true;

  if (!atpConfig.sentryDsn) {
    warnMissingKeyOnce("EXPO_PUBLIC_SENTRY_DSN");
    return;
  }

  // Lazy require: keeps @sentry/react-native out of the bundle entirely
  // for apps that haven't set a DSN yet.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Sentry = require("@sentry/react-native");
  Sentry.init({
    dsn: atpConfig.sentryDsn,
    tags: { app_id: appId },
  });
}

export function captureException(error: unknown, context?: Record<string, unknown>): void {
  if (!atpConfig.sentryDsn) {
    // eslint-disable-next-line no-console
    console.error("[@atp/core] captureException:", error, context);
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Sentry = require("@sentry/react-native");
  Sentry.captureException(error, { extra: context });
}
