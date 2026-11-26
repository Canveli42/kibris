const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';

const LIMIT = 30;          // IP başına
const PENCERE = 60000;     // 60 sn
const TAVAN = 5000;        // bellek koruması
const kova = new Map();

function ip(req) {
  return String(req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'x')
    .split(',')[0].trim().slice(0, 60) || 'x';
}

function gecer(req) {
  const k = ip(req), t = Date.now();
  let c = kova.get(k);
  if (!c || t - c.bas >= PENCERE) {
    c = { adet: 0, bas: t };
    kova.set(k, c);
    if (kova.size > TAVAN) {
      for (const [a, v] of kova) if (t - v.bas >= PENCERE) kova.delete(a);
      if (kova.size > TAVAN) kova.clear();
    }
  }
  if (c.adet >= LIMIT) return false;
  c.adet++;
  return true;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  if (!gecer(req)) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ ok: false, hiz: true });
  }

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  b = b || {};

  const yol = String(b.yol || req.headers.referer || '/').slice(0, 200);
  const etiket = String(b.etiket || '').slice(0, 120);
  if (!etiket) return res.status(204).end();

  const ua = req.headers['user-agent'] || '';
  if (/bot|crawl|spider|slurp|yandex|bing|google|facebookexternal|preview|validator/i.test(ua)) return res.status(204).end();

  await fetch(SB + '/rest/v1/rpc/event_yaz', {
    method: 'POST',
    headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_yol: yol, p_kaynak: 'tik', p_tur: 'tik', p_etiket: etiket })
  }).catch(() => {});

  res.status(204).end();
};
