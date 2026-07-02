import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { initialProgress, type ReviewResult, schedule } from '@/lib/srs';
import type { WordProgress } from '@/types/domain';

export interface ReviewEntry {
  wordId: string;
  at: number;
  result: ReviewResult;
}

interface ProgressState {
  byWord: Record<string, WordProgress>;
  /** Rolling review history (used for stats); capped to the last ~1000. */
  log: ReviewEntry[];
  _hydrated: boolean;

  review: (wordId: string, result: ReviewResult) => void;
  resetProgress: () => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      byWord: {},
      log: [],
      _hydrated: false,

      review: (wordId, result) => {
        const now = Date.now();
        const prev = get().byWord[wordId] ?? initialProgress(wordId);
        const next = schedule(prev, result, now);
        set((s) => ({
          byWord: { ...s.byWord, [wordId]: next },
          log: [...s.log.slice(-999), { wordId, at: now, result }],
        }));
      },

      resetProgress: () => set({ byWord: {}, log: [] }),
    }),
    {
      name: 'wordbloom-progress',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ byWord: s.byWord, log: s.log }),
      onRehydrateStorage: () => () => {
        useProgress.setState({ _hydrated: true });
      },
    },
  ),
);
