import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ThemeMode } from '@/constants/theme';
import type { CEFRLevel, LangCode } from '@/types/domain';

/** User's theme choice — 'system' follows the OS, otherwise forced. */
export type ThemePreference = 'system' | ThemeMode;

interface SettingsState {
  hasOnboarded: boolean;
  nativeLang: LangCode;
  targetLang: LangCode;
  level: CEFRLevel;
  /** New words to introduce per day. */
  dailyGoal: number;
  themeMode: ThemePreference;
  /** True once the persisted state has been read from storage. */
  _hydrated: boolean;

  setThemeMode: (mode: ThemePreference) => void;
  cycleTheme: () => void;
  completeOnboarding: (choice: { targetLang: LangCode; level: CEFRLevel }) => void;
  setTargetLang: (lang: LangCode) => void;
  setLevel: (level: CEFRLevel) => void;
  setDailyGoal: (goal: number) => void;
  resetAll: () => void;
}

const defaults = {
  hasOnboarded: false,
  nativeLang: 'ru' as LangCode,
  targetLang: 'en' as LangCode,
  level: 'A1' as CEFRLevel,
  dailyGoal: 15,
  themeMode: 'system' as ThemePreference,
};

export const useSettings = create<SettingsState>()(
  persist(
    (set, get) => ({
      ...defaults,
      _hydrated: false,

      setThemeMode: (themeMode) => set({ themeMode }),
      cycleTheme: () => {
        const order: ThemePreference[] = ['system', 'light', 'dark'];
        const next = order[(order.indexOf(get().themeMode) + 1) % order.length] ?? 'system';
        set({ themeMode: next });
      },
      completeOnboarding: ({ targetLang, level }) => set({ hasOnboarded: true, targetLang, level }),
      setTargetLang: (targetLang) => set({ targetLang }),
      setLevel: (level) => set({ level }),
      setDailyGoal: (dailyGoal) => set({ dailyGoal }),
      resetAll: () => set({ ...defaults }),
    }),
    {
      name: 'wordbloom-settings',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        hasOnboarded: s.hasOnboarded,
        nativeLang: s.nativeLang,
        targetLang: s.targetLang,
        level: s.level,
        dailyGoal: s.dailyGoal,
        themeMode: s.themeMode,
      }),
      onRehydrateStorage: () => () => {
        useSettings.setState({ _hydrated: true });
      },
    },
  ),
);

export const useHydrated = () => useSettings((s) => s._hydrated);
