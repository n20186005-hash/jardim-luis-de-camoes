'use client';

import { useMessages, useTranslations } from 'next-intl';

type FacilityItem = { title: string; desc: string };

export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const messages = useMessages() as any;
  const items: FacilityItem[] = Array.isArray(messages?.facilities?.items)
    ? messages.facilities.items
    : [];

  return (
    <section id="facilities" className="section-padding">
      <div className="max-w-5xl mx-auto">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="rounded-xl p-5 flex gap-4 items-start"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-semibold"
                style={{ background: 'var(--accent)', color: 'white' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-8 rounded-xl p-5 flex items-start gap-4"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            className="flex-shrink-0 mt-0.5"
          >
            <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('neutralNote')}
          </p>
        </div>
      </div>
    </section>
  );
}
