import { AliveController } from "@/server/controllers/alive.controller";

export function GET(): Response {
  return AliveController.check();
}

export const dynamic = "force-dynamic";
