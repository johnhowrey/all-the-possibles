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
  privacy: {
    summary: string;
    sections: { title: string; content: string }[];
    effectiveDate: string;
    contact: string;
  };
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
];
