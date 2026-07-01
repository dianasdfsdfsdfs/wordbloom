import { View } from 'react-native';

import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { spacing } from '@/constants/theme';

export default function LevelsScreen() {
  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'center', gap: spacing.sm }}>
        <Text variant="overline" color="accent">
          Collections
        </Text>
        <Text variant="displayL">Levels</Text>
        <Text variant="body" color="textSecondary">
          The A1 → C2 ladder with per-level bloom progress is on the way.
        </Text>
      </View>
    </Screen>
  );
}
