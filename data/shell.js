const crypto = require('crypto');

const BASE = 'https://www.kibrisgirneescort.com';
const WA = 'https://wa.me/905515420755';
const TG = 'https://t.me/kibrisescortvip';

const u = (dil, p) => BASE + (dil === 'tr' ? '' : '/' + dil) + p;

const NAVLAR = {
  tr: [['/', 'Ana Sayfa'], ['/girne-escort', 'Girne'], ['/lefkosa-escort', 'Lefkoşa'], ['/magusa-escort', 'Mağusa'], ['/iskele-escort', 'İskele'], ['/guzelyurt-escort', 'Güzelyurt'], ['/blog', 'Blog'], ['/fiyatlar', 'Fiyatlar'], ['/iletisim', 'İletişim']],
  en: [['/en', 'Home'], ['/en/girne-escort', 'Kyrenia'], ['/en/lefkosa-escort', 'Nicosia'], ['/en/magusa-escort', 'Famagusta'], ['/en/iskele-escort', 'Iskele'], ['/en/guzelyurt-escort', 'Guzelyurt'], ['/en/blog', 'Blog'], ['/en/fiyatlar', 'Prices'], ['/en/iletisim', 'Contact']],
  ru: [['/ru', 'Главная'], ['/ru/girne-escort', 'Кирения'], ['/ru/lefkosa-escort', 'Никосия'], ['/ru/magusa-escort', 'Фамагуста'], ['/ru/iskele-escort', 'Искеле'], ['/ru/guzelyurt-escort', 'Гюзельюрт'], ['/ru/blog', 'Блог'], ['/ru/fiyatlar', 'Цены'], ['/ru/iletisim', 'Контакты']]
};

const KATALOG = { tr: 'Katalog', en: 'Catalogue', ru: 'Каталог' };
const ARIA_MENU = { tr: 'Ana menü', en: 'Main menu', ru: 'Меню' };

const MSG = {
  tr: "Merhaba, RedKıbrıs'tan yazıyorum. Bilgi alabilir miyim?",
  en: "Hi, writing from RedKıbrıs. Could I get some info?",
  ru: "Здравствуйте, пишу с RedKıbrıs. Можно узнать подробности?"
};

const FT = {
  tr: { b: 'Bölgeler', s: 'Site', marka: 'Kıbrıs Escort · Girne merkezli bağımsız escort rehberi. Bölge sayfaları, güncel profil listeleri ve net fiyatlar.', ana: 'Ana Sayfa', blog: 'Blog', fiyat: 'Fiyatlar', ilet: 'İletişim', hak: 'Hakkında', giz: 'Gizlilik', alt: 'Kıbrıs Escort · Girne · Lefkoşa · Mağusa · İskele · Güzelyurt' },
  en: { b: 'Areas', s: 'Site', marka: 'Escort service in Northern Cyprus. Kyrenia base, fixed rates, no deposit.', ana: 'Home', blog: 'Blog', fiyat: 'Prices', ilet: 'Contact', hak: 'About', giz: 'Privacy', alt: 'Kyrenia · Nicosia · Famagusta · Iskele · Guzelyurt' },
  ru: { b: 'Районы', s: 'Сайт', marka: 'Эскорт на Северном Кипре. База в Кирении, фиксированные цены, без предоплаты.', ana: 'Главная', blog: 'Блог', fiyat: 'Цены', ilet: 'Контакты', hak: 'О нас', giz: 'Приватность', alt: 'Кирения · Никосия · Фамагуста · Искеле · Гюзельюрт' }
};

const WSVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02A9.82 9.82 0 0 0 12.04 2zm5.8 14.09c-.24.68-1.42 1.31-2 1.4-.52.08-1.17.11-1.89-.12-.43-.14-.99-.32-1.7-.62-3-1.22-4.95-4.36-5.1-4.56-.15-.2-1.22-1.61-1.22-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37h.57c.18.01.43-.07.67.51.25.59.85 2.05.92 2.2.07.15.12.32.02.52-.1.2-.15.33-.3.5-.15.17-.32.39-.45.52-.15.15-.3.31-.13.61.17.3.77 1.29 1.67 2.09 1.15 1.02 2.12 1.34 2.42 1.49.3.15.48.13.65-.07.17-.2.74-.87.94-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.08.12.08.72-.17 1.4z"/></svg>';

const MARK = '<svg class="mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 1.8 46.2 24 24 46.2 1.8 24Z" fill="#1e2a40"></path><path d="M24 1.8 46.2 24 24 46.2 1.8 24Z" fill="none" stroke="#f0d9ae" stroke-opacity=".55" stroke-width="1.4"></path><text x="24" y="31" text-anchor="middle" font-family="Georgia,serif" font-size="16.5" font-weight="700"><tspan fill="#ff3b5c">R</tspan><tspan fill="#ffffff">K</tspan></text></svg>';

const css = `
:root{--line:rgba(216,184,120,.18);--gold:#d8b878;--gold2:#f0d9ae;--red:#ff3b5c;--panel:#111823;--mut:#93a0b4;--wa:#25d366}
.site-header{position:sticky;top:0;z-index:60;background:rgba(10,16,32,.94);border-bottom:1px solid var(--line);backdrop-filter:saturate(140%) blur(10px)}
.site-header .header-in{width:min(1120px,100%);margin:0 auto;display:flex;align-items:center;gap:14px;padding:10px 18px;flex-wrap:wrap}
.site-header .brand{display:flex;align-items:center;gap:10px;color:#e9eef6;flex:0 0 auto;text-decoration:none}
.site-header .brand .mark{width:40px;height:40px;flex:0 0 auto;filter:drop-shadow(0 4px 12px rgba(255,59,92,.45))}
.site-header .wordmark{display:flex;flex-direction:column;line-height:1.05;font-family:Georgia,serif;font-size:21px;color:#fff;min-width:106px}
.site-header .wordmark b{color:var(--red)}
.site-header .wordmark i{font-style:normal;font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--mut);margin-top:4px}
.site-header .btn-katalog{margin-left:auto;flex:0 0 auto;display:inline-flex;align-items:center;gap:7px;background:linear-gradient(180deg,#3ae07d,var(--wa));color:#05270f;font-weight:700;font-size:14px;padding:10px 17px;border-radius:999px;box-shadow:0 6px 18px rgba(37,211,102,.22);white-space:nowrap;text-decoration:none}
.site-header .btn-katalog svg{width:17px;height:17px;fill:currentColor;flex:0 0 auto}
.site-header .lang{display:flex;gap:5px;font-size:12px;align-items:center;flex:0 0 auto}
.site-header .lang a{padding:4px 8px;border:1px solid var(--line);border-radius:999px;color:var(--mut);text-decoration:none}
.site-header .lang a.on{background:var(--gold);color:#141008;border-color:var(--gold);font-weight:700}
.site-header nav{order:3;flex:1 0 100%;display:flex;gap:8px;overflow-x:auto;padding:4px 0 10px;scrollbar-width:none}
.site-header nav::-webkit-scrollbar{display:none}
.site-header nav a{flex:0 0 auto;font-size:13.5px;color:var(--mut);padding:7px 13px;border:1px solid var(--line);border-radius:999px;background:var(--panel);white-space:nowrap;text-decoration:none}
.site-header nav a:hover{color:var(--gold2);border-color:rgba(216,184,120,.45)}
.site-header nav a.on{color:#141008;background:var(--gold);border-color:var(--gold);font-weight:600}
@media(min-width:860px){
  .site-header .header-in{flex-wrap:nowrap;padding:12px 18px}
  .site-header nav{order:0;flex:1 1 auto;justify-content:flex-end;padding:0;overflow:visible}
  .site-header nav a{background:transparent;border-color:transparent;padding:6px 8px}
  .site-header nav a.on{background:transparent;color:var(--gold);border-color:transparent;font-weight:700}
  .site-header .btn-katalog{margin-left:6px}
}
@media(max-width:859px){
  .site-header .header-in{gap:8px 10px;padding:10px 12px 10px}
  .site-header .brand{gap:8px;min-width:0}
  .site-header .brand .mark{width:36px;height:36px}
  .site-header .wordmark{font-size:18px;min-width:92px}
  .site-header .wordmark i{display:none}
  .site-header .btn-katalog{order:1;padding:9px 14px;font-size:13px;gap:5px}
  .site-header .btn-katalog svg{width:15px;height:15px}
  .site-header .lang{order:2;gap:3px;font-size:11px}
  .site-header .lang a{padding:3px 6px}
  .site-header nav{order:3;flex:1 0 100%;padding:0 0 10px;overflow:visible;display:grid;grid-template-columns:repeat(3,1fr);gap:5px}
  .site-header nav a{font-size:11.5px;padding:6px 2px;text-align:center;letter-spacing:.02em;background:rgba(17,24,35,.7);border-color:rgba(216,184,120,.13)}
  .site-header nav a:nth-child(n+7){display:none}
}
.chrome-footer{border-top:1px solid var(--line);background:#0d1526;padding:34px 0 26px;margin-top:44px;color:#e9eef6;font-size:16px}
.chrome-footer .cf-in{width:min(1120px,100%);margin:0 auto;padding:0 18px;display:flex;flex-wrap:wrap;gap:22px;justify-content:space-between}
.chrome-footer .cf-brand{max-width:34ch}
.chrome-footer .cf-brand span{font-family:Georgia,serif;font-size:19px;display:block;margin-bottom:10px}
.chrome-footer .cf-brand span b{color:#e8264a}
.chrome-footer .cf-brand p{color:var(--mut);font-size:13.5px;margin:0}
.chrome-footer .cf-cols{display:flex;flex-wrap:wrap;gap:26px}
.chrome-footer .cf-cols div{min-width:130px}
.chrome-footer .cf-cols h3{margin:0 0 8px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:400}
.chrome-footer .cf-cols a{display:block;color:var(--mut);font-size:14px;padding:3px 0;text-decoration:none}
.chrome-footer .cf-cols a:hover{color:var(--gold2)}
.chrome-footer .cf-bottom{width:min(1120px,100%);margin:26px auto 0;padding:16px 18px 0;border-top:1px solid var(--line);display:flex;flex-wrap:wrap;gap:10px;justify-content:space-between;color:var(--mut);font-size:12.5px}
`;

const icerik = `
:root{--bg:#0b121b;--panel:#111823;--line:rgba(216,184,120,.18);--ink:#e9eef6;--mut:#93a0b4;--gold:#d8b878;--gold2:#f0d9ae;--wa:#25d366}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.65 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
a{color:var(--gold2);text-decoration:none}
a:hover{text-decoration:underline}
main a:not(.btn):not(.btn-o):not(.rimg){text-decoration:underline;text-underline-offset:2px;text-decoration-thickness:1px}
img{max-width:100%;display:block}
.wrap{width:min(1120px,100%);margin:0 auto;padding:0 18px}
main{padding:22px 0 40px}
h1{font-family:Georgia,serif;font-size:clamp(28px,4.6vw,38px);line-height:1.15;margin:0 0 8px;color:#fff}
h2{font-family:Georgia,serif;font-size:23px;margin:26px 0 10px;color:var(--gold2)}
h3{font-size:17px;margin:18px 0 8px;color:var(--gold2)}
p{margin:0 0 1em}
.lead{font-size:18px;color:#cdd6e2}
.about{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin:10px 0}
.about b{color:#fff}
.crumb{font-size:13px;color:var(--mut);margin-bottom:12px}
.crumb a{color:var(--gold2)}
.btn,.btn-o{display:inline-block;padding:11px 18px;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;border:0}
.btn{background:#25d366;color:#04270f}
.btn.tg{background:#229ed9;color:#04202e}
.btn-o{border:1px solid var(--line);color:var(--gold2);background:transparent}
.rimg,#cover{display:block;width:100%;max-width:560px;height:auto;aspect-ratio:16/10;max-height:620px;object-fit:cover;object-position:center top;border-radius:14px;margin:12px auto;background:#151e2c}
@media(max-width:640px){.rimg,#cover{max-height:420px}}
.guncel{color:var(--mut);font-size:13px}
.sect{margin-top:30px}
.byline{color:var(--mut);font-size:13px;margin-bottom:14px}
article p,article li{color:#d5dde7}
article ul,article ol{margin:0 0 1em 20px;padding-left:20px}
.faq{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:0 16px;margin:20px 0}
.faq details{border-bottom:1px solid var(--line);padding:12px 0}
.faq details:last-child{border-bottom:0}
.faq summary{cursor:pointer;font-weight:600;list-style:none;color:#fff}
.faq summary::-webkit-details-marker{display:none}
.faq p{color:var(--mut);font-size:14.5px;margin:8px 0 0}
.diger{margin-top:26px}
.diger a{display:inline-block;margin:0 10px 8px 0}
ul,ol{padding-left:20px}
.cerez a,.cookie a,.cerez-bar a,.cookie-bar a,#cerez a,#cookie a,[class*="cerez"] a,[class*="cookie"] a{color:var(--gold2);text-decoration:underline;text-underline-offset:2px;font-weight:600}
`;

// Trusted Types default policy: innerHTML / script.src gibi string atamalarını olduğu gibi geçirir.
const TT = '<script>if(window.trustedTypes&&trustedTypes.createPolicy){try{trustedTypes.createPolicy("default",{createHTML:function(s){return s},createScript:function(s){return s},createScriptURL:function(s){return s}})}catch(e){}}</script>';

function nonce() {
  return crypto.randomBytes(16).toString('base64');
}

function csp(n) {
  return "default-src 'self'; "
    + "script-src 'self' 'nonce-" + n + "' 'strict-dynamic'; "
    + "style-src 'self' 'unsafe-inline'; "
    + "img-src 'self' data: https://accerzwswgiqhtfgoeqv.supabase.co; "
    + "connect-src 'self' https://accerzwswgiqhtfgoeqv.supabase.co; "
    + "frame-src 'none'; font-src 'self' data:; object-src 'none'; "
    + "base-uri 'self'; form-action 'self'; frame-ancestors 'self'; "
    + "require-trusted-types-for 'script'; trusted-types default";
}

function noncele(html, n) {
  return String(html).replace(/<script\b(?![^>]*\bnonce=)/gi, '<script nonce="' + n + '"');
}

function ayarJs(dil) {
  const def = encodeURIComponent(MSG[dil] || MSG.tr);
  return '(function(){var WA="' + WA + '",TG="' + TG + '",DEF="' + def + '";'
    + 'function t(a){var b=a.getAttribute("data-base")||a.getAttribute("href")||"",m=b.match(/[?&]text=([^&]*)/);return m?m[1]:DEF}'
    + 'function b(s,base){var l=document.querySelectorAll(s);for(var i=0;i<l.length;i++){var a=l[i];if(!a.getAttribute("data-base"))a.setAttribute("data-base",a.getAttribute("href")||base);a.setAttribute("href",base+"?text="+t(a));if(!a.getAttribute("target")){a.setAttribute("target","_blank");a.setAttribute("rel","noopener")}}}'
    + 'b(\'a[data-base*="wa.me"],a[href*="wa.me"]\',WA);'
    + 'b(\'a[data-base*="t.me"],a[href*="t.me"]\',TG);'
    + '})();';
}

function head() {
  return TT
    + '<link rel="preconnect" href="https://accerzwswgiqhtfgoeqv.supabase.co" crossorigin>'
    + '<style>' + css + '</style>'
    + '<script src="/js/analytics.js?v=2" defer></script>'
    + '<script src="/takip.js?v=2" defer></script>';
}

function header(o) {
  o = o || {};
  const dil = o.dil || 'tr';
  const aktif = o.aktif || '';
  const yol = aktif.replace(BASE, '');
  const ceviriler = o.ceviriler || {};
  const txt = encodeURIComponent(MSG[dil] || MSG.tr);

  const linkler = (NAVLAR[dil] || NAVLAR.tr).map(function (x) {
    const on = (yol === x[0] || (x[0] !== '/' && x[0] !== '/en' && x[0] !== '/ru' && yol.indexOf(x[0]) === 0))
      ? ' class="on" aria-current="page"' : '';
    return '<a href="' + BASE + x[0] + '"' + on + '>' + x[1] + '</a>';
  }).join('');

  const pill = function (kod, etiket) {
    const hedef = ceviriler[kod] || u(kod, '');
    return '<a href="' + hedef + '" data-lang="' + kod + '"' + (kod === dil ? ' class="on"' : '') + '>' + etiket + '</a>';
  };

  return '<header class="site-header"><div class="header-in">'
    + '<a class="brand" href="' + u(dil, '') + '">' + MARK
    + '<span class="wordmark"><b>Red</b>Kıbrıs<i>' + (dil === 'tr' ? 'Kıbrıs Escort' : dil === 'en' ? 'Cyprus Escort' : 'Эскорт Кипр') + '</i></span></a>'
    + '<a class="btn-katalog" href="' + WA + '?text=' + txt + '" target="_blank" rel="noopener" data-base="' + WA + '">' + WSVG + (KATALOG[dil] || KATALOG.tr) + '</a>'
    + '<span class="lang">' + pill('tr', 'TR') + pill('en', 'EN') + pill('ru', 'RU') + '</span>'
    + '<nav aria-label="' + (ARIA_MENU[dil] || ARIA_MENU.tr) + '">' + linkler + '</nav>'
    + '</div></header>';
}

function footer(dil) {
  dil = dil || 'tr';
  const f = FT[dil] || FT.tr;
  const bolge = [['girne', 'Girne'], ['lefkosa', 'Lefkoşa'], ['magusa', 'Mağusa'], ['iskele', 'İskele'], ['guzelyurt', 'Güzelyurt']]
    .map(function (x) { return '<a href="' + u(dil, '/' + x[0] + '-escort') + '">' + x[1] + '</a>'; }).join('');

  return '<footer class="chrome-footer">'
    + '<div class="cf-in">'
    + '<div class="cf-brand"><span><b>Red</b>Kıbrıs</span><p>' + f.marka + '</p></div>'
    + '<div class="cf-cols">'
    + '<div><h3>' + f.b + '</h3>' + bolge + '</div>'
    + '<div><h3>' + f.s + '</h3>'
    + '<a href="' + u(dil, '') + '">' + f.ana + '</a><a href="' + u(dil, '/blog') + '">' + f.blog + '</a>'
    + '<a href="' + u(dil, '/fiyatlar') + '">' + f.fiyat + '</a><a href="' + u(dil, '/iletisim') + '">' + f.ilet + '</a>'
    + '<a href="tel:+905515420755">+90 551 542 07 55</a>'
    + '<a href="' + u(dil, '/hakkinda') + '">' + f.hak + '</a><a href="' + u(dil, '/gizlilik') + '">' + f.giz + '</a></div>'
    + '</div></div>'
    + '<div class="cf-bottom"><span>' + f.alt + '</span><span>© 2026 · Can</span></div>'
    + '</footer>'
    + '<script>' + ayarJs(dil) + '</script>';
}

module.exports = { css, icerik, head, header, footer, BASE, WA, TG, nonce, csp, noncele };
