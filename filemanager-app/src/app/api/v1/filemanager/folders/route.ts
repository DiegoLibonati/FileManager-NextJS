import { FileManager } from "@/app/lib/fileManager";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(req: NextRequest) {
  const payload = JSON.parse(req.headers.get("payload")!);
  const pathCloud = path.join(
    `${process.cwd()}/src/cloud`,
    payload.username as string
  );

  const fileManager = new FileManager(pathCloud);
  const folders = await fileManager.getAllFolders();

  return NextResponse.json(
    {
      data: folders,
      message: "All directories sent successfully!.",
    },
    { status: 200 }
  );
}
