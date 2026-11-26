const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const S = require('../data/shell.js');

const YAYIN = 'yayin_at.is.null,yayin_at.lte.now()';

const BOLGE = {
  girne: ['Girne', 'girne-escort'], karaoglanoglu: ['Karaoğlanoğlu', 'karaoglanoglu-escort'],
  alsancak: ['Alsancak', 'alsancak-escort'], lapta: ['Lapta', 'lapta-escort'],
  catalkoy: ['Çatalköy', 'catalkoy-escort'], bellapais: ['Bellapais', 'bellapais-escort'],
  esentepe: ['Esentepe', 'esentepe-escort'], lefkosa: ['Lefkoşa', 'lefkosa-escort'],
  gonyeli: ['Gönyeli', 'gonyeli-escort'], magusa: ['Mağusa', 'magusa-escort'],
  iskele: ['İskele', 'iskele-escort'], 'long-beach': ['Long Beach', 'long-beach-escort'],
  bafra: ['Bafra', 'bafra-escort'], guzelyurt: ['Güzelyurt', 'guzelyurt-escort']
};

const SEMT = {
  girne: ['merkez', 'liman', 'zeytinlik', 'karakum', 'nusmar'],
  lefkosa: ['kumsal', 'surici', 'ortakoy', 'hamitkoy', 'koskluciftlik', 'haspolat'],
  magusa: ['sakarya', 'maras', 'tuzla', 'canakkale'],
  iskele: []
};

const REHBER = new Set([
  'fiyatlari', 'villa', 'nasil-cagrilir', 'rehberi', 'rehber', 'program',
  '2-saat-program', '4-saat-program', 'gecelik-program', '30-dakika',
  'ilk-gorusme', 'lobi-mi-oda-mi', 'mitleri', 'sabah-gorusmesi',
  'vip-davet', 'turk-rus-farki', 'ulasim-ve-taksi', 'otelleri'
]);

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const ldYaz = x => '<script type="application/ld+json">' + JSON.stringify(x).replace(/</g, '\\u003c') + '</script>';

function onekler(kod) { return [kod].concat(SEMT[kod] || []); }

function profilMi(slug, kod) {
  const m = String(slug || '').match(/^([a-z-]+)-escort-(.+)$/);
  if (!m) return false;
  const onek = m[1];
  const kuyruk = m[2].replace(/-(19|20)\d{2}$/, '');
  if (REHBER.has(kuyruk)) return false;
  const ilk = onek.split('-')[0];
  if (BOLGE[ilk]) return ilk === kod;
  return onekler(kod).some(o => onek === o || onek.endsWith('-' + o));
}

function specOku(govde) {
  const m = String(govde || '').replace(/\r/g, '').match(/:::profil\s*\n([\s\S]*?)\n:::/);
  if (!m) return {};
  const s = {};
  m[1].split('\n').forEach(sat => {
    const p = sat.indexOf(':');
    if (p < 1) return;
    s[sat.slice(0, p).trim().toLowerCase()] = sat.slice(p + 1).trim();
  });
  return s;
}

const YAS = [['18-25', 18, 25], ['26-32', 26, 32], ['33-99', 33, 99]];

const HIZMET = [
  ['anal', /anal|popo|arkadan/i],
  ['kilifsiz', /kilifsiz|kılıfsız|saksoz|saksoyu|oral|girtlak|gırtlak|yutuyor|ağzıyla|agziyla|masaj/i],
  ['grup', /grup|swinger|iki erkek|üçlü|uclu/i]
];

const GECE = /gece|geç saat|gec saat|sabahın|sabahin/i;
const GUNDUZ = /gündüz|gunduz|sabah|öğlen|oglen/i;

function etiketle(p) {
  const s = specOku(p.body);
  const metin = (String(p.title || '') + ' ' + String(p.slug || '') + ' ' + String(p.body || '').slice(0, 900)).toLowerCase();

  let yas = parseInt(s.yas, 10) || 0;
  if (!yas) {
    const m = metin.match(/(\d{2})\s*ya[sş]/);
    if (m) yas = parseInt(m[1], 10) || 0;
    else if (/kirkinda|kırkında|olgun|deneyimli/.test(metin)) yas = 40;
    else if (/yeni basladi|yeni başladı|genç|genc/.test(metin)) yas = 22;
  }

  let hizmet = String(s.hizmet || '').toLowerCase();
  if (!hizmet) hizmet = HIZMET.filter(h => h[1].test(metin)).map(h => h[0]).join(' ');

  let saat = String(s.saat || '').toLowerCase();
  if (!saat) saat = GECE.test(metin) ? 'gece' : (GUNDUZ.test(metin) ? 'gunduz' : '');

  return { yas, hizmet, saat };
}

module.exports = async (req, res) => {
  const kod = String((req.query && req.query.bolge) || '').replace(/[^a-z-]/g, '');
  const b = BOLGE[kod];

  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (!b) {
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=600');
    res.status(404).send('Bölge bulunamadı');
    return;
  }

  const ad = b[0], bolgeYol = BASE + '/' + b[1], url = BASE + '/modeller/' + kod;
  const q = req.query || {};
  const qYas = String(q.yas || '').replace(/[^0-9-]/g, '');
  const qHizmet = String(q.hizmet || '').replace(/[^a-z-]/g, '');
  const qSaat = q.saat === 'gece' ? 'gece' : (q.saat === 'gunduz' ? 'gunduz' : '');

  let hepsi = [];
  try {
    const r = await fetch(
      SB + '/rest/v1/posts?select=slug,title,img,body&published=eq.true&lang=eq.tr' +
      '&or=(' + YAYIN + ')&order=yayin_at.desc.nullslast&limit=2000',
      { headers: H }
    );
    if (r.ok) hepsi = (await r.json()) || [];
  } catch (e) {}

  const tum = hepsi.filter(p => profilMi(p.slug, kod)).map(p => {
    const e = etiketle(p);
    return { slug: p.slug, title: p.title, img: p.img, yas: e.yas, hizmet: e.hizmet, saat: e.saat };
  });

  const yasVar = x => {
    const a = YAS.find(y => y[0] === x);
    return a ? (p => p.yas >= a[1] && p.yas <= a[2]) : (() => true);
  };

  let liste = tum;
  if (qYas && YAS.some(y => y[0] === qYas)) liste = liste.filter(yasVar(qYas));
  if (qHizmet) liste = liste.filter(x => x.hizmet.indexOf(qHizmet) > -1);
  if (qSaat === 'gece') liste = liste.filter(x => x.saat === 'gece');
  if (qSaat === 'gunduz') liste = liste.filter(x => x.saat === 'gunduz');

  const kartlar = liste.map(p => `<a class="kart" href="${BASE}/blog/${esc(p.slug)}">
    ${p.img ? `<img src="${esc(p.img)}" alt="${esc(p.title)}" loading="lazy" decoding="async" width="300" height="200">` : ''}
    <span class="kb"><span class="kt">${esc(p.title)}</span><span class="km">${p.yas ? p.yas + ' yaş' : ''}${p.yas && p.saat ? ' · ' : ''}${esc(p.saat === 'gece' ? 'gece' : p.saat === 'gunduz' ? 'gündüz' : '')}</span></span></a>`).join('\n');

  const cip = (href, etiket, secili, adet) =>
    `<a href="${href}"${secili ? ' class="on"' : ''}${adet === 0 ? ' style="opacity:.5"' : ''}>${etiket} (${adet})</a>`;

  const suz = `<div class="suz">
    ${cip(url, 'Hepsi', !qYas && !qHizmet && !qSaat, tum.length)}
    ${YAS.map(y => cip(url + '?yas=' + y[0], y[0] + ' yaş', qYas === y[0], tum.filter(yasVar(y[0])).length)).join('')}
    ${HIZMET.map(h => cip(url + '?hizmet=' + h[0], h[0] === 'anal' ? 'Anal' : h[0] === 'kilifsiz' ? 'Kılıfsız oral' : 'Grup', qHizmet === h[0], tum.filter(x => x.hizmet.indexOf(h[0]) > -1).length)).join('')}
    ${cip(url + '?saat=gece', 'Gece', qSaat === 'gece', tum.filter(x => x.saat === 'gece').length)}
    ${cip(url + '?saat=gunduz', 'Gündüz', qSaat === 'gunduz', tum.filter(x => x.saat === 'gunduz').length)}
  </div>`;

  const ld = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: ad + ' escort modelleri', url, inLanguage: 'tr', about: { '@type': 'Place', name: ad } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana sayfa', item: BASE + '/' },
      { '@type': 'ListItem', position: 2, name: ad, item: bolgeYol },
      { '@type': 'ListItem', position: 3, name: 'Modeller', item: url }
    ] }
  ];
  if (liste.length) ld.push({
    '@context': 'https://schema.org', '@type': 'ItemList',
    numberOfItems: liste.length,
    itemListElement: liste.slice(0, 100).map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title, url: BASE + '/blog/' + p.slug }))
  });

  const icerik = `
  <div class="crumb"><a href="${BASE}/">Ana sayfa</a> › <a href="${bolgeYol}">${esc(ad)}</a> › <span>Modeller</span></div>
  <h1>${esc(ad)} Escort Modelleri</h1>
  <p class="lead">${esc(ad)} bölgesinde görüşen modellerin tamamı burada. Profillerde yaş, hizmet, uygun saatler ve tarife yazılı. Kapora yok, ödeme görüşmenin başında.</p>
  <div class="about"><a href="${bolgeYol}">${esc(ad)} bölge sayfası</a> · <a href="${BASE}/fiyatlar">Fiyatlar</a> · <a href="${BASE}/blog">Rehber yazıları</a></div>
  ${suz}
  ${liste.length ? `<div class="mgrid">${kartlar}</div>` : '<div class="about">Bu filtrede profil yok. <a href="' + url + '">Filtreyi temizle</a>.</div>'}
  <div class="about"><b>Sorun mu var, katalog mu lazım?</b><br>WhatsApp veya Telegram'dan yaz, kaldığın bölgeye göre liste gönderiyoruz.
    <br><a class="btn wa" href="https://wa.me/905515420755" target="_blank" rel="noopener" data-base="https://wa.me/905515420755">WhatsApp'tan yaz</a>
    <a class="btn tg" href="https://t.me/kibrisescortvip" target="_blank" rel="noopener" data-base="https://t.me/kibrisescortvip">Telegram'dan yaz</a>
  </div>`;

  let html = `<!DOCTYPE html>
<html lang="tr"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(ad)} Escort Modelleri | RedKıbrıs</title>
<meta name="description" content="${esc(ad)} escort modellerinin listesi. Yaş, hizmet ve uygun saatlere göre filtrele. Sabit tarife, kapora yok, ödeme görüşmenin başında.">
<link rel="canonical" href="${url}">
<link rel="sitemap" type="application/xml" href="${BASE}/sitemap.xml">
<meta name="robots" content="index,follow">
<meta property="og:type" content="website">
<meta property="og:site_name" content="RedKıbrıs">
<meta property="og:title" content="${esc(ad)} Escort Modelleri">
<meta property="og:description" content="${esc(ad)} bölgesindeki modellerin listesi.">
<meta property="og:url" content="${url}">
<meta name="theme-color" content="#0b121b">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://accerzwswgiqhtfgoeqv.supabase.co/" crossorigin>
${S.head()}
${ld.map(ldYaz).join('')}
</head><body>
${S.header({ aktif: bolgeYol, dil: 'tr', ceviriler: { tr: url } })}
<main class="wrap" id="icerik">
${icerik}
</main>
${S.footer('tr')}
</body></html>`;

  const n = S.nonce();
  html = S.noncele(html, n);

  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=1800, stale-while-revalidate=86400');
  res.setHeader('Content-Security-Policy', S.csp(n));
  res.status(200).send(html);
};
