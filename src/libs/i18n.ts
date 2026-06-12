import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { resources } from '@/locales';
import { LanguagePreference } from '@/shared/types/language';
import { resolveEffectiveLanguage } from '@/shared/utils/language';
import { getPersistedPreferences } from '@/shared/utils/storage';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: (typeof resources)['en-US'];
  }
}

const initialPreferences = getPersistedPreferences();
const initialLanguage = resolveEffectiveLanguage(initialPreferences.languagePreference);

void i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: initialLanguage,
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
  debug: __DEV__,
});

export async function applyLanguagePreference(preference: LanguagePreference): Promise<void> {
  const nextLanguage = resolveEffectiveLanguage(preference);

  if (i18n.language !== nextLanguage) {
    await i18n.changeLanguage(nextLanguage);
  }
}

export default i18n;
