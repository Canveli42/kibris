// Ölçüm kayıtlarının otomatik temizliği Supabase Cron üzerinden yapılır.
module.exports = function handler(_req, res) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(410).json({ ok: false, error: 'Cleanup moved to database scheduler.' });
};
