import { getMessages, getTranslations } from 'next-intl/server';

type FaqItem = { q: string; a: string };

export default async function FAQSection() {
  const t = await getTranslations('faq');
  const messages = (await getMessages()) as any;
  const items: FaqItem[] = Array.isArray(messages?.faq?.items) ? messages.faq.items : [];

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="section-padding"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-4xl mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="mb-10" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>

        <div className="space-y-4">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl overflow-hidden"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <summary
                className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                <span>{item.q}</span>
                <span
                  className="flex-shrink-0 transition-transform duration-200 group-open:rotate-45"
                  style={{ color: 'var(--accent)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
