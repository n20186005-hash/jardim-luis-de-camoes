import { getLocale, getTranslations } from 'next-intl/server';

// Open-Meteo: free forecast API, no API key required (suitable for a non-profit site)
const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=39.7446309&longitude=-8.8063219' +
  '&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m' +
  '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
  '&timezone=Europe%2FLisbon&forecast_days=7';

type Forecast = {
  current?: {
    temperature_2m?: number;
    relative_humidity_2m?: number;
    apparent_temperature?: number;
    weather_code?: number;
    wind_speed_10m?: number;
    time?: string;
  };
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: (number | null)[];
  };
};

type WeatherGroup =
  | 'clear'
  | 'partly'
  | 'cloudy'
  | 'fog'
  | 'rain'
  | 'snow'
  | 'storm'
  | 'unknown';

const INTL_LOCALE: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en-GB',
  pt: 'pt-PT',
  mwl: 'pt-PT',
};

function codeToGroup(code: number | undefined): WeatherGroup {
  if (code === undefined) return 'unknown';
  if (code === 0) return 'clear';
  if (code === 1 || code === 2) return 'partly';
  if (code === 3) return 'cloudy';
  if (code === 45 || code === 48) return 'fog';
  if (code === 95 || code === 96 || code === 99) return 'storm';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  return 'unknown';
}

function safeIntl(locale: string, fallback: string): string {
  return INTL_LOCALE[locale] || fallback;
}

function formatDay(dateStr: string, locale: string): string {
  try {
    const d = new Date(`${dateStr}T00:00:00`);
    return new Intl.DateTimeFormat(safeIntl(locale, 'pt-PT'), {
      weekday: 'short',
      day: 'numeric',
    }).format(d);
  } catch {
    return dateStr;
  }
}

function formatTime(iso: string | undefined, locale: string): string {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat(safeIntl(locale, 'pt-PT'), {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function WeatherGlyph({ group, size = 30 }: { group: WeatherGroup; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (group) {
    case 'clear':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    case 'partly':
      return (
        <svg {...common}>
          <path d="M8.5 6a3.5 3.5 0 1 0-4.6 4.4" />
          <path d="M4 13.5h7" />
          <circle cx="14" cy="6.5" r="2.5" />
          <path d="M8 14h7.5a3 3 0 1 0-2.4-4.7" />
        </svg>
      );
    case 'cloudy':
      return (
        <svg {...common}>
          <path d="M7 18a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 16 7.5 3.8 3.8 0 0 1 17 15H7" />
        </svg>
      );
    case 'fog':
      return (
        <svg {...common}>
          <path d="M8 7a4 4 0 1 1 7.2 2.3" />
          <path d="M3 12h18M3 16h18M4 20h16" />
        </svg>
      );
    case 'rain':
      return (
        <svg {...common}>
          <path d="M7 15a4 4 0 0 1-.5-7.9A5.5 5.5 0 0 1 16 6.6 3.8 3.8 0 0 1 17 14" />
          <path d="M8 17.5l-1 2M13 17.5l-1 2M18 17.5l-1 2" />
        </svg>
      );
    case 'snow':
      return (
        <svg {...common}>
          <path d="M7 15a4 4 0 0 1-.5-7.9A5.5 5.5 0 0 1 16 6.6 3.8 3.8 0 0 1 17 14" />
          <path d="M7.5 18.5v1.5M12.5 18.5v1.5M17.5 18.5v1.5" />
        </svg>
      );
    case 'storm':
      return (
        <svg {...common}>
          <path d="M7 13a4 4 0 0 1-.5-7.9A5.5 5.5 0 0 1 16 6.6 3.8 3.8 0 0 1 17 13" />
          <path d="M12 13l-3 4h3.5l-2.5 4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
        </svg>
      );
  }
}

export default async function WeatherSection() {
  const locale = await getLocale();
  const t = await getTranslations('weather');
  const label = (g: WeatherGroup) => t(`labels.${g}` as never);

  let data: Forecast | null = null;
  try {
    const res = await fetch(WEATHER_URL, { cache: 'force-cache' });
    if (res.ok) {
      const json = (await res.json()) as Forecast;
      if (json && json.daily && json.current) data = json;
    }
  } catch {
    data = null;
  }

  if (!data) {
    return (
      <section id="weather" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('title')}
          </h2>
          <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
            {t('subtitle')}
          </p>
          <div
            className="rounded-xl p-6"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('unavailableTitle')}
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {t('unavailableText')}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const current = data.current!;
  const daily = data.daily!;
  const curGroup = codeToGroup(current.weather_code);
  const days = [];

  for (let i = 0; i < Math.min((daily.time || []).length, 7); i++) {
    days.push({
      time: daily.time![i],
      max: daily.temperature_2m_max?.[i] ?? 0,
      min: daily.temperature_2m_min?.[i] ?? 0,
      precip: daily.precipitation_probability_max?.[i] ?? null,
      code: daily.weather_code?.[i] ?? 0,
    });
  }

  const mainTemp = Math.round(Number(current.temperature_2m ?? 0));
  const feels = Math.round(Number(current.apparent_temperature ?? 0));
  const humidity = current.relative_humidity_2m;
  const wind = current.wind_speed_10m;
  const updated = formatTime(current.time, locale);

  return (
    <section id="weather" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current conditions */}
          <div
            className="rounded-xl p-6 lg:col-span-1"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
                {t('now')}
              </p>
              <span style={{ color: 'var(--accent)' }}>
                <WeatherGlyph group={curGroup} size={36} />
              </span>
            </div>
            <p
              className="font-display text-6xl font-semibold mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              {mainTemp}°
            </p>
            <p className="mb-5" style={{ color: 'var(--text-secondary)' }}>
              {label(curGroup)}
            </p>
            <div className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <div className="flex justify-between">
                <span>{t('feelsLike')}</span>
                <span style={{ color: 'var(--text-primary)' }}>{feels}°</span>
              </div>
              {typeof humidity === 'number' && (
                <div className="flex justify-between">
                  <span>{t('humidity')}</span>
                  <span style={{ color: 'var(--text-primary)' }}>{Math.round(humidity)}%</span>
                </div>
              )}
              {typeof wind === 'number' && (
                <div className="flex justify-between">
                  <span>{t('wind')}</span>
                  <span style={{ color: 'var(--text-primary)' }}>{Math.round(wind)} km/h</span>
                </div>
              )}
            </div>
            {updated && (
              <p
                className="mt-5 pt-4 text-xs border-t"
                style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
              >
                {t('updated')}: {updated}
              </p>
            )}
          </div>

          {/* 7-day forecast */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {days.map((d, i) => {
              const group = codeToGroup(d.code);
              return (
                <div
                  key={d.time}
                  className="rounded-xl p-4 flex flex-col"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    {i === 0 ? t('now') : formatDay(d.time, locale)}
                  </p>
                  <div className="mb-3" style={{ color: 'var(--accent)' }}>
                    <WeatherGlyph group={group} size={26} />
                  </div>
                  <p className="text-xs mb-1 truncate" style={{ color: 'var(--text-secondary)' }}>
                    {label(group)}
                  </p>
                  <p className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {Math.round(d.max)}°{' '}
                    <span className="text-sm font-normal" style={{ color: 'var(--text-secondary)' }}>
                      {Math.round(d.min)}°
                    </span>
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                    {d.precip === null || d.precip === undefined
                      ? '–'
                      : `${t('precip')} ${d.precip}%`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
