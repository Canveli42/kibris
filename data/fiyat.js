// Tek fiyat kaynağı. Zam = yalnızca bu dosya.
// Renkler sabit hex: --muted / --gold değişkenlerine bağımlı değil.

const B = require('./bolge.js');

const PARA = '₺';
const MUT = '#93a0b4';
const ALTIN = '#d8b878';

// yaklaşık çevrim — yalnızca EN/RU sayfalarda gösterge olarak
const KUR = { en: 0.0245, ru: 0.0245 };

const LISTE = [
  { kod: '30dk', fiyat: 7000, ad: { tr: '30 dakika', en: '30 minutes', ru: '30 минут' }, not: { tr: 'Yalnızca kendi yerimizde', en: 'At our place only', ru: 'Только у нас' }, kisa: { tr: 'Yalnızca kendi yerimizde', en: 'In-call only', ru: 'Только у нас' } },
  { kod: '1sa', fiyat: 12000, ad: { tr: '1 saat', en: '1 hour', ru: '1 час' }, not: { tr: 'Otel ve eve çıkışta en çok seçilen süre; adrese çıkışta en alt sınır.', en: 'The usual choice for a hotel or home visit; the minimum for an outcall.', ru: 'Обычный выбор для отеля или квартиры; минимум для выезда.' }, kisa: { tr: 'En çok seçilen', en: 'Most booked', ru: 'Берут чаще всего' } },
  { kod: '2sa', fiyat: 17000, ad: { tr: '2 saat', en: '2 hours', ru: '2 часа' }, not: { tr: 'Yemek ya da gece programı eklemek isteyenler için.', en: 'For dinner or a night out on top.', ru: 'Если добавляете ужин или вечернюю программу.' }, kisa: { tr: 'Yemek dahil', en: 'Dinner on top', ru: 'С ужином' } },
  { kod: '4sa', fiyat: 22000, ad: { tr: '4 saat', en: '4 hours', ru: '4 часа' }, not: { tr: 'Uzun eşlik ve gece planı.', en: 'Long company and a full evening plan.', ru: 'Долгое сопровождение и весь вечер.' }, kisa: { tr: 'Bütün akşam', en: 'Whole evening', ru: 'Весь вечер' } },
  { kod: 'vip', fiyat: 30000, ad: { tr: 'VIP eşlik (4 saat)', en: 'VIP company (4 hours)', ru: 'VIP-сопровождение (4 часа)' }, not: { tr: 'Davet veya iş yemeği; kıyafet ve protokol baştan konuşulur.', en: 'Reception or business dinner; dress and protocol agreed first.', ru: 'Приём или деловой ужин; одежда и протокол согласуются заранее.' }, kisa: { tr: 'Davet ve iş yemeği', en: 'Reception, dinner', ru: 'Приём, ужин' } },
  { kod: 'gece', fiyat: 40000, ad: { tr: 'Gece (8 saat)', en: 'Overnight (8 hours)', ru: 'Ночь (8 часов)' }, not: { tr: 'Sabah çıkışlı; başlangıç ve bitiş saati baştan yazılır.', en: 'Morning exit; start and end agreed in writing first.', ru: 'С утренним выходом; начало и конец согласуются заранее.' }, kisa: { tr: 'Sabaha kadar', en: 'Until morning', ru: 'До утра' } }
];

const MIN = Math.min.apply(null, LISTE.map(x => x.fiyat));
const MAX = Math.max.apply(null, LISTE.map(x => x.fiyat));

const bicim = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ' + PARA;

const doviz = (dil, n) => {
  const k = KUR[dil];
  if (!k) return '';
  return ' <small style="color:' + MUT + '">≈ €' + Math.round(n * k) + '</small>';
};

// 30 dakika notu bölgeye göre: yerimiz Girne merkezde
const yer = (dil, bolge) => {
  const b = bolge && B.varMi(bolge) ? bolge : null;
  const girne = b && (b === 'girne' || B.il(b) === 'girne');
  if (dil === 'en') return girne ? 'At our place only, Girne centre.' : 'At our place only; our place is in Girne centre.';
  if (dil === 'ru') return girne ? 'Только у нас, центр Кирении.' : 'Только у нас; наше место — центр Кирении.';
  return girne ? 'Yalnızca kendi yerimizde (Girne merkez).' : 'Yalnızca kendi yerimizde; yerimiz Girne merkezde.';
};

const not = (x, dil, bolge) => (x.kod === '30dk' ? yer(dil, bolge) : x.not[dil]);

const cevap = dil => LISTE.map(x => x.ad[dil] + ' ' + bicim(x.fiyat) + (KUR[dil] ? ' (≈ €' + Math.round(x.fiyat * KUR[dil]) + ')' : '')).join(', ');

const satir = (dil, bolge) => LISTE.map(x =>
  '<div><span><b>' + x.ad[dil] + '</b><span style="color:' + MUT + ';font-size:13px">' + not(x, dil, bolge) + '</span></span>'
  + '<strong style="color:' + ALTIN + '">' + bicim(x.fiyat) + doviz(dil, x.fiyat) + '</strong></div>'
).join('\n        ');

const kart = dil => LISTE.map(x =>
  '<div class="price"><span>' + x.ad[dil] + '</span><b>' + bicim(x.fiyat) + '</b><small>' + x.kisa[dil] + doviz(dil, x.fiyat) + '</small></div>'
).join('\n        ');

const ld = dil => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: dil === 'tr' ? 'Kıbrıs escort' : dil === 'en' ? 'Cyprus escort' : 'Эскорт на Кипре',
  provider: { '@type': 'Organization', name: 'RedKıbrıs' },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'TRY',
    lowPrice: String(MIN),
    highPrice: String(MAX),
    offerCount: String(LISTE.length),
    offers: LISTE.map(x => ({ '@type': 'Offer', price: String(x.fiyat), priceCurrency: 'TRY', name: x.ad[dil] }))
  }
});

module.exports = { PARA, LISTE, MIN, MAX, bicim, cevap, satir, kart, ld };
