const BASE = 'https://www.kibrisgirneescort.com';
const ANAHTAR = 'kibrisgirneescort2026indexnow';
const SIR = 'kg-index-2026';
const MOTORLAR = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow'
];
const EN_FAZLA = 500;

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
    const r = await fetch(BASE + '/sitemap.xml', { signal: z.sinyal });
    if (!r.ok) return YEDEK;
    const xml = await r.text();
    const m = xml.match(/<loc>[^<]+<\/loc>/g) || [];
    const l = m.map(x => x.replace(/<\/?loc>/g, '').trim()).filter(u => u.indexOf(BASE) === 0);
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
    const q = req.query || {};

    if (String(q.sir || '') !== SIR) {
      res.status(401).send(JSON.stringify({ ok: false, hata: 'sir yanlis' }));
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
      if (u.indexOf(BASE) !== 0) {
        res.status(400).send(JSON.stringify({ ok: false, hata: 'url disarida' }));
        return;
      }
      const sonuc = await Promise.all(MOTORLAR.map(m => tekMotor(m, govdeYap([u]))));
      res.status(200).send(JSON.stringify({ ok: true, adet: 1, sonuc }));
      return;
    }

    const hepsi = await adresler();
    const liste = hepsi.slice(0, EN_FAZLA);

    if (q.test) {
      res.status(200).send(JSON.stringify({ ok: true, test: true, bulunan: hepsi.length, gonderilecek: liste.length }));
      return;
    }

    const sonuc = await Promise.all(MOTORLAR.map(m => tekMotor(m, govdeYap(liste))));
    res.status(200).send(JSON.stringify({ ok: true, adet: liste.length, toplam: hepsi.length, sonuc }));
  } catch (e) {
    res.status(200).send(JSON.stringify({
      ok: false,
      hata: String((e && e.message) || e).slice(0, 200)
    }));
  }
};
