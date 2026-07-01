import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs, useRouter } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';
import { palette, shadows, spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];
type FeatherName = keyof typeof Feather.glyphMap;

const TAB_META: Record<string, { icon: FeatherName; label: string }> = {
  index: { icon: 'home', label: 'Home' },
  levels: { icon: 'layers', label: 'Levels' },
  stats: { icon: 'bar-chart-2', label: 'Stats' },
  settings: { icon: 'settings', label: 'Settings' },
};

export function WordbloomTabBar({ state, navigation }: TabBarProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const renderTab = (routeIndex: number) => {
    const route = state.routes[routeIndex];
    if (!route) return null;
    const meta = TAB_META[route.name] ?? { icon: 'circle' as FeatherName, label: route.name };
    const focused = state.index === routeIndex;

    const onPress = () => {
      const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
      if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
    };

    return (
      <Pressable key={route.key} onPress={onPress} style={styles.tab} hitSlop={8}>
        <Feather name={meta.icon} size={22} color={focused ? colors.accent : colors.textMuted} />
        <Text
          variant="overline"
          style={{ color: focused ? colors.accent : colors.textMuted, marginTop: 4, letterSpacing: 0.6 }}>
          {meta.label}
        </Text>
        <View style={[styles.dot, { backgroundColor: focused ? colors.accent : 'transparent' }]} />
      </Pressable>
    );
  };

  return (
    <View
      style={[
        styles.wrap,
        {
          paddingBottom: insets.bottom > 0 ? insets.bottom : spacing.md,
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      ]}>
      <View style={styles.row}>
        {renderTab(0)}
        {renderTab(1)}
        <View style={styles.fabSlot}>
          <Pressable onPress={() => router.push('/study')} hitSlop={8} style={styles.fabPress}>
            <LinearGradient
              colors={[palette.brick, palette.wine] as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.fab, shadows.card]}>
              <Feather name="play" size={24} color={palette.blush} style={{ marginLeft: 3 }} />
            </LinearGradient>
          </Pressable>
        </View>
        {renderTab(2)}
        {renderTab(3)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  row: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around' },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 4 },
  dot: { width: 5, height: 5, borderRadius: 999, marginTop: 3 },
  fabSlot: { width: 72, alignItems: 'center' },
  fabPress: { marginTop: -28 },
  fab: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
});
