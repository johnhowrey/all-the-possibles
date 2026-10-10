# Window — privacy label answers

Same shared-platform basis as Dutch's and Chain's (see
`../dutch/store/privacy-label.md`) — PostHog analytics, Sentry crash
reporting, RevenueCat purchases, all anonymous/device-tied. Fast start
and end times are user-generated content and never leave the device.

## Apple App Store — Privacy Nutrition Label

**Data Used to Track You:** None.

**Data Linked to Your Identity:** None. No account, no name, no email.

**Data Not Linked to You:**
- **Purchases** — via RevenueCat, anonymous device ID.
- **Usage Data** — via PostHog (e.g. "fast started", "paywall shown"), anonymized, no fast timing data included.
- **Diagnostics** — via Sentry, crash/performance data only.

**Not collected:** Your fast start/end times, health data (Window is a
timer, not a health-tracking or medical product, and makes no claims
about health outcomes or dietary guidance), location, contacts, or any
other identifier.

## Google Play — Data Safety form

| Data type | Collected | Shared | Purpose |
|---|---|---|---|
| Purchase history | Yes | With RevenueCat | App functionality |
| App interactions | Yes | With PostHog | Analytics |
| Crash logs | Yes | With Sentry | Analytics / app functionality |

**User-generated content (fast history):** Collected, stored only
on-device, never transmitted.

**Data deletion:** Settings → "Clear fast history & data" deletes
everything immediately, on-device.
