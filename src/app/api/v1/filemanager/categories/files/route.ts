import type { NextRequest } from "next/server";

import { FileManagerController } from "@/server/controllers/filemanager.controller";

export async function GET(req: NextRequest): Promise<Response> {
  return FileManagerController.getCategoryFiles(req);
}

export const dynamic = "force-dynamic";
