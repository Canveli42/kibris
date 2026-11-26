// Tek fiyat kaynağı. Zam = yalnızca bu dosya.
// Renkler sabit hex: bölge sayfalarında --muted/--gold tanımlı olmadığı için var() kullanılmıyor.

const PARA = '₺';
const MUT = '#93a0b4';
const ALTIN = '#d8b878';

// yaklaşık çevrim — yalnızca EN/RU sayfalarda gösterge olarak
const KUR = { en: 0.0245, ru: 0.0245 };

const LISTE = [
  { kod: '30dk', fiyat: 7000, ad: { tr: '30 dakika', en: '30 minutes', ru: '30 минут' }, not: { tr: 'Yalnızca kendi yerimizde (Girne merkez).', en: 'At our place only, Girne centre.', ru: 'Только у нас, центр Кирении.' }, kisa: { tr: 'Yalnızca kendi yerimizde', en: 'In-call only', ru: 'Только у нас' } },
  { kod: '1sa', fiyat: 12000, ad: { tr: '1 saat', en: '1 hour', ru: '1 час' }, not: { tr: 'Otel ve eve çıkışta en çok seçilen süre; adrese çıkışta en alt sınır.', en: 'The usual choice for a hotel or home visit; the minimum for an outcall.', ru: 'Обычный выбор для отеля или квартиры; минимум для выезда.' }, kisa: { tr: 'En çok seçilen', en: 'Most booked', ru: 'Берут чаще всего' } },
  { kod: '2sa', fiyat: 17000, ad: { tr: '2 saat', en: '2 hours', ru: '2 часа' }, not: { tr: 'Yemek ya da gece programı eklemek isteyenler için.', en: 'For dinner or a night out on top.', ru: 'Если добавляете ужин или вечернюю программу.' }, kisa: { tr: 'Yemek dahil', en: 'Dinner on top', ru: 'С ужином' } },
  { kod: '4sa', fiyat: 22000, ad: { tr: '4 saat', en: '4 hours', ru: '4 часа' }, not: { tr: 'Uzun eşlik ve gece planı.', en: 'Long company and a full evening plan.', ru: 'Долгое сопровождение и весь вечер.' }, kisa: { tr: 'Bütün akşam', en: 'Whole evening', ru: 'Весь вечер' } }
];

const MIN = Math.min.apply(null, LISTE.map(x => x.fiyat));
const MAX = Math.max.apply(null, LISTE.map(x => x.fiyat));

const bicim = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ' + PARA;

// EN/RU için yaklaşık euro karşılığı
const doviz = (dil, n) => {
  const k = KUR[dil];
  if (!k) return '';
  const e = Math.round(n * k);
  return ' <small>≈ €' + e + '</small>';
};

const cevap = dil => LISTE.map(x => x.ad[dil] + ' ' + bicim(x.fiyat) + (KUR[dil] ? ' (≈ €' + Math.round(x.fiyat * KUR[dil]) + ')' : '')).join(', ');

const satir = dil => LISTE.map(x =>
  '<div><span><b>' + x.ad[dil] + '</b><small style="color:' + MUT + ';font-size:13px">' + x.not[dil] + '</small></span>'
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
