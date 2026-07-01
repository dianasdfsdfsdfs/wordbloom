import { StatusBar } from 'expo-status-bar';
import type { PropsWithChildren } from 'react';
import { View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Edge = 'top' | 'bottom';

export interface ScreenProps extends ViewProps {
  padded?: boolean;
  edges?: Edge[];
}

/** Safe-area screen container with themed background and status bar. */
export function Screen({
  style,
  padded = true,
  edges = ['top'],
  children,
  ...rest
}: PropsWithChildren<ScreenProps>) {
  const { colors, scheme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: colors.bg,
          paddingTop: edges.includes('top') ? insets.top : 0,
          paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
          paddingHorizontal: padded ? spacing.xl : 0,
        },
        style,
      ]}
      {...rest}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      {children}
    </View>
  );
}
