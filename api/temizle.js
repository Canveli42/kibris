const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';

const ARALIK = 60000;   // aynı örnekte en fazla 60 sn'de bir çalışır
const LIMIT = 12;       // IP başına
const PENCERE = 600000; // 10 dk
const kova = new Map();
let son = 0;

function ip(req) {
  return String(req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'x')
    .split(',')[0].trim().slice(0, 60) || 'x';
}

function gecer(req) {
  const k = ip(req), t = Date.now();
  let c = kova.get(k);
  if (!c || t - c.bas >= PENCERE) { c = { adet: 0, bas: t }; kova.set(k, c); }
  if (c.adet >= LIMIT) return false;
  c.adet++;
  return true;
}

function yetkili(req) {
  const s = process.env.CRON_SECRET;
  if (!s) return true;
  const h = String(req.headers.authorization || '');
  const q = String((req.query && req.query.key) || '');
  return h === 'Bearer ' + s || q === s;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');

  if (!yetkili(req)) return res.status(401).json({ ok: false, yetki: true });
  if (!gecer(req)) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ ok: false, hiz: true });
  }
  if (Date.now() - son < ARALIK) return res.status(200).json({ ok: true, atlandi: true });

  son = Date.now();

  const r = await fetch(SB + '/rest/v1/rpc/event_temizle', {
    method: 'POST',
    headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_gun: 30 })
  });
  const d = await r.json().catch(() => null);
  res.status(200).json({ ok: r.ok, silinen: d });
};
