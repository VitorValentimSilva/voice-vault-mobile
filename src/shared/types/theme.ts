import { gradientTokens, tokens } from "../constants/theme";

export type Theme = "light" | "dark" | "system";

export type ThemeColors = {
  [K in keyof typeof tokens]: string;
} & {
  [K in keyof typeof gradientTokens]: readonly [string, string];
} & { isDark: boolean };
