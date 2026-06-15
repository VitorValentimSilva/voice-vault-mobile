import { router } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Icon } from '@/components/common/icon';
import { Background } from '@/components/screen/background';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function NotFoundScreen() {
  const { t } = useTranslation();

  const reduceMotion = useReducedMotion();
  const breathingScale = useSharedValue(1);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    breathingScale.value = withRepeat(
      withSequence(withTiming(1.025, { duration: 900 }), withTiming(1, { duration: 900 })),
      -1,
      true
    );
  }, [breathingScale, reduceMotion]);

  const breathingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: breathingScale.value }],
  }));

  const contentEntering = !reduceMotion ? FadeInUp.duration(500).delay(380) : undefined;
  const buttonsEntering = !reduceMotion ? FadeInUp.duration(500).delay(480) : undefined;

  return (
    <Background
      backgroundType="gradient"
      gradient="screenBackground"
      haveParticles
      haveGlow={false}>
      <View className="flex-1 items-center justify-center gap-3">
        <Icon size={110} decorative />

        <Animated.Text
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          className="text-6xl font-bold leading-none tracking-tighter text-primary"
          style={reduceMotion ? undefined : breathingStyle}>
          404
        </Animated.Text>

        <Animated.View
          {...(contentEntering ? { entering: contentEntering } : {})}
          className="items-center"
          accessibilityRole="alert"
          accessibilityLiveRegion="polite">
          <Text variant="h4" className="text-center">
            {t('screens.notFound.title')}
          </Text>

          <Text variant="muted" className="max-w-xs text-center">
            {t('screens.notFound.description')}
          </Text>
        </Animated.View>
      </View>

      <Animated.View
        {...(buttonsEntering ? { entering: buttonsEntering } : {})}
        className="w-full gap-4">
        <Button
          size="lg"
          onPress={() => router.replace('/')}
          accessibilityLabel={t('buttons.backToHome')}
          accessibilityHint={t('buttons.backToHomeHint')}>
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
          accessibilityLabel={t('buttons.goBack')}
          accessibilityHint={t('buttons.goBackHint')}>
          <Text>{t('buttons.goBack')}</Text>
        </Button>
      </Animated.View>
    </Background>
  );
}
