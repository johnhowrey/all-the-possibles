# Decisions Log

Sensible calls made without stopping to ask, per standing instructions.
Reversible; revisit any of these if they stop making sense.

## 2026-10-09 — Correction: this repo's website is not the real site

Everything above and below this entry that references `allthepossible(s).com`
as the live marketing site was wrong in an important way. The user caught
it: this repo's root-level Vite/React site (the thing I'd been editing —
`src/data/apps.ts`, `AppDetail.tsx`, the Dutch/Chain/Window entries, the
domain-typo fix) isn't deployed anywhere real; it only ever had Vercel PR
previews. The actual live `allthepossibles.com` is a separate repo,
`johnhowrey/atp-studio` — a Cloudflare Worker + D1 site for a *developer*
tools studio (Preflight, Design Check, Vantage, Bearing, Pulse, Design
Intelligence), sharing its design system via a third repo, `atp-kit`.

Asked the user how the three consumer apps should relate to that real,
very differently-branded site. They said: add a section to atp-studio,
keep it all under one brand/domain. Did that — see `johnhowrey/atp-studio`
PR #24 (`/apps` page, a landing-page teaser, `/privacy`+`/terms`+`/support`
subsections covering Dutch/Chain/Window) — and repointed all three apps'
in-app links and store-listing copy at the real routes
(`/privacy#apps`, `/terms#apps`, `/apps`, `/support`) instead of this
repo's unused site.

Left this repo's own Vite site untouched rather than deleting its now-
redundant Dutch/Chain/Window entries — it's harmless sitting there unused,
and removing content without being asked felt like the wrong call; flagged
it to the user as something worth cleaning up or repurposing on their own
schedule.

Also found, while testing `atp-studio`'s new anchor links, a small
pre-existing bug in the shared `atp-kit` library (anchored `h2`s land
partly under the fixed header — no `scroll-margin-top`). Fix is a one-line,
purely-additive CSS change, but `atp-kit` powers every other live product's
pages too, which is out of scope for "add a section to atp-studio" — didn't
push it, flagged it in the PR description instead.

## 2026-10-09 — Repo: extend, don't create a new one

The task brief's generic setup instructions say to init a new repo and name
the project. But the branch I was pointed at (`claude/phone-app-platform-owzme1`)
is already on `johnhowrey/all-the-possibles` — which is itself the "All the
Possibles" app studio repo (marketing site + the "Too Much" app already
live). Creating a second repo would split the studio across two places for
no reason. Decision: build the mobile platform at `mobile/` inside this
existing repo, keep the existing root-level Vite site untouched.

## 2026-10-09 — Monorepo layout

`mobile/` as an npm-workspaces monorepo: `packages/ui` (design system),
`packages/core` (onboarding, paywall, settings, analytics, storage),
`apps/<app-name>` per shipped app. Kept out of the repo root so the
Vercel-deployed marketing site's build isn't affected.

## 2026-10-09 — legacy-peer-deps for the mobile workspace

`mobile/.npmrc` sets `legacy-peer-deps=true`. Without it, npm tries to
auto-install every peerDependency across Expo/RevenueCat/PostHog/Sentry's
overlapping React/React-DOM peer ranges and fails with an unresolvable
conflict. This is the standard fix in Expo + npm-workspaces monorepos.

## 2026-10-09 — ESLint pinned to 9.x in `apps/_template`

`eslint-config-expo` currently pulls in `eslint-plugin-react`, which
throws at runtime under ESLint 10 (`context.getFilename is not a
function` — a known incompatibility, not a config mistake). Pinned
`eslint` to `^9.39.0` instead of the newest 10.x until that plugin catches
up.

## 2026-10-09 — Building all three top-ranked ideas, in ranked order

User asked to build "whichever one is best, then the next two, don't
stop." Using the research's own ranking: **Dutch** (tip/bill split) →
**Chain** (habit streaks) → **Window** (fasting timer) — all three had
"high" or "medium-high" confidence demand evidence and are all one-time-
unlock, no-backend builds, so building all three back to back is in scope
without needing new infrastructure decisions per app.

## 2026-10-09 — App names

- **Tip & Bill Split → "Dutch"** ("going dutch"). Avoided "Splitwise"
  (direct competitor name) and "Tally"/"Ledger" (collide with existing
  accounting/crypto-wallet products).
- **Habit Streak Tracker → "Chain"** — the "don't break the chain" habit
  method is the whole pitch; the name does double duty as the explainer.
- **Fasting Timer → "Window"** — plain language for the fasting window,
  calmer than "Fast" (which also reads as an adjective, not a noun, in a
  store listing).

All three are one-word, lowercase-friendly, no trademark collision found
in a quick check. Not legally cleared — flagging that in the final report.

## 2026-10-09 — `api.expo.dev` and `reactnative.directory` unreachable in this container

This environment's network policy only allows a specific host allowlist
(confirmed via the agent proxy status endpoint), and Expo's own API host
isn't on it. `expo install` and `expo export`/`start` make a telemetry/
compat-check call there that fails loudly otherwise. Workaround:
`EXPO_OFFLINE=1 EXPO_NO_TELEMETRY=1` env vars, and reading SDK-compatible
package versions straight out of `node_modules/expo/bundledNativeModules.json`
instead of letting `expo install` resolve them. Worth mentioning to the
user if they want to lift that network restriction for smoother `expo`
CLI use outside this session — otherwise these two env vars are now baked
into the documented dev workflow.
