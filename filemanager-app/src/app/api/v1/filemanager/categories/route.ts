import { categories } from "@/helpers/constants";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      data: categories,
    },
    { status: 200 }
  );
}
