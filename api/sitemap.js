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
  ['lefkosa-hamitkoy-escort', '0.6'],
  ['otele-escort', '0.6'],
  ['eve-gelen-escort', '0.6'],
  ['gecelik-escort', '0.6'],
  ['vip-escort', '0.6'],
  ['ogrenci-escort', '0.6'],
  ['turk-escort', '0.6'],
  ['rus-escort', '0.6']
];

const SLUG_OK = /^[a-z0-9-]{3,120}$/;

const xmlUrl = (r) => {
  let alt = '<xhtml:link rel="alternate" hreflang="tr" href="' + esc(r.loc) + '"/>'
    + '<xhtml:link rel="alternate" hreflang="x-default" href="' + esc(r.loc) + '"/>';
  if (r.dil) {
    alt = '<xhtml:link rel="alternate" hreflang="tr" href="' + esc(BASE + '/') + '"/>'
      + '<xhtml:link rel="alternate" hreflang="en" href="' + esc(BASE + '/en') + '"/>'
      + '<xhtml:link rel="alternate" hreflang="ru" href="' + esc(BASE + '/ru') + '"/>'
      + '<xhtml:link rel="alternate" hreflang="x-default" href="' + esc(BASE + '/') + '"/>';
  }
  return '<url><loc>' + esc(r.loc) + '</loc><lastmod>' + r.lastmod +
    '</lastmod><changefreq>' + r.freq + '</changefreq><priority>' + r.pri + '</priority>' +
    alt + '</url>';
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
${kayitlar.map(r => '<tr><td><a href="' + esc(r.loc) + '">' + esc(r.loc) + '</a></td><td class="p">' + r.lastmod + '</td><td class="p">' + r.freq + '</td><td class="p">' + r.pri + '</td></tr>').join('\n')}
</table></body></html>`;

module.exports = async (req, res) => {
  const kayitlar = [];
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

  const ekle = (loc, lastmod, freq, pri, dil) => {
    if (gorulen.has(loc)) return;
    gorulen.add(loc);
    kayitlar.push({ loc, lastmod, freq, pri, dil: !!dil });
  };

  ekle(BASE + '/', enSon, 'weekly', '1.0', true);
  ekle(BASE + '/en', enSon, 'weekly', '0.9', true);
  ekle(BASE + '/ru', enSon, 'weekly', '0.9', true);

  ekle(BASE + '/fiyatlar', STATIC, 'weekly', '0.9');
  ekle(BASE + '/blog', enSon, 'daily', '0.8');

  BOLGELER.forEach(b => ekle(BASE + '/' + b[0], STATIC, 'weekly', b[1]));

  posts.forEach(p => {
    const slug = String(p.slug || '').trim();
    if (!SLUG_OK.test(slug)) return;
    ekle(BASE + '/blog/' + slug, day(p.updated_at || p.created_at || STATIC), 'monthly', '0.6');
  });

  ekle(BASE + '/iletisim', STATIC, 'monthly', '0.6');
  ekle(BASE + '/gizlilik', STATIC, 'yearly', '0.3');

  const ua = String(req.headers['user-agent'] || '');
  const kabul = String(req.headers.accept || '');
  const bot = /bot|crawl|spider|slurp|yandex|bing|google|facebook|preview|validator/i.test(ua);
  const xmlIster = /[?&]xml=1/.test(String(req.url || ''));
  const htmlIster = !bot && !xmlIster && /text\/html/i.test(kabul);

  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (htmlIster) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(htmlSayfa(kayitlar));
    return;
  }

  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    kayitlar.map(xmlUrl).join('\n') + '\n</urlset>';

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.status(200).send(xml);
};
