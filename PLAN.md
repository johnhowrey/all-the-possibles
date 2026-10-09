# All the Possibles — Mobile App Platform

Status: DRAFT — awaiting approval before work begins.

## 1. Context

This repo already hosts the "All the Possibles" studio: a marketing site (root
of this repo, Vite + React, deployed on Vercel) and one shipped app, **Too
Much** (unhinged AI compliments, one-time unlock). The studio's whole premise
is a catalog of small, single-purpose apps. This plan covers building a
reusable mobile codebase so each new app ships faster, and picking the next
app to build.

## 2. Target user and problem

Two audiences, really:

- **The studio (us):** right now every new app idea means rebuilding
  onboarding, paywall, settings, and analytics from scratch. That's the
  problem this plan solves — a shared platform so a new app is mostly "write
  the one feature" plus a thin shell.
- **The end user of each app:** someone who wants one everyday annoyance
  solved immediately, without creating an account, without a bloated app,
  and without being tricked into a subscription they didn't mean to start.
  That's the design bar for every app in the catalog, following the tone
  already set by Too Much (no accounts, plain privacy policy, no ads).

## 3. Core user flows (shared across every app)

- First launch → 2–3 screen onboarding → optional paywall screen → core
  feature screen.
- Core feature screen → the one thing the app does, front and center.
- Settings → restore purchase, manage subscription (deep link to
  App Store/Play subscription management), contact/support, privacy policy,
  terms, delete-my-data (for any app that stores anything), app version.
- Paywall → shown at a configurable trigger point (first use, Nth use, or a
  locked feature), one-time unlock or subscription, restore purchases,
  "maybe later" exit that doesn't block the free tier if one exists.
- Error/empty/loading states for anything that calls a network service.

## 4. What's in the first launchable version, what waits

**In v1 (the platform itself):**
- Monorepo with a shared package for design tokens/components, and a shared
  package for onboarding + paywall + settings + analytics wiring.
- One real app built on top of it (the app you choose from the ten ideas
  below) through to store-submission-ready.
- RevenueCat wired for one-time purchase and subscription products.
- Basic privacy-friendly analytics (PostHog) with funnel events: app open,
  onboarding complete, paywall shown, purchase complete.
- Error logging (Sentry).
- Store listing copy, screenshot designs, privacy label answers, and a
  submission checklist for that first app.

**Waits for later apps / later phases:**
- A CLI/script to scaffold a brand-new app from the template in one command
  (nice-to-have once we've built two apps and know what actually varies).
- Cloud sync / backend for any app whose idea needs one — most "do one
  everyday thing" apps don't.
- Localization beyond English.
- Android-specific polish pass (we'll build for both from day one, but the
  App Store submission is the priority since Too Much is already iOS).

## 5. Stack and hosting, with reasons

- **Expo + React Native + TypeScript, Expo Router.** Matches what you asked
  for; Expo's managed workflow plus EAS Build/Submit means no local Xcode
  fiddling for every app, and OTA updates for copy/bug fixes without a full
  store review when the change allows it.
- **Monorepo** at `mobile/` (npm workspaces): `mobile/packages/ui` (design
  system), `mobile/packages/core` (onboarding, paywall, settings screens,
  analytics wrapper, storage helpers), `mobile/apps/<app-name>` per app. Kept
  separate from the repo root so the existing Vite marketing site and its
  Vercel deploy are untouched.
- **RevenueCat** for purchases — handles both one-time non-consumables and
  subscriptions across iOS/Android from one SDK and dashboard, and the
  "Too Much" precedent (one-time unlock) carries over directly.
- **PostHog** (self-serve, has a generous free tier and a privacy-friendly
  posture — IP anonymization, EU hosting option) for analytics, instead of
  Firebase/Amplitude, to keep with the "privacy-friendly analytics" ask.
- **Sentry** for crash/error logging — the standard choice for RN, has a
  free tier.
- **EAS Build + EAS Submit** for CI builds and store submission.

## 6. Data model

Deliberately thin, matching the "no accounts" pattern from Too Much:
- No backend database by default. Each app stores its own local state
  (onboarding-seen flag, settings, unlock state) via `AsyncStorage` /
  `expo-secure-store` as appropriate.
- Purchase/entitlement state lives in RevenueCat, keyed by each store's
  anonymous device ID (no email/account required).
- Analytics events carry an anonymous installation ID, never PII.
- If a future app idea genuinely needs sync across devices, that app adds
  its own minimal backend (e.g. Supabase) — not part of the shared platform.

## 7. Third-party services needed

| Service | Purpose | Account owner |
|---|---|---|
| RevenueCat | purchases/subscriptions | you (I'll wire the SDK) |
| Apple Developer Program | iOS distribution | you |
| Google Play Console | Android distribution | you |
| Expo/EAS account | builds + submission | you (I can create the project under it) |
| PostHog | analytics | you (free tier signup) |
| Sentry | error logging | you (free tier signup) |

I don't see a `keys.txt` in this folder yet, so none of the above have keys
loaded. Tell me which of these you've already got accounts for, and I'll use
the keys as soon as they're in `keys.txt`. I'll keep building the parts that
don't need them (code, design system, copy, research) in the meantime.

## 8. Pricing and payments

- Default pattern per app: a free core experience with either (a) a single
  one-time "unlock everything" IAP, or (b) a light weekly/annual subscription
  for apps with ongoing server costs (e.g. anything calling an AI API
  per-use, like Too Much does). Which one depends on the chosen app's cost
  structure — I'll propose the fit when we pick the app.
- RevenueCat handles receipt validation, renewal, and restore-purchase for
  both models, through both stores, from one integration.

## 9. Risks

- **App Store review rejection** — AI-generated-content apps draw extra
  scrutiny (content moderation, disclosure that output is AI-generated).
  Mitigation: follow the same disclosure pattern Too Much already uses,
  keep privacy labels accurate, avoid anything that reads as a copy of an
  existing well-known app.
- **Subscription guideline compliance** — Apple requires clear price,
  billing period, and an easy cancellation path before purchase. Mitigation:
  build the paywall copy to those requirements from the start rather than
  retrofitting.
- **Idea cannibalization / saturation** — ten ideas pulled from the same
  "everyday annoyance" well may overlap each other or Too Much's audience.
  Mitigation: diversify categories in the proposal (utility, habit, text/AI,
  calculator-style, converter-style).
- **Market evidence is directional, not certain** — App Store search-term
  popularity and competitor review complaints are a signal, not a
  guarantee of willingness to pay. I'll flag confidence level per idea.
- **Platform fragmentation risk** — building a shared package too early,
  before a second app exists to prove what's actually shared, can bake in
  wrong assumptions. Mitigation: keep the shared package small and
  feature-driven by what the first two apps actually need, not speculative.

## 10. Phased task list

### Phase 0 — Plan & setup
- [ ] Get your OK on this plan
- [ ] Confirm `keys.txt` contents (or proceed without, per §7)
- [ ] Set up `.env` handling + `.gitignore` entries for `mobile/`

### Phase 1 — Platform scaffold
- [ ] `mobile/` npm-workspaces monorepo: `packages/ui`, `packages/core`, `apps/`
- [ ] Design tokens (color, type, spacing) — visual direction proposed to you
  first, per your designer note, before any screens are built
- [ ] Shared onboarding flow component
- [ ] Shared settings screen (restore purchase, manage subscription link,
  support link, privacy/terms links, delete-my-data where relevant)
- [ ] RevenueCat integration wrapper + paywall screen component
- [ ] Analytics wrapper (PostHog) with the core funnel events
- [ ] Error logging (Sentry) wired at the app shell level
- [ ] Accessibility pass on shared components (WCAG 2.2 AA: contrast, touch
  targets, labels, dynamic type)

### Phase 2 — App idea research
- [ ] Research ten app ideas using App Store search-term signals and
  competitor review complaints as evidence
- [ ] Present the ten with evidence and a recommendation; wait for your pick

### Phase 3 — First app build (once you've picked)
- [ ] Scaffold the app inside `mobile/apps/<name>` on the shared platform
- [ ] Build the one core feature, with every state covered (loading, empty,
  error, success)
- [ ] Wire its specific paywall product (one-time vs subscription) in
  RevenueCat
- [ ] Store listing copy (App Store + Play), screenshot designs, privacy
  label answers
- [ ] Privacy policy, terms, refund policy drafts (marked for lawyer review)
  for the new app, following the Too Much pattern already in `src/data/apps.ts`
- [ ] Add the new app to the studio landing page
- [ ] README/RUNBOOK/CHANGELOG updates for the mobile monorepo

### Phase 4 — Go-to-market (for the first app)
- [ ] Landing page section/page for the new app (who it's for, pricing, FAQ,
  support contact) — can live on the existing site at root
- [ ] SEO basics for that page (title, meta description, sitemap entry, OG
  image, structured data)
- [ ] Launch checklist + three ad angle drafts (Meta Pixel setup waits for
  your explicit approval, per your standing instructions)

## 11. What only you can do (flagging early)

- Create/own the Apple Developer, Google Play Console, RevenueCat, PostHog,
  Sentry, and Expo/EAS accounts (I can do the in-app configuration once
  credentials exist).
- Approve the visual direction before I build real screens.
- Pick the first app from the ten proposals.
- Any actual store submission click (I'll prepare everything; the account
  owner has to submit).
- Approve Meta Pixel setup before it goes live.
