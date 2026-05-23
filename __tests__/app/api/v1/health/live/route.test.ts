/**
 * @jest-environment node
 */

import { GET } from "@/app/api/v1/health/live/route";
import { CODES_SUCCESS } from "@/server/constants/codes.constant";

describe("route", () => {
  describe("GET /api/v1/health/live", () => {
    it("should return 200 with the health live code", async () => {
      const response = GET();
      const body = (await response.json()) as { code: string };

      expect(response.status).toBe(200);
      expect(body.code).toBe(CODES_SUCCESS.healthLive);
    });
  });
});
