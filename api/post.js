const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const WA = 'https://wa.me/905515420755';
const TG = 'https://t.me/kibrisescortvip';
const S = require('../data/shell.js');

const LOGO = 'https://accerzwswgiqhtfgoeqv.supabase.co/storage/v1/object/public/img/1795330858770-veniceai-m0godwqqq90k5f-1.webp';

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const AYLAR = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
const tarih = d => {
  const t = new Date(d);
  if (isNaN(t)) return '';
  return t.getDate() + ' ' + AYLAR[t.getMonth()] + ' ' + t.getFullYear();
};

const duz = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

const govde = raw => {
  if (/<(h2|h3|p|ul|div)[\s>]/i.test(raw || '')) return raw;
  let html = '', inUl = false;
  for (const satir of String(raw || '').split('\n')) {
    const b = satir.trim();
    if (!b) { if (inUl) { html += '</ul>'; inUl = false; } continue; }
    if (b.startsWith('## ')) { if (inUl) { html += '</ul>'; inUl = false; } html += '<h2>' + esc(b.slice(3)) + '</h2>'; continue; }
    if (b.startsWith('### ')) { if (inUl) { html += '</ul>'; inUl = false; } html += '<h3>' + esc(b.slice(4)) + '</h3>'; continue; }
    if (b.startsWith('- ')) { if (!inUl) { html += '<ul>'; inUl = true; } html += '<li>' + esc(b.slice(2)) + '</li>'; continue; }
    if (inUl) { html += '</ul>'; inUl = false; }
    html += '<p>' + esc(b) + '</p>';
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
    .map(x => Array.isArray(x) ? [x[0], x[1]] : [x.q, x.a])
    .filter(x => x[0] && x[1]);
};

const GENEL = ['kibris','escort','rehberi','blog','otel','ne','mi','mu','ve','icin','nasil','dakika','saat','program','fiyatlari'];

async function ilgiliYazilar(slug) {
  const anahtar = String(slug || '').split('-')
    .filter(t => t.length > 2 && GENEL.indexOf(t) === -1).slice(0, 2);
  let out = [];
  if (anahtar.length) {
    const or = anahtar.map(t => 'slug.ilike.*' + t + '*').join(',');
    try {
      const r = await fetch(SB + '/rest/v1/posts?select=slug,title&published=eq.true&slug=neq.' +
        encodeURIComponent(slug) + '&or=(' + or + ')&limit=5', { headers: H });
      if (r.ok) out = (await r.json()) || [];
    } catch (e) {}
  }
  if (out.length < 5) {
    try {
      const r = await fetch(SB + '/rest/v1/posts?select=slug,title&published=eq.true&slug=neq.' +
        encodeURIComponent(slug) + '&order=created_at.desc&limit=15', { headers: H });
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

const sayfa = o => `<!DOCTYPE html>
<html lang="tr"><head>
<style>${S.css}</style><style>${S.icerik}</style>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(o.title)} | RedKıbrıs</title>
<meta name="description" content="${esc(o.desc)}">
<link rel="canonical" href="${esc(o.url)}">
<link rel="alternate" hreflang="tr" href="${esc(o.url)}">
<link rel="alternate" hreflang="x-default" href="${esc(o.url)}">
<link rel="sitemap" type="application/xml" href="${BASE}/sitemap.xml">
<meta name="robots" content="${o.robots || 'index,follow'}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="RedKıbrıs">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.desc)}">
<meta property="og:url" content="${esc(o.url)}">
${o.img ? `<meta property="og:image" content="${esc(o.img)}">` : ''}
<meta name="twitter:card" content="summary_large_image">
${o.img ? `<meta name="twitter:image" content="${esc(o.img)}">` : ''}
<meta name="theme-color" content="#0b121b">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath d='M32 2 62 32 32 62 2 32Z' fill='%231e2a40' stroke='%23f0d9ae' stroke-opacity='.55' stroke-width='2'/%3E%3Ctext x='32' y='41' font-family='Georgia' font-size='23' font-weight='700' text-anchor='middle'%3E%3Ctspan fill='%23ff3b5c'%3ER%3C/tspan%3E%3Ctspan fill='%23ffffff'%3EK%3C/tspan%3E%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://accerzwswgiqhtfgoeqv.supabase.co/" crossorigin>
${o.ld || ''}
<script src="${BASE}/js/analytics.js" defer></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-KP7MEM460J"></script>
</head><body>
${S.header({ aktif: BASE + '/blog' })}
<main class="wrap">
${o.icerik}
</main>
${S.footer()}
<script src="${BASE}/js/iletisim.js" defer></script>
</body></html>`;

module.exports = async (req, res) => {
  const slug = String((req.query && req.query.slug) || '').replace(/[^a-z0-9-]/gi, '');
  const url = BASE + '/blog/' + slug;

  let p = null;
  let digerleri = [];

  if (slug) {
    try {
      const r = await fetch(
        SB + '/rest/v1/posts?select=*&slug=eq.' + encodeURIComponent(slug) + '&published=eq.true',
        { headers: H }
      );
      if (r.ok) {
        const a = await r.json();
        p = a && a[0];
      }
    } catch (e) {}
  }

  if (!p) {
    try {
      const r = await fetch(
        SB + '/rest/v1/posts?select=slug,title&published=eq.true&order=created_at.desc&limit=6',
        { headers: H }
      );
      if (r.ok) digerleri = (await r.json()) || [];
    } catch (e) {}
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(404).send(sayfa({
      title: 'Yazı bulunamadı',
      desc: 'Aradığın yazı bulunamadı. Kıbrıs escort blog yazılarına göz at.',
      url: url,
      robots: 'noindex,follow',
      icerik: `<h1>Yazı bulunamadı</h1>
        <div class="about"><b>Bu adreste yazı yok.</b><br>Tüm yazılar için <a href="${BASE}/blog">blog sayfasına</a> dönebilirsin.</div>
        <div class="diger"><h2>Diğer yazılar</h2>${digerleri.map(x => `<a href="${BASE}/blog/${esc(x.slug)}">${esc(x.title)}</a>`).join('')}</div>`
    }));
    return;
  }

  digerleri = await ilgiliYazilar(slug);

  const desc = ((p.meta && String(p.meta).trim()) || duz(p.body)).slice(0, 158);
  const metin = duz(p.body);
  const dk = Math.max(1, Math.round(metin.split(/\s+/).filter(Boolean).length / 180));
  const f = sss(p.faq);

  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: p.title, description: desc,
      datePublished: p.created_at, dateModified: p.updated_at || p.created_at,
      url: url, image: p.img ? [p.img] : undefined,
      author: { '@type': 'Person', name: 'Can' },
      publisher: {
        '@type': 'Organization', name: 'RedKıbrıs',
        logo: { '@type': 'ImageObject', url: LOGO }
      }
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana sayfa', item: BASE + '/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: BASE + '/blog' },
        { '@type': 'ListItem', position: 3, name: p.title, item: url }
      ]
    }
  ];
  if (f.length) ld.push({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: f.map(x => ({
      '@type': 'Question', name: x[0],
      acceptedAnswer: { '@type': 'Answer', text: x[1] }
    }))
  });

  const icerik = `<div class="crumb"><a href="${BASE}/">Ana sayfa</a> › <a href="${BASE}/blog">Blog</a> › <span>${esc(p.title)}</span></div>
  <h1>${esc(p.title)}</h1>
  <p class="byline">Can · RedKıbrıs · ${tarih(p.created_at)} · ${dk} dk okuma</p>
  ${p.img ? `<img id="cover" src="${esc(p.img)}" alt="${esc(p.title)}" width="1200" height="750" fetchpriority="high">` : ''}
  <article>${govde(p.body)}</article>
  ${f.length ? `<section class="faq"><h2>Sık sorulan sorular</h2>${f.map(x => `<details><summary>${esc(x[0])}</summary><p>${esc(x[1])}</p></details>`).join('')}</section>` : ''}
  <div class="about"><b>Sorun mu var, katalog mu lazım?</b><br>WhatsApp'tan yaz, kaldığın bölgeye göre liste gönderiyoruz.
    <br><a class="btn wa" href="${WA}" target="_blank" rel="noopener" data-base="${WA}">WhatsApp'tan yaz</a>
    <a class="btn tg" href="${TG}" target="_blank" rel="noopener" data-base="${TG}">Telegram'dan yaz</a>
  </div>
  ${digerleri.length ? `<div class="diger"><h2>İlgili yazılar</h2>${digerleri.map(x => `<a href="${BASE}/blog/${esc(x.slug)}">${esc(x.title)}</a>`).join('')}</div>` : ''}`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400');
  res.status(200).send(sayfa({
    title: p.title, desc, url, img: p.img,
    icerik,
    ld: ld.map(x => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('')
  }));
};
