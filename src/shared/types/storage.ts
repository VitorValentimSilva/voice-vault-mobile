import { LanguagePreference } from '@/shared/types/language';
import { ThemePreference } from '@/shared/types/theme';

export type PersistedPreferencesEnvelope = {
  state?: {
    languagePreference?: LanguagePreference;
    themePreference?: ThemePreference;
  };
};

export type AppPreferencesState = {
  languagePreference: LanguagePreference;
  themePreference: ThemePreference;
  setLanguagePreference: (languagePreference: LanguagePreference) => void;
  setThemePreference: (themePreference: ThemePreference) => void;
  resetLanguagePreference: () => void;
  resetThemePreference: () => void;
};
