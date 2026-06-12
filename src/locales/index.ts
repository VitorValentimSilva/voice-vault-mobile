import authEnUs from './en-US/auth';
import commonEnUs from './en-US/common';
import uiEnUs from './en-US/ui';
import authPtBr from './pt-BR/auth';
import commonPtBr from './pt-BR/common';
import uiPtBr from './pt-BR/ui';

export const resources = {
  'en-US': {
    translation: {
      ...commonEnUs,
      ...authEnUs,
      ...uiEnUs,
    },
  },
  'pt-BR': {
    translation: {
      ...commonPtBr,
      ...authPtBr,
      ...uiPtBr,
    },
  },
} as const;
