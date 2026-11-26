const fs = require('fs');
const path = require('path');
const S = require('../data/shell.js');

const BASE = 'https://www.kibrisgirneescort.com';

const FAV = '<link rel="icon" href="/favicon.svg" type="image/svg+xml">'
  + '<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png">'
  + '<link rel="apple-touch-icon" href="/apple-touch-icon.png">';

// panel kendi CSP'sini ister: Turnstile + GitHub API + blob önizleme
const PANEL_CSP = "default-src 'self'; "
  + "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; "
  + "style-src 'self' 'unsafe-inline'; "
  + "img-src 'self' data: blob: https://accerzwswgiqhtfgoeqv.supabase.co; "
  + "connect-src 'self' https://accerzwswgiqhtfgoeqv.supabase.co https://api.github.com https://challenges.cloudflare.com; "
  + "frame-src https://challenges.cloudflare.com; "
  + "font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'";

const IZIN = {
  index: { f: 'index.html', aktif: '/', dil: 'tr', grup: 'ana' },
  en: { f: 'en.html', aktif: '/en', dil: 'en', grup: 'ana' },
  ru: { f: 'ru.html', aktif: '/ru', dil: 'ru', grup: 'ana' },
  can: { f: 'can.html', aktif: '/panel', dil: 'tr', panel: true },
  hakkinda: { f: 'hakkinda.html', aktif: '/hakkinda', dil: 'tr', grup: 'hakkinda' },
  'en-hakkinda': { f: 'en-hakkinda.html', yedek: 'hakkinda.html', aktif: '/en/hakkinda', dil: 'en', grup: 'hakkinda' },
  'ru-hakkinda': { f: 'ru-hakkinda.html', yedek: 'hakkinda.html', aktif: '/ru/hakkinda', dil: 'ru', grup: 'hakkinda' },
  fiyatlar: { f: 'fiyatlar.html', aktif: '/fiyatlar', dil: 'tr', grup: 'fiyatlar' },
  'en-fiyatlar': { f: 'en-fiyatlar.html', yedek: 'fiyatlar.html', aktif: '/en/fiyatlar', dil: 'en', grup: 'fiyatlar' },
  'ru-fiyatlar': { f: 'ru-fiyatlar.html', yedek: 'fiyatlar.html', aktif: '/ru/fiyatlar', dil: 'ru', grup: 'fiyatlar' },
  iletisim: { f: 'iletisim.html', aktif: '/iletisim', dil: 'tr', grup: 'iletisim' },
  'en-iletisim': { f: 'en-iletisim.html', yedek: 'iletisim.html', aktif: '/en/iletisim', dil: 'en', grup: 'iletisim' },
  'ru-iletisim': { f: 'ru-iletisim.html', yedek: 'iletisim.html', aktif: '/ru/iletisim', dil: 'ru', grup: 'iletisim' },
  gizlilik: { f: 'gizlilik.html', aktif: '/gizlilik', dil: 'tr', grup: 'gizlilik' },
  'en-gizlilik': { f: 'en-gizlilik.html', yedek: 'gizlilik.html', aktif: '/en/gizlilik', dil: 'en', grup: 'gizlilik' },
  'ru-gizlilik': { f: 'ru-gizlilik.html', yedek: 'gizlilik.html', aktif: '/ru/gizlilik', dil: 'ru', grup: 'gizlilik' },
  blog: { f: 'blog.html', aktif: '/blog', dil: 'tr', grup: 'blog' },
  'en-blog': { f: 'en-blog.html', yedek: 'blog.html', aktif: '/en/blog', dil: 'en', grup: 'blog' },
  'ru-blog': { f: 'ru-blog.html', yedek: 'blog.html', aktif: '/ru/blog', dil: 'ru', grup: 'blog' }
};

const oku = f => {
  try { return fs.readFileSync(path.join(process.cwd(), 'pages/' + f), 'utf8'); }
  catch (e) { return null; }
};

// dil değiştirici için: aynı sayfanın diğer dil sürümleri
function ceviriHaritasi(grup) {
  const out = {};
  if (!grup) return out;
  Object.keys(IZIN).forEach(k => {
    const s = IZIN[k];
    if (s.grup === grup) out[s.dil] = BASE + s.aktif;
  });
  return out;
}

function favicon(html) {
  if (/rel="icon"[^>]*data:image\/svg\+xml/i.test(html)) {
    return html.replace(/<link[^>]*rel="icon"[^>]*data:image\/svg\+xml[^>]*>/i, FAV);
  }
  if (html.indexOf('/favicon.svg') > -1) return html;
  return html.replace('</head>', FAV + '</head>');
}

module.exports = (req, res) => {
  const k = String((req.query && req.query.f) || '').replace(/[^a-z0-9-]/g, '');
  const sayfa = IZIN[k];

  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (!sayfa) {
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400');
    res.status(404).send('Sayfa bulunamadı');
    return;
  }

  res.setHeader('Cache-Control', sayfa.panel
    ? 'no-store'
    : 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400');

  let html = oku(sayfa.f);
  if (!html && sayfa.yedek) html = oku(sayfa.yedek);
  if (!html) { res.status(500).send('Dosya okunamadı'); return; }

  html = favicon(html);

  // panel kendi başına bir belge, shell parçaları yok
  if (!sayfa.panel) {
    html = html
      .replace('<!--SHELL:HEAD-->', S.head())
      .replace('<!--SHELL:HEADER-->', S.header({ aktif: sayfa.aktif, dil: sayfa.dil, ceviriler: ceviriHaritasi(sayfa.grup) }))
      .replace('<!--SHELL:FOOTER-->', S.footer(sayfa.dil));
  }

  const n = S.nonce();
  html = S.noncele(html, n);
  res.setHeader('Content-Security-Policy', sayfa.panel ? PANEL_CSP : S.csp(n));

  res.status(200).send(html);
};
