const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const WA = 'https://wa.me/905515420755';
const TG = 'https://t.me/kibrisescortvip';
const LOGO = BASE + '/apple-touch-icon.png';
const S = require('../data/shell.js');
const F = require('../data/fiyat.js');
const B = require('../data/bolge.js');

const DILLER = ['tr', 'en', 'ru'];
const DI = { tr: 0, en: 1, ru: 2 };
const YAYIN = 'yayin_at.is.null,yayin_at.lte.now()';

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const MDLINK = /\[([^\]]+)\]\((\/[^)\s]*|https?:\/\/[^)\s]+)\)/g;
const bag = s => String(s == null ? '' : s).replace(MDLINK, '<a href="$2">$1</a>');
const bagEsc = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(MDLINK, '<a href="$2">$1</a>');

const AYLAR = {
  tr: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
  en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  ru: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
};

const tarih = (d, dil) => {
  const t = new Date(d);
  if (isNaN(t)) return '';
  const a = AYLAR[dil] || AYLAR.tr;
  if (dil === 'en') return a[t.getMonth()] + ' ' + t.getDate() + ', ' + t.getFullYear();
  return t.getDate() + ' ' + a[t.getMonth()] + ' ' + t.getFullYear();
};

const duz = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

/* gövdede zaten SSS var mı */
const SSS_VAR = /s[ıi]k[çc]?a?\s*sorulan|frequently asked|частые вопросы|\bsss\b/i;

/* ---------- profil bloğu ---------- */
const SPEC_ALAN = ['yas', 'boy', 'kilo', 'sac', 'gogus', 'diller', 'hizmet', 'saat', 'yer'];
const ETIKET = {
  tr: { yas: 'Yaş', boy: 'Boy', kilo: 'Kilo', sac: 'Saç', gogus: 'Vücut', diller: 'Diller', hizmet: 'Hizmetler', saat: 'Uygun saatler', yer: 'Buluşma' },
  en: { yas: 'Age', boy: 'Height', kilo: 'Weight', sac: 'Hair', gogus: 'Build', diller: 'Languages', hizmet: 'Services', saat: 'Hours', yer: 'Meeting' },
  ru: { yas: 'Возраст', boy: 'Рост', kilo: 'Вес', sac: 'Волосы', gogus: 'Фигура', diller: 'Языки', hizmet: 'Услуги', saat: 'Часы', yer: 'Встреча' }
};

function specAyikla(raw) {
  const m = String(raw || '').match(/^:::profil\s*\n([\s\S]*?)\n:::[ \t]*\r?\n?/);
  if (!m) return { spec: null, govde: raw };
  const spec = {};
  m[1].split('\n').forEach(sat => {
    const p = sat.indexOf(':');
    if (p < 1) return;
    const k = sat.slice(0, p).trim().toLowerCase();
    const v = sat.slice(p + 1).trim();
    if (v && SPEC_ALAN.indexOf(k) > -1) spec[k] = v;
  });
  return { spec: Object.keys(spec).length ? spec : null, govde: String(raw).slice(m[0].length) };
}

function specHtml(spec, dil) {
  if (!spec) return '';
  const e = ETIKET[dil] || ETIKET.tr;
  const satirlar = SPEC_ALAN.filter(k => spec[k]).map(k => {
    if (k === 'hizmet') {
      const cip = spec[k].split(',').map(x => x.trim()).filter(Boolean)
        .map(x => '<span class="cip">' + esc(x) + '</span>').join('');
      return '<dt>' + esc(e[k]) + '</dt><dd>' + cip + '</dd>';
    }
    return '<dt>' + esc(e[k]) + '</dt><dd>' + esc(spec[k]) + '</dd>';
  }).join('');
  return satirlar ? '<dl class="spec">' + satirlar + '</dl>' : '';
}

const govde = raw => {
  const kaynak = String(raw || '').replace(/\r\n?/g, '\n');
  if (/<(h2|h3|p|ul|div)[\s>]/i.test(kaynak)) {
    return bag(kaynak
      .replace(/<(p|h[23])>[ \t]*#{2,3}[ \t]*/g, '<$1>')
      .replace(/^[ \t]*#{2,3}[ \t]*/gm, ''));
  }
  let html = '', inUl = false;
  for (const satir of kaynak.split('\n')) {
    const b = satir.trim();
    if (!b) { if (inUl) { html += '</ul>'; inUl = false; } continue; }
    if (b.startsWith('### ')) { if (inUl) { html += '</ul>'; inUl = false; } html += '<h3>' + bagEsc(b.slice(4)) + '</h3>'; continue; }
    if (b.startsWith('## ')) { if (inUl) { html += '</ul>'; inUl = false; } html += '<h2>' + bagEsc(b.slice(3)) + '</h2>'; continue; }
    if (b.startsWith('- ') || b.startsWith('* ')) { if (!inUl) { html += '<ul>'; inUl = true; } html += '<li>' + bagEsc(b.slice(2)) + '</li>'; continue; }
    if (inUl) { html += '</ul>'; inUl = false; }
    const kalin = b.match(/^\*\*(.+?)\*\*$/);
    if (kalin) { html += '<h3>' + bagEsc(kalin[1]) + '</h3>'; continue; }
    if (b.length <= 60 && !/[.!?:;]$/.test(b)) { html += '<h3>' + bagEsc(b) + '</h3>'; continue; }
    html += '<p>' + bagEsc(b) + '</p>';
  }
  if (inUl) html += '</ul>';
  return html;
};

const sss = f => {
  let arr = [];
  if (Array.isArray(f)) arr = f;
  else if (f) {
    try { const j = JSON.parse(f); if (Array.isArray(j)) arr = j; }
    catch (e) { arr = String(f).split('\n').map(l => l.split('|')); }
  }
  return arr
    .map(x => Array.isArray(x) ? [String(x[0] == null ? '' : x[0]).trim(), String(x[1] == null ? '' : x[1]).trim()] : [x.q, x.a])
    .filter(x => x[0] && x[1]);
};

/* ---------- profil tespiti ---------- */
const REHBER = new Set([
  'fiyatlari', 'villa', 'nasil-cagrilir', 'rehberi', 'rehber', 'program',
  '2-saat-program', '4-saat-program', 'gecelik-program', '30-dakika',
  'ilk-gorusme', 'lobi-mi-oda-mi', 'mitleri', 'sabah-gorusmesi',
  'vip-davet', 'turk-rus-farki', 'ulasim-ve-taksi', 'otelleri',
  'resort', 'site-apart'
]);

const ATIL = new Set(['seviyor','istiyor','yapiyor','geliyor','bekliyor','karsiliyor','oturuyor','yatiyor','cikip','yemegi','sonra','dogru','havasi','tadinda','uzaniyor','cokmus','kalkiyor','sikistiriyor','aliyor','yutuyor','koruyor']);

function profilCoz(slug, kayit) {
  const m = String(slug || '').match(/^([a-z-]+)-escort-(.+)$/);
  if (!m) return null;
  const kuyruk = m[2].replace(/-(19|20)\d{2}$/, '');
  if (REHBER.has(kuyruk) || !kuyruk) return null;
  const bolge = (kayit && kayit.bolge) || B.slugBolge(slug);
  if (!bolge || !B.varMi(bolge)) return null;
  const parca = kuyruk.split('-').filter(Boolean);
  const adParca = [];
  for (const p of parca) {
    if (adParca.length >= 2) break;
    if (ATIL.has(p)) break;
    adParca.push(p);
  }
  const ad = (adParca.length ? adParca : parca.slice(0, 2))
    .map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
  return { bolge, il: B.il(bolge), ad };
}

const kok = dil => (dil === 'tr' ? '/blog/' : '/' + dil + '/blog/');
const kokB = dil => (dil === 'tr' ? '/' : '/' + dil + '/');
const ldYaz = x => '<script type="application/ld+json">' + JSON.stringify(x).replace(/</g, '\\u003c') + '</script>';

const M = {
  tr: {
    yok: 'Yazı bulunamadı', yokD: 'Aradığın yazı bulunamadı. Kıbrıs escort blog yazılarına göz at.',
    buAdres: 'Bu adreste yazı yok.', tumu: 'Tüm yazılar için', bloga: 'blog sayfasına', donebilir: 'dönebilirsin.',
    diger: 'Diğer yazılar', ilgili: 'İlgili yazılar', sssB: 'Sık sorulan sorular',
    sorun: 'Sorun mu var, katalog mu lazım?', wa: "WhatsApp'tan yaz", tg: "Telegram'dan yaz",
    alt: 'WhatsApp’tan yaz, kaldığın bölgeye göre liste gönderiyoruz.',
    yuk: 'Yazı yüklenemedi', yukD: 'Sayfa geçici olarak yüklenemedi.', tekrar: 'Birkaç saniye sonra tekrar dene.',
    ana: 'Ana sayfa', blog: 'Blog', yazar: 'Can', dk: 'dk okuma',
    bolgeSayfa: 'bölge sayfası', profil: 'Profil', profilCog: 'Profilleri',
    tarifeB: 'Tarife', tarifeNot: 'Ödeme görüşmenin başında, yere girmeden: nakit, IBAN veya USDT. Kapora yok.', tarifeGit: 'Tam tarife',
    ayniBolge: 'Bu bölgedeki diğer profiller'
  },
  en: {
    yok: 'Article not found', yokD: 'That article does not exist. Browse the Cyprus escort blog.',
    buAdres: 'Nothing at this address.', tumu: 'For all articles go to the', bloga: 'blog page', donebilir: '.',
    diger: 'Other articles', ilgili: 'Related articles', sssB: 'Frequently asked questions',
    sorun: 'Question or want the catalogue?', wa: 'Message on WhatsApp', tg: 'Message on Telegram',
    alt: 'Write on WhatsApp and we send the current selection for your area.',
    yuk: 'Page could not load', yukD: 'The page is temporarily unavailable.', tekrar: 'Try again in a few seconds.',
    ana: 'Home', blog: 'Blog', yazar: 'Can', dk: 'min read',
    bolgeSayfa: 'area page', profil: 'Profile', profilCog: 'Profiles',
    tarifeB: 'Rates', tarifeNot: 'Payment at the start, before you go in: cash, transfer or USDT. No deposit.', tarifeGit: 'Full rates',
    ayniBolge: 'Other profiles in this area'
  },
  ru: {
    yok: 'Статья не найдена', yokD: 'Такой статьи нет. Посмотрите блог об эскорте на Кипре.',
    buAdres: 'По этому адресу ничего нет.', tumu: 'Все статьи — на', bloga: 'странице блога', donebilir: '.',
    diger: 'Другие статьи', ilgili: 'Похожие статьи', sssB: 'Частые вопросы',
    sorun: 'Вопрос или нужен каталог?', wa: 'Написать в WhatsApp', tg: 'Написать в Telegram',
    alt: 'Напишите в WhatsApp, пришлём актуальную подборку по вашему району.',
    yuk: 'Страница не загрузилась', yukD: 'Страница временно недоступна.', tekrar: 'Попробуйте через несколько секунд.',
    ana: 'Главная', blog: 'Блог', yazar: 'Can', dk: 'мин чтения',
    bolgeSayfa: 'страница района', profil: 'Профиль', profilCog: 'Профили',
    tarifeB: 'Тариф', tarifeNot: 'Оплата в начале, до входа: наличные, перевод или USDT. Без предоплаты.', tarifeGit: 'Весь тариф',
    ayniBolge: 'Другие профили района'
  }
};

const profilCek = async (filtre, dil, slug, limit) => {
  try {
    const r = await fetch(
      SB + '/rest/v1/posts?select=slug,title,img&published=eq.true&lang=eq.' + dil +
      '&slug=neq.' + encodeURIComponent(slug) + '&bolge=not.is.null&' + filtre +
      '&or=(' + YAYIN + ')&order=yayin_at.desc.nullslast&limit=' + limit,
      { headers: H }
    );
    if (r.ok) return (await r.json()) || [];
  } catch (e) {}
  return [];
};

const modelCek = async slug => {
  try {
    const r = await fetch(
      SB + '/rest/v1/models?select=yas,boy,hizmet,diller,saat&slug=eq.' + encodeURIComponent(slug) + '&limit=1',
      { headers: H }
    );
    if (r.ok) { const a = await r.json(); return (a && a[0]) || null; }
  } catch (e) {}
  return null;
};

async function ilgiliYazilar(slug, dil, profil) {
  if (!profil) {
    const tokens = String(slug || '').split('-').filter(t => t.length > 2 && !['kibris','escort','rehberi','blog','otel','ne','mi','mu','ve','icin','nasil','nedir','demek','kadar','hangi'].includes(t)).slice(0, 2);
    const or = tokens.map(t => 'slug.ilike.*' + encodeURIComponent(t) + '*').join(',');
    if (!or) return [];
    try {
      const r = await fetch(
        SB + '/rest/v1/posts?select=slug,title,img&published=eq.true&lang=eq.' + dil +
        '&slug=neq.' + encodeURIComponent(slug) + '&or=(' + or + ')&or=(' + YAYIN + ')&limit=6',
        { headers: H }
      );
      if (r.ok) return ((await r.json()) || []).slice(0, 5);
    } catch (e) {}
    return [];
  }
  const gorulen = new Set([slug]);
  const out = [];
  const ekle = a => {
    for (const x of a) {
      if (out.length >= 5) break;
      if (!x || gorulen.has(x.slug)) continue;
      gorulen.add(x.slug);
      out.push(x);
    }
  };
  ekle(await profilCek('bolge=eq.' + profil.bolge, dil, slug, 6));
  if (out.length < 5 && profil.il !== profil.bolge) ekle(await profilCek('il=eq.' + profil.il, dil, slug, 8));
  if (out.length < 5) ekle(await profilCek('bolge=not.is.null', dil, slug, 8));
  return out.slice(0, 5);
}

const sayfa = o => `<!DOCTYPE html>
<html lang="${o.dil}"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.desc)}">
<link rel="canonical" href="${esc(o.url)}">
${o.alternates || ''}
<link rel="sitemap" type="application/xml" href="${BASE}/sitemap.xml">
<meta name="robots" content="${o.robots || 'index,follow'}">
<meta property="og:type" content="${o.tur || 'article'}">
<meta property="og:site_name" content="RedKıbrıs">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.desc)}">
<meta property="og:url" content="${esc(o.url)}">
<meta property="og:locale" content="${o.dil === 'tr' ? 'tr_TR' : o.dil === 'en' ? 'en_US' : 'ru_RU'}">
${o.img ? `<meta property="og:image" content="${esc(o.img)}">
<link rel="preload" as="image" href="${esc(o.img)}" fetchpriority="high">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${esc(o.img)}">` : '<meta name="twitter:card" content="summary">'}
<meta name="theme-color" content="#0b121b">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://accerzwswgiqhtfgoeqv.supabase.co/" crossorigin>
${S.head()}
${o.ld || ''}
</head><body>
${S.header({ aktif: o.aktif || o.url, dil: o.dil, ceviriler: o.ceviriler })}
<main class="wrap" id="icerik">
${o.icerik}
</main>
${S.footer(o.dil)}
</body></html>`;

module.exports = async (req, res) => {
  try {
    const slug = String((req.query && req.query.slug) || '').replace(/[^a-z0-9-]/gi, '').toLowerCase();
    const ham = String((req.query && req.query.lang) || 'tr').toLowerCase();
    const dil = DILLER.includes(ham) ? ham : 'tr';
    const t = M[dil];
    const url = BASE + kok(dil) + slug;

    let p = null;

    if (slug) {
      try {
        const r = await fetch(
          SB + '/rest/v1/posts?select=*&slug=eq.' + encodeURIComponent(slug) +
          '&lang=eq.' + dil + '&published=eq.true&or=(' + YAYIN + ')',
          { headers: H }
        );
        if (r.ok) { const a = await r.json(); p = a && a[0]; }
      } catch (e) {}
    }

    if (!p && slug && dil !== 'tr') {
      let varMi = false;
      try {
        const r = await fetch(
          SB + '/rest/v1/posts?select=slug&slug=eq.' + encodeURIComponent(slug) +
          '&published=eq.true&or=(' + YAYIN + ')&limit=1',
          { headers: H }
        );
        if (r.ok) { const a = await r.json(); varMi = !!(a && a.length); }
      } catch (e) {}
      if (varMi) {
        const hedef = BASE + '/blog/' + slug;
        res.writeHead(301, { Location: hedef, 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<!DOCTYPE html><html><body><a href="' + hedef + '">' + hedef + '</a></body></html>');
        return;
      }
    }

    if (!p) {
      let digerleri = [];
      try {
        const r = await fetch(
          SB + '/rest/v1/posts?select=slug,title&published=eq.true&lang=eq.' + dil +
          '&or=(' + YAYIN + ')&order=created_at.desc&limit=6',
          { headers: H }
        );
        if (r.ok) digerleri = (await r.json()) || [];
      } catch (e) {}
      let h404 = sayfa({
        dil, title: t.yok + ' | RedKıbrıs', desc: t.yokD, url, robots: 'noindex,follow',
        icerik: `<h1>${esc(t.yok)}</h1>
          <div class="about"><b>${esc(t.buAdres)}</b><br>${esc(t.tumu)} <a href="${BASE}${dil === 'tr' ? '/blog' : '/' + dil + '/blog'}">${esc(t.bloga)}</a> ${esc(t.donebilir)}</div>
          <div class="diger"><h2>${esc(t.diger)}</h2>${digerleri.map(x => `<a href="${BASE}${kok(dil)}${esc(x.slug)}">${esc(x.title)}</a>`).join('')}</div>`
      });
      const n404 = S.nonce();
      h404 = S.noncele(h404, n404);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300');
      res.setHeader('Content-Security-Policy', S.csp(n404));
      res.status(404).send(h404);
      return;
    }

    const profil = profilCoz(slug, p);
    const ayikla = specAyikla(p.body);
    const bolgeAd = profil ? B.ad(profil.bolge, dil) : '';

    const model = profil ? await modelCek(slug) : null;
    const modelSpec = model ? {
      yas: model.yas ? String(model.yas) : '',
      boy: model.boy ? model.boy + ' cm' : '',
      hizmet: (model.hizmet || []).join(', '),
      diller: (model.diller || []).join(', '),
      saat: model.saat || '',
      yer: bolgeAd
    } : null;
    const spec = profil ? (ayikla.spec || modelSpec) : null;

    const digerleri = await ilgiliYazilar(slug, dil, profil);

    let diller = [dil];
    try {
      const r = await fetch(
        SB + '/rest/v1/posts?select=lang&slug=eq.' + encodeURIComponent(slug) +
        '&published=eq.true&or=(' + YAYIN + ')',
        { headers: H }
      );
      if (r.ok) {
        const a = (await r.json()) || [];
        const varOlan = a.map(x => x.lang).filter(x => DILLER.includes(x));
        if (varOlan.length) diller = varOlan;
      }
    } catch (e) {}

    const ceviriler = {};
    diller.forEach(d => { ceviriler[d] = BASE + kok(d) + slug; });
    const xDefault = ceviriler.tr || ceviriler[diller[0]];
    const alternates = DILLER.filter(d => ceviriler[d])
      .map(d => `<link rel="alternate" hreflang="${d}" href="${esc(ceviriler[d])}">`).join('\n') +
      `\n<link rel="alternate" hreflang="x-default" href="${esc(xDefault)}">`;

    const desc = ((p.meta && String(p.meta).trim()) || duz(ayikla.govde)).slice(0, 158);
    const metin = duz(ayikla.govde);
    const kelime = metin.split(/\s+/).filter(Boolean).length;
    const dk = Math.max(1, Math.round(kelime / 180));
    const f = sss(p.faq);
    const govdeHtml = govde(ayikla.govde);
    const govdeSss = SSS_VAR.test(ayikla.govde);

    const bolgeYol = profil ? BASE + kokB(dil) + B.yol(profil.bolge) : '';
    const hubYol = profil ? BASE + B.hub(profil.bolge) : '';
    const ustAd = profil && B.ust(profil.bolge) ? B.ad(B.ust(profil.bolge), dil) : '';
    const ustYol = profil && B.ust(profil.bolge) ? BASE + kokB(dil) + B.yol(B.ust(profil.bolge)) : '';

    const kirinti = profil
      ? `<a href="${BASE}${dil === 'tr' ? '/' : '/' + dil}">${esc(t.ana)}</a> › ` +
        (ustAd ? `<a href="${ustYol}">${esc(ustAd)}</a> › ` : '') +
        `<a href="${bolgeYol}">${esc(bolgeAd)}</a> › <span>${esc(p.title)}</span>`
      : `<a href="${BASE}${dil === 'tr' ? '/' : '/' + dil}">${esc(t.ana)}</a> › <a href="${BASE}${dil === 'tr' ? '/blog' : '/' + dil + '/blog'}">${esc(t.blog)}</a> › <span>${esc(p.title)}</span>`;

    const kirintiLd = [{ '@type': 'ListItem', position: 1, name: t.ana, item: BASE + (dil === 'tr' ? '/' : '/' + dil) }];
    if (profil) {
      let pos = 2;
      if (ustAd) { kirintiLd.push({ '@type': 'ListItem', position: pos++, name: ustAd, item: ustYol }); }
      kirintiLd.push({ '@type': 'ListItem', position: pos++, name: bolgeAd, item: bolgeYol });
    } else {
      kirintiLd.push({ '@type': 'ListItem', position: 2, name: t.blog, item: BASE + (dil === 'tr' ? '/blog' : '/' + dil + '/blog') });
    }
    kirintiLd.push({ '@type': 'ListItem', position: kirintiLd.length + 1, name: p.title, item: url });

    const ld = [];

    if (profil) {
      const dillerKisi = ['tr'];
      if (spec && spec.diller) {
        spec.diller.split(',').forEach(d => { const k = d.trim().toLowerCase(); if (DILLER.includes(k)) dillerKisi.push(k); });
      } else if (/rus|rusca|ukraynali|katerina|anastasia|natalya|veronika|alyona|anjelika|viktoria|olga|oksana|liliya|svetlana|milena|alina|irina|lena|anya|diana|inna|lada|polina|katya/.test(slug)) {
        dillerKisi.push('ru');
      }
      ld.push({
        '@context': 'https://schema.org', '@type': 'Person',
        name: profil.ad, alternateName: p.title, jobTitle: 'Escort',
        url, image: p.img ? [p.img] : undefined,
        knowsLanguage: dillerKisi,
        areaServed: { '@type': 'Place', name: bolgeAd },
        worksFor: { '@type': 'Organization', name: 'RedKıbrıs', url: BASE + '/' },
        ...(spec && spec.yas ? { description: desc } : {})
      });
    } else {
      ld.push({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: p.title, description: desc, inLanguage: dil,
        datePublished: p.yayin_at || p.created_at, dateModified: p.updated_at || p.created_at,
        url, image: p.img ? [p.img] : undefined,
        author: { '@type': 'Person', name: 'Can' },
        publisher: { '@type': 'Organization', name: 'RedKıbrıs', logo: { '@type': 'ImageObject', url: LOGO } }
      });
    }

    ld.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: kirintiLd });

    if (f.length) ld.push({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: f.map(x => ({ '@type': 'Question', name: x[0], acceptedAnswer: { '@type': 'Answer', text: x[1] } }))
    });

    const profilKutu = profil
      ? `<div class="about"><b>${esc(profil.ad)}</b> · ${esc(bolgeAd)}<br>
          <a href="${bolgeYol}">${esc(bolgeAd)} ${esc(t.bolgeSayfa)}</a>
          · <a href="${BASE}${dil === 'tr' ? '/fiyatlar' : '/' + dil + '/fiyatlar'}">${dil === 'tr' ? 'Fiyatlar' : dil === 'en' ? 'Prices' : 'Цены'}</a>
          · <a href="${hubYol}">${esc(bolgeAd)} ${esc(t.profilCog)}</a></div>`
      : '';

    const tarife = profil
      ? `<section class="sect"><h2>${esc(t.tarifeB)}</h2><div class="tarife">${F.satir(dil, profil.bolge)}</div>
         <p class="guncel">${esc(t.tarifeNot)} <a href="${BASE}${dil === 'tr' ? '/fiyatlar' : '/' + dil + '/fiyatlar'}">${esc(t.tarifeGit)}</a></p></section>`
      : '';

    const baslik = profil
      ? `<h1>${esc(p.title)}</h1>
         <p class="byline">${esc(profil.ad)} · ${esc(bolgeAd)} · RedKıbrıs · ${tarih(p.yayin_at || p.created_at, dil)}</p>`
      : `<h1>${esc(p.title)}</h1>
         <p class="byline">${esc(t.yazar)} · RedKıbrıs · ${tarih(p.yayin_at || p.created_at, dil)} · ${dk} ${esc(t.dk)}</p>`;

    const sssBolumu = f.length && !govdeSss
      ? `<section class="faq"><h2>${esc(t.sssB)}</h2>${f.map(x => `<details><summary>${esc(x[0])}</summary><p>${esc(x[1])}</p></details>`).join('')}</section>`
      : '';

    const icerik = `
    <div class="crumb">${kirinti}</div>
    ${baslik}
    ${p.img ? `<img id="cover" src="${esc(p.img)}" alt="${esc(p.title)}" width="560" height="373" fetchpriority="high" decoding="async">` : ''}
    ${specHtml(spec, dil)}
    <article>${govdeHtml}</article>
    ${tarife}
    ${profilKutu}
    ${sssBolumu}
    <div class="about"><b>${esc(t.sorun)}</b><br>${esc(t.alt)}
      <br><a class="btn wa" href="${WA}" target="_blank" rel="noopener" data-base="${WA}">${esc(t.wa)}</a>
      <a class="btn tg" href="${TG}" target="_blank" rel="noopener" data-base="${TG}">${esc(t.tg)}</a>
    </div>
    ${digerleri.length ? `<div class="diger"><h2>${esc(profil ? t.ayniBolge : t.ilgili)}</h2>${digerleri.map(x => `<a href="${BASE}${kok(dil)}${esc(x.slug)}">${esc(x.title)}</a>`).join('')}</div>` : ''}`;

    let html = sayfa({
      dil, title: p.title + ' | RedKıbrıs', desc, url, img: p.img, icerik, alternates, ceviriler,
      aktif: profil ? bolgeYol : url, tur: profil ? 'profile' : 'article',
      ld: ld.map(ldYaz).join('')
    });
    const n = S.nonce();
    html = S.noncele(html, n);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400');
    res.setHeader('Content-Security-Policy', S.csp(n));
    res.status(200).send(html);
  } catch (e) {
    let h = sayfa({
      dil: 'tr', title: 'Yazı yüklenemedi', desc: 'Sayfa geçici olarak yüklenemedi.',
      url: BASE + '/blog', robots: 'noindex,nofollow',
      icerik: `<h1>Sayfa yüklenemedi</h1><div class="about">Birkaç saniye sonra tekrar dene. <a href="${BASE}/blog">Bloga</a> dönebilirsin.</div>`
    });
    const n = S.nonce();
    h = S.noncele(h, n);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Security-Policy', S.csp(n));
    res.status(500).send(h);
  }
};
