import traffic from './data/traffic-server.js';

const KENDI = 'kibrisgirneescort.com';

// yalnızca ölçülecek yollar — baştaki / tek yerde
const YOL = /^\/(?:$|blog(?:\/|$)|en(?:\/|$)|ru(?:\/|$)|fiyatlar|iletisim|gizlilik|hakkinda|can|panel|modeller(?:\/|$)|[a-z0-9-]+-escort)/;

const BOT = /bot|crawl|spider|slurp|yandex|bingbot|googlebot|facebookexternalhit|preview|validator|lighthouse|headless|phantom|scrapy|semrush|ahrefs|mj12|dotbot|petal|bytespider|gptbot|claudebot/i;

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
  matcher: ['/((?!api|_next|js|css|data|favicon|apple-touch|takip|robots|sitemap).*)']
};

export default async function middleware(req, ev) {
  if (req.method !== 'GET') return;

  const u = new URL(req.url);

  if (/^\/https?:\/\//i.test(u.pathname)) {
    return Response.redirect(new URL('/', u), 307);
  }

  if (req.headers.get('sec-purpose') === 'prefetch') return;
  if (req.headers.get('x-middleware-prefetch')) return;
  if (req.headers.get('purpose') === 'prefetch') return;

  const ua = req.headers.get('user-agent') || '';
  if (!ua || BOT.test(ua)) return;
  if (!YOL.test(u.pathname)) return;

  ev.waitUntil(
    traffic.writeEvent(req.headers, { p_yol: u.pathname, p_kaynak: kaynak(req.headers.get('referer')), p_tur: 'sayfa', p_etiket: '' })
  );
}

