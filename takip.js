(function () {
  "use strict";
  if (window.__t) return; window.__t = 1;
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
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a,button");
    if (!a) return;
    var now = Date.now();
    if (now - son < 400) return;
    son = now;
    var veri = JSON.stringify({ yol: location.pathname + location.search, etiket: etiket(a) });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/takip", new Blob([veri], { type: "application/json" }));
    } else {
      fetch("/api/takip", { method: "POST", headers: { "Content-Type": "application/json" }, body: veri, keepalive: true });
    }
  }, true);
})();
