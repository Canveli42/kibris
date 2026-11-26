const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const S = require('../data/shell.js');

const DILLER = ['tr', 'en', 'ru'];
const YAYIN = 'yayin_at.is.null,yayin_at.lte.now()';
const ADET = 24;

const REHBER = new Set([
  'fiyatlari','villa','nasil-cagrilir','rehberi','rehber','program','2-saat-program',
  '4-saat-program','gecelik-program','30-dakika','ilk-gorusme','lobi-mi-oda-mi','mitleri',
  'sabah-gorusmesi','vip-davet','turk-rus-farki','ulasim-ve-taksi','otelleri'
]);

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const profilMi = slug => {
  const m = String(slug || '').match(/^([a-z-]+)-escort-(.+)$/);
  if (!m) return false;
  return !REHBER.has(m[2].replace(/-(19|20)\d{2}$/, ''));
};

const BOLGE = [
  ['girne', /^girne-/], ['lefkosa', /^lefkosa-/], ['magusa', /^magusa-/],
  ['iskele', /^iskele-/], ['guzelyurt', /^guzelyurt-/]
];

const TUR = [
  ['fiyat', /fiyat|tarife|ucret|ücret|odeme|ödeme/],
  ['otel', /otel|hotel|resort|casino|tatil-koyu/]
];

const BOLGE_AD = {
  tr: { girne: 'Girne', lefkosa: 'Lefkoşa', magusa: 'Mağusa', iskele: 'İskele', guzelyurt: 'Güzelyurt' },
  en: { girne: 'Kyrenia', lefkosa: 'Nicosia', magusa: 'Famagusta', iskele: 'Iskele', guzelyurt: 'Guzelyurt' },
  ru: { girne: 'Гирне', lefkosa: 'Никосия', magusa: 'Фамагуста', iskele: 'Искеле', guzelyurt: 'Гюзельюрт' }
};

const kok = dil => (dil === 'tr' ? '/blog/' : '/' + dil + '/blog/');
const kokB = dil => (dil === 'tr' ? '/blog' : '/' + dil + '/blog');

const M = {
  tr: { t: 'Kıbrıs Escort Rehberleri', d: 'Kıbrıs escort rehberleri: bölge farkları, fiyat mantığı, otel çevresi ve ilk görüşmede dikkat edilecekler.', h1: 'Kıbrıs Escort Rehberleri', lead: 'Bölge farkları, fiyat mantığı, otel çevresi ve ilk görüşmede dikkat edilecekler.', bos: 'Bu filtrede yazı yok.', diger: 'Diğer rehberler', profiller: 'Profillere git', sayfa: 'Sayfa', ana: 'Ana sayfa', blog: 'Blog', hepsi: 'Hepsi', fiyat: 'Fiyat', otel: 'Otel', filtre: 'Filtre' },
  en: { t: 'Cyprus Escort Guides', d: 'Cyprus escort guides: area differences, how pricing works, hotel surroundings and what to watch for on a first meeting.', h1: 'Cyprus Escort Guides', lead: 'Area differences, how pricing works, hotel surroundings and what to watch for on a first meeting.', bos: 'No articles in this filter.', diger: 'More guides', profiller: 'Browse profiles', sayfa: 'Page', ana: 'Home', blog: 'Blog', hepsi: 'All', fiyat: 'Pricing', otel: 'Hotels', filtre: 'Filter' },
  ru: { t: 'Гиды по эскорту на Кипре', d: 'Гиды по эскорту на Кипре: разница районов, как устроены цены, что рядом с отелями и на что смотреть на первой встрече.', h1: 'Гиды по эскорту на Кипре', lead: 'Разница районов, как устроены цены, что рядом с отелями и на что смотреть на первой встрече.', bos: 'В этом фильтре статей нет.', diger: 'Другие гиды', profiller: 'К профилям', sayfa: 'Страница', ana: 'Главная', blog: 'Блог', hepsi: 'Все', fiyat: 'Цены', otel: 'Отели', filtre: 'Фильтр' }
};

const qs = o => {
  const p = Object.keys(o).filter(k => o[k]).map(k => k + '=' + o[k]);
  return p.length ? '?' + p.join('&') : '';
};

module.exports = async (req, res) => {
  const ham = String((req.query && req.query.dil) || 'tr').toLowerCase();
  const dil = DILLER.includes(ham) ? ham : 'tr';
  const t = M[dil];
  const q = req.query || {};
  const qBolge = BOLGE.some(x => x[0] === q.bolge) ? q.bolge : '';
  const qTur = TUR.some(x => x[0] === q.tur) ? q.tur : '';
  const sayfaNo = Math.max(1, parseInt(String(q.s || '1'), 10) || 1);
  const url = BASE + kokB(dil) + qs({ bolge: qBolge, tur: qTur, s: sayfaNo > 1 ? sayfaNo : '' });

  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  let posts = [];
  try {
    const r = await fetch(
      SB + '/rest/v1/posts?select=slug,title,img,created_at,yayin_at&published=eq.true&lang=eq.' + dil +
      '&or=(' + YAYIN + ')&order=yayin_at.desc.nullslast&limit=600',
      { headers: H }
    );
    if (r.ok) posts = (await r.json()) || [];
  } catch (e) {}

  const tum = posts.filter(p => !profilMi(p.slug));
  let rehberler = tum;
  if (qBolge) {
    const r = BOLGE.find(x => x[0] === qBolge)[1];
    rehberler = rehberler.filter(p => r.test(p.slug));
  }
  if (qTur) {
    const r = TUR.find(x => x[0] === qTur)[1];
    rehberler = rehberler.filter(p => r.test(p.slug) || r.test(p.title));
  }

  const toplam = rehberler.length;
  const sonSayfa = Math.max(1, Math.ceil(toplam / ADET));
  const dilim = rehberler.slice((sayfaNo - 1) * ADET, sayfaNo * ADET);

  const kart = p => {
    const d = new Date(p.yayin_at || p.created_at);
    const tar = isNaN(d) ? '' : d.toLocaleDateString(dil === 'en' ? 'en-GB' : dil === 'ru' ? 'ru-RU' : 'tr-TR');
    return '<a class="post" href="' + BASE + kok(dil) + esc(p.slug) + '">'
      + (p.img ? '<img src="' + esc(p.img) + '" alt="' + esc(p.title) + '" width="92" height="62" loading="lazy" decoding="async">' : '')
      + '<div><b>' + esc(p.title) + '</b><span>' + esc(tar) + '</span></div></a>';
  };

  const cip = (o, etiket, secili, adet) =>
    `<a href="${BASE + kokB(dil) + qs(o)}"${secili ? ' class="on"' : ''}${adet === 0 ? ' style="opacity:.5"' : ''}>${esc(etiket)} (${adet})</a>`;

  const suz = `<div class="suz">
    ${cip({}, t.hepsi, !qBolge && !qTur, tum.length)}
    ${TUR.map(x => cip({ tur: x[0] }, x[0] === 'fiyat' ? t.fiyat : t.otel, qTur === x[0], tum.filter(p => x[1].test(p.slug) || x[1].test(p.title)).length)).join('')}
    ${BOLGE.map(x => cip({ bolge: x[0] }, (BOLGE_AD[dil] || BOLGE_AD.tr)[x[0]], qBolge === x[0], tum.filter(p => x[1].test(p.slug)).length)).join('')}
  </div>`;

  const sayfalama = [];
  for (let i = 1; i <= sonSayfa; i++) {
    if (sonSayfa > 7 && Math.abs(i - sayfaNo) > 2 && i !== 1 && i !== sonSayfa) {
      if (sayfalama[sayfalama.length - 1] !== '…') sayfalama.push('…');
      continue;
    }
    sayfalama.push(i);
  }
  const sayfalamaHtml = sonSayfa > 1 ? '<nav class="sayfalama" aria-label="' + esc(t.sayfa) + '">'
    + sayfalama.map(x => x === '…' ? '<span>…</span>'
      : x === sayfaNo ? '<span class="on">' + x + '</span>'
        : '<a href="' + BASE + kokB(dil) + qs({ bolge: qBolge, tur: qTur, s: x > 1 ? x : '' }) + '">' + x + '</a>').join('')
    + '</nav>' : '';

  const kirinti = `<a href="${BASE}${dil === 'tr' ? '/' : '/' + dil}">${esc(t.ana)}</a> › <span>${esc(t.blog)}</span>`;

  const ld = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: t.t, url, inLanguage: dil },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.ana, item: BASE + (dil === 'tr' ? '/' : '/' + dil) },
      { '@type': 'ListItem', position: 2, name: t.blog, item: BASE + kokB(dil) }
    ] }
  ];

  const icerik = `
  <div class="crumb">${kirinti}</div>
  <h1>${esc(t.h1)}</h1>
  <p class="lead">${esc(t.lead)}</p>
  <div class="about"><b>${esc(t.profiller)}</b><br><a href="${BASE}/modeller/girne">Girne</a> · <a href="${BASE}/modeller/lefkosa">Lefkoşa</a> · <a href="${BASE}/modeller/magusa">Mağusa</a> · <a href="${BASE}/fiyatlar">${dil === 'tr' ? 'Fiyatlar' : dil === 'en' ? 'Prices' : 'Цены'}</a></div>
  ${suz}
  ${dilim.length ? `<div class="liste">${dilim.map(kart).join('')}</div>` : `<div class="about">${esc(t.bos)}</div>`}
  ${sayfalamaHtml}`;

  const alternates = `<link rel="alternate" hreflang="tr" href="${BASE}/blog">
<link rel="alternate" hreflang="en" href="${BASE}/en/blog">
<link rel="alternate" hreflang="ru" href="${BASE}/ru/blog">
<link rel="alternate" hreflang="x-default" href="${BASE}/blog">`;

  let html = `<!DOCTYPE html>
<html lang="${dil}"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(t.t)} | RedKıbrıs</title>
<meta name="description" content="${esc(t.d)}">
<link rel="canonical" href="${url}">
${sayfaNo > 1 || qBolge || qTur ? '' : alternates}
<link rel="sitemap" type="application/xml" href="${BASE}/sitemap.xml">
<meta name="robots" content="index,follow">
<meta property="og:type" content="website">
<meta property="og:site_name" content="RedKıbrıs">
<meta property="og:title" content="${esc(t.t)}">
<meta property="og:description" content="${esc(t.d)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${dil === 'tr' ? 'tr_TR' : dil === 'en' ? 'en_US' : 'ru_RU'}">
<meta property="og:image" content="${BASE}/apple-touch-icon.png">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#0b121b">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://accerzwswgiqhtfgoeqv.supabase.co/" crossorigin>
<link rel="stylesheet" href="/css/sayfa.css?v=4">
${S.head()}
${ld.map(x => '<script type="application/ld+json">' + JSON.stringify(x).replace(/</g, '\\u003c') + '</script>').join('')}
</head><body>
${S.header({ aktif: kokB(dil), dil, ceviriler: { tr: BASE + '/blog', en: BASE + '/en/blog', ru: BASE + '/ru/blog' } })}
<main class="wrap" id="icerik">
${icerik}
</main>
${S.footer(dil)}
</body></html>`;

  const n = S.nonce();
  html = S.noncele(html, n);

  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=1800, stale-while-revalidate=86400');
  res.setHeader('Content-Security-Policy', S.csp(n));
  res.status(200).send(html);
};
