import { useColorScheme } from 'nativewind';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { Icon } from '@/components/common/icon';
import { Background } from '@/components/screen/background';
import WaveBarGroup from '@/components/screen/wave-bar-group';
import { Text } from '@/components/ui/text';
import { THEME } from '@/shared/constants/theme';

export default function SplashScreen() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();

  const theme = colorScheme === 'dark' ? THEME.dark : THEME.light;

  return (
    <Background gradient="surface" haveParticles haveGlow glowColor={theme.mutedForeground}>
      <View className="flex-1 items-center justify-center">
        <Icon size={110} />

        <WaveBarGroup />

        <Animated.View entering={FadeInUp.duration(500).delay(380)} className="items-center">
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
