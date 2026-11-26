// Tek fiyat kaynağı. Zam = yalnızca bu dosya.
// Sayfalar, SSS cevapları ve JSON-LD buradan üretilir.

const PARA = '₺';

const LISTE = [
  {
    kod: '30dk', fiyat: 7000,
    ad: { tr: '30 dakika', en: '30 minutes', ru: '30 минут' },
    not: { tr: 'Yalnızca kendi yerimizde (Girne merkez).', en: 'At our place only, Girne centre.', ru: 'Только у нас, центр Кирении.' },
    kisa: { tr: 'Yalnızca kendi yerimizde', en: 'In-call only', ru: 'Только у нас' }
  },
  {
    kod: '1sa', fiyat: 12000,
    ad: { tr: '1 saat', en: '1 hour', ru: '1 час' },
    not: { tr: 'Otel ve eve çıkışta en çok seçilen süre; adrese çıkışta en alt sınır.', en: 'The usual choice for a hotel or home visit; the minimum for an outcall.', ru: 'Обычный выбор для отеля или квартиры; минимум для выезда.' },
    kisa: { tr: 'En çok seçilen', en: 'Most booked', ru: 'Берут чаще всего' }
  },
  {
    kod: '2sa', fiyat: 17000,
    ad: { tr: '2 saat', en: '2 hours', ru: '2 часа' },
    not: { tr: 'Yemek ya da gece programı eklemek isteyenler için.', en: 'For dinner or a night out on top.', ru: 'Если добавляете ужин или вечернюю программу.' },
    kisa: { tr: 'Yemek dahil', en: 'Dinner on top', ru: 'С ужином' }
  },
  {
    kod: '4sa', fiyat: 22000,
    ad: { tr: '4 saat', en: '4 hours', ru: '4 часа' },
    not: { tr: 'Uzun eşlik ve gece planı.', en: 'Long company and a full evening plan.', ru: 'Долгое сопровождение и весь вечер.' },
    kisa: { tr: 'Bütün akşam', en: 'Whole evening', ru: 'Весь вечер' }
  }
];

const MIN = Math.min.apply(null, LISTE.map(x => x.fiyat));
const MAX = Math.max.apply(null, LISTE.map(x => x.fiyat));

// 7.000 — ICU'ya bağlı kalmadan sabit biçim
const bicim = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ' + PARA;

const cevap = dil => LISTE.map(x => x.ad[dil] + ' ' + bicim(x.fiyat)).join(', ');

// fiyat sayfası satırları
const satir = dil => LISTE.map(x =>
  '<div><span><b>' + x.ad[dil] + '</b><span style="color:var(--muted);font-size:13px">' + x.not[dil] + '</span></span>' +
  '<strong style="color:var(--gold)">' + bicim(x.fiyat) + '</strong></div>'
).join('\n        ');

// ana sayfa kartları
const kart = dil => LISTE.map(x =>
  '<div class="price"><span>' + x.ad[dil] + '</span><b>' + bicim(x.fiyat) + '</b><small>' + x.kisa[dil] + '</small></div>'
).join('\n        ');

// JSON-LD: Service + AggregateOffer
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
    offers: LISTE.map(x => ({
      '@type': 'Offer',
      price: String(x.fiyat),
      priceCurrency: 'TRY',
      name: x.ad[dil]
    }))
  }
});

module.exports = { PARA, LISTE, MIN, MAX, bicim, cevap, satir, kart, ld };
