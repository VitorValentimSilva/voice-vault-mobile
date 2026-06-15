import * as Sentry from '@sentry/react-native';
import { type ErrorBoundaryProps, router } from 'expo-router';
import { AlertTriangle, ChevronDown, ChevronUp, Home, RotateCcw } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, View } from 'react-native';
import Animated, { FadeInUp, useReducedMotion } from 'react-native-reanimated';

import { Background } from '@/components/screen/background';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { THEME } from '@/shared/constants/theme';

export default function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();

  const [showDetails, setShowDetails] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const reduceMotion = useReducedMotion();
  const reportedErrorRef = useRef<Error | null>(null);
  const theme = colorScheme === 'dark' ? THEME.dark : THEME.light;

  useEffect(() => {
    if (reportedErrorRef.current === error) {
      return;
    }

    reportedErrorRef.current = error;

    if (__DEV__) {
      console.error('[ErrorBoundary]', error);
    }

    Sentry.captureException(error, {
      tags: { area: 'error-boundary' },
      extra: { retryCount },
    });
  }, [error, retryCount]);

  const handleRetry = () => {
    setRetryCount((count) => count + 1);

    retry();
  };

  const iconEntering = !reduceMotion ? FadeInUp.duration(500) : null;
  const contentEntering = !reduceMotion ? FadeInUp.duration(500).delay(380) : null;
  const detailsEntering = !reduceMotion ? FadeInUp.duration(500).delay(220) : null;
  const buttonsEntering = !reduceMotion ? FadeInUp.duration(500).delay(320) : null;

  return (
    <Background gradient="surface" haveParticles haveGlow glowColor={theme.recordingBg}>
      <View className="flex-1 items-center justify-center gap-3">
        <Animated.View
          {...(iconEntering && { entering: iconEntering })}
          className="items-center justify-center">
          <Icon as={AlertTriangle} size={48} strokeWidth={1.75} color={theme.recording} />
        </Animated.View>

        <Animated.View
          {...(contentEntering && { entering: contentEntering })}
          className="items-center gap-1"
          accessibilityRole="alert"
          accessibilityLiveRegion="polite">
          <Text variant="h4" className="text-center text-recording">
            {t('screens.errorBoundary.title')}
          </Text>

          <Text variant="muted" className="max-w-xs text-center">
            {t('screens.errorBoundary.description')}
          </Text>

          {retryCount >= 2 && (
            <Text variant="muted" className="mt-1 max-w-xs text-center text-xs">
              {t('screens.errorBoundary.persistentErrorHint')}
            </Text>
          )}
        </Animated.View>

        <Animated.View
          {...(detailsEntering && { entering: detailsEntering })}
          className="w-full max-w-sm gap-2">
          <Pressable
            onPress={() => setShowDetails((prev) => !prev)}
            accessibilityRole="button"
            accessibilityState={{ expanded: showDetails }}
            accessibilityLabel={
              showDetails
                ? t('screens.errorBoundary.hideDetails')
                : t('screens.errorBoundary.showDetails')
            }
            accessibilityHint={t('screens.errorBoundary.detailsHint')}
            className="flex-row items-center justify-center gap-1.5 py-2">
            <Text variant="muted" className="text-xs font-medium">
              {showDetails
                ? t('screens.errorBoundary.hideDetails')
                : t('screens.errorBoundary.showDetails')}
            </Text>

            <Icon as={showDetails ? ChevronUp : ChevronDown} size={14} color={theme.muted} />
          </Pressable>

          {showDetails && (
            <ScrollView
              className="max-h-32 rounded-2xl border border-border bg-card p-2"
              accessibilityLabel={t('errorMessage')}>
              <Text variant="code" selectable className="text-muted-foreground">
                {error?.message ?? t('unknownError')}
              </Text>
            </ScrollView>
          )}
        </Animated.View>
      </View>

      <Animated.View
        {...(buttonsEntering && { entering: buttonsEntering })}
        className="w-full gap-4">
        <Button
          size="lg"
          onPress={handleRetry}
          accessibilityLabel={t('buttons.retry')}
          accessibilityHint={t('buttons.retryHint')}>
          <Icon as={RotateCcw} size={18} color={theme.primaryForeground} />

          <Text>{t('buttons.retry')}</Text>
        </Button>

        <Button
          variant="secondary"
          size="lg"
          onPress={() => router.replace('/')}
          accessibilityLabel={t('buttons.backToHome')}
          accessibilityHint={t('buttons.backToHomeHint')}>
          <Icon as={Home} size={18} color={theme.foreground} />

          <Text>{t('buttons.backToHome')}</Text>
        </Button>
      </Animated.View>
    </Background>
  );
}
