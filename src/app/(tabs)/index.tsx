import { View } from 'react-native';

import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { spacing } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'center', gap: spacing.sm }}>
        <Text variant="overline" color="brand">
          Wordbloom
        </Text>
        <Text variant="displayL">Grow your{'\n'}vocabulary.</Text>
        <Text variant="body" color="textSecondary">
          Your home dashboard is coming next — today’s bloom, streak, and study queue will live here.
        </Text>
      </View>
    </Screen>
  );
}
