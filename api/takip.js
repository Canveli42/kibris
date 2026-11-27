const { writeEvent } = require('../data/traffic-server.js');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  b = b || {};

  const yol = typeof b.yol === 'string' && /^\/[^?#]*$/.test(b.yol) ? b.yol.slice(0, 200) : '/';
  const etiket = String(b.etiket || '').slice(0, 120);
  if (!etiket) return res.status(204).end();

  const ua = req.headers['user-agent'] || '';
  if (/bot|crawl|spider|slurp|yandex|bing|google|facebookexternal|preview|validator/i.test(ua)) return res.status(204).end();

  await writeEvent(req.headers, { p_yol: yol, p_kaynak: 'tik', p_tur: 'tik', p_etiket: etiket });

  res.status(204).end();
};


