(function () {
  "use strict";
  var yuk = false;
  function bas() {
    if (yuk) return;
    yuk = true;
    var a = document.createElement("script");
    a.src = "/js/analytics.js?v=2";
    a.defer = true;
    document.head.appendChild(a);
  }
  ["scroll", "mousemove", "touchstart", "keydown", "click", "pointerdown"].forEach(function (e) {
    window.addEventListener(e, bas, { once: true, passive: true });
  });
  window.addEventListener("load", function () { setTimeout(bas, 1000); });
  setTimeout(bas, 3500);
})();
