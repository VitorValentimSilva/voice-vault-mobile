const ui = {
  screens: {
    notFound: {
      title: 'Página Não Encontrada',
      description: 'A página que você está procurando não existe.',
    },
    errorBoundary: {
      title: 'Algo deu errado',
      description: 'Encontramos um problema inesperado. Tente novamente ou volte para o início.',
      persistentErrorHint: 'Se o problema continuar, tente reiniciar o app.',
      hideDetails: 'Ocultar detalhes técnicos',
      showDetails: 'Mostrar detalhes técnicos',
      detailsHint: 'Exibe a mensagem técnica do erro, útil para reportar ao suporte',
    },
    splash: {
      title: 'Voice Vault',
      description: 'Proteja suas memórias com segurança e privacidade, usando apenas sua voz.',
    },
  },
} as const;

export default ui;
