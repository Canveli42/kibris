const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const S = require('../data/shell.js');
const B = require('../data/bolge.js');
const R = require('../data/regions.js');
Object.assign(R, require('../data/regions.ek.js'));

const YAYIN = 'yayin_at.is.null,yayin_at.lte.now()';

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const ldYaz = x => '<script type="application/ld+json">' + JSON.stringify(x).replace(/</g, '\\u003c') + '</script>';

const FILTRE_CSS = `<style>
.cip-row{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 16px}
.cip-row b{font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:#8d9aab;width:100%;margin:6px 0 0}
.cip{border:1px solid var(--line);background:#0e161f;color:#e9eef6;border-radius:999px;padding:7px 13px;font:inherit;font-size:13px;cursor:pointer}
.cip[aria-pressed="true"]{background:linear-gradient(180deg,#f3ddb4,#d8b878);color:#121a24;border-color:transparent;font-weight:700}
.cip-row .temiz{color:#f0d9ae;font-size:13px;align-self:center;margin-left:4px}
.meta{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.meta span{font-size:11.5px;color:#9fb0c4;border:1px solid var(--line);border-radius:6px;padding:2px 6px}
</style>`;

const FILTRE_JS = `<script>
(function(){
  var k=document.querySelector('.mgrid');if(!k)return;
  var cips=document.querySelectorAll('.cip'),bos=document.querySelector('.bos');
  var sec={yas:[],hizmet:[],dil:[]};
  function uygula(){
    var n=0,l=k.children;
    for(var i=0;i<l.length;i++){
      var c=l[i],g=c.dataset,h=g.hizmet||'',d=g.dil||'',o=true;
      if(sec.yas.length&&sec.yas.indexOf(g.yasb)===-1)o=false;
      if(o&&sec.hizmet.length){o=false;for(var j=0;j<sec.hizmet.length;j++)if(h.indexOf(sec.hizmet[j])>-1)o=true}
      if(o&&sec.dil.length){o=false;for(var t=0;t<sec.dil.length;t++)if(d.indexOf(sec.dil[t])>-1)o=true}
      c.style.display=o?'':'none';if(o)n++;
    }
    if(bos)bos.style.display=n?'none':'';
  }
  for(var i=0;i<cips.length;i++)cips[i].addEventListener('click',function(){
    var f=this.dataset.f,v=this.dataset.v,a=sec[f],p=a.indexOf(v);
    if(p>-1){a.splice(p,1);this.setAttribute('aria-pressed','false')}
    else{a.push(v);this.setAttribute('aria-pressed','true')}
    uygula();
  });
  var t=document.querySelector('.temiz');
  if(t)t.addEventListener('click',function(e){
    e.preventDefault();sec.yas=[];sec.hizmet=[];sec.dil=[];
    for(var i=0;i<cips.length;i++)cips[i].setAttribute('aria-pressed','false');
    uygula();
  });
})();
</script>`;

const kabuk = o => `<!DOCTYPE html>
<html lang="tr"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.desc)}">
<link rel="canonical" href="${esc(o.url)}">
<link rel="sitemap" type="application/xml" href="${BASE}/sitemap.xml">
<meta name="robots" content="${o.robots || 'index,follow'}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="RedKıbrıs">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.desc)}">
<meta property="og:url" content="${esc(o.url)}">
<meta name="theme-color" content="#0b121b">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://accerzwswgiqhtfgoeqv.supabase.co/" crossorigin>
${S.head()}
${(o.ld || []).map(ldYaz).join('')}
</head><body>
${S.header({ aktif: o.aktif || '/modeller', dil: 'tr', ceviriler: { tr: o.url } })}
<main class="wrap" id="icerik">
${o.icerik}
</main>
${S.footer('tr')}
${FILTRE_CSS}
${FILTRE_JS}
</body></html>`;

const bitir = (res, html) => {
  const n = S.nonce();
  html = S.noncele(html, n);
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=1800, stale-while-revalidate=86400');
  res.setHeader('Content-Security-Policy', S.csp(n));
  res.status(200).send(html);
};

const cek = async () => {
  try {
    const r = await fetch(
      SB + '/rest/v1/posts?select=slug,title,img,bolge,il&published=eq.true&lang=eq.tr' +
      '&bolge=not.is.null&or=(' + YAYIN + ')&order=yayin_at.desc.nullslast&limit=2000',
      { headers: H }
    );
    if (r.ok) return (await r.json()) || [];
  } catch (e) {}
  return [];
};

const modelCek = async () => {
  try {
    const r = await fetch(SB + '/rest/v1/models?select=slug,yas,boy,hizmet,diller,saat,yer&limit=3000', { headers: H });
    if (r.ok) {
      const a = (await r.json()) || [];
      const m = {};
      a.forEach(x => { if (x && x.slug) m[x.slug] = x; });
      return m;
    }
  } catch (e) {}
  return {};
};

const yasBand = y => (!y ? '' : y <= 24 ? '18-24' : y <= 30 ? '25-30' : '31');

module.exports = async (req, res) => {
  const istek = String((req.query && req.query.bolge) || '').replace(/[^a-z-]/g, '');
  const kod = istek ? B.hubdan(istek) : '';
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  /* --- kök: bölge dizini --- */
  if (!istek) {
    const hepsi = await cek();
    const sayim = {};
    hepsi.forEach(p => {
      if (p.bolge && B.varMi(p.bolge)) sayim[p.bolge] = (sayim[p.bolge] || 0) + 1;
    });
    const sirali = Object.keys(sayim).sort((a, b) => sayim[b] - sayim[a]);

    const kartlar = sirali.map(b => `<a class="kart" href="${BASE}/modeller/${esc(B.hb(b))}">
      <span class="kb"><span class="kt">${esc(B.ad(b, 'tr'))}</span><span class="kc">${sayim[b]} profil</span></span></a>`).join('\n');

    const url = BASE + '/modeller';
    const icerik = `
    <div class="crumb"><a href="${BASE}/">Ana sayfa</a> › <span>Modeller</span></div>
    <h1>Escort Modelleri — Bölge Bölge</h1>
    <p class="lead">Profillerin tamamı bölge bölge ayrıldı. Bölgeyi seç, o bölgede görüşen modelleri gör. Kapora yok, ödeme görüşmenin başında.</p>
    ${sirali.length ? `<div class="mgrid">${kartlar}</div>` : '<div class="about">Henüz yayında profil yok.</div>'}
    <div class="about"><b>Sorun mu var, katalog mu lazım?</b><br>WhatsApp veya Telegram'dan yaz, kaldığın bölgeye göre liste gönderiyoruz.
      <br><a class="btn wa" href="https://wa.me/905515420755" target="_blank" rel="noopener" data-base="https://wa.me/905515420755">WhatsApp'tan yaz</a>
      <a class="btn tg" href="https://t.me/kibrisescortvip" target="_blank" rel="noopener" data-base="https://t.me/kibrisescortvip">Telegram'dan yaz</a>
    </div>`;

    bitir(res, kabuk({
      title: 'Escort Modelleri — Bölge Bölge Liste | RedKıbrıs',
      desc: 'Kıbrıs escort modelleri bölge bölge. Girne, Lefkoşa, Mağusa, İskele ve diğer bölgelerin profilleri tek listede.',
      url, icerik, aktif: '/modeller',
      ld: [
        { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Escort modelleri', url, inLanguage: 'tr' },
        { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana sayfa', item: BASE + '/' },
          { '@type': 'ListItem', position: 2, name: 'Modeller', item: url }
        ] }
      ]
    }));
    return;
  }

  if (!kod) {
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=600');
    res.status(404).send('Bölge bulunamadı');
    return;
  }

  const ad = B.ad(kod, 'tr');
  const bolgeYol = BASE + '/' + B.yol(kod);
  const url = BASE + '/modeller/' + B.hb(kod);
  const ust = B.ust(kod);
  const bolgeKayit = R[B.yol(kod)] || null;

  const [hepsi, modeller] = await Promise.all([cek(), modelCek()]);
  const liste = B.alt(kod) ? hepsi.filter(p => p.il === kod) : hepsi.filter(p => p.bolge === kod);

  /* filtre sayaçları */
  const say = { '18-24': 0, '25-30': 0, '31': 0 };
  const hizmetSet = {}, dilSet = {};
  liste.forEach(p => {
    const m = modeller[p.slug];
    if (!m) return;
    const yb = yasBand(m.yas);
    if (yb) say[yb]++;
    (m.hizmet || []).forEach(h => { const k = String(h).trim().toLowerCase(); if (k) hizmetSet[k] = (hizmetSet[k] || 0) + 1; });
    (m.diller || []).forEach(d => { const k = String(d).trim().toLowerCase(); if (k) dilSet[k] = (dilSet[k] || 0) + 1; });
  });

  const cip = (f, v, et) => `<button type="button" class="cip" data-f="${f}" data-v="${esc(v)}" aria-pressed="false">${esc(et)}</button>`;
  let cipHtml = '';
  const yasCip = Object.keys(say).filter(k => say[k]).map(k => cip('yas', k, k + ' yaş')).join('');
  const hizCip = Object.keys(hizmetSet).sort((a, b) => hizmetSet[b] - hizmetSet[a]).slice(0, 8).map(k => cip('hizmet', k, k)).join('');
  const dilAnahtar = Object.keys(dilSet).sort((a, b) => dilSet[b] - dilSet[a]);
  const dilCip = dilAnahtar.length > 1 ? dilAnahtar.slice(0, 4).map(k => cip('dil', k, k)).join('') : '';
  if (yasCip) cipHtml += `<div class="cip-row"><b>Yaş</b>${yasCip}</div>`;
  if (hizCip) cipHtml += `<div class="cip-row"><b>Hizmet</b>${hizCip}</div>`;
  if (dilCip) cipHtml += `<div class="cip-row"><b>Dil</b>${dilCip}</div>`;
  if (cipHtml) cipHtml += `<div class="cip-row"><a href="${url}" class="temiz">Filtreleri temizle</a></div>`;

  const kartlar = liste.map(p => {
    const m = modeller[p.slug] || {};
    const yb = yasBand(m.yas);
    const hiz = (m.hizmet || []).map(x => String(x).trim().toLowerCase()).join('|');
    const dil = (m.diller || []).map(x => String(x).trim().toLowerCase()).join('|');
    const rozet = [
      m.yas ? m.yas + ' yaş' : '',
      m.boy ? m.boy + ' cm' : '',
      m.saat ? esc(m.saat) : ''
    ].filter(Boolean).map(x => `<span>${x}</span>`).join('');
    return `<a class="kart" href="${BASE}/blog/${esc(p.slug)}" data-yasb="${esc(yb)}" data-hizmet="${esc(hiz)}" data-dil="${esc(dil)}">
    ${p.img ? `<img src="${esc(p.img)}" alt="${esc(p.title)}" loading="lazy" decoding="async" width="300" height="200">` : ''}
    <span class="kb"><span class="kt">${esc(p.title)}</span>${rozet ? `<span class="meta">${rozet}</span>` : ''}</span></a>`;
  }).join('\n');

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

  const giris = bolgeKayit && bolgeKayit.metin ? esc(bolgeKayit.metin) : `${esc(ad)} bölgesinde görüşen modellerin tamamı burada.`;

  const icerik = `
  <div class="crumb">${kirinti}</div>
  <h1>${esc(ad)} Escort Modelleri</h1>
  <p class="lead">${giris}</p>
  ${cipHtml}
  ${liste.length ? `<div class="mgrid">${kartlar}</div>` : '<div class="about">Sonuç yok.</div>'}
  <div class="about bos" style="display:none"><b>Bu filtrede model yok.</b><br>Filtreyi temizleyip tekrar bak veya WhatsApp'tan yaz, uygun olanı gönderelim.</div>
  <div class="about"><b>Bölge sayfası:</b> <a href="${bolgeYol}">${esc(ad)} escort</a> — buluşma noktaları, oteller ve saatler.
    <br><b>Tarife:</b> <a href="${BASE}/fiyatlar">fiyatlar</a> — sabit, kapıda değişmez.
    <br><a class="btn wa" href="https://wa.me/905515420755" target="_blank" rel="noopener" data-base="https://wa.me/905515420755">WhatsApp'tan yaz</a>
    <a class="btn tg" href="https://t.me/kibrisescortvip" target="_blank" rel="noopener" data-base="https://t.me/kibrisescortvip">Telegram'dan yaz</a>
  </div>
  <section class="faq">
    <h2>Sık sorulanlar</h2>
    <details><summary>${esc(ad)} bölgesinde kaç model var?</summary><p>Şu anda ${liste.length} profil yayında. Liste müsaitliğe göre değişiyor.</p></details>
    <details><summary>Hangi saatlerde görüşülüyor?</summary><p>${bolgeKayit && bolgeKayit.metin2 ? 'Bölge sayfasında saat dilimleri yazılı; merkezde 10-15 dakika önceden yazmak yeterli.' : 'Bölgeye göre değişiyor, yazdığında saati birlikte netleştiriyoruz.'}</p></details>
    <details><summary>Yol payı alınıyor mu?</summary><p>Merkez dışındaki adreslerde mesafeye göre değişir, mesajda önceden söylenir ve kapıda değişmez. Merkezde yok.</p></details>
  </section>`;

  bitir(res, kabuk({
    title: ad + ' Escort Modelleri | RedKıbrıs',
    desc: ad + ' escort modellerinin listesi. Yaş, hizmet ve dile göre filtrele. Sabit tarife, kapora yok, ödeme görüşmenin başında.',
    url, icerik, aktif: bolgeYol, ld,
    robots: !liste.length ? 'noindex,follow' : 'index,follow'
  }));
};
