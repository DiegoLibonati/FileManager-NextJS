import type { NextRequest } from "next/server";

import { AuthController } from "@/server/controllers/auth.controller";

export async function GET(req: NextRequest): Promise<Response> {
  return AuthController.verify(req);
}

export const dynamic = "force-dynamic";
