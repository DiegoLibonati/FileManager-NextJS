import { categories } from "@src/app/lib/constants";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      data: categories,
    },
    { status: 200 }
  );
}

export const dynamic = "force-dynamic";
