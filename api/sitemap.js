const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const B = require('../data/bolge.js');

const DILLER = ['tr', 'en', 'ru'];
const REG = { tr: require('../data/regions.js'), en: require('../data/regions.en.js'), ru: require('../data/regions.ru.js') };
Object.assign(REG.tr, require('../data/regions.ek.js'));

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const day = d => {
  if (!d) return null;
  const t = new Date(d);
  return Number.isNaN(t.getTime()) || t.getTime() > Date.now() ? null : t.toISOString().slice(0, 10);
};
const latest = (...dates) => dates.map(day).filter(Boolean).sort().pop() || null;

const REHBER = require('../data/rehber.js');

const profilMi = slug => {
  const m = String(slug || '').match(/^([a-z-]+)-escort-(.+)$/);
  if (!m) return false;
  return !REHBER.has(m[2].replace(/-(19|20)\d{2}$/, ''));
};

const {FORMAT_SITEMAP:FORMAT}=require('../data/region-keys.js');
const ONCELIK = { girne: '0.9', lefkosa: '0.8', magusa: '0.8', iskele: '0.8', guzelyurt: '0.8' };

const SLUG_OK = /^[a-z0-9-]{3,120}$/;
const kok = d => (d === 'tr' ? '/blog/' : '/' + d + '/blog/');
const kokB = d => (d === 'tr' ? '/' : '/' + d + '/');

const xmlGrup = g => {
  const varOlan = DILLER.filter(d => g.yollar[d]);
  const alt = varOlan.map(d => '<xhtml:link rel="alternate" hreflang="' + d + '" href="' + esc(g.yollar[d]) + '"/>').join('')
    + '<xhtml:link rel="alternate" hreflang="x-default" href="' + esc(g.yollar.tr || g.yollar[varOlan[0]]) + '"/>';
  return varOlan.map(d => {
    const modified = typeof g.lastmod === 'string' ? g.lastmod : g.lastmod?.[d];
    return '<url><loc>' + esc(g.yollar[d]) + '</loc>' +
      (modified ? '<lastmod>' + modified + '</lastmod>' : '') +
      '<changefreq>' + g.freq + '</changefreq><priority>' + g.pri + '</priority>' + alt + '</url>';
  }).join('\n');
};

module.exports = async (req, res) => {
  const gruplar = [];
  const gorulen = new Set();
  const posts = [];
  const now = new Date().toISOString();
  const batch = 500;
  try {
    for (let offset = 0; ; ) {
      const r = await fetch(
        SB + '/rest/v1/posts?select=id,slug,lang,bolge,il,created_at,updated_at,yayin_at&published=eq.true&or=(yayin_at.is.null,yayin_at.lte.' + encodeURIComponent(now) + ')&order=id.asc&limit=' + batch + '&offset=' + offset,
        { headers: H }
      );
      if (!r.ok) throw new Error('Post read failed');
      const rows = await r.json();
      if (!Array.isArray(rows)) throw new Error('Invalid post response');
      if (!rows.length) break;
      if (posts.length + rows.length > 50000) throw new Error('Sitemap exceeds URL limit');
      posts.push(...rows);
      offset += rows.length;
    }
  } catch (e) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Retry-After', '60');
    return res.status(503).send('Site haritası geçici olarak kullanılamıyor.');
  }

  const ekle = (yollar, lastmod, freq, pri) => {
    const anahtar = Object.values(yollar)[0];
    if (gorulen.has(anahtar)) return;
    gorulen.add(anahtar);
    gruplar.push({ yollar, lastmod, freq, pri });
  };

  ekle({ tr: BASE + '/', en: BASE + '/en', ru: BASE + '/ru' }, null, 'weekly', '1.0');
  ekle({ tr: BASE + '/fiyatlar', en: BASE + '/en/fiyatlar', ru: BASE + '/ru/fiyatlar' }, null, 'weekly', '0.9');
  ekle({ tr: BASE + '/blog', en: BASE + '/en/blog', ru: BASE + '/ru/blog' }, null, 'daily', '0.8');

  B.sayfali().forEach(k => {
    const pg = B.pg(k);
    const yollar = {};
    DILLER.forEach(d => { if (REG[d] && REG[d][pg]) yollar[d] = BASE + kokB(d) + pg; });
    if (Object.keys(yollar).length) ekle(yollar, null, 'weekly', ONCELIK[k] || '0.7');
  });

  FORMAT.forEach(k => {
    const yollar = {};
    DILLER.forEach(d => { if (REG[d] && REG[d][k]) yollar[d] = BASE + kokB(d) + k; });
    if (Object.keys(yollar).length) ekle(yollar, null, 'weekly', '0.6');
  });

  const dolu = new Set();
  posts.forEach(p => { if (p.bolge) dolu.add(p.bolge); if (p.il) dolu.add(p.il); });
  B.hepsi().forEach(k => {
    if (!dolu.has(k) && !(B.alt(k) && [...dolu].some(x => B.il(x) === k))) return;
    ekle({ tr: BASE + '/modeller/' + B.hb(k) }, null, 'weekly', ONCELIK[k] ? '0.7' : '0.6');
  });

  const map = new Map();
  posts.forEach(p => {
    const slug = String(p.slug || '').trim();
    const d = String(p.lang || 'tr');
    if (!SLUG_OK.test(slug) || !DILLER.includes(d)) return;
    if (!map.has(slug)) map.set(slug, { yollar: {}, lastmod: {} });
    const g = map.get(slug);
    g.yollar[d] = BASE + kok(d) + slug;
    const t = latest(p.updated_at, p.created_at, p.yayin_at);
    if (t && (!g.lastmod[d] || t > g.lastmod[d])) g.lastmod[d] = t;
  });
  map.forEach((g, slug) => {
    const pri = profilMi(slug) ? '0.7' : '0.6';
    const freq = profilMi(slug) ? 'weekly' : 'monthly';
    ekle(g.yollar, g.lastmod, freq, pri);
  });

  ekle({ tr: BASE + '/hakkinda', en: BASE + '/en/hakkinda', ru: BASE + '/ru/hakkinda' }, null, 'monthly', '0.5');
  ekle({ tr: BASE + '/iletisim', en: BASE + '/en/iletisim', ru: BASE + '/ru/iletisim' }, null, 'monthly', '0.6');
  ekle({ tr: BASE + '/gizlilik', en: BASE + '/en/gizlilik', ru: BASE + '/ru/gizlilik' }, null, 'yearly', '0.3');

  if (gruplar.reduce((n, g) => n + Object.keys(g.yollar).length, 0) > 50000) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).send('Site haritası geçici olarak kullanılamıyor.');
  }

  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' + '<?xml-stylesheet type="text/css" href="/css/sitemap.css?v=1"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
    + gruplar.map(xmlGrup).join('\n') + '\n</urlset>';

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=900');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.status(200).send(xml);
};

