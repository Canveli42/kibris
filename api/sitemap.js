const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };

const STATIC = '2026-11-20';

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

module.exports = async (req, res) => {
  const urls = [];
  let posts = [];
  let enSon = STATIC;

  try {
    const r = await fetch(
      SB + '/rest/v1/posts?select=*&published=eq.true&order=created_at.desc&limit=1000',
      { headers: H }
    );
    if (r.ok) {
      const rows = await r.json();
      posts = Array.isArray(rows) ? rows : [];
    }
  } catch (e) {}

  posts.forEach(p => {
    const t = p.updated_at || p.created_at;
    if (t && day(t) > enSon) enSon = day(t);
  });

  urls.push(u(BASE + '/', enSon, 'daily', '1.0'));
  urls.push(u(BASE + '/fiyatlar', STATIC, 'weekly', '0.9'));
  urls.push(u(BASE + '/blog', enSon, 'daily', '0.8'));

  BOLGELER.forEach(b => {
    urls.push(u(BASE + '/' + b[0], STATIC, 'weekly', b[1]));
  });

  posts.forEach(p => {
    const slug = p.slug || p.id;
    if (!slug) return;
    urls.push(u(
      BASE + '/blog/' + encodeURIComponent(slug),
      day(p.updated_at || p.created_at || STATIC),
      'monthly',
      '0.6'
    ));
  });

  urls.push(u(BASE + '/iletisim', STATIC, 'monthly', '0.6'));
  urls.push(u(BASE + '/gizlilik', STATIC, 'yearly', '0.3'));

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=1800, stale-while-revalidate=86400');
  res.status(200).send(
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.join('\n') + '\n</urlset>'
  );
};
