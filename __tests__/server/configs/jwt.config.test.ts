/**
 * @jest-environment node
 */

import { cookies } from "next/headers";

import { Jwt } from "@/server/configs/jwt.config";

import { mockCookieStore } from "@tests/__mocks__/cookieStore.mock";

jest.mock("next/headers");
jest.mock("@/server/configs/env.config", () => ({
  getEnvs: (): { JWT_SECRET: string } => ({ JWT_SECRET: "test-secret-key-for-jest" }),
}));

describe("Jwt", () => {
  beforeEach((): void => {
    (cookies as jest.Mock).mockResolvedValue(mockCookieStore);
  });

  describe("verifyJWT", () => {
    it("should return false when the token is empty", async () => {
      const jwt = new Jwt({ token: "" });

      const result = await jwt.verifyJWT();

      expect(result).toBe(false);
    });

    it("should return false when the token is invalid", async () => {
      const jwt = new Jwt({ token: "invalid.token.here" });

      const result = await jwt.verifyJWT();

      expect(result).toBe(false);
    });

    it("should return the verification result for a valid token", async () => {
      const signer = new Jwt({ cookieName: "token", payload: { username: "alice" } });
      const token: string = await signer.signJWT();

      const verifier = new Jwt({ token });
      const result = await verifier.verifyJWT();

      expect(result).not.toBe(false);
    });
  });

  describe("signJWT", () => {
    it("should return a non-empty token string", async () => {
      const jwt = new Jwt({ cookieName: "token", payload: { username: "alice" } });

      const token: string = await jwt.signJWT();

      expect(typeof token).toBe("string");
      expect(token.length).toBeGreaterThan(0);
    });

    it("should set the cookie using the provided cookie name", async () => {
      const jwt = new Jwt({ cookieName: "token", payload: { username: "alice" } });

      await jwt.signJWT();

      expect(mockCookieStore.set).toHaveBeenCalledWith("token", expect.any(String));
    });
  });

  describe("deleteCookieJWT", () => {
    it("should call delete on the cookie store with the cookie name", async () => {
      const jwt = new Jwt({ cookieName: "token" });

      await jwt.deleteCookieJWT();

      expect(mockCookieStore.delete).toHaveBeenCalledWith("token");
    });
  });
});
