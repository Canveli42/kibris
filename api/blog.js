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

const kok = dil => (dil === 'tr' ? '/blog/' : '/' + dil + '/blog/');
const kokB = dil => (dil === 'tr' ? '/blog' : '/' + dil + '/blog');

const M = {
  tr: { t: 'Kıbrıs Escort Rehberleri', d: 'Kıbrıs escort rehberleri: bölge farkları, fiyat mantığı, otel çevresi ve ilk görüşmede dikkat edilecekler.', h1: 'Kıbrıs Escort Rehberleri', lead: 'Bölge farkları, fiyat mantığı, otel çevresi ve ilk görüşmede dikkat edilecekler.', bos: 'Bu sayfada yazı yok.', ara: 'Rehberlerde ara', bul: 'Ara', sonuc: 'sonuç', temiz: 'Temizle', sayfa: 'Sayfa', ana: 'Ana sayfa', blog: 'Blog' },
  en: { t: 'Cyprus Escort Guides', d: 'Cyprus escort guides: area differences, how pricing works, hotel surroundings and what to watch for on a first meeting.', h1: 'Cyprus Escort Guides', lead: 'Area differences, how pricing works, hotel surroundings and what to watch for on a first meeting.', bos: 'No articles on this page.', ara: 'Search guides', bul: 'Search', sonuc: 'results', temiz: 'Clear', sayfa: 'Page', ana: 'Home', blog: 'Blog' },
  ru: { t: 'Гиды по эскорту на Кипре', d: 'Гиды по эскорту на Кипре: разница районов, как устроены цены, что рядом с отелями и на что смотреть на первой встрече.', h1: 'Гиды по эскорту на Кипре', lead: 'Разница районов, как устроены цены, что рядом с отелями и на что смотреть на первой встрече.', bos: 'На этой странице статей нет.', ara: 'Поиск по гидам', bul: 'Найти', sonuc: 'результатов', temiz: 'Сбросить', sayfa: 'Страница', ana: 'Главная', blog: 'Блог' }
};

const ARA_CSS = `<style>
.ara{display:flex;gap:8px;margin:0 0 20px;background:none;border:0;padding:0}
.ara input{flex:1;min-width:0;background:#0e161f;color:#e9eef6;border:1px solid var(--line);border-radius:999px;padding:11px 16px;font:inherit;font-size:15px}
.ara button{border:0;border-radius:999px;padding:11px 20px;font-weight:700;font-size:14px;background:linear-gradient(180deg,#f3ddb4,#d8b878);color:#121a24;cursor:pointer}
.ara a{display:flex;align-items:center;padding:0 14px;border:1px solid var(--line);border-radius:999px;font-size:13px;color:#f0d9ae}
</style>`;

const CANLI = `<script>
(function(){
  var f=document.querySelector('.ara'),i=f&&f.querySelector('input'),k=document.querySelector('.liste');
  if(!f||!i||!k)return;
  var b=document.createElement('div');b.className='about';b.textContent='Sonuç yok.';
  b.style.display='none';k.parentNode.insertBefore(b,k.nextSibling);
  i.addEventListener('input',function(){
    var q=i.value.toLowerCase().trim(),n=0,l=k.children;
    for(var j=0;j<l.length;j++){
      var o=!q||(l[j].textContent||'').toLowerCase().indexOf(q)>-1;
      l[j].style.display=o?'':'none';if(o)n++;
    }
    b.style.display=(q&&!n)?'':'none';
  });
})();
</script>`;

module.exports = async (req, res) => {
  const ham = String((req.query && req.query.dil) || 'tr').toLowerCase();
  const dil = DILLER.includes(ham) ? ham : 'tr';
  const t = M[dil];
  const q = String((req.query && req.query.q) || '').trim().slice(0, 60);
  const hamSayfa = String((req.query && (req.query.s || req.query.sayfa)) || '1');
  const sayfaNo = Math.max(1, parseInt(hamSayfa, 10) || 1);
  const temel = BASE + kokB(dil);
  const url = temel + (q
    ? '?q=' + encodeURIComponent(q) + (sayfaNo > 1 ? '&s=' + sayfaNo : '')
    : (sayfaNo > 1 ? '?s=' + sayfaNo : ''));

  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  const posts = [];
  try {
    for (let offset = 0; ; ) {
      const r = await fetch(
        SB + '/rest/v1/posts?select=slug,title,img,created_at,yayin_at&published=eq.true&lang=eq.' + dil +
        '&or=(' + YAYIN + ')&order=yayin_at.desc.nullslast,id.asc&limit=500&offset=' + offset,
        { headers: H }
      );
      if (!r.ok) throw new Error('Post list unavailable');
      const rows = await r.json();
      if (!Array.isArray(rows)) throw new Error('Invalid post list');
      if (!rows.length) break;
      if (posts.length + rows.length > 50000) throw new Error('Post list exceeds limit');
      posts.push(...rows);
      offset += rows.length;
    }
  } catch (e) {
    const msg = { tr: 'Yazılar geçici olarak yüklenemiyor.', en: 'Posts are temporarily unavailable.', ru: 'Записи временно недоступны.' }[dil];
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Retry-After', '60');
    return res.status(503).send(msg);
  }

  let rehberler = posts.filter(p => !profilMi(p.slug));
  if (q) {
    const k = q.toLowerCase();
    rehberler = rehberler.filter(p => (String(p.title || '') + ' ' + String(p.slug || '')).toLowerCase().indexOf(k) > -1);
  }

  const toplam = rehberler.length;
  const sonSayfa = Math.max(1, Math.ceil(toplam / ADET));
  if (sayfaNo > sonSayfa) {
    const hedef = temel + (q ? '?q=' + encodeURIComponent(q) + (sonSayfa > 1 ? '&s=' + sonSayfa : '') : (sonSayfa > 1 ? '?s=' + sonSayfa : ''));
    res.setHeader('Location', hedef);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(302).send('');
  }
  const dilim = rehberler.slice((sayfaNo - 1) * ADET, sayfaNo * ADET);

  const sayfaLink = n => temel + '?s=' + n + (q ? '&q=' + encodeURIComponent(q) : '');
  const onceki = sayfaNo > 1 ? sayfaLink(sayfaNo - 1) : '';
  const sonraki = sayfaNo < sonSayfa ? sayfaLink(sayfaNo + 1) : '';

  const kart = p => {
    const d = new Date(p.yayin_at || p.created_at);
    const tar = isNaN(d) ? '' : d.toLocaleDateString(dil === 'en' ? 'en-GB' : dil === 'ru' ? 'ru-RU' : 'tr-TR');
    return '<a class="post" href="' + BASE + kok(dil) + esc(p.slug) + '">'
      + (p.img ? '<img src="' + esc(p.img) + '" alt="' + esc(p.title) + '" width="92" height="62" loading="lazy" decoding="async">' : '')
      + '<div><b>' + esc(p.title) + '</b><span>' + esc(tar) + '</span></div></a>';
  };

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
        : '<a href="' + sayfaLink(x) + '">' + x + '</a>').join('')
    + '</nav>' : '';

  const kirinti = `<a href="${BASE}${dil === 'tr' ? '/' : '/' + dil}">${esc(t.ana)}</a> › <span>${esc(t.blog)}</span>`;

  const araForm = `<form class="ara" action="${temel}" method="get" role="search">
    <input type="search" name="q" value="${esc(q)}" placeholder="${esc(t.ara)}" aria-label="${esc(t.ara)}" autocomplete="off">
    <button type="submit">${esc(t.bul)}</button>
    ${q ? `<a href="${temel}">${esc(t.temiz)}</a>` : ''}
  </form>`;

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
  ${araForm}
  ${q ? `<p class="guncel">${toplam} ${esc(t.sonuc)}</p>` : ''}
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
<title>${esc(t.t)}${sayfaNo > 1 ? ' — ' + sayfaNo + '. ' + esc(t.sayfa) : ''} | RedKıbrıs</title>
<meta name="description" content="${esc(t.d)}">
<link rel="canonical" href="${url}">
${onceki ? `<link rel="prev" href="${onceki}">` : ''}
${sonraki ? `<link rel="next" href="${sonraki}">` : ''}
${sayfaNo > 1 || q ? '' : alternates}
<link rel="sitemap" type="application/xml" href="${BASE}/sitemap.xml">
<meta name="robots" content="${q ? 'noindex,follow' : 'index,follow'}">
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
${ARA_CSS}
${CANLI}
</body></html>`;

  const n = S.nonce();
  html = S.noncele(html, n);

  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=1800, stale-while-revalidate=86400');
  res.setHeader('Content-Security-Policy', S.csp(n));
  res.status(200).send(html);
};
