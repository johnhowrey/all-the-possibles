interface LegalDoc {
  summary: string;
  sections: { title: string; content: string }[];
  effectiveDate: string;
  contact: string;
}

export interface AppInfo {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  icon: string;
  accentColor: string;
  screenshots: string[];
  appStoreUrl?: string;
  features: string[];
  privacy: LegalDoc;
  /** Optional — not every early app has these drafted yet. */
  terms?: LegalDoc;
  refundPolicy?: LegalDoc;
}

export const apps: AppInfo[] = [
  {
    id: "too-much",
    name: "Too Much",
    subtitle: "Unhinged Compliments",
    tagline: "Compliments so good they should come with a warning label.",
    description:
      "Too Much generates wildly over-the-top, absurdly flattering compliments powered by AI. Adjust the unhinged level from respectably bold to completely unhinged. Copy, share, and spread the chaos.",
    icon: "/unhinged-icon@2x.png",
    accentColor: "#FF5CB2",
    screenshots: ["/screenshots/unhinged-loading.png"],
    features: [
      "AI-generated compliments that escalate from charming to chaotic",
      "Adjustable unhinged level slider",
      "Copy and share your favorites",
      "Dark, confetti-filled aesthetic",
      "One-time purchase — no subscriptions, no ads",
    ],
    privacy: {
      summary:
        "Too Much is a simple app. It generates compliments. No accounts, no tracking, no data selling. Ever.",
      sections: [
        {
          title: "What We Collect",
          content:
            "When you use Too Much, the text you enter — a name, a description, whatever you type in — is sent to an AI service to generate your compliment. That input is processed to produce your result and is not stored by us after the fact. We do not collect your name, email address, or any account information. There are no accounts. You bought the app. You use the app. That's the whole relationship.",
        },
        {
          title: "What We Don't Collect",
          content:
            "We do not collect location data. We do not track your behavior across other apps or websites. We do not sell your data to anyone, for any reason, ever. We are not in the data business. We are in the compliment business.",
        },
        {
          title: "Your Purchase",
          content:
            "Too Much is a one-time purchase handled entirely by Apple through the App Store. We never see your payment information. Apple's privacy policy governs that transaction.",
        },
        {
          title: "Third-Party AI Service",
          content:
            "The compliment generation is powered by an AI language model. When you submit a prompt, it travels to that service and comes back as a compliment. We do not control that service's data practices, though we have chosen services that do not retain user inputs for training purposes. We'll update this policy if that changes.",
        },
        {
          title: "Children",
          content:
            "Too Much is not directed at children under 13 and we do not knowingly collect any information from them.",
        },
        {
          title: "Changes to This Policy",
          content:
            "If we ever change how we handle your information in a meaningful way, we'll update this page and the effective date above. We're not going to bury it.",
        },
      ],
      effectiveDate: "March 18, 2026",
      contact: "allthepossible.com",
    },
  },
  {
    id: "dutch",
    name: "Dutch",
    subtitle: "Split the Bill",
    tagline: "Type the total, pick a tip, say how many people. That's the whole app.",
    description:
      "Dutch splits a restaurant bill fast — the total, the tip, and exactly what each person owes, down to the penny. No accounts, no ads, no subscription. Your first three splits are free; one small payment unlocks the rest for good.",
    icon: "/dutch-icon@2x.png",
    accentColor: "#C1272D",
    screenshots: ["/screenshots/dutch-split-fair.png"],
    features: [
      "Instant bill splitting — no mental math at the table",
      "15/20/25% tip presets, or your own once unlocked",
      "Splits between 2 and 20 people",
      "Works completely offline — it's just math",
      "One-time purchase — no subscription, ever",
    ],
    privacy: {
      summary:
        "Dutch splits a bill. No accounts, no names, no emails. Your bill amounts never leave your device.",
      sections: [
        {
          title: "What We Collect",
          content:
            "Dutch doesn't ask for an account, so there's no name, email, or personal identity tied to your use of the app. The bill totals, tip percentages, and per-person amounts you work out stay on your device — they are never transmitted anywhere. We do collect anonymous usage events (for example, that a split happened, not what the numbers were) and anonymous crash reports, both tied only to a random per-device install ID, never to you.",
        },
        {
          title: "Purchases",
          content:
            "The one-time unlock is handled by Apple or Google through their respective stores, and recorded by RevenueCat against an anonymous device identifier so it can restore correctly if you reinstall. We never see your payment details.",
        },
        {
          title: "What We Don't Collect",
          content:
            "We do not collect your location, contacts, browsing history, or any bill amount or tip choice as identifiable content. We do not sell data to anyone, for any reason.",
        },
        {
          title: "Your Choices",
          content:
            "Settings → Clear local data resets everything Dutch has stored on your device immediately. Because there's no account, there's nothing on a server to delete — email support@allthepossible.com if you'd like your anonymous analytics or crash history cleared too.",
        },
        {
          title: "Children",
          content: "Dutch is not directed at children under 13 and we do not knowingly collect information from them.",
        },
        {
          title: "California and EU Residents",
          content:
            "Because no personal identity is collected, there's no personal information to sell, share, or request under CCPA, and no personal data subject to a GDPR access/erasure request beyond the anonymous device-level data already covered above, which you can clear yourself in Settings.",
        },
        {
          title: "Changes to This Policy",
          content: "If this changes in any meaningful way, we'll update this page and the effective date above.",
        },
      ],
      effectiveDate: "Not yet in effect",
      contact: "support@allthepossible.com",
    },
    terms: {
      summary: "Plain-language terms for using Dutch. This is a draft pending a lawyer's review.",
      sections: [
        {
          title: "The Short Version",
          content:
            "Dutch is a calculator. Use it to split bills. The free tier gives you three splits; after that, a one-time purchase unlocks unlimited use on your device(s) under the same store account.",
        },
        {
          title: "License",
          content:
            "We grant you a personal, non-transferable license to use Dutch on devices you own or control, under the App Store's or Google Play's standard usage terms. You may not redistribute, decompile, or resell the app.",
        },
        {
          title: "No Warranty",
          content:
            "Dutch does its best to do the math right, but it's provided \"as is,\" without warranty of any kind. Always sanity-check a bill split before you pay — we're not liable for a miscounted tip.",
        },
        {
          title: "Purchases",
          content:
            "The unlock is a one-time, non-subscription purchase processed by Apple or Google. See the Refund Policy for how to request a refund.",
        },
        {
          title: "Changes",
          content: "We may update these terms as the app changes. Continued use after an update means you accept the new terms.",
        },
      ],
      effectiveDate: "Not yet in effect",
      contact: "support@allthepossible.com",
    },
    refundPolicy: {
      summary: "Refunds for Dutch's one-time unlock go through the store you bought it from, not us directly.",
      sections: [
        {
          title: "App Store Purchases",
          content:
            "Apple handles all billing. Request a refund at reportaproblem.apple.com or via Settings → [your name] → Media & Purchases on your device. We cannot issue App Store refunds directly, but we're glad to help if something's wrong — email support@allthepossible.com.",
        },
        {
          title: "Google Play Purchases",
          content:
            "Google handles all billing. Request a refund through the Google Play Store app (Order History) within Google's refund window, or at support.google.com/googleplay.",
        },
        {
          title: "If Something's Broken",
          content:
            "If Dutch isn't working as described, tell us first at support@allthepossible.com — we'd rather fix it or point you to a store refund than have you stuck with something that doesn't work.",
        },
      ],
      effectiveDate: "Not yet in effect",
      contact: "support@allthepossible.com",
    },
  },
];
