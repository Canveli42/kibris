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
- Bölge sayfaları (55 adet, hepsi yayında)
- Navigasyon, footer, header
- Sitemap yapısı, 404 sayfası

Kullanıcı istemeden bunlardan hiçbirine girilmez. **Site bozulmasın** — en sık tekrarlanan talimat bu.

---

## 2. KÜNYE

- Marka: **RedKıbrıs**
- Site: https://www.kibrisgirneescort.com
- Repo: `Canveli42/kibris` (public, kullanıcının GitHub'a yazma yetkisi yok)
- Stack: Node serverless fonksiyonları + `pages/*.html` şablonları, Vercel; veri Supabase
- Diller: TR (kök), `/en/...`, `/ru/...`
- İletişim: WhatsApp `wa.me/905515420755`, Telegram `t.me/kibrisescortvip`, Instagram `kibrisgirneescort`

**Next.js DEĞİL.** Build adımı yok, `package.json` bağımlılıksız. Dosyalar olduğu gibi servis edilir.

---

## 3. FİYAT VE ÖDEME — SABİT

| Süre | Ücret |
|---|---|
| 30 dakika | 7.000 ₺ (yalnızca kendi yerimizde Girne Merkez) |
| 1 saat | 12.000 ₺ |
| 2 saat | 17.000 ₺ |
| 4 saat | 22.000 ₺ |

- **Yol/taksi mesafeye göre**, önceden söylenir, kapıda değişmez. Sabit rakam yazmak yanlıştır (ör. "2.000 ₺ yol payı").
- **Kapora yok.** Ödeme görüşmenin başında: nakit, IBAN veya USDT.
- Tek kaynak `data/fiyat.js`. Bölge SSS'lerinde `{fiyat}` yer tutucusu `F.cevap(dil)` ile doldurulur.

---

## 4. VERİTABANI

- `posts`: `slug, lang, title, meta, body, faq, published, bolge, profil, updated_at`
- `models`: kilo/saç/göğüs kolonu **YOK**, eklenmeyecek
- `event_yaz` RPC: `takip.js` üzerinden, IP başına dakikada 30 istek

---

## 5. ROTALAR

- `/blog/:slug` → `api/post.js`
- `/en/blog/:slug`, `/ru/blog/:slug` → aynı fonksiyon, `lang` parametreli
- `/:bolge-escort` → `api/region.js`
- `/en/:slug` her şeyi yakalar → `region.js?lang=en`. EN blog adresi **`/en/blog/slug`** olmak zorunda
- `/panel` → `api/sayfa?f=can` (66 KB yönetim paneli, ayrı CSP)
- `cleanUrls: true`, `trailingSlash: false`

Eksik EN/RU yazıda `post.js` **302**, `region.js` **301** ile TR'ye atar.

---

## 6. VERİ DOSYALARI

- `data/bolge.js` — bölge kayıtları. `pg` alanı zorunlu ve önekle birebir aynı olmalı
- `data/ek.js` + `data/regions.ek.js` — bölgeye özel HTML; `regions.ek.js` içeriği `pg` ile eşleşir
- `data/regions.js` / `.en.js` / `.ru.js` — bölge metinleri
- `kemer` alanı hazır blok seçer: `kiyi`, `yamac`, `banliyo`, `resort`, `format`, `profil`
- `data/rehber.js`, `data/shell.js`

**Her bölgeye kendi `ek` bloğu şart**, yoksa başka şehrin metni sızar.

---

## 7. GÖVDE VE SSS BİÇİMİ

`govde()` hem HTML hem markdown işler:

- Gövdede `<h2|h3|p|ul|div>` varsa HTML kabul edilir
- Düz metinde `## ` → `<h2>`
- 60 karakterden kısa ve nokta/soru işaretiyle bitmeyen satır **otomatik `<h3>`** olur

`sss()` üç formatı da okur: dizi-dizi, `{q,a}` nesnesi, `soru | cevap`. Hangisi kullanılırsa kullanılsın çalışır; mevcut satırın formatı korunur.

---

## 8. SLUG DESENİ VE TUZAK

Desen: `bolge-escort-konu`

`^([a-z-]+)-escort-(.+)$` yakalanır ve `m[2]` bir `REHBER` listesinde aranır. Listede yoksa **profil sayılır** ve bölge adı profilin adı olur.

`REHBER` üç dosyada ve farklı uzunlukta: `api/blog.js` (17), `api/post.js` (19), `api/sitemap.js` (19). Yeni yazı eklerken konu kelimesi üçüne de eklenir.

**Bilinen tuzaklar:**

- `girne-escort-tekne-turu` → `tekne-turu` listede yok, profil sanılır
- `lefkosa-escort-is-seyahati` → `is-seyahati` listede yok, profil sanılır
- Çift "escort" yazımı 404 üretir (`...-escort-escort-...`)
- Olmayan slug'a link vermek 404'tür; link verirken hedefin var olduğu doğrulanır

---

## 9. TON VE YAZI FORMATI

- H1, 700-900 kelime, H2 alt başlıklar
- Sonunda SSS
- 2 profil + bölge + fiyat linki
- Ton sakin, somut, abartısız; "en iyi", "muhteşem" yok
- Sayısal iddia verilecekse gerçek olacak
- Profil gövdelerinde yaş/boy cümlesinden sonra küçük harfle devam edilir (mevcut tic)

---

## 10. ÇALIŞMA DÜZENİ

1. Her dosya **komple** verilir. "Şu satırı değiştir" denmez. Kullanıcı siler, yapıştırır, commit eder
2. SQL'i asistan yazar, kullanıcı Supabase'de çalıştırır
3. Dosyaları kullanıcı ekler; GitHub'a asistan yazmaz
4. Yeni JS/CSS/görsel eklenmez — PageSpeed 100 korunur
5. Kullanıcı teknik değil: kısa, net, Türkçe, emoji ölçülü
6. Her SQL sonrası **kontrol SELECT'i** verilir. Kontrol yanlış kurulursa yanlış sonuç üretir; ör. `'2.000 ₺'` araması `12.000 ₺` ile de eşleşir
7. Türkçe karakterli başlıklarda `length()` bölmesi hatalı sonuç verir, `regexp_matches` + `count(*)` kullanılır

---

## 11. BİTTİ — TEKRAR YAPMA

- 55 bölge sayfası yayında, sitemap 676, 404 yok (kullanıcı doğruladı)
- `saat` boş 150 satır dolduruldu, 11 eksik `models` kaydı eklendi
- `modeller.js`: `regions.ek` merge, yol payı mesafeye çevrildi, ölü kod silindi, EN/RU desteği
- `README.md` düzeltildi, `data/rehber.js` oluşturuldu
- 2 kırık link düzeltildi (Şevval, 1 saat)
- Sabit "2.000 ₺" / "1.500-3.000 TL" yol payı Tuzla ve İskele'de kaldırıldı
- Mare Monte EN/RU sonundaki çift "Payment/Оплата" bloğu silindi, "террасы stacked" düzeltildi
- VIP ne-demek EN/RU kavram sayfasına çevrildi, kopya bölümler çıkarıldı
- Ercan havalimanı RU/EN çifti ayrıştırıldı: plan sayfası iniş, transfer sayfası ulaşım

---

## 12. AÇIK İŞLER (sırada)

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

**Karar bekleyen:** 17 profil çifti (dantel, slip, kanepe, tezgah, seffaf temaları) — birleştirme değil, profile ayırt edici paragraf.

---

## 13. KISITLAR

- CSP nonce'lu, trusted-types açık. Gövdeye `<script>` eklersen `noncele()` hallediyor
- `api/indexnow.js`: POST + Bearer + `INDEXNOW_ADMIN_SECRET`
- Sitemap 50.000 URL'de 503
- `middleware.js` matcher'ı `/api`, `/js`, `/css`, `/data`, `/takip`, `robots`, `sitemap` hariç
- Testler `node --test`, CI her push'ta çalışır
- `temizle.js` 410 döner; temizlik Supabase Cron'a taşındı
