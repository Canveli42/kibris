const fs = require('fs');
const yol = require('path');
const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };

const IZLENEN = [
  'data/fiyat.js', 'data/shell.js',
  'data/regions.js', 'data/regions.en.js', 'data/regions.ru.js', 'data/ek.js',
  'pages/index.html', 'pages/en.html', 'pages/ru.html',
  'pages/fiyatlar.html', 'pages/en-fiyatlar.html', 'pages/ru-fiyatlar.html',
  'pages/hakkinda.html', 'pages/en-hakkinda.html', 'pages/ru-hakkinda.html',
  'pages/iletisim.html', 'pages/en-iletisim.html', 'pages/ru-iletisim.html',
  'pages/gizlilik.html', 'pages/en-gizlilik.html', 'pages/ru-gizlilik.html'
];

const bugun = () => new Date().toISOString().slice(0, 10);

const STATIC = (() => {
  let en = '2026-11-26';
  IZLENEN.forEach(f => {
    try {
      const t = fs.statSync(yol.join(process.cwd(), f)).mtime.toISOString().slice(0, 10);
      if (t > en) en = t;
    } catch (e) {}
  });
  const b = bugun();
  return en > b ? b : en;
})();

const DILLER = ['tr', 'en', 'ru'];
const REG = { tr: require('../data/regions.js'), en: require('../data/regions.en.js'), ru: require('../data/regions.ru.js') };

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const day = d => { const t = new Date(d); return isNaN(t) ? STATIC : t.toISOString().slice(0, 10); };

const REHBER = new Set([
  'fiyatlari','villa','nasil-cagrilir','rehberi','rehber','program','2-saat-program',
  '4-saat-program','gecelik-program','30-dakika','ilk-gorusme','lobi-mi-oda-mi','mitleri',
  'sabah-gorusmesi','vip-davet','turk-rus-farki','ulasim-ve-taksi','otelleri'
]);

const profilMi = slug => {
  const m = String(slug || '').match(/^([a-z-]+)-escort-(.+)$/);
  if (!m) return false;
  return !REHBER.has(m[2].replace(/-(19|20)\d{2}$/, ''));
};

const BOLGELER = [
  ['girne-escort','0.9'],['lefkosa-escort','0.8'],['magusa-escort','0.8'],['iskele-escort','0.8'],
  ['guzelyurt-escort','0.8'],['karaoglanoglu-escort','0.7'],['alsancak-escort','0.7'],['lapta-escort','0.7'],
  ['catalkoy-escort','0.7'],['bellapais-escort','0.7'],['esentepe-escort','0.7'],['long-beach-escort','0.7'],
  ['bafra-escort','0.7'],['gonyeli-escort','0.7'],['lefkosa-hamitkoy-escort','0.6'],['otele-escort','0.6'],
  ['eve-gelen-escort','0.6'],['gecelik-escort','0.6'],['vip-escort','0.6'],['ogrenci-escort','0.6'],
  ['turk-escort','0.6'],['rus-escort','0.6']
];

const HUBLAR = [
  ['girne','0.8'],['lefkosa','0.7'],['magusa','0.7'],['iskele','0.7'],['guzelyurt','0.6'],
  ['karaoglanoglu','0.6'],['alsancak','0.6'],['lapta','0.6'],['catalkoy','0.6'],['bellapais','0.6'],
  ['esentepe','0.6'],['long-beach','0.6'],['bafra','0.6'],['gonyeli','0.6']
];

const SLUG_OK = /^[a-z0-9-]{3,120}$/;
const kok = d => (d === 'tr' ? '/blog/' : '/' + d + '/blog/');
const kokB = d => (d === 'tr' ? '/' : '/' + d + '/');

const xmlGrup = g => {
  const varOlan = DILLER.filter(d => g.yollar[d]);
  const alt = varOlan.map(d => '<xhtml:link rel="alternate" hreflang="' + d + '" href="' + esc(g.yollar[d]) + '"/>').join('')
    + '<xhtml:link rel="alternate" hreflang="x-default" href="' + esc(g.yollar.tr || g.yollar[varOlan[0]]) + '"/>';
  return varOlan.map(d =>
    '<url><loc>' + esc(g.yollar[d]) + '</loc><lastmod>' + g.lastmod + '</lastmod><changefreq>' + g.freq +
    '</changefreq><priority>' + g.pri + '</priority>' + alt + '</url>').join('\n');
};

const BOT = /googlebot|bingbot|yandex|duckduckbot|baiduspider|slurp|applebot|petalbot|seznambot|semrush|ahrefs|screaming|mj12|curl|wget|python|axios|headless|facebookexternalhit|twitterbot/i;

const HTML_CSS = `*{box-sizing:border-box}
body{margin:0;background:#0b121b;color:#e9eef6;font:15px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;padding:24px 18px}
h1{font-family:Georgia,serif;font-size:22px;margin:0 0 6px;color:#fff}
p{color:#93a0b4;font-size:13.5px;margin:0 0 18px}
a{color:#f0d9ae;text-decoration:none;word-break:break-all}
li{margin:0 0 6px;padding:0 0 6px;border-bottom:1px solid rgba(216,184,120,.14);font-size:13.5px}
li span{color:#93a0b4;font-size:12px;margin-left:8px}
ol{margin:0;padding-left:20px}
@media(min-width:900px){ol{columns:2;column-gap:34px}li{break-inside:avoid}}`;

module.exports = async (req, res) => {
  const gruplar = [];
  const gorulen = new Set();
  let posts = [];
  let enSon = STATIC;

  try {
    const r = await fetch(
      SB + '/rest/v1/posts?select=slug,lang,created_at,updated_at&published=eq.true&or=(yayin_at.is.null,yayin_at.lte.now())&order=updated_at.desc&limit=2000',
      { headers: H }
    );
    if (r.ok) { const rows = await r.json(); posts = Array.isArray(rows) ? rows : []; }
  } catch (e) {}

  posts.forEach(p => {
    const t = p.updated_at || p.created_at;
    if (t) { const g = day(t); if (g > enSon) enSon = g; }
  });

  const ekle = (yollar, lastmod, freq, pri) => {
    const anahtar = Object.values(yollar)[0];
    if (gorulen.has(anahtar)) return;
    gorulen.add(anahtar);
    gruplar.push({ yollar, lastmod, freq, pri });
  };

  ekle({ tr: BASE + '/', en: BASE + '/en', ru: BASE + '/ru' }, enSon, 'weekly', '1.0');
  ekle({ tr: BASE + '/fiyatlar', en: BASE + '/en/fiyatlar', ru: BASE + '/ru/fiyatlar' }, STATIC, 'weekly', '0.9');
  ekle({ tr: BASE + '/blog', en: BASE + '/en/blog', ru: BASE + '/ru/blog' }, enSon, 'daily', '0.8');

  BOLGELER.forEach(b => {
    const yollar = {};
    DILLER.forEach(d => { if (REG[d][b[0]]) yollar[d] = BASE + kokB(d) + b[0]; });
    if (Object.keys(yollar).length) ekle(yollar, STATIC, 'weekly', b[1]);
  });

  HUBLAR.forEach(h => ekle({ tr: BASE + '/modeller/' + h[0] }, enSon, 'weekly', h[1]));

  const map = new Map();
  posts.forEach(p => {
    const slug = String(p.slug || '').trim();
    const d = String(p.lang || 'tr');
    if (!SLUG_OK.test(slug) || !DILLER.includes(d)) return;
    if (!map.has(slug)) map.set(slug, { yollar: {}, lastmod: STATIC });
    const g = map.get(slug);
    g.yollar[d] = BASE + kok(d) + slug;
    const t = day(p.updated_at || p.created_at || STATIC);
    if (t > g.lastmod) g.lastmod = t;
  });
  map.forEach((g, slug) => {
    const pri = profilMi(slug) ? '0.7' : '0.6';
    const freq = profilMi(slug) ? 'weekly' : 'monthly';
    ekle(g.yollar, g.lastmod, freq, pri);
  });

  ekle({ tr: BASE + '/hakkinda', en: BASE + '/en/hakkinda', ru: BASE + '/ru/hakkinda' }, STATIC, 'monthly', '0.5');
  ekle({ tr: BASE + '/iletisim', en: BASE + '/en/iletisim', ru: BASE + '/ru/iletisim' }, STATIC, 'monthly', '0.6');
  ekle({ tr: BASE + '/gizlilik', en: BASE + '/en/gizlilik', ru: BASE + '/ru/gizlilik' }, STATIC, 'yearly', '0.3');

  const ua = String((req.headers && req.headers['user-agent']) || '');

  if (!BOT.test(ua)) {
    const satir = gruplar.map(g => {
      const u = g.yollar.tr || g.yollar[Object.keys(g.yollar)[0]];
      return '<li><a href="' + esc(u) + '">' + esc(u) + '</a><span>' + g.lastmod + ' · ' + g.pri + '</span></li>';
    }).join('');
    const h = `<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Site haritası · ${gruplar.length} adres | RedKıbrıs</title>
<meta name="robots" content="noindex,follow">
<style>${HTML_CSS}</style></head><body>
<h1>Site haritası</h1>
<p>${gruplar.length} adres. Arama motorları bu sayfayı XML olarak görür.</p>
<ol>${satir}</ol>
</body></html>`;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=900, stale-while-revalidate=86400');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.status(200).send(h);
    return;
  }

  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
    + gruplar.map(xmlGrup).join('\n') + '\n</urlset>';

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=900, stale-while-revalidate=86400');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.status(200).send(xml);
};
