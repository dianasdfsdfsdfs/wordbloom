import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { Surface } from '@/components/ui/surface';
import { Text } from '@/components/ui/text';
import { LANGUAGES, TARGET_LANGUAGES } from '@/constants/languages';
import { palette, radius, shadows, spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { type ThemePreference, useSettings } from '@/stores/settings';
import { CEFR_LEVELS } from '@/types/domain';

const THEME_OPTIONS: { key: ThemePreference; label: string }[] = [
  { key: 'system', label: 'System' },
  { key: 'light', label: 'Light' },
  { key: 'dark', label: 'Dark' },
];

const GOAL_MIN = 1;
const GOAL_MAX = 100;
const GOAL_STEP = 1;

function SectionTitle({ children }: { children: string }) {
  return (
    <Text variant="overline" color="textMuted" style={styles.sectionTitle}>
      {children}
    </Text>
  );
}

export default function SettingsScreen() {
  const { colors } = useTheme();
  const {
    themeMode,
    targetLang,
    level,
    dailyGoal,
    nativeLang,
    setThemeMode,
    setTargetLang,
    setLevel,
    setDailyGoal,
    resetAll,
  } = useSettings();
  const [reminders, setReminders] = useState(true);

  const tap = () => {
    Haptics.selectionAsync().catch(() => {});
  };
  const changeGoal = (delta: number) => {
    tap();
    setDailyGoal(Math.max(GOAL_MIN, Math.min(GOAL_MAX, dailyGoal + delta)));
  };

  return (
    <Screen padded={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: spacing.xl, paddingTop: spacing.md, paddingHorizontal: spacing.xl }}>
        <Text variant="largeTitle">Settings</Text>

        <View>
          <SectionTitle>Appearance</SectionTitle>
          <Surface style={styles.card}>
            <Text variant="bodyMed">Theme</Text>
            <View style={[styles.segment, { backgroundColor: colors.surfaceAlt }]}>
              {THEME_OPTIONS.map((o) => {
                const on = themeMode === o.key;
                return (
                  <Pressable
                    key={o.key}
                    onPress={() => {
                      tap();
                      setThemeMode(o.key);
                    }}
                    style={[styles.segmentBtn, on ? [{ backgroundColor: colors.surface }, shadows.soft] : null]}>
                    <Text variant="small" color={on ? 'textPrimary' : 'textMuted'}>
                      {o.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </Surface>
        </View>

        <View>
          <SectionTitle>Learning</SectionTitle>
          <Surface style={[styles.card, { gap: spacing.lg }]}>
            <View style={{ gap: spacing.sm }}>
              <Text variant="bodyMed">Language</Text>
              <View style={[styles.segment, { backgroundColor: colors.surfaceAlt }]}>
                {TARGET_LANGUAGES.map((l) => {
                  const on = l === targetLang;
                  return (
                    <Pressable
                      key={l}
                      onPress={() => {
                        tap();
                        setTargetLang(l);
                      }}
                      style={[styles.segmentBtn, on ? [{ backgroundColor: colors.surface }, shadows.soft] : null]}>
                      <Text variant="small" color={on ? 'textPrimary' : 'textMuted'}>
                        {LANGUAGES[l].name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <Text variant="caption" color="textMuted">
                Translations shown in {LANGUAGES[nativeLang].name}
              </Text>
            </View>

            <View style={{ gap: spacing.sm }}>
              <Text variant="bodyMed">Level</Text>
              <View style={styles.chips}>
                {CEFR_LEVELS.map((l) => {
                  const on = l === level;
                  return (
                    <Pressable
                      key={l}
                      onPress={() => {
                        tap();
                        setLevel(l);
                      }}
                      style={[styles.chip, { backgroundColor: on ? colors.accent : colors.surfaceAlt }]}>
                      <Text variant="small" style={{ color: on ? colors.textOnAccent : colors.textSecondary }}>
                        {l}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={{ gap: spacing.sm }}>
              <Text variant="bodyMed">Daily goal</Text>
              <View style={styles.stepper}>
                <Pressable
                  onPress={() => changeGoal(-GOAL_STEP)}
                  style={[styles.stepBtn, { backgroundColor: colors.surfaceAlt }]}>
                  <Feather name="minus" size={18} color={colors.textPrimary} />
                </Pressable>
                <View style={{ alignItems: 'center', minWidth: 96 }}>
                  <Text variant="titleL">{dailyGoal}</Text>
                  <Text variant="caption" color="textMuted">
                    {dailyGoal === 1 ? 'word / day' : 'words / day'}
                  </Text>
                </View>
                <Pressable
                  onPress={() => changeGoal(GOAL_STEP)}
                  style={[styles.stepBtn, { backgroundColor: colors.surfaceAlt }]}>
                  <Feather name="plus" size={18} color={colors.textPrimary} />
                </Pressable>
              </View>
            </View>
          </Surface>
        </View>

        <View>
          <SectionTitle>Notifications</SectionTitle>
          <Surface style={[styles.card, styles.rowBetween]}>
            <View style={{ flex: 1 }}>
              <Text variant="bodyMed">Study reminders</Text>
              <Text variant="caption" color="textMuted">
                A gentle nudge when reviews are due
              </Text>
            </View>
            <Switch
              value={reminders}
              onValueChange={(v) => {
                tap();
                setReminders(v);
              }}
              trackColor={{ true: colors.accent, false: colors.borderStrong }}
              thumbColor={palette.blush}
            />
          </Surface>
        </View>

        <View>
          <SectionTitle>Account</SectionTitle>
          <Surface style={[styles.card, { gap: spacing.lg }]}>
            <View style={styles.rowBetween}>
              <View style={[styles.avatar, { backgroundColor: colors.surfaceAlt }]}>
                <Feather name="user" size={20} color={colors.textSecondary} />
              </View>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text variant="bodyMed">Guest</Text>
                <Text variant="caption" color="textMuted">
                  Progress is saved on this device
                </Text>
              </View>
            </View>
            <Button
              label="Log out"
              variant="danger"
              fullWidth
              onPress={() => {
                tap();
                resetAll();
              }}
            />
          </Surface>
        </View>

        <Text variant="caption" color="textMuted" center>
          Wordbloom · v1.0.0
        </Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { marginBottom: spacing.sm, marginLeft: spacing.xs },
  card: { gap: spacing.md, padding: spacing.lg },
  segment: { flexDirection: 'row', padding: 4, borderRadius: radius.pill, gap: 4 },
  segmentBtn: { flex: 1, alignItems: 'center', paddingVertical: spacing.sm, borderRadius: radius.pill },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: radius.pill, minWidth: 52, alignItems: 'center' },
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stepBtn: { width: 48, height: 48, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  rowBetween: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 44, height: 44, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
});
