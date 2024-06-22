import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      author: "Diego Libonati",
      name: "FileManager",
      version: "0.0.1",
    },
    { status: 200 }
  );
}
