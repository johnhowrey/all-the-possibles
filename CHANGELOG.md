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

### Pending
- `@atp/ui` design system — tokens and components wait on the visual
  direction being approved.
- First real app (chosen from the ten proposals in `PLAN.md`'s research
  phase) not yet started.
