import { NextResponse } from "next/server";

const SPACE = process.env.CONTENTFUL_SPACE_ID ?? "";
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN ?? "";
const BASE = `https://cdn.contentful.com/spaces/${SPACE}/environments/master`;

type Localized = { id: string; en: string; ko: string };
type ContentfulEntry = { sys: { id: string }; fields: Record<string, unknown> };

// With `locale=*`, Contentful returns each field as a { "<localeCode>": value } map.
function isLocaleMap(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    !("sys" in (value as Record<string, unknown>))
  );
}

function asText(value: unknown): string {
  if (value == null) return "";
  return typeof value === "string" ? value : String(value);
}

// Localized text fields -> { id, en, ko }, matching id/en/ko regardless of the
// exact locale code (id, id-ID, en-US, ko-KR, ...), falling back to any value.
function localize(field: unknown): Localized | unknown {
  if (!isLocaleMap(field)) return field;
  const keys = Object.keys(field);
  const byPrefix = (prefix: string) => {
    const key = keys.find((k) => k.toLowerCase().startsWith(prefix));
    return key !== undefined ? field[key] : undefined;
  };
  const first = keys.length ? field[keys[0]] : "";
  return {
    id: asText(byPrefix("id") ?? first),
    en: asText(byPrefix("en") ?? first),
    ko: asText(byPrefix("ko") ?? first),
  };
}

// Non-localized fields -> the single locale value.
function scalar(field: unknown): unknown {
  if (!isLocaleMap(field)) return field;
  const keys = Object.keys(field);
  return keys.length ? field[keys[0]] : undefined;
}

export async function GET() {
  if (!SPACE || !TOKEN) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const res = await fetch(
      `${BASE}/entries?content_type=pengumuman&order=-fields.tanggal&locale=*&access_token=${TOKEN}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return NextResponse.json([], { status: 200 });
    }

    const data = (await res.json()) as { items?: ContentfulEntry[] };
    const entries = data.items ?? [];

    const normalized = entries
      .filter((item) => scalar(item.fields?.aktif) !== false)
      .map((item) => {
        const fields = item.fields ?? {};
        const tanggal = scalar(fields.tanggal);
        const tipe = scalar(fields.tipe);
        return {
          id: item.sys.id,
          judul: localize(fields.judul),
          isi: localize(fields.isi),
          tanggal: typeof tanggal === "string" ? tanggal.slice(0, 10) : tanggal,
          tipe: typeof tipe === "string" ? tipe : "info",
          aktif: scalar(fields.aktif) ?? true,
        };
      });

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("Error fetching pengumuman koperasi from Contentful:", error);
    return NextResponse.json([], { status: 200 });
  }
}
