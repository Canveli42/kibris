const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const WA = 'https://wa.me/905515420755';
const TG = 'https://t.me/kibrisescortvip';
const S = require('../data/shell.js');

const DILLER = ['tr', 'en', 'ru'];
const D = {
  tr: require('../data/regions.js'),
  en: require('../data/regions.en.js'),
  ru: require('../data/regions.ru.js')
};

const AYLAR = {
  tr: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
  en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  ru: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
};

const bugun = dil => {
  const d = new Date(), a = AYLAR[dil] || AYLAR.tr;
  if (dil === 'en') return a[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  return d.getDate() + ' ' + a[d.getMonth()] + ' ' + d.getFullYear();
};

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const kok = dil => (dil === 'tr' ? '' : '/' + dil);

const M = {
  tr: {
    ana: 'Ana sayfa', katalog: nm => nm + ' Kataloğu İste', tg: 'Telegram', fiyat: 'Fiyatlar',
    noktalar: 'Hizmet verdiğimiz noktalar', oteller: 'Sık çalıştığımız oteller',
    fiyatB: nm => nm + ' fiyatları',
    fiyatlar: [
      ['30 dakika — 7.000 ₺', 'Yalnızca kendi yerimizde. Kısa görüşme.'],
      ['1 saat — 12.000 ₺', 'Otel ve eve çıkışta en çok seçilen süre; adrese çıkışta en alt sınır.'],
      ['2 saat — 17.000 ₺', 'Yemek ya da gece programı eklemek isteyenler için.'],
      ['4 saat — 22.000 ₺', 'Uzun eşlik ve gece planı.']
    ],
    tarife: 'Tarife sabit, pazarlık yok, kapıda değişmiyor. Tek değişken taksi: her yöne mesafeye göre hesaplanıp önceden söyleniyor. Tam liste <a href="' + BASE + '/fiyatlar">fiyatlar sayfasında</a>.',
    guncel: 'Son güncelleme: ', sssB: nm => nm + ' hakkında sık sorulanlar', diger: 'Diğer sayfalar',
    sorun: 'Sorun mu var, katalog mu lazım?', alt: "WhatsApp veya Telegram'dan yaz, kaldığın bölgeye göre liste gönderiyoruz.",
    wa: "WhatsApp'tan yaz", tgY: "Telegram'dan yaz",
    yok: 'Sayfa bulunamadı', yokD: 'Aradığın bölge sayfası bulunamadı.', buAdres: 'Bu adreste bölge yok.', donebilir: 'Ana sayfaya dönebilirsin.',
    dolgu: nm => `
  <h2>${esc(nm)} için ne zaman yazmalı</h2>
  <div class="about"><b>Gündüz 12:00-17:00</b><br>En sakin aralık. Aynı gün müsaitlik yüksek, 30-45 dakika önceden yazman yeterli.</div>
  <div class="about"><b>Akşam 18:00-22:00</b><br>En yoğun aralık. 1-2 saat önceden yazman gerekiyor.</div>
  <div class="about"><b>Gece 22:00-02:00</b><br>Bar ve casino çıkışı talebi burada toplanıyor. 10-15 dakika önceden yazman yeterli.</div>
  <div class="about"><b>02:00 sonrası</b><br>Müsaitlik düşer. Uzak noktalarda 30 dakika önceden yazman gerekir.</div>
  <h2>${esc(nm)} — sık yapılan hatalar</h2>
  <ul>
    <li>Uzak noktaya son 10 dakikada yazmak.</li>
    <li>Otel adı vermeden "lobide görüşelim" demek.</li>
    <li>Otele veya eve 30 dakika istemek.</li>
    <li>Kalabalık lobide buluşma noktası seçmek.</li>
    <li>Nakit getirmemek.</li>
  </ul>
  <h2>${esc(nm)} ulaşım ve taksi</h2>
  <div class="about">Taksi ücreti her yöne mesafeye göre hesaplanıyor ve her zaman önceden söyleniyor. Gece 01:00 sonrası kırsalda taksi bulmak zor; dönüş için şoför numarası almanı öneririz. Detaylar <a href="${BASE}/blog/kibris-escort-ulasim-ve-taksi">ulaşım ve taksi</a> yazısında.</div>
  <h2>İlk kez yazacaksan</h2>
  <div class="about">Mesajda üç şeyi yaz: bölge, saat, süre. "${esc(nm)}, bu akşam 21:00, 1 saat" yeterli. Uzun tanıtım paragrafı yazmana gerek yok. 30 dakika yalnızca kendi yerimizde; otele veya eve çıkışta en az 1 saat.</div>`
  },
  en: {
    ana: 'Home', katalog: nm => 'Ask for the ' + nm + ' selection', tg: 'Telegram', fiyat: 'Prices',
    noktalar: 'Places we cover', oteller: 'Hotels we visit most',
    fiyatB: nm => nm + ' prices',
    fiyatlar: [
      ['30 minutes — 7.000 ₺', 'At our place only. Short meeting.'],
      ['1 hour — 12.000 ₺', 'The usual choice for a hotel or home visit; the minimum for an outcall.'],
      ['2 hours — 17.000 ₺', 'For dinner or a night out on top.'],
      ['4 hours — 22.000 ₺', 'Long company and a full evening plan.']
    ],
    tarife: 'The tariff is fixed, there is no haggling and it does not change at the door. The only variable is the taxi: calculated by distance and quoted in advance. Full list on the <a href="' + BASE + '/en/fiyatlar">price page</a>.',
    guncel: 'Last updated: ', sssB: nm => 'Frequently asked questions about ' + nm, diger: 'Other areas',
    sorun: 'Question or want the selection?', alt: 'Write on WhatsApp or Telegram and we send the current list for your area.',
    wa: 'Message on WhatsApp', tgY: 'Message on Telegram',
    yok: 'Page not found', yokD: 'That area page does not exist.', buAdres: 'Nothing at this address.', donebilir: 'You can go back to the home page.',
    dolgu: nm => `
  <h2>When to write about ${esc(nm)}</h2>
  <div class="about"><b>Daytime 12:00-17:00</b><br>The quietest window. Same-day availability is high; writing 30-45 minutes ahead is enough.</div>
  <div class="about"><b>Evening 18:00-22:00</b><br>The busiest window. Write 1-2 hours ahead.</div>
  <div class="about"><b>Night 22:00-02:00</b><br>Bar and casino exits land here. 10-15 minutes ahead is enough.</div>
  <div class="about"><b>After 02:00</b><br>Availability drops. At distant points write 30 minutes ahead.</div>
  <h2>${esc(nm)} — common mistakes</h2>
  <ul>
    <li>Writing 10 minutes before a distant meeting.</li>
    <li>Saying "meet in the lobby" without naming the hotel.</li>
    <li>Asking for 30 minutes to a hotel or home.</li>
    <li>Picking a meeting point in a crowded lobby.</li>
    <li>Not bringing cash.</li>
  </ul>
  <h2>${esc(nm)} transport and taxi</h2>
  <div class="about">The taxi fare is calculated by distance every time and always quoted in advance. After 01:00 taxis are hard to find out of town; take the driver's number for the return. Details in the <a href="${BASE}/en/blog/kibris-escort-ulasim-ve-taksi">transport and taxi</a> article.</div>
  <h2>If you are writing for the first time</h2>
  <div class="about">Send three things: area, time, duration. "${esc(nm)}, tonight 21:00, 1 hour" is enough. No long introduction needed. 30 minutes is at our place only; a hotel or home visit starts at 1 hour.</div>`
  },
  ru: {
    ana: 'Главная', katalog: nm => 'Каталог — ' + nm, tg: 'Telegram', fiyat: 'Цены',
    noktalar: 'Куда выезжаем', oteller: 'Отели, куда ездим чаще всего',
    fiyatB: nm => 'Цены — ' + nm,
    fiyatlar: [
      ['30 минут — 7.000 ₺', 'Только у нас. Короткая встреча.'],
      ['1 час — 12.000 ₺', 'Обычный выбор для отеля или квартиры; минимум для выезда.'],
      ['2 часа — 17.000 ₺', 'Если добавляете ужин или вечернюю программу.'],
      ['4 часа — 22.000 ₺', 'Долгое сопровождение и весь вечер.']
    ],
    tarife: 'Тариф фиксированный, торга нет, на месте не меняется. Единственная переменная — такси: считается по расстоянию и называется заранее. Полный список на <a href="' + BASE + '/ru/fiyatlar">странице цен</a>.',
    guncel: 'Обновлено: ', sssB: nm => 'Частые вопросы — ' + nm, diger: 'Другие районы',
    sorun: 'Вопрос или нужен каталог?', alt: 'Напишите в WhatsApp или Telegram, пришлём подборку по вашему району.',
    wa: 'Написать в WhatsApp', tgY: 'Написать в Telegram',
    yok: 'Страница не найдена', yokD: 'Такой страницы района нет.', buAdres: 'По этому адресу ничего нет.', donebilir: 'Можно вернуться на главную.',
    dolgu: nm => `
  <h2>Когда писать — ${esc(nm)}</h2>
  <div class="about"><b>День 12:00-17:00</b><br>Самое спокойное время. Свободные на сегодня есть, писать за 30-45 минут достаточно.</div>
  <div class="about"><b>Вечер 18:00-22:00</b><br>Самый плотный отрезок. Писать за 1-2 часа.</div>
  <div class="about"><b>Ночь 22:00-02:00</b><br>Здесь собираются заявки после бара и казино. Хватает 10-15 минут.</div>
  <div class="about"><b>После 02:00</b><br>Свободных меньше. На дальние точки писать за 30 минут.</div>
  <h2>${esc(nm)} — частые ошибки</h2>
  <ul>
    <li>Писать за 10 минут до дальней встречи.</li>
    <li>Писать «встретимся в лобби», не назвав отель.</li>
    <li>Просить 30 минут с выездом в отель или на квартиру.</li>
    <li>Назначать встречу в людном лобби.</li>
    <li>Приезжать без наличных.</li>
  </ul>
  <h2>${esc(nm)} — транспорт и такси</h2>
  <div class="about">Стоимость такси всегда считается по расстоянию и называется заранее. После 01:00 за городом такси поймать трудно — возьмите номер водителя на обратный путь. Подробнее в статье <a href="${BASE}/ru/blog/kibris-escort-ulasim-ve-taksi">транспорт и такси</a>.</div>
  <h2>Если пишете впервые</h2>
  <div class="about">Напишите три вещи: район, время, длительность. «${esc(nm)}, сегодня 21:00, 1 час» — достаточно. Длинное вступление не нужно. 30 минут — только у нас; выезд в отель или на квартиру начинается с 1 часа.</div>`
  }
};

const sayfa = o => `<!DOCTYPE html>
<html lang="${o.dil}"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.desc)}">
<link rel="canonical" href="${esc(o.url)}">
${o.alternates || ''}
<link rel="sitemap" type="application/xml" href="${BASE}/sitemap.xml">
<meta name="robots" content="${o.robots || 'index,follow'}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="RedKıbrıs">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.desc)}">
<meta property="og:url" content="${esc(o.url)}">
<meta property="og:locale" content="${o.dil === 'tr' ? 'tr_TR' : o.dil === 'en' ? 'en_US' : 'ru_RU'}">
${o.img ? `<meta property="og:image" content="${esc(o.img)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${esc(o.img)}">` : '<meta name="twitter:card" content="summary">'}
<meta name="theme-color" content="#0b121b">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath d='M32 2 62 32 32 62 2 32Z' fill='%231e2a40' stroke='%23f0d9ae' stroke-opacity='.55' stroke-width='2'/%3E%3Ctext x='32' y='41' font-family='Georgia' font-size='23' font-weight='700' text-anchor='middle'%3E%3Ctspan fill='%23ff3b5c'%3ER%3C/tspan%3E%3Ctspan fill='%23ffffff'%3EK%3C/tspan%3E%3C/text%3E%3C/svg%3E">
<style>${S.css}${S.icerik}</style>
${o.ld || ''}
</head><body>
${S.header({ aktif: o.url, dil: o.dil, ceviriler: o.ceviriler })}
<main class="wrap">
${o.icerik}
</main>
${S.footer(o.dil)}
<script src="${BASE}/js/analytics.js" defer></script>
</body></html>`;

module.exports = async (req, res) => {
  const slug = String((req.query && req.query.slug) || '')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  const ham = String((req.query && req.query.lang) || 'tr').toLowerCase();
  const dil = DILLER.includes(ham) ? ham : 'tr';
  const t = M[dil];
  const url = BASE + kok(dil) + '/' + slug;

  let C2 = D[dil][slug];

  // çeviri yoksa Türkçesine kalıcı yönlendir
  if (!C2 && dil !== 'tr' && D.tr[slug]) {
    const hedef = BASE + '/' + slug;
    res.writeHead(301, {
      Location: hedef,
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800'
    });
    res.end('<!DOCTYPE html><html><body><a href="' + hedef + '">' + hedef + '</a></body></html>');
    return;
  }

  if (!C2) {
    // eski düz bağlantılar: /slug -> /blog/slug
    try {
      const rp = await fetch(
        SB + '/rest/v1/posts?select=slug&slug=eq.' + encodeURIComponent(slug) + '&published=eq.true&limit=1',
        { headers: H }
      );
      if (rp.ok) {
        const ap = await rp.json();
        if (ap && ap.length) {
          const hedef = BASE + '/blog/' + slug;
          res.writeHead(301, {
            Location: hedef,
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800'
          });
          res.end('<!DOCTYPE html><html><body><a href="' + hedef + '">' + hedef + '</a></body></html>');
          return;
        }
      }
    } catch (e) {}
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(404).send(sayfa({
      dil, title: t.yok + ' | RedKıbrıs', desc: t.yokD, url, robots: 'noindex,follow',
      icerik: `<h1>${esc(t.yok)}</h1><div class="about">${esc(t.buAdres)} <a href="${BASE}${kok(dil)}/">${esc(t.donebilir)}</a></div>`
    }));
    return;
  }

  // hangi dillerde bu bölge var
  const varOlan = DILLER.filter(d => D[d][slug]);
  const ceviriler = {};
  varOlan.forEach(d => { ceviriler[d] = BASE + kok(d) + '/' + slug; });
  const alternates = varOlan.map(d => `<link rel="alternate" hreflang="${d}" href="${esc(ceviriler[d])}">`).join('\n')
    + `\n<link rel="alternate" hreflang="x-default" href="${esc(ceviriler.tr || ceviriler[varOlan[0]])}">`;

  const nmE = dil === 'ru' ? C2.nm : (/Escort/i.test(C2.nm) ? C2.nm : C2.nm + ' Escort');
  const altE = /Escort/i.test(C2.alt) ? '' : ' Escort';
  const title = C2.baslik
    ? C2.baslik + ' | RedKıbrıs'
    : (dil === 'ru'
      ? 'Эскорт — ' + C2.nm + ' | ' + C2.alt + ' – RedKıbrıs'
      : nmE + ' | ' + C2.alt + altE + ' – RedKıbrıs');
  const desc = C2.aciklama
    || (dil === 'ru'
      ? C2.nm + ' — ' + C2.alt + '. Фиксированный тариф, без предоплаты, выезд в отель и на квартиру. Стоимость такси называют заранее.'
      : nmE + ' – ' + C2.alt + '. Sabit tarife, kapora yok, otel ve eve çıkış. Taksi ücreti mesafeye göre önceden söylenir.');

  let img = '';
  try {
    const r = await fetch(SB + '/rest/v1/regions?select=slug,img&slug=eq.' + encodeURIComponent(slug), { headers: H });
    if (r.ok) {
      const rows = await r.json();
      const hit = (rows || [])[0];
      if (hit && hit.img) img = hit.img;
    }
  } catch (e) {}

  const h1 = dil === 'ru'
    ? 'Эскорт ' + esc(C2.nm) + ' <span style="font-size:.55em;color:#93a0b4;font-weight:400">' + esc(C2.alt) + '</span>'
    : esc(nmE) + ' <span style="font-size:.55em;color:#93a0b4;font-weight:400">' + esc(C2.alt) + '</span>';

  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'Service', serviceType: nmE,
      areaServed: C2.areas, url: url,
      ...(img ? { image: img } : {}),
      provider: { '@type': 'Organization', name: 'RedKıbrıs' }
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t.ana, item: BASE + kok(dil) + '/' },
        { '@type': 'ListItem', position: 2, name: C2.nm, item: url }
      ]
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: (C2.sss || []).map(x => ({
        '@type': 'Question', name: x[0],
        acceptedAnswer: { '@type': 'Answer', text: x[1] }
      }))
    }
  ];

  const digerleri = Object.keys(D[dil]).filter(k => k !== slug)
    .map(k => `<a class="btn-o" href="${BASE}${kok(dil)}/${k}">${esc(D[dil][k].nm)}</a>`).join('');

  const ekMetin = String(C2.ek || '');
  const dolgu = !ekMetin ? t.dolgu(C2.nm) : '';

  const fiyatHtml = t.fiyatlar
    .map(x => `<div class="about"><b>${esc(x[0])}</b><br>${esc(x[1])}</div>`).join('\n  ');

  const icerik = `
  <div class="crumb"><a href="${BASE}${kok(dil)}/">${esc(t.ana)}</a> › <span>${esc(C2.nm)}</span></div>
  <h1>${h1}</h1>
  <p class="lead">${esc(C2.lead)}</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:8px">
    <a class="btn wa" href="${WA}" target="_blank" rel="noopener" data-base="${WA}">${esc(t.katalog(C2.nm))}</a>
    <a class="btn tg" href="${TG}" target="_blank" rel="noopener" data-base="${TG}">${esc(t.tg)}</a>
    <a class="btn-o" href="${BASE}${kok(dil)}/fiyatlar">${esc(t.fiyat)}</a>
  </div>
  ${img ? `<img class="rimg" src="${esc(img)}" alt="${esc(nmE)}" width="1200" height="700">` : ''}
  <div class="about">${esc(C2.metin)}</div>
  <div class="about">${C2.metin2}</div>
  <div class="about"><b>${esc(t.noktalar)}</b><br>${C2.areas.map(esc).join(' · ')}</div>
  <div class="about"><b>${esc(t.oteller)}</b><br>${C2.otel.map(esc).join(' · ')}</div>
  <h2>${esc(t.fiyatB(C2.nm))}</h2>
  ${fiyatHtml}
  <div class="about">${t.tarife}</div>
  ${ekMetin}
  ${dolgu}
  <p class="guncel">${esc(t.guncel)}${bugun(dil)}</p>
  <section class="sect">
    <h2>${esc(t.sssB(C2.nm))}</h2>
    ${(C2.sss || []).map(x => `<div class="about"><b>${esc(x[0])}</b><br>${esc(x[1])}</div>`).join('')}
  </section>
  <section class="sect">
    <h2>${esc(t.diger)}</h2>
    <div style="display:flex;gap:8px;flex-wrap:wrap">${digerleri}</div>
  </section>
  <div class="about"><b>${esc(t.sorun)}</b><br>${esc(t.alt)}
    <br><a class="btn wa" href="${WA}" target="_blank" rel="noopener" data-base="${WA}">${esc(t.wa)}</a>
    <a class="btn tg" href="${TG}" target="_blank" rel="noopener" data-base="${TG}">${esc(t.tgY)}</a>
  </div>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=1800, stale-while-revalidate=86400');
  res.status(200).send(sayfa({
    dil, title, desc, url, img, icerik, alternates, ceviriler,
    ld: ld.map(x => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('')
  }));
};
