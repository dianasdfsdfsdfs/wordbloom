import { Feather } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Bloom } from '@/components/bloom';
import { SwipeDeck, type SwipeDeckHandle, type SwipeDirection } from '@/components/deck/swipe-deck';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { spacing } from '@/constants/theme';
import { getWords } from '@/data/mock-words';
import { useTheme } from '@/hooks/use-theme';
import { learnedTodayCount } from '@/lib/stats';
import { buildSession } from '@/lib/study';
import { useProgress } from '@/stores/progress';
import { useSettings } from '@/stores/settings';
import type { Word } from '@/types/domain';

const LANG_TAG: Record<string, string> = { en: 'en-US', de: 'de-DE', ru: 'ru-RU' };

export default function StudyScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const targetLang = useSettings((s) => s.targetLang);
  const nativeLang = useSettings((s) => s.nativeLang);
  const level = useSettings((s) => s.level);
  const dailyGoal = useSettings((s) => s.dailyGoal);
  const review = useProgress((s) => s.review);
  const byWord = useProgress((s) => s.byWord);

  const [sessionId, setSessionId] = useState(0);
  const initial = useMemo(() => {
    const pool = getWords(targetLang, level, false);
    const words = pool.length > 0 ? pool : getWords(targetLang, 'A1', false);
    return buildSession(words, useProgress.getState().byWord, dailyGoal);
    // Rebuild only on level/lang/goal change or an explicit restart.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetLang, level, dailyGoal, sessionId]);

  const deckRef = useRef<SwipeDeckHandle>(null);
  const [queue, setQueue] = useState<Word[]>(initial);
  const [done, setDone] = useState(false);
  const [current, setCurrent] = useState<Word | null>(null);

  // New session (level/lang/goal change or "Study again"): refill the pile.
  useEffect(() => {
    setQueue(initial);
    setDone(false);
  }, [initial]);

  const speak = () => {
    if (!current) return;
    Speech.stop();
    Speech.speak(current.headword, { language: LANG_TAG[current.lang] ?? current.lang, rate: 0.95 });
  };

  const onSwipe = useCallback(
    (word: Word, dir: SwipeDirection) => {
      review(word.id, dir === 'right' ? 'known' : 'unknown');
      // A word still being learned comes back later this session until it sticks.
      if (useProgress.getState().byWord[word.id]?.status === 'learning') {
        setQueue((q) => [...q, word]);
      }
    },
    [review],
  );

  const restart = () => {
    setDone(false);
    setSessionId((s) => s + 1);
  };

  const goHome = () => router.replace('/(tabs)');
  const closeStudy = () => (router.canGoBack() ? router.back() : goHome());

  const empty = initial.length === 0;
  const learned = learnedTodayCount(byWord);
  const goalPct = dailyGoal > 0 ? Math.min(1, learned / dailyGoal) : 0;
  const deckKey = `${targetLang}-${level}-${sessionId}`;

  return (
    <Screen edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable onPress={closeStudy} hitSlop={10} accessibilityLabel="Close">
          <Feather name="x" size={26} color={colors.textPrimary} />
        </Pressable>
        <View style={[styles.track, { backgroundColor: colors.surfaceAlt }]}>
          <View style={[styles.fill, { width: `${goalPct * 100}%`, backgroundColor: colors.accent }]} />
        </View>
        <Text variant="small" color="textSecondary" style={styles.counter}>
          {learned}/{dailyGoal}
        </Text>
        {!done && !empty ? (
          <Pressable onPress={speak} hitSlop={10} disabled={!current} accessibilityLabel="Listen">
            <Feather name="volume-2" size={22} color={current ? colors.textPrimary : colors.textMuted} />
          </Pressable>
        ) : null}
      </View>

      {done || empty ? (
        <View style={styles.done}>
          <Bloom size={168} />
          <View style={styles.doneCopy}>
            <Text variant="overline" color="accent" center>
              {empty ? 'All caught up' : 'Session complete'}
            </Text>
            <Text variant="displayM" center>
              {empty ? 'Nothing to review right now' : 'Nicely done'}
            </Text>
            <Text variant="body" color="textSecondary" center>
              {empty
                ? 'You have learned or cleared every word at this level. Switch levels in Settings, or come back later as your reviews fall due.'
                : `You have learned ${learned} of ${dailyGoal} words today.`}
            </Text>
          </View>
          <View style={styles.doneActions}>
            {!empty ? <Button label="Study again" fullWidth onPress={restart} /> : null}
            <Button
              label="Back to home"
              variant={empty ? 'primary' : 'ghost'}
              fullWidth
              onPress={goHome}
            />
          </View>
        </View>
      ) : (
        <>
          <View style={styles.deckArea}>
            <SwipeDeck
              ref={deckRef}
              words={queue}
              resetKey={deckKey}
              nativeLang={nativeLang}
              onSwipe={onSwipe}
              onComplete={() => setDone(true)}
              onCardChange={setCurrent}
            />
          </View>

          <View style={styles.actions}>
            <Pressable
              accessibilityLabel="Still learning"
              onPress={() => deckRef.current?.swipe('left')}
              hitSlop={8}
              style={[styles.action, { borderColor: colors.brand }]}>
              <Feather name="rotate-ccw" size={24} color={colors.brand} />
            </Pressable>
            <Pressable
              accessibilityLabel="Know it"
              onPress={() => deckRef.current?.swipe('right')}
              hitSlop={8}
              style={[styles.actionBig, { backgroundColor: colors.accent }]}>
              <Feather name="check" size={30} color={colors.textOnAccent} />
            </Pressable>
          </View>

          <Text variant="caption" color="textMuted" center style={styles.hintText}>
            Swipe or tap · left to keep learning, right if you know it
          </Text>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  track: { flex: 1, height: 6, borderRadius: 999, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 999 },
  counter: { minWidth: 46, textAlign: 'right' },
  deckArea: { flex: 1, paddingVertical: spacing.lg },
  actions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xl, paddingTop: spacing.md },
  action: { width: 60, height: 60, borderRadius: 999, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  actionBig: { width: 76, height: 76, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  hintText: { paddingTop: spacing.md, paddingBottom: spacing.sm },
  done: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.xl },
  doneCopy: { gap: spacing.xs, alignItems: 'center' },
  doneActions: { alignSelf: 'stretch', gap: spacing.sm },
});
