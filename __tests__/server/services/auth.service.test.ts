/**
 * @jest-environment node
 */

import type { UserPublicData } from "@/types/cross";

import { AuthService } from "@/server/services/auth.service";
import { UserDAO } from "@/server/daos/user.dao";
import { FileManager } from "@/server/helpers/file_manager.helper";
import { Email } from "@/server/configs/email.config";
import { Encrypt } from "@/server/helpers/encrypt.helper";

import { mockUserDoc } from "@tests/__mocks__/user.mock";

jest.mock("@/server/daos/user.dao");
jest.mock("@/server/helpers/file_manager.helper", () => ({
  FileManager: jest.fn().mockImplementation(() => ({
    createFolder: jest.fn().mockResolvedValue(undefined),
  })),
}));
jest.mock("@/server/configs/email.config", () => ({
  Email: jest.fn().mockImplementation(() => ({
    sendEmail: jest.fn().mockResolvedValue("ok"),
  })),
}));
jest.mock("@/server/configs/env.config", () => ({
  getEnvs: (): { CLOUD_PATH: string; NEXT_PUBLIC_API_URL: string; JWT_SECRET: string } => ({
    CLOUD_PATH: "/cloud",
    NEXT_PUBLIC_API_URL: "http://localhost:3000",
    JWT_SECRET: "test-secret",
  }),
}));

beforeEach(() => {
  (FileManager as jest.Mock).mockImplementation(() => ({
    createFolder: jest.fn().mockResolvedValue(undefined),
  }));
  (Email as jest.Mock).mockImplementation(() => ({
    sendEmail: jest.fn().mockResolvedValue("ok"),
  }));
});

describe("auth.service", () => {
  describe("validateLogin", () => {
    it("should return user data when credentials are valid", async () => {
      (UserDAO.findByUsername as jest.Mock).mockResolvedValue(mockUserDoc);

      jest.spyOn(Encrypt.prototype, "compareString").mockResolvedValue(true);

      const result: { data?: UserPublicData; error?: string } = await AuthService.validateLogin(
        "alice",
        "correct-password"
      );

      expect(result.data).toBeDefined();
      expect(result.data?.username).toBe("alice");
      expect(result.error).toBeUndefined();
    });

    it("should return an error when the username does not exist", async () => {
      (UserDAO.findByUsername as jest.Mock).mockResolvedValue(null);

      const result = await AuthService.validateLogin("ghost", "password");

      expect(result.error).toContain("ghost");
      expect(result.data).toBeUndefined();
    });

    it("should return an error when the password is incorrect", async () => {
      (UserDAO.findByUsername as jest.Mock).mockResolvedValue(mockUserDoc);

      jest.spyOn(Encrypt.prototype, "compareString").mockResolvedValue(false);

      const result = await AuthService.validateLogin("alice", "wrong-password");

      expect(result.error).toBe("Incorrect password.");
    });
  });

  describe("register", () => {
    it("should return an error when the username or email already exists", async () => {
      (UserDAO.findByEmailOrUsername as jest.Mock).mockResolvedValue(mockUserDoc);

      const result = await AuthService.register("alice", "alice@example.com", "password123");

      expect(result.error).toBeDefined();
      expect(UserDAO.create).not.toHaveBeenCalled();
    });

    it("should create the user and return the serialized data when registration succeeds", async () => {
      (UserDAO.findByEmailOrUsername as jest.Mock).mockResolvedValue(null);
      (UserDAO.create as jest.Mock).mockResolvedValue(mockUserDoc);

      const result = await AuthService.register("bob", "bob@example.com", "password123");

      expect(result.data).toBeDefined();
      expect(result.data?.username).toBe("alice");
      expect(result.error).toBeUndefined();
    });
  });

  describe("verifyEmail", () => {
    it("should return an error when the user does not exist", async () => {
      (UserDAO.findByUsername as jest.Mock).mockResolvedValue(null);

      const result = await AuthService.verifyEmail("ghost", "someHashedId");

      expect(result.error).toBeDefined();
    });

    it("should return an error when the hashed id is invalid", async () => {
      (UserDAO.findByUsername as jest.Mock).mockResolvedValue(mockUserDoc);

      jest.spyOn(Encrypt.prototype, "compareString").mockResolvedValue(false);

      const result = await AuthService.verifyEmail("alice", "bad-hash");

      expect(result.error).toBeDefined();
    });

    it("should update emailVerified and return the redirect URL on success", async () => {
      (UserDAO.findByUsername as jest.Mock).mockResolvedValue(mockUserDoc);
      (UserDAO.updateById as jest.Mock).mockResolvedValue(undefined);

      jest.spyOn(Encrypt.prototype, "compareString").mockResolvedValue(true);

      const result = await AuthService.verifyEmail("alice", "valid-hash");

      expect(result.data?.redirectUrl).toContain("/login");
      expect(UserDAO.updateById).toHaveBeenCalledWith("507f1f77bcf86cd799439011", {
        emailVerified: true,
      });
    });
  });

  describe("resetPassword", () => {
    it("should return an error when the user does not exist", async () => {
      (UserDAO.findByUsername as jest.Mock).mockResolvedValue(null);

      const result = await AuthService.resetPassword("ghost", "someHash", "newpass");

      expect(result.error).toBeDefined();
    });

    it("should update the password and return true on success", async () => {
      (UserDAO.findByUsername as jest.Mock).mockResolvedValue(mockUserDoc);
      (UserDAO.updateById as jest.Mock).mockResolvedValue(undefined);

      jest.spyOn(Encrypt.prototype, "compareString").mockResolvedValue(true);
      jest.spyOn(Encrypt.prototype, "cryptString").mockResolvedValue("new-hash");

      const result = await AuthService.resetPassword("alice", "valid-hash", "newpass");

      expect(result.data).toBe(true);
      expect(UserDAO.updateById).toHaveBeenCalledWith("507f1f77bcf86cd799439011", {
        password: "new-hash",
      });
    });
  });

  describe("sendEmailReset", () => {
    it("should return an error when the email is not registered", async () => {
      (UserDAO.findByEmail as jest.Mock).mockResolvedValue(null);

      const result = await AuthService.sendEmailReset("ghost@example.com");

      expect(result.error).toContain("ghost@example.com");
    });

    it("should send the reset email and return true on success", async () => {
      (UserDAO.findByEmail as jest.Mock).mockResolvedValue(mockUserDoc);

      jest.spyOn(Encrypt.prototype, "cryptString").mockResolvedValue("hashed-id");

      const result = await AuthService.sendEmailReset("alice@example.com");

      expect(result.data).toBe(true);
    });
  });
});
