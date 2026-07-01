import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { OptionCard } from '@/components/ui/option-card';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { LEVEL_INFO } from '@/constants/languages';
import { spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useSettings } from '@/stores/settings';
import { CEFR_LEVELS, type CEFRLevel } from '@/types/domain';

export default function LevelPick() {
  const router = useRouter();
  const { colors } = useTheme();
  const setLevel = useSettings((s) => s.setLevel);
  const [selected, setSelected] = useState<CEFRLevel | null>(null);

  const onContinue = () => {
    if (!selected) return;
    setLevel(selected);
    router.push('/signup');
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <View style={{ gap: spacing.sm, paddingTop: spacing.md, paddingBottom: spacing.lg }}>
        <Text variant="overline" color="accent">
          Step 2 of 2
        </Text>
        <Text variant="displayM">Pick your level</Text>
        <Text variant="body" color="textSecondary">
          You can change this anytime.
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing.xl }}>
        {CEFR_LEVELS.map((lvl) => (
          <OptionCard
            key={lvl}
            title={LEVEL_INFO[lvl].name}
            subtitle={LEVEL_INFO[lvl].blurb}
            leading={
              <Text variant="titleM" color="brand">
                {lvl}
              </Text>
            }
            selected={selected === lvl}
            onPress={() => setSelected(lvl)}
          />
        ))}
      </ScrollView>

      <View style={{ paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border }}>
        <Button label="Continue" fullWidth disabled={!selected} onPress={onContinue} />
      </View>
    </Screen>
  );
}
