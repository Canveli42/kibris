const SB="https://accerzwswgiqhtfgoeqv.supabase.co";
const KEY="sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG";
const db=supabase.createClient(SB,KEY);
const slug=(location.pathname.match(/^\/m\/([^\/]+)/)||[])[1]||new URLSearchParams(location.search).get("m")||"";
let WA="";
const waT=n=>"https://wa.me/"+WA+"?text="+encodeURIComponent("Merhaba, "+(n||"")+" müsait mi?");

(async()=>{
  const {data:s}=await db.from("settings").select("key,value");
  const c={};(s||[]).forEach(r=>c[r.key]=r.value);
  WA=c.whatsapp||"";
  if(c.brand)document.getElementById("brand").textContent=c.brand;

  const {data:m}=await db.from("models")
    .select("*,regions(slug,name),model_photos(url,sort)")
    .eq("slug",slug).eq("is_active",true).single();
  if(!m){document.getElementById("h1").textContent="Model bulunamadı";return}

  const nm=m.name, rn=m.regions?.name||"Kıbrıs";
  ["waTop","waMain","waFix","waFoot"].forEach(i=>{const e=document.getElementById(i);if(e)e.href=waT(nm)});
  if(c.telegram){const t="https://t.me/"+c.telegram;document.getElementById("tgFoot").href=t;document.getElementById("tgMain").href=t}

  document.title=nm+" – "+rn+" Escort | Kıbrıs Escort";
  document.getElementById("crReg").textContent=rn;
  if(m.regions?.slug)document.getElementById("crReg").href="/"+m.regions.slug;
  document.getElementById("crName").textContent=nm;
  document.getElementById("h1").innerHTML=nm+(m.vip?' <span class="vip" style="position:static;display:inline-block">VIP</span>':"");
  document.getElementById("about").textContent=m.about||"";

  const sp=[["Yaş",m.age],["Boy",m.height?m.height+" cm":""],["Kilo",m.weight?m.weight+" kg":""],["Saç",m.hair],["Göz",m.eyes],["Ten",m.skin]];
  document.getElementById("specs").innerHTML=sp.filter(x=>x[1]).map(([k,v])=>`<div><b>${k}</b>${v}</div>`).join("");

  const ph=(m.model_photos||[]).sort((a,b)=>a.sort-b.sort);
  document.getElementById("gal").innerHTML=ph
    .map((p,i)=>`<img src="${p.url}" alt="${nm} ${rn} escort fotoğraf ${i+1}" loading="${i?"lazy":"eager"}">`).join("");

  const url="https://kibrisgirneescort.com/m/"+slug;
  const cl=document.querySelector('link[rel="canonical"]');if(cl)cl.href=url;
  const md=(a,k,v)=>{const e=document.createElement("meta");e.setAttribute(a,k);e.setAttribute("content",v);document.head.appendChild(e)};
  md("property","og:url",url);md("property","og:type","profile");md("property","og:title",document.title);
  if(ph[0])md("property","og:image",ph[0].url);
  md("name","description",(m.about||nm+" "+rn+" escort").slice(0,158));

  const p1=document.createElement("script");p1.type="application/ld+json";
  p1.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Person",name:nm,image:ph.map(x=>x.url),jobTitle:"Escort",url:url,address:{"@type":"PostalAddress",addressLocality:rn,addressCountry:"CY"}});
  document.head.appendChild(p1);

  const p2=document.createElement("script");p2.type="application/ld+json";
  p2.textContent=JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[
    {"@type":"ListItem",position:1,name:"Ana sayfa",item:"https://kibrisgirneescort.com/"},
    {"@type":"ListItem",position:2,name:rn,item:"https://kibrisgirneescort.com/"+(m.regions?.slug||"")},
    {"@type":"ListItem",position:3,name:nm,item:url}]});
  document.head.appendChild(p2);

  const {data:sim}=await db.from("models").select("slug,name,age,model_photos(url,sort)")
    .eq("is_active",true).eq("region_id",m.region_id).neq("slug",slug).limit(6);
  document.getElementById("sim").innerHTML=(sim||[]).map(x=>{
    const p=(x.model_photos||[])[0];
    return `<a class="card" href="/m/${x.slug}"><div class="ph">${p?`<img src="${p.url}" alt="${x.name}" loading="lazy">`:""}</div>
      <div class="meta"><div class="nm">${x.name}</div><div class="sp">${x.age?x.age+" yaş":""}</div></div></a>`;
  }).join("");
})();
