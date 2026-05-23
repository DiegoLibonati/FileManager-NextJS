/**
 * @jest-environment node
 */

import { AliveController } from "@/server/controllers/alive.controller";
import { CODES_SUCCESS } from "@/server/constants/codes.constant";
import { MESSAGES_SUCCESS } from "@/server/constants/messages.constant";

describe("alive.controller", () => {
  describe("check", () => {
    it("should return 200", () => {
      const response = AliveController.check();

      expect(response.status).toBe(200);
    });

    it("should return the correct response body with app metadata", async () => {
      const response = AliveController.check();
      const body = (await response.json()) as {
        code: string;
        message: string;
        data: { author: string; name: string; version: string };
      };

      expect(body.code).toBe(CODES_SUCCESS.alive);
      expect(body.message).toBe(MESSAGES_SUCCESS.alive);
      expect(body.data.author).toBe("Diego Libonati");
      expect(body.data.name).toBe("Nexdrive");
      expect(body.data.version).toBe("1.0.0");
    });
  });
});
