// data/regions.ek.js — yeni açılan semt sayfaları (TR)
// regions.js'e Object.assign ile eklenir, ayrı tutulur ki dosya şişmesin

module.exports = {
"girne-merkez-escort":{nm:"Girne Merkez",alt:"Kale arkası, çarşı ve kordon",kemer:"kiyi",
lead:"Girne merkez escort: kale arkası, çarşı ve kordon hattı. Yürüme mesafesinde buluşma, otel ve eve çıkış, kapora yok.",
areas:["Kale arkası","Çarşı içi","Kordon arkası","Eski liman üstü"],
otel:["Arkin Colony","Vuni Palace","Merkez butik oteller"],
metin:"Girne merkez adanın en yoğun escort hattı: kale arkası, çarşı ve kordon birkaç dakika içinde. Yürüyerek buluşmak burada gerçekten mümkün, araç gerekmiyor. Casino çıkışı ve geç saat talebi en çok bu hatta geliyor.",
metin2:"Merkezde taksi ücreti mesafeye göre hesaplanıp önceden söyleniyor, kapıda değişmiyor. 30 dakika yalnızca kendi yerimizde; otele çıkışta en az 1 saat. Ödeme görüşmenin başında, kapora yok.",
ek:`<h2>Merkezde nerede buluşulur</h2>
<div class="about"><b>Kale arkası</b><br>Yürünebilir, kalabalık ve geç saate kadar canlı. Buluşmayı kapı numarasıyla değil, karşıdaki mekânın adıyla veriyoruz.</div>
<div class="about"><b>Çarşı ve kordon arkası</b><br>Sokak araları dar; araç bazı noktalara girmiyor. Kordon tarafında buluşup yürümek daha hızlı sonuç veriyor.</div>
<div class="about"><b>Otel</b><br>Merkez otellerinde lobi buluşması standart. Odaya çıkış istiyorsan önceden söyle, resepsiyona isim bırakmadan ilerliyoruz.</div>
<h2>Gece ve casino çıkışı</h2>
<div class="about">Casino ve bar çıkışı bu hatta toplanıyor. 22:00 sonrası 10-15 dakika önceden yazman yeterli, merkezde bekleme olmuyor.</div>
<div class="about">Dönüş için şoför numarası almanı öneririz; kale arkasında gece 01:00 sonrası boş taksi azalıyor.</div>`,
sss:[["Girne merkez escort fiyatları ne kadar?","{fiyat}. Tarife sabit, kapıda değişmez."],["Merkezde yürüyerek buluşabilir miyiz?","Evet, kale arkası ve kordon hattı yürünebilir. Buluşma noktasını mekân adıyla netleştiriyoruz."],["Casino çıkışı gelebilir misiniz?","Evet, gece dahil. Merkezde bekleme olmuyor."],["Otele 30 dakika olur mu?","Olmaz. 30 dakika yalnızca kendi yerimizde, adrese çıkışta en az 1 saat."],["Ödeme nasıl yapılıyor?","Görüşmenin başında nakit, IBAN veya USDT. Kapora yok."]]},

"girne-liman-escort":{nm:"Girne Liman",alt:"Eski liman ve Kale çevresi",kemer:"kiyi",
lead:"Girne liman escort: eski liman, Kale ve bar sokağı. Yürüme mesafesinde buluşma, gece hattı, kapora yok.",
areas:["Eski liman","Kale çevresi","Bar sokağı","Liman arkası"],
otel:["Liman butik otelleri","Dome çevresi konaklama","Kale çevresi apartlar"],
metin:"Liman hattı Girne'nin en kolay buluşulan noktası: her şey yürüme mesafesinde ve akşam boyunca kalabalık. Yemekten sonra bara geçmek isteyenlerin ilk tercihi burası. Araç gerekmiyor, taksi ücreti de çoğu zaman devreye girmiyor.",
metin2:"Liman kalabalığında kaybolmamak için buluşma noktasını kapı olarak değil, karşıdaki mekânın adıyla veriyoruz. 22:00 sonrası 10-15 dakika önceden yazman yeterli. Ödeme görüşmenin başında, kapora yok.",
ek:`<h2>Limanda nasıl buluşuluyor</h2>
<div class="about"><b>Bar sokağı</b><br>Akşam 21:00 sonrası en kalabalık nokta. Buluşmayı barın adıyla ver, kapı önünde beklemek yerine içeride buluş.</div>
<div class="about"><b>Kale çevresi</b><br>Daha sakin, yürüyerek iki dakika. Gündüz görüşmesi için limanın en rahat noktası.</div>
<div class="about"><b>Otel ve apart</b><br>Limanda butik oteller var; lobi buluşması standart. Apartlarda kapıya çıkış önceden konuşulur.</div>
<h2>Gece hattı</h2>
<div class="about">Liman gece 02:00'ye kadar canlı; bu saatten sonra müsaitlik merkeze kayıyor. Geç plan için önceden yaz.</div>`,
sss:[["Girne liman escort fiyatları ne kadar?","{fiyat}. Tarife sabit."],["Limanda nerede buluşuyoruz?","Bar sokağı, Kale çevresi ya da otel lobisi. Mekân adıyla netleştiriyoruz."],["Gece geç saat olur mu?","02:00'ye kadar olur, sonrası için önceden yazman gerekir."],["Otele 30 dakika olur mu?","Olmaz, adrese çıkışta en az 1 saat."],["Ödeme nasıl yapılıyor?","Görüşmenin başında nakit, IBAN veya USDT. Kapora yok."]]},

"girne-zeytinlik-escort":{nm:"Zeytinlik",alt:"Merkeze yakın site ve apart hattı",kemer:"banliyo",
lead:"Zeytinlik escort: merkeze yürüme mesafesinde site ve apart ağırlıklı hat. Kapıda isim bildiriliyor, kapora yok.",
areas:["Zeytinlik merkez","Site içleri","Apart blokları","Merkez bağlantısı"],
otel:["Zeytinlik apartları","Site konaklamaları","Merkez otelleri"],
metin:"Zeytinlik merkeze en yakın yerleşim hattı: site ve apart ağırlıklı, sokakları sakin. Merkeze yürüyerek de gidilebildiği için ulaşım sorun olmuyor. Gündüz görüşmesi ve kısa program burada rahat çalışıyor.",
metin2:"Site girişlerinin çoğu kontrollü; kapıda isim verilmesi gerekiyorsa önceden söyle, bildiriyoruz. Blok ve daire numarası olmadan giriş uzuyor. Ödeme görüşmenin başında, kapora yok.",
ek:`<h2>Zeytinlik'te nasıl buluşulur</h2>
<div class="about"><b>Site kapısı</b><br>Kontrollü girişlerde isim gerekiyor. Önceden haber verirsen kapıya bildiriyoruz, bekleme olmuyor.</div>
<div class="about"><b>Apart ve blok</b><br>Blok, kat ve daire numarası olmadan giriş on dakika uzuyor. Üçünü tek mesajda yaz.</div>
<div class="about"><b>Merkez bağlantısı</b><br>Yürüme mesafesinde olduğu için taksi çoğu zaman gerekmiyor; gece dönüşte yine mesafeye göre ücret alınır.</div>
<h2>Saat</h2>
<div class="about">Gündüz 12:00-17:00 en sakin aralık, 20-30 dakika önceden yazman yeterli. Akşam için 1 saat önceden yaz.</div>`,
sss:[["Zeytinlik escort fiyatları ne kadar?","{fiyat}. Tarife sabit."],["Siteye girişte isim gerekiyor mu?","Gerekiyorsa önceden söyle, kapıya bildiriyoruz."],["Merkeze yürüme mesafesinde mi?","Evet, Zeytinlik merkeze bitişik."],["Otele 30 dakika olur mu?","Olmaz, adrese çıkışta en az 1 saat."],["Ödeme nasıl yapılıyor?","Görüşmenin başında nakit, IBAN veya USDT."]]},

"girne-karakum-escort":{nm:"Karakum",alt:"Kervansaray ve plaj hattı",kemer:"kiyi",
lead:"Karakum escort: sahil otelleri ve plaj hattı. Otel içi görüşme, mesafeye göre taksi, kapora yok.",
areas:["Karakum plajı","Kervansaray çevresi","Sahil otelleri","Karaoğlanoğlu bağlantısı"],
otel:["Kervansaray","Sahil otelleri","Plaj çevresi apartlar"],
metin:"Karakum sahil hattı: plaj, oteller ve yaz boyunca kalabalık. Merkeze yakın olduğu için ulaşım kısa sürüyor. Plaj sonrası gündüz görüşmesi burada en rahat çalışan hat.",
metin2:"Taksi ücreti mesafeye göre hesaplanıp önceden söyleniyor. Sahil otellerinde lobi buluşması standart, odanıza çıkış için önceden haber vermen yeterli. Yaz sezonunda akşam 19:00-21:00 trafiği kilit, o saat için 1 saat önceden yaz.",
ek:`<h2>Karakum'da nasıl buluşulur</h2>
<div class="about"><b>Plaj hattı</b><br>Gündüz görüşmesi için en rahat nokta. Buluşmayı plaj girişi ya da karşıdaki tesis adıyla ver.</div>
<div class="about"><b>Otel</b><br>Lobide buluşma standart; odaya çıkış istiyorsan önceden söyle.</div>
<div class="about"><b>Sezon</b><br>Temmuz-ağustos akşam saatlerinde sahil yolu tıkanıyor. O saat dilimi için 1 saat önceden yazman gerekir.</div>
<h2>Dönüş</h2>
<div class="about">23:00 sonrası sahil yolunda boş taksi azalıyor, dönüş için şoför numarası almanı öneririz.</div>`,
sss:[["Karakum escort fiyatları ne kadar?","{fiyat}. Tarife sabit."],["Plajdan sonra görüşme olur mu?","Olur, gündüz de çalışıyoruz."],["Hangi otellere geliyorsunuz?","Kervansaray ve sahil otelleri başta olmak üzere."],["Otele 30 dakika olur mu?","Olmaz, adrese çıkışta en az 1 saat."],["Ödeme nasıl yapılıyor?","Görüşmenin başında nakit, IBAN veya USDT."]]},

"girne-nusmar-escort":{nm:"Nusmar",alt:"Market çevresi villa ve site hattı",kemer:"banliyo",
lead:"Nusmar escort: Nusmar Market çevresi, villa ve site ağırlıklı. Kapıda isim bildiriliyor, kapora yok.",
areas:["Nusmar Market çevresi","Villa siteleri","Sahil bağlantısı","Alsancak yolu"],
otel:["Site konaklamaları","Villa kiralıkları","Sahil otelleri"],
metin:"Nusmar, Alsancak yönünde villa ve sitelerin yoğunlaştığı hat. Market çevresi referans noktası olduğu için tarif kolay. Araçla geliniyor, site girişlerinde isim bildiriyoruz.",
metin2:"Konum linki tariften daha hızlı sonuç veriyor; villa numarası olmadan kapıda zaman kaybediliyor. Taksi ücreti mesafeye göre önceden söylenir. Ödeme görüşmenin başında, kapora yok.",
ek:`<h2>Nusmar'da nasıl buluşulur</h2>
<div class="about"><b>Konum linki</b><br>Villa sokakları haritada çoğu zaman isimsiz. Link gelmezse kapıda on dakika kaybediliyor.</div>
<div class="about"><b>Site kapısı</b><br>Kontrollü sitelerde isim gerekiyor, önceden haber veriyorsun.</div>
<div class="about"><b>Saat</b><br>Akşam 18:00 sonrası için 1-2 saat önceden yaz; villa hattı planlı çalışıyor.</div>
<h2>Sık yapılan hata</h2>
<div class="about">"Nusmar" deyip market adı vermemek. Market adı ya da konum linki olmadan buluşma uzuyor.</div>`,
sss:[["Nusmar escort fiyatları ne kadar?","{fiyat}. Tarife sabit."],["Villaya gelir misiniz?","Evet, konum linki ve villa numarası yeterli."],["Siteye girişte isim gerekiyor mu?","Gerekiyorsa önceden söyle, bildiriyoruz."],["Otele 30 dakika olur mu?","Olmaz, adrese çıkışta en az 1 saat."],["Ödeme nasıl yapılıyor?","Görüşmenin başında nakit, IBAN veya USDT."]]},

"girne-karmi-escort":{nm:"Karmi",alt:"Yamaç köy ve villa hattı",kemer:"yamac",
lead:"Karmi escort: yamaç köy dokusu ve villalar. Konum linki şart, dar yollar, kapora yok.",
areas:["Karmi köy içi","Yamaç villaları","Karmi Village çevresi","Alsancak bağlantısı"],
otel:["Karmi butik konaklama","Yamaç villaları","Köy evleri"],
metin:"Karmi dar yollar ve yamaç villalardan oluşuyor; köy dokusu korunmuş. Adres bulmak zor olduğu için rezervasyonda konum linki istiyoruz. Araç bazı kapılara kadar çıkamıyor, buluşmayı alt sokakta yapıyoruz.",
metin2:"Akşam çıkışları planlı: 18:00 sonrası için 1-2 saat önceden yaz. Taksi ücreti mesafeye göre önceden söylenir, kapıda değişmez. Ödeme görüşmenin başında, kapora yok.",
ek:`<h2>Karmi'de nasıl buluşulur</h2>
<div class="about"><b>Konum linki zorunlu</b><br>Köy içi sokakların çoğu haritada yok. Link olmadan kapıda arama kaçınılmaz.</div>
<div class="about"><b>Dar yol</b><br>Araç her villanın kapısına çıkamıyor; alt sokakta buluşup yukarı yürüyoruz. Bunu baştan söylüyoruz.</div>
<div class="about"><b>Villa numarası</b><br>Villa adı ve numarası olmadan hangi kapı olduğu bulunmuyor.</div>
<h2>Saat</h2>
<div class="about">Gündüz 12:00-17:00 arası rahat. Akşam için 1-2 saat önceden yaz, yamaç hattı gece planlı çalışıyor.</div>`,
sss:[["Karmi escort fiyatları ne kadar?","{fiyat}. Tarife sabit."],["Karmi'ye gelir misiniz?","Evet, konum linki gönderirsen sorun olmaz."],["Araç kapıya kadar gelir mi?","Bazı villalarda hayır, alt sokakta buluşuyoruz."],["Otele 30 dakika olur mu?","Olmaz, adrese çıkışta en az 1 saat."],["Ödeme nasıl yapılıyor?","Görüşmenin başında nakit, IBAN veya USDT."]]},

"lefkosa-kumsal-escort":{nm:"Kumsal",alt:"Üniversite çevresi, öğrenci apartları",kemer:"banliyo",
lead:"Kumsal escort: üniversite çevresi ve öğrenci apartları. Gündüz görüşmesi, kısa program, kapora yok.",
areas:["Kumsal merkez","Üniversite çevresi","Öğrenci apartları","Dereboyu bağlantısı"],
otel:["Öğrenci apartları","Site daireleri","Merkez otelleri"],
metin:"Kumsal üniversite hattı: apartlar, öğrenci evleri ve kafeler. Girişler genelde serbest, kapıda sorun çıkmıyor. Gündüz görüşmesi ve kısa program için Lefkoşa'nın en rahat hattı.",
metin2:"Kat ve daire numarası olmadan giriş uzuyor; ikisini de yaz. Taksi ücreti mesafeye göre hesaplanıp önceden söyleniyor. Ödeme görüşmenin başında, kapora yok.",
ek:`<h2>Kumsal'da nasıl buluşulur</h2>
<div class="about"><b>Apart ve daire</b><br>Kat ve daire numarası olmadan bina içinde kaybolunuyor. İkisini tek mesajda yaz.</div>
<div class="about"><b>Gündüz</b><br>Öğle ve ikindi saatleri en rahat aralık; 20-30 dakika önceden yazman yeterli.</div>
<div class="about"><b>Kısa program</b><br>Öğrenci hattında 1 saat en çok seçilen süre. 30 dakika yalnızca kendi yerimizde.</div>
<h2>Akşam</h2>
<div class="about">18:00 sonrası 1 saat önceden yaz. Dereboyu hattına yürüme mesafesinde olduğu için gece planına devam etmek kolay.</div>`,
sss:[["Kumsal escort fiyatları ne kadar?","{fiyat}. Tarife sabit."],["Öğrenci evine gelir misiniz?","Evet, kat ve daire numarası yeterli."],["Gündüz görüşme olur mu?","Olur, öğle ve ikindi saatleri müsait."],["Otele 30 dakika olur mu?","Olmaz, adrese çıkışta en az 1 saat."],["Ödeme nasıl yapılıyor?","Görüşmenin başında nakit, IBAN veya USDT."]]},

"lefkosa-haspolat-escort":{nm:"Haspolat",alt:"Gönyeli yolu, site ve sanayi çevresi",kemer:"banliyo",
lead:"Haspolat escort: Gönyeli yolu üzeri, site ve apart hattı. Kapıda isim bildiriliyor, kapora yok.",
areas:["Haspolat merkez","Site içleri","Gönyeli yolu","Sanayi çevresi"],
otel:["Site konaklamaları","Apart blokları","Gönyeli otelleri"],
metin:"Haspolat Gönyeli yoluna bağlı, site ve apart ağırlıklı bir hat. Merkeze ve Gönyeli'ye yakın olduğu için ulaşım kısa. Gündüz görüşmesi burada da rahat çalışıyor.",
metin2:"Site girişlerinde isim verilmesi gerekiyorsa önceden söyle, kapıya bildiriyoruz. Blok ve daire numarası girişi hızlandırıyor. Taksi ücreti mesafeye göre önceden söylenir, kapora yok.",
ek:`<h2>Haspolat'ta nasıl buluşulur</h2>
<div class="about"><b>Site kapısı</b><br>Kontrollü sitelerde isim gerekiyor; önceden haber veriyorsun.</div>
<div class="about"><b>Blok ve daire</b><br>İkisi olmadan giriş uzuyor, tek mesajda yaz.</div>
<div class="about"><b>Ulaşım</b><br>Gönyeli ve Lefkoşa merkeze yakın; 20-30 dakika önceden yazmak yeterli.</div>
<h2>Sık yapılan hata</h2>
<div class="about">Gönyeli ile Haspolat'ı karıştırıp yanlış siteye yazmak. Site adını mutlaka yaz.</div>`,
sss:[["Haspolat escort fiyatları ne kadar?","{fiyat}. Tarife sabit."],["Siteye girişte isim gerekiyor mu?","Gerekiyorsa önceden söyle, bildiriyoruz."],["Gönyeli'ye ne kadar uzak?","Bitişik hat, ulaşım kısa sürüyor."],["Otele 30 dakika olur mu?","Olmaz, adrese çıkışta en az 1 saat."],["Ödeme nasıl yapılıyor?","Görüşmenin başında nakit, IBAN veya USDT."]]},

"magusa-maras-escort":{nm:"Maraş",alt:"Kapalı oteller ve sahil villaları",kemer:"kiyi",
lead:"Maraş escort: kapalı oteller hattı ve sahil villaları. Boş villa buluşması, gündüz görüşmesi, kapora yok.",
areas:["Maraş sahil hattı","Boş villalar","Kapalı otel çevresi","Palm Beach yolu"],
otel:["Maraş villaları","Sahil apartları","Palm Beach çevresi"],
metin:"Maraş kapalı oteller hattı ve boş villalarıyla biliniyor. Sessiz olduğu için gündüz görüşmesi rahat; havuzlu villa ayarlanabiliyorsa en iyisi. Sahil boyunca yürüme mesafesi uzun, buluşma noktasını önceden netleştiriyoruz.",
metin2:"Taksi ücreti mesafeye göre hesaplanıp önceden söyleniyor. Villa adı ve numarası olmadan kapı bulunmuyor. Ödeme görüşmenin başında, kapora yok.",
ek:`<h2>Maraş'ta nasıl buluşulur</h2>
<div class="about"><b>Boş villa</b><br>Havuzlu boş villa bu hattın en iyi seçeneği. Villa adı ve numarası olmadan kapı bulunmuyor.</div>
<div class="about"><b>Sahil hattı</b><br>Gündüz görüşmesi için en rahat nokta. Buluşmayı karşıdaki tesis adıyla ver.</div>
<div class="about"><b>Kapalı otel çevresi</b><br>Sessiz ve boş; gece dönüş için şoför numarası almanı öneririz.</div>
<h2>Saat</h2>
<div class="about">Gündüz 12:00-17:00 arası en sakin aralık. Akşam için 1 saat önceden yaz.</div>`,
sss:[["Maraş escort fiyatları ne kadar?","{fiyat}. Tarife sabit."],["Boş villada görüşme olur mu?","Olur, villa adı ve numarası yeterli."],["Gündüz görüşme olur mu?","Olur, Maraş gündüz için en rahat hat."],["Otele 30 dakika olur mu?","Olmaz, adrese çıkışta en az 1 saat."],["Ödeme nasıl yapılıyor?","Görüşmenin başında nakit, IBAN veya USDT."]]},

"magusa-tuzla-escort":{nm:"Tuzla",alt:"Sahil köyü, sakin hat",kemer:"resort",
lead:"Tuzla escort: sahil köyü ve sakin çevre. Planlı randevu, konum linki, kapora yok.",
areas:["Tuzla merkez","Sahil hattı","Köy çevresi","Yeniboğaziçi yolu"],
otel:["Tuzla sahil tesisleri","Köy konaklamaları","Sahil apartları"],
metin:"Tuzla Mağusa'nın kuzeyinde sakin bir sahil köyü. Hat uzak olduğu için planlı randevu mantığı işliyor; son dakika karşılık bulmuyor. Köy içinde adres tarifi zor, konum linki istiyoruz.",
metin2:"En az 45 dakika önceden yazman gerekiyor. Taksi ücreti mesafeye göre hesaplanıp önceden söylenir, kapıda değişmez. Ödeme görüşmenin başında, kapora yok.",
ek:`<h2>Tuzla'da nasıl buluşulur</h2>
<div class="about"><b>Planlı randevu</b><br>Hat uzak ve tek girişli. Son yarım saatte yazmak karşılık bulmuyor.</div>
<div class="about"><b>Konum linki</b><br>Köy içi adresler karışık; link olmadan kapıda arama kaçınılmaz.</div>
<div class="about"><b>Dönüş</b><br>Gece boş taksi azalıyor, dönüş için şoför numarası almanı öneririz.</div>
<h2>Saat</h2>
<div class="about">Gündüz 12:00-17:00 arası en rahat. Akşam için en az 45 dakika önceden yaz.</div>`,
sss:[["Tuzla escort fiyatları ne kadar?","{fiyat}. Tarife sabit."],["Ne kadar önceden yazmalıyım?","En az 45 dakika. Hat uzak."],["Tuzla'ya gerçekten geliyor musunuz?","Evet, ama planlı olması şart."],["Otele 30 dakika olur mu?","Olmaz, adrese çıkışta en az 1 saat."],["Ödeme nasıl yapılıyor?","Görüşmenin başında nakit, IBAN veya USDT."]]},

"magusa-sakarya-escort":{nm:"Sakarya",alt:"Üniversite çevresi, apart hattı",kemer:"banliyo",
lead:"Sakarya escort: üniversite çevresi ve apartlar. Giriş genelde serbest, kısa program, kapora yok.",
areas:["Sakarya merkez","Üniversite çevresi","Öğrenci apartları","Mağusa merkez bağlantısı"],
otel:["Öğrenci apartları","Site daireleri","Merkez otelleri"],
metin:"Sakarya üniversite hattı: apartlar ve öğrenci evleri. Girişler genelde serbest, kapıda isim sorulmuyor. Kısa program ve gündüz görüşmesi burada en rahat çalışıyor.",
metin2:"Kat ve daire numarası olmadan bina içinde kaybolunuyor; ikisini birlikte yaz. Taksi ücreti mesafeye göre önceden söylenir. Ödeme görüşmenin başında, kapora yok.",
ek:`<h2>Sakarya'da nasıl buluşulur</h2>
<div class="about"><b>Apart ve daire</b><br>Kat ve daire numarası olmadan giriş uzuyor. İkisini tek mesajda yaz.</div>
<div class="about"><b>Gündüz</b><br>Öğle ve ikindi saatleri rahat; 20-30 dakika önceden yazman yeterli.</div>
<div class="about"><b>Kısa program</b><br>1 saat en çok seçilen süre. 30 dakika yalnızca kendi yerimizde.</div>
<h2>Akşam</h2>
<div class="about">18:00 sonrası 1 saat önceden yaz. Mağusa merkeze yürüme mesafesinde olduğu için gece planına devam etmek kolay.</div>`,
sss:[["Sakarya escort fiyatları ne kadar?","{fiyat}. Tarife sabit."],["Öğrenci apartına gelir misiniz?","Evet, kat ve daire numarası yeterli."],["Girişte isim gerekiyor mu?","Genelde hayır, apartlar serbest."],["Otele 30 dakika olur mu?","Olmaz, adrese çıkışta en az 1 saat."],["Ödeme nasıl yapılıyor?","Görüşmenin başında nakit, IBAN veya USDT."]]},

"magusa-canakkale-escort":{nm:"Çanakkale",alt:"Merkez çevresi, apart ve site hattı",kemer:"banliyo",
lead:"Çanakkale escort: Mağusa merkez çevresi, apart ve site ağırlıklı. Kısa mesafe, kapora yok.",
areas:["Çanakkale merkez","Apart blokları","Site içleri","Mağusa merkez bağlantısı"],
otel:["Apart blokları","Site konaklamaları","Merkez otelleri"],
metin:"Çanakkale Mağusa merkezine bitişik, apart ve site ağırlıklı bir hat. Mesafe kısa olduğu için ulaşım sorun olmuyor; yürüyerek de gidilebiliyor. Gündüz ve kısa program burada rahat çalışıyor.",
metin2:"Site girişlerinde isim gerekiyorsa önceden söyle, bildiriyoruz. Blok ve daire numarası girişi hızlandırıyor. Ödeme görüşmenin başında, kapora yok.",
ek:`<h2>Çanakkale'de nasıl buluşulur</h2>
<div class="about"><b>Site kapısı</b><br>Kontrollü girişlerde isim gerekiyor; önceden haber veriyorsun.</div>
<div class="about"><b>Apart ve blok</b><br>Blok, kat ve daire olmadan giriş uzuyor.</div>
<div class="about"><b>Merkez bağlantısı</b><br>Mağusa merkeze yürüme mesafesinde, taksi çoğu zaman gerekmiyor.</div>
<h2>Saat</h2>
<div class="about">Gündüz 12:00-17:00 arası en sakin aralık. Akşam için 1 saat önceden yaz.</div>`,
sss:[["Çanakkale escort fiyatları ne kadar?","{fiyat}. Tarife sabit."],["Siteye girişte isim gerekiyor mu?","Gerekiyorsa önceden söyle, bildiriyoruz."],["Merkeze yakın mı?","Evet, Mağusa merkeze bitişik."],["Otele 30 dakika olur mu?","Olmaz, adrese çıkışta en az 1 saat."],["Ödeme nasıl yapılıyor?","Görüşmenin başında nakit, IBAN veya USDT."]]},

"girne-kordonboyu-escort":{nm:"Kordonboyu",alt:"Sahil yürüyüş yolu ve liman batısı",kemer:"kiyi",
lead:"Kordonboyu escort: sahil yürüyüş yolu, liman batısı ve arka sokaklar. Yürüyerek buluşma, otel lobisi, kapora yok.",
areas:["Kordon yürüyüş yolu","Liman batısı","Sahil kafeleri","Arka sokaklar"],
otel:["Merkez butik oteller","Liman çevresi oteller","Kordon apartları"],
metin:"Kordonboyu Girne'nin en yürünebilir hattı: sahil boyunca uzanan yürüyüş yolu, limanın batısı ve arkasındaki sokaklar birkaç dakika içinde. Akşam saatlerinde hat kalabalık, buluşmayı mekân adıyla vermek en hızlısı.",
metin2:"Sahil hattında araç bazı noktalara girmiyor, yürüyerek ilerlemek daha hızlı. Kordon otellerinde lobi buluşması standart; odaya çıkışta resepsiyona isim bırakmadan ilerliyoruz. Ödeme görüşmenin başında, kapora yok.",
sss:[["Kordonboyu escort fiyatları ne kadar?","{fiyat}. Tarife sabit, kapıda değişmez."],["Kordonboyu'nda yürüyerek buluşabilir miyiz?","Evet, sahil yolu tamamen yürünebilir. Noktayı mekân adıyla netleştiriyoruz."],["Otele geliyor musunuz?","Evet, kordon otellerinde lobi buluşması standart, odaya çıkış da mümkün."],["Otele 30 dakika olur mu?","Olmaz. 30 dakika yalnızca kendi yerimizde, adrese çıkışta en az 1 saat."],["Ödeme nasıl yapılıyor?","Görüşmenin başında nakit, IBAN veya USDT. Kapora yok."]]},

"girne-carsi-escort":{nm:"Girne Çarşı",alt:"Arasta, saat kulesi ve çarşı arası sokaklar",kemer:"banliyo",
lead:"Girne Çarşı escort: arasta, saat kulesi çevresi ve ara sokaklar. Gündüz de canlı, yürüyerek buluşma, kapora yok.",
areas:["Arasta","Saat kulesi çevresi","Çarşı arası sokaklar","Kale çevresi"],
otel:["Merkez butik oteller","Çarşı üstü pansiyonlar","Kale çevresi oteller"],
metin:"Girne Çarşı gündüz de hareketli bir hat: arasta, saat kulesi çevresi ve ara sokaklar. Dükkânlar geç saate kadar açık olduğu için buluşma noktası bulmak kolay, kalabalıkta göze batmıyor.",
metin2:"Çarşı içine araç girmiyor; en yakın noktada inip yürümek gerekiyor. Buluşmayı dükkân ya da meydan adıyla veriyoruz. Ödeme görüşmenin başında, kapora yok.",
ek:`<h2>Çarşıda nerede buluşulur</h2>
<div class="about"><b>Arasta ve saat kulesi</b><br>En kolay bulunan nokta. Gündüz kalabalık olduğu için buluşma göze batmıyor.</div>
<div class="about"><b>Çarşı arası sokaklar</b><br>Dar ve gölgeli; yaz aylarında gündüz buluşması için en rahatı.</div>
<div class="about"><b>Kale çevresi</b><br>Kısa yürüyüş, akşam üstü sakin. Buluşmadan sonra limana inmek kolay.</div>
<h2>Saat ve ulaşım</h2>
<div class="about">Çarşı gündüz en verimli hat; akşam üstü dükkânlar kapanınca kalabalık azalıyor.</div>
<div class="about">Araç çarşı içine girmiyor. En yakın noktayı mesajda netleştiriyoruz.</div>`,
sss:[["Girne Çarşı escort fiyatları ne kadar?","{fiyat}. Tarife sabit, kapıda değişmez."],["Çarşıda gündüz buluşma olur mu?","Evet, çarşı gündüz de canlı. Arasta ve saat kulesi çevresi en kolay noktalar."],["Araç çarşı içine giriyor mu?","Girmiyor. En yakın noktada inip birkaç dakika yürümen gerekiyor."],["Otele 30 dakika olur mu?","Olmaz. 30 dakika yalnızca kendi yerimizde, adrese çıkışta en az 1 saat."],["Ödeme nasıl yapılıyor?","Görüşmenin başında nakit, IBAN veya USDT. Kapora yok."]]},

"girne-karaman-escort":{nm:"Karaman",alt:"Köy dokusu, bahçeli evler ve zeytinlikler",kemer:"banliyo",
lead:"Karaman escort: köy dokusu, bahçeli evler ve zeytinlikler arası. Girne merkeze altı dakika, kapıda buluşma, kapora yok.",
areas:["Karaman köy içi","Zeytinlik yolu","Karmi sırtı","Bahçeli evler"],
otel:["Köy pansiyonları","Karmi butik oteller","Merkez otelleri"],
metin:"Karaman Girne'nin batısında, köy dokusunu korumuş sakin bir yerleşim. Bahçeli evler ve zeytinlikler arasında; merkez gibi kalabalık değil, araçla altı dakika. Buluşma genelde köy içindeki kahve önünde ya da ev kapısında oluyor.",
metin2:"Köy içi sokaklar dar ve isimsiz; konum linki göndermeden yola çıkılmıyor. Taksi ücreti mesafeye göre önceden söylenir. Ödeme görüşmenin başında, kapora yok.",
ek:`<h2>Karaman'da nerede buluşulur</h2>
<div class="about"><b>Köy içi</b><br>Kahve önü en kolay nokta. Akşam üstü sakin, gündüz bahçe işleriyle hareketli.</div>
<div class="about"><b>Bahçeli evler</b><br>Kapıda buluşma. Kapı numarası ve bahçe tarifi mesajda net olmalı.</div>
<div class="about"><b>Karmi sırtı</b><br>Yol yamaca tırmanıyor; taksi ücreti merkeze göre biraz yüksek ve önceden söylenir.</div>
<h2>Ulaşım</h2>
<div class="about">Girne merkezden altı dakika. Köy içinde boş taksi geçmiyor, dönüş için şoför numarası al.</div>
<div class="about">Zeytinlik ve Karmi yolu üzerinden gelmek en kısa güzergâh.</div>`,
sss:[["Karaman escort fiyatları ne kadar?","{fiyat}. Tarife sabit, kapıda değişmez."],["Karaman'da kapıda buluşma olur mu?","Evet, bahçeli evlerde kapıda buluşuyoruz. Kapı numarası ve tarif net olmalı."],["Karaman'a taksi ücreti ne kadar?","Mesafeye göre değişir, mesajda önceden söylenir ve kapıda değişmez."],["Otele 30 dakika olur mu?","Olmaz. 30 dakika yalnızca kendi yerimizde, adrese çıkışta en az 1 saat."],["Ödeme nasıl yapılıyor?","Görüşmenin başında nakit, IBAN veya USDT. Kapora yok."]]}
};
