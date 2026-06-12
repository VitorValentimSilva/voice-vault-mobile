import authEnUs from './en-US/auth';
import commonEnUs from './en-US/common';
import errorEnUs from './en-US/error';
import uiEnUs from './en-US/ui';
import authPtBr from './pt-BR/auth';
import commonPtBr from './pt-BR/common';
import errorPtBr from './pt-BR/error';
import uiPtBr from './pt-BR/ui';

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
