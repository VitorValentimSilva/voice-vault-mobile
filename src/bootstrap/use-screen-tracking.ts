import { useGlobalSearchParams, usePathname } from 'expo-router';
import { useEffect, useRef } from 'react';

import { posthog } from '@/libs/posthog';

const SENSITIVE_PARAMS = new Set(['token', 'password', 'secret', 'code']);

function sanitizeParams(params: Record<string, unknown>) {
  return Object.entries(params).reduce<Record<string, string | string[]>>((acc, [key, value]) => {
    if (value == null) {
      return acc;
    }

    if (SENSITIVE_PARAMS.has(key)) {
      return acc;
    }

    acc[key] = Array.isArray(value) ? value.map(String) : String(value);

    return acc;
  }, {});
}

export function useScreenTracking() {
  const pathname = usePathname();
  const params = useGlobalSearchParams();

  const previousPathname = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (previousPathname.current === pathname) {
      return;
    }

    const safeParams = sanitizeParams(params);

    const screenProperties =
      previousPathname.current != null
        ? {
            ...safeParams,
            previous_screen: previousPathname.current,
          }
        : safeParams;

    posthog.screen(pathname, screenProperties);

    previousPathname.current = pathname;
  }, [pathname, params]);
}
