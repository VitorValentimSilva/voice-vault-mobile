import { Appearance, type ColorSchemeName, useColorScheme } from "react-native";

import { useThemePreference } from "@/stores/preferences-store";

import { darkTheme, lightTheme } from "../shared/constants/theme";
import { Theme, ThemeColors } from "../shared/types/theme";

export function useTheme(): ThemeColors {
  const preference = useThemePreference();
  const systemScheme = useColorScheme();

  const isDark =
    preference === "dark" ||
    (preference === "system" && systemScheme === "dark");

  return isDark ? darkTheme : lightTheme;
}

export function applyThemeToAppearance(preference: Theme): void {
  if (preference === "system") {
    Appearance.setColorScheme("unspecified" as ColorSchemeName);
  } else {
    Appearance.setColorScheme(preference);
  }
}
