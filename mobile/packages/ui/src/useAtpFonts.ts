import { useFonts } from "expo-font";
import {
  Fraunces_600SemiBold,
  Fraunces_900Black,
  Fraunces_500Medium_Italic,
} from "@expo-google-fonts/fraunces";
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
  Archivo_700Bold,
} from "@expo-google-fonts/archivo";

/** Call once in the app's root layout; gates rendering until the Paper
 * Ledger direction's two typefaces are ready. Returns `false` first
 * (render a loading state), then `true`. */
export function useAtpFonts(): boolean {
  const [loaded] = useFonts({
    Fraunces_600SemiBold,
    Fraunces_900Black,
    Fraunces_500Medium_Italic,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Archivo_700Bold,
  });
  return loaded;
}
