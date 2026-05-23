import { http, HttpResponse } from "msw";

import userService from "@/services/userService";

import { mockMswServer } from "@tests/__mocks__/mswServer.mock";

describe("userService", () => {
  describe("getUserInfo", () => {
    it("should return the response data on success", async () => {
      const mockData = {
        code: "SUCCESS_GET_USER_INFO",
        message: "ok",
        data: { username: "alice", email: "alice@example.com", plan: "0", emailVerified: false },
      };
      mockMswServer.use(http.get("/api/v1/user/user_info", () => HttpResponse.json(mockData)));

      const result = await userService.getUserInfo();

      expect(result).toEqual(mockData);
    });

    it("should throw when the response is not ok", async () => {
      mockMswServer.use(
        http.get("/api/v1/user/user_info", () => new HttpResponse(null, { status: 401 }))
      );

      await expect(userService.getUserInfo()).rejects.toThrow();
    });
  });

  describe("changePlan", () => {
    it("should return the response data on success", async () => {
      const mockData = { code: "SUCCESS_CHANGE_PLAN", message: "ok", data: {} };
      mockMswServer.use(http.get("/api/v1/user/change_plan", () => HttpResponse.json(mockData)));

      const result = await userService.changePlan("1");

      expect(result).toEqual(mockData);
    });

    it("should throw when the response is not ok", async () => {
      mockMswServer.use(
        http.get("/api/v1/user/change_plan", () => new HttpResponse(null, { status: 400 }))
      );

      await expect(userService.changePlan("1")).rejects.toThrow();
    });
  });

  describe("sendVerificationEmail", () => {
    it("should return the response data on success", async () => {
      const mockData = { code: "SUCCESS_SEND_VERIFICATION_EMAIL", message: "ok" };
      mockMswServer.use(
        http.get("/api/v1/user/send_email_to_verify", () => HttpResponse.json(mockData))
      );

      const result = await userService.sendVerificationEmail();

      expect(result).toEqual(mockData);
    });

    it("should throw when the response is not ok", async () => {
      mockMswServer.use(
        http.get("/api/v1/user/send_email_to_verify", () => new HttpResponse(null, { status: 400 }))
      );

      await expect(userService.sendVerificationEmail()).rejects.toThrow();
    });
  });
});
