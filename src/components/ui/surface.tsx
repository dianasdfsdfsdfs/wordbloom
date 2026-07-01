import { LinearGradient } from 'expo-linear-gradient';
import type { PropsWithChildren } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { radius, shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export interface SurfaceProps {
  style?: StyleProp<ViewStyle>;
  /** Skip the drop shadow (e.g. for nested surfaces). */
  flat?: boolean;
}

/**
 * A card surface with a subtle vertical gradient, hairline border and soft
 * shadow — gives blocks depth in both light and dark themes.
 */
export function Surface({ style, flat = false, children }: PropsWithChildren<SurfaceProps>) {
  const { colors, scheme } = useTheme();
  const stops: [string, string] =
    scheme === 'dark' ? [colors.surfaceAlt, colors.surface] : ['#FFFFFF', colors.surfaceAlt];

  return (
    <LinearGradient
      colors={stops}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.base, { borderColor: colors.border }, flat ? null : shadows.soft, style]}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: radius.lg, borderWidth: 1 },
});
