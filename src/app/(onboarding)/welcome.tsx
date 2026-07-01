import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Bloom } from '@/components/bloom';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { spacing } from '@/constants/theme';

export default function Welcome() {
  const router = useRouter();

  return (
    <Screen edges={['top', 'bottom']} style={styles.screen}>
      <View style={styles.hero}>
        <Bloom size={184} progress={0.7} />
        <View style={styles.copy}>
          <Text variant="overline" color="brand" center>
            Learn · Bloom · Remember
          </Text>
          <Text variant="heroWord" center>
            Wordbloom
          </Text>
          <Text variant="body" color="textSecondary" center style={styles.sub}>
            Learn a language one word at a time — with swipe cards and spaced repetition that make vocabulary stick.
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Button label="Get started" fullWidth onPress={() => router.push('/language')} />
        <Button
          label="I already have an account"
          variant="secondary"
          fullWidth
          onPress={() => router.push('/login')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { justifyContent: 'space-between' },
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  copy: { gap: spacing.sm, marginTop: spacing.xxl, alignItems: 'center' },
  sub: { paddingHorizontal: spacing.md, maxWidth: 340 },
  actions: { gap: spacing.sm, paddingBottom: spacing.md },
});
