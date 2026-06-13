import { NextResponse } from "next/server";

const SPACE = process.env.CONTENTFUL_SPACE_ID ?? "";
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN ?? "";
const BASE = `https://cdn.contentful.com/spaces/${SPACE}/environments/master`;

export async function GET() {
  if (!SPACE || !TOKEN) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const res = await fetch(
      `${BASE}/entries?content_type=gallery_item&access_token=${TOKEN}`,
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
      let imageUrl: string | null = null;

      if (fields.image?.sys?.id) {
        const asset = assets.find((a: any) => a.sys.id === fields.image.sys.id);
        if (asset?.fields?.file?.url) {
          imageUrl = `https:${asset.fields.file.url}`;
        }
      }

      return {
        id: item.sys.id,
        title: fields.title ?? "Untitled",
        imageUrl,
        category: fields.category ?? "General",
      };
    });

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("Error fetching gallery from Contentful:", error);
    return NextResponse.json([], { status: 200 });
  }
}