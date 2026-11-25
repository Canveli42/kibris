const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const WA = 'https://wa.me/905515420755';
const TG = 'https://t.me/kibrisescortvip';
const LOGO = BASE + '/apple-touch-icon.png';
const S = require('../data/shell.js');

const DILLER = ['tr', 'en', 'ru'];

// planlı yayın: yayin_at boş ya da geçmişte olanlar
const YAYIN = 'yayin_at.is.null,yayin_at.lte.now()';

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const MDLINK = /\[([^\]]+)\]\((\/[^)\s]*|https?:\/\/[^)\s]+)\)/g;

const bag = s => String(s == null ? '' : s).replace(MDLINK, '<a href="$2">$1</a>');

const bagEsc = s => esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(MDLINK, '<a href="$2">$1</a>');

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

const GENEL = ['kibris','escort','rehberi','blog','otel','ne','mi','mu','ve','icin','nasil','nedir','demek','kadar','hangi'];
const ilgiliAnahtar = slug => String(slug || '').split('-').filter(t => t.length > 2 && !GENEL.includes(t)).slice(0, 2);

const M = {
  tr: {
    yok: 'Yazı bulunamadı', yokD: 'Aradığın yazı bulunamadı. Kıbrıs escort blog yazılarına göz at.',
    buAdres: 'Bu adreste yazı yok.', tumu: 'Tüm yazılar için', bloga: 'blog sayfasına', donebilir: 'dönebilirsin.',
    diger: 'Diğer yazılar', ilgili: 'İlgili yazılar', sssB: 'Sık sorulan sorular',
    sorun: 'Sorun mu var, katalog mu lazım?', wa: "WhatsApp'tan yaz", tg: "Telegram'dan yaz",
    alt: 'WhatsApp’tan yaz, kaldığın bölgeye göre liste gönderiyoruz.',
    yuk: 'Yazı yüklenemedi', yukD: 'Sayfa geçici olarak yüklenemedi.', tekrar: 'Birkaç saniye sonra tekrar dene.',
    ana: 'Ana sayfa', blog: 'Blog', yazar: 'Can', dk: 'dk okuma', don: 'dönebilirsin'
  },
  en: {
    yok: 'Article not found', yokD: 'That article does not exist. Browse the Cyprus escort blog.',
    buAdres: 'Nothing at this address.', tumu: 'For all articles go to the', bloga: 'blog page', donebilir: '.',
    diger: 'Other articles', ilgili: 'Related articles', sssB: 'Frequently asked questions',
    sorun: 'Question or want the catalogue?', wa: 'Message on WhatsApp', tg: 'Message on Telegram',
    alt: 'Write on WhatsApp and we send the current selection for your area.',
    yuk: 'Page could not load', yukD: 'The page is temporarily unavailable.', tekrar: 'Try again in a few seconds.',
    ana: 'Home', blog: 'Blog', yazar: 'Can', dk: 'min read', don: 'to go back'
  },
  ru: {
    yok: 'Статья не найдена', yokD: 'Такой статьи нет. Посмотрите блог об эскорте на Кипре.',
    buAdres: 'По этому адресу ничего нет.', tumu: 'Все статьи — на', bloga: 'странице блога', donebilir: '.',
    diger: 'Другие статьи', ilgili: 'Похожие статьи', sssB: 'Частые вопросы',
    sorun: 'Вопрос или нужен каталог?', wa: 'Написать в WhatsApp', tg: 'Написать в Telegram',
    alt: 'Напишите в WhatsApp, пришлём актуальную подборку по вашему району.',
    yuk: 'Страница не загрузилась', yukD: 'Страница временно недоступна.', tekrar: 'Попробуйте через несколько секунд.',
    ana: 'Главная', blog: 'Блог', yazar: 'Can', dk: 'мин чтения', don: 'чтобы вернуться'
  }
};

async function ilgiliYazilar(slug, dil) {
  let out = [];
  const anahtar = ilgiliAnahtar(slug);
  if (anahtar.length) {
    const or = anahtar.map(t => 'slug.ilike.*' + encodeURIComponent(t) + '*').join(',');
    try {
      const r = await fetch(
        SB + '/rest/v1/posts?select=slug,title&published=eq.true&lang=eq.' + dil +
        '&slug=neq.' + encodeURIComponent(slug) +
        '&and=(or(' + or + '),or(' + YAYIN + '))&limit=5',
        { headers: H }
      );
      if (r.ok) out = (await r.json()) || [];
    } catch (e) {}
  }
  if (out.length < 5) {
    try {
      const r = await fetch(
        SB + '/rest/v1/posts?select=slug,title&published=eq.true&lang=eq.' + dil +
        '&slug=neq.' + encodeURIComponent(slug) +
        '&or=(' + YAYIN + ')&order=created_at.desc&limit=12',
        { headers: H }
      );
      if (r.ok) {
        const a = (await r.json()) || [];
        for (const x of a) {
          if (out.length >= 5) break;
          if (!out.some(y => y.slug === x.slug)) out.push(x);
        }
      }
    } catch (e) {}
  }
  return out.slice(0, 5);
}

const kok = dil => (dil === 'tr' ? '/blog/' : '/' + dil + '/blog/');

const sayfa = o => `<!DOCTYPE html>
<html lang="${o.dil}"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(o.title)} | RedKıbrıs</title>
<meta name="description" content="${esc(o.desc)}">
<link rel="canonical" href="${esc(o.url)}">
${o.alternates || ''}
<link rel="sitemap" type="application/xml" href="${BASE}/sitemap.xml">
<meta name="robots" content="${o.robots || 'index,follow'}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="RedKıbrıs">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.desc)}">
<meta property="og:url" content="${esc(o.url)}">
<meta property="og:locale" content="${o.dil === 'tr' ? 'tr_TR' : o.dil === 'en' ? 'en_US' : 'ru_RU'}">
${o.img ? `<meta property="og:image" content="${esc(o.img)}">
<link rel="preload" as="image" href="${esc(o.img)}" fetchpriority="high">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${esc(o.img)}">` : ''}
<meta name="theme-color" content="#0b121b">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://accerzwswgiqhtfgoeqv.supabase.co/" crossorigin="">
<style>${S.css}
main a:not(.btn){text-decoration:underline;text-underline-offset:2px}
</style>
<style>${S.icerik}</style>
${o.ld || ''}
</head><body>
${S.header({ aktif: o.url, dil: o.dil, ceviriler: o.ceviriler })}
<main class="wrap">
${o.icerik}
</main>
${S.footer(o.dil)}
</body></html>`;

module.exports = async (req, res) => {
  try {
    const slug = String((req.query && req.query.slug) || '').replace(/[^a-z0-9-]/gi, '');
    const ham = String((req.query && req.query.lang) || 'tr').toLowerCase();
    const dil = DILLER.includes(ham) ? ham : 'tr';
    const t = M[dil];
    const url = BASE + kok(dil) + slug;

    let p = null;
    let digerleri = [];

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

    // çeviri yoksa Türkçesine kalıcı yönlendir
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
      try {
        const r = await fetch(
          SB + '/rest/v1/posts?select=slug,title&published=eq.true&lang=eq.' + dil +
          '&or=(' + YAYIN + ')&order=created_at.desc&limit=6',
          { headers: H }
        );
        if (r.ok) digerleri = (await r.json()) || [];
      } catch (e) {}
      let h404 = sayfa({
        dil, title: t.yok, desc: t.yokD, url, robots: 'noindex,follow',
        icerik: `<h1>${esc(t.yok)}</h1>
          <div class="about"><b>${esc(t.buAdres)}</b><br>${esc(t.tumu)} <a href="${BASE}${dil === 'tr' ? '/blog' : '/' + dil + '/blog'}">${esc(t.bloga)}</a> ${esc(t.donebilir)}</div>
          <div class="diger"><h2>${esc(t.diger)}</h2>${digerleri.map(x => `<a href="${BASE}${kok(dil)}${esc(x.slug)}">${esc(x.title)}</a>`).join('')}</div>`
      });
      const n404 = S.nonce();
      h404 = S.noncele(h404, n404);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Content-Security-Policy', S.csp(n404));
      res.status(404).send(h404);
      return;
    }

    digerleri = await ilgiliYazilar(slug, dil);

    // aynı yazının mevcut dil sürümleri
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

    const desc = ((p.meta && String(p.meta).trim()) || duz(p.body)).slice(0, 158);
    const metin = duz(p.body);
    const dk = Math.max(1, Math.round(metin.split(/\s+/).filter(Boolean).length / 180));
    const f = sss(p.faq);

    const ld = [
      {
        '@context': 'https://schema.org', '@type': 'Article',
        headline: p.title, description: desc, inLanguage: dil,
        datePublished: p.yayin_at || p.created_at, dateModified: p.updated_at || p.created_at,
        url: url, image: p.img ? [p.img] : undefined,
        author: { '@type': 'Person', name: 'Can' },
        publisher: { '@type': 'Organization', name: 'RedKıbrıs', logo: { '@type': 'ImageObject', url: LOGO } }
      },
      {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t.ana, item: BASE + (dil === 'tr' ? '/' : '/' + dil) },
          { '@type': 'ListItem', position: 2, name: t.blog, item: BASE + (dil === 'tr' ? '/blog' : '/' + dil + '/blog') },
          { '@type': 'ListItem', position: 3, name: p.title, item: url }
        ]
      }
    ];
    if (f.length) ld.push({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: f.map(x => ({ '@type': 'Question', name: x[0], acceptedAnswer: { '@type': 'Answer', text: x[1] } }))
    });

    const icerik = `
    <div class="crumb"><a href="${BASE}${dil === 'tr' ? '/' : '/' + dil}">${esc(t.ana)}</a> › <a href="${BASE}${dil === 'tr' ? '/blog' : '/' + dil + '/blog'}">${esc(t.blog)}</a> › <span>${esc(p.title)}</span></div>
    <h1>${esc(p.title)}</h1>
    <p class="byline">${esc(t.yazar)} · RedKıbrıs · ${tarih(p.yayin_at || p.created_at, dil)} · ${dk} ${esc(t.dk)}</p>
    ${p.img ? `<img id="cover" src="${esc(p.img)}" alt="${esc(p.title)}" width="1200" height="750" fetchpriority="high" decoding="async">` : ''}
    <article>${govde(p.body)}</article>
    ${f.length ? `<section class="faq"><h2>${esc(t.sssB)}</h2>${f.map(x => `<details><summary>${esc(x[0])}</summary><p>${esc(x[1])}</p></details>`).join('')}</section>` : ''}
    <div class="about"><b>${esc(t.sorun)}</b><br>${esc(t.alt)}
      <br><a class="btn wa" href="${WA}" target="_blank" rel="noopener" data-base="${WA}">${esc(t.wa)}</a>
      <a class="btn tg" href="${TG}" target="_blank" rel="noopener" data-base="${TG}">${esc(t.tg)}</a>
    </div>
    ${digerleri.length ? `<div class="diger"><h2>${esc(t.ilgili)}</h2>${digerleri.map(x => `<a href="${BASE}${kok(dil)}${esc(x.slug)}">${esc(x.title)}</a>`).join('')}</div>` : ''}`;

    let html = sayfa({
      dil, title: p.title, desc, url, img: p.img, icerik, alternates, ceviriler,
      ld: ld.map(x => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('')
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

