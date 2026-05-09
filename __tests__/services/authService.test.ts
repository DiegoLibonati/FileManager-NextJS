import authService from "@/services/authService";

import {
  mockFetchSuccess,
  mockFetchError,
  mockFetchNetworkError,
} from "@tests/__mocks__/fetch.mock";

describe("authService", () => {
  describe("login", () => {
    it("should call the login endpoint with username and password", async () => {
      const mockData = { code: "SUCCESS_LOGIN", message: "Logged in", data: { username: "alice" } };
      mockFetchSuccess(mockData);

      await authService.login("alice", "password");

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/v1/auth/login",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ username: "alice", password: "password" }),
        })
      );
    });

    it("should return the response data on success", async () => {
      const mockData = { code: "SUCCESS_LOGIN", message: "Logged in", data: { username: "alice" } };
      mockFetchSuccess(mockData);

      const result = await authService.login("alice", "password");

      expect(result).toEqual(mockData);
    });

    it("should throw an error when the response is not ok", async () => {
      mockFetchError(401);

      await expect(authService.login("alice", "wrong")).rejects.toThrow();
    });

    it("should throw a network error when fetch fails", async () => {
      mockFetchNetworkError("Network down");

      await expect(authService.login("alice", "password")).rejects.toThrow("Network down");
    });
  });

  describe("logout", () => {
    it("should call the logout endpoint", async () => {
      mockFetchSuccess({ code: "SUCCESS_LOGOUT", message: "Logged out" });

      await authService.logout();

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/v1/auth/logout",
        expect.objectContaining({ credentials: "include" })
      );
    });

    it("should throw when the logout response is not ok", async () => {
      mockFetchError(500);

      await expect(authService.logout()).rejects.toThrow();
    });
  });

  describe("register", () => {
    it("should call the register endpoint with the correct body", async () => {
      const mockData = { code: "SUCCESS_REGISTER", message: "Created", data: { username: "bob" } };
      mockFetchSuccess(mockData);

      await authService.register("bob", "bob@example.com", "pass123");

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/v1/auth/register",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ username: "bob", email: "bob@example.com", password: "pass123" }),
        })
      );
    });

    it("should throw when registration fails", async () => {
      mockFetchError(400);

      await expect(authService.register("bob", "bob@example.com", "pass")).rejects.toThrow();
    });
  });

  describe("resetPassword", () => {
    it("should call the reset endpoint with the correct body", async () => {
      mockFetchSuccess({ code: "SUCCESS_RESET_PASSWORD", message: "Reset done" });

      await authService.resetPassword("hash-id", "alice", "newpass");

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/v1/auth/reset",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ id: "hash-id", username: "alice", password: "newpass" }),
        })
      );
    });
  });

  describe("sendEmailReset", () => {
    it("should call the send_email_reset endpoint with the email", async () => {
      mockFetchSuccess({ code: "SUCCESS_SEND_EMAIL_RESET", message: "Email sent" });

      await authService.sendEmailReset("alice@example.com");

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/v1/auth/send_email_reset",
        expect.objectContaining({
          body: JSON.stringify({ email: "alice@example.com" }),
        })
      );
    });
  });
});
