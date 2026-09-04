import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jardim Luís de Camões — Guia do Visitante',
    short_name: 'Jardim Luís de Camões',
    description:
      'Guia informativo e gratuito do Jardim Luís de Camões em Leiria, Portugal: história, horário, como chegar e dicas de visita.',
    start_url: '/pt',
    scope: '/',
    display: 'standalone',
    background_color: '#faf8f4',
    theme_color: '#3a7a8d',
    lang: 'pt',
    icons: [
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
