const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const S = require('../data/shell.js');
const B = require('../data/bolge.js');

const YAYIN = 'yayin_at.is.null,yayin_at.lte.now()';

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const ldYaz = x => '<script type="application/ld+json">' + JSON.stringify(x).replace(/</g, '\\u003c') + '</script>';

const ARA_CSS = `<style>
.ara{display:flex;gap:8px;margin:0 0 20px;background:none;border:0;padding:0}
.ara input{flex:1;min-width:0;background:#0e161f;color:#e9eef6;border:1px solid var(--line);border-radius:999px;padding:11px 16px;font:inherit;font-size:15px}
.ara button{border:0;border-radius:999px;padding:11px 20px;font-weight:700;font-size:14px;background:linear-gradient(180deg,#f3ddb4,#d8b878);color:#121a24;cursor:pointer}
.ara a{display:flex;align-items:center;padding:0 14px;border:1px solid var(--line);border-radius:999px;font-size:13px;color:#f0d9ae}
</style>`;

const CANLI = `<script>
(function(){
  var f=document.querySelector('.ara'),i=f&&f.querySelector('input'),k=document.querySelector('.mgrid');
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
  const istek = String((req.query && req.query.bolge) || '').replace(/[^a-z-]/g, '');
  const kod = B.hubdan(istek);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (!kod) {
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=600');
    res.status(404).send('Bölge bulunamadı');
    return;
  }

  const ad = B.ad(kod, 'tr');
  const bolgeYol = BASE + '/' + B.yol(kod);
  const url = BASE + '/modeller/' + B.hb(kod);
  const q = String((req.query && req.query.q) || '').trim().slice(0, 60);
  const ust = B.ust(kod);

  let hepsi = [];
  try {
    const r = await fetch(
      SB + '/rest/v1/posts?select=slug,title,img,bolge,il&published=eq.true&lang=eq.tr' +
      '&bolge=not.is.null&or=(' + YAYIN + ')&order=yayin_at.desc.nullslast&limit=2000',
      { headers: H }
    );
    if (r.ok) hepsi = (await r.json()) || [];
  } catch (e) {}

  let liste = B.alt(kod) ? hepsi.filter(p => p.il === kod) : hepsi.filter(p => p.bolge === kod);

  if (q) {
    const k = q.toLowerCase();
    liste = liste.filter(p => (String(p.title || '') + ' ' + String(p.slug || '')).toLowerCase().indexOf(k) > -1);
  }

  const kartlar = liste.map(p => `<a class="kart" href="${BASE}/blog/${esc(p.slug)}">
    ${p.img ? `<img src="${esc(p.img)}" alt="${esc(p.title)}" loading="lazy" decoding="async" width="300" height="200">` : ''}
    <span class="kb"><span class="kt">${esc(p.title)}</span></span></a>`).join('\n');

  const kirinti = `<a href="${BASE}/">Ana sayfa</a> › ` +
    (ust ? `<a href="${BASE}/${B.yol(ust)}">${esc(B.ad(ust, 'tr'))}</a> › ` : '') +
    `<a href="${bolgeYol}">${esc(ad)}</a> › <span>Modeller</span>`;

  const kirintiLd = [{ '@type': 'ListItem', position: 1, name: 'Ana sayfa', item: BASE + '/' }];
  if (ust) kirintiLd.push({ '@type': 'ListItem', position: 2, name: B.ad(ust, 'tr'), item: BASE + '/' + B.yol(ust) });
  kirintiLd.push({ '@type': 'ListItem', position: kirintiLd.length + 1, name: ad, item: bolgeYol });
  kirintiLd.push({ '@type': 'ListItem', position: kirintiLd.length + 1, name: 'Modeller', item: url });

  const ld = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: ad + ' escort modelleri', url, inLanguage: 'tr', about: { '@type': 'Place', name: ad } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: kirintiLd }
  ];
  if (liste.length) ld.push({
    '@context': 'https://schema.org', '@type': 'ItemList',
    numberOfItems: liste.length,
    itemListElement: liste.slice(0, 100).map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title, url: BASE + '/blog/' + p.slug }))
  });

  const araForm = `<form class="ara" action="${url}" method="get" role="search">
    <input type="search" name="q" value="${esc(q)}" placeholder="Model ara" aria-label="Model ara" autocomplete="off">
    <button type="submit">Ara</button>
    ${q ? `<a href="${url}">Temizle</a>` : ''}
  </form>`;

  const icerik = `
  <div class="crumb">${kirinti}</div>
  <h1>${esc(ad)} Escort Modelleri</h1>
  <p class="lead">${esc(ad)} bölgesinde görüşen modellerin tamamı burada. Kapora yok, ödeme görüşmenin başında.</p>
  ${araForm}
  ${q ? `<p class="guncel">${liste.length} sonuç</p>` : ''}
  ${liste.length ? `<div class="mgrid">${kartlar}</div>` : '<div class="about">Sonuç yok.</div>'}
  <div class="about"><b>Sorun mu var, katalog mu lazım?</b><br>WhatsApp veya Telegram'dan yaz, kaldığın bölgeye göre liste gönderiyoruz.
    <br><a class="btn wa" href="https://wa.me/905515420755" target="_blank" rel="noopener" data-base="https://wa.me/905515420755">WhatsApp'tan yaz</a>
    <a class="btn tg" href="https://t.me/kibrisescortvip" target="_blank" rel="noopener" data-base="https://t.me/kibrisescortvip">Telegram'dan yaz</a>
  </div>`;

  let html = `<!DOCTYPE html>
<html lang="tr"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(ad)} Escort Modelleri | RedKıbrıs</title>
<meta name="description" content="${esc(ad)} escort modellerinin listesi. Sabit tarife, kapora yok, ödeme görüşmenin başında.">
<link rel="canonical" href="${url}">
<link rel="sitemap" type="application/xml" href="${BASE}/sitemap.xml">
<meta name="robots" content="${q ? 'noindex,follow' : 'index,follow'}">
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
${ARA_CSS}
${CANLI}
</body></html>`;

  const n = S.nonce();
  html = S.noncele(html, n);

  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=1800, stale-while-revalidate=86400');
  res.setHeader('Content-Security-Policy', S.csp(n));
  res.status(200).send(html);
};
