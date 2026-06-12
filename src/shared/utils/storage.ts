import { storage } from '@/libs/storage';
import { DEFAULT_LANGUAGE_PREFERENCE } from '@/shared/constants/language';
import { APP_PREFERENCES_STORAGE_KEY } from '@/shared/constants/storage';
import { DEFAULT_THEME_PREFERENCE } from '@/shared/constants/theme';
import { LanguagePreference } from '@/shared/types/language';
import { PersistedPreferencesEnvelope } from '@/shared/types/storage';
import { ThemePreference } from '@/shared/types/theme';

export function getPersistedPreferences(): {
  languagePreference: LanguagePreference;
  themePreference: ThemePreference;
} {
  const raw = storage.getString(APP_PREFERENCES_STORAGE_KEY);

  if (!raw) {
    return {
      languagePreference: DEFAULT_LANGUAGE_PREFERENCE,
      themePreference: DEFAULT_THEME_PREFERENCE,
    };
  }

  try {
    const parsed = JSON.parse(raw) as PersistedPreferencesEnvelope;

    return {
      languagePreference: parsed.state?.languagePreference ?? DEFAULT_LANGUAGE_PREFERENCE,
      themePreference: parsed.state?.themePreference ?? DEFAULT_THEME_PREFERENCE,
    };
  } catch {
    return {
      languagePreference: DEFAULT_LANGUAGE_PREFERENCE,
      themePreference: DEFAULT_THEME_PREFERENCE,
    };
  }
}
