import * as Haptics from 'expo-haptics';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { LANGUAGES, LEVEL_INFO, TARGET_LANGUAGES } from '@/constants/languages';
import { radius, spacing } from '@/constants/theme';
import { getLevelStats } from '@/data/mock-progress';
import { useTheme } from '@/hooks/use-theme';
import { useSettings } from '@/stores/settings';
import type { CEFRLevel, LangCode } from '@/types/domain';

export default function LevelsScreen() {
  const { colors } = useTheme();
  const targetLang = useSettings((s) => s.targetLang);
  const level = useSettings((s) => s.level);
  const setTargetLang = useSettings((s) => s.setTargetLang);
  const setLevel = useSettings((s) => s.setLevel);

  const stats = useMemo(() => getLevelStats(targetLang, level), [targetLang, level]);

  const selectLang = (l: LangCode) => {
    Haptics.selectionAsync().catch(() => {});
    setTargetLang(l);
  };
  const selectLevel = (l: CEFRLevel) => {
    Haptics.selectionAsync().catch(() => {});
    setLevel(l);
  };

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: spacing.xl, paddingTop: spacing.sm }}>
        <View style={{ gap: spacing.sm }}>
          <Text variant="overline" color="accent">
            Collections
          </Text>
          <Text variant="displayM">Levels</Text>
          <Text variant="body" color="textSecondary">
            Pick the level you&apos;re studying. Switch anytime — your progress is kept per collection.
          </Text>
        </View>

        <View style={[styles.segment, { backgroundColor: colors.surfaceAlt }]}>
          {TARGET_LANGUAGES.map((l) => {
            const on = l === targetLang;
            return (
              <Pressable
                key={l}
                onPress={() => selectLang(l)}
                style={[styles.segmentBtn, on ? { backgroundColor: colors.surface } : null]}>
                <Text variant="titleM" color={on ? 'textPrimary' : 'textMuted'}>
                  {LANGUAGES[l].name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={{ gap: spacing.md }}>
          {stats.map((st) => {
            const active = st.level === level;
            const pct = st.total ? st.learned / st.total : 0;
            return (
              <Pressable
                key={st.level}
                onPress={() => selectLevel(st.level)}
                style={[
                  styles.row,
                  {
                    backgroundColor: colors.surface,
                    borderColor: active ? colors.accent : colors.border,
                    borderWidth: active ? 2 : 1,
                  },
                ]}>
                <View style={[styles.badge, { backgroundColor: active ? colors.accent : colors.surfaceAlt }]}>
                  <Text variant="titleM" style={{ color: active ? colors.textOnAccent : colors.textPrimary }}>
                    {st.level}
                  </Text>
                </View>
                <View style={{ flex: 1, gap: 6 }}>
                  <View style={styles.titleRow}>
                    <Text variant="titleM">{LEVEL_INFO[st.level].name}</Text>
                    {active ? (
                      <View style={[styles.chip, { backgroundColor: colors.accentSoft }]}>
                        <Text variant="overline" color="accent">
                          Active
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={[styles.track, { backgroundColor: colors.surfaceAlt }]}>
                    <View style={[styles.fill, { width: `${pct * 100}%`, backgroundColor: colors.accent }]} />
                  </View>
                  <Text variant="caption" color="textMuted">
                    {st.learned} / {st.total} words
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  segment: { flexDirection: 'row', padding: 4, borderRadius: radius.pill, gap: 4 },
  segmentBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
  },
  badge: { width: 52, height: 52, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  chip: { paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.pill },
  track: { height: 6, borderRadius: 999, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 999 },
});
