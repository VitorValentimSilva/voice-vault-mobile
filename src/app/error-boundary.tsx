import { type ErrorBoundaryProps, router } from 'expo-router';
import { AlertTriangle, ChevronDown, ChevronUp, Home, RotateCcw } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { Background } from '@/components/screen/background';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { THEME } from '@/shared/constants/theme';

export default function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();

  const [showDetails, setShowDetails] = useState(false);

  const theme = colorScheme === 'dark' ? THEME.dark : THEME.light;

  return (
    <Background gradient="surface" haveParticles haveGlow glowColor={theme.recordingBg}>
      <View className="flex-1 items-center justify-center gap-6 px-2">
        <Animated.View entering={FadeInUp.duration(500)} className="items-center justify-center">
          <AlertTriangle size={48} strokeWidth={1.75} color={theme.recording} />
        </Animated.View>

        <Animated.View
          entering={FadeInUp.duration(500).delay(120)}
          className="items-center gap-2 px-2"
          accessibilityRole="alert"
          accessibilityLiveRegion="polite">
          <Text variant="h4" className="text-center text-recording">
            {t('screens.errorBoundary.title')}
          </Text>

          <Text variant="muted" className="max-w-xs text-center">
            {t('screens.errorBoundary.description')}
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.duration(500).delay(220)}
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
            <Text variant="muted" className="text-xs font-medium text-muted-foreground">
              {showDetails
                ? t('screens.errorBoundary.hideDetails')
                : t('screens.errorBoundary.showDetails')}
            </Text>

            {showDetails ? (
              <ChevronUp size={14} color={theme.mutedForeground} />
            ) : (
              <ChevronDown size={14} color={theme.mutedForeground} />
            )}
          </Pressable>

          {showDetails && (
            <ScrollView
              className="max-h-32 rounded-2xl border border-border bg-card p-3"
              accessibilityLabel={t('errorMessage')}>
              <Text variant="code" selectable className="text-muted-foreground">
                {error?.message ?? t('unknownError')}
              </Text>
            </ScrollView>
          )}
        </Animated.View>
      </View>

      <Animated.View entering={FadeInUp.duration(500).delay(320)} className="w-full gap-2.5 pb-2">
        <Button
          size="lg"
          onPress={retry}
          accessibilityLabel={t('buttons.retry')}
          accessibilityHint={t('buttons.retryHint')}>
          <RotateCcw size={18} color={theme.primaryForeground} />

          <Text>{t('buttons.retry')}</Text>
        </Button>

        <Button
          variant="outline"
          size="lg"
          onPress={() => router.replace('/')}
          accessibilityLabel={t('buttons.backToHome')}
          accessibilityHint={t('buttons.backToHomeHint')}>
          <Home size={18} color={theme.foreground} />

          <Text>{t('buttons.backToHome')}</Text>
        </Button>
      </Animated.View>
    </Background>
  );
}
