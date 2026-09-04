import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';
import { baseUrl } from '@/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const route = '/cookie-settings';
  const url = (l: string) => `${baseUrl}/${l}${route}`;
  const selfUrl = url(locale);

  return {
    alternates: {
      canonical: selfUrl,
      languages: {
        zh: url('zh'),
        en: url('en'),
        pt: url('pt'),
        mwl: url('mwl'),
        'x-default': url('pt'),
      } as Record<string, string>,
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
