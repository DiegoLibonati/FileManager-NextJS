/**
 * @jest-environment node
 */

import type { Envs } from "@/types/api";

describe("env.config", () => {
  const ORIGINAL_ENV = process.env;

  beforeEach((): void => {
    jest.resetModules();
    process.env = {
      ...ORIGINAL_ENV,
      CLOUD_PATH: "/home/app/cloud",
      NEXT_PUBLIC_API_URL: "http://localhost:3000",
    };
  });

  afterEach((): void => {
    process.env = ORIGINAL_ENV;
  });

  describe("getEnvs", () => {
    it("should return the configured environment values when all vars are set", async () => {
      const { getEnvs } = await import("@/server/configs/env.config");
      const result: Envs = getEnvs();

      expect(result.JWT_SECRET).toBe("test-secret-key-for-jest");
      expect(result.EMAIL).toBe("pepe@gmail.com");
      expect(result.CLOUD_PATH).toBe("/home/app/cloud");
      expect(result.NEXT_PUBLIC_API_URL).toBe("http://localhost:3000");
      expect(result.DATABASE_URL).toContain("localhost");
      expect(result.DATABASE_URL).toContain("27018");
    });

    it("should return the same object reference on subsequent calls", async () => {
      const { getEnvs } = await import("@/server/configs/env.config");
      const first: Envs = getEnvs();
      const second: Envs = getEnvs();

      expect(first).toBe(second);
    });

    it("should build the DATABASE_URL with credentials when MONGO_USER and MONGO_PASS are set", async () => {
      const { getEnvs } = await import("@/server/configs/env.config");
      const result: Envs = getEnvs();

      expect(result.DATABASE_URL).toContain("root");
      expect(result.DATABASE_URL).toContain("pass");
    });

    it("should throw when a required variable is missing", async () => {
      delete process.env.JWT_SECRET;

      const { getEnvs } = await import("@/server/configs/env.config");

      expect(() => getEnvs()).toThrow("Missing required environment variable: JWT_SECRET");
    });
  });
});
