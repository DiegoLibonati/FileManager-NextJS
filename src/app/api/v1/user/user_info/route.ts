import type { NextRequest } from "next/server";

import { UserController } from "@/server/controllers/user.controller";

export async function GET(req: NextRequest): Promise<Response> {
  return UserController.getUserInfo(req);
}

export const dynamic = "force-dynamic";
