/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";

import { AuthController } from "@/server/controllers/auth.controller";
import { AuthService } from "@/server/services/auth.service";
import { Jwt } from "@/server/configs/jwt.config";

jest.mock("@/server/services/auth.service");
jest.mock("@/server/configs/jwt.config", () => ({
  Jwt: jest.fn().mockImplementation(() => ({
    signJWT: jest.fn().mockResolvedValue("mock-token"),
    deleteCookieJWT: jest.fn().mockResolvedValue(undefined),
    verifyJWT: jest.fn().mockResolvedValue(false),
  })),
}));

beforeEach(() => {
  (Jwt as jest.Mock).mockImplementation(() => ({
    signJWT: jest.fn().mockResolvedValue("mock-token"),
    deleteCookieJWT: jest.fn().mockResolvedValue(undefined),
    verifyJWT: jest.fn().mockResolvedValue(false),
  }));
});

const mockUser = {
  _id: "507f1f77bcf86cd799439011",
  username: "alice",
  email: "alice@example.com",
  plan: "0",
  emailVerified: false,
};

const buildRequest = (body: unknown, url = "http://localhost/api/v1/auth/login"): NextRequest =>
  new NextRequest(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

describe("auth.controller", () => {
  describe("login", () => {
    it("should return 400 when username is missing", async () => {
      const req = buildRequest({ password: "pass" });

      const response = await AuthController.login(req);

      expect(response.status).toBe(400);
      expect(AuthService.validateLogin).not.toHaveBeenCalled();
    });

    it("should return 400 when password is missing", async () => {
      const req = buildRequest({ username: "alice" });

      const response = await AuthController.login(req);

      expect(response.status).toBe(400);
    });

    it("should return 400 when the service reports an error", async () => {
      (AuthService.validateLogin as jest.Mock).mockResolvedValue({ error: "Incorrect password." });
      const req = buildRequest({ username: "alice", password: "wrong" });

      const response = await AuthController.login(req);

      expect(response.status).toBe(400);
    });

    it("should return 200 with user data on successful login", async () => {
      (AuthService.validateLogin as jest.Mock).mockResolvedValue({ data: mockUser });
      const req = buildRequest({ username: "alice", password: "correct" });

      const response = await AuthController.login(req);
      const body = (await response.json()) as { data: typeof mockUser };

      expect(response.status).toBe(200);
      expect(body.data.username).toBe("alice");
    });
  });

  describe("logout", () => {
    it("should return 200 on successful logout", async () => {
      const response = await AuthController.logout();

      expect(response.status).toBe(200);
    });
  });

  describe("register", () => {
    it("should return 400 when any required field is missing", async () => {
      const req = buildRequest({ username: "alice", password: "pass" });

      const response = await AuthController.register(req);

      expect(response.status).toBe(400);
      expect(AuthService.register).not.toHaveBeenCalled();
    });

    it("should return 400 when the service reports an error", async () => {
      (AuthService.register as jest.Mock).mockResolvedValue({ error: "Username taken." });
      const req = buildRequest({ username: "alice", email: "a@a.com", password: "pass" });

      const response = await AuthController.register(req);

      expect(response.status).toBe(400);
    });

    it("should return 201 with user data on successful registration", async () => {
      (AuthService.register as jest.Mock).mockResolvedValue({ data: mockUser });
      const req = buildRequest({ username: "bob", email: "bob@example.com", password: "pass123" });

      const response = await AuthController.register(req);

      expect(response.status).toBe(201);
    });
  });

  describe("verify", () => {
    it("should return 400 when id or username is missing", async () => {
      const req = new NextRequest("http://localhost/api/v1/auth/verify?username=alice");

      const response = await AuthController.verify(req);

      expect(response.status).toBe(400);
    });

    it("should return 400 when the service reports an error", async () => {
      (AuthService.verifyEmail as jest.Mock).mockResolvedValue({ error: "Invalid link." });
      const req = new NextRequest("http://localhost/api/v1/auth/verify?id=hash&username=alice");

      const response = await AuthController.verify(req);

      expect(response.status).toBe(400);
    });

    it("should redirect to the URL returned by the service on success", async () => {
      (AuthService.verifyEmail as jest.Mock).mockResolvedValue({
        data: { redirectUrl: "http://localhost:3000/login" },
      });
      const req = new NextRequest(
        "http://localhost/api/v1/auth/verify?id=valid-hash&username=alice"
      );

      const response = await AuthController.verify(req);

      expect(response.status).toBe(307);
    });
  });

  describe("resetPassword", () => {
    it("should return 400 when any required field is missing", async () => {
      const req = buildRequest({ id: "hash", username: "alice" });

      const response = await AuthController.resetPassword(req);

      expect(response.status).toBe(400);
    });

    it("should return 400 when the service reports an error", async () => {
      (AuthService.resetPassword as jest.Mock).mockResolvedValue({ error: "Invalid link." });
      const req = buildRequest({ id: "hash", username: "alice", password: "newpass" });

      const response = await AuthController.resetPassword(req);

      expect(response.status).toBe(400);
    });

    it("should return 200 on successful password reset", async () => {
      (AuthService.resetPassword as jest.Mock).mockResolvedValue({ data: true });
      const req = buildRequest({ id: "valid-hash", username: "alice", password: "newpass123" });

      const response = await AuthController.resetPassword(req);

      expect(response.status).toBe(200);
    });
  });

  describe("sendEmailReset", () => {
    it("should return 400 when email is missing", async () => {
      const req = buildRequest({});

      const response = await AuthController.sendEmailReset(req);

      expect(response.status).toBe(400);
    });

    it("should return 400 when the service reports an error", async () => {
      (AuthService.sendEmailReset as jest.Mock).mockResolvedValue({ error: "Email not found." });
      const req = buildRequest({ email: "ghost@example.com" });

      const response = await AuthController.sendEmailReset(req);

      expect(response.status).toBe(400);
    });

    it("should return 200 on successful email dispatch", async () => {
      (AuthService.sendEmailReset as jest.Mock).mockResolvedValue({ data: true });
      const req = buildRequest({ email: "alice@example.com" });

      const response = await AuthController.sendEmailReset(req);

      expect(response.status).toBe(200);
    });
  });
});
