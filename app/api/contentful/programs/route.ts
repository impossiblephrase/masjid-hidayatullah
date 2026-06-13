import { NextResponse } from "next/server";

const SPACE = process.env.CONTENTFUL_SPACE_ID ?? "";
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN ?? "";
const BASE = `https://cdn.contentful.com/spaces/${SPACE}/environments/master`;

function unwrap(field: any): any {
  if (field === undefined || field === null) return field;
  if (typeof field === "object" && !Array.isArray(field)) {
    return {
      id: field["id-ID"] ?? field.id ?? "",
      en: field["en-US"] ?? field.en ?? "",
      ko: field["ko-KR"] ?? field.ko ?? "",
    };
  }
  return field;
}

export async function GET() {
  if (!SPACE || !TOKEN) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const res = await fetch(
      `${BASE}/entries?content_type=programMasjid&order=fields.slug&access_token=${TOKEN}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return NextResponse.json([], { status: 200 });
    }

    const data = await res.json();
    const entries = data.items || [];
    const assets = data.includes?.Asset || [];

    const normalized = entries
      .filter((item: any) => item.fields.aktif !== false)
      .map((item: any) => {
        const fields = item.fields;
        let imageUrl: string | null = null;

        if (fields.image?.sys?.id) {
          const asset = assets.find((a: any) => a.sys.id === fields.image.sys.id);
          if (asset?.fields?.file?.url) {
            imageUrl = `https:${asset.fields.file.url}`;
          }
        }

        return {
          id: item.sys.id,
          slug: fields.slug,
          title: unwrap(fields.title),
          description: unwrap(fields.description),
          icon: fields.icon ?? "mosque",
          imageUrl,
          schedule: unwrap(fields.schedule),
          aktif: fields.aktif ?? true,
        };
      });

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("Error fetching programs from Contentful:", error);
    return NextResponse.json([], { status: 200 });
  }
}