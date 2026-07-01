import type { PropsWithChildren } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { radius, shadows, spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Variant = 'surface' | 'alt' | 'green' | 'outline';

export interface CardProps extends ViewProps {
  variant?: Variant;
  padded?: boolean;
  elevated?: boolean;
}

export function Card({
  variant = 'surface',
  padded = true,
  elevated = false,
  style,
  children,
  ...rest
}: PropsWithChildren<CardProps>) {
  const { colors } = useTheme();

  const bg: Record<Variant, string> = {
    surface: colors.surface,
    alt: colors.surfaceAlt,
    green: colors.surfaceGreen,
    outline: 'transparent',
  };

  return (
    <View
      style={[
        { backgroundColor: bg[variant], borderRadius: radius.lg, padding: padded ? spacing.lg : 0 },
        variant === 'outline' ? { borderWidth: 1, borderColor: colors.border } : null,
        elevated ? shadows.card : null,
        style,
      ]}
      {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({});
