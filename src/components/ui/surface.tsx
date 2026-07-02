import { LinearGradient } from 'expo-linear-gradient';
import type { PropsWithChildren } from 'react';
import { Platform, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export interface SurfaceProps {
  style?: StyleProp<ViewStyle>;
  /** Skip the glow/shadow (e.g. for nested surfaces). */
  flat?: boolean;
}

/**
 * A card surface with a subtle vertical gradient, a glowing edge and an even
 * (all-sides) soft shadow — reads as depth in light mode and as a gentle neon
 * glow in dark mode. Shadow offset is centered so it isn't clipped on the sides.
 */
export function Surface({ style, flat = false, children }: PropsWithChildren<SurfaceProps>) {
  const { colors, scheme } = useTheme();
  const isDark = scheme === 'dark';

  const stops: [string, string] = isDark ? [colors.surfaceAlt, colors.surface] : ['#FFFFFF', colors.surfaceAlt];
  const borderColor = isDark ? 'rgba(255,236,236,0.16)' : colors.border;

  const glow = flat
    ? null
    : isDark
      ? Platform.select({
          ios: { shadowColor: '#FF6373', shadowOpacity: 0.16, shadowRadius: 14, shadowOffset: { width: 0, height: 0 } },
          android: { elevation: 6 },
          web: { boxShadow: '0 0 16px rgba(255,99,115,0.16)' },
          default: {},
        })
      : Platform.select({
          ios: { shadowColor: '#3A0A0B', shadowOpacity: 0.12, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } },
          android: { elevation: 4 },
          web: { boxShadow: '0 6px 16px rgba(58,10,11,0.12)' },
          default: {},
        });

  return (
    <LinearGradient
      colors={stops}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.base, { borderColor }, glow, style]}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: radius.lg, borderWidth: 1 },
});
