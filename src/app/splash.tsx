import { useAuth } from '@clerk/expo';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Animated, { FadeInUp, useReducedMotion } from 'react-native-reanimated';

import { Icon } from '@/components/common/icon';
import { Background } from '@/components/screen/background';
import WaveBarGroup from '@/components/screen/wave-bar-group';
import { Text } from '@/components/ui/text';
import { THEME } from '@/shared/constants/theme';

const MIN_HOLD_MS = 1200;

export default function SplashScreen() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const { isLoaded, isSignedIn } = useAuth();

  const [minHoldElapsed, setMinHoldElapsed] = useState(false);

  const reduceMotion = useReducedMotion();
  const theme = colorScheme === 'dark' ? THEME.dark : THEME.light;

  useEffect(() => {
    const timeout = setTimeout(() => setMinHoldElapsed(true), MIN_HOLD_MS);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isLoaded || !minHoldElapsed) {
      return;
    }

    router.replace(isSignedIn ? '/(protected)/(tabs)/home' : '/(auth)/sign-in');
  }, [isLoaded, minHoldElapsed, isSignedIn]);

  const animatedProps = !reduceMotion ? { entering: FadeInUp.duration(500).delay(380) } : {};

  return (
    <Background gradient="surface" haveParticles haveGlow glowColor={theme.mutedForeground}>
      <View className="flex-1 items-center justify-center">
        <Icon size={110} decorative />

        <WaveBarGroup />

        <Animated.View {...animatedProps} className="items-center">
          <Text variant="h4" className="text-center">
            {t('screens.splash.title')}
          </Text>

          <Text variant="muted" className="max-w-xs text-center">
            {t('screens.splash.description')}
          </Text>
        </Animated.View>
      </View>
    </Background>
  );
}
