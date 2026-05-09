import type { NextRequest } from "next/server";

import { FileManagerController } from "@/server/controllers/filemanager.controller";

export async function GET(req: NextRequest): Promise<Response> {
  return FileManagerController.getAllFolders(req);
}

export const dynamic = "force-dynamic";
