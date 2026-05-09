/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import { cookies } from "next/headers";

import { proxy } from "@/proxy";

import { Jwt } from "@/server/configs/jwt.config";

jest.mock("next/headers");
jest.mock("@/server/configs/jwt.config", () => ({
  Jwt: jest.fn().mockImplementation(() => ({
    verifyJWT: jest.fn(),
    config: {},
  })),
}));
jest.mock("@/server/configs/env.config", () => ({
  getEnvs: (): { JWT_SECRET: string } => ({ JWT_SECRET: "test-secret-key-for-jest" }),
}));

const buildRequest = (url: string, headers: Record<string, string> = {}): NextRequest =>
  new NextRequest(url, { headers });

const mockCookieStore = (tokenValue?: string): void => {
  const store = {
    get: jest.fn().mockReturnValue(tokenValue ? { value: tokenValue } : undefined),
  };
  (cookies as jest.Mock).mockResolvedValue(store);
};

describe("proxy", () => {
  describe("when the path is an API auth path", () => {
    it("should allow the request through without token validation", async () => {
      mockCookieStore();
      const req = buildRequest("http://localhost/api/v1/auth/login");

      const response = await proxy(req);

      expect(response.status).toBe(200);
    });

    it("should allow logout without a token", async () => {
      mockCookieStore();
      const req = buildRequest("http://localhost/api/v1/auth/logout");

      const response = await proxy(req);

      expect(response.status).toBe(200);
    });
  });

  describe("when the path is a protected API path", () => {
    it("should return 401 when no authorization token is provided", async () => {
      mockCookieStore();
      const req = buildRequest("http://localhost/api/v1/filemanager");

      const response = await proxy(req);

      expect(response.status).toBe(401);
    });

    it("should return 401 when the token is invalid", async () => {
      mockCookieStore("invalid-token");
      (Jwt as jest.Mock).mockImplementation(() => ({
        verifyJWT: jest.fn().mockResolvedValue(false),
        config: {},
      }));
      const req = buildRequest("http://localhost/api/v1/filemanager");

      const response = await proxy(req);

      expect(response.status).toBe(401);
    });

    it("should forward the request when the token is valid", async () => {
      mockCookieStore("valid-token");
      (Jwt as jest.Mock).mockImplementation(() => ({
        verifyJWT: jest.fn().mockResolvedValue({ payload: { username: "alice" } }),
        config: {},
      }));
      const req = buildRequest("http://localhost/api/v1/filemanager");

      const response = await proxy(req);

      expect(response.status).toBe(200);
    });
  });

  describe("when the path is a public page", () => {
    it("should allow access to /login without a token", async () => {
      mockCookieStore();
      (Jwt as jest.Mock).mockImplementation(() => ({
        verifyJWT: jest.fn().mockResolvedValue(false),
        config: {},
      }));
      const req = buildRequest("http://localhost/login");

      const response = await proxy(req);

      expect(response.status).toBe(200);
    });

    it("should redirect authenticated users away from /login", async () => {
      mockCookieStore("valid-token");
      (Jwt as jest.Mock).mockImplementation(() => ({
        verifyJWT: jest.fn().mockResolvedValue({ payload: { username: "alice" } }),
        config: {},
      }));
      const req = buildRequest("http://localhost/login");

      const response = await proxy(req);

      expect(response.status).toBe(307);
    });
  });

  describe("when the path is a protected page", () => {
    it("should redirect unauthenticated users to /login", async () => {
      mockCookieStore();
      (Jwt as jest.Mock).mockImplementation(() => ({
        verifyJWT: jest.fn().mockResolvedValue(false),
        config: {},
      }));
      const req = buildRequest("http://localhost/");

      const response = await proxy(req);

      expect(response.status).toBe(307);
      expect(response.headers.get("location")).toContain("/login");
    });

    it("should allow authenticated users to access protected pages", async () => {
      mockCookieStore("valid-token");
      (Jwt as jest.Mock).mockImplementation(() => ({
        verifyJWT: jest.fn().mockResolvedValue({ payload: { username: "alice" } }),
        config: {},
      }));
      const req = buildRequest("http://localhost/");

      const response = await proxy(req);

      expect(response.status).toBe(200);
    });
  });
});
