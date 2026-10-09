import { useState } from "react";
import { Alert, Linking, View } from "react-native";
import { router } from "expo-router";
import {
  clearAppData,
  restorePurchases,
  openSupportEmail,
  openPrivacyPolicy,
  openTerms,
  track,
  AtpEvent,
} from "@atp/core";
import { ScreenContainer, Headline, Divider, ListRow, AtpText, space } from "@atp/ui";
import { APP_ID } from "./_layout";

const SUPPORT_INFO = {
  appName: "Dutch",
  supportEmail: "support@allthepossibles.com",
  privacyPolicyUrl: "https://allthepossibles.com/privacy#apps",
  termsUrl: "https://allthepossibles.com/terms#apps",
};

export default function Settings() {
  const [restoring, setRestoring] = useState(false);

  const onRestore = async () => {
    setRestoring(true);
    const info = await restorePurchases();
    setRestoring(false);
    if (info && Object.keys(info.entitlements.active).length > 0) {
      track(AtpEvent.PurchaseRestored);
      Alert.alert("Restored", "Your purchase has been restored on this device.");
    } else {
      Alert.alert("Nothing to restore", "No previous purchase was found for this device.");
    }
  };

  const onClearData = () => {
    Alert.alert(
      "Clear local data",
      "This resets your free-split count and any saved preferences on this device. It does not affect a purchase you've already made.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await clearAppData(APP_ID);
            Alert.alert("Cleared", "Local data has been reset.");
          },
        },
      ],
    );
  };

  return (
    <ScreenContainer>
      <View style={{ marginTop: space.xl, marginBottom: space.lg }}>
        <Headline style={{ fontSize: 26 }}>Settings</Headline>
      </View>

      <ListRow label={restoring ? "Restoring…" : "Restore purchase"} onPress={onRestore} />
      <Divider dashed />
      <ListRow label="Contact support" onPress={() => openSupportEmail(SUPPORT_INFO)} />
      <Divider dashed />
      <ListRow label="Privacy policy" onPress={() => openPrivacyPolicy(SUPPORT_INFO)} />
      <Divider dashed />
      <ListRow label="Terms of use" onPress={() => openTerms(SUPPORT_INFO)} />
      <Divider dashed />
      <ListRow label="Clear local data" onPress={onClearData} tone="muted" />

      <View style={{ marginTop: "auto", alignItems: "center", paddingVertical: space.lg }}>
        <AtpText variant="labelSmall" color="#6B6355">
          Dutch — part of All the Possibles
        </AtpText>
        <AtpText
          variant="labelSmall"
          color="#6B6355"
          onPress={() => Linking.openURL("https://allthepossibles.com")}
          style={{ marginTop: 2, textDecorationLine: "underline" }}
        >
          allthepossibles.com
        </AtpText>
      </View>

      <View style={{ paddingBottom: space.md }}>
        <ListRow label="Back" onPress={() => router.back()} tone="muted" chevron="←" />
      </View>
    </ScreenContainer>
  );
}
