# RedKıbrıs

Kıbrıs escort sitesi. TR/EN/RU, sunucu tarafında üretilen sayfalar, JS'siz ön yüz.

- Canlı: https://www.kibrisgirneescort.com
- GitHub: https://github.com/Canveli42/kibris

## Yapı

- `pages/` — HTML şablonları (`<!--SHELL:HEAD-->`, `<!--SHELL:HEADER-->`, `<!--SHELL:FOOTER-->` sunucuda doldurulur)
- `data/shell.js` — ortak head/header/footer, CSP nonce
- `data/fiyat.js` — **tek fiyat kaynağı**; fiyat değişikliği yalnızca burada yapılır
- `data/regions*.js` — bölge metinleri ve kemer şablonları
- `api/` — sayfa, bölge, blog, sitemap, ölçüm, temizlik
- `vercel.json` — rewrites, redirects, headers, cron

## Yer tutucular

| Yer tutucu | Nerede | Ne olur |
|---|---|---|
| `<!--FIYAT-->` | fiyatlar.html | fiyat satırları |
| `<!--FIYAT_KART-->` | ana sayfalar | fiyat kartları |
| `<!--FIYAT_CUMLE-->` | meta / SSS | tek satır fiyat listesi |
| `<!--FIYAT_LD-->` | fiyatlar.html | `Service` + `AggregateOffer` JSON-LD |

Ana sayfalar `FIYAT_LD` kullanmaz; teklifler `LocalBusiness` içindeki `hasOfferCatalog` alanında durur (tek varlık, çift şema yok).

## Ortam değişkenleri

- `CRON_SECRET` — tanımlanırsa `/api/temizle` yalnızca `Authorization: Bearer <secret>` ile çalışır (Vercel cron bunu otomatik gönderir).

Supabase anahtarları `api/` dosyalarında gömülüdür (publishable).

## Geliştirme

```bash
npm i -g vercel
vercel dev
