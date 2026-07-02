import { MOCK_WORDS } from '@/data/mock-words';
import { sessionCounts } from '@/lib/study';
import type { ReviewEntry } from '@/stores/progress';
import { CEFR_LEVELS, type CEFRLevel, type Word, type WordProgress } from '@/types/domain';

const DAY = 86_400_000;
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WORD_BY_ID = new Map(MOCK_WORDS.map((w) => [w.id, w]));

function dayStart(ts: number): number {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function totalMastered(byWord: Record<string, WordProgress>): number {
  return Object.values(byWord).filter((p) => p.status === 'mastered').length;
}

export function computeStreak(log: ReviewEntry[], now = Date.now()): number {
  if (log.length === 0) return 0;
  const days = new Set(log.map((e) => dayStart(e.at)));
  let streak = 0;
  let cursor = dayStart(now);
  if (!days.has(cursor)) cursor -= DAY; // still counts if the last study day was yesterday
  while (days.has(cursor)) {
    streak++;
    cursor -= DAY;
  }
  return streak;
}

/** Words that became "learned" (first correct recall after being studied) today. */
export function learnedTodayCount(byWord: Record<string, WordProgress>, now = Date.now()): number {
  const t0 = dayStart(now);
  let count = 0;
  for (const p of Object.values(byWord)) if (p.learnedAt && p.learnedAt >= t0) count++;
  return count;
}

function recentWords(log: ReviewEntry[], byWord: Record<string, WordProgress>, limit = 6): Word[] {
  const seen = new Set<string>();
  const out: Word[] = [];
  for (let i = log.length - 1; i >= 0 && out.length < limit; i--) {
    const e = log[i]!;
    if (e.result !== 'known' || seen.has(e.wordId)) continue;
    seen.add(e.wordId);
    if (byWord[e.wordId]?.status === 'known') continue; // skip already-known words
    const w = WORD_BY_ID.get(e.wordId);
    if (w) out.push(w);
  }
  return out;
}

export interface HomeSummary {
  streak: number;
  learnedToday: number;
  reviewsDue: number;
  newAvailable: number;
  totalLearned: number;
  recent: Word[];
}

export function homeSummary(
  collectionWords: Word[],
  byWord: Record<string, WordProgress>,
  log: ReviewEntry[],
  dailyGoal: number,
  now = Date.now(),
): HomeSummary {
  const { due, fresh } = sessionCounts(collectionWords, byWord, now);
  return {
    streak: computeStreak(log, now),
    learnedToday: learnedTodayCount(byWord, now),
    reviewsDue: due,
    newAvailable: fresh,
    totalLearned: totalMastered(byWord),
    recent: recentWords(log, byWord),
  };
}

export interface LevelStat {
  level: CEFRLevel;
  total: number;
  learned: number;
}

export function levelStats(langWords: Word[], byWord: Record<string, WordProgress>): LevelStat[] {
  return CEFR_LEVELS.map((level) => {
    const inLevel = langWords.filter((w) => w.level === level);
    const learned = inLevel.filter((w) => byWord[w.id]?.status === 'mastered').length;
    return { level, total: inLevel.length, learned };
  });
}

export interface StatsData {
  totalLearned: number;
  streak: number;
  accuracy: number;
  week: { day: string; count: number }[];
  trend: number[];
  activity: number[];
}

export function statsData(
  byWord: Record<string, WordProgress>,
  log: ReviewEntry[],
  now = Date.now(),
): StatsData {
  let correct = 0;
  let wrong = 0;
  for (const p of Object.values(byWord)) {
    correct += p.correct;
    wrong += p.wrong;
  }
  const accuracy = correct + wrong > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0;

  const t0 = dayStart(now);
  const perDay = (d0: number) => log.filter((e) => dayStart(e.at) === d0).length;

  const week: { day: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d0 = t0 - i * DAY;
    week.push({ day: DAY_NAMES[new Date(d0).getDay()]!, count: perDay(d0) });
  }

  const activity: number[] = [];
  for (let i = 34; i >= 0; i--) {
    const c = perDay(t0 - i * DAY);
    activity.push(c === 0 ? 0 : c < 4 ? 1 : c < 8 ? 2 : 3);
  }

  const trend: number[] = [];
  for (let w = 7; w >= 0; w--) {
    const start = t0 - (w * 7 + 6) * DAY;
    const end = start + 7 * DAY;
    trend.push(log.filter((x) => x.at >= start && x.at < end).length);
  }

  return { totalLearned: totalMastered(byWord), streak: computeStreak(log, now), accuracy, week, trend, activity };
}
