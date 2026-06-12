import { getLocales } from 'expo-localization';

import { SUPPORTED_LANGUAGES } from '@/shared/constants/language';
import { LanguagePreference, SupportedLanguage } from '@/shared/types/language';

export function resolveDeviceLanguage(): SupportedLanguage {
  const locale = getLocales()[0];

  if (!locale) {
    return 'en-US';
  }

  const fullTag = `${locale.languageCode}-${locale.regionCode}` as string;

  if ((SUPPORTED_LANGUAGES as readonly string[]).includes(fullTag)) {
    return fullTag as SupportedLanguage;
  }

  const langMap: Record<string, SupportedLanguage> = {
    pt: 'pt-BR',
    en: 'en-US',
  };

  if (locale.languageCode && langMap[locale.languageCode]) {
    return langMap[locale.languageCode]!;
  }

  return 'en-US';
}

export function resolveEffectiveLanguage(
  preference: LanguagePreference | undefined
): SupportedLanguage {
  if (!preference || preference === 'system') {
    return resolveDeviceLanguage();
  }

  return preference;
}
