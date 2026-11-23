const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const WA = 'https://wa.me/905515420755';
const TG = 'https://t.me/kibrisescortvip';
const S = require('../data/shell.js');

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

const sayfa = o => `<!DOCTYPE html>
<html lang="tr"><head>
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
${o.img ? `<meta property="og:image" content="${esc(o.img)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${esc(o.img)}">` : '<meta name="twitter:card" content="summary">'}
<meta name="theme-color" content="#0b121b">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath d='M32 2 62 32 32 62 2 32Z' fill='%231e2a40' stroke='%23f0d9ae' stroke-opacity='.55' stroke-width='2'/%3E%3Ctext x='32' y='41' font-family='Georgia' font-size='23' font-weight='700' text-anchor='middle'%3E%3Ctspan fill='%23ff3b5c'%3ER%3C/tspan%3E%3Ctspan fill='%23ffffff'%3EK%3C/tspan%3E%3C/text%3E%3C/svg%3E">
<style>${S.css}</style>
${o.ld || ''}
</head><body>
${S.header({ aktif: BASE + '/blog', dil: 'tr' })}
<main class="wrap">
${o.icerik}
</main>
${S.footer('tr')}
<script src="${BASE}/js/analytics.js" defer></script>
</body></html>`;
