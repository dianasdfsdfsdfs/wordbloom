import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { Text } from '@/components/ui/text';
import { radius, spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { LangCode, Word } from '@/types/domain';
import { Flashcard } from './flashcard';

const { width } = Dimensions.get('window');
const SWIPE_X = width * 0.26;

export type SwipeDirection = 'left' | 'right';

export interface SwipeDeckHandle {
  swipe: (direction: SwipeDirection) => void;
}

export interface SwipeDeckProps {
  words: Word[];
  nativeLang: LangCode;
  onSwipe: (word: Word, direction: SwipeDirection) => void;
  onComplete?: () => void;
  onCardChange?: (word: Word | null) => void;
}

export const SwipeDeck = forwardRef<SwipeDeckHandle, SwipeDeckProps>(function SwipeDeck(
  { words, nativeLang, onSwipe, onComplete, onCardChange },
  ref,
) {
  const { colors } = useTheme();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [exiting, setExiting] = useState<{ word: Word; dir: SwipeDirection } | null>(null);

  // Drag state for the interactive top card.
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  // Independent fly-off layer for the card that was just swiped.
  const exitX = useSharedValue(0);
  const exitY = useSharedValue(0);

  const topWordRef = useRef<Word | undefined>(words[index]);
  topWordRef.current = words[index];

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
    setExiting(null);
    x.value = 0;
    y.value = 0;
  }, [words, x, y]);

  useEffect(() => {
    if (words.length > 0 && index >= words.length) onComplete?.();
  }, [index, words.length, onComplete]);

  useEffect(() => {
    onCardChange?.(words[index] ?? null);
  }, [index, words, onCardChange]);

  const clearExiting = useCallback(() => setExiting(null), []);
  const toggleFlip = useCallback(() => setFlipped((f) => !f), []);

  const commitSwipe = useCallback(
    (direction: SwipeDirection, fromX: number, fromY: number) => {
      const word = topWordRef.current;
      if (!word) return;

      // Hand the outgoing card to the independent fly-off layer.
      setExiting({ word, dir: direction });
      exitX.value = fromX;
      exitY.value = fromY;
      const sign = direction === 'right' ? 1 : -1;
      exitX.value = withTiming(sign * width * 1.5, { duration: 260 }, (finished) => {
        if (finished) runOnJS(clearExiting)();
      });
      exitY.value = withTiming(fromY - 30, { duration: 260 });

      // Advance the deck immediately — the new card is already at rest.
      x.value = 0;
      y.value = 0;
      setFlipped(false);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      onSwipe(word, direction);
      setIndex((i) => i + 1);
    },
    [onSwipe, clearExiting, exitX, exitY, x, y],
  );

  const triggerSwipe = useCallback(
    (direction: SwipeDirection) => commitSwipe(direction, 0, 0),
    [commitSwipe],
  );
  useImperativeHandle(ref, () => ({ swipe: triggerSwipe }), [triggerSwipe]);

  const gesture = useMemo(() => {
    const pan = Gesture.Pan()
      .activeOffsetX([-12, 12])
      .onChange((e) => {
        x.value = e.translationX;
        y.value = e.translationY;
      })
      .onEnd((e) => {
        const passed = Math.abs(e.translationX) > SWIPE_X || Math.abs(e.velocityX) > 900;
        if (passed) {
          runOnJS(commitSwipe)(e.translationX > 0 ? 'right' : 'left', e.translationX, e.translationY);
        } else {
          x.value = withSpring(0, { damping: 18, stiffness: 170 });
          y.value = withSpring(0, { damping: 18, stiffness: 170 });
        }
      });

    const tap = Gesture.Tap()
      .maxDistance(12)
      .onEnd(() => runOnJS(toggleFlip)());

    return Gesture.Race(pan, tap);
  }, [commitSwipe, toggleFlip, x, y]);

  const topStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { rotateZ: `${interpolate(x.value, [-width / 2, width / 2], [-9, 9], Extrapolation.CLAMP)}deg` },
    ],
  }));

  const exitStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: exitX.value },
      { translateY: exitY.value },
      { rotateZ: `${interpolate(exitX.value, [-width, width], [-12, 12], Extrapolation.CLAMP)}deg` },
    ],
  }));

  const secondStyle = useAnimatedStyle(() => {
    const p = interpolate(Math.abs(x.value), [0, SWIPE_X], [0, 1], Extrapolation.CLAMP);
    return { transform: [{ scale: 0.93 + p * 0.07 }, { translateY: 18 - p * 18 }] };
  });

  const rightHint = useAnimatedStyle(() => ({
    opacity: interpolate(x.value, [10, SWIPE_X], [0, 1], Extrapolation.CLAMP),
  }));
  const leftHint = useAnimatedStyle(() => ({
    opacity: interpolate(x.value, [-SWIPE_X, -10], [1, 0], Extrapolation.CLAMP),
  }));

  const top = words[index];
  const second = words[index + 1];
  const third = words[index + 2];

  return (
    <View style={styles.deck}>
      {third ? (
        <View key={third.id} style={[styles.cardPos, styles.thirdCard]} pointerEvents="none">
          <Flashcard word={third} nativeLang={nativeLang} />
        </View>
      ) : null}

      {second ? (
        <Animated.View key={second.id} style={[styles.cardPos, secondStyle]} pointerEvents="none">
          <Flashcard word={second} nativeLang={nativeLang} />
        </Animated.View>
      ) : null}

      {top ? (
        <GestureDetector gesture={gesture}>
          <Animated.View key={top.id} style={[styles.cardPos, topStyle]}>
            <Flashcard word={top} nativeLang={nativeLang} flipped={flipped} />

            <Animated.View
              style={[styles.hint, styles.hintRight, { borderColor: colors.accent }, rightHint]}
              pointerEvents="none">
              <Feather name="check" size={16} color={colors.accent} />
              <Text variant="overline" style={{ color: colors.accent }}>
                Know it
              </Text>
            </Animated.View>

            <Animated.View
              style={[styles.hint, styles.hintLeft, { borderColor: colors.brand }, leftHint]}
              pointerEvents="none">
              <Feather name="rotate-ccw" size={16} color={colors.brand} />
              <Text variant="overline" style={{ color: colors.brand }}>
                Still learning
              </Text>
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      ) : null}

      {exiting ? (
        <Animated.View style={[styles.cardPos, exitStyle]} pointerEvents="none">
          <Flashcard word={exiting.word} nativeLang={nativeLang} />
        </Animated.View>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  deck: { flex: 1 },
  cardPos: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  thirdCard: { transform: [{ scale: 0.86 }, { translateY: 36 }], opacity: 0.55 },
  hint: {
    position: 'absolute',
    top: 26,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: 2,
  },
  hintRight: { left: spacing.xl, transform: [{ rotate: '-11deg' }] },
  hintLeft: { right: spacing.xl, transform: [{ rotate: '11deg' }] },
});
