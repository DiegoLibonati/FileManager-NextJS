/**
 * @jest-environment node
 */

import { getEnvs } from "@/server/configs/env.config";

import { warnIfDbUnreachable } from "@/server/startup/db_check.startup";

import { mockEnvs } from "@tests/__mocks__/envs.mock";

jest.mock("@/server/configs/env.config", () => ({
  getEnvs: jest.fn(),
}));
jest.mock("@/server/configs/logger.config", () => ({
  logger: {
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

const mockGetEnvs = getEnvs as jest.Mock;

const buildDatabaseUrl = (host: string, port: string): string =>
  `mongodb://${mockEnvs.MONGO_USER}:${mockEnvs.MONGO_PASS}@${host}:${port}/${mockEnvs.MONGO_DB_NAME}?authSource=${mockEnvs.MONGO_AUTH_SOURCE}`;

describe("db_check.startup", () => {
  describe("warnIfDbUnreachable", () => {
    it("should not log a warning when the database port is reachable", async () => {
      const { logger } = jest.requireMock("@/server/configs/logger.config");
      mockGetEnvs.mockReturnValue({
        DATABASE_URL: buildDatabaseUrl(mockEnvs.MONGO_HOST, mockEnvs.MONGO_PORT),
      });

      await warnIfDbUnreachable();

      expect(logger.warn).not.toHaveBeenCalled();
    });

    it("should log a warning with host and port when the database port is closed", async () => {
      const { logger } = jest.requireMock("@/server/configs/logger.config");
      mockGetEnvs.mockReturnValue({
        DATABASE_URL: buildDatabaseUrl("localhost", "27099"),
      });

      await warnIfDbUnreachable();

      expect(logger.warn).toHaveBeenCalledTimes(1);
      expect(logger.warn).toHaveBeenCalledWith(
        { host: "localhost", port: 27099 },
        expect.stringContaining("localhost:27099")
      );
    });

    it("should resolve without logging when the env loader throws", async () => {
      const { logger } = jest.requireMock("@/server/configs/logger.config");
      mockGetEnvs.mockImplementation(() => {
        throw new Error("Invalid environment variables");
      });

      await expect(warnIfDbUnreachable()).resolves.toBeUndefined();
      expect(logger.warn).not.toHaveBeenCalled();
    });

    it("should resolve without logging when the database url is malformed", async () => {
      const { logger } = jest.requireMock("@/server/configs/logger.config");
      mockGetEnvs.mockReturnValue({ DATABASE_URL: "not-a-valid-url" });

      await expect(warnIfDbUnreachable()).resolves.toBeUndefined();
      expect(logger.warn).not.toHaveBeenCalled();
    });
  });
});
