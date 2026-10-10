/**
 * Font family strings match the constants exported by
 * @expo-google-fonts/fraunces and @expo-google-fonts/archivo. Every app
 * loads those weights with `useFonts` before rendering (see
 * `useAtpFonts` in @atp/core) — the loading screen that gates on it is
 * part of the required "every state" coverage, not optional polish.
 */
export const fonts = {
  displaySemibold: "Fraunces_600SemiBold",
  displayBlack: "Fraunces_900Black",
  displayItalic: "Fraunces_500Medium_Italic",
  uiRegular: "Archivo_400Regular",
  uiMedium: "Archivo_500Medium",
  uiSemibold: "Archivo_600SemiBold",
  uiBold: "Archivo_700Bold",
} as const;

export const requiredFontWeights = [
  "Fraunces_600SemiBold",
  "Fraunces_900Black",
  "Fraunces_500Medium_Italic",
  "Archivo_400Regular",
  "Archivo_500Medium",
  "Archivo_600SemiBold",
  "Archivo_700Bold",
] as const;

export const type = {
  kicker: { fontFamily: fonts.uiBold, fontSize: 11, letterSpacing: 3 },
  headline: { fontFamily: fonts.displaySemibold, fontSize: 32, lineHeight: 34 },
  subtitle: { fontFamily: fonts.displayItalic, fontSize: 15 },
  label: { fontFamily: fonts.uiMedium, fontSize: 14 },
  labelSmall: { fontFamily: fonts.uiRegular, fontSize: 13 },
  ledgerValue: { fontFamily: fonts.displaySemibold, fontSize: 16 },
  ledgerTotal: { fontFamily: fonts.displaySemibold, fontSize: 19 },
  ledgerHero: { fontFamily: fonts.displayBlack, fontSize: 27 },
  buttonLabel: { fontFamily: fonts.uiBold, fontSize: 13, letterSpacing: 1.5 },
} as const;
