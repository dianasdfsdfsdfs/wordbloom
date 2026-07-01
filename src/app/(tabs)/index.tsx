import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Bloom } from '@/components/bloom';
import { Screen } from '@/components/ui/screen';
import { Surface } from '@/components/ui/surface';
import { Text } from '@/components/ui/text';
import { LANGUAGES, LEVEL_INFO } from '@/constants/languages';
import { palette, radius, shadows, spacing } from '@/constants/theme';
import { getHomeSummary } from '@/data/mock-progress';
import { useTheme } from '@/hooks/use-theme';
import { useSettings } from '@/stores/settings';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function StatTile({ value, label }: { value: number; label: string }) {
  return (
    <Surface style={styles.tile}>
      <Text variant="displayM">{value}</Text>
      <Text variant="caption" color="textMuted" center>
        {label}
      </Text>
    </Surface>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const targetLang = useSettings((s) => s.targetLang);
  const level = useSettings((s) => s.level);
  const nativeLang = useSettings((s) => s.nativeLang);
  const dailyGoal = useSettings((s) => s.dailyGoal);

  const summary = useMemo(
    () => getHomeSummary(targetLang, level, dailyGoal),
    [targetLang, level, dailyGoal],
  );
  const goalPct = dailyGoal ? Math.min(1, summary.learnedToday / dailyGoal) : 0;

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: spacing.xl, paddingTop: spacing.md }}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text variant="largeTitle">{greeting()}</Text>
            <Text variant="small" color="textMuted" style={{ marginTop: 6 }}>
              {LANGUAGES[targetLang].name} · {level} {LEVEL_INFO[level].name}
            </Text>
          </View>
          <View style={[styles.streak, { backgroundColor: colors.surface, borderColor: colors.border }, shadows.soft]}>
            <Feather name="zap" size={15} color={colors.accent} />
            <Text variant="titleM" color="accent">
              {summary.streak}
            </Text>
          </View>
        </View>

        <LinearGradient
          colors={[palette.wine, palette.garnet] as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.hero, shadows.card]}>
          <View style={{ flex: 1, gap: 6 }}>
            <Text variant="overline" style={{ color: palette.blush, opacity: 0.8 }}>
              Today&apos;s bloom
            </Text>
            <View style={styles.goalRow}>
              <Text variant="heroWord" style={{ color: palette.blush, fontSize: 40, lineHeight: 44 }}>
                {summary.learnedToday}
              </Text>
              <Text variant="titleL" style={{ color: palette.blush, opacity: 0.65 }}>
                / {dailyGoal}
              </Text>
            </View>
            <Text variant="small" style={{ color: palette.blush, opacity: 0.82 }}>
              {summary.learnedToday >= dailyGoal
                ? 'Daily goal reached'
                : `${dailyGoal - summary.learnedToday} words to your goal`}
            </Text>
          </View>
          <Bloom size={110} />
        </LinearGradient>

        <Pressable
          onPress={() => router.push('/study')}
          style={({ pressed }) => [
            styles.cta,
            shadows.soft,
            { backgroundColor: colors.accent, opacity: pressed ? 0.94 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] },
          ]}>
          <View style={{ flex: 1 }}>
            <Text variant="titleL" style={{ color: colors.textOnAccent }}>
              Start studying
            </Text>
            <Text variant="small" style={{ color: colors.textOnAccent, opacity: 0.85 }}>
              {summary.newAvailable} new · {summary.reviewsDue} to review
            </Text>
          </View>
          <View style={[styles.ctaIcon, { backgroundColor: 'rgba(255,255,255,0.18)' }]}>
            <Feather name="arrow-right" size={22} color={colors.textOnAccent} />
          </View>
        </Pressable>

        <View style={styles.tiles}>
          <StatTile value={summary.learnedToday} label="Today" />
          <StatTile value={summary.streak} label="Day streak" />
          <StatTile value={summary.totalLearned} label="Total" />
        </View>

        <View style={{ gap: spacing.md }}>
          <Text variant="titleL">Recently learned</Text>
          <View style={{ gap: spacing.sm }}>
            {summary.recent.map((w) => (
              <Surface key={w.id} style={styles.recent}>
                <View style={{ flex: 1 }}>
                  <Text variant="titleM">
                    {w.article ? `${w.article} ` : ''}
                    {w.headword}
                  </Text>
                  <Text variant="small" color="textSecondary">
                    {w.translations[nativeLang] ?? ''}
                  </Text>
                </View>
                <Feather name="check-circle" size={18} color={colors.accent} />
              </Surface>
            ))}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing.md },
  streak: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: spacing.md, height: 40, borderRadius: radius.pill, borderWidth: 1 },
  hero: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.xl, borderRadius: radius.card },
  goalRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  cta: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg, borderRadius: radius.lg },
  ctaIcon: { width: 44, height: 44, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  tiles: { flexDirection: 'row', gap: spacing.md },
  tile: { flex: 1, alignItems: 'center', paddingVertical: spacing.lg, gap: 2 },
  recent: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg },
});
