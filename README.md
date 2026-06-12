# Masjid Hidayatullah – Website Resmi

Website resmi Masjid Hidayatullah, Jangnim, Busan.

## Tech Stack
- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **TypeScript**
- **Contentful CMS** (opsional, untuk konten dinamis)

## Fitur
- ✅ Tema hijau islami
- ✅ 3 bahasa: Indonesia, Inggris, Korea
- ✅ Section: Beranda, Tentang, Program, Jadwal Sholat, Koperasi, Galeri, Kontak
- ✅ Halaman Koperasi (produk, manfaat, jam operasional)
- ✅ Social media footer (Facebook + Instagram)
- ✅ Siap Contentful CMS

## Setup Contentful (Opsional)

1. Daftar di https://contentful.com
2. Buat Space baru
3. Buat file `.env.local` di root project:
```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_cda_token
```

### Content Types yang perlu dibuat di Contentful:
- `mosque_info` – informasi dasar masjid
- `program` – daftar program kegiatan
- `prayer_schedule` – jadwal sholat (subuh, dzuhur, ashar, maghrib, isya)
- `gallery_item` – foto galeri kegiatan
- `koperasi_product` – produk/layanan koperasi
- `announcement` – pengumuman

Lihat `lib/contentful.ts` untuk detail struktur field.

## Kustomisasi Konten Tanpa Contentful

Edit file `app/data.ts` untuk:
- Informasi dasar masjid (nama, alamat, telepon, email)
- Program kegiatan
- Jadwal sholat
- Produk koperasi
- Item galeri

Edit `app/i18n.ts` untuk terjemahan.

## Menjalankan Secara Lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Deploy ke Railway/Vercel

```bash
npm run build
npm start
```
