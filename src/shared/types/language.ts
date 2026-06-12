import { SUPPORTED_LANGUAGES } from '@/shared/constants/language';

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export type LanguagePreference = SupportedLanguage | 'system';
