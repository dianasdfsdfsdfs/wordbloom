import type { SrsStatus, WordProgress } from '@/types/domain';

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

/** Interval ladder: 1m → 5m → 30m → 1d → 3d → 7d → 16d → 35d. */
export const SRS_LADDER = [1 * MIN, 5 * MIN, 30 * MIN, 1 * DAY, 3 * DAY, 7 * DAY, 16 * DAY, 35 * DAY];

/** Reaching the 7-day interval (index 5) counts the word as "mastered". */
const MASTER_STAGE = 5;

/** Intervals up to 30 min are resurfaced within the same session. */
export const SESSION_INTERVAL_MS = 30 * MIN;

export type ReviewResult = 'known' | 'unknown';

export function initialProgress(wordId: string): WordProgress {
  return { wordId, status: 'new', stage: 0, dueAt: 0, seen: 0, correct: 0, wrong: 0 };
}

/** Apply a review result and return the next scheduling state. */
export function schedule(prev: WordProgress, result: ReviewResult, now = Date.now()): WordProgress {
  const seen = prev.seen + 1;

  if (result === 'known') {
    // First-ever encounter swiped "known" → the user already knows this word:
    // archive it so it never returns and never counts as newly learned.
    if (prev.status === 'new') {
      return {
        ...prev,
        status: 'known',
        stage: SRS_LADDER.length,
        dueAt: Number.MAX_SAFE_INTEGER,
        seen,
        correct: prev.correct + 1,
        lastReviewedAt: now,
      };
    }
    const stage = Math.min(prev.stage + 1, SRS_LADDER.length - 1);
    const status: SrsStatus = stage >= MASTER_STAGE ? 'mastered' : 'review';
    return {
      ...prev,
      stage,
      status,
      dueAt: now + SRS_LADDER[stage]!,
      seen,
      correct: prev.correct + 1,
      lastReviewedAt: now,
      learnedAt: status === 'mastered' && !prev.learnedAt ? now : prev.learnedAt,
    };
  }

  // "unknown" → drop back to the start of the ladder.
  return {
    ...prev,
    stage: 0,
    status: 'learning',
    dueAt: now + SRS_LADDER[0]!,
    seen,
    wrong: prev.wrong + 1,
    lastReviewedAt: now,
  };
}

/** A started word whose due time has passed (overdue cards simply accumulate). */
export function isDue(p: WordProgress, now = Date.now()): boolean {
  return p.status !== 'new' && p.dueAt <= now;
}

/** Should this card come back again within the current session? */
export function isShortInterval(p: WordProgress): boolean {
  return p.stage < 3; // stages 0–2 = 1m / 5m / 30m
}
