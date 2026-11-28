const crypto = require('crypto');

const BASE = 'https://www.kibrisgirneescort.com';
const WA = 'https://wa.me/905515420755';
const TG = 'https://t.me/kibrisescortvip';
const GIT_SURUM = process.env.VERCEL_GIT_COMMIT_SHA || '';
const SURUM = /^[a-f0-9]{7,64}$/i.test(GIT_SURUM) ? GIT_SURUM.slice(0, 12) : '4';

const u = (dil, p) => BASE + (dil === 'tr' ? '' : '/' + dil) + p;

const NAVLAR = {
  tr: [['/', 'Ana Sayfa'], ['/girne-escort', 'Girne'], ['/lefkosa-escort', 'Lefkoşa'], ['/magusa-escort', 'Mağusa'], ['/iskele-escort', 'İskele'], ['/guzelyurt-escort', 'Güzelyurt'], ['/blog', 'Blog'], ['/fiyatlar', 'Fiyatlar'], ['/hakkinda', 'Hakkında'], ['/iletisim', 'İletişim']],
  en: [['/en', 'Home'], ['/en/girne-escort', 'Kyrenia'], ['/en/lefkosa-escort', 'Nicosia'], ['/en/magusa-escort', 'Famagusta'], ['/en/iskele-escort', 'Iskele'], ['/en/guzelyurt-escort', 'Guzelyurt'], ['/en/blog', 'Blog'], ['/en/fiyatlar', 'Prices'], ['/en/hakkinda', 'About'], ['/en/iletisim', 'Contact']],
  ru: [['/ru', 'Главная'], ['/ru/girne-escort', 'Кирения'], ['/ru/lefkosa-escort', 'Никосия'], ['/ru/magusa-escort', 'Фамагуста'], ['/ru/iskele-escort', 'Искеле'], ['/ru/guzelyurt-escort', 'Гюзельюрт'], ['/ru/blog', 'Блог'], ['/ru/fiyatlar', 'Цены'], ['/ru/hakkinda', 'О нас'], ['/ru/iletisim', 'Контакты']]
};

const KATALOG = { tr: 'Katalog', en: 'Catalogue', ru: 'Каталог' };
const ARIA_MENU = { tr: 'Ana menü', en: 'Main menu', ru: 'Меню' };
const ATLA = { tr: 'İçeriğe geç', en: 'Skip to content', ru: 'К содержанию' };

const MSG = {
  tr: "Merhaba, RedKıbrıs'tan yazıyorum. Bilgi alabilir miyim?",
  en: "Hi, writing from RedKıbrıs. Could I get some info?",
  ru: "Здравствуйте, пишу с RedKıbrıs. Можно узнать подробности?"
};

const FT = {
  tr: { b: 'Bölgeler', s: 'Site', marka: 'Kıbrıs Escort · Girne merkezli bağımsız escort rehberi. Bölge sayfaları, güncel profil listeleri ve net fiyatlar.', ana: 'Ana Sayfa', blog: 'Blog', fiyat: 'Fiyatlar', ilet: 'İletişim', hak: 'Hakkında', giz: 'Gizlilik', harita: 'Site Haritası', alt: 'Kıbrıs Escort · Girne · Lefkoşa · Mağusa · İskele · Güzelyurt' },
  en: { b: 'Areas', s: 'Site', marka: 'Escort service in Northern Cyprus. Kyrenia base, fixed rates, no deposit.', ana: 'Home', blog: 'Blog', fiyat: 'Prices', ilet: 'Contact', hak: 'About', giz: 'Privacy', harita: 'Sitemap', alt: 'Kyrenia · Nicosia · Famagusta · Iskele · Guzelyurt' },
  ru: { b: 'Районы', s: 'Сайт', marka: 'Эскорт на Северном Кипре. База в Кирении, фиксированные цены, без предоплаты.', ana: 'Главная', blog: 'Блог', fiyat: 'Цены', ilet: 'Контакты', hak: 'О нас', giz: 'Приватность', harita: 'Карта сайта', alt: 'Кирения · Никосия · Фамагуста · Искеле · Гюзельюрт' }
};

const WSVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02A9.82 9.82 0 0 0 12.04 2zm5.8 14.09c-.24.68-1.42 1.31-2 1.4-.52.08-1.17.11-1.89-.12-.43-.14-.99-.32-1.7-.62-3-1.22-4.95-4.36-5.1-4.56-.15-.2-1.22-1.61-1.22-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37h.57c.18.01.43-.07.67.51.25.59.85 2.05.92 2.2.07.15.12.32.02.52-.1.2-.15.33-.3.5-.15.17-.32.39-.45.52-.15.15-.3.31-.13.61.17.3.77 1.29 1.67 2.09 1.15 1.02 2.12 1.34 2.42 1.49.3.15.48.13.65-.07.17-.2.74-.87.94-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.08.12.08.72-.17 1.4z"/></svg>';

const MARK = '<svg class="mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 1.8 46.2 24 24 46.2 1.8 24Z" fill="#1e2a40"></path><path d="M24 1.8 46.2 24 24 46.2 1.8 24Z" fill="none" stroke="#f0d9ae" stroke-opacity=".55" stroke-width="1.4"></path><text x="24" y="31" text-anchor="middle" font-family="Georgia,serif" font-size="16.5" font-weight="700"><tspan fill="#ff3b5c">R</tspan><tspan fill="#ffffff">K</tspan></text></svg>';

const css = '';
const icerik = '';

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
    + '<link rel="stylesheet" href="/css/site.css?v=' + SURUM + '">'
    + '<link rel="stylesheet" href="/css/icerik.css?v=' + SURUM + '">'
    + '<script src="/js/analytics.js?v=' + SURUM + '" defer></script>'
    + '<script src="/takip.js?v=' + SURUM + '" defer></script>';
}

function header(o) {
  o = o || {};
  const dil = o.dil || 'tr';
  const aktif = String(o.aktif || '').replace(BASE, '');
  const ceviriler = o.ceviriler || {};
  const txt = encodeURIComponent(MSG[dil] || MSG.tr);

  const linkler = (NAVLAR[dil] || NAVLAR.tr).map(function (x) {
    const kok = x[0] === '/' || x[0] === '/en' || x[0] === '/ru';
    const on = aktif === x[0] || (!kok && aktif.indexOf(x[0] + '/') === 0);
    return '<a href="' + BASE + x[0] + '"' + (on ? ' class="on" aria-current="page"' : '') + '>' + x[1] + '</a>';
  }).join('');

  const pill = function (kod, etiket) {
    const hedef = ceviriler[kod] || u(kod, '');
    return '<a href="' + hedef + '" hreflang="' + kod + '" data-lang="' + kod + '"' + (kod === dil ? ' class="on" aria-current="true"' : '') + '>' + etiket + '</a>';
  };

  return '<a class="skip" href="#icerik">' + (ATLA[dil] || ATLA.tr) + '</a>'
    + '<header class="site-header"><div class="header-in">'
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

    + '<a href="' + u(dil, '/hakkinda') + '">' + f.hak + '</a><a href="' + u(dil, '/gizlilik') + '">' + f.giz + '</a>'
    + '<a href="/sitemap.xml">' + f.harita + '</a></div>'
    + '</div></div>'
    + '<div class="cf-bottom"><span>' + f.alt + '</span><span>© 2026 · Can</span></div>'
    + '</footer>'
    + '<script>' + ayarJs(dil) + '</script>';
}

module.exports = { css, icerik, head, header, footer, BASE, WA, TG, nonce, csp, noncele };
