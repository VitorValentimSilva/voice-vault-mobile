import { Language } from "../types/language";
import { Theme } from "../types/theme";

export interface PreferencesState {
  themePreference: Theme;
  languagePreference: Language;
  setThemePreference: (theme: Theme) => void;
  setLanguagePreference: (language: Language) => void;
  resetPreferences: () => void;
  _hasHydrated: boolean;
  _setHasHydrated: (value: boolean) => void;
}
