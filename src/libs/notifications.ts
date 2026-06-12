import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import i18n from '@/libs/i18n';

export async function configureNotificationChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: i18n.t('notifications.channel.name'),
      importance: Notifications.AndroidImportance.MAX,
    });
  }
}

export async function requestNotificationPermission() {
  const current = await Notifications.getPermissionsAsync();

  if (current.status === 'granted') {
    return true;
  }

  const requested = await Notifications.requestPermissionsAsync();

  return requested.status === 'granted';
}

export async function getPushToken() {
  const projectId = Constants.expoConfig?.extra?.eas?.projectId;

  if (!projectId) {
    throw new Error(i18n.t('libs.i18n.missingExpoEasProjectId'));
  }

  const token = await Notifications.getExpoPushTokenAsync({ projectId });

  return token.data;
}
