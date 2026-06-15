const ui = {
  screens: {
    notFound: {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.',
    },
    errorBoundary: {
      title: 'Something went wrong',
      description:
        'We encountered an unexpected issue. Please try again or go back to the home screen.',
      persistentErrorHint: 'If the problem persists, try restarting the app.',
      hideDetails: 'Hide technical details',
      showDetails: 'Show technical details',
      detailsHint: 'Displays the technical error message, useful for reporting to support',
    },
    splash: {
      title: 'Voice Vault',
      description: 'Protect your memories with security and privacy, using only your voice.',
    },
  },
} as const;

export default ui;
