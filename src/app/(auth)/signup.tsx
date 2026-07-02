import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { signUpEmail } from '@/stores/auth';
import { useSettings } from '@/stores/settings';

export default function SignUp() {
  const router = useRouter();
  const { colors } = useTheme();
  const finishOnboarding = useSettings((s) => s.finishOnboarding);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (loading) return;
    setError(null);
    setLoading(true);
    const { error: err } = await signUpEmail(email.trim(), password, name.trim() || undefined);
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    finishOnboarding();
  };

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
          <Field label="Name" placeholder="Your name" autoCapitalize="words" value={name} onChangeText={setName} />
          <Field
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
          <Field
            label="Password"
            placeholder="At least 6 characters"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {error ? (
            <Text variant="small" style={{ color: colors.danger }}>
              {error}
            </Text>
          ) : null}
        </View>

        <View style={{ gap: spacing.lg, marginTop: spacing.sm }}>
          <Button label="Create account" loading={loading} fullWidth onPress={onSubmit} />
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
