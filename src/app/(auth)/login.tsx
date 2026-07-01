import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

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
        contentContainerStyle={{ paddingVertical: spacing.xxl, gap: spacing.xl }}>
        <View style={{ gap: spacing.sm }}>
          <Text variant="largeTitle">Welcome back</Text>
          <Text variant="body" color="textSecondary">
            Log in to continue your streak.
          </Text>
        </View>

        <View style={{ gap: spacing.lg }}>
          <Field
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Field label="Password" placeholder="••••••••" secureTextEntry />
        </View>

        <View style={{ gap: spacing.lg, marginTop: spacing.sm }}>
          <Button label="Log in" fullWidth onPress={() => finishOnboarding()} />
          <Pressable onPress={() => router.replace('/signup')} hitSlop={8} style={{ alignSelf: 'center' }}>
            <Text variant="small" color="textSecondary">
              New here? <Text variant="small" color="brand">Create an account</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}
