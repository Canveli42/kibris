'use strict';

const BASE = 'https://www.kibrisgirneescort.com';
const WA = 'https://wa.me/905515420755';
const TG = 'https://t.me/kibrisescortvip';

const NAV = [
  ['/', 'Ana Sayfa'],
  ['/girne-escort', 'Girne'],
  ['/lefkosa-escort', 'Lefkoşa'],
  ['/magusa-escort', 'Mağusa'],
  ['/iskele-escort', 'İskele'],
  ['/guzelyurt-escort', 'Güzelyurt'],
  ['/blog', 'Blog'],
  ['/blog/kibrista-yalniz-gelenler-rehberi', 'Rehber'],
  ['/fiyatlar', 'Fiyatlar'],
  ['/iletisim', 'İletişim']
];

const WSVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02A9.82 9.82 0 0 0 12.04 2zm5.8 14.09c-.24.68-1.42 1.31-2 1.4-.52.08-1.17.11-1.89-.12-.43-.14-.99-.32-1.7-.62-3-1.22-4.95-4.36-5.1-4.56-.15-.2-1.22-1.61-1.22-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37h.57c.18.01.43-.07.67.51.25.59.85 2.05.92 2.2.07.15.12.32.02.52-.1.2-.15.33-.3.5-.15.17-.32.39-.45.52-.15.15-.3.31-.13.61.17.3.77 1.29 1.67 2.09 1.15 1.02 2.12 1.34 2.42 1.49.3.15.48.13.65-.07.17-.2.74-.87.94-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.08.12.08.72-.17 1.4z"></path></svg>';

const MARK = '<svg class="mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 1.8 46.2 24 24 46.2 1.8 24Z" fill="#1e2a40"></path><path d="M24 1.8 46.2 24 24 46.2 1.8 24Z" fill="none" stroke="#f0d9ae" stroke-opacity=".55" stroke-width="1.4"></path><text x="24" y="31" text-anchor="middle" font-family="Georgia,serif" font-size="16.5" font-weight="700"><tspan fill="#ff3b5c">R</tspan><tspan fill="#ffffff">K</tspan></text></svg>';

const css = `
*,::before,::after{box-sizing:border-box}
body{margin:0;background:#0a0f18;color:#f2f5f8;font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;line-height:1.68;padding-bottom:96px}
a{color:#eed3a1;text-decoration:none}
img{max-width:100%;display:block}
.wrap{max-width:820px;margin:0 auto;padding:0 18px}
.crumb{font-size:13px;color:#8b97a5;padding:22px 0 0}
.crumb a{color:#eed3a1}
h1{font-size:clamp(25px,4.4vw,36px);line-height:1.16;letter-spacing:-.035em;font-weight:800;margin:10px 0 12px;color:#fff}
h2{font-size:20px;color:#fff;border-left:3px solid #d8b878;padding-left:12px;margin:30px 0 14px}
h3{font-size:16.5px;color:#fff;margin:22px 0 10px}
p{margin:0 0 14px}
ul,ol{margin:0 0 16px;padding-left:22px}
li{margin:0 0 8px}
strong{color:#fff}
.lead{color:#8b97a5;font-size:15.5px;margin-bottom:24px}
.byline{color:#8b97a5;font-size:13px;margin:0 0 18px}
#cover,.rimg{width:100%;border-radius:14px;border:1px solid #22303f;margin:0 0 20px;aspect-ratio:12/7;object-fit:cover}
article{font-size:16.5px}
article p{color:#dbe3ee}
.about{background:#111823;border:1px solid #22303f;border-radius:12px;padding:18px;margin:12px 0;font-size:15px}
.about b{color:#fff}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:linear-gradient(180deg,#f3ddb4,#d8b878);color:#121a24;font-weight:700;border:0;border-radius:11px;padding:11px 18px;font-size:14px;box-shadow:0 6px 18px -8px rgba(216,184,120,.75)}
.btn.wa{background:linear-gradient(180deg,#3ae07d,#25d366);color:#05270f}
.btn.tg{background:linear-gradient(180deg,#4bb8ea,#229ed9);color:#04202e}
.btn-o{display:inline-block;background:#0e161f;border:1px solid #22303f;color:#f2f5f8;border-radius:11px;padding:9px 13px;font-size:13px;font-weight:600}
.btn-o:hover{border-color:#d8b878;color:#eed3a1}
.sect{padding:6px 0}
.guncel{color:#8b97a5;font-size:13px;margin-top:14px}
.faq{border:1px solid #22303f;border-radius:12px;background:#111823;padding:0 18px;margin:22px 0}
.faq details{border-bottom:1px solid #22303f;padding:14px 0}
.faq details:last-child{border-bottom:0}
.faq summary{cursor:pointer;font-weight:600;color:#fff;list-style:none}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";float:right;color:#d8b878}
.faq details[open] summary::after{content:"–"}
.faq p{color:#8b97a5;font-size:14.5px;margin:10px 0 0}
.diger{border-top:1px solid #22303f;margin-top:28px;padding-top:6px}
.diger a{display:block;padding:9px 0;border-bottom:1px solid rgba(34,48,63,.6);font-size:14.5px}
.diger a:hover{color:#f0d9ae}
.site-header{position:sticky;top:0;z-index:60;background:rgba(10,16,32,.94);border-bottom:1px solid rgba(216,184,120,.18);backdrop-filter:saturate(140%) blur(10px)}
.site-header .header-in{width:min(1120px,100%);margin:0 auto;display:flex;align-items:center;gap:14px;padding:10px 18px;flex-wrap:wrap}
.site-header .brand{display:flex;align-items:center;gap:10px;color:#e9eef6;flex:0 0 auto;text-decoration:none}
.site-header .brand .mark{width:40px;height:40px;flex:0 0 auto;filter:drop-shadow(0 4px 12px rgba(255,59,92,.45))}
.site-header .wordmark{display:flex;flex-direction:column;line-height:1.05;font-family:Georgia,serif;font-size:21px;letter-spacing:.02em;color:#fff}
.site-header .wordmark b{color:#ff3b5c;font-weight:700}
.site-header .wordmark i{font-style:normal;font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:#93a0b4;margin-top:4px}
.site-header .btn-katalog{margin-left:auto;flex:0 0 auto;display:inline-flex;align-items:center;gap:7px;background:linear-gradient(180deg,#3ae07d,#25d366);color:#05270f;font-weight:700;font-size:14px;padding:10px 17px;border-radius:999px;border:0;box-shadow:0 6px 18px rgba(37,211,102,.22);white-space:nowrap;text-decoration:none}
.site-header .btn-katalog svg{width:17px;height:17px;fill:currentColor;flex:0 0 auto}
.site-header .lang{display:flex;gap:5px;font-size:12px;align-items:center;flex:0 0 auto}
.site-header .lang a{padding:4px 8px;border:1px solid rgba(216,184,120,.18);border-radius:999px;color:#93a0b4;text-decoration:none}
.site-header .lang a.on{background:#d8b878;color:#141008;border-color:#d8b878;font-weight:700}
.site-header nav{order:3;flex:1 0 100%;display:flex;gap:8px;overflow-x:auto;padding:4px 0 10px;scrollbar-width:none}
.site-header nav::-webkit-scrollbar{display:none}
.site-header nav a{flex:0 0 auto;font-size:13.5px;color:#93a0b4;padding:7px 13px;border:1px solid rgba(216,184,120,.18);border-radius:999px;background:#111823;white-space:nowrap;text-decoration:none}
.site-header nav a:hover{color:#f0d9ae;border-color:rgba(216,184,120,.45)}
.site-header nav a.on{color:#141008;background:#d8b878;border-color:#d8b878;font-weight:600}
@media(min-width:860px){
 .site-header .header-in{flex-wrap:nowrap;padding:12px 18px}
 .site-header nav{order:0;flex:1 1 auto;justify-content:flex-end;padding:0;overflow:visible}
 .site-header nav a{background:transparent;border-color:transparent;padding:6px 8px}
 .site-header nav a:hover{background:transparent}
 .site-header nav a.on{background:transparent;color:#d8b878;border-color:transparent;font-weight:700}
 .site-header .btn-katalog{margin-left:6px}
}
@media(max-width:859px){
 .site-header .header-in{gap:8px 10px;padding:10px 12px 0}
 .site-header .brand{gap:8px;min-width:0}
 .site-header .brand .mark{width:36px;height:36px}
 .site-header .wordmark{font-size:18px}
 .site-header .wordmark i{display:none}
 .site-header .btn-katalog{order:1;padding:9px 14px;font-size:13px;gap:5px}
 .site-header .btn-katalog svg{width:15px;height:15px}
 .site-header .lang{order:2;gap:3px;font-size:11px}
 .site-header .lang a{padding:3px 6px}
 .site-header nav{order:3;flex:1 0 100%;padding:0 0 10px}
 .site-header nav a{font-size:12.5px;padding:6px 11px}
}
.chrome-footer{border-top:1px solid rgba(216,184,120,.18);background:#0d1526;padding:34px 0 26px;margin-top:44px;color:#e9eef6;font-size:16px}
.chrome-footer .cf-in{width:min(1120px,100%);margin:0 auto;padding:0 18px;display:flex;flex-wrap:wrap;gap:22px;justify-content:space-between}
.chrome-footer .cf-brand{max-width:34ch}
.chrome-footer .cf-brand span{font-family:Georgia,serif;font-size:19px;display:block;margin-bottom:10px;color:#fff}
.chrome-footer .cf-brand span b{color:#ff3b5c}
.chrome-footer .cf-brand p{color:#93a0b4;font-size:13.5px;margin:0}
.chrome-footer .cf-cols{display:flex;flex-wrap:wrap;gap:26px}
.chrome-footer .cf-cols div{min-width:130px}
.chrome-footer .cf-cols h4{margin:0 0 8px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#d8b878;font-weight:400}
.chrome-footer .cf-cols a{display:block;color:#93a0b4;font-size:14px;padding:3px 0;text-decoration:none}
.chrome-footer .cf-cols a:hover{color:#f0d9ae}
.chrome-footer .cf-bottom{width:min(1120px,100%);margin:26px auto 0;padding:16px 18px 0;border-top:1px solid rgba(216,184,120,.18);display:flex;flex-wrap:wrap;gap:10px;justify-content:space-between;color:#93a0b4;font-size:12.5px}
@media(max-width:859px){body{padding-bottom:88px}}
`;

function normPath(p) {
  p = String(p || '/');
  p = p.replace(/^https?:\/\/[^/]+/, '');
  p = p.split('?')[0].split('#')[0];
  p = p.replace(/\/+$/, '');
  return p || '/';
}

function langOf(p) {
  const path = normPath(p);
  if (path === '/en') return 'en';
  if (path === '/ru') return 'ru';
  return 'tr';
}

function header(path) {
  const current = normPath(path);
  const now = langOf(current);
  const links = NAV.map(function (x) {
    const on = (current === x[0] || (x[0] === '/blog' && current.indexOf('/blog/') === 0)) ? ' class="on"' : '';
    return '<a href="' + BASE + x[0] + '"' + on + '>' + x[1] + '</a>';
  }).join('');
  const pill = function (code, label) {
    const href = code === 'tr' ? BASE + '/' : BASE + '/' + code;
    return '<a href="' + href + '" data-lang="' + code + '"' + (now === code ? ' class="on"' : '') + '>' + label + '</a>';
  };
  return '<header class="site-header"><div class="header-in">' +
    '<a class="brand" href="' + BASE + '/" aria-label="RedKıbrıs">' + MARK +
    '<span class="wordmark"><b>Red</b>Kıbrıs<i>Kuzey Kıbrıs</i></span></a>' +
    '<a class="btn-katalog" href="' + WA + '" target="_blank" rel="noopener" aria-label="WhatsApp ile katalog iste">' + WSVG + 'Katalog</a>' +
    '<span class="lang">' + pill('tr', 'TR') + pill('en', 'EN') + pill('ru', 'RU') + '</span>' +
    '<nav aria-label="Ana menü">' + links + '</nav>' +
    '</div></header>';
}

function footer() {
  const regions = ['girne', 'lefkosa', 'magusa', 'iskele', 'guzelyurt'].map(function (s) {
    return '<a href="' + BASE + '/' + s + '-escort">' + s.charAt(0).toUpperCase() + s.slice(1) + ' Escort</a>';
  }).join('');
  return '<footer class="chrome-footer"><div class="cf-in">' +
    '<div class="cf-brand"><span><b>Red</b>Kıbrıs</span>' +
    '<p>Kıbrıs Escort · Girne merkezli bağımsız escort rehberi. Bölge sayfaları, güncel profil listeleri ve net fiyatlar.</p></div>' +
    '<div class="cf-cols"><div><h4>Bölgeler</h4>' + regions + '</div>' +
    '<div><h4>Site</h4>' +
    '<a href="' + BASE + '/">Ana Sayfa</a>' +
    '<a href="' + BASE + '/blog">Blog</a>' +
    '<a href="' + BASE + '/fiyatlar">Fiyatlar</a>' +
    '<a href="' + BASE + '/iletisim">İletişim</a>' +
    '<a href="' + BASE + '/gizlilik">Gizlilik</a>' +
    '</div></div></div>' +
    '<div class="cf-bottom"><span>Kıbrıs Escort · Girne Escort · Lefkoşa Escort · Mağusa Escort · İskele Escort · Güzelyurt Escort</span><span>© 2026 · Can</span></div>' +
    '</footer>';
}

function head(o) {
  o = o || {};
  const lang = o.lang || 'tr';
  const url = o.canonical || BASE + '/';
  const img = o.image || 'https://accerzwswgiqhtfgoeqv.supabase.co/storage/v1/object/public/img/1795330858770-veniceai-m0godwqqq90k5f-1.webp';
  const lines = [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width,initial-scale=1">',
    '<title>' + (o.title || 'Kıbrıs Escort · RedKıbrıs') + '</title>',
    '<meta name="description" content="' + (o.description || 'Kıbrıs escort rehberi. Sabit tarife, kapora yok, ödeme görüşmede nakit.') + '">',
    '<meta name="robots" content="index,follow">',
    '<link rel="canonical" href="' + url + '">',
    '<link rel="alternate" hreflang="tr" href="' + BASE + '/">',
    '<link rel="alternate" hreflang="en" href="' + BASE + '/en">',
    '<link rel="alternate" hreflang="ru" href="' + BASE + '/ru">',
    '<link rel="alternate" hreflang="x-default" href="' + BASE + '/">',
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="RedKıbrıs">',
    '<meta property="og:title" content="' + (o.title || 'Kıbrıs Escort · RedKıbrıs') + '">',
    '<meta property="og:description" content="' + (o.description || 'Sabit tarife, kapora yok.') + '">',
    '<meta property="og:url" content="' + url + '">',
    '<meta property="og:image" content="' + img + '">',
    '<meta property="og:locale" content="' + (lang === 'en' ? 'en_US' : lang === 'ru' ? 'ru_RU' : 'tr_TR') + '">',
    '<meta name="theme-color" content="#0b121b">',
    '<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 64 64\'%3E%3Cpath d=\'M32 2 62 32 32 62 2 32Z\' fill=\'%231e2a40\' stroke=\'%23f0d9ae\' stroke-opacity=\'.55\' stroke-width=\'2\'/%3E%3Ctext x=\'32\' y=\'41\' font-family=\'Georgia\' font-size=\'23\' font-weight=\'700\' text-anchor=\'middle\'%3E%3Ctspan fill=\'%23ff3b5c\'%3ER%3C/tspan%3E%3Ctspan fill=\'%23ffffff\'%3EK%3C/tspan%3E%3C/text%3E%3C/svg%3E">',
    '<style>' + css + '</style>'
  ];
  return lines.join('\n');
}

function shell(o) {
  o = o || {};
  const lang = o.lang || 'tr';
  const path = o.path || '/';
  return '<!DOCTYPE html>\n<html lang="' + lang + '"><head>\n' + head(o) + '\n</head>\n<body>\n' +
    header(path) + '\n<main class="wrap">' + (o.body || o.content || '') + '</main>\n' +
    footer() + '\n</body></html>';
}

function withToString(fn, fallback) {
  fn.toString = function () { return fallback(); };
  return fn;
}

const api = {
  BASE: BASE,
  WA: WA,
  TG: TG,
  NAV: NAV,
  css: css,
  mark: MARK,
  head: withToString(head, function () { return head({}); }),
  header: withToString(header, function () { return header('/'); }),
  footer: withToString(footer, function () { return footer(); }),
  shell: shell,
  render: shell,
  page: shell,
  layout: shell,
  html: shell,
  nav: function (path) {
    const current = normPath(path);
    return NAV.map(function (x) {
      const on = (current === x[0] || (x[0] === '/blog' && current.indexOf('/blog/') === 0)) ? ' class="on"' : '';
      return '<a href="' + BASE + x[0] + '"' + on + '>' + x[1] + '</a>';
    }).join('');
  },
  lang: langOf,
  langOf: langOf,
  normPath: normPath
};

api.default = api;

if (typeof module !== 'undefined' && module.exports) module.exports = api;
if (typeof window !== 'undefined' && typeof document !== 'undefined') window.RKChrome = api;
