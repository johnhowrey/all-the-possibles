import { Linking, Platform } from "react-native";

export interface AppSupportInfo {
  appName: string;
  supportEmail: string;
  privacyPolicyUrl: string;
  termsUrl: string;
}

export function openManageSubscription(): Promise<boolean> {
  const url =
    Platform.OS === "ios"
      ? "itms-apps://apps.apple.com/account/subscriptions"
      : "https://play.google.com/store/account/subscriptions";
  return Linking.openURL(url).then(() => true).catch(() => false);
}

export function openSupportEmail(info: AppSupportInfo, subject?: string): Promise<boolean> {
  const url = `mailto:${info.supportEmail}?subject=${encodeURIComponent(
    subject ?? `${info.appName} support`,
  )}`;
  return Linking.openURL(url).then(() => true).catch(() => false);
}

export function openPrivacyPolicy(info: AppSupportInfo): Promise<boolean> {
  return Linking.openURL(info.privacyPolicyUrl).then(() => true).catch(() => false);
}

export function openTerms(info: AppSupportInfo): Promise<boolean> {
  return Linking.openURL(info.termsUrl).then(() => true).catch(() => false);
}
