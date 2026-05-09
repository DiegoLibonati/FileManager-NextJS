/**
 * @jest-environment node
 */

import { requireEnv } from "@/server/helpers/require_env.helper";

describe("require_env", () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
  });

  describe("when the environment variable exists", () => {
    it("should return the value of the environment variable", () => {
      process.env.TEST_REQUIRED_VAR = "expected-value";

      const result: string = requireEnv("TEST_REQUIRED_VAR");

      expect(result).toBe("expected-value");
    });
  });

  describe("when the environment variable is missing", () => {
    it("should throw an error mentioning the variable name", () => {
      delete process.env.MISSING_VAR;

      expect(() => requireEnv("MISSING_VAR")).toThrow(
        "Missing required environment variable: MISSING_VAR"
      );
    });
  });

  describe("when the environment variable is an empty string", () => {
    it("should throw an error", () => {
      process.env.EMPTY_VAR = "";

      expect(() => requireEnv("EMPTY_VAR")).toThrow();
    });
  });
});
