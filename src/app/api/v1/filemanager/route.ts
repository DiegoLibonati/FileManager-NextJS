import type { NextRequest } from "next/server";

import { FileManagerController } from "@/server/controllers/filemanager.controller";

export async function GET(req: NextRequest): Promise<Response> {
  return FileManagerController.getDirectory(req);
}

export async function POST(req: NextRequest): Promise<Response> {
  return FileManagerController.createFolder(req);
}

export async function DELETE(req: NextRequest): Promise<Response> {
  return FileManagerController.deleteItem(req);
}

export const dynamic = "force-dynamic";
