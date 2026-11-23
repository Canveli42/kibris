const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const WA = 'https://wa.me/905515420755';
const D = require('../data/regions.js');
const S = require('../data/shell.js');

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const sayfa = o => `<!DOCTYPE html>
<html lang="tr"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.desc)}">
<link rel="canonical" href="${esc(o.url)}">
<link rel="alternate" hreflang="tr" href="${esc(o.url)}">
<link rel="alternate" hreflang="x-default" href="${esc(o.url)}">
<link rel="sitemap" type="application/xml" href="${BASE}/sitemap.xml">
<meta name="robots" content="${o.robots || 'index,follow'}">
<meta property="og:type" content="website">
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
${S.header({ aktif: o.url, dil: 'tr' })}
<main class="wrap">
${o.icerik}
</main>
${S.footer('tr')}
<script src="${BASE}/js/analytics.js" defer></script>
</body></html>`;
