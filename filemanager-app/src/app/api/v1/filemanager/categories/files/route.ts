import { categoriesExtension } from "@/app/lib/constants";
import { FileManager } from "@/app/lib/fileManager";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const categoryName = searchParams.get("category");

  if (!categoryName) {
    return NextResponse.json(
      {
        error: "Category name is required",
      },
      { status: 400 }
    );
  }

  const extensions = (categoriesExtension as Record<string, string[]>)[
    categoryName!
  ];
  const payload = JSON.parse(req.headers.get("payload")!);
  const pathCloud = path.join(
    `${process.cwd()}/src/cloud`,
    payload.username as string
  );

  const fileManager = new FileManager(pathCloud);
  const categoryFiles = await fileManager.getAllFilesExtension(extensions);

  return NextResponse.json(
    {
      data: categoryFiles,
      message: "Recent upload sent successfully!.",
    },
    { status: 200 }
  );
}
