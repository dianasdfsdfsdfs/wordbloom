import { CEFR_LEVELS, type CEFRLevel, type LangCode, type Word } from '@/types/domain';
import { getWords } from './mock-words';

/** Placeholder progress data for the UI until the SRS engine lands. */
export interface HomeSummary {
  streak: number;
  learnedToday: number;
  reviewsDue: number;
  newAvailable: number;
  totalLearned: number;
  recent: Word[];
  week: { day: string; count: number }[];
}

export function getHomeSummary(lang: LangCode, level: CEFRLevel, dailyGoal: number): HomeSummary {
  const words = getWords(lang, level);
  return {
    streak: 5,
    learnedToday: Math.min(8, dailyGoal),
    reviewsDue: 12,
    newAvailable: Math.max(0, words.length - 8),
    totalLearned: 42,
    recent: words.slice(0, 6),
    week: [
      { day: 'Mon', count: 12 },
      { day: 'Tue', count: 8 },
      { day: 'Wed', count: 15 },
      { day: 'Thu', count: 6 },
      { day: 'Fri', count: 11 },
      { day: 'Sat', count: 9 },
      { day: 'Sun', count: 8 },
    ],
  };
}

export interface LevelStat {
  level: CEFRLevel;
  total: number;
  learned: number;
}

/** Approximate full-collection sizes per CEFR level (mock). */
const LEVEL_TOTALS: Record<CEFRLevel, number> = {
  A1: 220,
  A2: 350,
  B1: 600,
  B2: 800,
  C1: 1000,
  C2: 1200,
};

export function getLevelStats(lang: LangCode, active: CEFRLevel): LevelStat[] {
  const activeIdx = CEFR_LEVELS.indexOf(active);
  return CEFR_LEVELS.map((level) => {
    const total = LEVEL_TOTALS[level];
    const idx = CEFR_LEVELS.indexOf(level);
    let learned = 0;
    if (idx < activeIdx) learned = Math.round(total * 0.6);
    else if (idx === activeIdx) learned = Math.round(total * 0.15);
    return { level, total, learned };
  });
}

export interface StatsData {
  totalLearned: number;
  streak: number;
  accuracy: number;
  week: { day: string; count: number }[];
  trend: number[];
  /** Intensity 0–3 per day, oldest first (5 weeks × 7 days). */
  activity: number[];
}

export function getStats(lang: LangCode, level: CEFRLevel): StatsData {
  const home = getHomeSummary(lang, level, 15);
  return {
    totalLearned: home.totalLearned,
    streak: home.streak,
    accuracy: 86,
    week: home.week,
    trend: [4, 9, 7, 14, 12, 18, 22, 28],
    activity: [
      0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 3, 2, 0, 1, 2, 3, 1, 2,
      3, 2, 1, 0, 2, 3, 3, 3, 2, 1, 1, 2, 3, 2, 1, 2, 3,
    ],
  };
}
