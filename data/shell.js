const BASE = 'https://www.kibrisgirneescort.com';
const WA = 'https://wa.me/905515420755';
const TG = 'https://t.me/kibrisescortvip';

const NAVLAR = {
  tr: [['/', 'Ana Sayfa'], ['/girne-escort', 'Girne'], ['/lefkosa-escort', 'Lefkoşa'], ['/magusa-escort', 'Mağusa'], ['/iskele-escort', 'İskele'], ['/guzelyurt-escort', 'Güzelyurt'], ['/blog', 'Blog'], ['/blog/kibrista-yalniz-gelenler-rehberi', 'Rehber'], ['/fiyatlar', 'Fiyatlar'], ['/iletisim', 'İletişim']],
  en: [['/en', 'Home'], ['/girne-escort', 'Kyrenia'], ['/lefkosa-escort', 'Nicosia'], ['/magusa-escort', 'Famagusta'], ['/iskele-escort', 'Iskele'], ['/guzelyurt-escort', 'Guzelyurt'], ['/blog', 'Blog'], ['/blog/kibrista-yalniz-gelenler-rehberi', 'Guide'], ['/fiyatlar', 'Prices'], ['/iletisim', 'Contact']],
  ru: [['/ru', 'Главная'], ['/girne-escort', 'Кирения'], ['/lefkosa-escort', 'Никосия'], ['/magusa-escort', 'Фамагуста'], ['/iskele-escort', 'Искеле'], ['/guzelyurt-escort', 'Гюзельюрт'], ['/blog', 'Блог'], ['/blog/kibrista-yalniz-gelenler-rehberi', 'Гид'], ['/fiyatlar', 'Цены'], ['/iletisim', 'Контакты']]
};

const KATALOG = { tr: 'Katalog', en: 'Catalogue', ru: 'Каталог' };
const ARIA_MENU = { tr: 'Ana menü', en: 'Main menu', ru: 'Меню' };

const MSG = {
  tr: "Merhaba, RedKıbrıs'tan yazıyorum. Bilgi alabilir miyim?",
  en: "Hi, writing from RedKıbrıs. Could I get some info?",
  ru: "Здравствуйте, пишу с RedKıbrıs. Можно узнать подробности?"
};

const FT = {
  tr: { b: 'Bölgeler', s: 'Site', marka: 'Kıbrıs Escort · Girne merkezli bağımsız escort rehberi. Bölge sayfaları, güncel profil listeleri ve net fiyatlar.', ana: 'Ana Sayfa', blog: 'Blog', fiyat: 'Fiyatlar', ilet: 'İletişim', giz: 'Gizlilik', alt: 'Kıbrıs Escort · Girne · Lefkoşa · Mağusa · İskele · Güzelyurt' },
  en: { b: 'Areas', s: 'Site', marka: 'Escort service in Northern Cyprus. Kyrenia base, fixed rates, no deposit.', ana: 'Home', blog: 'Blog', fiyat: 'Prices', ilet: 'Contact', giz: 'Privacy', alt: 'Kyrenia · Nicosia · Famagusta · Iskele · Guzelyurt' },
  ru: { b: 'Районы', s: 'Сайт', marka: 'Эскорт на Северном Кипре. База в Кирении, фиксированные цены, без предоплаты.', ana: 'Главная', blog: 'Блог', fiyat: 'Цены', ilet: 'Контакты', giz: 'Приватность', alt: 'Кирения · Никосия · Фамагуста · Искеле · Гюзельюрт' }
};

const WSVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02A9.82 9.82 0 0 0 12.04 2zm5.8 14.09c-.24.68-1.42 1.31-2 1.4-.52.08-1.17.11-1.89-.12-.43-.14-.99-.32-1.7-.62-3-1.22-4.95-4.36-5.1-4.56-.15-.2-1.22-1.61-1.22-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37h.57c.18.01.43-.07.67.51.25.59.85 2.05.92 2.2.07.15.12.32.02.52-.1.2-.15.33-.3.5-.15.17-.32.39-.45.52-.15.15-.3.31-.13.61.17.3.77 1.29 1.67 2.09 1.15 1.02 2.12 1.34 2.42 1.49.3.15.48.13.65-.07.17-.2.74-.87.94-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.08.12.08.72-.17 1.4z"/></svg>';

const MARK = '<svg class="mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 1.8 46.2 24 24 46.2 1.8 24Z" fill="#1e2a40"></path><path d="M24 1.8 46.2 24 24 46.2 1.8 24Z" fill="none" stroke="#f0d9ae" stroke-opacity=".55" stroke-width="1.4"></path><text x="24" y="31" text-anchor="middle" font-family="Georgia,serif" font-size="16.5" font-weight="700"><tspan fill="#ff3b5c">R</tspan><tspan fill="#ffffff">K</tspan></text></svg>';

const css = `
:root{--line:rgba(216,184,120,.18);--gold:#d8b878;--gold2:#f0d9ae;--red:#ff3b5c;--panel:#111823;--mut:#93a0b4;--wa:#25d366}
.site-header{position:sticky;top:0;z-index:60;background:rgba(10,16,32,.94);border-bottom:1px solid var(--line);backdrop-filter:saturate(140%) blur(10px)}
.site-header .header-in{width:min(1120px,100%);margin:0 auto;display:flex;align-items:center;gap:14px;padding:10px 18px;flex-wrap:wrap}
.site-header .brand{display:flex;align-items:center;gap:10px;color:#e9eef6;flex:0 0 auto;text-decoration:none}
.site-header .brand .mark{width:40px;height:40px;flex:0 0 auto;filter:drop-shadow(0 4px 12px rgba(255,59,92,.45))}
.site-header .wordmark{display:flex;flex-direction:column;line-height:1.05;font-family:Georgia,serif;font-size:21px;color:#fff}
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
  .site-header .wordmark{font-size:18px}
  .site-header .wordmark i{display:none}
  .site-header .btn-katalog{order:1;padding:9px 14px;font-size:13px;gap:5px}
  .site-header .btn-katalog svg{width:15px;height:15px}
  .site-header .lang{order:2;gap:3px;font-size:11px}
  .site-header .lang a{padding:3px 6px}
  .site-header nav{order:3;flex:1 0 100%;padding:0 0 10px}
  .site-header nav a{font-size:12.5px;padding:6px 11px}
}
.chrome-footer{border-top:1px solid var(--line);background:#0d1526;padding:34px 0 26px;margin-top:44px;color:#e9eef6;font-size:16px}
.chrome-footer .cf-in{width:min(1120px,100%);margin:0 auto;padding:0 18px;display:flex;flex-wrap:wrap;gap:22px;justify-content:space-between}
.chrome-footer .cf-brand{max-width:34ch}
.chrome-footer .cf-brand span{font-family:Georgia,serif;font-size:19px;display:block;margin-bottom:10px}
.chrome-footer .cf-brand span b{color:#e8264a}
.chrome-footer .cf-brand p{color:var(--mut);font-size:13.5px;margin:0}
.chrome-footer .cf-cols{display:flex;flex-wrap:wrap;gap:26px}
.chrome-footer .cf-cols div{min-width:130px}
.chrome-footer .cf-cols h4{margin:0 0 8px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:400}
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
.btn{background:#25d366;color:#fff}
.btn.tg{background:#229ed9;color:#fff}
.btn-o{border:1px solid var(--line);color:var(--gold2);background:transparent}
.rimg,#cover{display:block;width:100%;max-width:720px;height:auto;max-height:400px;object-fit:cover;object-position:center;border-radius:14px;margin:12px auto;background:#151e2c}
@media(max-width:640px){.rimg,#cover{max-height:230px}}
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
`;

function ayarJs(dil) {
  const def = encodeURIComponent(MSG[dil] || MSG.tr);
  return '(function(){var SB="https://accerzwswgiqhtfgoeqv.supabase.co",K="sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG",WA="' + WA + '",TG="' + TG + '",DEF="' + def + '";'
    + 'function t(a){var b=a.getAttribute("data-base")||a.getAttribute("href")||"",m=b.match(/[?&]text=([^&]*)/);return m?m[1]:DEF}'
    + 'function b(s,base){var l=document.querySelectorAll(s);for(var i=0;i<l.length;i++){var a=l[i];if(!a.getAttribute("data-base"))a.setAttribute("data-base",a.getAttribute("href")||base);a.setAttribute("href",base+"?text="+t(a));if(!a.getAttribute("target")){a.setAttribute("target","_blank");a.setAttribute("rel","noopener")}}}'
    + 'function bag(){b(\'a[data-base*="wa.me"],a[href*="wa.me"]\',WA);b(\'a[data-base*="t.me"],a[href*="t.me"]\',TG)}'
    + 'bag();'
    + 'fetch(SB+"/rest/v1/settings?select=key,value",{headers:{apikey:K,Authorization:"Bearer "+K}}).then(function(r){return r.ok?r.json():null}).then(function(s){if(!s)return;var c={};s.forEach(function(x){c[x.key]=x.value});if(c.whatsapp)b(\'a[data-base*="wa.me"],a[href*="wa.me"]\',"https://wa.me/"+c.whatsapp);if(c.telegram)b(\'a[data-base*="t.me"],a[href*="t.me"]\',"https://t.me/"+c.telegram)}).catch(function(){});})();';
}

function head() {
  return '<style>' + css + '</style>';
}

function header(o) {
  o = o || {};
  const dil = o.dil || 'tr';
  const aktif = o.aktif || '';
  const yol = aktif.replace(BASE, '');
  const txt = encodeURIComponent(MSG[dil] || MSG.tr);

  const linkler = (NAVLAR[dil] || NAVLAR.tr).map(function (x) {
    const on = (yol === x[0] || (x[0] !== '/' && x[0] !== '/en' && x[0] !== '/ru' && yol.indexOf(x[0]) === 0))
      ? ' class="on" aria-current="page"' : '';
    return '<a href="' + BASE + x[0] + '"' + on + '>' + x[1] + '</a>';
  }).join('');

  const pill = function (kod, etiket) {
    const href = kod === 'tr' ? BASE + '/' : BASE + '/' + kod;
    return '<a href="' + href + '" data-lang="' + kod + '"' + (kod === dil ? ' class="on"' : '') + '>' + etiket + '</a>';
  };

  return '<header class="site-header"><div class="header-in">'
    + '<a class="brand" href="' + BASE + '/" aria-label="RedKıbrıs">' + MARK
    + '<span class="wordmark"><b>Red</b>Kıbrıs<i>' + (dil === 'tr' ? 'Kıbrıs Escort' : dil === 'en' ? 'Cyprus Escort' : 'Эскорт Кипр') + '</i></span></a>'
    + '<a class="btn-katalog" href="' + WA + '?text=' + txt + '" target="_blank" rel="noopener" data-base="' + WA + '" aria-label="WhatsApp">' + WSVG + (KATALOG[dil] || KATALOG.tr) + '</a>'
    + '<span class="lang">' + pill('tr', 'TR') + pill('en', 'EN') + pill('ru', 'RU') + '</span>'
    + '<nav aria-label="' + (ARIA_MENU[dil] || ARIA_MENU.tr) + '">' + linkler + '</nav>'
    + '</div></header>';
}

function footer(dil) {
  dil = dil || 'tr';
  const f = FT[dil] || FT.tr;
  const bolge = [['girne', 'Girne'], ['lefkosa', 'Lefkoşa'], ['magusa', 'Mağusa'], ['iskele', 'İskele'], ['guzelyurt', 'Güzelyurt']]
    .map(function (x) { return '<a href="' + BASE + '/' + x[0] + '-escort">' + x[1] + '</a>'; }).join('');

  return '<footer class="chrome-footer">'
    + '<div class="cf-in">'
    + '<div class="cf-brand"><span><b>Red</b>Kıbrıs</span><p>' + f.marka + '</p></div>'
    + '<div class="cf-cols">'
    + '<div><h4>' + f.b + '</h4>' + bolge + '</div>'
    + '<div><h4>' + f.s + '</h4>'
    + '<a href="' + BASE + '/">' + f.ana + '</a><a href="' + BASE + '/blog">' + f.blog + '</a>'
    + '<a href="' + BASE + '/fiyatlar">' + f.fiyat + '</a><a href="' + BASE + '/iletisim">' + f.ilet + '</a>'
    + '<a href="' + BASE + '/gizlilik">' + f.giz + '</a></div>'
    + '</div></div>'
    + '<div class="cf-bottom"><span>' + f.alt + '</span><span>© 2026 · Can</span></div>'
    + '</footer>'
    + '<script>' + ayarJs(dil) + '</script>';
}

module.exports = { css, icerik, head, header, footer, BASE, WA, TG };
