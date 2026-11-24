const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';

function kaynak(r) {
  if (!r) return 'direkt';
  try {
    const h = new URL(r).hostname.replace(/^www\./, '');
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
  const ua = req.headers.get('user-agent') || '';
  if (/bot|crawl|spider|slurp|yandex|bing|google|facebookexternal|preview|validator|lighthouse/i.test(ua)) return;

  const u = new URL(req.url);
  const yol = u.pathname + (u.search || '');
  const kay = kaynak(req.headers.get('referer'));

  ev.waitUntil(
    fetch(SB + '/rest/v1/rpc/event_yaz', {
      method: 'POST',
      headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_yol: yol, p_kaynak: kay, p_tur: 'sayfa', p_etiket: '' })
    }).catch(() => {})
  );
}
