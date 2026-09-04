import { getMessages } from 'next-intl/server';

type Section = { id: string; title: string; content: string };

export default async function KnowledgeSection() {
  const messages = (await getMessages()) as any;
  const knowledge = messages?.knowledge;
  const sections: Section[] = Array.isArray(knowledge?.sections)
    ? knowledge.sections
    : [];
  const title: string = knowledge?.title || '';

  if (!sections.length) return null;

  return (
    <section id="context" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, i) => (
            <article
              key={section.id}
              className="rounded-xl p-6 md:col-span-1"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display text-xs font-semibold"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {section.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {section.content}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
