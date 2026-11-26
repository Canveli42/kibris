const fs = require('fs');
const yol = require('path');
const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };

// statik sayfaların lastmod'u: içeriği belirleyen dosyaların en yeni değişim tarihi
const IZLENEN = [
  'data/fiyat.js', 'data/shell.js',
  'data/regions.js', 'data/regions.en.js', 'data/regions.ru.js',
  'pages/index.html', 'pages/en.html', 'pages/ru.html',
  'pages/fiyatlar.html', 'pages/en-fiyatlar.html', 'pages/ru-fiyatlar.html',
  'pages/hakkinda.html', 'pages/en-hakkinda.html', 'pages/ru-hakkinda.html',
  'pages/iletisim.html', 'pages/en-iletisim.html', 'pages/ru-iletisim.html',
  'pages/gizlilik.html', 'pages/en-gizlilik.html', 'pages/ru-gizlilik.html'
];

const bugun = () => new Date().toISOString().slice(0, 10);

const STATIC = (() => {
  let en = '2026-11-25';
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

const REG = {
  tr: require('../data/regions.js'),
  en: require('../data/regions.en.js'),
  ru: require('../data/regions.ru.js')
};

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const day = d => { const t = new Date(d); return isNaN(t) ? STATIC : t.toISOString().slice(0, 10); };

const BOLGELER = [
  ['girne-escort', '0.9'], ['lefkosa-escort', '0.8'], ['magusa-escort', '0.8'],
  ['iskele-escort', '0.8'], ['guzelyurt-escort', '0.8'], ['karaoglanoglu-escort', '0.7'],
  ['alsancak-escort', '0.7'], ['lapta-escort', '0.7'], ['catalkoy-escort', '0.7'],
  ['bellapais-escort', '0.7'], ['esentepe-escort', '0.7'], ['long-beach-escort', '0.7'],
  ['bafra-escort', '0.7'], ['gonyeli-escort', '0.7'], ['lefkosa-hamitkoy-escort', '0.6'],
  ['otele-escort', '0.6'], ['eve-gelen-escort', '0.6'], ['gecelik-escort', '0.6'],
  ['vip-escort', '0.6'], ['ogrenci-escort', '0.6'], ['turk-escort', '0.6'], ['rus-escort', '0.6']
];

const SLUG_OK = /^[a-z0-9-]{3,120}$/;

const kok = d => (d === 'tr' ? '/blog/' : '/' + d + '/blog/');
const kokB = d => (d === 'tr' ? '/' : '/' + d + '/');

const xmlGrup = (g) => {
  const alt = DILLER.filter(d => g.yollar[d])
    .map(d => '<xhtml:link rel="alternate" hreflang="' + d + '" href="' + esc(g.yollar[d]) + '"/>').join('') +
    '<xhtml:link rel="alternate" hreflang="x-default" href="' + esc(g.yollar.tr || g.yollar[DILLER.find(d => g.yollar[d])]) + '"/>';
  return DILLER.filter(d => g.yollar[d]).map(d =>
    '<url><loc>' + esc(g.yollar[d]) + '</loc><lastmod>' + g.lastmod + '</lastmod><changefreq>' + g.freq +
    '</changefreq><priority>' + g.pri + '</priority>' + alt + '</url>').join('\n');
};

const htmlSayfa = (kayitlar) => `<!DOCTYPE html>
<html lang="tr"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>sitemap.xml · RedKıbrıs</title>
<meta name="robots" content="noindex,nofollow">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0a1020;color:#e9eef6;font:14px/1.6 "Segoe UI",system-ui,sans-serif;padding:24px}
h1{font-size:19px;font-weight:600;margin-bottom:4px}
p{color:#93a0b4;font-size:13px;margin-bottom:18px}
table{border-collapse:collapse;width:100%;font-size:13px}
th,td{border-bottom:1px solid rgba(216,184,120,.18);padding:7px 10px;text-align:left;vertical-align:top}
th{color:#d8b878;font-weight:400;font-size:11px;letter-spacing:.1em;text-transform:uppercase}
a{color:#f0d9ae;text-decoration:none}
a:hover{text-decoration:underline}
td.p{color:#93a0b4;white-space:nowrap}
</style></head><body>
<h1>RedKıbrıs · sitemap.xml</h1>
<p>${kayitlar.length} adres · ham XML için <a href="/sitemap.xml?xml=1">buraya</a> bak</p>
<table><tr><th>Adres</th><th>Güncelleme</th><th>Sıklık</th><th>Öncelik</th></tr>
${kayitlar.map(r => '<tr><td><a href="' + esc(r) + '">' + esc(r) + '</a></td><td class="p">-</td><td class="p">-</td><td class="p">-</td></tr>').join('\n')}
</table></body></html>`;

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
  map.forEach(g => ekle(g.yollar, g.lastmod, 'monthly', '0.6'));

  ekle({ tr: BASE + '/hakkinda', en: BASE + '/en/hakkinda', ru: BASE + '/ru/hakkinda' }, STATIC, 'monthly', '0.5');
  ekle({ tr: BASE + '/iletisim', en: BASE + '/en/iletisim', ru: BASE + '/ru/iletisim' }, STATIC, 'monthly', '0.6');
  ekle({ tr: BASE + '/gizlilik', en: BASE + '/en/gizlilik', ru: BASE + '/ru/gizlilik' }, STATIC, 'yearly', '0.3');

  const ua = String(req.headers['user-agent'] || '');
  const kabul = String(req.headers.accept || '');
  const bot = /bot|crawl|spider|slurp|yandex|bing|google|facebook|preview|validator/i.test(ua);
  const xmlIster = /[?&]xml=1/.test(String(req.url || ''));
  const htmlIster = !bot && !xmlIster && /text\/html/i.test(kabul);

  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (htmlIster) {
    const hepsi = [];
    gruplar.forEach(g => DILLER.forEach(d => { if (g.yollar[d]) hepsi.push(g.yollar[d]); }));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(htmlSayfa(hepsi));
    return;
  }

  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    gruplar.map(xmlGrup).join('\n') + '\n</urlset>';

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.status(200).send(xml);
};
