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
  const m = String(govde || '').match(/^:::profil\s*\n([\s\S]*?)\n:::/);
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

  let liste = hepsi.filter(p => profilMi(p.slug, kod)).map(p => {
    const s = specOku(p.body);
    return { slug: p.slug, title: p.title, img: p.img, yas: parseInt(s.yas, 10) || 0, hizmet: String(s.hizmet || '').toLowerCase(), saat: String(s.saat || '') };
  });

  if (qYas) {
    const aralik = YAS.find(x => x[0] === qYas);
    if (aralik) liste = liste.filter(x => x.yas >= aralik[1] && x.yas <= aralik[2]);
  }
  if (qHizmet) liste = liste.filter(x => x.hizmet.indexOf(qHizmet) > -1);
  if (qSaat === 'gece') liste = liste.filter(x => /2[0-3]:|0[0-3]:|gece/i.test(x.saat));
  if (qSaat === 'gunduz') liste = liste.filter(x => /^1[0-9]:|^0[89]:|^1[12]:/.test(x.saat));

  const kartlar = liste.map(p => `<a class="kart" href="${BASE}/blog/${esc(p.slug)}">
    ${p.img ? `<img src="${esc(p.img)}" alt="${esc(p.title)}" loading="lazy" decoding="async" width="300" height="200">` : ''}
    <span class="kb"><span class="kt">${esc(p.title)}</span><span class="km">${p.yas ? p.yas + ' yaş' : ''}${p.yas && p.saat ? ' · ' : ''}${esc(p.saat || '')}</span></span></a>`).join('\n');

  const suzYol = (ek) => url + ek;
  const suz = `<div class="suz">
    <a href="${url}"${!qYas && !qHizmet && !qSaat ? ' class="on"' : ''}>Hepsi</a>
    ${YAS.map(y => `<a href="${suzYol('?yas=' + y[0])}"${qYas === y[0] ? ' class="on"' : ''}>${y[0]} yaş</a>`).join('')}
    <a href="${suzYol('?hizmet=anal')}"${qHizmet === 'anal' ? ' class="on"' : ''}>Anal</a>
    <a href="${suzYol('?hizmet=kilifsiz')}"${qHizmet === 'kilifsiz' ? ' class="on"' : ''}>Kılıfsız oral</a>
    <a href="${suzYol('?hizmet=grup')}"${qHizmet === 'grup' ? ' class="on"' : ''}>Grup</a>
    <a href="${suzYol('?saat=gece')}"${qSaat === 'gece' ? ' class="on"' : ''}>Gece</a>
    <a href="${suzYol('?saat=gunduz')}"${qSaat === 'gunduz' ? ' class="on"' : ''}>Gündüz</a>
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
