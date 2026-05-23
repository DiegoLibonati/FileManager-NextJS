/**
 * @jest-environment node
 */

import { GET } from "@/app/api/v1/health/ready/route";
import { HealthService } from "@/server/services/health.service";
import { CODES_SUCCESS, CODES_ERROR } from "@/server/constants/codes.constant";

jest.mock("@/server/services/health.service");
jest.mock("@/server/configs/logger.config", () => ({
  logger: {
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

describe("route", () => {
  describe("GET /api/v1/health/ready", () => {
    it("should return 200 when the database is connected", async () => {
      (HealthService.checkReadiness as jest.Mock).mockResolvedValue({ db: true });

      const response = await GET();
      const body = (await response.json()) as { code: string; data: { db: boolean } };

      expect(response.status).toBe(200);
      expect(body.code).toBe(CODES_SUCCESS.healthReady);
      expect(body.data.db).toBe(true);
    });

    it("should return 503 when the database is not connected", async () => {
      (HealthService.checkReadiness as jest.Mock).mockResolvedValue({ db: false });

      const response = await GET();
      const body = (await response.json()) as { code: string; data: { db: boolean } };

      expect(response.status).toBe(503);
      expect(body.code).toBe(CODES_ERROR.generic);
      expect(body.data.db).toBe(false);
    });
  });
});
