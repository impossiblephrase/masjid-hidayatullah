import { NextResponse } from "next/server";

const SPACE = process.env.CONTENTFUL_SPACE_ID ?? "";
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN ?? "";
const BASE = `https://cdn.contentful.com/spaces/${SPACE}/environments/master`;

function unwrap(field: any): any {
  if (field?.en !== undefined) {
    return { id: field.id ?? "", en: field.en ?? "", ko: field.ko ?? "" };
  }
  return field;
}

export async function GET() {
  if (!SPACE || !TOKEN) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const res = await fetch(
      `${BASE}/entries?content_type=koperasi_product&order=fields.kategori&access_token=${TOKEN}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return NextResponse.json([], { status: 200 });
    }

    const data = await res.json();
    const entries = data.items || [];
    const assets = data.includes?.Asset || [];

    const normalized = entries.map((item: any) => {
      const fields = item.fields;
      let gambarUrl: string | null = null;

      if (fields.gambar?.sys?.id) {
        const asset = assets.find((a: any) => a.sys.id === fields.gambar.sys.id);
        if (asset?.fields?.file?.url) {
          gambarUrl = `https:${asset.fields.file.url}`;
        }
      }

      return {
        id: item.sys.id,
        nama: unwrap(fields.nama),
        deskripsi: unwrap(fields.deskripsi),
        harga: fields.harga ?? null,
        kategori: fields.kategori ?? "layanan",
        emoji: fields.emoji ?? "🛒",
        tersedia: fields.tersedia ?? true,
        gambarUrl,
      };
    });

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("Error fetching koperasi products from Contentful:", error);
    return NextResponse.json([], { status: 200 });
  }
}