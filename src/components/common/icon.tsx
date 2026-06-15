import { useColorScheme } from 'nativewind';
import { useId } from 'react';
import Animated, { FadeIn, useAnimatedStyle } from 'react-native-reanimated';
import {
  ClipPath,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Polyline,
  Rect,
  Stop,
  Svg,
} from 'react-native-svg';

import { THEME } from '@/shared/constants/theme';

export function Icon({ size = 96 }: { size?: number }) {
  const { colorScheme } = useColorScheme();

  const theme = colorScheme === 'dark' ? THEME.dark : THEME.light;

  const uniqueId = useId();

  const bgGradientId = `${uniqueId}-bg`;
  const waveGradientId = `${uniqueId}-wave`;

  const iconStyle = useAnimatedStyle(() => ({
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.38,
    shadowRadius: 20,
    elevation: 12,
  }));

  return (
    <Animated.View className="mb-5" entering={FadeIn.duration(700).delay(100)} style={iconStyle}>
      <Svg width={size} height={size} viewBox="0 0 120 120">
        <Defs>
          <ClipPath id={`${uniqueId}-clip`}>
            <Rect width="120" height="120" rx="28" />
          </ClipPath>

          <LinearGradient id={bgGradientId} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor={theme.logo.bgStart} />
            <Stop offset="100%" stopColor={theme.logo.bgEnd} />
          </LinearGradient>

          <LinearGradient id={waveGradientId} x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor={theme.logo.waveStart} />
            <Stop offset="100%" stopColor={theme.logo.waveEnd} />
          </LinearGradient>
        </Defs>

        <G clipPath={`url(#${uniqueId}-clip)`}>
          <Rect width="120" height="120" rx="28" fill={`url(#${bgGradientId})`} />

          <Ellipse cx="30" cy="22" rx="42" ry="30" fill={theme.logo.ellipseFill} />

          <Ellipse cx="60" cy="50" rx="34" ry="34" fill="rgba(255,255,255,0.04)" />

          <Rect
            x="42"
            y="24"
            width="36"
            height="44"
            rx="18"
            fill={theme.logo.shieldFill}
            stroke={theme.logo.shieldStroke}
            strokeWidth="2"
          />

          <Polyline
            points="
        48,47
        53,47
        57,38
        61,56
        65,40
        69,52
        73,47
      "
            fill="none"
            stroke={`url(#${waveGradientId})`}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <Path
            d="M60 68 L60 82"
            stroke={theme.logo.shieldStroke}
            strokeWidth="3"
            strokeLinecap="round"
          />

          <Path
            d="M48 88 H72"
            stroke={theme.logo.shieldStroke}
            strokeWidth="3"
            strokeLinecap="round"
          />

          <Path
            d="M38 62 C38 78 48 86 60 86 C72 86 82 78 82 62"
            fill="none"
            stroke={theme.logo.shieldStroke}
            strokeWidth="2"
            opacity="0.7"
          />
        </G>
      </Svg>
    </Animated.View>
  );
}
