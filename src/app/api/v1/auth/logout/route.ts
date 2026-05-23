import type { NextResponse } from "next/server";

import { AuthController } from "@/server/controllers/auth.controller";

export function GET(): NextResponse {
  return AuthController.logout();
}

export const dynamic = "force-dynamic";
