import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { OptionCard } from '@/components/ui/option-card';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { LEVEL_INFO } from '@/constants/languages';
import { spacing } from '@/constants/theme';
import { useSettings } from '@/stores/settings';
import { CEFR_LEVELS, type CEFRLevel } from '@/types/domain';

export default function LevelPick() {
  const router = useRouter();
  const setLevel = useSettings((s) => s.setLevel);
  const [selected, setSelected] = useState<CEFRLevel | null>(null);

  const onContinue = () => {
    if (!selected) return;
    setLevel(selected);
    router.push('/signup');
  };

  return (
    <Screen edges={['top', 'bottom']} style={{ justifyContent: 'space-between' }}>
      <View style={{ flex: 1, gap: spacing.lg }}>
        <View style={{ gap: spacing.sm, marginTop: spacing.lg }}>
          <Text variant="overline" color="accent">
            Step 2 of 2
          </Text>
          <Text variant="displayM">Pick your level</Text>
          <Text variant="body" color="textSecondary">
            You can change this anytime.
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing.md }}>
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
      </View>

      <Button
        label="Continue"
        fullWidth
        disabled={!selected}
        onPress={onContinue}
        style={{ marginBottom: spacing.md }}
      />
    </Screen>
  );
}
