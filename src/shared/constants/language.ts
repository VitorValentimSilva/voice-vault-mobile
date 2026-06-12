import { LanguagePreference } from '@/shared/types/language';

export const SUPPORTED_LANGUAGES = ['en-US', 'pt-BR'] as const;

export const DEFAULT_LANGUAGE_PREFERENCE: LanguagePreference = 'system';
