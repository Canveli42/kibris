const https=require("https");
const SB="https://accerzwswgiqhtfgoeqv.supabase.co";
const KEY="sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG";
const BASE="https://kibrisgirneescort.com";

const SABIT=[
["/","1"],["/girne-escort","0.9"],["/otele-escort","0.9"],["/eve-gelen-escort","0.8"],
["/lefkosa-escort","0.8"],["/magusa-escort","0.8"],["/fiyatlar","0.8"],
["/gecelik-escort","0.7"],["/vip-escort","0.7"],["/ogrenci-escort","0.7"],
["/turk-escort","0.7"],["/rus-escort","0.7"],["/iskele-escort","0.7"],
["/lapta-escort","0.7"],["/alsancak-escort","0.7"],["/karaoglanoglu-escort","0.7"],
["/catalkoy-escort","0.6"],["/esentepe-escort","0.6"],["/long-beach-escort","0.6"],
["/bafra-escort","0.6"],["/gonyeli-escort","0.6"],["/bellapais-escort","0.6"],
["/guzelyurt-escort","0.6"],["/iletisim","0.6"],["/blog","0.7"],["/gizlilik","0.3"]
];

const YAZILAR=[
"kibris-escort-fiyatlari-nasil-isliyor","havalimani-transfer","kibris-gece-hayati","kibris-otelleri",
"girne-escort-nasil-cagrilir","otele-escort-cagirma-rehberi","kibris-escort-fiyatlari-2026",
"girne-gece-kulupleri-rehberi","lapta-escort-rehberi","alsancak-escort-rehberi",
"kibris-escort-ilk-gorusme","otel-odasinda-gorusme-kurallari","kibris-escort-dolandiricilik",
"kibris-escort-ulasim-ve-taksi","kibris-escort-otel-secimi","girne-merkez-escort-rehberi",
"magusa-escort-maras-long-beach","iskele-escort-bogaz-bafra","gonyeli-escort-site-apart",
"bafra-escort-resort","kibris-escort-gecelik-program","kibris-escort-vip-davet",
"kibris-escort-turk-rus-farki","kibris-escort-yaz-sezonu","kibris-escort-lobi-mi-oda-mi",
"kibris-escort-sabah-gorusmesi","kibris-escort-4-saat-program","kibris-escort-2-saat-program",
"kibris-escort-30-dakika","kibris-escort-para-birimi","kibris-escort-kart-odeme",
"kibris-escort-iban-odeme","kibris-escort-usdt-odeme","kibris-escort-kimlik-istiyor-mu"
];

function temiz(s){
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function cek(url){
  return new Promise(function(ok){
    https.get(url,function(r){
      let d="";
      r.on("data",function(c){d+=c});
      r.on("end",function(){ok(d)});
    }).on("error",function(){ok("")});
  });
}

module.exports = async (req,res)=>{
  let son={};
  try{
    const ham=await cek(SB+"/rest/v1/posts?select=slug,updated_at&apikey="+KEY);
    const dizi=JSON.parse(ham);
    for(let i=0;i<dizi.length;i++){
      if(dizi[i].slug)son[dizi[i].slug]=String(dizi[i].updated_at||"").slice(0,10);
    }
  }catch(e){}

  let xml="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";

  for(let i=0;i<SABIT.length;i++){
    xml+="<url><loc>"+BASE+SABIT[i][0]+"</loc><priority>"+SABIT[i][1]+"</priority></url>\n";
  }

  for(let i=0;i<YAZILAR.length;i++){
    const s=YAZILAR[i];
    const t=son[s];
    xml+="<url><loc>"+BASE+"/blog/"+temiz(s)+"</loc>"+(t?"<lastmod>"+t+"</lastmod>":"")+"<priority>0.7</priority></url>\n";
  }

  xml+="</urlset>";

  res.statusCode=200;
  res.setHeader("Content-Type","application/xml; charset=utf-8");
  res.setHeader("Cache-Control","public, s-maxage=3600, stale-while-revalidate=86400");
  res.end(xml);
};
