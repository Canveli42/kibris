/* metin katmanı — boşta çalışır. Ölçüm: middleware (görüntüleme) + takip.js (tıklama), çerezsiz. */
(function () {
  function calis() {
    var SB = "https://accerzwswgiqhtfgoeqv.supabase.co";
    var K = "sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG";
    var yol = location.pathname;
    fetch(SB + "/rest/v1/settings?select=key,value&key=like.t:" + yol + ":*", {
      headers: { apikey: K, Authorization: "Bearer " + K }
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (s) {
        if (!s || !s.length) return;
        var c = {};
        s.forEach(function (x) {
          try { var d = JSON.parse(x.value); if (d && d.e && d.y != null) c[d.e.trim()] = d.y; } catch (e) {}
        });
        if (c[document.title.trim()] != null) document.title = c[document.title.trim()];
        var y = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
          acceptNode: function (n) {
            var p = n.parentNode;
            if (!p) return 2;
            var t = p.nodeName;
            if (t === "SCRIPT" || t === "STYLE" || t === "NOSCRIPT") return 2;
            return n.nodeValue.trim().length > 1 ? 1 : 2;
          }
        });
        var d = [];
        while (y.nextNode()) d.push(y.currentNode);
        d.forEach(function (n) {
          var v = n.nodeValue, k = v.trim();
          if (c[k] != null) {
            var a = v.match(/^\s*/)[0], b = v.match(/\s*$/)[0];
            n.nodeValue = a + c[k] + b;
          }
        });
      })
      .catch(function () {});
  }
  if ("requestIdleCallback" in window) requestIdleCallback(calis, { timeout: 2500 });
  else setTimeout(calis, 1500);
})();
