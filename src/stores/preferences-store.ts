import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { mmkvZustandStorage } from "@/libs/storage";

import { PreferencesState } from "../shared/interfaces/preferences";

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      themePreference: "system",
      languagePreference: "system",
      setThemePreference: (theme) => set({ themePreference: theme }),
      setLanguagePreference: (language) =>
        set({ languagePreference: language }),
      resetPreferences: () =>
        set({ themePreference: "system", languagePreference: "system" }),
      _hasHydrated: false,
      _setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: "voice-vault:preferences",
      storage: createJSONStorage(() => mmkvZustandStorage),
      partialize: (state) => ({
        themePreference: state.themePreference,
        languagePreference: state.languagePreference,
      }),
      onRehydrateStorage: () => (state) => {
        state?._setHasHydrated(true);
      },
    },
  ),
);

export const useThemePreference = () =>
  usePreferencesStore((s) => s.themePreference);

export const useLanguagePreference = () =>
  usePreferencesStore((s) => s.languagePreference);

export const usePreferencesHydrated = () =>
  usePreferencesStore((s) => s._hasHydrated);
