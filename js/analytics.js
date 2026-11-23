(function () {
  var ID = "G-KP7MEM460J", KEY = "kvkk_onay";
  if (location.pathname.indexOf("/can") === 0) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }

  var st = document.createElement("style");
  st.textContent = '.kvkk{position:fixed;left:14px;right:14px;bottom:14px;z-index:70;max-width:560px;margin:0 auto;background:#111823;color:#e9eef6;border:1px solid rgba(216,184,120,.28);border-radius:12px;padding:14px 16px;font:14px/1.5 system-ui,sans-serif;box-shadow:0 12px 40px rgba(0,0,0,.55)}'
    + '.kvkk a{color:#f0d9ae}'
    + '.kvkk-b{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}'
    + '.kvkk button{font:600 13px/1 inherit;padding:9px 14px;border-radius:9px;cursor:pointer;border:1px solid rgba(216,184,120,.28)}'
    + '.kvkk-y{background:linear-gradient(180deg,#f3ddb4,#d8b878);color:#141008;border-color:#d8b878}'
    + '.kvkk-n{background:transparent;color:#93a0b4}'
    + '@media(max-width:859px){.kvkk{bottom:76px}}';
  document.head.appendChild(st);

  gtag("consent", "default", {
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    analytics_storage: "denied", wait_for_update: 400
  });

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
  document.head.appendChild(s);
  gtag("js", new Date());
  gtag("config", ID, { anonymize_ip: true });

  document.addEventListener("click", function (e) {
    var a = e.target.closest("a");
    if (!a) return;
    var h = a.getAttribute("href") || "";
    if (h.indexOf("wa.me") > -1) gtag("event", "whatsapp_tiklama", { sayfa: location.pathname });
    else if (h.indexOf("t.me") > -1) gtag("event", "telegram_tiklama", { sayfa: location.pathname });
    else if (h.indexOf("tel:") > -1) gtag("event", "telefon_tiklama", { sayfa: location.pathname });
    else if (h.indexOf("/blog/") > -1) gtag("event", "yazi_tiklama", { hedef: h });
  });

  var derinlik = 0;
  window.addEventListener("scroll", function () {
    var oran = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
    [25, 50, 75, 100].forEach(function (p) {
      if (oran >= p && derinlik < p) { derinlik = p; gtag("event", "kaydirma", { yuzde: p, sayfa: location.pathname }); }
    });
  }, { passive: true });

  function onay() {
    gtag("consent", "update", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" });
  }
  function temizle() {
    var b = document.querySelectorAll(".kvkk");
    for (var i = 0; i < b.length; i++) b[i].remove();
  }

  function bant() {
    var v = localStorage.getItem(KEY);
    if (v === "1") { onay(); temizle(); return; }
    if (v === "0") { temizle(); return; }

    var b = document.querySelectorAll(".kvkk");
    for (var i = 1; i < b.length; i++) b[i].remove();

    if (!b.length) {
      var y = document.createElement("div");
      y.className = "kvkk";
      y.setAttribute("role", "dialog");
      y.setAttribute("aria-label", "Çerez onayı");
      y.innerHTML = 'Ölçüm için çerez kullanıyoruz. <a href="/gizlilik">Detay</a><div class="kvkk-b"><button class="kvkk-y" type="button">Kabul et</button><button class="kvkk-n" type="button">Sadece gerekli</button></div>';
      document.body.appendChild(y);
      b = [y];
    }
    var d = b[0];
    d.querySelector(".kvkk-y").onclick = function () { localStorage.setItem(KEY, "1"); d.remove(); onay(); };
    d.querySelector(".kvkk-n").onclick = function () { localStorage.setItem(KEY, "0"); d.remove(); };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bant);
  else bant();
})();
