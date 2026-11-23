(function () {
  'use strict';

  var WA = 'https://wa.me/905515420755';
  var TG = 'https://t.me/kibrisescortvip';

  function hazir() {
    var wa = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
    var tg = document.querySelectorAll('a[href*="t.me"], a[href*="telegram"]');

    wa.forEach(function (a) {
      if (a.dataset.bag) return;
      a.dataset.bag = '1';
      a.setAttribute('href', WA);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });

    tg.forEach(function (a) {
      if (a.dataset.bag) return;
      a.dataset.bag = '1';
      a.setAttribute('href', TG);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });

    var dil = document.querySelectorAll('.site-header .lang a');
    dil.forEach(function (a) {
      var kod = a.getAttribute('data-lang');
      if (!kod) return;
      var yol = location.pathname.replace(/\/+$/, '') || '/';
      var aktif = kod === 'tr'
        ? (yol === '/' || !/^\/(en|ru)(\/|$)/.test(yol))
        : yol === '/' + kod || yol.indexOf('/' + kod + '/') === 0;
      if (aktif) a.classList.add('on');
      else a.classList.remove('on');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hazir);
  } else {
    hazir();
  }

  var gozlemci = new MutationObserver(function () { hazir(); });
  gozlemci.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="tel:"], a[href^="mailto:"]');
    if (!a) return;
  });
})();
