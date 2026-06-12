import '@/global.css';
import '@/libs/sentry';

import { PortalHost } from '@rn-primitives/portal';
import * as Notifications from 'expo-notifications';
import { Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { PostHogProvider } from 'posthog-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useAppBootstrap } from '@/bootstrap/use-app-bootstrap';
import { useNotificationsInit } from '@/bootstrap/use-notifications-init';
import { useRevenueCatInit } from '@/bootstrap/use-revenuecat-init';
import { useScreenTracking } from '@/bootstrap/use-screen-tracking';
import { posthog } from '@/libs/posthog';
import { NOTIFICATION_HANDLER } from '@/shared/constants/notification';
import { NAV_THEME } from '@/shared/constants/theme';

export { ErrorBoundary } from 'expo-router';

Notifications.setNotificationHandler(NOTIFICATION_HANDLER);

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  const currentTheme = colorScheme === 'dark' ? NAV_THEME.dark : NAV_THEME.light;

  useAppBootstrap();
  useRevenueCatInit();
  useNotificationsInit();
  useScreenTracking();

  return (
    <GestureHandlerRootView className={colorScheme === 'dark' ? 'dark flex-1' : 'flex-1'}>
      <ThemeProvider value={currentTheme}>
        <PostHogProvider
          client={posthog}
          autocapture={{
            captureScreens: false,
            captureTouches: false,
          }}>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

          <Stack />

          <PortalHost />
        </PostHogProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
