const BASE = 'https://www.kibrisgirneescort.com';
const WA = 'https://wa.me/905515420755';

const NAV = [
  ['/', 'Ana Sayfa'], ['/girne-escort', 'Girne'], ['/lefkosa-escort', 'Lefkoşa'],
  ['/magusa-escort', 'Mağusa'], ['/iskele-escort', 'İskele'], ['/guzelyurt-escort', 'Güzelyurt'],
  ['/blog', 'Blog'], ['/rehber', 'Rehber'], ['/fiyatlar', 'Fiyatlar'], ['/iletisim', 'İletişim']
];

const WSVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02A9.82 9.82 0 0 0 12.04 2zm5.8 14.09c-.24.68-1.42 1.31-2 1.4-.52.08-1.17.11-1.89-.12-.43-.14-.99-.32-1.7-.62-3-1.22-4.95-4.36-5.1-4.56-.15-.2-1.22-1.61-1.22-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37h.57c.18.01.43-.07.67.51.25.59.85 2.05.92 2.2.07.15.12.32.02.52-.1.2-.15.33-.3.5-.15.17-.32.39-.45.52-.15.15-.3.31-.13.61.17.3.77 1.29 1.67 2.09 1.15 1.02 2.12 1.34 2.42 1.49.3.15.48.13.65-.07.17-.2.74-.87.94-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.08.12.08.72-.17 1.4z"/></svg>';

const css = `
:root{--bg:#0b121b;--panel:#111823;--line:rgba(216,184,120,.18);--ink:#e9eef6;--mut:#93a0b4;--gold:#d8b878;--red:#e8264a}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.65 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
a{color:var(--gold);text-decoration:none}
a:hover{text-decoration:underline}
.wrap{width:min(1120px,100%);margin:0 auto;padding:0 18px}
.site-header{position:sticky;top:0;z-index:60;background:rgba(10,16,32,.94);border-bottom:1px solid var(--line);backdrop-filter:saturate(140%) blur(10px)}
.site-header .header-in{width:min(1120px,100%);margin:0 auto;display:flex;align-items:center;gap:12px;padding:10px 18px;flex-wrap:wrap}
.site-header .brand{display:flex;align-items:center;gap:10px;color:var(--ink);flex:0 0 auto;text-decoration:none}
.site-header .brand .mark{width:40px;height:40px;flex:0 0 auto}
.site-header .wordmark{display:flex;flex-direction:column;line-height:1.05;font-family:Georgia,serif;font-size:21px;color:var(--ink)}
.site-header .wordmark b{color:var(--red);font-weight:700}
.site-header .wordmark i{font-style:normal;font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--mut);margin-top:4px}
.site-header .header-right{margin-left:auto;display:flex;align-items:center;gap:10px;flex:0 0 auto}
.site-header .btn-katalog{display:inline-flex;align-items:center;gap:7px;background:linear-gradient(180deg,#3ae07d,#25d366);color:#05270f;font-weight:700;font-size:14px;padding:10px 17px;border-radius:999px;white-space:nowrap;text-decoration:none}
.site-header .btn-katalog svg{width:17px;height:17px;fill:currentColor;flex:0 0 auto}
.site-header .lang{display:flex;gap:5px;font-size:12px;align-items:center;flex:0 0 auto}
.site-header .lang a{padding:4px 8px;border:1px solid var(--line);border-radius:999px;color:var(--mut);text-decoration:none}
.site-header .lang a.on{background:var(--gold);color:#141008;border-color:var(--gold);font-weight:700}
.site-header nav{order:3;flex:1 0 100%;display:flex;gap:8px;overflow-x:auto;padding:4px 0 10px;scrollbar-width:none}
.site-header nav::-webkit-scrollbar{display:none}
.site-header nav a{flex:0 0 auto;font-size:13.5px;color:var(--mut);padding:7px 13px;border:1px solid var(--line);border-radius:999px;background:var(--panel);white-space:nowrap;text-decoration:none}
.site-header nav a.on{color:#141008;background:var(--gold);border-color:var(--gold);font-weight:600}
@media(min-width:860px){
  .site-header .header-in{flex-wrap:wrap}
  .site-header nav{order:0;flex:1 1 100%;justify-content:flex-start;padding:0 0 10px;overflow:visible;gap:2px}
  .site-header nav a{background:transparent;border-color:transparent;padding:6px 10px}
  .site-header nav a.on{background:transparent;color:var(--gold);border-color:transparent;font-weight:700}
}
@media(max-width:859px){
  .site-header .header-in{gap:8px 10px;padding:10px 12px 0}
  .site-header .brand .mark{width:36px;height:36px}
  .site-header .wordmark{font-size:18px}
  .site-header .wordmark i{display:none}
  .site-header .header-right{gap:6px}
  .site-header .btn-katalog{padding:9px 14px;font-size:13px;gap:5px}
  .site-header .btn-katalog svg{width:15px;height:15px}
  .site-header .lang{gap:3px;font-size:11px}
  .site-header .lang a{padding:3px 6px}
  .site-header nav{padding:0 0 10px}
  .site-header nav a{font-size:12.5px;padding:6px 11px}
}
main{padding:22px 0 40px}
h1{font-family:Georgia,serif;font-size:32px;margin:0 0 8px}
h2{font-family:Georgia,serif;font-size:23px;margin:26px 0 10px;color:#f0d9ae}
.lead{font-size:18px;color:#cdd6e2}
.about{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin:10px 0}
.crumb{font-size:13px;color:var(--mut);margin-bottom:12px}
.btn,.btn-o{display:inline-block;padding:11px 18px;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none}
.btn{background:#25d366;color:#05270f}
.btn-o{border:1px solid var(--line);color:var(--gold);background:transparent}
.rimg{width:100%;height:auto;border-radius:14px;margin:10px 0;display:block}
.guncel{color:var(--mut);font-size:13px}
.sect{margin-top:30px}
.chrome-footer{border-top:1px solid var(--line);background:#0d1526;padding:34px 0 26px;margin-top:44px;color:var(--ink);font-size:16px}
.chrome-footer .cf-in{width:min(1120px,100%);margin:0 auto;padding:0 18px;display:flex;flex-wrap:wrap;gap:22px;justify-content:space-between}
.chrome-footer .cf-brand{max-width:34ch}
.chrome-footer .cf-brand span{font-family:Georgia,serif;font-size:19px;display:block;margin-bottom:10px}
.chrome-footer .cf-brand span b{color:var(--red)}
.chrome-footer .cf-brand p{color:var(--mut);font-size:13.5px;margin:0}
.chrome-footer .cf-cols{display:flex;flex-wrap:wrap;gap:26px}
.chrome-footer .cf-cols div{min-width:130px}
.chrome-footer .cf-cols h4{margin:0 0 8px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:400}
.chrome-footer .cf-cols a{display:block;color:var(--mut);font-size:14px;padding:3px 0;text-decoration:none}
.chrome-footer .cf-bottom{width:min(1120px,100%);margin:26px auto 0;padding:16px 18px 0;border-top:1px solid var(--line);display:flex;flex-wrap:wrap;gap:10px;justify-content:space-between;color:var(--mut);font-size:12.5px}
`;

function header(active) {
  active = active || '';
  const links = NAV.map(([h, t]) => {
    const on = (active === BASE + h || (h === '/blog' && active.indexOf('/blog/') === 0)) ? ' class="on"' : '';
    return `<a href="${BASE}${h}"${on}>${t}</a>`;
  }).join('');
  const pill = (code, label) => {
    const href = code === 'tr' ? BASE + '/' : BASE + '/' + code;
    return `<a href="${href}" data-lang="${code}"${code === 'tr' ? ' class="on"' : ''}>${label}</a>`;
  };
  return `<header class="site-header"><div class="header-in">
    <a class="brand" href="${BASE}/" aria-label="RedKıbrıs ana sayfa">
      <svg class="mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 1.8 46.2 24 24 46.2 1.8 24Z" fill="#1e2a40"></path><path d="M24 1.8 46.2 24 24 46.2 1.8 24Z" fill="none" stroke="#f0d9ae" stroke-opacity=".55" stroke-width="1.4"></path><text x="24" y="31" text-anchor="middle" font-family="Georgia,serif" font-size="16.5" font-weight="700"><tspan fill="#ff3b5c">R</tspan><tspan fill="#ffffff">K</tspan></text></svg>
      <span class="wordmark"><b>Red</b>Kıbrıs<i>Kıbrıs Escort</i></span>
    </a>
    <div class="header-right">
      <a class="btn-katalog" href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp ile katalog iste">${WSVG}Katalog</a>
      <span class="lang">${pill('tr', 'TR')}${pill('en', 'EN')}${pill('ru', 'RU')}</span>
    </div>
    <nav aria-label="Ana menü">${links}</nav>
  </div></header>`;
}

function footer() {
  const bolge = ['girne', 'lefkosa', 'magusa', 'iskele', 'guzelyurt']
    .map(s => `<a href="${BASE}/${s}-escort">${s.charAt(0).toUpperCase() + s.slice(1)} Escort</a>`).join('');
  return `<footer class="chrome-footer">
    <div class="cf-in">
      <div class="cf-brand"><span><b>Red</b>Kıbrıs</span><p>Kıbrıs Escort · Girne merkezli bağımsız escort rehberi. Bölge sayfaları, güncel profil listeleri ve net fiyatlar.</p></div>
      <div class="cf-cols">
        <div><h4>Bölgeler</h4>${bolge}</div>
        <div><h4>Site</h4><a href="${BASE}/">Ana Sayfa</a><a href="${BASE}/blog">Blog</a><a href="${BASE}/fiyatlar">Fiyatlar</a><a href="${BASE}/iletisim">İletişim</a><a href="${BASE}/gizlilik">Gizlilik</a></div>
      </div>
    </div>
    <div class="cf-bottom"><span>Kıbrıs Escort · Girne · Lefkoşa · Mağusa · İskele · Güzelyurt</span><span>© 2026 · Can</span></div>
  </footer>`;
}

module.exports = { css, header, footer };
