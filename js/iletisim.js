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
      if (!a.getAttribute('href') || a.getAttribute('href') === '#') a.setAttribute('href', WA);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });

    tg.forEach(function (a) {
      if (a.dataset.bag) return;
      a.dataset.bag = '1';
      if (!a.getAttribute('href') || a.getAttribute('href') === '#') a.setAttribute('href', TG);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
  }

  function baslat() {
    hazir();
    // chrome.js header/footer'ı sonradan bastığı için değişimi yakala
    var gozlemci = new MutationObserver(function () { hazir(); });
    gozlemci.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', baslat);
  } else {
    baslat();
  }
})();
