# All the Possibles

The "All the Possibles" app studio: small, single-purpose apps that each do
one everyday thing well.

This repo has two parts:

- **Marketing site** (this folder) — the studio's landing page, listing
  every shipped app with its own detail page, privacy policy, etc. Vite +
  React + Tailwind, deployed on Vercel.
- **`mobile/`** — the shared Expo/React Native platform the apps themselves
  are built on (design system, onboarding, paywall, settings, analytics).
  See `mobile/README.md` for that half.

## Marketing site: setup and running

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint
```

### Deploying

Deploys to Vercel on push (see `vercel.json`, which rewrites all routes to
`index.html` for the client-side router). No build step beyond `npm run
build` — Vercel runs that automatically.

### Adding a new app to the site

Each shipped app is one entry in `src/data/apps.ts` (name, tagline,
screenshots, feature list, and its privacy policy content). Add a new entry
there and it shows up on the home page and gets its own `/apps/:id` detail
page automatically via `src/pages/AppDetail.tsx`.

## Repo-wide docs

- `PLAN.md` — the mobile platform plan: target user, flows, stack, phased
  task list.
- `DECISIONS.md` — sensible calls made along the way, logged instead of
  asked about.
- `mobile/README.md` — mobile platform setup, running an app, starting a
  new app, deploying via EAS.
- `mobile/RUNBOOK.md` — what to monitor once an app is live, and what to do
  when something breaks.
