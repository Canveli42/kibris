(function(){
  "use strict";

  // ---- Ortak üst bilgi ----
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

  // ---- Ortak alt bilgi ----
  var footerHTML = '<footer class="chrome-footer"><div class="cf-in">'
    + '<div class="cf-brand"><span><b>Red</b>Kıbrıs</span><p>Kıbrıs Escort · Girne merkezli bağımsız escort rehberi. Bölge sayfaları, güncel profil listeleri ve net fiyatlar.</p></div>'
    + '<div class="cf-cols">'
    + '<div><h4>Bölgeler</h4><a href="/girne-escort">Girne Escort</a><a href="/lefkosa-escort">Lefkosa Escort</a><a href="/magusa-escort">Magusa Escort</a><a href="/iskele-escort">Iskele Escort</a><a href="/guzelyurt-escort">Guzelyurt Escort</a></div>'
    + '<div><h4>Site</h4><a href="/">Ana Sayfa</a><a href="/blog">Blog</a><a href="/fiyatlar">Fiyatlar</a><a href="/iletisim">İletişim</a><a href="/gizlilik">Gizlilik</a></div>'
    + '</div></div>'
    + '<div class="cf-bottom"><span>Kıbrıs Escort · Girne Escort · Lefkoşa Escort · Mağusa Escort · İskele Escort · Güzelyurt Escort</span><span>© 2026 · Can</span></div></footer>';

  // ---- Mobil sabit çubuk ----
  var fixHTML = '<a class="btn fix" id="waFix" href="https://wa.me/905515420755" target="_blank" rel="noopener">WhatsApp\'tan yaz</a>';

  function mount(id, html, where){
    var el = document.getElementById(id);
    if(!el) return;
    el.outerHTML = html;
  }

  function boot(){
    mount('site-header', headerHTML);
    mount('site-footer', footerHTML);
    // mobil sabit çubuğu body sonuna ekle
    if(!document.getElementById('waFix')){
      var d = document.createElement('div');
      d.innerHTML = fixHTML;
      document.body.appendChild(d.firstChild);
    }
    // aktif menü vurgusu
    var path = location.pathname.replace(/\/+$/,'') || '/';
    var links = document.querySelectorAll('.site-header nav a');
    for(var i=0;i<links.length;i++){
      var h = links[i].getAttribute('href');
      if(h === path || (h !== '/' && path.indexOf(h) === 0)) links[i].classList.add('on');
    }
    // dil vurgusu
    var lang = (path.indexOf('/en')===0) ? 'en' : (path.indexOf('/ru')===0) ? 'ru' : 'tr';
    var la = document.querySelectorAll('.site-header .lang a');
    for(var j=0;j<la.length;j++){ if(la[j].getAttribute('data-lang')===lang) la[j].classList.add('on'); }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
