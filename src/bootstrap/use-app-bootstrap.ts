import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';

import { applyLanguagePreference } from '@/libs/i18n';
import { useAppPreferencesStore } from '@/storages/use-app-preferences-store';

export function useAppBootstrap() {
  const { setColorScheme } = useColorScheme();

  const languagePreference = useAppPreferencesStore((state) => state.languagePreference);
  const themePreference = useAppPreferencesStore((state) => state.themePreference);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      try {
        await applyLanguagePreference(languagePreference);

        setColorScheme(themePreference);
      } finally {
        setIsReady(true);
      }
    }

    void bootstrap();
  }, [languagePreference, themePreference, setColorScheme]);

  return isReady;
}
