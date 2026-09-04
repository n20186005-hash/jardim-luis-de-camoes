import { getMessages, getTranslations } from 'next-intl/server';

type SourceLink = { name: string; url: string };

export default async function SourcesSection() {
  const t = await getTranslations('sources');
  const messages = (await getMessages()) as any;
  const links: SourceLink[] = Array.isArray(messages?.footer?.links)
    ? messages.footer.links
    : [];
  const photoCredit: string = messages?.footer?.photoCredit || '';

  return (
    <section id="sources" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="mb-8 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {t('note')}
        </p>

        <div
          className="rounded-xl p-6"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            {t('officialLabel')}
          </h3>
          <ul className="space-y-2">
            {links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-sm"
                  style={{ color: 'var(--accent)' }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <p
            className="mt-5 pt-4 text-xs border-t"
            style={{ color: 'var(--text-muted)', borderColor: 'var(--border-color)' }}
          >
            {t('lastUpdated')}
          </p>
        </div>

        {photoCredit && (
          <p className="mt-4 text-xs" style={{ color: 'var(--text-muted)' }}>
            {photoCredit}
          </p>
        )}
      </div>
    </section>
  );
}
