import { THEME } from '@/shared/constants/theme';

export type ThemePreference = 'system' | 'light' | 'dark';

export type GradientKey = keyof typeof THEME.light.gradients;
