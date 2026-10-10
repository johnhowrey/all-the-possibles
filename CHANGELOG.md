# Changelog

Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## Unreleased

### Added
- `PLAN.md` and `DECISIONS.md` for the mobile app platform effort.
- `mobile/` — new Expo/React Native monorepo (npm workspaces):
  - `@atp/core` — onboarding gate, paywall gate, analytics (PostHog),
    error reporting (Sentry), purchases (RevenueCat), local storage
    helpers, settings links. Every third-party integration no-ops safely
    when its API key isn't configured yet.
  - `apps/_template` — reference Expo Router app proving the platform
    wires together end to end (typechecks, lints, bundles).
  - `mobile/README.md`, `mobile/RUNBOOK.md`, `mobile/.env.example`.
- Root `README.md` rewritten to describe both halves of this repo (the
  marketing site and the mobile platform) instead of the unmodified Vite
  template text.

- `@atp/ui` — the approved "Paper Ledger" design system: design tokens
  (Fraunces/Archivo type, a flat paper palette), and components
  (`LedgerPanel`, `DotLeaderRow`, `TornEdge`, `NotchedButton`, `Stepper`,
  `TextChoiceRow`, `StepMark`, state views, font loading).
- Three studio apps, each built on the shared platform with onboarding,
  a RevenueCat paywall, settings, and every UI state covered:
  - **Dutch** (`mobile/apps/dutch`) — tip & bill split calculator.
    One-time unlock after 3 free splits.
  - **Chain** (`mobile/apps/chain`) — habit streak tracker. One-time
    unlock past 3 free habits.
  - **Window** (`mobile/apps/window`) — fasting timer. Free 16:8/18:6/20:4
    presets forever; one-time unlock for custom window lengths.
  - Each has store listing copy, privacy-label answers, marketing
    screenshots, a generated icon set, and a website catalog entry
    (description, privacy policy, terms, refund policy).
- Website: `AppInfo`/`AppDetail` extended with optional anchored
  terms/refund-policy sections so store listing URLs have somewhere real
  to point.

### Fixed
- `usePaywallGate` didn't expose the free-use counter, so UI copy like
  "N free splits left" had nothing to read from — added `useCount` to
  its return value.
- Chain's add-habit screen and its home screen each held their own
  independent copy of the habit list (two separate `useHabits()` calls,
  no shared source of truth), so a newly added habit didn't appear until
  something else forced a refetch. Added a `reload()` function and call
  it from a `useFocusEffect` on the screen that needs fresh data.

### Pending
- Go-to-market phase (PLAN.md §10 Phase 4): per-app landing page SEO,
  launch checklist, ad angles — not started, waiting on direction.
- Real RevenueCat/PostHog/Sentry/Apple/Google/EAS accounts and keys —
  every app runs and was verified without them, but needs them to
  actually sell, analyze, or ship a build.
