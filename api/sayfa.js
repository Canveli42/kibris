const fs = require('fs');
const path = require('path');
const S = require('../data/shell.js');

const IZIN = {
  index: { f: 'index.html', aktif: '/', dil: 'tr' },
  en: { f: 'en.html', aktif: '/en', dil: 'en' },
  ru: { f: 'ru.html', aktif: '/ru', dil: 'ru' },
  fiyatlar: { f: 'fiyatlar.html', aktif: '/fiyatlar', dil: 'tr' },
  iletisim: { f: 'iletisim.html', aktif: '/iletisim', dil: 'tr' },
  gizlilik: { f: 'gizlilik.html', aktif: '/gizlilik', dil: 'tr' },
  blog: { f: 'blog.html', aktif: '/blog', dil: 'tr' }
};

module.exports = (req, res) => {
  const k = String((req.query && req.query.f) || '').replace(/[^a-z]/g, '');
  const sayfa = IZIN[k];

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400');

  if (!sayfa) {
    res.status(404).send('Sayfa bulunamadı');
    return;
  }

  let html;
  try {
    html = fs.readFileSync(path.join(process.cwd(), sayfa.f), 'utf8');
  } catch (e) {
    res.status(500).send('Dosya okunamadı');
    return;
  }

  html = html
    .replace('<!--SHELL:HEAD-->', S.head())
    .replace('<!--SHELL:HEADER-->', S.header({ aktif: sayfa.aktif, dil: sayfa.dil }))
    .replace('<!--SHELL:FOOTER-->', S.footer(sayfa.dil));

  res.status(200).send(html);
};
