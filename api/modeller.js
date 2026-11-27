const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const S = require('../data/shell.js');
const B = require('../data/bolge.js');
const R = require('../data/regions.js');
Object.assign(R, require('../data/regions.ek.js'));

const YAYIN = 'yayin_at.is.null,yayin_at.lte.now()';
const DILLER = ['tr', 'en', 'ru'];

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const ldYaz = x => '<script type="application/ld+json">' + JSON.stringify(x).replace(/</g, '\\u003c') + '</script>';

const kok = dil => (dil === 'tr' ? '/modeller' : '/' + dil + '/modeller');
const bolgeYolDil = (dil, kod) => BASE + '/' + (dil === 'tr' ? '' : dil + '/') + B.yol(kod);

const M = {
  tr: {
    dirTitle: 'Escort Modelleri — Bölge Bölge Liste | RedKıbrıs',
    dirDesc: 'Kıbrıs escort modelleri bölge bölge. Girne, Lefkoşa, Mağusa, İskele ve diğer bölgelerin profilleri tek listede.',
    dirH1: 'Escort Modelleri — Bölge Bölge',
    dirLead: 'Profillerin tamamı bölge bölge ayrıldı. Bölgeyi seç, o bölgede görüşen modelleri gör. Kapora yok, ödeme görüşmenin başında.',
    dirEmpty: 'Henüz yayında profil yok.',
    dirNeed: 'Sorun mu var, katalog mu lazım?',
    dirNeedAlt: 'WhatsApp veya Telegram\'dan yaz, kaldığın bölgeye göre liste gönderiyoruz.',
    crumbHome: 'Ana sayfa', crumbMod: 'Modeller', profil: 'profil',
    age: 'Yaş', service: 'Hizmet', lang: 'Dil', clear: 'Filtreleri temizle',
    ageCip: k => k + ' yaş',
    noResult: 'Sonuç yok.',
    emptyFilter: 'Bu filtrede model yok.', emptyFilterAlt: 'Filtreyi temizleyip tekrar bak veya WhatsApp\'tan yaz, uygun olanı gönderelim.',
    regionPage: 'Bölge sayfası:', tariff: 'Tarife:', tariffAlt: 'sabit, kapıda değişmez.',
    faq: 'Sık sorulanlar',
    faq1: ad => ad + ' bölgesinde kaç model var?',
    faq1a: n => 'Şu anda ' + n + ' profil yayında. Liste müsaitliğe göre değişiyor.',
    faq2: 'Hangi saatlerde görüşülüyor?',
    faq2a: 'Bölge sayfasında saat dilimleri yazılı; merkezde 10-15 dakika önceden yazmak yeterli.',
    faq2b: 'Bölgeye göre değişiyor, yazdığında saati birlikte netleştiriyoruz.',
    faq3: 'Yol payı alınıyor mu?',
    faq3a: 'Merkez dışındaki adreslerde mesafeye göre değişir, mesajda önceden söylenir ve kapıda değişmez. Merkezde yok.',
    h1: ad => ad + ' Escort Modelleri',
    lead: ad => ad + ' bölgesinde görüşen modellerin tamamı burada.',
    title: ad => ad + ' Escort Modelleri | RedKıbrıs',
    desc: ad => ad + ' escort modellerinin listesi. Yaş, hizmet ve dile göre filtrele. Sabit tarife, kapora yok, ödeme görüşmenin başında.',
    yok: 'Bölge bulunamadı',
    wa: 'WhatsApp\'tan yaz', tg: 'Telegram\'dan yaz',
    slogan: 'Kapora yok, ödeme görüşmenin başında.'
  },
  en: {
    dirTitle: 'Escort Models by Area | RedKıbrıs',
    dirDesc: 'Cyprus escort models by area. Profiles from Kyrenia, Nicosia, Famagusta, Iskele and other regions in one list.',
    dirH1: 'Escort Models by Area',
    dirLead: 'Every profile is sorted by area. Pick an area and see the models working there. No deposit, payment at the start of the meeting.',
    dirEmpty: 'No profiles live yet.',
    dirNeed: 'Any problem, or need the catalogue?',
    dirNeedAlt: 'Write on WhatsApp or Telegram, we send a list for the area you are staying in.',
    crumbHome: 'Home', crumbMod: 'Models', profil: 'profiles',
    age: 'Age', service: 'Service', lang: 'Language', clear: 'Clear filters',
    ageCip: k => k + ' y/o',
    noResult: 'No results.',
    emptyFilter: 'No model in this filter.', emptyFilterAlt: 'Clear the filter or write on WhatsApp and we send a matching one.',
    regionPage: 'Region page:', tariff: 'Rates:', tariffAlt: 'fixed, unchanged at the door.',
    faq: 'FAQ',
    faq1: ad => 'How many models are there in ' + ad + '?',
    faq1a: n => n + ' profiles are live right now. The list changes with availability.',
    faq2: 'What hours do you meet?',
    faq2a: 'Hours are listed on the region page; in the centre a 10-15 minute notice is enough.',
    faq2b: 'It depends on the area; we agree on the time when you write.',
    faq3: 'Is there a travel fee?',
    faq3a: 'Outside the centre it depends on distance, told in advance and unchanged at the door. Not in the centre.',
    h1: ad => ad + ' Escort Models',
    lead: ad => 'All models working in ' + ad + ' are listed here.',
    title: ad => ad + ' Escort Models | RedKıbrıs',
    desc: ad => ad + ' escort model list. Filter by age, service and language. Fixed rates, no deposit, payment at the start of the meeting.',
    yok: 'Region not found',
    wa: 'Write on WhatsApp', tg: 'Write on Telegram',
    slogan: 'No deposit, payment at the start of the meeting.'
  },
  ru: {
    dirTitle: 'Модели эскорта по районам | RedKıbrıs',
    dirDesc: 'Модели эскорта на Кипре по районам. Профили Кирении, Никосии, Фамагусты, Искеле и других районов в одном списке.',
    dirH1: 'Модели эскорта по районам',
    dirLead: 'Все профили разложены по районам. Выбери район и посмотри моделей, которые там работают. Без депозита, оплата в начале встречи.',
    dirEmpty: 'Профилей пока нет.',
    dirNeed: 'Есть вопрос или нужен каталог?',
    dirNeedAlt: 'Напиши в WhatsApp или Telegram, пришлём список по твоему району.',
    crumbHome: 'Главная', crumbMod: 'Модели', profil: 'профилей',
    age: 'Возраст', service: 'Услуги', lang: 'Язык', clear: 'Сбросить фильтры',
    ageCip: k => k + ' лет',
    noResult: 'Нет результатов.',
    emptyFilter: 'По этому фильтру моделей нет.', emptyFilterAlt: 'Сбрось фильтр или напиши в WhatsApp, подберём.',
    regionPage: 'Страница района:', tariff: 'Тариф:', tariffAlt: 'фиксированный, на месте не меняется.',
    faq: 'Вопросы',
    faq1: ad => 'Сколько моделей в районе ' + ad + '?',
    faq1a: n => 'Сейчас опубликовано ' + n + ' профилей. Список зависит от доступности.',
    faq2: 'В какие часы встречаетесь?',
    faq2a: 'Часы указаны на странице района; в центре достаточно написать за 10-15 минут.',
    faq2b: 'Зависит от района, время согласуем при переписке.',
    faq3: 'Есть ли доплата за дорогу?',
    faq3a: 'За пределами центра зависит от расстояния, сообщается заранее и на месте не меняется. В центре нет.',
    h1: ad => 'Модели эскорта — ' + ad,
    lead: ad => 'Здесь собраны все модели, работающие в районе ' + ad + '.',
    title: ad => 'Модели эскорта — ' + ad + ' | RedKıbrıs',
    desc: ad => ad + ': список моделей эскорта. Фильтр по возрасту, услугам и языку. Фиксированный тариф, без депозита, оплата в начале встречи.',
    yok: 'Район не найден',
    wa: 'Написать в WhatsApp', tg: 'Написать в Telegram',
    slogan: 'Без депозита, оплата в начале встречи.'
  }
};

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
<html lang="${o.dil}"><head>
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
<meta property="og:locale" content="${o.dil === 'tr' ? 'tr_TR' : o.dil === 'en' ? 'en_US' : 'ru_RU'}">
<meta name="theme-color" content="#0b121b">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://accerzwswgiqhtfgoeqv.supabase.co/" crossorigin>
${(o.alternate || []).map(a => `<link rel="alternate" hreflang="${a.h}" href="${esc(a.u)}">`).join('\n')}
${S.head()}
${(o.ld || []).map(ldYaz).join('')}
</head><body>
${S.header({ aktif: o.aktif || o.url, dil: o.dil, ceviriler: o.ceviriler })}
<main class="wrap" id="icerik">
${o.icerik}
</main>
${S.footer(o.dil)}
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

const pagedRows = async (query) => {
  const out = [];
  for (let offset = 0; ; ) {
    const r = await fetch(query + '&limit=500&offset=' + offset, { headers: H });
    if (!r.ok) throw new Error('Model data unavailable');
    const rows = await r.json();
    if (!Array.isArray(rows)) throw new Error('Invalid model data');
    if (!rows.length) break;
    if (out.length + rows.length > 50000) throw new Error('Model listing exceeds limit');
    out.push(...rows);
    offset += rows.length;
  }
  return out;
};

const cek = (dil = 'tr', regionOnly = true) => pagedRows(
  SB + '/rest/v1/posts?select=slug,title,img,bolge,il&published=eq.true&lang=eq.' + dil +
  (regionOnly ? '&bolge=not.is.null' : '') + '&or=(' + YAYIN + ')&order=yayin_at.desc.nullslast,id.asc'
);

const modelCek = async () => {
  const rows = await pagedRows(SB + '/rest/v1/models?select=slug,yas,boy,hizmet,diller,saat,yer&order=slug.asc');
  const out = Object.create(null);
  for (const x of rows) if (x && x.slug) out[x.slug] = x;
  return out;
};

const yasBand = y => (!y ? '' : y <= 24 ? '18-24' : y <= 30 ? '25-30' : '31');

const cevir = (dil, kod) => {
  const tr = BASE + kok('tr') + (kod ? '/' + B.hb(kod) : '');
  const en = BASE + kok('en') + (kod ? '/' + B.hb(kod) : '');
  const ru = BASE + kok('ru') + (kod ? '/' + B.hb(kod) : '');
  return { tr, en, ru };
};

const alternatif = (dil, kod) => {
  const c = cevir(dil, kod);
  return [{ h: 'tr', u: c.tr }, { h: 'en', u: c.en }, { h: 'ru', u: c.ru }, { h: 'x-default', u: c.tr }];
};

module.exports = async (req, res) => {
  const istek = String((req.query && req.query.bolge) || '').replace(/[^a-z-]/g, '');
  const kod = istek ? B.hubdan(istek) : '';
  const ham = String((req.query && req.query.lang) || 'tr').toLowerCase();
  const dil = DILLER.includes(ham) ? ham : 'tr';
  const t = M[dil];
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  try {
  /* --- kök: bölge dizini --- */
  if (!istek) {
    const hepsi = await cek();
    const sayim = {};
    hepsi.forEach(p => {
      if (p.bolge && B.varMi(p.bolge)) sayim[p.bolge] = (sayim[p.bolge] || 0) + 1;
    });
    const sirali = Object.keys(sayim).sort((a, b) => sayim[b] - sayim[a]);

    const kartlar = sirali.map(b => `<a class="kart" href="${BASE}${kok(dil)}/${esc(B.hb(b))}">
      <span class="kb"><span class="kt">${esc(B.ad(b, dil))}</span><span class="kc">${sayim[b]} ${t.profil}</span></span></a>`).join('\n');

    const url = BASE + kok(dil);
    const icerik = `
    <div class="crumb"><a href="${BASE}${dil === 'tr' ? '/' : '/' + dil}">${esc(t.crumbHome)}</a> › <span>${esc(t.crumbMod)}</span></div>
    <h1>${esc(t.dirH1)}</h1>
    <p class="lead">${esc(t.dirLead)}</p>
    ${sirali.length ? `<div class="mgrid">${kartlar}</div>` : `<div class="about">${esc(t.dirEmpty)}</div>`}
    <div class="about"><b>${esc(t.dirNeed)}</b><br>${esc(t.dirNeedAlt)}
      <br><a class="btn wa" href="https://wa.me/905515420755" target="_blank" rel="noopener" data-base="https://wa.me/905515420755">${esc(t.wa)}</a>
      <a class="btn tg" href="https://t.me/kibrisescortvip" target="_blank" rel="noopener" data-base="https://t.me/kibrisescortvip">${esc(t.tg)}</a>
    </div>`;

    bitir(res, kabuk({
      title: t.dirTitle, desc: t.dirDesc, url, icerik, dil,
      aktif: url, ceviriler: cevir(dil, null), alternate: alternatif(dil, null),
      ld: [
        { '@context': 'https://schema.org', '@type': 'CollectionPage', name: t.dirH1, url, inLanguage: dil },
        { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: t.crumbHome, item: BASE + '/' },
          { '@type': 'ListItem', position: 2, name: t.crumbMod, item: url }
        ] }
      ]
    }));
    return;
  }

  if (!kod) {
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=600');
    res.status(404).send(t.yok);
    return;
  }

  const ad = B.ad(kod, dil);
  const bolgeYol = bolgeYolDil(dil, kod);
  const url = BASE + kok(dil) + '/' + B.hb(kod);
  const ust = B.ust(kod);
  const bolgeKayit = R[B.yol(kod)] || null;

  const [hepsi, modeller, ceviriler] = await Promise.all([
    cek(), modelCek(), dil === 'tr' ? Promise.resolve([]) : cek(dil, false)
  ]);
  const ceviriMap = new Map(ceviriler.map(p => [p.slug, p]));
  const liste = (B.alt(kod) ? hepsi.filter(p => p.il === kod) : hepsi.filter(p => p.bolge === kod))
    .map(p => {
      const translated = ceviriMap.get(p.slug);
      return translated ? { ...p, title: translated.title || p.title, img: translated.img || p.img, cardLang: dil } : { ...p, cardLang: 'tr' };
    });
  const articlePath = p => (p.cardLang === 'tr' ? '/blog/' : '/' + p.cardLang + '/blog/') + p.slug;

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
  const yasCip = Object.keys(say).filter(k => say[k]).map(k => cip('yas', k, t.ageCip(k))).join('');
  const hizCip = Object.keys(hizmetSet).sort((a, b) => hizmetSet[b] - hizmetSet[a]).slice(0, 8).map(k => cip('hizmet', k, k)).join('');
  const dilAnahtar = Object.keys(dilSet).sort((a, b) => dilSet[b] - dilSet[a]);
  const dilCip = dilAnahtar.length > 1 ? dilAnahtar.slice(0, 4).map(k => cip('dil', k, k)).join('') : '';
  if (yasCip) cipHtml += `<div class="cip-row"><b>${esc(t.age)}</b>${yasCip}</div>`;
  if (hizCip) cipHtml += `<div class="cip-row"><b>${esc(t.service)}</b>${hizCip}</div>`;
  if (dilCip) cipHtml += `<div class="cip-row"><b>${esc(t.lang)}</b>${dilCip}</div>`;
  if (cipHtml) cipHtml += `<div class="cip-row"><a href="${url}" class="temiz">${esc(t.clear)}</a></div>`;

  const kartlar = liste.map(p => {
    const m = modeller[p.slug] || {};
    const yb = yasBand(m.yas);
    const hiz = (m.hizmet || []).map(x => String(x).trim().toLowerCase()).join('|');
    const dil2 = (m.diller || []).map(x => String(x).trim().toLowerCase()).join('|');
    const rozet = [
      m.yas ? m.yas + ' ' + (dil === 'ru' ? 'лет' : 'y/o') : '',
      m.boy ? m.boy + ' cm' : '',
      m.saat ? esc(m.saat) : ''
    ].filter(Boolean).map(x => `<span>${x}</span>`).join('');
    return `<a class="kart" href="${BASE}${esc(articlePath(p))}" data-yasb="${esc(yb)}" data-hizmet="${esc(hiz)}" data-dil="${esc(dil2)}">
    ${p.img ? `<img src="${esc(p.img)}" alt="${esc(p.title)}" loading="lazy" decoding="async" width="300" height="200">` : ''}
    <span class="kb"><span class="kt">${esc(p.title)}</span>${rozet ? `<span class="meta">${rozet}</span>` : ''}</span></a>`;
  }).join('\n');

  const kirinti = `<a href="${BASE}${dil === 'tr' ? '/' : '/' + dil}">${esc(t.crumbHome)}</a> › ` +
    (ust ? `<a href="${bolgeYolDil(dil, ust)}">${esc(B.ad(ust, dil))}</a> › ` : '') +
    `<a href="${bolgeYol}">${esc(ad)}</a> › <span>${esc(t.crumbMod)}</span>`;

  const kirintiLd = [{ '@type': 'ListItem', position: 1, name: t.crumbHome, item: BASE + '/' }];
  if (ust) kirintiLd.push({ '@type': 'ListItem', position: 2, name: B.ad(ust, dil), item: bolgeYolDil(dil, ust) });
  kirintiLd.push({ '@type': 'ListItem', position: kirintiLd.length + 1, name: ad, item: bolgeYol });
  kirintiLd.push({ '@type': 'ListItem', position: kirintiLd.length + 1, name: t.crumbMod, item: url });

  const ld = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: t.title(ad), url, inLanguage: dil, about: { '@type': 'Place', name: ad } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: kirintiLd }
  ];
  if (liste.length) ld.push({
    '@context': 'https://schema.org', '@type': 'ItemList',
    numberOfItems: liste.length,
    itemListElement: liste.slice(0, 100).map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title, url: BASE + articlePath(p) }))
  });

  const giris = bolgeKayit && bolgeKayit.metin && dil === 'tr' ? esc(bolgeKayit.metin) : esc(t.lead(ad));

  const icerik = `
  <div class="crumb">${kirinti}</div>
  <h1>${esc(t.h1(ad))}</h1>
  <p class="lead">${giris}</p>
  ${cipHtml}
  ${liste.length ? `<div class="mgrid">${kartlar}</div>` : `<div class="about">${esc(t.noResult)}</div>`}
  <div class="about bos" style="display:none"><b>${esc(t.emptyFilter)}</b><br>${esc(t.emptyFilterAlt)}</div>
  <div class="about"><b>${esc(t.regionPage)}</b> <a href="${bolgeYol}">${esc(ad)} escort</a>
    <br><b>${esc(t.tariff)}</b> <a href="${BASE}${dil === 'tr' ? '' : '/' + dil}/fiyatlar">${esc(t.tariffAlt)}</a>
    <br><a class="btn wa" href="https://wa.me/905515420755" target="_blank" rel="noopener" data-base="https://wa.me/905515420755">${esc(t.wa)}</a>
    <a class="btn tg" href="https://t.me/kibrisescortvip" target="_blank" rel="noopener" data-base="https://t.me/kibrisescortvip">${esc(t.tg)}</a>
  </div>
  <section class="faq">
    <h2>${esc(t.faq)}</h2>
    <details><summary>${esc(t.faq1(ad))}</summary><p>${esc(t.faq1a(liste.length))}</p></details>
    <details><summary>${esc(t.faq2)}</summary><p>${esc(bolgeKayit && bolgeKayit.metin2 && dil === 'tr' ? t.faq2a : t.faq2b)}</p></details>
    <details><summary>${esc(t.faq3)}</summary><p>${esc(t.faq3a)}</p></details>
  </section>`;

  bitir(res, kabuk({
    title: t.title(ad), desc: t.desc(ad), url, icerik, dil,
    aktif: bolgeYol, ceviriler: cevir(dil, kod), alternate: alternatif(dil, kod), ld,
    robots: !liste.length ? 'noindex,follow' : 'index,follow'
  }));
  } catch (e) {
    const msg = { tr: 'Liste geçici olarak yüklenemiyor.', en: 'List temporarily unavailable.', ru: 'Список временно недоступен.' }[dil];
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Retry-After', '60');
    return res.status(503).send(msg);
  }
};
