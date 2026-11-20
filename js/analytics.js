(function(){
  var ID="G-KP7MEM460J", KEY="kvkk_onay";
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments)}

  gtag("consent","default",{
    ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",
    analytics_storage:"denied",wait_for_update:400
  });

  var s=document.createElement("script");
  s.async=true;
  s.src="https://www.googletagmanager.com/gtag/js?id="+ID;
  document.head.appendChild(s);
  gtag("js",new Date());
  gtag("config",ID,{anonymize_ip:true});

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

  function onay(){
    gtag("consent","update",{ad_storage:"granted",ad_user_data:"granted",ad_personalization:"granted",analytics_storage:"granted"});
  }

  function bant(){
    var v=localStorage.getItem(KEY);
    if(v==="1"){onay();return}
    if(v==="0")return;
    var d=document.createElement("div");
    d.className="kvkk";
    d.innerHTML='Ölçüm için çerez kullanıyoruz. <a href="/gizlilik">Detay</a><div class="kvkk-b"><button class="kvkk-y">Kabul et</button><button class="kvkk-n">Sadece gerekli</button></div>';
    document.body.appendChild(d);
    d.querySelector(".kvkk-y").onclick=function(){localStorage.setItem(KEY,"1");d.remove();onay()};
    d.querySelector(".kvkk-n").onclick=function(){localStorage.setItem(KEY,"0");d.remove()};
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bant);
  else bant();
})();
