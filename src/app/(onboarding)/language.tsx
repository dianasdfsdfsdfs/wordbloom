import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { OptionCard } from '@/components/ui/option-card';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { LANGUAGES, TARGET_LANGUAGES } from '@/constants/languages';
import { spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useSettings } from '@/stores/settings';
import type { LangCode } from '@/types/domain';

export default function LanguagePick() {
  const router = useRouter();
  const { colors } = useTheme();
  const setTargetLang = useSettings((s) => s.setTargetLang);
  const [selected, setSelected] = useState<LangCode | null>(null);

  const onContinue = () => {
    if (!selected) return;
    setTargetLang(selected);
    router.push('/level');
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <View style={{ gap: spacing.sm, paddingTop: spacing.md, paddingBottom: spacing.lg }}>
        <Text variant="overline" color="accent">
          Step 1 of 2
        </Text>
        <Text variant="displayM">What do you{'\n'}want to learn?</Text>
        <Text variant="body" color="textSecondary">
          Translations are shown in Russian.
        </Text>
      </View>

      <View style={{ flex: 1, gap: spacing.md }}>
        {TARGET_LANGUAGES.map((code) => (
          <OptionCard
            key={code}
            title={LANGUAGES[code].name}
            subtitle={LANGUAGES[code].endonym}
            leading={
              <Text variant="titleM" color="brand">
                {code.toUpperCase()}
              </Text>
            }
            selected={selected === code}
            onPress={() => setSelected(code)}
          />
        ))}
      </View>

      <View style={{ paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border }}>
        <Button label="Continue" fullWidth disabled={!selected} onPress={onContinue} />
      </View>
    </Screen>
  );
}
