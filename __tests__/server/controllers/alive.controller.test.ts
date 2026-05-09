/**
 * @jest-environment node
 */

import { AliveController } from "@/server/controllers/alive.controller";

describe("alive.controller", () => {
  describe("check", () => {
    it("should return a 200 response", () => {
      const response: Response = AliveController.check();

      expect(response.status).toBe(200);
    });

    it("should return the author, name and version in the body", async () => {
      const response: Response = AliveController.check();
      const body = (await response.json()) as { author: string; name: string; version: string };

      expect(body.author).toBe("Diego Libonati");
      expect(body.name).toBe("Nexdrive");
      expect(body.version).toBe("1.0.0");
    });
  });
});
