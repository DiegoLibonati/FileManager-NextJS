import { HealthController } from "@/server/controllers/health.controller";

export function GET(): Response {
  return HealthController.live();
}
