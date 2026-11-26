const SB = 'https://accerzwswgiqhtfgoeqv.supabase.co';
const KEY = 'sb_publishable_MghJlNwUcMgsHY6UfQ9hSw_gDfS_HfG';
const BASE = 'https://www.kibrisgirneescort.com';
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const WA = 'https://wa.me/905515420755';
const TG = 'https://t.me/kibrisescortvip';
const S = require('../data/shell.js');
const F = require('../data/fiyat.js');

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

const cap = s => {
  const v = String(s == null ? '' : s);
  return v ? v.charAt(0).toUpperCase() + v.slice(1) : v;
};

const kok = dil => (dil === 'tr' ? '' : '/' + dil);

const ldYaz = x => '<script type="application/ld+json">' + JSON.stringify(x).replace(/</g, '\\u003c') + '</script>';

const M = {
  tr: {
    ana: 'Ana sayfa', katalog: nm => nm + ' Kataloğu İste', tg: 'Telegram', fiyat: 'Fiyatlar',
    noktalar: 'Hizmet verdiğimiz noktalar', oteller: 'Sık çalıştığımız oteller',
    fiyatB: nm => nm + ' fiyatları',
    tarife: 'Tarife sabit, pazarlık yok, kapıda değişmiyor. Ödeme görüşmenin başında, yere girmeden alınır: nakit, IBAN veya USDT. Tek değişken taksi: her yöne mesafeye göre hesaplanıp önceden söyleniyor. Tam liste <a href="' + BASE + '/fiyatlar">fiyatlar sayfasında</a>.',
    guncel: 'Son güncelleme: ', sssB: nm => nm + ' hakkında sık sorulanlar', diger: 'Diğer sayfalar',
    sorun: 'Sorun mu var, katalog mu lazım?', alt: "WhatsApp veya Telegram'dan yaz, kaldığın bölgeye göre liste gönderiyoruz.",
    wa: "WhatsApp'tan yaz", tgY: "Telegram'dan yaz",
    yok: 'Sayfa bulunamadı', yokD: 'Aradığın sayfa bulunamadı.', buAdres: 'Bu adreste bölge yok.', donebilir: 'Ana sayfaya dönebilirsin.',
    s404: 'Bu sayfa bulunamadı', s404alt: 'Adres yanlış yazılmış, sayfa taşınmış ya da artık yayında değil. Aşağıdan bölge seçebilir, kataloğu isteyebilirsin.',
    s404cat: 'Kataloğu gönder', s404bolge: 'Bölge seç', s404pop: 'Sık açılan sayfalar', s404home: 'Ana sayfaya dön',
    p1: 'Fiyatlar', p2: 'Girne fiyatları', p3: 'Türkçe bilen escort', p4: 'Gecelik fiyat', p5: 'Otele escort', p6: 'Blog', p7: 'İletişim'
  },
  en: {
    ana: 'Home', katalog: nm => 'Ask for the ' + nm + ' selection', tg: 'Telegram', fiyat: 'Prices',
    noktalar: 'Places we cover', oteller: 'Hotels we visit most',
    fiyatB: nm => nm + ' prices',
    tarife: 'The tariff is fixed, there is no haggling and it does not change at the door. Payment is taken at the start, before you go in: cash, transfer or USDT. The only variable is the taxi: calculated by distance and quoted in advance. Full list on the <a href="' + BASE + '/en/fiyatlar">price page</a>.',
    guncel: 'Last updated: ', sssB: nm => 'Frequently asked questions about ' + nm, diger: 'Other areas',
    sorun: 'Question or want the selection?', alt: 'Write on WhatsApp or Telegram and we send the current list for your area.',
    wa: 'Message on WhatsApp', tgY: 'Message on Telegram',
    yok: 'Page not found', yokD: 'That page does not exist.', buAdres: 'Nothing at this address.', donebilir: 'You can go back to the home page.',
    s404: 'This page was not found', s404alt: 'The address is mistyped, the page has moved, or it is no longer live. Pick an area below or just ask for the catalogue.',
    s404cat: 'Send catalogue', s404bolge: 'Choose an area', s404pop: 'Popular pages', s404home: 'Back to home',
    p1: 'Prices', p2: 'Kyrenia prices', p3: 'English speaking', p4: 'Overnight rate', p5: 'To your hotel', p6: 'Blog', p7: 'Contact'
  },
  ru: {
    ana: 'Главная', katalog: nm => 'Каталог — ' + nm, tg: 'Telegram', fiyat: 'Цены',
    noktalar: 'Куда выезжаем', oteller: 'Отели, куда ездим чаще всего',
    fiyatB: nm => 'Цены — ' + nm,
    tarife: 'Тариф фиксированный, торга нет, на месте не меняется. Оплата в начале встречи, до входа: наличные, перевод или USDT. Единственная переменная — такси: считается по расстоянию и называется заранее. Полный список на <a href="' + BASE + '/ru/fiyatlar">странице цен</a>.',
    guncel: 'Обновлено: ', sssB: nm => 'Частые вопросы — ' + nm, diger: 'Другие районы',
    sorun: 'Вопрос или нужен каталог?', alt: 'Напишите в WhatsApp или Telegram, пришлём подборку по вашему району.',
    wa: 'Написать в WhatsApp', tgY: 'Написать в Telegram',
    yok: 'Страница не найдена', yokD: 'Такой страницы нет.', buAdres: 'По этому адресу ничего нет.', donebilir: 'Можно вернуться на главную.',
    s404: 'Страница не найдена', s404alt: 'Адрес написан с ошибкой, страница переехала или больше не работает. Выберите район ниже или просто попросите каталог.',
    s404cat: 'Прислать каталог', s404bolge: 'Выбрать район', s404pop: 'Частые страницы', s404home: 'На главную',
    p1: 'Цены', p2: 'Цены в Кирении', p3: 'Русскоязычные', p4: 'Цена за ночь', p5: 'В отель', p6: 'Блог', p7: 'Контакты'
  }
};

// Kuşak şablonları: aynı coğrafyadaki bölgeler ortak ama kendine özgü gövde alır
const KEMER = {
  tr: {
    kiyi: nm => `
  <h2>${esc(nm)} — ne zaman ve nasıl yazmalı</h2>
  <div class="about"><b>Hat uzun</b><br>"${esc(nm)}" deyip geçmek yetmiyor; hangi sokak, hangi tesis olduğunu yaz. Buluşma noktasını kapı numarasıyla değil, karşıdaki mekânın adıyla netleştiriyoruz.</div>
  <div class="about"><b>Sezon</b><br>Temmuz-ağustos akşam 19:00-21:00 sahil trafiği kilit; o saat için 1 saat önceden yaz. Ekim sonrası hat boşalır, 20 dakika yeterli.</div>
  <div class="about"><b>Gece dönüş</b><br>23:00 sonrası sahil yolunda taksi bulmak zor. Dönüş için şoför numarası al, yoksa aynı yolu yürüyerek dönmek gerekir.</div>
  <h2>${esc(nm)} — sık yapılan hatalar</h2>
  <ul><li>"${esc(nm)}" yazıp konum linki göndermemek.</li><li>Site kapısında isim gerektiğini önceden söylememek.</li><li>Gece dönüş taksisini konuşmamak.</li><li>Nakit getirmemek.</li></ul>
  <h2>İlk kez yazacaksan</h2>
  <div class="about">Bölge, saat, süre ve konum linki. Dördü birden gelirse tek mesajda yer ayarlanıyor. 30 dakika yalnızca kendi yerimizde; bu hatta çıkış en az 1 saat.</div>`,
    yamac: nm => `
  <h2>${esc(nm)} — ne zaman ve nasıl yazmalı</h2>
  <div class="about"><b>Konum linki şart</b><br>Yamaçta sokak adları çoğu zaman haritada yok. Konum linki gelmezse kapıda 10 dakika kaybediliyor, o yüzden rezervasyonda istiyoruz.</div>
  <div class="about"><b>Dar yol</b><br>Araç bazı villaların kapısına kadar çıkamıyor; buluşmayı alt sokakta yapıyoruz. Bunu baştan söylüyoruz ki sürpriz olmasın.</div>
  <div class="about"><b>Saat</b><br>Akşam 18:00 sonrası için 1-2 saat önceden yaz; yamaç hattına gece çıkış planlı oluyor.</div>
  <h2>${esc(nm)} — sık yapılan hatalar</h2>
  <ul><li>Konum linki yerine tarif yazmak ("manastırı geç, sağa dön").</li><li>Villanın kapı numarasını vermemek.</li><li>Araçla kapıya kadar çıkılabileceğini sanmak.</li><li>Son 20 dakikada yazmak.</li></ul>
  <h2>İlk kez yazacaksan</h2>
  <div class="about">Konum linki + saat + süre. Üçü yeterli, tarif gerekmiyor. Adrese çıkışta en az 1 saat geçerli.</div>`,
    banliyo: nm => `
  <h2>${esc(nm)} — ne zaman ve nasıl yazmalı</h2>
  <div class="about"><b>Site kapısı</b><br>Bu hatta girişlerin çoğu kontrollü. Kapıda isim verilmesi gerekiyorsa önceden söyle, ismi bildiriyoruz. Blok ve daire numarası olmadan giriş uzuyor.</div>
  <div class="about"><b>Mesafe kısa</b><br>Lefkoşa merkeze yakın olduğu için ulaşım hızlı; 20-30 dakika önceden yazmak yeterli.</div>
  <div class="about"><b>Gündüz</b><br>Öğrenci ve çalışan nüfusu nedeniyle gündüz görüşmesi burada en rahat çalışan hat.</div>
  <h2>${esc(nm)} — sık yapılan hatalar</h2>
  <ul><li>Blok ve daire numarasını vermemek.</li><li>Siteye giriş için isim gerektiğini saklamak.</li><li>Gönyeli ile Hamitköy'ü karıştırıp yanlış kapıya yazmak.</li><li>Nakit olmadan çıkmak.</li></ul>
  <h2>İlk kez yazacaksan</h2>
  <div class="about">Site adı, blok, daire, saat. Kısa süreli görüşme burada mantıklı; adrese çıkışta yine en az 1 saat.</div>`,
    resort: nm => `
  <h2>${esc(nm)} — ne zaman ve nasıl yazmalı</h2>
  <div class="about"><b>Önceden planla</b><br>Bu hat uzak ve tek girişli. En az 1-2 saat önceden yaz; son dakika burada karşılık bulmuyor.</div>
  <div class="about"><b>Ziyaretçi kaydı</b><br>Büyük tesislerin bir kısmı dışarıdan gelen için kayıt istiyor. Hangilerinin istediğini önceden sorup haber veriyoruz.</div>
  <div class="about"><b>Tesis içi mesafe</b><br>Kampüs içi yürümesi uzun; buluşmayı lobide, asansör yanı gibi tek bir noktada netleştiriyoruz.</div>
  <h2>${esc(nm)} — sık yapılan hatalar</h2>
  <ul><li>Son yarım saatte yazmak.</li><li>Otel adı vermeden buluşma istemek.</li><li>Kayıt gerektiğini bilmemek.</li><li>Tesis içinde "kapıda buluşalım" demek.</li></ul>
  <h2>İlk kez yazacaksan</h2>
  <div class="about">Otel adı, saat, süre. Kayıt gerekiyorsa haber veriyoruz. Adrese çıkışta en az 1 saat.</div>`,
    format: nm => `
  <h2>${esc(nm)} — ne zaman ve nasıl yazmalı</h2>
  <div class="about"><b>Önce kapsam</b><br>Bu format süreden çok kapsamla ilgili: nerede başlayıp nerede biteceğini baştan yaz. Belirsiz kalan tek şey sonradan tartışmaya dönüşüyor.</div>
  <div class="about"><b>Giyim ve ortam</b><br>Mekân varsa kodunu önceden söyle. Resepsiyon, davet ve iş yemeği gibi ortamlarda kıyafet uyumu sonradan düzeltilemiyor.</div>
  <div class="about"><b>Plan</b><br>Bu formatta aynı gün müsaitlik sınırlı; 1 gün önceden yazmak seçenek bırakıyor.</div>
  <h2>${esc(nm)} — sık yapılan hatalar</h2>
  <ul><li>Kapsamı tek cümleyle geçiştirmek.</li><li>Mekân adı vermeden "davete gelecek" demek.</li><li>Kıyafet kodunu sonradan değiştirmek.</li><li>Aynı gün geniş program istemek.</li></ul>
  <h2>İlk kez yazacaksan</h2>
  <div class="about">Ortam, saat, süre ve kapsam. Dördü netse geriye soru kalmıyor. 30 dakika yalnızca kendi yerimizde.</div>`,
    profil: nm => `
  <h2>${esc(nm)} — ne zaman ve nasıl yazmalı</h2>
  <div class="about"><b>Dil ve yaş aralığı</b><br>Bu başlık bir bölge değil, bir tercih. Mesajda dil ve yaş aralığı beklentisini yaz; kör gönderim yapılmıyor.</div>
  <div class="about"><b>Müsaitlik</b><br>Bu grupta havuz dar, aynı gün seçenek sınırlı. En az yarım gün önceden yazmak seçenek bırakıyor.</div>
  <div class="about"><b>Bölge</b><br>Profil bölgeye bağlı değil; kaldığın yeri yaz, uygun olanı oraya yönlendiriyoruz. Taksi yine mesafeye göre.</div>
  <h2>${esc(nm)} — sık yapılan hatalar</h2>
  <ul><li>Dil beklentisini yazmamak.</li><li>Aynı gün geniş seçenek beklemek.</li><li>Kaldığı bölgeyi söylememek.</li><li>Nakit olmadan çıkmak.</li></ul>
  <h2>İlk kez yazacaksan</h2>
  <div class="about">Dil, yaş aralığı, bölge ve saat. Bu dördü olmadan liste gönderilemiyor. Adrese çıkışta en az 1 saat.</div>`
  },
  en: {
    kiyi: nm => `
  <h2>${esc(nm)} — when and how to write</h2>
  <div class="about"><b>The strip is long</b><br>Saying "${esc(nm)}" alone is not enough; give the street and the property. We name the meeting point by the venue opposite rather than a door number.</div>
  <div class="about"><b>Season</b><br>In July and August the coast road locks up between 19:00 and 21:00 — write an hour ahead for that window. After October the strip empties and 20 minutes is plenty.</div>
  <div class="about"><b>Getting back at night</b><br>After 23:00 taxis are scarce on the coast road. Take the driver's number for the return, otherwise the walk back is long.</div>
  <h2>${esc(nm)} — common mistakes</h2>
  <ul><li>Writing "${esc(nm)}" with no location pin.</li><li>Not saying in advance that a name is needed at a complex gate.</li><li>Not settling the taxi for the return.</li><li>Turning up without cash.</li></ul>
  <h2>If you are writing for the first time</h2>
  <div class="about">Area, time, duration and a pin. All four in one message and the place is settled in one go. 30 minutes is in-call only; on this strip an outcall starts at 1 hour.</div>`,
    yamac: nm => `
  <h2>${esc(nm)} — when and how to write</h2>
  <div class="about"><b>A pin is essential</b><br>On the hillside the street names are usually missing from the map. Without a pin ten minutes are lost at the gate, which is why we ask for one when booking.</div>
  <div class="about"><b>Narrow roads</b><br>The car cannot reach some villa gates, so we meet on the lower street. We say so up front rather than leaving it as a surprise.</div>
  <div class="about"><b>Timing</b><br>After 18:00 write 1-2 hours ahead; hillside visits are always planned rather than improvised.</div>
  <h2>${esc(nm)} — common mistakes</h2>
  <ul><li>Writing directions instead of sending a pin ("past the abbey, turn right").</li><li>Not giving the villa number.</li><li>Assuming the car can reach the gate.</li><li>Writing 20 minutes before.</li></ul>
  <h2>If you are writing for the first time</h2>
  <div class="about">A pin, a time and a duration. Three things are enough, no directions needed. An outcall starts at 1 hour.</div>`,
    banliyo: nm => `
  <h2>${esc(nm)} — when and how to write</h2>
  <div class="about"><b>Complex gates</b><br>Most entrances here are controlled. If a name has to be given at the barrier, say so in advance and we pass it on. Without a block and flat number entry drags.</div>
  <div class="about"><b>Short distance</b><br>Close to central Nicosia, so the drive is quick; 20-30 minutes ahead is enough.</div>
  <div class="about"><b>Daytime</b><br>With a student and working population, a daytime meeting works more easily on this strip than anywhere else.</div>
  <h2>${esc(nm)} — common mistakes</h2>
  <ul><li>Not giving the block and flat number.</li><li>Keeping quiet about the name needed at the gate.</li><li>Confusing Gonyeli with Hamitkoy and writing to the wrong door.</li><li>Leaving without cash.</li></ul>
  <h2>If you are writing for the first time</h2>
  <div class="about">Complex name, block, flat, time. A short meeting makes sense here; an outcall still starts at 1 hour.</div>`,
    resort: nm => `
  <h2>${esc(nm)} — when and how to write</h2>
  <div class="about"><b>Plan ahead</b><br>This strip is remote with a single entrance. Write at least 1-2 hours ahead; last minute does not land here.</div>
  <div class="about"><b>Visitor logging</b><br>Some of the large properties log outside visitors. We check which ones do and warn you beforehand.</div>
  <div class="about"><b>Distance inside the grounds</b><br>Walking a campus is slow; we fix the meeting point at one spot, for example by the lifts in the lobby.</div>
  <h2>${esc(nm)} — common mistakes</h2>
  <ul><li>Writing half an hour before.</li><li>Fixing a meeting without naming the hotel.</li><li>Not knowing that logging is required.</li><li>Saying "meet at the gate" inside the grounds.</li></ul>
  <h2>If you are writing for the first time</h2>
  <div class="about">Hotel name, time, duration. If logging is needed we tell you. An outcall starts at 1 hour.</div>`,
    format: nm => `
  <h2>${esc(nm)} — when and how to write</h2>
  <div class="about"><b>Scope before duration</b><br>This format is about scope, not minutes: write where it starts and where it ends. Whatever stays vague turns into an argument later.</div>
  <div class="about"><b>Dress and setting</b><br>If there is a venue, give the code in advance. At a reception, a business dinner or a lobby, the dress cannot be corrected afterwards.</div>
  <div class="about"><b>Planning</b><br>Same-day availability is thin for this format; a day's notice keeps options open.</div>
  <h2>${esc(nm)} — common mistakes</h2>
  <ul><li>Summing up the scope in half a sentence.</li><li>Saying "coming to a reception" without naming the venue.</li><li>Changing the dress code afterwards.</li><li>Asking for a long programme on the same day.</li></ul>
  <h2>If you are writing for the first time</h2>
  <div class="about">Setting, time, duration and scope. With those four nothing is left to ask. 30 minutes is in-call only.</div>`,
    profil: nm => `
  <h2>${esc(nm)} — when and how to write</h2>
  <div class="about"><b>Language and age range</b><br>This is a preference, not an area. State the language and age range you expect; we do not send a blind list.</div>
  <div class="about"><b>Availability</b><br>The pool in this group is small and same-day choice is limited. Half a day's notice keeps options open.</div>
  <div class="about"><b>Area</b><br>Profiles are not tied to an area; give where you are staying and the suitable one is sent there. The taxi is still by distance.</div>
  <h2>${esc(nm)} — common mistakes</h2>
  <ul><li>Not stating the language you need.</li><li>Expecting a wide choice on the same day.</li><li>Not saying where you are staying.</li><li>Leaving without cash.</li></ul>
  <h2>If you are writing for the first time</h2>
  <div class="about">Language, age range, area and time. Without those four no list can be sent. An outcall starts at 1 hour.</div>`
  },
  ru: {
    kiyi: nm => `
  <h2>${esc(nm)} — когда и как писать</h2>
  <div class="about"><b>Линия длинная</b><br>Сказать только «${esc(nm)}» недостаточно: нужна улица и объект. Точку встречи называем по заведению напротив, а не по номеру калитки.</div>
  <div class="about"><b>Сезон</b><br>В июле и августе прибрежная дорога встаёт с 19:00 до 21:00 — на это окно писать за час. После октября линия пустеет, хватает 20 минут.</div>
  <div class="about"><b>Обратная дорога ночью</b><br>После 23:00 такси на прибрежной дороге почти нет. Возьмите номер водителя на обратный путь, иначе идти пешком далеко.</div>
  <h2>${esc(nm)} — частые ошибки</h2>
  <ul><li>Писать «${esc(nm)}» без локации.</li><li>Не предупредить, что на воротах комплекса нужно имя.</li><li>Не договориться о такси на обратный путь.</li><li>Приезжать без наличных.</li></ul>
  <h2>Если пишете впервые</h2>
  <div class="about">Район, время, длительность и локация. Если всё четыре в одном сообщении, место решается сразу. 30 минут — только у нас; на этой линии выезд от 1 часа.</div>`,
    yamac: nm => `
  <h2>${esc(nm)} — когда и как писать</h2>
  <div class="about"><b>Локация обязательна</b><br>На склоне названий улиц на карте обычно нет. Без локации у калитки теряется десять минут, поэтому просим её при брони.</div>
  <div class="about"><b>Узкие дороги</b><br>Машина не всегда доезжает до калитки виллы — встречаемся на нижней улице. Говорим об этом сразу, чтобы не было сюрприза.</div>
  <div class="about"><b>Время</b><br>После 18:00 писать за 1-2 часа: выезд на склон всегда планируется.</div>
  <h2>${esc(nm)} — частые ошибки</h2>
  <ul><li>Писать объяснение вместо локации («за монастырём, направо»).</li><li>Не назвать номер виллы.</li><li>Считать, что машина доедет до калитки.</li><li>Писать за 20 минут.</li></ul>
  <h2>Если пишете впервые</h2>
  <div class="about">Локация, время, длительность. Трёх вещей достаточно, объяснения не нужны. С выездом минимум час.</div>`,
    banliyo: nm => `
  <h2>${esc(nm)} — когда и как писать</h2>
  <div class="about"><b>Ворота комплекса</b><br>Большинство входов здесь контролируемые. Если на воротах нужно имя, предупредите заранее — сообщим. Без блока и квартиры вход затягивается.</div>
  <div class="about"><b>Близко</b><br>До центра Никосии недалеко, дорога быстрая; хватает 20-30 минут.</div>
  <div class="about"><b>День</b><br>Здесь живут студенты и работающие, поэтому дневная встреча на этой линии проходит легче всего.</div>
  <h2>${esc(nm)} — частые ошибки</h2>
  <ul><li>Не дать блок и квартиру.</li><li>Скрыть, что на воротах нужно имя.</li><li>Путать Гёнйели и Хамиткёй и писать не к той двери.</li><li>Выезжать без наличных.</li></ul>
  <h2>Если пишете впервые</h2>
  <div class="about">Название комплекса, блок, квартира, время. Короткая встреча здесь уместна; с выездом всё равно от часа.</div>`,
    resort: nm => `
  <h2>${esc(nm)} — когда и как писать</h2>
  <div class="about"><b>Планировать заранее</b><br>Линия дальняя и с одним входом. Писать минимум за 1-2 часа; в последний момент здесь не получается.</div>
  <div class="about"><b>Запись посетителя</b><br>Часть больших объектов записывает внешних посетителей. Мы уточняем, где это нужно, и предупреждаем заранее.</div>
  <div class="about"><b>Расстояния внутри</b><br>Территория большая, идти долго; точку встречи фиксируем в одном месте — например, у лифтов в лобби.</div>
  <h2>${esc(nm)} — частые ошибки</h2>
  <ul><li>Писать за полчаса.</li><li>Назначать встречу, не назвав отель.</li><li>Не знать, что нужна запись.</li><li>Говорить «встретимся у ворот» внутри территории.</li></ul>
  <h2>Если пишете впервые</h2>
  <div class="about">Название отеля, время, длительность. Если нужна запись — сообщим. С выездом минимум час.</div>`,
    format: nm => `
  <h2>${esc(nm)} — когда и как писать</h2>
  <div class="about"><b>Сначала объём</b><br>Этот формат про объём, а не про минуты: напишите, где начинается и где заканчивается. Всё неясное потом превращается в спор.</div>
  <div class="about"><b>Одежда и обстановка</b><br>Если есть заведение, назовите дресс-код заранее. На приёме, деловом ужине или в лобби одежду потом не исправить.</div>
  <div class="about"><b>План</b><br>Свободных в тот же день мало; за день до встречи выбор шире.</div>
  <h2>${esc(nm)} — частые ошибки</h2>
  <ul><li>Объяснять объём одной фразой.</li><li>Говорить «приедет на приём», не назвав заведение.</li><li>Менять дресс-код потом.</li><li>Просить длинную программу в тот же день.</li></ul>
  <h2>Если пишете впервые</h2>
  <div class="about">Обстановка, время, длительность, объём. Если всё четыре ясны, вопросов не остаётся. 30 минут — только у нас.</div>`,
    profil: nm => `
  <h2>${esc(nm)} — когда и как писать</h2>
  <div class="about"><b>Язык и возраст</b><br>Это не район, а пожелание. Напишите ожидаемый язык и возраст; подборку вслепую не отправляем.</div>
  <div class="about"><b>Свободные</b><br>В этой группе выбор небольшой, на сегодня — ограничен. За полдня до встречи вариантов больше.</div>
  <div class="about"><b>Район</b><br>Профиль не привязан к району: напишите, где остановились, и подходящую отправят туда. Такси по-прежнему по расстоянию.</div>
  <h2>${esc(nm)} — частые ошибки</h2>
  <ul><li>Не назвать нужный язык.</li><li>Ждать широкий выбор в тот же день.</li><li>Не сказать, где остановились.</li><li>Выезжать без наличных.</li></ul>
  <h2>Если пишете впервые</h2>
  <div class="about">Язык, возраст, район и время. Без этих четырёх подборку не отправить. С выездом минимум час.</div>`
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
<link rel="preload" as="image" href="${esc(o.img)}" fetchpriority="high">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${esc(o.img)}">` : '<meta name="twitter:card" content="summary">'}
<meta name="theme-color" content="#0b121b">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath d='M32 2 62 32 32 62 2 32Z' fill='%231e2a40' stroke='%23f0d9ae' stroke-opacity='.55' stroke-width='2'/%3E%3Ctext x='32' y='41' font-family='Georgia' font-size='23' font-weight='700' text-anchor='middle'%3E%3Ctspan fill='%23ff3b5c'%3ER%3C/tspan%3E%3Ctspan fill='%23ffffff'%3EK%3C/tspan%3E%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://accerzwswgiqhtfgoeqv.supabase.co/" crossorigin>
<style>${S.css}
main a:not(.btn):not(.btn-o){text-decoration:underline;text-underline-offset:2px}
${S.icerik}</style>
${o.ld || ''}
</head><body>
${S.header({ aktif: o.url, dil: o.dil, ceviriler: o.ceviriler })}
<main class="wrap">
${o.icerik}
</main>
${S.footer(o.dil)}
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
  const fiyatCumle = F.cevap(dil);
  const cevap = s => esc(String(s == null ? '' : s).replace(/\{fiyat\}/g, fiyatCumle));
  const cevapDuz = s => String(s == null ? '' : s).replace(/\{fiyat\}/g, fiyatCumle);

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
          const hedef = BASE + kok(dil) + '/blog/' + slug;
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

    const kk = kok(dil);
    const bolgeler = ['girne-escort','lefkosa-escort','magusa-escort','iskele-escort','guzelyurt-escort']
      .filter(k => D[dil][k])
      .map(k => `<a class="btn-o" href="${BASE}${kk}/${k}">${esc(D[dil][k].nm)}</a>`).join('');
    const populer = [
      ['fiyatlar', t.p1], ['blog/girne-escort-fiyatlari', t.p2], ['blog/turkce-bilen-escort', t.p3],
      ['blog/gecelik-escort-fiyat', t.p4], ['blog/otele-escort', t.p5], ['blog', t.p6], ['iletisim', t.p7]
    ].map(x => `<a class="btn-o" href="${BASE}${kk}/${x[0]}">${esc(x[1])}</a>`).join('');

    const y404 = `
<style>
.y404{text-align:center;padding:6px 0 0}
.y404-mark{width:86px;height:86px;margin:4px auto 20px;position:relative}
.y404-mark i{position:absolute;inset:0;border:1px solid rgba(216,184,120,.35);transform:rotate(45deg);border-radius:16px}
.y404-mark i:nth-child(2){inset:14px;border-color:rgba(216,184,120,.6)}
.y404-mark i:nth-child(3){inset:29px;background:linear-gradient(160deg,#f0d9ae,#d8b878);border:0;border-radius:9px;box-shadow:0 0 34px rgba(216,184,120,.35)}
.y404-code{font-family:Georgia,serif;font-size:clamp(58px,14vw,96px);line-height:1;letter-spacing:-.03em;color:transparent;background:linear-gradient(180deg,#fff,#d8b878);-webkit-background-clip:text;background-clip:text;margin-bottom:4px}
.y404 h1{font-size:clamp(22px,4.6vw,32px);margin:0 0 10px}
.y404 p{max-width:54ch;margin:0 auto 24px}
.y404-acts{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:6px}
.y404-acts .btn{background:linear-gradient(180deg,#3ae07d,#1fbb56);color:#04270f;padding:13px 24px;font-size:14.5px;box-shadow:0 10px 26px -14px #25d366}
.y404-acts .btn.tg{background:linear-gradient(180deg,#4bb8ea,#229ed9);color:#04202e;box-shadow:0 10px 26px -14px #229ed9}
.y404-home{background:linear-gradient(180deg,#f0d9ae,#d8b878);color:#121a24;font-weight:700;padding:13px 24px;font-size:14.5px}
.y404 h2{font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:#d8b878;margin:34px 0 12px}
.y404-links{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
</style>
<div class="y404">
  <div class="y404-mark" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="y404-code" aria-hidden="true">404</div>
  <h1>${esc(t.s404)}</h1>
  <p class="lead">${esc(t.s404alt)}</p>
  <div class="y404-acts">
    <a class="btn" href="${WA}" target="_blank" rel="noopener" data-base="${WA}">${esc(t.s404cat)}</a>
    <a class="btn tg" href="${TG}" target="_blank" rel="noopener" data-base="${TG}">${esc(t.tgY)}</a>
    <a class="btn-o y404-home" href="${BASE}${kk}/">${esc(t.s404home)}</a>
  </div>
  <h2>${esc(t.s404bolge)}</h2>
  <div class="y404-links">${bolgeler}</div>
  <h2>${esc(t.s404pop)}</h2>
  <div class="y404-links">${populer}</div>
</div>`;

    let h404 = sayfa({
      dil, title: t.yok + ' | RedKıbrıs', desc: t.yokD, url, robots: 'noindex,follow',
      icerik: y404
    });
    const n404 = S.nonce();
    h404 = S.noncele(h404, n404);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Security-Policy', S.csp(n404));
    res.status(404).send(h404);
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
    ? 'Эскорт ' + esc(C2.nm) + ' — <span style="font-size:.55em;color:#93a0b4;font-weight:400">' + esc(C2.alt) + '</span>'
    : esc(nmE) + ' — <span style="font-size:.55em;color:#93a0b4;font-weight:400">' + esc(C2.alt) + '</span>';

  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'Service', serviceType: nmE,
      areaServed: C2.areas, url: url,
      ...(img ? { image: img } : {}),
      provider: { '@type': 'Organization', name: 'RedKıbrıs' },
      offers: F.ld(dil).offers
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
        acceptedAnswer: { '@type': 'Answer', text: cevapDuz(x[1]) }
      }))
    }
  ];

  const digerleri = Object.keys(D[dil]).filter(k => k !== slug)
    .map(k => `<a class="btn-o" href="${BASE}${kok(dil)}/${k}">${esc(D[dil][k].nm)}</a>`).join('');

  const ekMetin = String(C2.ek || '');
  const kemer = !ekMetin && C2.kemer && KEMER[dil][C2.kemer]
    ? KEMER[dil][C2.kemer](C2.nm)
    : '';

  const fiyatHtml = F.satir(dil);

  const icerik = `
  <div class="crumb"><a href="${BASE}${kok(dil)}/">${esc(t.ana)}</a> › <span>${esc(dil === 'ru' ? cap(C2.nm) : C2.nm)}</span></div>
  <h1>${h1}</h1>
  <p class="lead">${esc(C2.lead)}</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:8px">
    <a class="btn wa" href="${WA}" target="_blank" rel="noopener" data-base="${WA}">${esc(t.katalog(C2.nm))}</a>
    <a class="btn tg" href="${TG}" target="_blank" rel="noopener" data-base="${TG}">${esc(t.tg)}</a>
    <a class="btn-o" href="${BASE}${kok(dil)}/fiyatlar">${esc(t.fiyat)}</a>
  </div>
  ${img ? `<img class="rimg" src="${esc(img)}" alt="${esc(nmE)}" width="1200" height="700" fetchpriority="high" decoding="async">` : ''}
  <div class="about">${esc(C2.metin)}</div>
  <div class="about">${C2.metin2}</div>
  <div class="about"><b>${esc(t.noktalar)}</b><br>${C2.areas.map(esc).join(' · ')}</div>
  <div class="about"><b>${esc(t.oteller)}</b><br>${C2.otel.map(esc).join(' · ')}</div>
  <h2>${esc(t.fiyatB(C2.nm))}</h2>
  ${fiyatHtml}
  <div class="about">${t.tarife}</div>
  ${ekMetin}
  ${kemer}
  <p class="guncel">${esc(t.guncel)}${bugun(dil)}</p>
  <section class="sect">
    <h2>${esc(t.sssB(C2.nm))}</h2>
    ${(C2.sss || []).map(x => `<div class="about"><b>${esc(x[0])}</b><br>${cevap(x[1])}</div>`).join('')}
  </section>
  <section class="sect">
    <h2>${esc(t.diger)}</h2>
    <div style="display:flex;gap:8px;flex-wrap:wrap">${digerleri}</div>
  </section>
  <div class="about"><b>${esc(t.sorun)}</b><br>${esc(t.alt)}
    <br><a class="btn wa" href="${WA}" target="_blank" rel="noopener" data-base="${WA}">${esc(t.wa)}</a>
    <a class="btn tg" href="${TG}" target="_blank" rel="noopener" data-base="${TG}">${esc(t.tgY)}</a>
  </div>`;

  let html = sayfa({
    dil, title, desc, url, img, icerik, alternates, ceviriler,
    ld: ld.map(ldYaz).join('')
  });
  const n = S.nonce();
  html = S.noncele(html, n);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=1800, stale-while-revalidate=86400');
  res.setHeader('Content-Security-Policy', S.csp(n));
  res.status(200).send(html);
};
