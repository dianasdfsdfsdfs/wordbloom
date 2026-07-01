import { View } from 'react-native';

import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { spacing } from '@/constants/theme';

export default function StatsScreen() {
  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'center', gap: spacing.sm }}>
        <Text variant="overline" color="accent">
          Progress
        </Text>
        <Text variant="displayL">Stats</Text>
        <Text variant="body" color="textSecondary">
          Charts for words learned over time, accuracy, and your streak calendar are coming soon.
        </Text>
      </View>
    </Screen>
  );
}
