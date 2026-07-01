import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { radius, spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Text } from './text';

export interface OptionCardProps {
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  selected?: boolean;
  onPress?: () => void;
}

export function OptionCard({ title, subtitle, leading, selected = false, onPress }: OptionCardProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress?.();
      }}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: selected ? colors.accent : colors.border,
          borderWidth: selected ? 2 : 1,
          opacity: pressed ? 0.92 : 1,
        },
      ]}>
      {leading != null ? (
        <View style={[styles.leading, { backgroundColor: colors.surfaceAlt }]}>{leading}</View>
      ) : null}
      <View style={styles.body}>
        <Text variant="titleM">{title}</Text>
        {subtitle ? (
          <Text variant="small" color="textSecondary" style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View
        style={[
          styles.check,
          {
            borderColor: selected ? colors.accent : colors.border,
            backgroundColor: selected ? colors.accent : 'transparent',
          },
        ]}>
        {selected ? <Feather name="check" size={15} color={colors.textOnAccent} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
  },
  leading: {
    width: 46,
    height: 46,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1 },
  subtitle: { marginTop: 2 },
  check: {
    width: 24,
    height: 24,
    borderRadius: 999,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
