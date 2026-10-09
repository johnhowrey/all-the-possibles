# All the Possibles — mobile platform

Shared Expo/React Native codebase the studio's apps are built on. One
reusable design system and core (onboarding, paywall, settings, analytics,
error logging), so a new app is mostly "write the one feature."

## Layout

```
mobile/
  packages/
    ui/      @atp/ui   — the "Paper Ledger" design system: tokens + components
    core/    @atp/core — onboarding, paywall, settings, analytics, storage, error logging
  apps/
    _template/  bare-bones reference app wired to both packages
    dutch/      tip & bill split calculator
    chain/      habit streak tracker
    window/     fasting timer
```

Each shipped app has a `store/` folder: `listing.md` (App Store + Play
copy), `privacy-label.md` (privacy nutrition label / Data Safety form
answers), and `screenshots/` (marketing screenshots, generated from a
real render of the app, not mockups).

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

Copy an existing app closer in shape to the new idea than `_template` is
— `dutch` for a single-screen calculator-style app, `chain` for a
list-of-things app, `window` for a timer/state-machine app — rather than
starting from the bare template; you'll throw away less.

1. `cp -r mobile/apps/dutch mobile/apps/<new-app-name>` (or `chain`/`window`).
2. Rename it in `package.json` (`name`) and `app.json` (`name`, `slug`,
   `scheme`), and regenerate its icon set (see `DECISIONS.md` for the
   icon-generation approach: same ink-square-plus-notch motif, a new
   letter and accent color).
3. Change `APP_ID`, `ENTITLEMENT_ID`, and the accent color constant in
   `src/app/_layout.tsx` — `APP_ID` namespaces local storage and tags
   analytics/error events, so it must be unique per app.
4. Delete the previous app's feature-specific files (e.g. `chain`'s
   `habits.ts` and `add-habit.tsx`) and build the new one's.
5. From `mobile/`, run `npm install` again so the workspace picks up the
   new app.
6. Write its `store/listing.md`, `store/privacy-label.md`, and marketing
   screenshots; add it to `src/data/apps.ts` and extend `AppDetail.tsx`'s
   rendering only if you've changed its shape (terms/refund sections are
   already optional and handled).

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
