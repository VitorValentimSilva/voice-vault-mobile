import { PortalHost } from '@rn-primitives/portal';
import { Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { PostHogProvider } from 'posthog-react-native';

import SplashScreen from '@/app/splash';
import { useAppBootstrap } from '@/bootstrap/use-app-bootstrap';
import { useNotificationsInit } from '@/bootstrap/use-notifications-init';
import { useRevenueCatInit } from '@/bootstrap/use-revenuecat-init';
import { useScreenTracking } from '@/bootstrap/use-screen-tracking';
import { posthog } from '@/libs/posthog';
import { NAV_THEME } from '@/shared/constants/theme';

export function RootLayoutNav() {
  const { colorScheme } = useColorScheme();

  const currentTheme = colorScheme === 'dark' ? NAV_THEME.dark : NAV_THEME.light;
  const isReady = useAppBootstrap();

  useRevenueCatInit();
  useNotificationsInit();
  useScreenTracking();

  if (!isReady) {
    return <SplashScreen />;
  }

  return (
    <ThemeProvider value={currentTheme}>
      <PostHogProvider
        client={posthog}
        autocapture={{
          captureScreens: false,
          captureTouches: false,
        }}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

        <PortalHost />

        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
      </PostHogProvider>
    </ThemeProvider>
  );
}
