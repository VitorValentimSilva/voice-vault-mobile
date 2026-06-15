import { LinearGradient } from 'expo-linear-gradient';
import { SplashScreen } from 'expo-router';
import { cssInterop, useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { View } from 'react-native';
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

type BackgroundProps = {
  children: React.ReactNode;
  haveParticles?: boolean;
  haveGlow?: boolean;
  glowColor?: string;
  backgroundType?: 'gradient' | 'solid';
  gradient?: GradientKey;
  backgroundColor?: string;
};

export function Background({
  children,
  haveParticles = false,
  haveGlow = false,
  glowColor,
  backgroundType = 'gradient',
  gradient = 'screenBackground',
  backgroundColor,
}: BackgroundProps) {
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

  const contentStyle = {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: insets.top + 24,
    paddingBottom: insets.bottom + 24,
  };

  const overlay = (
    <>
      {(haveGlow || haveParticles) && (
        <Animated.View
          pointerEvents="none"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          className="absolute inset-0">
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
        </Animated.View>
      )}

      {children}
    </>
  );

  return (
    <Animated.View className="flex-1" style={screenStyle}>
      {backgroundType === 'gradient' ? (
        <LinearGradient
          className="flex-1"
          colors={theme.gradients[gradient]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={contentStyle}>
          {overlay}
        </LinearGradient>
      ) : (
        <View
          className="flex-1"
          style={{
            ...contentStyle,
            backgroundColor: backgroundColor ?? theme.background,
          }}>
          {overlay}
        </View>
      )}
    </Animated.View>
  );
}
