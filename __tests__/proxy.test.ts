/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";

import { proxy } from "@/proxy";

import { Jwt } from "@/server/configs/jwt.config";

jest.mock("@/server/configs/jwt.config", () => ({
  Jwt: jest.fn().mockImplementation(() => ({
    verifyJWT: jest.fn().mockResolvedValue(false),
  })),
}));

const buildRequest = (
  url: string,
  options: { method?: string; headers?: Record<string, string> } = {}
): NextRequest =>
  new NextRequest(url, {
    method: options.method ?? "GET",
    headers: {
      host: "localhost",
      ...options.headers,
    },
  });

const mockValidToken = (): void => {
  (Jwt as jest.Mock).mockImplementation(() => ({
    verifyJWT: jest.fn().mockResolvedValue({ payload: { username: "alice" } }),
  }));
};

const mockInvalidToken = (): void => {
  (Jwt as jest.Mock).mockImplementation(() => ({
    verifyJWT: jest.fn().mockResolvedValue(false),
  }));
};

describe("proxy", () => {
  beforeEach(() => {
    mockInvalidToken();
  });

  describe("CSRF protection", () => {
    it("should block cross-origin POST to API routes", async () => {
      const req = buildRequest("http://localhost/api/v1/filemanager", {
        method: "POST",
        headers: { origin: "http://evil.com", host: "localhost" },
      });

      const response = await proxy(req);

      expect(response.status).toBe(403);
    });

    it("should allow same-origin POST to API routes", async () => {
      mockValidToken();
      const req = buildRequest("http://localhost/api/v1/filemanager", {
        method: "POST",
        headers: {
          origin: "http://localhost",
          host: "localhost",
          cookie: "token=valid-token",
        },
      });

      const response = await proxy(req);

      expect(response.status).toBe(200);
    });

    it("should allow GET requests without origin check", async () => {
      const req = buildRequest("http://localhost/api/v1/auth/login");

      const response = await proxy(req);

      expect(response.status).toBe(200);
    });
  });

  describe("public API routes", () => {
    it("should allow requests to auth routes without token", async () => {
      const req = buildRequest("http://localhost/api/v1/auth/login");

      const response = await proxy(req);

      expect(response.status).toBe(200);
    });

    it("should allow requests to health routes without token", async () => {
      const req = buildRequest("http://localhost/api/v1/health/live");

      const response = await proxy(req);

      expect(response.status).toBe(200);
    });

    it("should allow requests to alive route without token", async () => {
      const req = buildRequest("http://localhost/api/v1/alive");

      const response = await proxy(req);

      expect(response.status).toBe(200);
    });
  });

  describe("protected API routes", () => {
    it("should return 401 when no token is provided", async () => {
      const req = buildRequest("http://localhost/api/v1/filemanager");

      const response = await proxy(req);

      expect(response.status).toBe(401);
    });

    it("should return 401 when the token is invalid", async () => {
      const req = buildRequest("http://localhost/api/v1/filemanager", {
        headers: { cookie: "token=invalid-token" },
      });

      const response = await proxy(req);

      expect(response.status).toBe(401);
    });

    it("should forward the request with payload header when token is valid", async () => {
      mockValidToken();
      const req = buildRequest("http://localhost/api/v1/filemanager", {
        headers: { cookie: "token=valid-token" },
      });

      const response = await proxy(req);

      expect(response.status).toBe(200);
    });

    it("should accept Bearer token from Authorization header", async () => {
      mockValidToken();
      const req = buildRequest("http://localhost/api/v1/filemanager", {
        headers: { authorization: "Bearer valid-token" },
      });

      const response = await proxy(req);

      expect(response.status).toBe(200);
    });
  });

  describe("page routes", () => {
    it("should allow unauthenticated access to /login", async () => {
      const req = buildRequest("http://localhost/login");

      const response = await proxy(req);

      expect(response.status).toBe(200);
    });

    it("should redirect authenticated users away from /login", async () => {
      mockValidToken();
      const req = buildRequest("http://localhost/login", {
        headers: { cookie: "token=valid-token" },
      });

      const response = await proxy(req);

      expect(response.status).toBe(307);
      expect(response.headers.get("location")).toContain("/");
    });

    it("should redirect unauthenticated users to /login from protected pages", async () => {
      const req = buildRequest("http://localhost/");

      const response = await proxy(req);

      expect(response.status).toBe(307);
      expect(response.headers.get("location")).toContain("/login");
    });

    it("should allow authenticated users to access protected pages", async () => {
      mockValidToken();
      const req = buildRequest("http://localhost/", {
        headers: { cookie: "token=valid-token" },
      });

      const response = await proxy(req);

      expect(response.status).toBe(200);
    });
  });
});
