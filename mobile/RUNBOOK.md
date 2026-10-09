# Mobile platform runbook

## Current state

No app has shipped yet, so there's no production traffic, no scheduled
jobs, and no backend to back up — every app's data lives on-device
(AsyncStorage) plus whatever RevenueCat holds for entitlements. This file
will grow real incident procedures once the first app is live; for now it
records where to look and what "something broke" means at this stage.

## Where to look

| Signal | Where |
|---|---|
| Crashes / exceptions | Sentry project for the app (once `EXPO_PUBLIC_SENTRY_DSN` is set) |
| Usage / funnel drop-off | PostHog project for the app |
| Purchase failures, entitlement issues | RevenueCat dashboard → that app's project |
| Store-side crashes, review complaints | App Store Connect / Google Play Console → that app |
| API spend | Whichever AI/API service an app calls directly (e.g. the LLM provider behind an AI-feature app) — set a billing alert in that provider's dashboard when an app ships one |

## When something breaks

1. **App won't build / EAS build fails** — check the EAS build log first;
   almost always a native dependency version mismatch. Run
   `npx expo-doctor` and `npx expo install --fix` inside the app folder.
2. **Purchases not unlocking** — check RevenueCat's dashboard for the
   customer's entitlement state first (Customers → search by device/user
   id). If RevenueCat shows it active but the app doesn't, it's a client
   bug in how `useEntitlement` is wired, not a payments problem.
3. **Spike in crashes after a release** — check Sentry's release tag
   against the version just shipped; revert via EAS Update (OTA) if the
   bug is JS-only and doesn't need a native rebuild, otherwise ship a
   patched build.
4. **Analytics gap (events stop arriving)** — check `EXPO_PUBLIC_POSTHOG_API_KEY`
   is actually present in that app's build (a key missing at build time is
   silent — it just logs a console warning and no-ops, per `@atp/core`'s
   design).

## Backups

Nothing to back up yet at the platform level. If a future app idea adds its
own backend (most won't need one — see `PLAN.md` §6), that app's own
runbook entry covers its backups; this file stays about the shared
platform.

## Scheduled jobs

None yet. If one gets added (e.g. a nightly digest, a cleanup job), it
gets documented here with what it does, where it runs, and what "it
didn't run" looks like.
