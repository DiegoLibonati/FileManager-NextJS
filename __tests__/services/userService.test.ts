import userService from "@/services/userService";

import { mockFetchSuccess, mockFetchError } from "@tests/__mocks__/fetch.mock";

describe("userService", () => {
  describe("getUserInfo", () => {
    it("should call the user_info endpoint", async () => {
      const mockData = {
        code: "SUCCESS_GET_USER_INFO",
        message: "ok",
        data: { username: "alice", email: "alice@example.com", plan: "0", emailVerified: false },
      };
      mockFetchSuccess(mockData);

      const result = await userService.getUserInfo();

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/v1/user/user_info",
        expect.objectContaining({ credentials: "include" })
      );
      expect(result).toEqual(mockData);
    });

    it("should throw when the response is not ok", async () => {
      mockFetchError(401);

      await expect(userService.getUserInfo()).rejects.toThrow();
    });
  });

  describe("changePlan", () => {
    it("should call change_plan with the plan as a query param", async () => {
      mockFetchSuccess({ code: "SUCCESS_CHANGE_PLAN", message: "ok", data: {} });

      await userService.changePlan("1");

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/v1/user/change_plan?plan=1",
        expect.objectContaining({ credentials: "include" })
      );
    });

    it("should throw when the response is not ok", async () => {
      mockFetchError(400);

      await expect(userService.changePlan("1")).rejects.toThrow();
    });
  });

  describe("sendVerificationEmail", () => {
    it("should call the send_email_to_verify endpoint", async () => {
      mockFetchSuccess({ code: "SUCCESS_SEND_VERIFICATION_EMAIL", message: "ok" });

      await userService.sendVerificationEmail();

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/v1/user/send_email_to_verify",
        expect.objectContaining({ credentials: "include" })
      );
    });

    it("should throw when the response is not ok", async () => {
      mockFetchError(400);

      await expect(userService.sendVerificationEmail()).rejects.toThrow();
    });
  });
});
