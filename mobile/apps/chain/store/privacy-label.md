# Chain — privacy label answers

Same shared-platform basis as Dutch's (see `../dutch/store/privacy-label.md`
for the fuller explanation) — PostHog analytics, Sentry crash reporting,
RevenueCat purchases, all tied to an anonymous per-device ID, none of it
tied to a real identity. One addition specific to Chain: habit names and
completion dates are user-generated content, and they never leave the
device at all — not even anonymized.

## Apple App Store — Privacy Nutrition Label

**Data Used to Track You:** None.

**Data Linked to Your Identity:** None. No account, no name, no email.

**Data Not Linked to You:**
- **Purchases** — via RevenueCat, anonymous device ID, to grant/restore the unlock.
- **Usage Data** — via PostHog (e.g. "habit added", "paywall shown"), anonymized, no habit names or content included.
- **Diagnostics** — via Sentry, crash/performance data only.

**Not collected:** Your habit names, your completion history, contact
info, health data (Chain tracks arbitrary habits, not medical
information, and makes no health claims), location, contacts, or any
other identifier.

## Google Play — Data Safety form

| Data type | Collected | Shared | Purpose |
|---|---|---|---|
| Purchase history | Yes | With RevenueCat | App functionality |
| App interactions | Yes | With PostHog | Analytics |
| Crash logs | Yes | With Sentry | Analytics / app functionality |

**User-generated content (habit names, streak history):** Collected, but
stored only on-device. Never transmitted to us or any third party.

**Data deletion:** Settings → "Clear all habits & data" deletes
everything immediately, on-device, no server round-trip needed since
there's no server copy of it.
