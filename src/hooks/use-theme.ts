/**
 * Resolves the active color scheme from the user's preference
 * ('system' | 'light' | 'dark') and the OS setting, and returns the
 * matching token set. No provider needed — the source of truth is the
 * settings store.
 */
import { useColorScheme } from 'react-native';

import { themes, type ThemeColors, type ThemeMode } from '@/constants/theme';
import { useSettings } from '@/stores/settings';

export function useResolvedScheme(): ThemeMode {
  const system = useColorScheme();
  const preference = useSettings((s) => s.themeMode);
  if (preference === 'system') return system === 'dark' ? 'dark' : 'light';
  return preference;
}

export function useTheme(): { scheme: ThemeMode; colors: ThemeColors } {
  const scheme = useResolvedScheme();
  return { scheme, colors: themes[scheme] };
}
