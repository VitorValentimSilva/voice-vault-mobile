import { LinearGradient } from 'expo-linear-gradient';
import { SplashScreen } from 'expo-router';
import { cssInterop, useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ParticleGroup } from '@/components/screen/particle-group';
import { THEME } from '@/shared/constants/theme';
import { GradientKey } from '@/shared/types/theme';

cssInterop(LinearGradient, {
  className: 'style',
});

export function ParticleBackground({
  children,
  gradient,
  haveParticles,
  haveGlow,
  glowColor,
}: {
  children: React.ReactNode;
  gradient: GradientKey;
  haveParticles: boolean;
  haveGlow: boolean;
  glowColor?: string;
}) {
  const { colorScheme } = useColorScheme();

  const insets = useSafeAreaInsets();
  const theme = colorScheme === 'dark' ? THEME.dark : THEME.light;

  const screenOpacity = useSharedValue(1);
  const glowOpacity = useSharedValue(0);
  const glowScale = useSharedValue(1);

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});

    glowOpacity.value = withDelay(
      200,
      withRepeat(
        withSequence(withTiming(0.12, { duration: 1800 }), withTiming(0.07, { duration: 1800 })),
        -1,
        true
      )
    );

    glowScale.value = withDelay(
      200,
      withRepeat(
        withSequence(withTiming(1.1, { duration: 1800 }), withTiming(0.95, { duration: 1800 })),
        -1,
        true
      )
    );
  }, [glowOpacity, glowScale]);

  const screenStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    width: 255,
    height: 255,
    opacity: glowOpacity.value,
    transform: [{ translateY: -133 }, { scale: glowScale.value }],
  }));

  return (
    <Animated.View className="flex-1" style={screenStyle}>
      <LinearGradient
        className="flex-1 px-6"
        colors={theme.gradients[gradient]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={{
          paddingTop: insets.top + 24,
          paddingBottom: insets.bottom + 24,
        }}>
        {haveGlow && (
          <Animated.View
            className="absolute top-1/2 self-center rounded-full"
            style={[
              glowStyle,
              {
                backgroundColor: glowColor ?? theme.foreground,
              },
            ]}
          />
        )}

        {haveParticles && <ParticleGroup />}

        {children}
      </LinearGradient>
    </Animated.View>
  );
}
