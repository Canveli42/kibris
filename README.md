# RedKıbrıs

Kıbrıs escort sitesi. TR/EN/RU, sunucu tarafında üretilen sayfalar, ön yüzde JavaScript sınırlı tutulur. Model listesi filtresi, blog arama, dil seçimi, metin katmanı, ziyaret ölçümü ve yönetim panelinin ihtiyaç duyduğu betikler kullanılır.

- Canlı: https://www.kibrisgirneescort.com
- GitHub: https://github.com/Canveli42/kibris

## Yapı

- `pages/` — HTML şablonları (`<!--SHELL:HEAD-->`, `<!--SHELL:HEADER-->`, `<!--SHELL:FOOTER-->` sunucuda doldurulur)
- `data/shell.js` — ortak head/header/footer, CSP nonce
- `data/fiyat.js` — **fiyat kaynağı**; yeni fiyat buraya yazılır
- `data/regions.js` / `.en.js` / `.ru.js` — dil bazlı bölge metinleri
- `data/regions.ek.js` — bölge ek metinleri; `data/ek/*.js` dosyalarını birleştirir
- `data/ek/` — bölge metin parçaları (`magusa.js`, `lefkosa.js`, …)
- `data/bolge.js` — bölge kayıt defteri: `pg` (açılacak adres), `hb` (model hub'ı), `ust` (üst bölge)
- `api/` — `sayfa` (`/panel` dahil), `region`, `modeller`, `post`, `blog`, `sitemap`, `indexnow`, `takip`, `temizle`
- `vercel.json` — rewrites, redirects, headers
- `middleware.js`, `takip.js`, `js/analytics.js` — ölçüm ve istemci tarafındaki yardımcı işlemler
- `css/sitemap.css` — XML site haritasının tarayıcıdaki okunaklı görünümü
- `tests/` — otomatik sözdizimi ve trafik sistemi kontrolleri

## Bölge mekaniği (bozulursa 404 çıkar)

1. `bolge.js`'te `pg:null` olan bölgenin kendi sayfası yoktur, sitemap'e de girmez.
2. Yeni sayfa açarken `pg` değeri bölge önekiyle yazılır: `girne-`, `lefkosa-`, `magusa-`. Öneksiz yazılırsa 404.
3. `regions.ek.js` anahtarı `pg` değeriyle **birebir** aynı olmalı.
4. Her bölge kaydına kendi `ek` HTML bloğu şart; yoksa başka şehrin şablon metni sızar.
5. `/:slug` yakalayıcısı her tek segment adresi `api/region`'a gönderir; yeni sayfa için rewrite şart değil, tutarlılık için eklenir.
6. Slug sonradan değiştirilirse `vercel.json`'a 301 yazılmalı.

## Tarife

- Sabit: 30 dk 7.000 ₺ (yalnızca Girne merkez), 1 saat 12.000 ₺, 2 saat 17.000 ₺, 4 saat 22.000 ₺.
- Adrese çıkışta yol/taksi **mesafeye göre** eklenir, önceden söylenir, kapıda değişmez. Sabit bir "yol payı" rakamı yoktur.
- Kapora yok; ödeme görüşmenin başında, nakit / IBAN / USDT.
- Fiyat değişikliği yalnızca `data/fiyat.js`'te yapılır. Gömülü rakam kalmadıysa doğrudur; kaldıysa `{fiyat}` yer tutucusuna çevrilir.

## Yer tutucular

| Yer tutucu | Nerede | Ne olur |
|---|---|---|
| `<!--FIYAT-->` | fiyatlar.html | fiyat satırları |
| `<!--FIYAT_KART-->` | ana sayfalar | fiyat kartları |
| `<!--FIYAT_CUMLE-->` | meta / SSS | tek satır fiyat listesi |
| `<!--FIYAT_LD-->` | fiyatlar.html | `Service` + `AggregateOffer` JSON-LD |
| `{fiyat}` | bölge SSS'leri | tek satır tarife |

Ana sayfalar `FIYAT_LD` kullanmaz; teklifler `LocalBusiness` içindeki `hasOfferCatalog` alanında durur (tek varlık, çift şema yok).

## Ortam değişkenleri

- Ölçüm kayıtlarının 30 günlük temizliği Supabase Cron üzerinden günlük çalışır (04:00 UTC). Yönetim panelindeki elle temizleme seçeneği oturum gerektirir. Vercel üzerinden ayrı temizleme görevi çalıştırılmaz.

- `INDEXNOW_ADMIN_SECRET` yalnızca Vercel Production ortamında gizli değişken olarak tutulur. Bildirim uç noktası yetkili POST isteği gerektirir; otomatik bildirim tetikleyicisi doğrulanmış değildir.
- Supabase publishable anahtarları istemci ve API kodunda bulunabilir; gizli anahtarlar kaynak kodda tutulmaz. İçerik, model, bölge ve ayar tabloları kullanılır.

## Yayın ve çalışma davranışı

- Panelde ileri tarihli planlama kaldırıldı; taslak durumu korunur. İlk yayına alınma tarihi otomatik kaydedilir, mevcut yayındaki yazı düzenlenirse tarihi değişmez.
- Site haritası standart XML'dir; `css/sitemap.css` yalnızca tarayıcı görünümünü değiştirir. `lastmod` güvenilir yayın/güncelleme tarihine dayanır.
- Yazı, blog listesi veya eksik adres çözümlemesinde geçici veritabanı hataları 503 ve `no-store` ile ele alınır; gerçekten bulunmayan sayfalar 404 döner.
- Görsel dosyası adı değiştirilmeden önce kayıtlı bağlantılar kontrol edilmeli, değişiklik sonrası canlı görsel erişimi doğrulanmalıdır.

## Geliştirme

```bash
npm i -g vercel
vercel dev
```

Otomatik testler:

```bash
npm test
# veya
node --test tests/*.test.cjs
```

GitHub Actions her push ve pull request sonrasında testleri çalıştırır. Kod değişikliği sonrası ilgili canlı sayfalar da kontrol edilmelidir.
