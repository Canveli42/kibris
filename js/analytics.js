/* statik gtag etiketleri varsa temizle: tek yükleme bu dosyadan */
(function () {
var l = document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]');
for (var i = 0; i < l.length; i++) l[i].parentNode.removeChild(l[i]);
})();

(function () {
var ID = "G-KP7MEM460J", KEY = "kvkk_onay";
var P = location.pathname;
if (P.indexOf("/can") === 0) return;

var DIL = /^\/ru(\/|$)/.test(P) ? "ru" : /^\/en(\/|$)/.test(P) ? "en" : "tr";
var METIN = {
  tr: { t: "Ölçüm için çerez kullanıyoruz.", l: "Detay", y: "Kabul et", n: "Sadece gerekli", a: "Çerez onayı", h: "/gizlilik" },
  en: { t: "We use cookies for measurement.", l: "Details", y: "Accept", n: "Essential only", a: "Cookie consent", h: "/en/gizlilik" },
  ru: { t: "Мы используем cookies для измерения.", l: "Подробнее", y: "Принять", n: "Только необходимое", a: "Согласие на cookies", h: "/ru/gizlilik" }
};
var M = METIN[DIL] || METIN.tr;

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

var st = document.createElement("style");
st.textContent = '.kvkk{position:fixed;left:14px;right:14px;bottom:14px;z-index:70;max-width:560px;margin:0 auto;background:#111823;color:#e9eef6;border:1px solid rgba(216,184,120,.28);border-radius:12px;padding:14px 16px;font:14px/1.5 system-ui,sans-serif;box-shadow:0 12px 40px rgba(0,0,0,.55)}'
+ '.kvkk a{color:#f0d9ae}'
+ '.kvkk-b{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}'
+ '.kvkk button{font:600 13px/1 inherit;padding:9px 14px;border-radius:9px;cursor:pointer;border:1px solid rgba(216,184,120,.28)}'
+ '.kvkk-y{background:linear-gradient(180deg,#f3ddb4,#d8b878);color:#141008;border-color:#d8b878}'
+ '.kvkk-n{background:transparent;color:#93a0b4}';
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
if (h.indexOf("wa.me") > -1) gtag("event", "whatsapp_tiklama", { sayfa: P });
else if (h.indexOf("t.me") > -1) gtag("event", "telegram_tiklama", { sayfa: P });
else if (h.indexOf("tel:") > -1) gtag("event", "telefon_tiklama", { sayfa: P });
else if (h.indexOf("/blog/") > -1) gtag("event", "yazi_tiklama", { hedef: h });
});

var derinlik = 0;
window.addEventListener("scroll", function () {
var oran = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
[25, 50, 75, 100].forEach(function (p) {
if (oran >= p && derinlik < p) { derinlik = p; gtag("event", "kaydirma", { yuzde: p, sayfa: P }); }
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
  y.setAttribute("aria-label", M.a);
  y.innerHTML = M.t + ' <a href="https://www.kibrisgirneescort.com' + M.h + '">' + M.l + '</a>'
    + '<div class="kvkk-b"><button class="kvkk-y" type="button">' + M.y + '</button>'
    + '<button class="kvkk-n" type="button">' + M.n + '</button></div>';
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

/* metin katmanı */
(function () {
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
})();
