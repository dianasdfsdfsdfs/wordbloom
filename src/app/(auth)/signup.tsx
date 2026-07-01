import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { spacing } from '@/constants/theme';
import { useSettings } from '@/stores/settings';

export default function SignUp() {
  const router = useRouter();
  const finishOnboarding = useSettings((s) => s.finishOnboarding);

  return (
    <Screen edges={['top', 'bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingVertical: spacing.xxl, gap: spacing.xl }}>
        <View style={{ gap: spacing.sm }}>
          <Text variant="largeTitle">Create account</Text>
          <Text variant="body" color="textSecondary">
            Save your streak and sync across devices.
          </Text>
        </View>

        <View style={{ gap: spacing.lg }}>
          <Field label="Name" placeholder="Your name" autoCapitalize="words" />
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
          <Button label="Create account" fullWidth onPress={() => finishOnboarding()} />
          <Pressable onPress={() => router.replace('/login')} hitSlop={8} style={{ alignSelf: 'center' }}>
            <Text variant="small" color="textSecondary">
              Already have an account? <Text variant="small" color="brand">Log in</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}
