import { NextResponse } from "next/server";

const SPACE = process.env.CONTENTFUL_SPACE_ID ?? "";
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN ?? "";

export async function GET() {
  if (!SPACE || !TOKEN) return NextResponse.json([]);

  try {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${SPACE}/environments/default/entries?content_type=program&order=fields.order&access_token=${TOKEN}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return NextResponse.json([]);

    const data = await res.json();

    const unwrap = (field: any) => {
      if (field === undefined || field === null) return field;
      if (typeof field === "object" && !Array.isArray(field)) {
        return field["en-US"] ?? Object.values(field)[0];
      }
      return field;
    };

    const programs = data.items.map((item: any) => ({
      slug:  unwrap(item.fields.slug),
      icon:  unwrap(item.fields.icon),
      title: unwrap(item.fields.title),
      desc:  unwrap(item.fields.desc),
      order: unwrap(item.fields.order),
    }));

    return NextResponse.json(programs);
  } catch {
    return NextResponse.json([]);
  }
}