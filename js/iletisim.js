(function () {
  'use strict';

  var WA = 'https://wa.me/905515420755';
  var TG = 'https://t.me/kibrisescortvip';

  function hazir() {
    document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(function (a) {
      if (a.dataset.bag) return;
      a.dataset.bag = '1';
      if (!a.getAttribute('href') || a.getAttribute('href') === '#') a.setAttribute('href', WA);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });

    document.querySelectorAll('a[href*="t.me"], a[href*="telegram"]').forEach(function (a) {
      if (a.dataset.bag) return;
      a.dataset.bag = '1';
      if (!a.getAttribute('href') || a.getAttribute('href') === '#') a.setAttribute('href', TG);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
  }

  function baslat() {
    hazir();
    new MutationObserver(hazir).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', baslat);
  } else {
    baslat();
  }
})();
