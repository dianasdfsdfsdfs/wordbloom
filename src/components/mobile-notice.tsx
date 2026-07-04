import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, StyleSheet, useWindowDimensions } from 'react-native';

import { Text } from '@/components/ui/text';
import { palette, spacing } from '@/constants/theme';

/**
 * A slim banner pinned to the very top on the web build, shown on wider (desktop)
 * viewports so first-time visitors know Wordbloom is a phone-first app. Hidden on
 * native and on phone-width screens where the app already fits.
 */
export function MobileNotice() {
  const { width } = useWindowDimensions();
  if (Platform.OS !== 'web' || width < 500) return null;

  return (
    <LinearGradient
      colors={[palette.brick, palette.garnet] as [string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.bar}>
      <Feather name="smartphone" size={15} color={palette.blush} />
      <Text variant="small" style={styles.text}>
        Wordbloom is a mobile app — open this page on your phone for the full experience.
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: spacing.lg,
  },
  text: { color: palette.blush, textAlign: 'center', fontWeight: '600' },
});
