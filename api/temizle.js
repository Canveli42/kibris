const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';

export default async function handler(req, res) {
  const r = await fetch(SB + '/rest/v1/rpc/event_temizle', {
    method: 'POST',
    headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_gun: 30 })
  });
  const d = await r.json().catch(() => null);
  res.status(200).json({ ok: r.ok, silinen: d });
}
