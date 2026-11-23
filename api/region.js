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

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0f18;color:#f2f5f8;font:16px/1.68 ui-sans-serif,system-ui,-apple-system,sans-serif;padding-bottom:96px}
a{color:inherit;text-decoration:none}
img{max-width:100%;display:block}
.wrap{max-width:820px;margin:0 auto;padding:0 18px}
header{position:sticky;top:0;z-index:40;background:rgba(11,18,27,.96);border-bottom:1px solid #1b2a3a;backdrop-filter:blur(10px)}
.hrow{max-width:1080px;margin:0 auto;height:68px;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:0 18px}
.logo{display:flex;align-items:center;gap:10px;font-family:Georgia,serif;font-size:19px;color:#f6f2ea}
.logo em{font-style:normal;color:#e0233f}
.btn{display:inline-flex;align-items:center;justify-content:center;background:linear-gradient(180deg,#f3ddb4,#d8b878);color:#121a24;font-weight:700;border:0;border-radius:11px;padding:11px 18px;font-size:14px}
.btn.wa{background:#25d366;color:#fff}
.btn.tg{background:#229ed9;color:#fff}
.btn-o{display:inline-block;background:#0e161f;border:1px solid #22303f;color:#f2f5f8;border-radius:11px;padding:11px 15px;font-size:13.5px;font-weight:600;text-align:center}
nav{display:none;gap:18px;font-size:14px;color:#93a1b0}
@media(min-width:860px){nav{display:flex}}
.crumb{font-size:13px;color:#8b97a5;padding:22px 0 0}
.crumb a{color:#eed3a1}
h1{font-size:clamp(25px,4.4vw,36px);line-height:1.16;letter-spacing:-.035em;font-weight:800;margin:10px 0 12px;color:#fff}
.lead{color:#8b97a5;font-size:16px;margin-bottom:22px}
h2{font-size:20px;color:#fff;border-left:3px solid #d8b878;padding-left:12px;margin:30px 0 14px}
.rimg{width:100%;max-height:400px;object-fit:cover;border-radius:14px;border:1px solid #22303f;margin:22px 0;background:#16202c}
.about{background:#111823;border:1px solid #22303f;border-radius:12px;padding:18px;margin:12px 0;font-size:15px;color:#c3cdd9}
.about b{color:#fff}
.about a{color:#eed3a1;text-decoration:underline}
ul{margin:0 0 14px 20px;color:#c3cdd9}
li{margin-bottom:6px}
.guncel{font-size:12px;color:#8b97a5;margin-top:10px}
.sect{padding:6px 0}
footer{background:#080c12;border-top:1px solid #22303f;color:#93a1b0;margin-top:40px;padding:26px 0 34px;font-size:13px}
footer a{color:#eed3a1}
`;

const sayfa = o => `<!DOCTYPE html>
<html lang="tr"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.desc)}">
<link rel="canonical" href="${esc(o.url)}">
<meta name="robots" content="index,follow">
<meta property="og:type" content="website">
<meta property="og:site_name" content="RedKıbrıs">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.desc)}">
<meta property="og:url" content="${esc(o.url)}">
${o.img ? `<meta property="og:image" content="${esc(o.img)}">` : ''}
<meta name="theme-color" content="#0b121b">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath d='M32 2 62 32 32 62 2 32Z' fill='%230b121b' stroke='%23d8b878' stroke-width='3'/%3E%3C/svg%3E">
<style>${CSS}</style>
${o.ld || ''}
</head><body>
<header><div class="hrow">
  <a class="logo" href="${BASE}/">Red<em>Kıbrıs</em></a>
  <a class="btn wa" href="${WA}" target="_blank" rel="noopener">Katalog</a>
  <nav>
    <a href="${BASE}/">Ana Sayfa</a>
    <a href="${BASE}/girne-escort">Girne</a>
    <a href="${BASE}/lefkosa-escort">Lefkoşa</a>
    <a href="${BASE}/magusa-escort">Mağusa</a>
    <a href="${BASE}/iskele-escort">İskele</a>
    <a href="${BASE}/guzelyurt-escort">Güzelyurt</a>
    <a href="${BASE}/fiyatlar">Fiyatlar</a>
    <a href="${BASE}/blog">Blog</a>
    <a href="${BASE}/iletisim">İletişim</a>
  </nav>
</div></header>
<main class="wrap">
${o.icerik}
</main>
<footer><div class="wrap">
  <p><b>RedKıbrıs · Kıbrıs Escort</b></p>
  <p>Girne merkez · <a href="tel:+905515420755">+90 551 542 07 55</a></p>
  <p><a href="${BASE}/blog">Blog</a> · <a href="${WA}" target="_blank" rel="noopener">WhatsApp</a> · <a href="${TG}" target="_blank" rel="noopener">Telegram</a> · <a href="${BASE}/gizlilik">Gizlilik</a></p>
</div></footer>
<script src="${BASE}/js/iletisim.js" defer></script>
</body></html>`;

module.exports = async (req, res) => {
  const slug = String((req.query && req.query.slug) || '').replace(/[^a-z0-9-]/gi, '');
  const C = D[slug];

  if (!C) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(404).send(sayfa({
      title: 'Sayfa bulunamadı | RedKıbrıs',
      desc: 'Aradığın bölge sayfası bulunamadı.',
      url: BASE + '/' + slug,
      icerik: `<h1>Sayfa bulunamadı</h1><div class="about">Bu adreste bölge yok. <a href="${BASE}/">Ana sayfaya</a> dönebilirsin.</div>`
    }));
    return;
  }

  const nmE = /Escort/i.test(C.nm) ? C.nm : C.nm + ' Escort';
  const altE = /Escort/i.test(C.alt) ? '' : ' Escort';
  const url = BASE + '/' + slug;
  const title = nmE + ' | ' + C.alt + altE + ' – RedKıbrıs';
  const desc = nmE + ' – ' + C.alt + '. Sabit tarife, kapora yok, otel ve eve çıkış. Taksi ücreti mesafeye göre önceden söylenir.';

  let img = '';
  try {
    const r = await fetch(SB + '/rest/v1/regions?select=slug,img', { headers: H });
    if (r.ok) {
      const rows = await r.json();
      const hit = (rows || []).find(x => x.slug === slug);
      if (hit && hit.img) img = hit.img;
    }
  } catch (e) {}

  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'Service', serviceType: nmE,
      areaServed: C.areas, url: url,
      ...(img ? { image: img } : {}),
      provider: { '@type': 'LocalBusiness', name: 'RedKıbrıs' }
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana sayfa', item: BASE + '/' },
        { '@type': 'ListItem', position: 2, name: C.nm, item: url }
      ]
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: (C.sss || []).map(x => ({
        '@type': 'Question', name: x[0],
        acceptedAnswer: { '@type': 'Answer', text: x[1] }
      }))
    }
  ];

  const digerleri = Object.keys(D).filter(k => k !== slug)
    .map(k => `<a class="btn-o" href="${BASE}/${k}">${esc(D[k].nm)}</a>`).join('');

  const icerik = `
  <div class="crumb"><a href="${BASE}/">Ana sayfa</a> › <span>${esc(C.nm)}</span></div>
  <h1>${esc(nmE)} <span style="font-size:.55em;color:#8b97a5;font-weight:400">${esc(C.alt)}</span></h1>
  <p class="lead">${esc(C.lead)}</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:8px">
    <a class="btn wa" href="${WA}" target="_blank" rel="noopener">${esc(C.nm)} Kataloğu İste</a>
    <a class="btn-o" href="${BASE}/fiyatlar">Fiyatlar</a>
  </div>
  ${img ? `<img class="rimg" src="${esc(img)}" alt="${esc(nmE)}" width="1200" height="700">` : ''}
  <div class="about">${esc(C.metin)}</div>
  <div class="about">${esc(C.metin2)}</div>
  <div class="about"><b>Hizmet verdiğimiz noktalar</b><br>${C.areas.map(esc).join(' · ')}</div>
  <div class="about"><b>Sık çalıştığımız oteller</b><br>${C.otel.map(esc).join(' · ')}</div>
  <h2>${esc(nmE)} fiyatları</h2>
  <div class="about"><b>30 dakika — 7.000 ₺</b><br>Yalnızca kendi yerimizde. Kısa görüşme.</div>
  <div class="about"><b>1 saat — 12.000 ₺</b><br>Otel ve eve çıkışta en çok seçilen süre; adrese çıkışta en alt sınır.</div>
  <div class="about"><b>2 saat — 17.000 ₺</b><br>Yemek ya da gece programı eklemek isteyenler için.</div>
  <div class="about"><b>4 saat — 22.000 ₺</b><br>Uzun eşlik ve gece planı.</div>
  <div class="about">Tarife sabit, pazarlık yok, kapıda değişmiyor. Tek değişken taksi: her yöne mesafeye göre hesaplanıp önceden söyleniyor. Tam liste <a href="${BASE}/fiyatlar">fiyatlar sayfasında</a>.</div>
  ${C.ek || ''}
  <div class="about"><a href="${BASE}/blog/kibris-gece-hayati">Kıbrıs gece hayatı rehberi</a> · <a href="${BASE}/blog/kibris-otelleri">otel çevresinde görüşme</a> · <a href="${BASE}/fiyatlar">tarife</a></div>
  <p class="guncel">Son güncelleme: 23 Kasım 2026</p>
  <section class="sect">
    <h2>${esc(nmE)} hakkında sık sorulanlar</h2>
    ${(C.sss || []).map(x => `<div class="about"><b>${esc(x[0])}</b><br>${esc(x[1])}</div>`).join('')}
  </section>
  <section class="sect">
    <h2>Diğer sayfalar</h2>
    <div style="display:flex;gap:8px;flex-wrap:wrap">${digerleri}</div>
  </section>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=1800, stale-while-revalidate=86400');
  res.status(200).send(sayfa({
    title, desc, url, img, icerik,
    ld: ld.map(x => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('')
  }));
};
