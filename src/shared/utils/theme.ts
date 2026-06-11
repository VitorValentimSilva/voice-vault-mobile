import { gradientTokens, tokens } from "../constants/theme";
import { ThemeColors } from "../types/theme";

export function buildTheme(index: 0 | 1, isDark: boolean): ThemeColors {
  const flat = Object.fromEntries(
    Object.entries(tokens).map(([k, v]) => [k, v[index]]),
  );

  const gradients = Object.fromEntries(
    Object.entries(gradientTokens).map(([k, v]) => [k, v[index]]),
  );

  return { ...flat, ...gradients, isDark } as ThemeColors;
}
