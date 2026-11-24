const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';

const KENDI = 'kibrisgirneescort.com';

// sadece bu yollar sayılır: / , /blog..., /en, /ru, sabit sayfalar, *-escort
const YOL = /^(?:\/(?:$|\?)|blog(?:\/|$|\?)|en(?:\/|$)|ru(?:\/|$)|fiyatlar|iletisim|gizlilik|hakkinda|can|panel|[a-z0-9-]+-escort)/;

const BOT = /bot|crawl|spider|slurp|yandex|bing|google|facebookexternal|preview|validator|lighthouse|headless|phantom|curl|wget|python|go-http|axios|scrapy|semrush|ahrefs|mj12|dotbot|petal|bytespider|gptbot|claudebot/i;

function kaynak(r) {
  if (!r) return 'direkt';
  try {
    const h = new URL(r).hostname.replace(/^www\./, '');
    if (h === KENDI) return 'ic';
    if (/google|bing|yandex|duckduckgo|search\.brave|yahoo/.test(h)) return 'arama:' + h;
    if (/instagram|facebook|fb\.|t\.co|twitter|x\.com|tiktok|pinterest|linkedin/.test(h)) return 'sosyal:' + h;
    if (/t\.me|telegram/.test(h)) return 'telegram';
    if (/whatsapp|wa\.me/.test(h)) return 'whatsapp';
    return 'site:' + h;
  } catch (e) { return 'bilinmiyor'; }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};

export default async function middleware(req, ev) {
  if (req.method !== 'GET') return;
  const ua = req.headers.get('user-agent') || '';
  if (!ua || BOT.test(ua)) return;
  if (req.headers.get('sec-purpose') === 'prefetch') return;
  if (req.headers.get('x-middleware-prefetch')) return;

  const u = new URL(req.url);
  if (!YOL.test(u.pathname)) return;

  ev.waitUntil(
    fetch(SB + '/rest/v1/rpc/event_yaz', {
      method: 'POST',
      headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_yol: u.pathname, p_kaynak: kaynak(req.headers.get('referer')), p_tur: 'sayfa', p_etiket: '' })
    }).catch(() => {})
  );
}
