import { View } from 'react-native';

import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { spacing } from '@/constants/theme';

export default function SettingsScreen() {
  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'center', gap: spacing.sm }}>
        <Text variant="overline" color="accent">
          You
        </Text>
        <Text variant="displayL">Settings</Text>
        <Text variant="body" color="textSecondary">
          Theme, language pair, daily goal, and account controls will live here.
        </Text>
      </View>
    </Screen>
  );
}
