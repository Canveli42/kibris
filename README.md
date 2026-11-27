# RedKıbrıs

Kıbrıs escort sitesi. TR/EN/RU, sunucu tarafında üretilen sayfalar, ön yüzde JS minimumda (tek istisna model listesi filtresi, satır içi ve nonce'lu).

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
- `vercel.json` — rewrites, redirects, headers, cron

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

- `CRON_SECRET` — tanımlanırsa `/api/temizle` yalnızca `Authorization: Bearer <secret>` ile çalışır (Vercel cron bunu otomatik gönderir).

Supabase anahtarları `api/` dosyalarında gömülüdür (publishable). Tablolar: `posts`, `models`.

## Geliştirme

```bash
npm i -g vercel
vercel dev
