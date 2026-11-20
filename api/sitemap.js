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

function temiz(s){
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

module.exports = async (req,res)=>{
  let xml="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";

  try{
    for(let i=0;i<SABIT.length;i++){
      xml+="<url><loc>"+BASE+SABIT[i][0]+"</loc><priority>"+SABIT[i][1]+"</priority></url>\n";
    }

    try{
      const r=await fetch(SB+"/rest/v1/posts?select=slug,updated_at,created_at&published=eq.true&order=created_at.desc",{headers:{apikey:KEY,Authorization:"Bearer "+KEY}});
      const yazilar=await r.json();
      if(Array.isArray(yazilar)){
        for(let i=0;i<yazilar.length;i++){
          const y=yazilar[i];
          const t=String(y.updated_at||y.created_at||"").slice(0,10);
          xml+="<url><loc>"+BASE+"/blog/"+temiz(y.slug)+"</loc>"+(t?"<lastmod>"+t+"</lastmod>":"")+"<priority>0.7</priority></url>\n";
        }
      }
    }catch(e){}

    xml+="</urlset>";
  }catch(e){
    xml="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"><url><loc>"+BASE+"/</loc></url></urlset>";
  }

  res.statusCode=200;
  res.setHeader("Content-Type","application/xml; charset=utf-8");
  res.setHeader("Cache-Control","public, s-maxage=3600, stale-while-revalidate=86400");
  res.end(xml);
};
