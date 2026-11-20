(function(){
  var ID="G-KP7MEM460J";
  var KEY="kvkk_onay";

  function yukle(){
    var s=document.createElement("script");
    s.async=true;
    s.src="https://www.googletagmanager.com/gtag/js?id="+ID;
    document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){dataLayer.push(arguments)};
    gtag("js",new Date());
    gtag("config",ID,{anonymize_ip:true});
    olaylar();
  }

  function olaylar(){
    document.addEventListener("click",function(e){
      var a=e.target.closest("a");if(!a)return;
      var h=a.href||"";
      if(h.indexOf("wa.me")>-1)gtag("event","whatsapp_tiklama",{sayfa:location.pathname});
      else if(h.indexOf("t.me")>-1)gtag("event","telegram_tiklama",{sayfa:location.pathname});
      else if(h.indexOf("tel:")>-1)gtag("event","telefon_tiklama",{sayfa:location.pathname});
      else if(h.indexOf("/blog/")>-1)gtag("event","yazi_tiklama",{hedef:h});
    });
    var derinlik=0;
    window.addEventListener("scroll",function(){
      var oran=Math.round((window.scrollY+window.innerHeight)/document.body.scrollHeight*100);
      [25,50,75,100].forEach(function(p){
        if(oran>=p&&derinlik<p){derinlik=p;gtag("event","kaydirma",{yuzde:p,sayfa:location.pathname})}
      });
    },{passive:true});
  }

  function bant(){
    if(localStorage.getItem(KEY)){if(localStorage.getItem(KEY)==="1")yukle();return}
    var d=document.createElement("div");
    d.style.cssText="position:fixed;left:12px;right:12px;bottom:76px;z-index:99;background:#131319;border:1px solid #26262f;border-radius:12px;padding:12px 14px;font-size:13px;color:#c9c9d1;box-shadow:0 8px 24px #0008;max-width:520px;margin:0 auto";
    d.innerHTML='Ölçüm için çerez kullanıyoruz. <a href="/gizlilik" style="color:#c9a227">Detay</a><div style="display:flex;gap:8px;margin-top:8px"><button id="kv1" style="flex:1;background:#c9a227;color:#14140f;border:0;border-radius:8px;padding:8px;font-weight:600">Kabul et</button><button id="kv0" style="flex:1;background:none;border:1px solid #26262f;color:#c9c9d1;border-radius:8px;padding:8px">Sadece gerekli</button></div>';
    document.body.appendChild(d);
    d.querySelector("#kv1").onclick=function(){localStorage.setItem(KEY,"1");d.remove();yukle()};
    d.querySelector("#kv0").onclick=function(){localStorage.setItem(KEY,"0");d.remove()};
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bant);
  else bant();
})();
