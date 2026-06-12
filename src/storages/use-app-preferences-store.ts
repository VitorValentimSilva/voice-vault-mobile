import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { mmkvZustandStorage } from '@/libs/storage';
import { APP_PREFERENCES_STORAGE_KEY } from '@/shared/constants/storage';
import { AppPreferencesState } from '@/shared/types/storage';
import { getPersistedPreferences } from '@/shared/utils/storage';

const initialPreferences = getPersistedPreferences();

export const useAppPreferencesStore = create<AppPreferencesState>()(
  persist(
    (set) => ({
      languagePreference: initialPreferences.languagePreference,
      themePreference: initialPreferences.themePreference,

      setLanguagePreference: (languagePreference) => set({ languagePreference }),

      setThemePreference: (themePreference) => set({ themePreference }),

      resetLanguagePreference: () => set({ languagePreference: 'system' }),

      resetThemePreference: () => set({ themePreference: 'system' }),
    }),
    {
      name: APP_PREFERENCES_STORAGE_KEY,
      storage: createJSONStorage(() => mmkvZustandStorage),
      version: 1,
      partialize: (state) => ({
        languagePreference: state.languagePreference,
        themePreference: state.themePreference,
      }),
    }
  )
);
