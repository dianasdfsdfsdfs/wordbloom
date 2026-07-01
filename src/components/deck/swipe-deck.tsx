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
}

export const SwipeDeck = forwardRef<SwipeDeckHandle, SwipeDeckProps>(function SwipeDeck(
  { words, nativeLang, onSwipe, onComplete },
  ref,
) {
  const { colors } = useTheme();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const topWordRef = useRef<Word | undefined>(words[index]);
  topWordRef.current = words[index];

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
    x.value = 0;
    y.value = 0;
  }, [words, x, y]);

  useEffect(() => {
    if (words.length > 0 && index >= words.length) onComplete?.();
  }, [index, words.length, onComplete]);

  const toggleFlip = useCallback(() => setFlipped((f) => !f), []);

  const handleSwipe = useCallback(
    (direction: SwipeDirection) => {
      const word = topWordRef.current;
      if (word) onSwipe(word, direction);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      setFlipped(false);
      x.value = 0;
      y.value = 0;
      setIndex((i) => i + 1);
    },
    [onSwipe, x, y],
  );

  const triggerSwipe = useCallback(
    (direction: SwipeDirection) => {
      const sign = direction === 'right' ? 1 : -1;
      x.value = withTiming(sign * width * 1.4, { duration: 240 }, (finished) => {
        if (finished) runOnJS(handleSwipe)(direction);
      });
      y.value = withTiming(-20, { duration: 240 });
    },
    [handleSwipe, x, y],
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
          const dir = e.translationX > 0 ? 1 : -1;
          x.value = withTiming(dir * width * 1.4, { duration: 220 }, (finished) => {
            if (finished) runOnJS(handleSwipe)(dir > 0 ? 'right' : 'left');
          });
          y.value = withTiming(e.translationY + 24, { duration: 220 });
        } else {
          x.value = withSpring(0, { damping: 18, stiffness: 170 });
          y.value = withSpring(0, { damping: 18, stiffness: 170 });
        }
      });

    const tap = Gesture.Tap()
      .maxDistance(12)
      .onEnd(() => runOnJS(toggleFlip)());

    return Gesture.Race(pan, tap);
  }, [handleSwipe, toggleFlip, x, y]);

  const topStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { rotateZ: `${interpolate(x.value, [-width / 2, width / 2], [-9, 9], Extrapolation.CLAMP)}deg` },
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
