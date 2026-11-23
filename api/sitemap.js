const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };

const STATIC = '2026-11-23';

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const day = d => {
  const t = new Date(d);
  return isNaN(t) ? STATIC : t.toISOString().slice(0, 10);
};

const u = (loc, lastmod, freq, pri) =>
  '<url><loc>' + esc(loc) + '</loc><lastmod>' + lastmod +
  '</lastmod><changefreq>' + freq + '</changefreq><priority>' + pri + '</priority></url>';

const uDil = (loc, lastmod, pri) =>
  '<url><loc>' + esc(loc) + '</loc><lastmod>' + lastmod +
  '</lastmod><changefreq>weekly</changefreq><priority>' + pri + '</priority>' +
  '<xhtml:link rel="alternate" hreflang="tr" href="' + esc(BASE + '/') + '"/>' +
  '<xhtml:link rel="alternate" hreflang="en" href="' + esc(BASE + '/en') + '"/>' +
  '<xhtml:link rel="alternate" hreflang="ru" href="' + esc(BASE + '/ru') + '"/>' +
  '<xhtml:link rel="alternate" hreflang="x-default" href="' + esc(BASE + '/') + '"/>' +
  '</url>';

const BOLGELER = [
  ['girne-escort', '0.9'],
  ['lefkosa-escort', '0.8'],
  ['magusa-escort', '0.8'],
  ['iskele-escort', '0.8'],
  ['guzelyurt-escort', '0.8'],
  ['karaoglanoglu-escort', '0.7'],
  ['alsancak-escort', '0.7'],
  ['lapta-escort', '0.7'],
  ['catalkoy-escort', '0.7'],
  ['bellapais-escort', '0.7'],
  ['esentepe-escort', '0.7'],
  ['long-beach-escort', '0.7'],
  ['bafra-escort', '0.7'],
  ['gonyeli-escort', '0.7'],
  ['otele-escort', '0.6'],
  ['eve-gelen-escort', '0.6'],
  ['gecelik-escort', '0.6'],
  ['vip-escort', '0.6'],
  ['ogrenci-escort', '0.6'],
  ['turk-escort', '0.6'],
  ['rus-escort', '0.6']
];

const SLUG_OK = /^[a-z0-9-]{3,120}$/;

module.exports = async (req, res) => {
  const urls = [];
  const gorulen = new Set();
  let posts = [];
  let enSon = STATIC;

  try {
    const r = await fetch(
      SB + '/rest/v1/posts?select=slug,created_at,updated_at&published=eq.true&order=updated_at.desc&limit=2000',
      { headers: H }
    );
    if (r.ok) {
      const rows = await r.json();
      posts = Array.isArray(rows) ? rows : [];
    }
  } catch (e) {}

  posts.forEach(p => {
    const t = p.updated_at || p.created_at;
    if (t) {
      const g = day(t);
      if (g > enSon) enSon = g;
    }
  });

  const ekle = (loc, lastmod, freq, pri) => {
    if (gorulen.has(loc)) return;
    gorulen.add(loc);
    urls.push(u(loc, lastmod, freq, pri));
  };

  const ekleDil = (loc, pri) => {
    if (gorulen.has(loc)) return;
    gorulen.add(loc);
    urls.push(uDil(loc, enSon, pri));
  };

  ekleDil(BASE + '/', '1.0');
  ekleDil(BASE + '/en', '0.9');
  ekleDil(BASE + '/ru', '0.9');

  ekle(BASE + '/fiyatlar', STATIC, 'weekly', '0.9');
  ekle(BASE + '/blog', enSon, 'daily', '0.8');

  BOLGELER.forEach(b => {
    ekle(BASE + '/' + b[0], STATIC, 'weekly', b[1]);
  });

  posts.forEach(p => {
    const slug = String(p.slug || '').trim();
    if (!SLUG_OK.test(slug)) return;
    ekle(
      BASE + '/blog/' + slug,
      day(p.updated_at || p.created_at || STATIC),
      'monthly',
      '0.6'
    );
  });

  ekle(BASE + '/iletisim', STATIC, 'monthly', '0.6');
  ekle(BASE + '/gizlilik', STATIC, 'yearly', '0.3');

  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    urls.join('\n') + '\n</urlset>';

  res.writeHead(200, {
    'Content-Type': 'application/xml; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400'
  });
  res.end(xml);
};
