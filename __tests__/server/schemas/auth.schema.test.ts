/**
 * @jest-environment node
 */

import {
  loginBodySchema,
  registerBodySchema,
  verifyQuerySchema,
  resetPasswordBodySchema,
  sendEmailResetBodySchema,
} from "@/server/schemas/auth.schema";

describe("auth.schema", () => {
  describe("loginBodySchema", () => {
    it("should accept valid login data", () => {
      const result = loginBodySchema.safeParse({ username: "alice", password: "pass123" });

      expect(result.success).toBe(true);
    });

    it("should reject when username is missing", () => {
      const result = loginBodySchema.safeParse({ password: "pass123" });

      expect(result.success).toBe(false);
    });

    it("should reject when password is missing", () => {
      const result = loginBodySchema.safeParse({ username: "alice" });

      expect(result.success).toBe(false);
    });

    it("should reject when username is empty after trim", () => {
      const result = loginBodySchema.safeParse({ username: "   ", password: "pass" });

      expect(result.success).toBe(false);
    });

    it("should trim the username", () => {
      const result = loginBodySchema.safeParse({ username: "  alice  ", password: "pass" });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.username).toBe("alice");
      }
    });
  });

  describe("registerBodySchema", () => {
    it("should accept valid registration data", () => {
      const result = registerBodySchema.safeParse({
        username: "bob",
        email: "bob@example.com",
        password: "pass123",
      });

      expect(result.success).toBe(true);
    });

    it("should reject when email is invalid", () => {
      const result = registerBodySchema.safeParse({
        username: "bob",
        email: "not-an-email",
        password: "pass123",
      });

      expect(result.success).toBe(false);
    });

    it("should reject when any field is missing", () => {
      const result = registerBodySchema.safeParse({ username: "bob", password: "pass" });

      expect(result.success).toBe(false);
    });
  });

  describe("verifyQuerySchema", () => {
    it("should accept valid verify params", () => {
      const result = verifyQuerySchema.safeParse({ id: "hashed-id", username: "alice" });

      expect(result.success).toBe(true);
    });

    it("should reject when id is missing", () => {
      const result = verifyQuerySchema.safeParse({ username: "alice" });

      expect(result.success).toBe(false);
    });

    it("should reject when username is missing", () => {
      const result = verifyQuerySchema.safeParse({ id: "hashed-id" });

      expect(result.success).toBe(false);
    });
  });

  describe("resetPasswordBodySchema", () => {
    it("should accept valid reset password data", () => {
      const result = resetPasswordBodySchema.safeParse({
        id: "hashed-id",
        username: "alice",
        password: "newpass",
      });

      expect(result.success).toBe(true);
    });

    it("should reject when password is missing", () => {
      const result = resetPasswordBodySchema.safeParse({
        id: "hashed-id",
        username: "alice",
      });

      expect(result.success).toBe(false);
    });
  });

  describe("sendEmailResetBodySchema", () => {
    it("should accept a valid email", () => {
      const result = sendEmailResetBodySchema.safeParse({ email: "alice@example.com" });

      expect(result.success).toBe(true);
    });

    it("should reject an invalid email", () => {
      const result = sendEmailResetBodySchema.safeParse({ email: "not-valid" });

      expect(result.success).toBe(false);
    });

    it("should reject when email is missing", () => {
      const result = sendEmailResetBodySchema.safeParse({});

      expect(result.success).toBe(false);
    });
  });
});
