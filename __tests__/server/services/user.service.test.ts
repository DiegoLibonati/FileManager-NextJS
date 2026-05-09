/**
 * @jest-environment node
 */

import type { UserPublicData } from "@/types/cross";

import { UserService } from "@/server/services/user.service";
import { UserDAO } from "@/server/daos/user.dao";
import { Email } from "@/server/configs/email.config";
import { Encrypt } from "@/server/helpers/encrypt.helper";

import { mockUserDoc } from "@tests/__mocks__/user.mock";

jest.mock("@/server/daos/user.dao");
jest.mock("@/server/configs/email.config", () => ({
  Email: jest.fn().mockImplementation(() => ({
    sendEmail: jest.fn().mockResolvedValue("ok"),
  })),
}));
jest.mock("@/server/configs/env.config", () => ({
  getEnvs: (): { NEXT_PUBLIC_API_URL: string; JWT_SECRET: string } => ({
    NEXT_PUBLIC_API_URL: "http://localhost:3000",
    JWT_SECRET: "test-secret",
  }),
}));

beforeEach(() => {
  (Email as jest.Mock).mockImplementation(() => ({
    sendEmail: jest.fn().mockResolvedValue("ok"),
  }));
});

describe("user.service", () => {
  describe("getUserInfo", () => {
    it("should return the serialized user when the user exists", async () => {
      (UserDAO.findByUsername as jest.Mock).mockResolvedValue(mockUserDoc);

      const result: UserPublicData | null = await UserService.getUserInfo("alice");

      expect(result).not.toBeNull();
      expect(result?.username).toBe("alice");
      expect(result?._id).toBe("507f1f77bcf86cd799439011");
      expect(UserDAO.findByUsername).toHaveBeenCalledWith("alice");
    });

    it("should return null when the user does not exist", async () => {
      (UserDAO.findByUsername as jest.Mock).mockResolvedValue(null);

      const result = await UserService.getUserInfo("ghost");

      expect(result).toBeNull();
    });
  });

  describe("changePlan", () => {
    it("should return null when the user does not exist", async () => {
      (UserDAO.findByUsername as jest.Mock).mockResolvedValue(null);

      const result = await UserService.changePlan("ghost", "1");

      expect(result).toBeNull();
      expect(UserDAO.updateById).not.toHaveBeenCalled();
    });

    it("should update the plan and return the updated user", async () => {
      const updatedDoc = { ...mockUserDoc, plan: "1" };
      (UserDAO.findByUsername as jest.Mock)
        .mockResolvedValueOnce(mockUserDoc)
        .mockResolvedValueOnce(updatedDoc);
      (UserDAO.updateById as jest.Mock).mockResolvedValue(undefined);

      const result: UserPublicData | null = await UserService.changePlan("alice", "1");

      expect(result?.plan).toBe("1");
      expect(UserDAO.updateById).toHaveBeenCalledWith("507f1f77bcf86cd799439011", { plan: "1" });
    });
  });

  describe("sendVerificationEmail", () => {
    it("should return an error when the user does not exist", async () => {
      (UserDAO.findByUsername as jest.Mock).mockResolvedValue(null);

      const result = await UserService.sendVerificationEmail("ghost");

      expect("error" in result).toBe(true);
    });

    it("should send the email and return success when the user exists", async () => {
      (UserDAO.findByUsername as jest.Mock).mockResolvedValue(mockUserDoc);

      jest.spyOn(Encrypt.prototype, "cryptString").mockResolvedValue("hashed-id");

      const result = await UserService.sendVerificationEmail("alice");

      expect("success" in result).toBe(true);
    });
  });
});
