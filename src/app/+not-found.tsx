import { router, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { ParticleBackground } from '@/components/background/particle-background';
import { Icon } from '@/components/common/icon';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function NotFoundScreen() {
  const { t } = useTranslation();

  const breathingScale = useSharedValue(1);

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});

    breathingScale.value = withRepeat(
      withSequence(withTiming(1.025, { duration: 900 }), withTiming(1, { duration: 900 })),
      -1,
      true
    );
  }, [breathingScale]);

  const breathingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: breathingScale.value }],
  }));

  return (
    <ParticleBackground gradient="screenBackground" haveParticles haveGlow={false}>
      <View className="flex-1 items-center justify-center">
        <Icon size={110} />

        <Animated.Text
          className="text-6xl font-bold leading-none tracking-tighter text-primary"
          style={breathingStyle}>
          404
        </Animated.Text>

        <Animated.View
          entering={FadeInUp.duration(500).delay(380)}
          className="mt-1 items-center gap-2 px-2">
          <Text className="text-center text-[22px] font-semibold leading-8 text-foreground">
            {t('screens.notFound.title')}
          </Text>

          <Text className="max-w-xs text-center text-sm leading-6 text-muted-foreground">
            {t('screens.notFound.description')}
          </Text>
        </Animated.View>
      </View>

      <Animated.View entering={FadeInUp.duration(500).delay(480)} className="gap-4">
        <Button
          size="lg"
          onPress={() => router.replace('/')}
          accessibilityLabel={t('buttons.backToHome')}>
          <Text>{t('buttons.backToHome')}</Text>
        </Button>

        <Button
          variant="secondary"
          size="lg"
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/');
            }
          }}
          accessibilityLabel={t('buttons.goBack')}>
          <Text>{t('buttons.goBack')}</Text>
        </Button>
      </Animated.View>
    </ParticleBackground>
  );
}
