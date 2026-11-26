const fs = require('fs');
const path = require('path');
const S = require('../data/shell.js');
const F = require('../data/fiyat.js');

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
  'ru-gizlilik': { f: 'ru-gizlilik.html', yedek: 'gizlilik.html', aktif: '/ru/gizlilik', dil: 'ru', grup: 'gizlilik' }
};

const oku = f => {
  try { return fs.readFileSync(path.join(process.cwd(), 'pages/' + f), 'utf8'); }
  catch (e) { return null; }
};

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

function fiyatDoldur(html, dil) {
  if (html.indexOf('<!--FIYAT') === -1) return html;
  const ld = '<script type="application/ld+json">'
    + JSON.stringify(F.ld(dil)).replace(/</g, '\\u003c')
    + '</script>';
  return html
    .replace(/<!--FIYAT_LD-->/g, ld)
    .replace(/<!--FIYAT_KART-->/g, F.kart(dil))
    .replace(/<!--FIYAT_CUMLE-->/g, F.cevap(dil))
    .replace(/<!--FIYAT-->/g, F.satir(dil));
}

const YOK = {
  tr: { b: 'Sayfa bulunamadı', m: 'Bu adreste sayfa yok. Ana sayfaya dönebilir, bölge seçebilir veya kataloğu isteyebilirsin.', a: 'Ana sayfa', f: 'Fiyatlar', c: 'Katalog' },
  en: { b: 'Page not found', m: 'Nothing at this address. Go back home, pick an area or just ask for the catalogue.', a: 'Home', f: 'Prices', c: 'Catalogue' },
  ru: { b: 'Страница не найдена', m: 'По этому адресу ничего нет. Вернитесь на главную, выберите район или попросите каталог.', a: 'Главная', f: 'Цены', c: 'Каталог' }
};

function yokSayfa(dil) {
  const y = YOK[dil] || YOK.tr;
  const kok = dil === 'tr' ? '' : '/' + dil;
  return `<!DOCTYPE html><html lang="${dil}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${y.b} | RedKıbrıs</title>
<meta name="description" content="${y.m}">
<meta name="robots" content="noindex,follow">
<meta name="theme-color" content="#0b121b">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="stylesheet" href="/css/sayfa.css?v=3">
${S.head()}
</head><body>
${S.header({ aktif: '', dil, ceviriler: {} })}
<main class="wrap" id="icerik">
<div class="y404">
  <div class="y404-mark" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="y404-code" aria-hidden="true">404</div>
  <h1>${y.b}</h1>
  <p class="lead">${y.m}</p>
  <div class="y404-acts">
    <a class="btn-lg wa" href="https://wa.me/905515420755" target="_blank" rel="noopener" data-base="https://wa.me/905515420755">${y.c}</a>
    <a class="btn-lg ghost" href="${BASE}${kok}/">${y.a}</a>
    <a class="btn-lg ghost" href="${BASE}${kok}/fiyatlar">${y.f}</a>
  </div>
</div>
</main>
${S.footer(dil)}
</body></html>`;
}

module.exports = (req, res) => {
  const k = String((req.query && req.query.f) || '').replace(/[^a-z0-9-]/g, '');
  const sayfa = IZIN[k];

  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (!sayfa) {
    let h = yokSayfa('tr');
    const n = S.nonce();
    h = S.noncele(h, n);
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300');
    res.setHeader('Content-Security-Policy', S.csp(n));
    res.status(404).send(h);
    return;
  }

  res.setHeader('Cache-Control', sayfa.panel
    ? 'no-store'
    : 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400');

  let html = oku(sayfa.f);
  if (!html && sayfa.yedek) html = oku(sayfa.yedek);
  if (!html) {
    let h = yokSayfa(sayfa.dil);
    const n = S.nonce();
    h = S.noncele(h, n);
    res.setHeader('Content-Security-Policy', S.csp(n));
    res.status(500).send(h);
    return;
  }

  html = favicon(html);

  if (!sayfa.panel) {
    html = fiyatDoldur(html, sayfa.dil);
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
