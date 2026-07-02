import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { signInEmail } from '@/stores/auth';
import { useSettings } from '@/stores/settings';

export default function LogIn() {
  const router = useRouter();
  const { colors } = useTheme();
  const finishOnboarding = useSettings((s) => s.finishOnboarding);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (loading) return;
    setError(null);
    setLoading(true);
    const { error: err } = await signInEmail(email.trim(), password);
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
            value={email}
            onChangeText={setEmail}
          />
          <Field
            label="Password"
            placeholder="••••••••"
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
          <Button label="Log in" loading={loading} fullWidth onPress={onSubmit} />
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
