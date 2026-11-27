const { timingSafeEqual } = require('node:crypto');
const BASE = 'https://www.kibrisgirneescort.com';
const ANAHTAR = 'kibrisgirneescort2026indexnow';
const MOTORLAR = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow'
];
const EN_FAZLA = 600;

function yetkili(req, sir) {
  const auth = String((req.headers || {}).authorization || '');
  const prefix = 'Bearer ';
  if (!auth.startsWith(prefix)) return false;
  const a = Buffer.from(auth.slice(prefix.length));
  const b = Buffer.from(sir);
  return a.length === b.length && timingSafeEqual(a, b);
}

function guvenliAdres(value) {
  try {
    const url = new URL(String(value));
    return url.origin === BASE && !url.username && !url.password && !url.hash;
  } catch { return false; }
}

const YEDEK = [
  BASE + '/', BASE + '/blog', BASE + '/fiyatlar', BASE + '/iletisim', BASE + '/hakkinda',
  BASE + '/girne-escort', BASE + '/lefkosa-escort', BASE + '/magusa-escort',
  BASE + '/iskele-escort', BASE + '/guzelyurt-escort'
];

function zaman(as) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), as || 8000);
  return { sinyal: c.signal, bitir: () => clearTimeout(t) };
}

async function tekMotor(m, govde) {
  const z = zaman(8000);
  try {
    const r = await fetch(m, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: govde,
      signal: z.sinyal
    });
    return { motor: m, kod: r.status };
  } catch (e) {
    return { motor: m, kod: 0, hata: String((e && e.message) || e).slice(0, 80) };
  } finally {
    z.bitir();
  }
}

async function adresler() {
  const z = zaman(8000);
  try {
    const r = await fetch(BASE + '/sitemap.xml', {
      signal: z.sinyal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)' }
    });
    if (!r.ok) return YEDEK;
    const xml = await r.text();
    const m = xml.match(/<loc>[^<]+<\/loc>/g) || [];
    const l = m.map(x => x.replace(/<\/?loc>/g, '').trim()).filter(guvenliAdres);
    return l.length ? l : YEDEK;
  } catch (e) {
    return YEDEK;
  } finally {
    z.bitir();
  }
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  try {
    const sir = process.env.INDEXNOW_ADMIN_SECRET;
    if (!sir || sir.length < 32) {
      res.status(503).send(JSON.stringify({ ok: false, hata: 'Bildirim sistemi yapılandırılmamış' }));
      return;
    }
    if (!yetkili(req, sir)) {
      res.status(401).send(JSON.stringify({ ok: false, hata: 'Yetkisiz istek' }));
      return;
    }
    const q = req.query || {};
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      res.status(405).send(JSON.stringify({ ok: false, hata: 'POST gerekli' }));
      return;
    }

    const govdeYap = liste => JSON.stringify({
      host: 'www.kibrisgirneescort.com',
      key: ANAHTAR,
      keyLocation: BASE + '/' + ANAHTAR + '.txt',
      urlList: liste
    });

    if (q.url) {
      const u = String(q.url);
      if (!guvenliAdres(u)) {
        res.status(400).send(JSON.stringify({ ok: false, hata: 'url disarida' }));
        return;
      }
      if (q.test) {
        res.status(200).send(JSON.stringify({ ok: true, test: true, gonderilecek: 1 }));
        return;
      }
      const sonuc = await Promise.all(MOTORLAR.map(m => tekMotor(m, govdeYap([u]))));
      res.status(200).send(JSON.stringify({ ok: true, adet: 1, sonuc }));
      return;
    }

    const hepsi = await adresler();
    const bas = Math.max(0, parseInt(String(q.offset || '0'), 10) || 0);
    const liste = hepsi.slice(bas, bas + EN_FAZLA);

    if (q.test) {
      res.status(200).send(JSON.stringify({ ok: true, test: true, bulunan: hepsi.length, bas, gonderilecek: liste.length }));
      return;
    }

    if (!liste.length) {
      res.status(200).send(JSON.stringify({ ok: true, adet: 0, toplam: hepsi.length, not: 'bu offsette adres yok' }));
      return;
    }

    const sonuc = await Promise.all(MOTORLAR.map(m => tekMotor(m, govdeYap(liste))));
    res.status(200).send(JSON.stringify({ ok: true, adet: liste.length, bas, toplam: hepsi.length, sonuc }));
  } catch (e) {
    res.status(500).send(JSON.stringify({ ok: false, hata: 'Bildirim işlemi başarısız' }));
  }
};
