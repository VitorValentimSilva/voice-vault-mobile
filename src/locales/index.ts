import authEnUs from '@/locales/en-US/auth';
import commonEnUs from '@/locales/en-US/common';
import errorEnUs from '@/locales/en-US/error';
import uiEnUs from '@/locales/en-US/ui';
import authPtBr from '@/locales/pt-BR/auth';
import commonPtBr from '@/locales/pt-BR/common';
import errorPtBr from '@/locales/pt-BR/error';
import uiPtBr from '@/locales/pt-BR/ui';

export const resources = {
  'en-US': {
    translation: {
      ...commonEnUs,
      ...authEnUs,
      ...uiEnUs,
      ...errorEnUs,
    },
  },
  'pt-BR': {
    translation: {
      ...commonPtBr,
      ...authPtBr,
      ...uiPtBr,
      ...errorPtBr,
    },
  },
} as const;
