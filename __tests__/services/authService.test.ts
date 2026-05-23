import { http, HttpResponse } from "msw";

import authService from "@/services/authService";

import { mockMswServer } from "@tests/__mocks__/mswServer.mock";

describe("authService", () => {
  describe("login", () => {
    it("should return the response data on success", async () => {
      const mockData = { code: "SUCCESS_LOGIN", message: "Logged in", data: { username: "alice" } };
      mockMswServer.use(http.post("/api/v1/auth/login", () => HttpResponse.json(mockData)));

      const result = await authService.login("alice", "password");

      expect(result).toEqual(mockData);
    });

    it("should throw an error when the response is not ok", async () => {
      mockMswServer.use(
        http.post("/api/v1/auth/login", () => new HttpResponse(null, { status: 401 }))
      );

      await expect(authService.login("alice", "wrong")).rejects.toThrow();
    });

    it("should throw a network error when fetch fails", async () => {
      mockMswServer.use(http.post("/api/v1/auth/login", () => HttpResponse.error()));

      await expect(authService.login("alice", "password")).rejects.toThrow();
    });
  });

  describe("logout", () => {
    it("should return the response data on success", async () => {
      const mockData = { code: "SUCCESS_LOGOUT", message: "Logged out" };
      mockMswServer.use(http.get("/api/v1/auth/logout", () => HttpResponse.json(mockData)));

      const result = await authService.logout();

      expect(result).toEqual(mockData);
    });

    it("should throw when the logout response is not ok", async () => {
      mockMswServer.use(
        http.get("/api/v1/auth/logout", () => new HttpResponse(null, { status: 500 }))
      );

      await expect(authService.logout()).rejects.toThrow();
    });
  });

  describe("register", () => {
    it("should return the response data on success", async () => {
      const mockData = { code: "SUCCESS_REGISTER", message: "Created", data: { username: "bob" } };
      mockMswServer.use(http.post("/api/v1/auth/register", () => HttpResponse.json(mockData)));

      const result = await authService.register("bob", "bob@example.com", "pass123");

      expect(result).toEqual(mockData);
    });

    it("should throw when registration fails", async () => {
      mockMswServer.use(
        http.post("/api/v1/auth/register", () => new HttpResponse(null, { status: 400 }))
      );

      await expect(authService.register("bob", "bob@example.com", "pass")).rejects.toThrow();
    });
  });

  describe("resetPassword", () => {
    it("should return the response data on success", async () => {
      const mockData = { code: "SUCCESS_RESET_PASSWORD", message: "Reset done" };
      mockMswServer.use(http.post("/api/v1/auth/reset", () => HttpResponse.json(mockData)));

      const result = await authService.resetPassword("hash-id", "alice", "newpass");

      expect(result).toEqual(mockData);
    });

    it("should throw when reset fails", async () => {
      mockMswServer.use(
        http.post("/api/v1/auth/reset", () => new HttpResponse(null, { status: 400 }))
      );

      await expect(authService.resetPassword("hash-id", "alice", "newpass")).rejects.toThrow();
    });
  });

  describe("sendEmailReset", () => {
    it("should return the response data on success", async () => {
      const mockData = { code: "SUCCESS_SEND_EMAIL_RESET", message: "Email sent" };
      mockMswServer.use(
        http.post("/api/v1/auth/send_email_reset", () => HttpResponse.json(mockData))
      );

      const result = await authService.sendEmailReset("alice@example.com");

      expect(result).toEqual(mockData);
    });

    it("should throw when the request fails", async () => {
      mockMswServer.use(
        http.post("/api/v1/auth/send_email_reset", () => new HttpResponse(null, { status: 400 }))
      );

      await expect(authService.sendEmailReset("alice@example.com")).rejects.toThrow();
    });
  });
});
