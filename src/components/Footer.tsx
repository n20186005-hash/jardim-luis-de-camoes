import { useMessages, useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

type FooterLink = { name: string; url: string };

const fallbackLinks: FooterLink[] = [
  { name: 'Visit Portugal — Turismo de Portugal', url: 'https://www.visitportugal.com/pt-pt' },
  { name: 'Direção-Geral do Património Cultural', url: 'https://www.patrimoniocultural.gov.pt/' },
  { name: 'Turismo Centro de Portugal', url: 'https://www.centerofportugal.com/' },
  { name: 'Câmara Municipal de Leiria', url: 'https://www.cm-leiria.pt/' },
  { name: 'AIMA — Agência para a Integração, Migrações e Asilo', url: 'https://aima.gov.pt/pt' },
];

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const messages = useMessages() as any;
  const prefix = `/${locale}`;

  const links: FooterLink[] = Array.isArray(messages?.footer?.links)
    ? messages.footer.links
    : fallbackLinks;

  return (
    <footer
      className="py-12 px-4 sm:px-6"
      style={{ background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-color)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-display text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              Jardim Luís de Camões
            </h3>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              {t('officialResourcesTitle')}
            </p>
            <div className="flex flex-col gap-2">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-sm"
                  style={{ color: 'var(--accent)' }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm mt-4 sm:mt-0">
            <a href={`${prefix}/privacy-policy`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('privacy')}
            </a>
            <a href={`${prefix}/terms-of-service`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('terms')}
            </a>
            <a href={`${prefix}/cookie-settings`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('cookies')}
            </a>
          </div>
        </div>

        <div
          className="pt-6 text-center text-sm space-y-4"
          style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
        >
          {t('photoCredit') && (
            <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('photoCredit')}</p>
          )}
          <p>{t('rights')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
