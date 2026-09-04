import fs from 'node:fs';

const root = new URL('../out/', import.meta.url).pathname.replace(/^\//, '');
const locales = ['pt', 'mwl', 'en', 'zh'];
const probes = [
  ['GA4', 'G-HXM22WWPKP'],
  ['TouristAttraction', '"TouristAttraction"'],
  ['FAQPage', '"FAQPage"'],
  ['Organization', '"Organization"'],
  ['manifest link', 'href="/manifest.webmanifest"'],
  ['theme-color', 'name="theme-color" content="#3a7a8d"'],
  ['icon link', 'href="/icons/icon.svg"'],
  ['sw register', 'serviceWorker.register'],
  ['pb embed', '!1m18!1m12!1m3'],
  ['maps shortlink', '6WaNcoHmFRCSmj4s5'],
  ['phone row', '+351 244 839 500'],
  ['live weather wind', 'km/h'],
  ['sources section', 'id="sources"'],
  ['faq section', 'id="faq"'],
  ['weather section', 'id="weather"'],
  ['facilities section', 'id="facilities"'],
  ['knowledge section', 'id="context"'],
  ['photoCredit', 'photoCredit'],
  ['legacy monsaraz', 'Monsaraz'],
  ['legacy officialLinks', 'officialLinks'],
  ['legacy greatyarmouth', 'greatyarmouth'],
];

for (const l of locales) {
  const f = `${root}${l}.html`;
  const s = fs.readFileSync(f, 'utf8');
  const title = (s.match(/<title>([^<]*)<\/title>/) || [])[1];
  const h1m = s.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const h1 = h1m ? h1m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
  console.log(`\n=== ${l} (${(s.length / 1024).toFixed(0)} KB) ===`);
  console.log('title:', title ? title.slice(0, 80) : '(none)');
  console.log('h1:', h1.slice(0, 90));
  const neg = [];
  for (const [name, probe] of probes) {
    if (s.includes(probe)) console.log(`  [OK] ${name}`);
    else neg.push(name);
  }
  if (neg.length) console.log('  [MISSING]', neg.join(' | '));
}
