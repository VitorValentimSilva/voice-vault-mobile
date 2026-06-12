import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';

import { applyLanguagePreference } from '@/libs/i18n';
import { useAppPreferencesStore } from '@/storages/use-app-preferences-store';

export function useAppBootstrap() {
  const { setColorScheme } = useColorScheme();

  const languagePreference = useAppPreferencesStore((state) => state.languagePreference);
  const themePreference = useAppPreferencesStore((state) => state.themePreference);

  useEffect(() => {
    void SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    void applyLanguagePreference(languagePreference);
  }, [languagePreference]);

  useEffect(() => {
    setColorScheme(themePreference);
  }, [themePreference, setColorScheme]);
}
