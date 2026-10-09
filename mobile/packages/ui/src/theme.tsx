import { createContext, useContext, type ReactNode } from "react";
import { colors } from "./tokens/colors";

export interface AtpTheme {
  colors: typeof colors;
  accent: string;
}

/** Reuses the studio's own red by default so a new app reads as a sibling
 * of the brand rather than inventing an unrelated color from scratch. */
export const defaultAccent = "#C1272D";

const ThemeContext = createContext<AtpTheme>({ colors, accent: defaultAccent });

export function AtpThemeProvider({
  accent = defaultAccent,
  children,
}: {
  accent?: string;
  children: ReactNode;
}) {
  return <ThemeContext.Provider value={{ colors, accent }}>{children}</ThemeContext.Provider>;
}

export function useAtpTheme(): AtpTheme {
  return useContext(ThemeContext);
}
