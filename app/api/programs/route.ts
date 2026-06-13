import { getContentfulPrograms } from "@/lib/contentful";
import { NextResponse } from "next/server";

export async function GET() {
  const programs = await getContentfulPrograms();
  return NextResponse.json(programs ?? []);
}