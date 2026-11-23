const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const WA = 'https://wa.me/905515420755';
const TG = 'https://t.me/kibrisescortvip';
const D = require('../data/regions.js');

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const NAV = [
  ['/', 'Ana Sayfa'], ['/girne-escort', 'Girne'], ['/lefkosa-escort', 'Lefkoşa'],
  ['/magusa-escort', 'Mağusa'], ['/iskele-escort', 'İskele'], ['/guzelyurt-escort', 'Güzelyurt'],
  ['/blog', 'Blog'], ['/fiyatlar', 'Fiyatlar'], ['/iletisim', 'İletişim']
];

const CSS = `
:root{--bg:#0b121b;--panel:#111823;--line:rgba(216,184,120,.18);--ink:#e9eef6;--mut:#93a0b4;--gold:#d8b878;--red:#e8264a}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.65 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
a{color:var(--gold);text-decoration:none}
a:hover{text-decoration:underline}
.wrap{width:min(1120px,100%);margin:0 auto;padding:0 18px}
.site-header{position:sticky;top:0;z-index:60;background:rgba(10,16,32,.94);border-bottom:1px solid var(--line)}
.site-header .header-in{display:flex;align-items:center;gap:14px;padding:10px 18px;flex-wrap:wrap}
.site-header .brand{display:flex;align-items:center;gap:10px;color:var(--ink);font-family:Georgia,serif;font-size:21px}
.site-header .brand b{color:var(--red)}
.site-header nav{flex:1 0 100%;display:flex;gap:8px;overflow-x:auto;padding:4px 0 10px}
.site-header nav a{flex:0 0 auto;font-size:13.5px;color:var(--mut);padding:7px 13px;border:1px solid var(--line);border-radius:999px;background:var(--panel);white-space:nowrap}
.site-header nav a.on{color:#141008;background:var(--gold);border-color:var(--gold);font-weight:600}
main{padding:22px 0 40px}
h1{font-family:Georgia,serif;font-size:32px;margin:0 0 8px}
h2{font-family:Georgia,serif;font-size:23px;margin:26px 0 10px;color:#f0d9ae}
.lead{font-size:18px;color:#cdd6e2}
.about{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin:10px 0}
.crumb{font-size:13px;color:var(--mut);margin-bottom:12px}
.btn,.btn-o{display:inline-block;padding:11px 18px;border-radius:999px;font-weight:700;font-size:14px}
.btn{background:#25d366;color:#05270f}
.btn-o{border:1px solid var(--line);color:var(--gold);background:transparent}
.rimg{width:100%;height:auto;border-radius:14px;margin:10px 0;display:block}
.guncel{color:var(--mut);font-size:13px}
.sect{margin-top:30px}
.chrome-footer{border-top:1px solid var(--line);background:#0d1526;padding:34px 18px 26px;margin-top:44px;font-size:14px}
.chrome-footer .cf-bottom{color:var(--mut);font-size:12.5px;margin-top:18px;padding-top:14px;border-top:1px solid var(--line)}
@media(min-width:860px){.site-header .header-in{flex-wrap:nowrap}.site-header nav{flex:1 1 auto;justify-content:flex-end;padding:0;overflow:visible}.site-header nav a{background:transparent;border-color:transparent;padding:6px 8px}}
`;

function HEADER(active) {
  const links = NAV.map(([h, t]) => {
    const on = (active === BASE + h || (h === '/blog' && active.indexOf('/blog/') === 0)) ? ' class="on"' : '';
    return `<a href="${BASE}${h}"${on}>${t}</a>`;
  }).join('');
  return `<header class="site-header"><div class="header-in">
    <a class="brand" href="${BASE}/"><b>Red</b>Kıbrıs</a>
    <a class="btn" href="${WA}" target="_blank" rel="noopener">WhatsApp</a>
    <nav aria-label="Ana menü">${links}</nav>
  </div></header>`;
}

function FOOTER() {
  const bolge = ['girne', 'lefkosa', 'magusa', 'iskele', 'guzelyurt']
    .map(s => `<a href="${BASE}/${s}-escort">${s.charAt(0).toUpperCase() + s.slice(1)} Escort</a>`).join(' · ');
  return `<footer class="chrome-footer">
    <div class="wrap">
      <b style="font-family:Georgia,serif;font-size:18px"><b style="color:var(--red)">Red</b>Kıbrıs</b>
      <p style="color:var(--mut);max-width:52ch">Kıbrıs Escort · Girne merkezli bağımsız escort rehberi. Bölge sayfaları, güncel listeler ve net fiyatlar.</p>
      <p>${bolge}</p>
      <p><a href="${BASE}/">Ana Sayfa</a> · <a href="${BASE}/blog">Blog</a> · <a href="${BASE}/fiyatlar">Fiyatlar</a> · <a href="${BASE}/iletisim">İletişim</a> · <a href="${BASE}/gizlilik">Gizlilik</a></p>
      <div class="cf-bottom">© 2026 · Can</div>
    </div>
  </footer>`;
}

const sayfa = o => `<!DOCTYPE html>
<html lang="tr"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.desc)}">
<link rel="canonical" href="${esc(o.url)}">
<link rel="alternate" hreflang="tr" href="${esc(o.url)}">
<link rel="alternate" hreflang="x-default" href="${esc(o.url)}">
<meta name="robots" content="${o.robots || 'index,follow'}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="RedKıbrıs">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.desc)}">
<meta property="og:url" content="${esc(o.url)}">
${o.img ? `<meta property="og:image" content="${esc(o.img)}">` : ''}
<meta name="theme-color" content="#0b121b">
<style>${CSS}</style>
${o.ld || ''}
</head><body>
${HEADER(o.active)}
<main class="wrap">
${o.icerik}
</main>
${FOOTER()}
<script src="${BASE}/js/iletisim.js" defer></script>
</body></html>`;

module.exports = async (req, res) => {
  const slug = String((req.query && req.query.slug) || '').replace(/[^a-z0-9-]/gi, '');
  const C2 = D[slug];

  if (!C2) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(404).send(sayfa({
      title: 'Sayfa bulunamadı | RedKıbrıs',
      desc: 'Aradığın bölge sayfası bulunamadı.',
      url: BASE + '/' + slug, active: '', robots: 'noindex,follow',
      icerik: `<h1>Sayfa bulunamadı</h1><div class="about">Bu adreste bölge yok. <a href="${BASE}/">Ana sayfaya</a> dönebilirsin.</div>`
    }));
    return;
  }

  const nmE = /Escort/i.test(C2.nm) ? C2.nm : C2.nm + ' Escort';
  const altE = /Escort/i.test(C2.alt) ? '' : ' Escort';
  const url = BASE + '/' + slug;
  const title = nmE + ' | ' + C2.alt + altE + ' – RedKıbrıs';
  const desc = nmE + ' – ' + C2.alt + '. Sabit tarife, kapora yok, otel ve eve çıkış. Taksi ücreti mesafeye göre önceden söylenir.';

  let img = '';
  try {
    const r = await fetch(SB + '/rest/v1/regions?select=slug,img&slug=eq.' + encodeURIComponent(slug), { headers: H });
    if (r.ok) {
      const rows = await r.json();
      const hit = (rows || [])[0];
      if (hit && hit.img) img = hit.img;
    }
  } catch (e) {}

  const ld = [
    { '@context': 'https://schema.org', '@type': 'Service', serviceType: nmE, areaServed: C2.areas, url,
      ...(img ? { image: img } : {}), provider: { '@type': 'LocalBusiness', name: 'RedKıbrıs' } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana sayfa', item: BASE + '/' },
      { '@type': 'ListItem', position: 2, name: C2.nm, item: url } ] },
    { '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: (C2.sss || []).map(x => ({ '@type': 'Question', name: x[0], acceptedAnswer: { '@type': 'Answer', text: x[1] } })) }
  ];

  const digerleri = Object.keys(D).filter(k => k !== slug)
    .map(k => `<a class="btn-o" href="${BASE}/${k}">${esc(D[k].nm)}</a>`).join('');

  const enAreas = (C2.areas || []).slice(0, 4).join(', ');
  const enHotels = (C2.otel || []).slice(0, 2).join(' and ');

  const ekMetin = String(C2.ek || '');
  const dolgu = !ekMetin ? `
  <h2>${esc(nmE)} için ne zaman yazmalı</h2>
  <div class="about"><b>Gündüz 12:00-17:00</b><br>En sakin aralık. Aynı gün müsaitlik yüksek, 30-45 dakika önceden yazman yeterli.</div>
  <div class="about"><b>Akşam 18:00-22:00</b><br>En yoğun aralık. 1-2 saat önceden yazman gerekiyor.</div>
  <div class="about"><b>Gece 22:00-02:00</b><br>Bar ve casino çıkışı talebi burada toplanıyor. 10-15 dakika önceden yazman yeterli.</div>
  <h2>${esc(nmE)} bölgesinde sık yapılan hatalar</h2>
  <ul><li>Uzak noktaya son 10 dakikada yazmak.</li><li>Otel adı vermeden "lobide görüşelim" demek.</li><li>Otele veya eve 30 dakika istemek.</li><li>Nakit getirmemek.</li></ul>` : '';

  const icerik = `
  <div class="crumb"><a href="${BASE}/">Ana sayfa</a> › <span>${esc(C2.nm)}</span></div>
  <h1>${esc(nmE)} <span style="font-size:.55em;color:#93a0b4;font-weight:400">${esc(C2.alt)}</span></h1>
  <p class="lead">${esc(C2.lead)}</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:8px">
    <a class="btn" href="${WA}" target="_blank" rel="noopener">${esc(C2.nm)} Kataloğu İste</a>
    <a class="btn-o" href="${BASE}/fiyatlar">Fiyatlar</a>
  </div>
  ${img ? `<img class="rimg" src="${esc(img)}" alt="${esc(nmE)}" width="1200" height="700">` : ''}
  <div class="about">${esc(C2.metin)}</div>
  <div class="about">${esc(C2.metin2)}</div>
  <div class="about"><b>Hizmet verdiğimiz noktalar</b><br>${C2.areas.map(esc).join(' · ')}</div>
  <div class="about"><b>Sık çalıştığımız oteller</b><br>${C2.otel.map(esc).join(' · ')}</div>
  <h2>${esc(nmE)} fiyatları</h2>
  <div class="about"><b>30 dakika — 7.000 ₺</b><br>Yalnızca kendi yerimizde. Kısa görüşme.</div>
  <div class="about"><b>1 saat — 12.000 ₺</b><br>Otel ve eve çıkışta en çok seçilen süre; adrese çıkışta en alt sınır.</div>
  <div class="about"><b>2 saat — 17.000 ₺</b><br>Yemek ya da gece programı eklemek isteyenler için.</div>
  <div class="about"><b>4 saat — 22.000 ₺</b><br>Uzun eşlik ve gece planı.</div>
  <div class="about">Tarife sabit, pazarlık yok, kapıda değişmiyor. Tek değişken taksi: mesafeye göre hesaplanıp önceden söyleniyor. Tam liste <a href="${BASE}/fiyatlar">fiyatlar sayfasında</a>.</div>
  <div class="about" lang="en"><b>In English — ${esc(nmE)}</b><br>We arrange outcall meetings across ${esc(enAreas)}${enHotels ? ', and at hotels such as ' + esc(enHotels) : ''}. Rates are fixed: 30 minutes 7.000 ₺ (in-call only), 1 hour 12.000 ₺, 2 hours 17.000 ₺, 4 hours 22.000 ₺. No deposit — pay cash at the meeting. Any taxi fare is quoted before you confirm. Send your area, date and time on WhatsApp.</div>
  ${ekMetin}
  ${dolgu}
  <div class="about"><a href="${BASE}/blog/kibris-gece-hayati">Kıbrıs gece hayatı rehberi</a> · <a href="${BASE}/blog/kibris-otelleri">otel çevresinde görüşme</a> · <a href="${BASE}/fiyatlar">tarife</a></div>
  <p class="guncel">Son güncelleme: 23 Kasım 2026</p>
  <section class="sect"><h2>${esc(nmE)} hakkında sık sorulanlar</h2>
    ${(C2.sss || []).map(x => `<div class="about"><b>${esc(x[0])}</b><br>${esc(x[1])}</div>`).join('')}
  </section>
  <section class="sect"><h2>Diğer sayfalar</h2>
    <div style="display:flex;gap:8px;flex-wrap:wrap">${digerleri}</div>
  </section>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=1800, stale-while-revalidate=86400');
  res.status(200).send(sayfa({
    title, desc, url, img, active: url, icerik,
    ld: ld.map(x => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('')
  }));
};
