/**
 * @jest-environment node
 */

import { HealthController } from "@/server/controllers/health.controller";
import { HealthService } from "@/server/services/health.service";
import { CODES_SUCCESS, CODES_ERROR } from "@/server/constants/codes.constant";
import { MESSAGES_SUCCESS } from "@/server/constants/messages.constant";

jest.mock("@/server/services/health.service");
jest.mock("@/server/configs/logger.config", () => ({
  logger: {
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

describe("health.controller", () => {
  describe("live", () => {
    it("should return 200 with health live code and message", () => {
      const response = HealthController.live();

      expect(response.status).toBe(200);
    });

    it("should return the correct response body", async () => {
      const response = HealthController.live();
      const body = (await response.json()) as { code: string; message: string };

      expect(body.code).toBe(CODES_SUCCESS.healthLive);
      expect(body.message).toBe(MESSAGES_SUCCESS.healthLive);
    });
  });

  describe("ready", () => {
    it("should return 200 when the database is connected", async () => {
      (HealthService.checkReadiness as jest.Mock).mockResolvedValue({ db: true });

      const response = await HealthController.ready();
      const body = (await response.json()) as { code: string; data: { db: boolean } };

      expect(response.status).toBe(200);
      expect(body.code).toBe(CODES_SUCCESS.healthReady);
      expect(body.data.db).toBe(true);
    });

    it("should return 503 when the database is not connected", async () => {
      (HealthService.checkReadiness as jest.Mock).mockResolvedValue({ db: false });

      const response = await HealthController.ready();
      const body = (await response.json()) as { code: string; data: { db: boolean } };

      expect(response.status).toBe(503);
      expect(body.code).toBe(CODES_ERROR.generic);
      expect(body.data.db).toBe(false);
    });

    it("should log a warning when readiness fails", async () => {
      const { logger } = jest.requireMock("@/server/configs/logger.config");
      (HealthService.checkReadiness as jest.Mock).mockResolvedValue({ db: false });

      await HealthController.ready();

      expect(logger.warn).toHaveBeenCalledWith(
        expect.objectContaining({ deps: { db: false } }),
        "Readiness probe failed"
      );
    });
  });
});
