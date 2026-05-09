/**
 * @jest-environment node
 */

import { Encrypt } from "@/server/helpers/encrypt.helper";

describe("Encrypt", () => {
  const encrypt = new Encrypt();

  describe("cryptString", () => {
    it("should return a hashed string that differs from the original", async () => {
      const original = "my-secret-password";

      const hashed: string = await encrypt.cryptString(original);

      expect(hashed).not.toBe(original);
      expect(hashed.length).toBeGreaterThan(0);
    });

    it("should produce different hashes for the same input on consecutive calls", async () => {
      const original = "same-password";

      const hash1: string = await encrypt.cryptString(original);
      const hash2: string = await encrypt.cryptString(original);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe("compareString", () => {
    it("should return true when the plain string matches its hash", async () => {
      const original = "correct-password";
      const hashed: string = await encrypt.cryptString(original);

      const result: boolean = await encrypt.compareString(original, hashed);

      expect(result).toBe(true);
    });

    it("should return false when the plain string does not match the hash", async () => {
      const hashed: string = await encrypt.cryptString("original-password");

      const result: boolean = await encrypt.compareString("wrong-password", hashed);

      expect(result).toBe(false);
    });

    it("should return false for an empty string against a valid hash", async () => {
      const hashed: string = await encrypt.cryptString("some-password");

      const result: boolean = await encrypt.compareString("", hashed);

      expect(result).toBe(false);
    });
  });
});
