import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { baseUrl } from '@/config';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const ptUrl = `${baseUrl}/pt`;
  const mwlUrl = `${baseUrl}/mwl`;
  
  let selfUrl = zhUrl;
  if (locale === 'en') selfUrl = enUrl;
  else if (locale === 'pt') selfUrl = ptUrl;
  else if (locale === 'mwl') selfUrl = mwlUrl;

  const localeMap: Record<string, string> = {
    'zh': 'zh_CN',
    'en': 'en_US',
    'pt': 'pt_PT',
    'mwl': 'mwl',
  };

  const langTagMap: Record<string, string> = {
    zh: 'zh-CN',
    en: 'en',
    pt: 'pt-PT',
    mwl: 'mwl',
  };

  return {
    metadataBase: new URL(baseUrl),
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'pt': ptUrl,
        'mwl': mwlUrl,
        'x-default': ptUrl,
      } as Record<string, string>,
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: "Jardim Luís de Camões",
      locale: localeMap[locale] || 'pt_PT',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/gallery/jardim-luis-de-camoes-1.jpg`,
          width: 1200,
          height: 900,
          alt: 'Jardim Luís de Camões, Leiria, Portugal',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [`${baseUrl}/gallery/jardim-luis-de-camoes-1.jpg`],
    },
    other: {
      'og:image:alt': 'Jardim Luís de Camões, Leiria, Portugal',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const langMap: Record<string, string> = {
    'zh': 'zh-CN',
    'en': 'en',
    'pt': 'pt',
    'mwl': 'mwl',
  };

  const selfUrl = `${baseUrl}/${locale}`;
  const msg: any = messages;
  const metaTitle: string = msg?.meta?.title || 'Jardim Luís de Camões';
  const metaDescription: string = msg?.meta?.description || '';

  const langTagMap: Record<string, string> = {
    zh: 'zh-CN',
    en: 'en',
    pt: 'pt-PT',
    mwl: 'mwl',
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'Jardim Luís de Camões',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/icons/icon.svg`,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'Jardim Luís de Camões',
        description: metaTitle,
        inLanguage: ['pt-PT', 'en', 'zh-CN', 'mwl'],
        publisher: { '@id': `${baseUrl}/#organization` },
      },
      {
        '@type': 'WebPage',
        '@id': `${selfUrl}/#webpage`,
        url: selfUrl,
        name: metaTitle,
        description: metaDescription,
        inLanguage: langTagMap[locale] || 'pt-PT',
        isPartOf: { '@id': `${baseUrl}/#website` },
        about: { '@id': `${baseUrl}/#attraction` },
        dateModified: '2026-09-04',
      },
      {
        '@type': ['TouristAttraction', 'Park'],
        '@id': `${baseUrl}/#attraction`,
        name: 'Jardim Luís de Camões',
        description: metaDescription,
        url: selfUrl,
        image: `${baseUrl}/gallery/jardim-luis-de-camoes-1.jpg`,
        isAccessibleForFree: true,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Largo 5 de Outubro 48',
          addressLocality: 'Leiria',
          postalCode: '2400-137',
          addressRegion: 'Leiria',
          addressCountry: 'PT',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 39.7446309,
          longitude: -8.8063219,
        },
        telephone: '+351244839500',
        hasMap: 'https://maps.app.goo.gl/6WaNcoHmFRCSmj4s5',
        sameAs: ['https://maps.app.goo.gl/6WaNcoHmFRCSmj4s5'],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '00:00',
            closes: '23:59',
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.5',
          reviewCount: '6696',
          bestRating: '5',
        },
      },
    ],
  };

  return (
    <html lang={langMap[locale] || 'pt'} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="theme-color" content="#3a7a8d" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var GA_ID = 'G-HXM22WWPKP';
                function readConsent() {
                  try {
                    var p = JSON.parse(localStorage.getItem('cookiePrefs') || '{}');
                    return !!p.analytics;
                  } catch (e) { return false; }
                }
                function loadGA() {
                  if (window.__gaLoaded) return;
                  window.__gaLoaded = true;
                  var s = document.createElement('script');
                  s.async = true;
                  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
                  document.head.appendChild(s);
                  window.dataLayer = window.dataLayer || [];
                  window.gtag = function() { window.dataLayer.push(arguments); };
                  window.gtag('js', new Date());
                  window.gtag('config', GA_ID, { anonymize_ip: true });
                }
                if (readConsent()) {
                  loadGA();
                }
                window.addEventListener('consent-updated', function() {
                  if (readConsent()) loadGA();
                });
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').catch(function() {});
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
