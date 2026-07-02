import { isDue } from '@/lib/srs';
import type { Word, WordProgress } from '@/types/domain';

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

/**
 * A study session: due reviews first (most overdue first), then new words in
 * random order, up to the daily goal. Overdue cards always come first and
 * accumulate — nothing is skipped.
 */
export function buildSession(
  words: Word[],
  byWord: Record<string, WordProgress>,
  dailyGoal: number,
  now = Date.now(),
): Word[] {
  const due: Word[] = [];
  const fresh: Word[] = [];
  for (const w of words) {
    const p = byWord[w.id];
    if (!p || p.status === 'new') fresh.push(w);
    else if (isDue(p, now)) due.push(w);
  }
  due.sort((a, b) => (byWord[a.id]?.dueAt ?? 0) - (byWord[b.id]?.dueAt ?? 0));
  return [...due, ...shuffle(fresh).slice(0, Math.max(0, dailyGoal))];
}

/** Counts for the Study call-to-action: cards due now and new words available. */
export function sessionCounts(
  words: Word[],
  byWord: Record<string, WordProgress>,
  now = Date.now(),
): { due: number; fresh: number } {
  let due = 0;
  let fresh = 0;
  for (const w of words) {
    const p = byWord[w.id];
    if (!p || p.status === 'new') fresh++;
    else if (isDue(p, now)) due++;
  }
  return { due, fresh };
}
