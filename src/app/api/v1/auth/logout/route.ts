import { AuthController } from "@/server/controllers/auth.controller";

export async function GET(): Promise<Response> {
  return AuthController.logout();
}

export const dynamic = "force-dynamic";
