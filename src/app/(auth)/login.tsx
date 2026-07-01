import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { spacing } from '@/constants/theme';
import { useSettings } from '@/stores/settings';

export default function LogIn() {
  const router = useRouter();
  const finishOnboarding = useSettings((s) => s.finishOnboarding);

  return (
    <Screen edges={['top', 'bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ gap: spacing.xl, paddingVertical: spacing.lg, flexGrow: 1 }}>
        <View style={{ gap: spacing.sm }}>
          <Text variant="displayM">Welcome back</Text>
          <Text variant="body" color="textSecondary">
            Log in to continue your streak.
          </Text>
        </View>

        <View style={{ gap: spacing.md }}>
          <Field
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Field label="Password" placeholder="••••••••" secureTextEntry />
        </View>

        <View style={{ gap: spacing.sm, marginTop: 'auto' }}>
          <Button label="Log in" fullWidth onPress={() => finishOnboarding()} />
          <Button
            label="Create an account"
            variant="ghost"
            fullWidth
            onPress={() => router.replace('/signup')}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
