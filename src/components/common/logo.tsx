import { useColorScheme } from 'nativewind';
import { useId } from 'react';
import { Defs, Ellipse, LinearGradient, Path, Polyline, Rect, Stop, Svg } from 'react-native-svg';

import { THEME } from '@/shared/constants/theme';

interface LogoProps {
  size?: number;
}

export function Logo({ size = 96 }: LogoProps) {
  const { colorScheme } = useColorScheme();

  const logoTheme = colorScheme === 'dark' ? THEME.dark.logo : THEME.light.logo;

  const uniqueId = useId();

  const bgGradientId = `${uniqueId}-bg`;
  const waveGradientId = `${uniqueId}-wave`;

  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        <LinearGradient id={bgGradientId} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor={logoTheme.bgStart} />

          <Stop offset="100%" stopColor={logoTheme.bgEnd} />
        </LinearGradient>

        <LinearGradient id={waveGradientId} x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%" stopColor={logoTheme.waveStart} />

          <Stop offset="100%" stopColor={logoTheme.waveEnd} />
        </LinearGradient>
      </Defs>

      <Rect width="120" height="120" rx="28" fill={`url(#${bgGradientId})`} />

      <Ellipse cx="30" cy="22" rx="42" ry="30" fill={logoTheme.ellipseFill} />

      <Ellipse cx="60" cy="50" rx="34" ry="34" fill="rgba(255,255,255,0.04)" />

      <Rect
        x="42"
        y="24"
        width="36"
        height="44"
        rx="18"
        fill={logoTheme.shieldFill}
        stroke={logoTheme.shieldStroke}
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
        stroke={logoTheme.shieldStroke}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <Path d="M48 88 H72" stroke={logoTheme.shieldStroke} strokeWidth="3" strokeLinecap="round" />

      <Path
        d="M38 62 C38 78 48 86 60 86 C72 86 82 78 82 62"
        fill="none"
        stroke={logoTheme.shieldStroke}
        strokeWidth="2"
        opacity="0.7"
      />
    </Svg>
  );
}
