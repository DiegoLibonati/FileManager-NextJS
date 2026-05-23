/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";

import { UserController } from "@/server/controllers/user.controller";
import { UserService } from "@/server/services/user.service";
import { Jwt } from "@/server/configs/jwt.config";

import { mockUser } from "@tests/__mocks__/user.mock";

jest.mock("@/server/services/user.service");
jest.mock("@/server/configs/jwt.config", () => ({
  Jwt: jest.fn().mockImplementation(() => ({
    signJWT: jest.fn().mockResolvedValue("mock-token"),
  })),
}));
jest.mock("@/server/configs/env.config", () => ({
  getEnvs: (): { ENV: string } => ({ ENV: "test" }),
}));

const buildRequest = (url: string, payloadData = mockUser): NextRequest =>
  new NextRequest(url, {
    headers: { payload: JSON.stringify(payloadData) },
  });

beforeEach(() => {
  (Jwt as jest.Mock).mockImplementation(() => ({
    signJWT: jest.fn().mockResolvedValue("mock-token"),
  }));
});

describe("user.controller", () => {
  describe("getUserInfo", () => {
    it("should return 404 when the user does not exist", async () => {
      (UserService.getUserInfo as jest.Mock).mockResolvedValue(null);
      const req = buildRequest("http://localhost/api/v1/user/user_info");

      const response = await UserController.getUserInfo(req);

      expect(response.status).toBe(404);
    });

    it("should return 200 with user data when the user exists", async () => {
      (UserService.getUserInfo as jest.Mock).mockResolvedValue(mockUser);
      const req = buildRequest("http://localhost/api/v1/user/user_info");

      const response = await UserController.getUserInfo(req);
      const body = (await response.json()) as { data: typeof mockUser };

      expect(response.status).toBe(200);
      expect(body.data.username).toBe("alice");
      expect(UserService.getUserInfo).toHaveBeenCalledWith("alice");
    });
  });

  describe("changePlan", () => {
    it("should return 400 when plan query param is missing", async () => {
      const req = buildRequest("http://localhost/api/v1/user/change_plan");

      const response = await UserController.changePlan(req);

      expect(response.status).toBe(400);
      expect(UserService.changePlan).not.toHaveBeenCalled();
    });

    it("should return 404 when the user does not exist", async () => {
      (UserService.changePlan as jest.Mock).mockResolvedValue(null);
      const req = buildRequest("http://localhost/api/v1/user/change_plan?plan=1");

      const response = await UserController.changePlan(req);

      expect(response.status).toBe(404);
    });

    it("should return 200 with updated user data and set cookie on success", async () => {
      const updatedUser = { ...mockUser, plan: "1" };
      (UserService.changePlan as jest.Mock).mockResolvedValue(updatedUser);
      const req = buildRequest("http://localhost/api/v1/user/change_plan?plan=1");

      const response = await UserController.changePlan(req);
      const body = (await response.json()) as { data: typeof updatedUser };

      expect(response.status).toBe(200);
      expect(body.data.plan).toBe("1");
      expect(response.cookies.get("token")?.value).toBe("mock-token");
    });
  });

  describe("sendVerificationEmail", () => {
    it("should return 400 when the service reports an error", async () => {
      (UserService.sendVerificationEmail as jest.Mock).mockResolvedValue({
        error: "User not found.",
      });
      const req = buildRequest("http://localhost/api/v1/user/send_email_to_verify");

      const response = await UserController.sendVerificationEmail(req);

      expect(response.status).toBe(400);
    });

    it("should return 200 on successful email dispatch", async () => {
      (UserService.sendVerificationEmail as jest.Mock).mockResolvedValue({ success: true });
      const req = buildRequest("http://localhost/api/v1/user/send_email_to_verify");

      const response = await UserController.sendVerificationEmail(req);

      expect(response.status).toBe(200);
    });
  });
});
