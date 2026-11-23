const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const WA = 'https://wa.me/905515420755';
const TG = 'https://t.me/kibrisescortvip';

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

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0f18;color:#f2f5f8;font:16px/1.72 ui-sans-serif,system-ui,-apple-system,sans-serif;padding-bottom:96px}
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
nav{display:none;gap:18px;font-size:14px;color:#93a1b0}
@media(min-width:860px){nav{display:flex}}
.crumb{font-size:13px;color:#8b97a5;padding:22px 0 0}
.crumb a{color:#eed3a1}
h1{font-size:clamp(24px,4.2vw,34px);line-height:1.2;letter-spacing:-.035em;font-weight:800;margin:10px 0 8px;color:#fff}
.byline{font-size:13px;color:#8b97a5;margin-bottom:6px}
#cover{width:100%;max-width:720px;height:clamp(200px,36vw,360px);object-fit:cover;object-position:center 40%;border-radius:12px;border:1px solid #22303f;margin:18px 0 0;background:#16202c}
article{max-width:720px;margin-top:22px}
article h2{font-size:21px;margin:26px 0 10px;letter-spacing:-.02em;color:#fff;border-left:3px solid #d8b878;padding-left:12px}
article h3{font-size:17px;margin:20px 0 8px;color:#fff}
article p{margin-bottom:14px;color:#c3cdd9}
article ul{margin:0 0 14px 20px;color:#c3cdd9}
article li{margin-bottom:6px}
article strong{color:#fff}
article a{color:#eed3a1;text-decoration:underline;text-underline-offset:2px}
.faq{max-width:720px;margin-top:32px}
.faq h2{font-size:21px;margin-bottom:12px;color:#fff}
.faq details{border-bottom:1px solid #22303f;padding:12px 0}
.faq summary{cursor:pointer;font-weight:600;font-size:15px;color:#fff}
.faq p{color:#8b97a5;margin-top:8px;font-size:15px}
.about{background:#111823;border:1px solid #22303f;border-radius:12px;padding:18px;margin:32px 0 0;font-size:15px}
.about b{color:#fff}
.about .btn{margin-top:10px;margin-right:8px}
.diger{margin-top:32px}
.diger h2{font-size:20px;color:#fff;border-left:3px solid #d8b878;padding-left:12px;margin-bottom:12px}
.diger a{display:block;background:#111823;border:1px solid #22303f;border-radius:10px;padding:12px 15px;font-size:14px;margin-bottom:8px}
footer{background:#080c12;border-top:1px solid #22303f;color:#93a1b0;margin-top:40px;padding:26px 0 34px;font-size:13px}
footer a{color:#eed3a1}
`;

const sayfa = o => `<!DOCTYPE html>
<html lang="tr"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(o.title)} | RedKıbrıs</title>
<meta name="description" content="${esc(o.desc)}">
<link rel="canonical" href="${esc(o.url)}">
<meta name="robots" content="${o.robots || 'index,follow'}">
<meta property="og:type" content="article">
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

  try {
    const r = await fetch(
      SB + '/rest/v1/posts?select=slug,title&published=eq.true&slug=neq.' + encodeURIComponent(slug) + '&order=created_at.desc&limit=5',
      { headers: H }
    );
    if (r.ok) digerleri = (await r.json()) || [];
  } catch (e) {}

  const desc = (p.meta && String(p.meta).trim()) || duz(p.body).slice(0, 158);
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
      publisher: { '@type': 'Organization', name: 'RedKıbrıs' }
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
    mainEntity: f.map(x => ({ '@type': 'Question', name: x[0], acceptedAnswer: { '@type': 'Answer', text: x[1] } }))
  });

  const icerik = `
  <div class="crumb"><a href="${BASE}/">Ana sayfa</a> › <a href="${BASE}/blog">Blog</a> › <span>${esc(p.title)}</span></div>
  <h1>${esc(p.title)}</h1>
  <p class="byline">Can · RedKıbrıs · ${tarih(p.created_at)} · ${dk} dk okuma</p>
  ${p.img ? `<img id="cover" src="${esc(p.img)}" alt="${esc(p.title)}" width="1200" height="750" fetchpriority="high">` : ''}
  <article>${govde(p.body)}</article>
  ${f.length ? `<section class="faq"><h2>Sık sorulan sorular</h2>${f.map(x => `<details><summary>${esc(x[0])}</summary><p>${esc(x[1])}</p></details>`).join('')}</section>` : ''}
  <div class="about"><b>Sorun mu var, katalog mu lazım?</b><br>WhatsApp'tan yaz, kaldığın bölgeye göre liste gönderiyoruz.
    <br><a class="btn wa" href="${WA}" target="_blank" rel="noopener">WhatsApp'tan yaz</a>
    <a class="btn tg" href="${TG}" target="_blank" rel="noopener">Telegram'dan yaz</a>
  </div>
  ${digerleri.length ? `<div class="diger"><h2>Diğer yazılar</h2>${digerleri.map(x => `<a href="${BASE}/blog/${esc(x.slug)}">${esc(x.title)}</a>`).join('')}</div>` : ''}`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400');
  res.status(200).send(sayfa({
    title: p.title, desc, url, img: p.img,
    icerik,
    ld: ld.map(x => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('')
  }));
};
