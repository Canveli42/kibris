const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const WA = 'https://wa.me/905515420755';
const TG = 'https://t.me/kibrisescortvip';
const D = require('../data/regions.js');
const C = require('../data/chrome.js');

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

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
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath d='M32 2 62 32 32 62 2 32Z' fill='%23c8102e'/%3E%3Ctext x='32' y='41' font-family='Georgia' font-size='23' font-weight='700' fill='%23ffffff' text-anchor='middle'%3ERK%3C/text%3E%3C/svg%3E">
<style>${C.css}</style>
${o.ld || ''}
</head><body>
${C.header(o.active)}
<main class="wrap">
${o.icerik}
</main>
${C.footer()}
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
      url: BASE + '/' + slug,
      active: '',
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
      areaServed: C2.areas, url: url,
      ...(img ? { image: img } : {}),
      provider: { '@type': 'LocalBusiness', name: 'RedKıbrıs' }
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana sayfa', item: BASE + '/' },
        { '@type': 'ListItem', position: 2, name: C2.nm, item: url }
      ]
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: (C2.sss || []).map(x => ({
        '@type': 'Question', name: x[0],
        acceptedAnswer: { '@type': 'Answer', text: x[1] }
      }))
    }
  ];

  const digerleri = Object.keys(D).filter(k => k !== slug)
    .map(k => `<a class="btn-o" href="${BASE}/${k}">${esc(D[k].nm)}</a>`).join('');

  const enAreas = (C2.areas || []).slice(0, 4).join(', ');
  const enHotels = (C2.otel || []).slice(0, 2).join(' and ');

  const icerik = `
  <div class="crumb"><a href="${BASE}/">Ana sayfa</a> › <span>${esc(C2.nm)}</span></div>
  <h1>${esc(nmE)} <span style="font-size:.55em;color:#93a0b4;font-weight:400">${esc(C2.alt)}</span></h1>
  <p class="lead">${esc(C2.lead)}</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:8px">
    <a class="btn wa" href="${WA}" target="_blank" rel="noopener">${esc(C2.nm)} Kataloğu İste</a>
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
  <div class="about">Tarife sabit, pazarlık yok, kapıda değişmiyor. Tek değişken taksi: her yöne mesafeye göre hesaplanıp önceden söyleniyor. Tam liste <a href="${BASE}/fiyatlar">fiyatlar sayfasında</a>.</div>
  <div class="about" lang="en">
    <b>In English — ${esc(nmE)}</b><br>
    We arrange outcall meetings across ${esc(enAreas)}${enHotels ? ', and at hotels such as ' + esc(enHotels) : ''}. Rates are fixed and published: 30 minutes 7.000 ₺ (in-call only), 1 hour 12.000 ₺, 2 hours 17.000 ₺, 4 hours 22.000 ₺. No deposit is taken — you pay cash at the meeting. Any taxi fare is quoted before you confirm. Send your area, date and time on WhatsApp and we reply with the current selection.
  </div>
  ${C2.ek || ''}
  <div class="about"><a href="${BASE}/blog/kibris-gece-hayati">Kıbrıs gece hayatı rehberi</a> · <a href="${BASE}/blog/kibris-otelleri">otel çevresinde görüşme</a> · <a href="${BASE}/fiyatlar">tarife</a></div>
  <p class="guncel">Son güncelleme: 23 Kasım 2026</p>
  <section class="sect">
    <h2>${esc(nmE)} hakkında sık sorulanlar</h2>
    ${(C2.sss || []).map(x => `<div class="about"><b>${esc(x[0])}</b><br>${esc(x[1])}</div>`).join('')}
  </section>
  <section class="sect">
    <h2>Diğer sayfalar</h2>
    <div style="display:flex;gap:8px;flex-wrap:wrap">${digerleri}</div>
  </section>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=1800, stale-while-revalidate=86400');
  res.status(200).send(sayfa({
    title, desc, url, img, active: url, icerik,
    ld: ld.map(x => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('')
  }));
};
