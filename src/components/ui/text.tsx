import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import type { ColorName } from '@/constants/theme';
import { typeScale } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Variant = keyof typeof typeScale;

export interface TextProps_ extends TextProps {
  variant?: Variant;
  color?: ColorName;
  center?: boolean;
}

/** Themed text. Pick a type-scale `variant` and a color token. */
export function Text({ variant = 'body', color = 'textPrimary', center, style, ...rest }: TextProps_) {
  const { colors } = useTheme();
  return (
    <RNText
      style={[
        typeScale[variant] as TextStyle,
        { color: colors[color] },
        center ? { textAlign: 'center' } : null,
        style,
      ]}
      {...rest}
    />
  );
}
