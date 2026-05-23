/**
 * @jest-environment node
 */

import { Jwt } from "@/server/configs/jwt.config";

describe("Jwt", () => {
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
      const signer = new Jwt({ payload: { username: "alice" } });
      const token: string = await signer.signJWT();

      const verifier = new Jwt({ token });
      const result = await verifier.verifyJWT();

      expect(result).not.toBe(false);
    });
  });

  describe("signJWT", () => {
    it("should return a non-empty token string", async () => {
      const jwt = new Jwt({ payload: { username: "alice" } });

      const token: string = await jwt.signJWT();

      expect(typeof token).toBe("string");
      expect(token.length).toBeGreaterThan(0);
    });
  });
});
