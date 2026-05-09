import type { NextRequest } from "next/server";

import { FileManagerController } from "@/server/controllers/filemanager.controller";

export async function POST(req: NextRequest): Promise<Response> {
  return FileManagerController.upload(req);
}

export const dynamic = "force-dynamic";
