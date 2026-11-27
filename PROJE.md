# KIBRISGIRNEESCORT.COM — PROJE DOSYASI

> **BU DOSYAYI ÖNCE OKU.** Sonra kullanıcının o mesajdaki işine başla. Burada yazan kurallar pazarlıksızdır.

---

## 1. KAPSAM — KİLİTLİ

**Sadece iki iş var:**

1. Blog yazısı eklemek ve düzenlemek
2. Model kaydı eklemek ve düzenlemek

**Bunlar bitti, DOKUNULMAZ:**

- Genel tasarım, CSS, renkler, tipografi
- Anasayfa
- Bölge sayfaları (65 bölge + 7 kategori tanımı)
- Navigasyon, footer, header
- Sitemap yapısı, 404 sayfası

Kullanıcı istemeden bunlardan hiçbirine girilmez. **Site bozulmasın** — en sık tekrarlanan talimat bu.

---

## 2. KÜNYE

- Marka: **RedKıbrıs**
- Site: https://www.kibrisgirneescort.com
- Repo: `Canveli42/kibris` (public, asistanın GitHub'a yazma yetkisi yok)
- Stack: Node serverless fonksiyonları + `pages/*.html` şablonları, Vercel; veri Supabase
- Diller: TR (kök), `/en/...`, `/ru/...`
- İletişim: WhatsApp `wa.me/905515420755`, Telegram `t.me/kibrisescortvip`, Instagram `kibrisgirneescort`

**Next.js DEĞİL.** Build adımı yok, `package.json` bağımlılıksız. Dosyalar olduğu gibi servis edilir.

---

## 3. PROFİL KONUSU — KİLİTLİ

Profil slug'ı `bolge-escort-konu` desenindedir ve konu zorunludur. Konu, **aranan** bir şey olacak; süsleme olmayacak.

**Kural:** Konu kelimesi Google'ın arama kutusuna yazılır mı? Yazılmıyorsa kullanılmaz.

### Yasak — bunlar süs, arama hacmi yok

`dantel` · `slip` · `bornoz` · `tezgah` · `kanepe` · `kapı` · `pazar` · `şeffaf` · `halı` · `perde` · `çarşaf` · `koltuk` · `ayna` · `saksoyu seviyor` · `girtlaga alıyor`

Bu kelimeler bir eşyayı tarif ediyor, aranan bir şeyi değil. Kimse "girne escort tezgah" diye aramıyor.

### Sıra — bu sırayla tercih et

1. **Yaş bandı** — `25-yas`, `30-yas`, `40-yas`
2. **Vücut / saç** — `ince`, `balik-etli`, `uzun-boylu`, `esmer`, `sarisin`
3. **Saat** — `gece`, `gunduz`, `sabah`, `gec-saat`
4. **Dil** — `rusca-bilen`, `ingilizce-bilen`, `turkce-bilen`
5. **Hizmet** — `masajli`, `yemekli`, `cift-bay-bayan`
6. **Durum** — `ogrenci`, `calisan`, `yeni`
7. **Semt detayı** — `sahilde`, `limanda`, `otel-yakininda`

Slug'da bu yedi kategoriden **en az biri** bulunacak. Sadece süs kelimesiyle slug kurulmaz.

### Konu bulamazsan

Uydurma. İki yol var:

1. Kullanıcıya sor: "Bu model için hangi ayırt edici özellik doğru?"
2. Kullanıcıdan **referans site** iste, oradan bak.

Referans örneği: **www.konyajo.com** — "konya escort" kelimesinde 1. sırada, hep aranan şeyler yazmış. Rakip sitelerde tutan konu başlıkları örnek alınır, birebir kopyalanmaz.

### Mevcut durum

Yayındaki ~800 profilin konusu bu kurala uymuyor, **dokunulmuyor**. Kural yeni yazılanlar için. Eski slug'lar örnek sayılmaz; "eskiden dantel yazılmış" gerekçe değildir.

---

## 4. FİYAT VE ÖDEME — SABİT

| Süre | Ücret |
|---|---|
| 30 dakika | 7.000 ₺ (yalnızca Girne merkez) |
| 1 saat | 12.000 ₺ |
| 2 saat | 17.000 ₺ |
| 4 saat | 22.000 ₺ |

- **Yol/taksi mesafeye göre**, önceden söylenir, kapıda değişmez. Sabit rakam yazmak yanlıştır (ör. "2.000 ₺ yol payı").
- **Kapora yok.** Ödeme görüşmenin başında: nakit, IBAN veya USDT.
- Tek kaynak `data/fiyat.js`. Bölge SSS'lerinde `{fiyat}` yer tutucusu `F.cevap(dil)` ile doldurulur.

---

## 5. VERİTABANI

- `posts`: `slug, lang, title, meta, body, faq, published, bolge, profil, updated_at`
- `models`: kilo/saç/göğüs kolonu **YOK**, eklenmeyecek
- `event_yaz_v2` RPC: sunucu tarafı gizli anahtar + veritabanı düzeyinde 30/dakika istemci ve 1.200/dakika genel sınır (geçiş için database/ dosyalarına bak)

---

## 6. ROTALAR

- `/blog/:slug` → `api/post.js`
- `/en/blog/:slug`, `/ru/blog/:slug` → aynı fonksiyon, `lang` parametreli
- `/:bolge-escort` → `api/region.js`
- `/en/:slug` her şeyi yakalar → `region.js?lang=en`. EN blog adresi **`/en/blog/slug`** olmak zorunda
- `/panel` → `api/sayfa?f=can` (66 KB yönetim paneli, ayrı CSP)
- `cleanUrls: true`, `trailingSlash: false`

Eksik EN/RU yazıda `post.js`, Türkçe sürüm gerçekten varsa **302** ile Türkçe adrese yönlendirir. `region.js` yazıya yönlendirirken mevcut hedef dili doğrular ve **302** döner; sabit bölge çevirisi eksikse Türkçe bölge adresine **301** dönebilir. Gerçekten bulunmayan içerik 404, geçici veritabanı hatası 503 döner.

---

## 7. VERİ DOSYALARI

- `data/bolge.js` — bölge kayıtları. `pg` alanı zorunlu ve önekle birebir aynı olmalı
- `data/ek.js` + `data/regions.ek.js` — bölgeye özel HTML; `regions.ek.js` içeriği `pg` ile eşleşir
- `data/regions.js` / `.en.js` / `.ru.js` — bölge metinleri
- `kemer` alanı hazır blok seçer: `kiyi`, `yamac`, `banliyo`, `resort`, `format`, `profil`
- `data/shell.js` — ortak sayfa bileşenleri ve güvenlik başlıkları
- `data/rehber.js` — blog, yazı ve sitemap için ortak sunucu sınıflandırması

**Her bölgeye kendi `ek` bloğu şart**, yoksa başka şehrin metni sızar.

---

## 8. GÖVDE VE SSS BİÇİMİ

`govde()` hem HTML hem markdown işler:

- Gövdede `<h2|h3|p|ul|div>` varsa HTML kabul edilir
- Düz metinde `## ` → `<h2>`
- 60 karakterden kısa ve nokta/soru işaretiyle bitmeyen satır **otomatik `<h3>`** olur

`sss()` üç formatı da okur: dizi-dizi, `{q,a}` nesnesi, `soru | cevap`. Hangisi kullanılırsa kullanılsın çalışır; mevcut satırın formatı korunur.

---

## 9. SLUG DESENİ VE TUZAK

Desen: `bolge-escort-konu`

`^([a-z-]+)-escort-(.+)$` yakalanır ve `m[2]` bir `REHBER` listesinde aranır. Listede yoksa **profil sayılır** ve bölge adı profilin adı olur.

`REHBER` listesi artık `data/rehber.js` içinde tek ortak sunucu kaynağındadır; `api/blog.js`, `api/post.js` ve `api/sitemap.js` aynı listeyi okur. Sınıflandırma değişikliği yalnızca ortak dosyada yapılır.

**Bilinen tuzaklar:**

- `girne-escort-tekne-turu` → `tekne-turu` listede yok, profil sanılır
- `lefkosa-escort-is-seyahati` → `is-seyahati` listede yok, profil sanılır
- Çift "escort" yazımı 404 üretir (`...-escort-escort-...`)
- Olmayan slug'a link vermek 404'tür; link verirken hedefin var olduğu doğrulanır

---

## 10. TON VE YAZI FORMATI

- H1, 700-900 kelime, H2 alt başlıklar
- Sonunda SSS
- 2 profil + bölge + fiyat linki
- Ton sakin, somut, abartısız; "en iyi", "muhteşem" yok
- Sayısal iddia verilecekse gerçek olacak
- Profil gövdelerinde yaş/boy cümlesinden sonra küçük harfle devam edilir (mevcut tic)

---

## 11. ÇALIŞMA DÜZENİ

1. Her dosya **komple** verilir. "Şu satırı değiştir" denmez. Kullanıcı siler, yapıştırır, commit eder
2. SQL'i asistan yazar, kullanıcı Supabase'de çalıştırır
3. Dosyaları kullanıcı ekler; GitHub'a asistan yazmaz
4. Yeni JS/CSS/görsel eklenmez — PageSpeed 100 korunur
5. Kullanıcı teknik değil: kısa, net, Türkçe, emoji ölçülü
6. Her SQL sonrası **kontrol SELECT'i** verilir. Kontrol yanlış kurulursa yanlış sonuç üretir; ör. `'2.000 ₺'` araması `12.000 ₺` ile de eşleşir
7. Türkçe karakterli başlıklarda `length()` bölmesi hatalı sonuç verir, `regexp_matches` + `count(*)` kullanılır
8. Görsel dosyası adı veya yolu değiştirilecekse, önce veritabanı ve sayfalardaki mevcut referansları kontrol et; sonra her değiştirilen görselin erişimini doğrula.
9. Planlı ileri tarihli yayın seçeneği kaldırıldı. Taslak sistemi korunur; yayınlanmış yazı düzenlenirken mevcut yayın tarihi değişmez.
10. Kod değişikliği sonrası otomatik testleri ve ilgili canlı sayfaları kontrol et. Kullanıcı açıkça istemeden tasarıma, çalışan sistemlere veya kapsam dışı dosyalara müdahale etme.

---

## 12. BİTTİ — TEKRAR YAPMA

- 65 bölge + 7 kategori tanımı mevcut; 27.11.2026 canlı kontrolde sitemap 1.048 benzersiz adres (676 TR, 186 EN, 186 RU). Önceki erişim kontrolünde tespit edilen tek 404 düzeltildi; bu sayı yeni yayınlarla değişebilir.
- `saat` boş 150 satır dolduruldu, 11 eksik `models` kaydı eklendi
- `modeller.js`: `regions.ek` merge, yol payı mesafeye çevrildi, ölü kod silindi, EN/RU desteği
- `README.md` güncellendi
- 2 kırık link düzeltildi (Şevval, 1 saat)
- Sabit "2.000 ₺" / "1.500-3.000 TL" yol payı Tuzla ve İskele'de kaldırıldı
- Mare Monte EN/RU sonundaki çift "Payment/Оплата" bloğu silindi, "террасы stacked" düzeltildi
- VIP ne-demek EN/RU kavram sayfasına çevrildi, kopya bölümler çıkarıldı
- Ercan havalimanı RU/EN çifti ayrıştırıldı: plan sayfası iniş, transfer sayfası ulaşım

---

## 13. AÇIK İŞLER (sırada)

**Yazılar:** girne-escort-tekne-turu, ercan-havalimani-escort-karsilama, kibris-escort-whatsapp, otel-lobisinde-bulusma-girne, kibris-escort-kapora-ister-mi, girne-mi-magusa-mi-escort, escort-ile-ilk-bulusma-kontrol-listesi, kibris-escort-4-saat-program-nasil-gecer, lefkosa-escort-is-seyahati, magusa-surici-escort-rehberi

**Hatalar:**

- `kaya-artemis` meta "Bafra line"/"линии Бафры" → Boğaz/İskele olacak (TR/EN/RU)
- `kibris-escort-mitleri` meta "Twelve"/"Двенадцать" → on madde var
- `escort-fotografi-ters-gorsel-arama`: "украдено outright"
- `girne-merkez-escort-rehberi`: "И же самое место"
- `lefkosa-ortakoy-escort`: "договаривайтете"
- `otel-secimi-havuz-mu-konum-mu`: "нужен ли имя"
- Suriçi yazımı: "Суриичи" / "Суричи" tutarsız
- `long-beach-resort`: "Богаз" / "Боаз" tutarsız
- Slug çifti: `lefkosa-koskuciftlik-escort` / `lefkosa-koskluciftlik-escort-ece-araba`
- `lefkosa-koskuciftlik-escort` gövdesinde kaçak "BANT"
- `magusa-surici-escort-sevgi-masaj`: "çalışıyorum.Beni"
- `girne-merkez-escort-ayse-saksoyu-seviyor`: bozuk satır sonu `\r\r`
- 4 sayfada başlıklar yalnızca H3, H2 yok
- `README.md` "tek JS istisnası model filtresi" diyor, blog arama betiği de var

**Karar bekleyen:** 17 profil çifti — birleştirme değil, profile ayırt edici paragraf.

---

## 14. KISITLAR

- CSP nonce'lu, trusted-types açık. Gövdeye `<script>` eklersen `noncele()` hallediyor
- `api/indexnow.js`: POST + Bearer + `INDEXNOW_ADMIN_SECRET`; gizli anahtar yalnızca Vercel Production ortam değişkeninde tutulur, GitHub'a yazılmaz. Otomatik bildirim tetikleyicisi doğrulanmış değildir.
- Sitemap XML olarak sunulur; `css/sitemap.css` yalnızca tarayıcı görünümünü düzenler. URL sayısı 50.000 sınırını aşarsa veya veritabanı erişilemezse 503 döner. `lastmod` gerçek yayın/güncelleme tarihinden alınır; güvenilir tarih yoksa yazılmaz.
- `middleware.js` matcher'ı `/api`, `/js`, `/css`, `/data`, `/takip`, `robots`, `sitemap` hariç
- Testler `node --test tests/*.test.cjs` (veya `npm test`); CI her push'ta çalışır
- `temizle.js` 410 döner; temizlik Supabase Cron'a taşındı

