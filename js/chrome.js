(function(){
  "use strict";

  var css = ''
    + ':root{--ink:#0b121b;--soft:#0a0f18;--line:#22303f;--card:#111823;--muted:#8b97a5;--gold:#d8b878;--gold-d:#eed3a1;--txt:#f2f5f8;--champ2:#f3ddb4;--wa:#25d366;--tg:#229ed9}'
    + '*{box-sizing:border-box}'
    + 'body{background:var(--soft);color:var(--txt);font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;line-height:1.68;padding-bottom:96px;margin:0}'
    + 'a{color:inherit;text-decoration:none}'
    + 'img{max-width:100%;display:block}'
    + '.wrap{width:min(1120px,100%);margin:0 auto;padding:0 18px}'
    + '.site-header{position:sticky;top:0;z-index:60;background:rgba(10,16,32,.94);border-bottom:1px solid rgba(216,184,120,.18);backdrop-filter:saturate(140%) blur(10px)}'
    + '.site-header .header-in{width:min(1120px,100%);margin:0 auto;display:flex;align-items:center;gap:14px;padding:10px 18px;flex-wrap:wrap}'
    + '.site-header .brand{display:flex;align-items:center;gap:10px;color:#e9eef6;flex:0 0 auto}'
    + '.site-header .brand .mark{width:40px;height:40px;flex:0 0 auto;filter:drop-shadow(0 4px 12px rgba(255,59,92,.45))}'
    + '.site-header .wordmark{display:flex;flex-direction:column;line-height:1.05;font-family:Georgia,serif;font-size:21px;color:#fff}'
    + '.site-header .wordmark b{color:#ff3b5c}'
    + '.site-header .wordmark i{font-style:normal;font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:#93a0b4;margin-top:4px}'
    + '.site-header .btn-katalog{margin-left:auto;flex:0 0 auto;display:inline-flex;align-items:center;gap:7px;background:linear-gradient(180deg,#3ae07d,#25d366);color:#05270f;font-weight:700;font-size:14px;padding:10px 17px;border-radius:999px;box-shadow:0 6px 18px rgba(37,211,102,.22);white-space:nowrap}'
    + '.site-header .btn-katalog svg{width:17px;height:17px;fill:currentColor;flex:0 0 auto}'
    + '.site-header .lang{display:flex;gap:5px;font-size:12px;align-items:center;flex:0 0 auto}'
    + '.site-header .lang a{padding:4px 8px;border:1px solid rgba(216,184,120,.18);border-radius:999px;color:#93a0b4}'
    + '.site-header .lang a.on{background:#d8b878;color:#141008;border-color:#d8b878;font-weight:700}'
    + '.site-header nav{order:3;flex:1 0 100%;display:flex;gap:8px;overflow-x:auto;padding:4px 0 10px;scrollbar-width:none}'
    + '.site-header nav::-webkit-scrollbar{display:none}'
    + '.site-header nav a{flex:0 0 auto;font-size:13.5px;color:#93a0b4;padding:7px 13px;border:1px solid rgba(216,184,120,.18);border-radius:999px;background:#111823;white-space:nowrap}'
    + '.site-header nav a:hover{color:#f0d9ae;border-color:rgba(216,184,120,.45)}'
    + '.site-header nav a.on{color:#141008;background:#d8b878;border-color:#d8b878;font-weight:600}'
    + '@media(min-width:860px){.site-header .header-in{flex-wrap:nowrap;padding:12px 18px}.site-header nav{order:0;flex:1 1 auto;justify-content:flex-end;padding:0;overflow:visible}.site-header nav a{background:transparent;border-color:transparent;padding:6px 8px}.site-header nav a.on{background:transparent;color:#d8b878;border-color:transparent;font-weight:700}.site-header .btn-katalog{margin-left:6px}}'
    + '@media(max-width:859px){.site-header .header-in{gap:8px 10px;padding:10px 12px 0}.site-header .brand{gap:8px;min-width:0}.site-header .brand .mark{width:36px;height:36px}.site-header .wordmark{font-size:18px}.site-header .wordmark i{display:none}.site-header .btn-katalog{order:1;padding:9px 14px;font-size:13px;gap:5px}.site-header .btn-katalog svg{width:15px;height:15px}.site-header .lang{order:2;gap:3px;font-size:11px}.site-header .lang a{padding:3px 6px}.site-header nav{order:3;flex:1 0 100%;padding:0 0 10px}.site-header nav a{font-size:12.5px;padding:6px 11px}}'
    + '.btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:linear-gradient(180deg,var(--champ2),var(--gold));color:#121a24;font-weight:700;border:0;border-radius:11px;padding:11px 18px;font-size:14px;white-space:nowrap;box-shadow:0 6px 18px -8px rgba(216,184,120,.75);cursor:pointer}'
    + 'a.btn.tg{background:linear-gradient(#4bb8ea,#229ed9);color:#04202e;box-shadow:0 10px 26px rgba(34,158,217,.24);display:inline-flex;align-items:center;justify-content:center;font-weight:700;padding:11px 18px;border-radius:11px;font-size:14px}'
    + '#waFix{display:inline-flex;align-items:center;gap:7px;border-radius:11px;font-weight:700;box-shadow:0 5px 16px rgba(37,211,102,.32);background:var(--wa)!important;color:#fff!important}'
    + '.fix{position:fixed;bottom:14px;left:14px;right:14px;justify-content:center;z-index:50;border-radius:12px;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,.5);background:var(--wa)!important;color:#fff!important}'
    + '@media(min-width:860px){#waFix{display:none!important}}'
    + '.chrome-footer{border-top:1px solid rgba(216,184,120,.18);background:#0d1526;padding:34px 0 26px;margin-top:44px;color:#e9eef6;font-size:16px}'
    + '.chrome-footer .cf-in{width:min(1120px,100%);margin:0 auto;padding:0 18px;display:flex;flex-wrap:wrap;gap:22px;justify-content:space-between}'
    + '.chrome-footer .cf-brand{max-width:34ch}'
    + '.chrome-footer .cf-brand span{font-family:Georgia,serif;font-size:19px;display:block;margin-bottom:10px}'
    + '.chrome-footer .cf-brand span b{color:#e8264a}'
    + '.chrome-footer .cf-brand p{color:#93a0b4;font-size:13.5px;margin:0}'
    + '.chrome-footer .cf-cols{display:flex;flex-wrap:wrap;gap:26px}'
    + '.chrome-footer .cf-cols div{min-width:130px}'
    + '.chrome-footer .cf-cols h4{margin:0 0 8px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#d8b878;font-weight:400}'
    + '.chrome-footer .cf-cols a{display:block;color:#93a0b4;font-size:14px;padding:3px 0}'
    + '.chrome-footer .cf-cols a:hover{color:#f0d9ae}'
    + '.chrome-footer .cf-bottom{width:min(1120px,100%);margin:26px auto 0;padding:16px 18px 0;border-top:1px solid rgba(216,184,120,.18);display:flex;flex-wrap:wrap;gap:10px;justify-content:space-between;color:#93a0b4;font-size:12.5px}';

  var headerHTML = '<header class="site-header"><div class="header-in">'
    + '<a class="brand" href="/" aria-label="RedKıbrıs ana sayfa - Kıbrıs Escort"><svg class="mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 1.8 46.2 24 24 46.2 1.8 24Z" fill="#1e2a40"></path><path d="M24 1.8 46.2 24 24 46.2 1.8 24Z" fill="none" stroke="#f0d9ae" stroke-opacity=".55" stroke-width="1.4"></path><text x="24" y="31" text-anchor="middle" font-family="Georgia,serif" font-size="16.5" font-weight="700"><tspan fill="#ff3b5c">R</tspan><tspan fill="#ffffff">K</tspan></text></svg><span class="wordmark"><b>Red</b>Kıbrıs<i>Kıbrıs Escort</i></span></a>'
    + '<a class="btn-katalog" href="https://wa.me/905515420755" target="_blank" rel="noopener" aria-label="WhatsApp ile katalog iste"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02A9.82 9.82 0 0 0 12.04 2zm5.8 14.09c-.24.68-1.42 1.31-2 1.4-.52.08-1.17.11-1.89-.12-.43-.14-.99-.32-1.7-.62-3-1.22-4.95-4.36-5.1-4.56-.15-.2-1.22-1.61-1.22-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37h.57c.18.01.43-.07.67.51.25.59.85 2.05.92 2.2.07.15.12.32.02.52-.1.2-.15.33-.3.5-.15.17-.32.39-.45.52-.15.15-.3.31-.13.61.17.3.77 1.29 1.67 2.09 1.15 1.02 2.12 1.34 2.42 1.49.3.15.48.13.65-.07.17-.2.74-.87.94-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.08.12.08.72-.17 1.4z"></path></svg>Katalog</a>'
    + '<span class="lang"><a href="/" data-lang="tr">TR</a><a href="/en" data-lang="en">EN</a><a href="/ru" data-lang="ru">RU</a></span>'
    + '<nav aria-label="Ana menü">'
    + '<a href="/">Ana Sayfa</a>'
    + '<a href="/girne-escort">Girne</a><a href="/lefkosa-escort">Lefkoşa</a>'
    + '<a href="/magusa-escort">Mağusa</a><a href="/iskele-escort">İskele</a>'
    + '<a href="/guzelyurt-escort">Güzelyurt</a>'
    + '<a href="/blog">Blog</a>'
    + '<a href="/blog/kibrista-yalniz-gelenler-rehberi">Rehber</a>'
    + '<a href="/fiyatlar">Fiyatlar</a><a href="/iletisim">İletişim</a>'
    + '</nav></div></header>';

  var footerHTML = '<footer class="chrome-footer"><div class="cf-in">'
    + '<div class="cf-brand"><span><b>Red</b>Kıbrıs</span><p>Kıbrıs Escort · Girne merkezli bağımsız escort rehberi. Bölge sayfaları, güncel profil listeleri ve net fiyatlar.</p></div>'
    + '<div class="cf-cols">'
    + '<div><h4>Bölgeler</h4><a href="/girne-escort">Girne Escort</a><a href="/lefkosa-escort">Lefkosa Escort</a><a href="/magusa-escort">Magusa Escort</a><a href="/iskele-escort">Iskele Escort</a><a href="/guzelyurt-escort">Guzelyurt Escort</a></div>'
    + '<div><h4>Site</h4><a href="/">Ana Sayfa</a><a href="/blog">Blog</a><a href="/fiyatlar">Fiyatlar</a><a href="/iletisim">İletişim</a><a href="/gizlilik">Gizlilik</a></div>'
    + '</div></div>'
    + '<div class="cf-bottom"><span>Kıbrıs Escort · Girne Escort · Lefkoşa Escort · Mağusa Escort · İskele Escort · Güzelyurt Escort</span><span>© 2026 · Can</span></div></footer>';

  var fixHTML = '<a class="btn fix" id="waFix" href="https://wa.me/905515420755" target="_blank" rel="noopener">WhatsApp\'tan yaz</a>';

  function mount(id, html){
    var el = document.getElementById(id);
    if(!el) return;
    el.outerHTML = html;
  }

  function boot(){
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    mount('site-header', headerHTML);
    mount('site-footer', footerHTML);
    if(!document.getElementById('waFix') && document.body){
      var d = document.createElement('div');
      d.innerHTML = fixHTML;
      document.body.appendChild(d.firstChild);
    }

    var path = location.pathname.replace(/\/+$/,'') || '/';
    var links = document.querySelectorAll('.site-header nav a');
    for(var i=0;i<links.length;i++){
      var h = links[i].getAttribute('href');
      if(h === path || (h !== '/' && path.indexOf(h) === 0)) links[i].classList.add('on');
    }
    var lang = (path.indexOf('/en')===0) ? 'en' : (path.indexOf('/ru')===0) ? 'ru' : 'tr';
    var la = document.querySelectorAll('.site-header .lang a');
    for(var j=0;j<la.length;j++){ if(la[j].getAttribute('data-lang')===lang) la[j].classList.add('on'); }

    var SB="https://accerzwswgiqhtfgoeqv.supabase.co";
    var KEY="sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG";
    fetch(SB+"/rest/v1/settings?select=key,value",{headers:{apikey:KEY,Authorization:"Bearer "+KEY}})
      .then(function(r){return r.ok?r.json():null;})
      .then(function(s){
        if(!s) return;
        var c={}; s.forEach(function(x){c[x.key]=x.value;});
        if(c.whatsapp){
          var w="https://wa.me/"+c.whatsapp;
          var k=document.querySelectorAll('#waFix,.site-header .btn-katalog');
          for(var a=0;a<k.length;a++) k[a].href=w;
        }
      }).catch(function(){});
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
