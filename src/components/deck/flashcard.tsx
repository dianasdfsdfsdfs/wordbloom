import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Text } from '@/components/ui/text';
import { fonts, radius, shadows, spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { LangCode, PartOfSpeech, Word } from '@/types/domain';

const POS_LABEL: Record<PartOfSpeech, string> = {
  noun: 'noun',
  verb: 'verb',
  adjective: 'adjective',
  adverb: 'adverb',
  preposition: 'preposition',
  conjunction: 'conjunction',
  pronoun: 'pronoun',
  phrase: 'phrase',
  other: 'word',
};

const MAX_HEAD = 40;
const MIN_HEAD = 16;

export interface FlashcardProps {
  word: Word;
  nativeLang: LangCode;
  flipped?: boolean;
}

export function Flashcard({ word, nativeLang, flipped = false }: FlashcardProps) {
  const { colors } = useTheme();
  const p = useSharedValue(flipped ? 1 : 0);
  const [headW, setHeadW] = useState(0);

  useEffect(() => {
    p.value = withTiming(flipped ? 1 : 0, { duration: 420 });
  }, [flipped, p]);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1200 }, { rotateY: `${interpolate(p.value, [0, 1], [0, 180])}deg` }],
    opacity: p.value <= 0.5 ? 1 : 0,
  }));
  const backStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1200 }, { rotateY: `${interpolate(p.value, [0, 1], [180, 360])}deg` }],
    opacity: p.value > 0.5 ? 1 : 0,
  }));

  const translation = word.translations[nativeLang] ?? Object.values(word.translations)[0] ?? '—';

  // Size the headword to always fit on one line (no ellipsis), based on the
  // measured card width and the word length.
  const headLen = Math.max(word.headword.length, 1);
  const headFont = headW > 0 ? Math.max(MIN_HEAD, Math.min(MAX_HEAD, (headW - 4) / (headLen * 0.66))) : 30;

  return (
    <View style={styles.wrap}>
      {/* Front — the word */}
      <Animated.View style={[styles.face, { backgroundColor: colors.surface }, shadows.card, frontStyle]}>
        <View style={styles.topRow}>
          <View style={[styles.chip, { backgroundColor: colors.surfaceAlt }]}>
            <Text variant="overline" color="textSecondary">
              {POS_LABEL[word.pos]}
            </Text>
          </View>
          <View style={[styles.chip, { backgroundColor: colors.surfaceAlt }]}>
            <Text variant="overline" color="brand">
              {word.level}
            </Text>
          </View>
        </View>

        <View style={styles.center} onLayout={(e) => setHeadW(e.nativeEvent.layout.width)}>
          {word.article ? (
            <Text variant="titleM" color="textMuted">
              {word.article}
            </Text>
          ) : null}
          <Text
            center
            numberOfLines={1}
            style={{ fontFamily: fonts.display.bold, fontSize: headFont, lineHeight: headFont * 1.14, letterSpacing: -0.5 }}>
            {word.headword}
          </Text>
          {word.ipa ? (
            <Text variant="body" color="textMuted" style={styles.ipa}>
              {word.ipa}
            </Text>
          ) : null}
        </View>

        <Text variant="caption" color="textMuted" center>
          Tap to see meaning
        </Text>
      </Animated.View>

      {/* Back — the meaning */}
      <Animated.View style={[styles.face, { backgroundColor: colors.surface }, shadows.card, backStyle]}>
        <Text variant="overline" color="accent">
          Meaning
        </Text>
        <View style={styles.center}>
          <Text variant="displayL" center>
            {translation}
          </Text>
        </View>
        {word.example ? (
          <View style={[styles.example, { backgroundColor: colors.surfaceAlt, borderLeftColor: colors.brand }]}>
            <Text variant="bodyMed">{word.example}</Text>
            {word.exampleTranslation ? (
              <Text variant="small" color="textSecondary" style={styles.exampleTr}>
                {word.exampleTranslation}
              </Text>
            ) : null}
          </View>
        ) : null}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  face: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: radius.card,
    padding: spacing.xl,
    backfaceVisibility: 'hidden',
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between' },
  chip: { paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: radius.pill },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4, alignSelf: 'stretch' },
  ipa: { marginTop: spacing.sm },
  example: { padding: spacing.lg, borderRadius: radius.md, borderLeftWidth: 3, gap: 2 },
  exampleTr: { marginTop: 4 },
});
