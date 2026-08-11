/**
 * @jest-environment node
 */

import { register } from "@/instrumentation";

import { warnIfDbUnreachable } from "@/server/startup/db_check.startup";

jest.mock("@/server/startup/db_check.startup", () => ({
  warnIfDbUnreachable: jest.fn(),
}));

const mockWarnIfDbUnreachable = warnIfDbUnreachable as jest.Mock;

describe("instrumentation", () => {
  const ORIGINAL_ENV = process.env;

  beforeEach((): void => {
    process.env = { ...ORIGINAL_ENV };
  });

  afterEach((): void => {
    process.env = ORIGINAL_ENV;
  });

  describe("register", () => {
    it("should run the database reachability check when NEXT_RUNTIME is nodejs", async () => {
      process.env.NEXT_RUNTIME = "nodejs";
      mockWarnIfDbUnreachable.mockResolvedValue(undefined);

      await register();

      expect(mockWarnIfDbUnreachable).toHaveBeenCalledTimes(1);
    });

    it("should not run the database reachability check when NEXT_RUNTIME is edge", async () => {
      process.env.NEXT_RUNTIME = "edge";

      await register();

      expect(mockWarnIfDbUnreachable).not.toHaveBeenCalled();
    });

    it("should not run the database reachability check when NEXT_RUNTIME is undefined", async () => {
      delete process.env.NEXT_RUNTIME;

      await register();

      expect(mockWarnIfDbUnreachable).not.toHaveBeenCalled();
    });
  });
});
