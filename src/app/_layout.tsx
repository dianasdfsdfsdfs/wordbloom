import '@/global.css';

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { themes } from '@/constants/theme';
import { useResolvedScheme } from '@/hooks/use-theme';
import { startCloudSync } from '@/lib/sync';
import { useHydrated, useSettings } from '@/stores/settings';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const scheme = useResolvedScheme();
  const hydrated = useHydrated();
  const hasOnboarded = useSettings((s) => s.hasOnboarded);
  const colors = themes[scheme];

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const ready = fontsLoaded && hydrated;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  useEffect(() => {
    startCloudSync();
  }, []);

  if (!ready) return null;

  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...base,
    colors: {
      ...base.colors,
      background: colors.bg,
      card: colors.surface,
      text: colors.textPrimary,
      border: colors.border,
      primary: colors.accent,
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider value={navTheme}>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
            <Stack.Protected guard={hasOnboarded}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="study" options={{ presentation: 'fullScreenModal', animation: 'fade' }} />
            </Stack.Protected>
            <Stack.Protected guard={!hasOnboarded}>
              <Stack.Screen name="(onboarding)" />
              <Stack.Screen name="(auth)" />
            </Stack.Protected>
          </Stack>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
