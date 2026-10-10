# Dutch — privacy label answers

Reflects the shared platform's default integrations (PostHog analytics,
Sentry crash reporting, RevenueCat purchases) once their API keys are
turned on. If this app ships before those keys are added, the honest
answer is simpler ("Data Not Collected") — update this file to match
whichever is true at submission time.

## Apple App Store — Privacy Nutrition Label (App Privacy questionnaire)

**Data Used to Track You:** None. Dutch does not use data to track users
across other companies' apps or websites, and does not use IDFA.

**Data Linked to Your Identity:** None. There is no account, no name, no
email, no persistent identity — every identifier is an anonymous,
per-device installation ID.

**Data Not Linked to You:**
- **Purchases** (purchase history) — via RevenueCat, to grant and restore
  the one-time unlock. Tied to an anonymous device ID, not a person.
- **Usage Data** (product interaction — e.g. "split completed",
  "paywall shown") — via PostHog, anonymized, used only to see which
  parts of the app get used so we know what to improve. Not sold, not
  used for advertising.
- **Diagnostics** (crash data, performance data) — via Sentry, to catch
  and fix bugs. No user-generated content (bill amounts, tip choices) is
  included in crash reports.

**Not collected:** Contact info, health/fitness data, financial info
beyond the purchase record above, location, contacts, browsing history,
search history, identifiers beyond the anonymous install ID, or any
user-generated content — bill totals and tip choices never leave the
device except as anonymous, aggregate usage events with no values
attached.

## Google Play — Data Safety form

**Does your app collect or share any of the required user data types?**
Yes.

| Data type | Collected | Shared | Purpose |
|---|---|---|---|
| Purchase history | Yes | With RevenueCat (payment processor) | App functionality (unlock entitlement) |
| App interactions (usage analytics) | Yes | With PostHog (analytics processor) | Analytics |
| Crash logs / diagnostics | Yes | With Sentry (error-reporting processor) | Analytics / app functionality |

**Is all of the user data collected encrypted in transit?** Yes.

**Do you provide a way for users to request data deletion?** Yes — the
in-app Settings screen's "Clear local data" removes on-device state
(free-use counter, preferences) immediately. There is no server-side
account to delete, since none exists. For the anonymized analytics/crash
events already sent, users can email support@allthepossibles.com to
request deletion from PostHog/Sentry.

**Data collection is required or can users opt out?** Not currently
user-togglable in-app; noted as a possible v2 addition (an analytics
opt-out toggle in Settings) if this becomes a common request.
