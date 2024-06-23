import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      author: "Diego Libonati",
      name: "FileManager",
      version: "1.0.0",
    },
    { status: 200 }
  );
}
