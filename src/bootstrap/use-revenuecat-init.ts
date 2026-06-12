import { useEffect } from 'react';
import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';

export function useRevenueCatInit() {
  useEffect(() => {
    Purchases.setLogLevel(__DEV__ ? LOG_LEVEL.VERBOSE : LOG_LEVEL.ERROR);

    const apiKey =
      Platform.OS === 'ios'
        ? (process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY ?? '')
        : (process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY ?? '');

    if (apiKey && !Purchases.isConfigured()) {
      Purchases.configure({ apiKey });
    }
  }, []);
}
