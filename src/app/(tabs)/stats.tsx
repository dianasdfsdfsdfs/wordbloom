import { useMemo } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { AreaChart } from '@/components/charts/area-chart';
import { Screen } from '@/components/ui/screen';
import { Surface } from '@/components/ui/surface';
import { Text } from '@/components/ui/text';
import { radius, spacing } from '@/constants/theme';
import { getStats } from '@/data/mock-progress';
import { useTheme } from '@/hooks/use-theme';
import { useSettings } from '@/stores/settings';

const CHART_W = Dimensions.get('window').width - spacing.xl * 2 - spacing.lg * 2;

function chunk<T>(arr: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

function Tile({ value, label }: { value: string; label: string }) {
  return (
    <Surface style={styles.tile}>
      <Text variant="displayM">{value}</Text>
      <Text variant="caption" color="textMuted" center>
        {label}
      </Text>
    </Surface>
  );
}

export default function StatsScreen() {
  const { colors } = useTheme();
  const targetLang = useSettings((s) => s.targetLang);
  const level = useSettings((s) => s.level);
  const stats = useMemo(() => getStats(targetLang, level), [targetLang, level]);
  const maxWeek = Math.max(...stats.week.map((w) => w.count), 1);

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: spacing.xl, paddingTop: spacing.md }}>
        <View style={{ gap: 6 }}>
          <Text variant="largeTitle">Stats</Text>
          <Text variant="small" color="textMuted">
            Your progress at a glance.
          </Text>
        </View>

        <View style={styles.tiles}>
          <Tile value={`${stats.totalLearned}`} label="Words learned" />
          <Tile value={`${stats.streak}`} label="Day streak" />
          <Tile value={`${stats.accuracy}%`} label="Accuracy" />
        </View>

        <Surface style={styles.card}>
          <Text variant="titleM">This week</Text>
          <View style={styles.bars}>
            {stats.week.map((d) => (
              <View key={d.day} style={styles.barCol}>
                <View style={[styles.barTrack, { backgroundColor: colors.surfaceAlt }]}>
                  <View
                    style={[styles.bar, { height: `${(d.count / maxWeek) * 100}%`, backgroundColor: colors.accent }]}
                  />
                </View>
                <Text variant="caption" color="textMuted">
                  {d.day}
                </Text>
              </View>
            ))}
          </View>
        </Surface>

        <Surface style={styles.card}>
          <Text variant="titleM">Learning trend</Text>
          <Text variant="caption" color="textMuted">
            Words learned per week
          </Text>
          <View style={{ marginTop: spacing.md }}>
            <AreaChart data={stats.trend} width={CHART_W} height={120} color={colors.accent} />
          </View>
        </Surface>

        <Surface style={styles.card}>
          <Text variant="titleM">Activity</Text>
          <Text variant="caption" color="textMuted">
            Last 5 weeks
          </Text>
          <View style={styles.grid}>
            {chunk(stats.activity, 7).map((week, wi) => (
              <View key={wi} style={styles.gridCol}>
                {week.map((lvl, di) => (
                  <View
                    key={di}
                    style={[
                      styles.cell,
                      {
                        backgroundColor: lvl === 0 ? colors.surfaceAlt : colors.accent,
                        opacity: lvl === 0 ? 1 : 0.3 + lvl * 0.23,
                      },
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>
        </Surface>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  tiles: { flexDirection: 'row', gap: spacing.md },
  tile: { flex: 1, alignItems: 'center', paddingVertical: spacing.lg, gap: 2 },
  card: { gap: 4, padding: spacing.lg },
  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm, marginTop: spacing.md },
  barCol: { flex: 1, alignItems: 'center', gap: spacing.sm },
  barTrack: { width: 18, height: 110, borderRadius: radius.sm, justifyContent: 'flex-end', overflow: 'hidden' },
  bar: { width: '100%', borderRadius: radius.sm },
  grid: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md, justifyContent: 'space-between' },
  gridCol: { gap: spacing.sm, flex: 1 },
  cell: { width: '100%', aspectRatio: 1, borderRadius: 6 },
});
