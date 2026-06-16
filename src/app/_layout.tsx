import '@/global.css';
import '@/libs/sentry';

import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import * as Notifications from 'expo-notifications';
import { useColorScheme } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { RootLayoutNav } from '@/components/root-layout-nav';
import i18n from '@/libs/i18n';
import { NOTIFICATION_HANDLER } from '@/shared/constants/notification';

export { ErrorBoundary } from 'expo-router';

Notifications.setNotificationHandler(NOTIFICATION_HANDLER);

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(i18n.t('clerk.missingPublishableKey'));
}

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  const clerkProps = tokenCache
    ? {
        publishableKey,
        tokenCache,
      }
    : {
        publishableKey,
      };

  return (
    <GestureHandlerRootView className={colorScheme === 'dark' ? 'dark flex-1' : 'flex-1'}>
      <ClerkProvider {...clerkProps}>
        <RootLayoutNav />
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
