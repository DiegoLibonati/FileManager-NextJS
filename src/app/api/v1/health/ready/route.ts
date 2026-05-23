import { HealthController } from "@/server/controllers/health.controller";

export async function GET(): Promise<Response> {
  return HealthController.ready();
}
