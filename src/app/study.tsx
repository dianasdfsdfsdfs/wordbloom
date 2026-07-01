import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function StudyScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <Screen edges={['top', 'bottom']}>
      <Pressable onPress={() => router.back()} hitSlop={10} style={{ alignSelf: 'flex-start' }}>
        <Feather name="x" size={26} color={colors.textPrimary} />
      </Pressable>
      <View style={{ flex: 1, justifyContent: 'center', gap: spacing.sm }}>
        <Text variant="overline" color="brand">
          Study
        </Text>
        <Text variant="displayL">Swipe deck</Text>
        <Text variant="body" color="textSecondary">
          The flashcard swipe experience arrives in Phase 2.
        </Text>
      </View>
    </Screen>
  );
}
