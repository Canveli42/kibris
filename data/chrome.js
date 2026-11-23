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

const css = `
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0a1020;--bg2:#0d1526;--panel:#111823;--panel2:#151e2c;--line:rgba(216,184,120,.18);--gold:#d8b878;--gold2:#f0d9ae;--red:#c8102e;--red2:#e8264a;--text:#e9eef6;--muted:#93a0b4;--wa:#25d366;--tg:#229ed9}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--text);font:16px/1.7 "Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif;-webkit-font-smoothing:antialiased}
a{color:var(--gold2);text-decoration:none}
img{max-width:100%;display:block}
.wrap{width:min(820px,100%);margin:0 auto;padding:0 18px}

.site-header{position:sticky;top:0;z-index:60;background:rgba(10,16,32,.94);border-bottom:1px solid var(--line);backdrop-filter:saturate(140%) blur(10px)}
.header-in{width:min(1120px,100%);display:flex;align-items:center;gap:14px;padding:10px 18px;flex-wrap:wrap}
.brand{display:flex;align-items:center;gap:10px;color:var(--text);flex:0 0 auto}
.brand .mark{width:40px;height:40px;flex:0 0 auto;filter:drop-shadow(0 4px 12px rgba(232,38,74,.45))}
.wordmark{display:flex;flex-direction:column;line-height:1.05;font-family:Georgia,"Times New Roman",serif;font-size:21px;letter-spacing:.02em;color:#fff}
.wordmark b{color:var(--red2);font-weight:700}
.wordmark i{font-style:normal;font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-top:4px}
.btn-katalog{margin-left:auto;flex:0 0 auto;display:inline-flex;align-items:center;gap:7px;background:linear-gradient(180deg,#3ae07d,var(--wa));color:#05270f;font-weight:700;font-size:14px;padding:10px 17px;border-radius:999px;border:0;box-shadow:0 6px 18px rgba(37,211,102,.22);white-space:nowrap}
.btn-katalog svg{width:17px;height:17px;fill:currentColor;flex:0 0 auto}
.btn-katalog:hover{filter:brightness(1.06)}
nav{order:3;flex:1 0 100%;display:flex;gap:8px;overflow-x:auto;padding:4px 0 10px;-webkit-overflow-scrolling:touch;scrollbar-width:none}
nav::-webkit-scrollbar{display:none}
nav a{flex:0 0 auto;font-size:13.5px;color:var(--muted);padding:7px 13px;border:1px solid var(--line);border-radius:999px;background:var(--panel);white-space:nowrap}
nav a:hover{color:var(--gold2);border-color:rgba(216,184,120,.45)}
nav a.on{color:#141008;background:var(--gold);border-color:var(--gold);font-weight:600}
@media(min-width:860px){
  .header-in{flex-wrap:nowrap;padding:12px 18px}
  nav{order:0;flex:1 1 auto;justify-content:flex-end;padding:0;overflow:visible}
  nav a{background:transparent;border-color:transparent;padding:6px 8px}
  nav a:hover{background:transparent}
  nav a.on{background:transparent;color:var(--gold);border-color:transparent;font-weight:700}
  .btn-katalog{margin-left:6px}
}

main.wrap{padding-top:8px;padding-bottom:40px}
.crumb{font-size:13px;color:var(--muted);padding:22px 0 0}
.crumb a{color:var(--gold2)}
h1{font-size:clamp(25px,4.4vw,36px);line-height:1.18;letter-spacing:-.03em;font-weight:800;margin:10px 0 10px;color:#fff}
.byline{font-size:13px;color:var(--muted);margin-bottom:6px}
.lead{color:var(--muted);font-size:16px;margin-bottom:22px}
h2{font-size:20px;color:#fff;border-left:3px solid var(--gold);padding-left:12px;margin:30px 0 14px}
h3{font-size:17px;color:#fff;margin:20px 0 8px}
#cover{width:100%;height:clamp(200px,36vw,360px);object-fit:cover;object-position:center 40%;border-radius:12px;border:1px solid var(--line);margin:18px 0 0;background:var(--panel2)}
.rimg{width:100%;max-height:400px;object-fit:cover;border-radius:14px;border:1px solid var(--line);margin:22px 0;background:var(--panel2)}
article p{color:#c3cdd9;margin-bottom:14px}
article strong{color:#fff}
article a{color:var(--gold2);text-decoration:underline;text-underline-offset:2px}
ul{margin:0 0 14px 20px;color:#c3cdd9}
li{margin-bottom:6px}
.guncel{font-size:12px;color:var(--muted);margin-top:10px}
.sect{padding:6px 0}
.about{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:18px;margin:12px 0;font-size:15px;color:#c3cdd9}
.about b{color:#fff}
.about a{color:var(--gold2);text-decoration:underline}

.btn{display:inline-flex;align-items:center;justify-content:center;background:linear-gradient(180deg,var(--gold2),var(--gold));color:#141008;font-weight:700;font-size:15px;padding:12px 22px;border:0;border-radius:999px;cursor:pointer;box-shadow:0 10px 26px rgba(216,184,120,.18)}
.btn:hover{filter:brightness(1.06)}
.btn.wa{background:linear-gradient(180deg,#3ae07d,var(--wa));color:#05270f;box-shadow:0 10px 26px rgba(37,211,102,.24)}
.btn.tg{background:linear-gradient(180deg,#4bb8ea,var(--tg));color:#04202e;box-shadow:0 10px 26px rgba(34,158,217,.24)}
.btn-o{display:inline-flex;align-items:center;justify-content:center;background:var(--panel2);border:1px solid var(--line);color:var(--text);border-radius:999px;padding:11px 16px;font-size:13.5px;font-weight:600;text-align:center}
.btn-o:hover{border-color:rgba(216,184,120,.55);color:var(--gold2)}
.about .btn{margin-top:10px;margin-right:8px}

.faq{max-width:720px;margin-top:32px}
.faq h2{font-size:21px;margin-bottom:12px;color:#fff}
.faq details{border-bottom:1px solid var(--line);padding:12px 0}
.faq summary{cursor:pointer;font-weight:600;font-size:15px;color:#fff}
.faq p{color:var(--muted);margin-top:8px;font-size:15px}
.diger{margin-top:32px}
.diger h2{font-size:20px;color:#fff;border-left:3px solid var(--gold);padding-left:12px;margin-bottom:12px}
.diger a{display:block;background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:12px 15px;font-size:14px;margin-bottom:8px}
.diger a:hover{border-color:rgba(216,184,120,.5)}

footer{border-top:1px solid var(--line);background:var(--bg2);padding:34px 0 26px;margin-top:44px}
.f-in{display:flex;flex-wrap:wrap;gap:22px;justify-content:space-between}
.f-brand{max-width:34ch}
.f-brand .wordmark{font-size:19px}
.f-brand p{color:var(--muted);font-size:13.5px;margin:10px 0 0}
.f-cols{display:flex;flex-wrap:wrap;gap:26px}
.f-cols div{min-width:130px}
.f-cols h4{margin:0 0 8px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}
.f-cols a{display:block;color:var(--muted);font-size:14px;padding:3px 0}
.f-cols a:hover{color:var(--gold2)}
.f-bottom{border-top:1px solid var(--line);margin-top:26px;padding-top:16px;display:flex;flex-wrap:wrap;gap:10px;justify-content:space-between;color:var(--muted);font-size:12.5px}
.fix{position:fixed;bottom:14px;left:14px;right:14px;justify-content:center;z-index:50;border-radius:12px;font-weight:700;background:var(--wa);color:#fff}
@media(max-width:859px){body{padding-bottom:88px}}
@media(min-width:860px){.fix{display:none}}
`;

const header = active => `<header class="site-header"><div class="wrap header-in">
  <a class="brand" href="${BASE}/" aria-label="RedKıbrıs ana sayfa - Kıbrıs Escort">
    <svg class="mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 1.8 46.2 24 24 46.2 1.8 24Z" fill="#151e2c"/><path d="M24 1.8 46.2 24 24 46.2 1.8 24Z" fill="none" stroke="#f0d9ae" stroke-opacity=".5" stroke-width="1.4"/><text x="24" y="31" text-anchor="middle" font-family="Georgia,serif" font-size="16.5" font-weight="700"><tspan fill="#e8264a">R</tspan><tspan fill="#ffffff">K</tspan></text></svg>
    <span class="wordmark"><b>Red</b>Kıbrıs<i>Kıbrıs Escort</i></span>
  </a>
  <a class="btn-katalog" id="waTop" href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp ile katalog iste">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02A9.82 9.82 0 0 0 12.04 2zm5.8 14.09c-.24.68-1.42 1.31-2 1.4-.52.08-1.17.11-1.89-.12-.43-.14-.99-.32-1.7-.62-3-1.22-4.95-4.36-5.1-4.56-.15-.2-1.22-1.61-1.22-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37h.57c.18.01.43-.07.67.51.25.59.85 2.05.92 2.2.07.15.12.32.02.52-.1.2-.15.33-.3.5-.15.17-.32.39-.45.52-.15.15-.3.31-.13.61.17.3.77 1.29 1.67 2.09 1.15 1.02 2.12 1.34 2.42 1.49.3.15.48.13.65-.07.17-.2.74-.87.94-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.08.12.08.72-.17 1.4z"/></svg>
    Katalog
  </a>
  <nav aria-label="Ana menü">
    ${NAV.map(([h, t]) => `<a href="${BASE}${h}"${active && BASE + h === active ? ' class="on"' : ''}>${t}</a>`).join('')}
  </nav>
</div></header>`;

const footer = () => `<footer><div class="wrap">
  <div class="f-in">
    <div class="f-brand">
      <span class="wordmark"><b>Red</b>Kıbrıs</span>
      <p>Kıbrıs Escort · Girne merkezli bağımsız escort rehberi. Bölge sayfaları, güncel profil listeleri ve net fiyatlar.</p>
    </div>
    <div class="f-cols">
      <div><h4>Bölgeler</h4>
        <a href="${BASE}/girne-escort">Girne Escort</a>
        <a href="${BASE}/lefkosa-escort">Lefkoşa Escort</a>
        <a href="${BASE}/magusa-escort">Mağusa Escort</a>
        <a href="${BASE}/iskele-escort">İskele Escort</a>
        <a href="${BASE}/guzelyurt-escort">Güzelyurt Escort</a>
      </div>
      <div><h4>Site</h4>
        <a href="${BASE}/">Ana Sayfa</a>
        <a href="${BASE}/blog">Blog</a>
        <a href="${BASE}/fiyatlar">Fiyatlar</a>
        <a href="${BASE}/iletisim">İletişim</a>
        <a href="${BASE}/gizlilik">Gizlilik</a>
      </div>
    </div>
  </div>
  <div class="f-bottom">
    <span>Kıbrıs Escort · Girne Escort · Lefkoşa Escort · Mağusa Escort · İskele Escort · Güzelyurt Escort</span>
    <span>© 2026 · Can</span>
  </div>
</div></footer>
<a class="btn fix" id="waFix" href="${WA}" target="_blank" rel="noopener">WhatsApp'tan yaz</a>`;

module.exports = { css, header, footer };
