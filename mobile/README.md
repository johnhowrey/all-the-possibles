# All the Possibles — mobile platform

Shared Expo/React Native codebase the studio's apps are built on. One
reusable design system and core (onboarding, paywall, settings, analytics,
error logging), so a new app is mostly "write the one feature."

## Layout

```
mobile/
  packages/
    ui/      @atp/ui   — design tokens + shared components (pending visual direction approval)
    core/    @atp/core — onboarding, paywall, settings, analytics, storage, error logging
  apps/
    _template/  reference app wired to both packages; copy this to start a new app
    <app-name>/ one folder per shipped app
```

It's an npm-workspaces monorepo, kept at `mobile/` inside the main
`all-the-possibles` repo so it doesn't disturb the root-level marketing
site's Vercel deploy.

## Setup

```bash
cd mobile
npm install
```

Then, per app you're running, copy `mobile/.env.example` to
`mobile/apps/<app-name>/.env` and fill in the keys you have. Every key is
optional at the code level — anything unset just disables that service
(RevenueCat, PostHog, Sentry) with a one-time console warning instead of
crashing, so you can develop and test the UI before those accounts exist.

## Running an app

```bash
cd mobile/apps/<app-name>
npx expo start
```

Press `i`/`a`/`w` for iOS Simulator / Android emulator / web. A library
with native code (RevenueCat, Sentry, etc.) means Expo Go alone won't run
it — use a development build: `npx expo run:ios` / `npx expo run:android`,
or `eas build --profile development` once EAS is set up.

> Running inside a sandboxed CI/cloud container whose network policy
> blocks `api.expo.dev`? Prefix Expo CLI commands with
> `EXPO_OFFLINE=1 EXPO_NO_TELEMETRY=1` — that's a container-network
> workaround, not something you need on a normal machine (see
> `DECISIONS.md`).

## Starting a new app

1. Copy `mobile/apps/_template` to `mobile/apps/<new-app-name>`.
2. Rename it in `package.json` (`name`) and `app.json` (`name`, `slug`,
   `scheme`).
3. Change `APP_ID` in `src/app/_layout.tsx` and `src/app/index.tsx` to the
   new app's id — it namespaces local storage and tags analytics/error
   events, so it needs to be unique per app.
4. From `mobile/`, run `npm install` again so the workspace picks up the
   new app.
5. Build the app's one feature; wire its RevenueCat entitlement id into
   `usePaywallGate`.

## Checks

From inside any package or app folder:

```bash
npx tsc --noEmit     # typecheck
npx expo lint        # lint (apps only; packages have no eslint config yet)
```

## Deploying / shipping

Builds and store submission go through EAS:

```bash
npx eas-cli@latest build --platform ios
npx eas-cli@latest submit --platform ios
```

(Android: swap `ios` for `android`.) This needs an Expo/EAS account and,
for submission, Apple Developer / Google Play Console credentials — see
`PLAN.md` at the repo root for the full account list.

## Why these choices

See `DECISIONS.md` at the repo root for the reasoning log, and `PLAN.md`
for the overall plan this platform is part of.
