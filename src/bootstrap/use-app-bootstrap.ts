import { useAuth } from '@clerk/expo';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';

import { applyLanguagePreference } from '@/libs/i18n';
import { useAppPreferencesStore } from '@/storages/use-app-preferences-store';

export function useAppBootstrap() {
  const { setColorScheme } = useColorScheme();
  const { isLoaded: isAuthLoaded } = useAuth();

  const [preferencesReady, setPreferencesReady] = useState(false);

  const languagePreference = useAppPreferencesStore((state) => state.languagePreference);
  const themePreference = useAppPreferencesStore((state) => state.themePreference);

  useEffect(() => {
    async function bootstrap() {
      try {
        await applyLanguagePreference(languagePreference);

        setColorScheme(themePreference);
      } finally {
        setPreferencesReady(true);
      }
    }

    void bootstrap();
  }, [languagePreference, themePreference, setColorScheme]);

  return preferencesReady && isAuthLoaded;
}
