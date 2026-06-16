const error = {
  libs: {
    i18n: {
      missingExpoEasProjectId: 'Expo EAS project ID is missing in the app configuration.',
    },
  },
  errorMessage: 'Error message',
  unknownError: 'Unknown error',
  clerk: {
    missingPublishableKey: 'Clerk Publishable Key is missing in the app configuration.',
  },
} as const;

export default error;
