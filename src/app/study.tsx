import { Feather } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Bloom } from '@/components/bloom';
import { SwipeDeck, type SwipeDeckHandle, type SwipeDirection } from '@/components/deck/swipe-deck';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { spacing } from '@/constants/theme';
import { getWords } from '@/data/mock-words';
import { useTheme } from '@/hooks/use-theme';
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

  const [sessionId, setSessionId] = useState(0);
  const session = useMemo(() => {
    const pool = getWords(targetLang, level, false);
    const words = pool.length > 0 ? pool : getWords(targetLang, 'A1', false);
    return buildSession(words, useProgress.getState().byWord, dailyGoal);
    // rebuild only on level/lang/goal change or restart — not on every review
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetLang, level, dailyGoal, sessionId]);

  const deckRef = useRef<SwipeDeckHandle>(null);
  const [reviewed, setReviewed] = useState(0);
  const [known, setKnown] = useState(0);
  const [done, setDone] = useState(false);
  const [current, setCurrent] = useState<Word | null>(null);

  const speak = () => {
    if (!current) return;
    Speech.stop();
    Speech.speak(current.headword, { language: LANG_TAG[current.lang] ?? current.lang, rate: 0.95 });
  };

  const onSwipe = useCallback(
    (word: Word, dir: SwipeDirection) => {
      review(word.id, dir === 'right' ? 'known' : 'unknown');
      setReviewed((r) => r + 1);
      if (dir === 'right') setKnown((k) => k + 1);
    },
    [review],
  );

  const restart = () => {
    setReviewed(0);
    setKnown(0);
    setDone(false);
    setSessionId((s) => s + 1);
  };

  const total = session.length;
  const empty = total === 0;
  const progress = total ? reviewed / total : 0;

  return (
    <Screen edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Feather name="x" size={26} color={colors.textPrimary} />
        </Pressable>
        <View style={[styles.track, { backgroundColor: colors.surfaceAlt }]}>
          <View style={[styles.fill, { width: `${(done ? 1 : progress) * 100}%`, backgroundColor: colors.accent }]} />
        </View>
        <Text variant="small" color="textSecondary" style={styles.counter}>
          {empty ? '0/0' : `${done ? total : Math.min(reviewed + 1, total)}/${total}`}
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
              {empty ? 'Nothing due right now' : 'Nicely done'}
            </Text>
            <Text variant="body" color="textSecondary" center>
              {empty
                ? 'No cards are due and there are no new words queued. Come back a little later — your reviews will be waiting.'
                : `You knew ${known} of ${total} ${total === 1 ? 'word' : 'words'} this round.`}
            </Text>
          </View>
          <View style={styles.doneActions}>
            {!empty ? <Button label="Study again" fullWidth onPress={restart} /> : null}
            <Button
              label="Back to home"
              variant={empty ? 'primary' : 'ghost'}
              fullWidth
              onPress={() => router.back()}
            />
          </View>
        </View>
      ) : (
        <>
          <View style={styles.deckArea}>
            <SwipeDeck
              ref={deckRef}
              words={session}
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
