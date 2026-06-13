/**
 * Contentful CMS Integration
 * ─────────────────────────────────────────────────────────────────────────────
 * Setup:
 *   1. Create a free Contentful account at https://contentful.com
 *   2. Create a Space and note your Space ID
 *   3. Create a Content Delivery API token
 *   4. Add to .env.local:
 *        CONTENTFUL_SPACE_ID=your_space_id
 *        CONTENTFUL_ACCESS_TOKEN=your_access_token
 *
 * Content Types to create in Contentful:
 *   - mosque_info     : name, address, phone, email, location, founded
 *   - program         : title (Symbol), description (Text), icon, slug, order
 *   - gallery_item    : title, image (Asset), category
 *   - prayer_schedule : subuh, dzuhur, ashar, maghrib, isya (all Symbols)
 *   - koperasi_product: name, description, icon (emoji), active (Boolean)
 *   - announcement    : title, body (RichText), date, pinned (Boolean)
 * ─────────────────────────────────────────────────────────────────────────────
 */

const SPACE   = process.env.CONTENTFUL_SPACE_ID    ?? "";
const TOKEN   = process.env.CONTENTFUL_ACCESS_TOKEN ?? "";
const BASE    = `https://cdn.contentful.com/spaces/${SPACE}/environments/default`;

async function cfetch<T>(contentType: string, params = ""): Promise<T | null> {
  if (!SPACE || !TOKEN) return null;
  try {
    const res = await fetch(
      `${BASE}/entries?content_type=${contentType}&access_token=${TOKEN}${params}`,
      { next: { revalidate: 3600 } } // ISR: revalidate every hour
    );
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getContentfulPrayerSchedule(): Promise<Record<string, string> | null> {
  const data = await cfetch<any>("prayer_schedule", "&limit=1");
  if (!data?.items?.[0]) return null;
  const f = data.items[0].fields;
  return { subuh: f.subuh, dzuhur: f.dzuhur, ashar: f.ashar, maghrib: f.maghrib, isya: f.isya };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getContentfulPrograms(): Promise<any[] | null> {
  const data = await cfetch<any>("program", "&order=fields.order");
  if (!data?.items) return null;
  return data.items.map((item: any) => item.fields);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getContentfulGallery(): Promise<any[] | null> {
  const data = await cfetch<any>("gallery_item");
  if (!data?.items) return null;
  return data.items.map((item: any) => ({
    title: item.fields.title,
    imageUrl: item.fields.image
      ? `https:${data.includes?.Asset?.find((a: any) => a.sys.id === item.fields.image.sys.id)?.fields?.file?.url}`
      : null,
    category: item.fields.category,
  }));
}

// ─── Koperasi Products from Contentful ───────────────────────────────────────
// Content Type: koperasi_product
// Fields: nama (Symbol), deskripsi (Text), harga (Symbol, optional),
//         kategori (Symbol), emoji (Symbol), tersedia (Boolean), gambar (Asset)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getContentfulProduk(): Promise<any[] | null> {
  const data = await cfetch<any>("koperasi_product", "&order=fields.kategori");
  if (!data?.items) return null;
  return data.items.map((item: any) => ({
    id: item.sys.id,
    nama: item.fields.nama,
    deskripsi: item.fields.deskripsi,
    harga: item.fields.harga ?? null,
    kategori: item.fields.kategori,
    emoji: item.fields.emoji ?? "🛒",
    tersedia: item.fields.tersedia ?? true,
    gambarUrl: item.fields.gambar
      ? `https:${data.includes?.Asset?.find((a: any) => a.sys.id === item.fields.gambar.sys.id)?.fields?.file?.url}`
      : null,
  }));
}

// ─── Announcements from Contentful ───────────────────────────────────────────
// Content Type: pengumuman
// Fields: judul (Symbol), isi (Text), tanggal (Date),
//         tipe (Symbol: "promo"|"info"|"penting"), aktif (Boolean)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getContentfulPengumuman(): Promise<any[] | null> {
  const data = await cfetch<any>("pengumuman", "&order=-fields.tanggal&fields.aktif=true");
  if (!data?.items) return null;
  return data.items.map((item: any) => ({
    id: item.sys.id,
    judul: item.fields.judul,
    isi: item.fields.isi,
    tanggal: item.fields.tanggal,
    tipe: item.fields.tipe ?? "info",
    aktif: item.fields.aktif ?? true,
  }));
}

// ─── Pengumuman Masjid (beranda) ─────────────────────────────────────────────
// Content Type: pengumumanMasjid
// Fields: judul (Symbol, localized), isi (Text, localized), tanggal (Date),
//         kategori (Symbol), aktif (Boolean), pinned (Boolean)
export async function getContentfulPengumumanMasjid(): Promise<any[] | null> {
  const data = await cfetch<any>("pengumumanMasjid", "&order=-fields.pinned,-fields.tanggal&fields.aktif=true");
  if (!data?.items) return null;
  return data.items.map((item: any) => ({
    id: item.sys.id,
    judul: item.fields.judul,
    isi: item.fields.isi,
    tanggal: item.fields.tanggal,
    kategori: item.fields.kategori ?? "umum",
    pinned: item.fields.pinned ?? false,
    aktif: item.fields.aktif ?? true,
  }));
}