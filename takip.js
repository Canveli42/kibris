(function () {
  "use strict";
  if (window.__t) return; window.__t = 1;

  var yol = location.pathname;
  if (/^\/(can|panel)(\/|$)/.test(yol)) return;

  var son = 0;

  function etiket(a) {
    var t = (a.getAttribute("data-takip") || a.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60);
    var h = a.getAttribute("href") || "";
    if (h.indexOf("wa.me") > -1 || h.indexOf("whatsapp") > -1) return "whatsapp: " + t;
    if (h.indexOf("t.me") > -1) return "telegram: " + t;
    if (h.indexOf("tel:") > -1) return "telefon: " + t;
    if (/^\/(blog|girne|lefkosa|magusa|iskele|guzelyurt)/.test(h)) return "iç link: " + h;
    return t || h.slice(0, 60) || "bilinmeyen";
  }

  function gonder(veri) {
    var s = JSON.stringify(veri);
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/takip", new Blob([s], { type: "application/json" }));
    } else {
      fetch("/api/takip", { method: "POST", headers: { "Content-Type": "application/json" }, body: s, keepalive: true });
    }
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest("a,button");
    if (!a) return;
    var now = Date.now();
    if (now - son < 400) return;
    son = now;
    gonder({ yol: location.pathname, etiket: etiket(a) });
  }, true);

  var gecti = {}, zaman = 0;
  window.addEventListener("scroll", function () {
    var now = Date.now();
    if (now - zaman < 250) return;
    zaman = now;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (h < 200) return;
    var oran = Math.min(100, Math.round((window.scrollY / h) * 100));
    [25, 50, 75, 100].forEach(function (p) {
      if (oran >= p && !gecti[p]) {
        gecti[p] = 1;
        gonder({ yol: location.pathname, etiket: "kaydirma: " + p });
      }
    });
  }, { passive: true });
})();
