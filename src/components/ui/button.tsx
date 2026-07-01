import * as Haptics from 'expo-haptics';
import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';

import { radius, shadows, spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Text } from './text';

type Variant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger';
type Size = 'lg' | 'md' | 'sm';

export interface ButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  label: string;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  style?: ViewStyle;
}

const HEIGHTS: Record<Size, number> = { lg: 56, md: 50, sm: 42 };

export function Button({
  label,
  variant = 'primary',
  size = 'lg',
  fullWidth,
  loading = false,
  leftIcon,
  disabled,
  onPress,
  style,
  ...rest
}: ButtonProps) {
  const { colors } = useTheme();

  const bg: Record<Variant, string> = {
    primary: colors.brand,
    accent: colors.accent,
    secondary: colors.surfaceAlt,
    ghost: 'transparent',
    danger: 'transparent',
  };
  const fg: Record<Variant, string> = {
    primary: colors.textOnBrand,
    accent: colors.textOnAccent,
    secondary: colors.textPrimary,
    ghost: colors.brand,
    danger: colors.danger,
  };

  const isDisabled = disabled || loading;
  const handlePress: PressableProps['onPress'] = (e) => {
    Haptics.selectionAsync().catch(() => {});
    onPress?.(e);
  };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={isDisabled ? undefined : handlePress}
      style={({ pressed }) => [
        styles.base,
        {
          height: HEIGHTS[size],
          backgroundColor: bg[variant],
          borderRadius: radius.lg,
          opacity: disabled ? 0.5 : pressed ? 0.94 : 1,
          transform: [{ scale: pressed && !isDisabled ? 0.985 : 1 }],
        },
        variant === 'secondary' ? { borderWidth: 1, borderColor: colors.borderStrong } : null,
        variant === 'danger' ? { borderWidth: 1, borderColor: colors.border } : null,
        variant === 'primary' || variant === 'accent' || variant === 'secondary' ? shadows.soft : null,
        fullWidth ? { alignSelf: 'stretch' } : null,
        style,
      ]}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={fg[variant]} />
      ) : (
        <View style={styles.row}>
          {leftIcon}
          <Text variant={size === 'sm' ? 'small' : 'titleM'} style={{ color: fg[variant] }}>
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
});
