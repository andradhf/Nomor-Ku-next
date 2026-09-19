# NomorKu Frontend

Frontend Next.js untuk katalog, kustomisasi produk, checkout, dan halaman thank-you.

## Development

Gunakan Node.js 22 dan npm:

```bash
npm ci
npm run dev
```

Buka http://localhost:3000. Environment development dibaca dari `.env.local`.

## Deploy dengan Docker

Prasyarat: Docker Engine dengan Linux containers dan Docker Compose. Build membutuhkan akses internet untuk npm dan Google Fonts yang digunakan oleh `next/font`.

1. Siapkan konfigurasi di direktori proyek:

   ```bash
   cp .env.docker.example .env.docker
   ```

   Pada PowerShell, gunakan `Copy-Item .env.docker.example .env.docker`.

2. Edit `.env.docker`:

   | Variabel | Isi |
   | --- | --- |
   | `NEXT_PUBLIC_API_BASE_URL` | URL backend yang dapat diakses browser pelanggan, tanpa slash penutup; bukan nama service Docker atau localhost server. |
   | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Site key publik Cloudflare Turnstile untuk domain frontend. |
   | `NEXT_PUBLIC_SITE_URL` | URL publik frontend, misalnya `https://nomorku.example.com`. Digunakan untuk sitemap. |
   | `NEXT_PUBLIC_WA_NUMBER` | Nomor WhatsApp untuk helper WhatsApp, format internasional tanpa tanda `+`. |
   | `FRONTEND_BIND_ADDRESS` | Default `127.0.0.1`, untuk reverse proxy di host yang sama. |
   | `FRONTEND_PORT` | Port pada host, default `3000`. Port di dalam container tetap `3000`. |

   Ganti nilai contoh domain, site key, dan nomor WhatsApp dengan nilai milik Anda. `NEXT_PUBLIC_*` dimasukkan ke bundle saat build dan dapat dilihat pengguna. Jangan masukkan secret key DOKU atau Turnstile. File `.env*` tidak disalin ke image dan `.env.docker` tidak masuk Git.

3. Validasi konfigurasi, build, dan jalankan:

   ```bash
   docker compose --env-file .env.docker config --quiet
   docker compose --env-file .env.docker up -d --build
   docker compose --env-file .env.docker ps
   docker compose --env-file .env.docker logs --tail=100 frontend
   ```

   Container menjalankan output standalone Next.js sebagai user non-root, dengan healthcheck dan restart otomatis kecuali dihentikan manual.

4. Arahkan reverse proxy HTTPS pada host server ke `http://127.0.0.1:3000` (sesuaikan jika port berubah). Port default hanya dapat diakses dari host. Jika platform deployment perlu mengakses port host melalui jaringan, sesuaikan `FRONTEND_BIND_ADDRESS` dan aturan jaringan server. Reverse proxy di container terpisah perlu berada di jaringan Docker yang sama dan menggunakan `frontend:3000`.

5. Sesuaikan integrasi untuk domain baru:
   - Izinkan origin frontend pada konfigurasi CORS backend.
   - Daftarkan domain frontend pada Cloudflare Turnstile.
   - Atur tujuan redirect DOKU/backend ke `https://DOMAIN-FRONTEND/thank-you`, dengan parameter `order_id` jika backend menggunakannya.
   - CSP frontend mengikuti origin `NEXT_PUBLIC_API_BASE_URL` pada saat build.

## Update dan pemeriksaan

Setelah memperbarui source code atau nilai `NEXT_PUBLIC_*`, rebuild image:

```bash
docker compose --env-file .env.docker up -d --build
```

Restart container saja tidak mengubah nilai publik yang sudah tertanam di bundle. Docker Compose menggunakan `--env-file` untuk mengisi build arguments; file ini tidak perlu dimasukkan ke runtime container.

Periksa beranda, `/checkout-form` dengan keranjang terisi, dan `/thank-you?order_id=test`. Pastikan CSS, gambar, captcha, serta koneksi backend bekerja melalui domain publik. Halaman thank-you hanya berisi pesan netral dan tidak memverifikasi status pembayaran.

Untuk menghentikan layanan:

```bash
docker compose --env-file .env.docker down
```

Referensi: [Next.js standalone](https://nextjs.org/docs/app/api-reference/config/next-config-js/output), [Docker multi-stage builds](https://docs.docker.com/build/building/multi-stage/), [Compose environment interpolation](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/).
