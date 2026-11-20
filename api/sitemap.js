const SB = "https://accerzwswgiqhtfgoeqv.supabase.co";
const KEY = "sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG";
const BASE = "https://kibrisgirneescort.com";

const PAGES = [
  ["", 1.0], ["girne-escort", 0.9], ["otele-escort", 0.9], ["eve-gelen-escort", 0.8],
  ["lefkosa-escort", 0.8], ["magusa-escort", 0.8], ["fiyatlar", 0.8],
  ["gecelik-escort", 0.7], ["vip-escort", 0.7], ["ogrenci-escort", 0.7],
  ["turk-escort", 0.7], ["rus-escort", 0.7], ["iskele-escort", 0.7],
  ["lapta-escort", 0.7], ["alsancak-escort", 0.7], ["karaoglanoglu-escort", 0.7],
  ["catalkoy-escort", 0.6], ["esentepe-escort", 0.6], ["long-beach-escort", 0.6],
  ["bafra-escort", 0.6], ["gonyeli-escort", 0.6], ["bellapais-escort", 0.6],
  ["guzelyurt-escort", 0.6], ["iletisim", 0.6], ["blog", 0.7], ["gizlilik", 0.3]
];

const get = async (path) => {
  try {
    const r = await fetch(SB + path + "&apikey=" + KEY);
    return r.ok ? await r.json() : [];
  } catch (e) { return []; }
};

export default async function handler(req, res) {
  const [posts, models] = await Promise.all([
    get("/rest/v1/posts?select=slug,created_at&published=eq.true&order=created_at.desc"),
    get("/rest/v1/models?select=slug&is_active=eq.true&order=sort")
  ]);

  const url = (loc, pri, lastmod) =>
    `<url><loc>${BASE}/${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}<priority>${pri}</priority></url>`;

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    PAGES.map(([p, pr]) => url(p, pr)).join("\n") + "\n" +
    posts.map(p => url("blog/" + p.slug, 0.7, (p.created_at || "").slice(0, 10))).join("\n") + "\n" +
    models.map(m => url("m/" + m.slug, 0.6)).join("\n") +
    "\n</urlset>";

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=86400");
  res.status(200).send(body);
}
