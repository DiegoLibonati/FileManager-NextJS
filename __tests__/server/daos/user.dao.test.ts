/**
 * @jest-environment node
 */

import mongoose from "mongoose";

import type { HydratedDocument } from "mongoose";
import type { IUserDoc } from "@/types/api";
import type { UserCreatePayload } from "@/types/api";

import { UserDAO } from "@/server/daos/user.dao";
import { connectDb } from "@/server/configs/mongo.config";
import { UserModel } from "@/server/models/user.model";

jest.mock("@/server/configs/env.config", () => ({
  getEnvs: (): { DATABASE_URL: string } => ({
    DATABASE_URL: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?authSource=${process.env.MONGO_AUTH_SOURCE}`,
  }),
}));

const validPayload: UserCreatePayload = {
  username: "alice",
  email: "alice@example.com",
  password: "hashed-password",
  plan: "0",
  emailVerified: false,
};

describe("user.dao", () => {
  beforeAll(async (): Promise<void> => {
    await connectDb();
  });

  afterAll(async (): Promise<void> => {
    await mongoose.disconnect();
    global._mongooseCache = undefined;
  });

  beforeEach(async (): Promise<void> => {
    await UserModel.deleteMany({});
  });

  describe("create", () => {
    it("should insert a user and return a document with a generated id", async () => {
      const result: HydratedDocument<IUserDoc> = await UserDAO.create(validPayload);

      expect(result._id).toBeDefined();
      expect(result.username).toBe(validPayload.username);
      expect(result.email).toBe(validPayload.email);
      expect(result.plan).toBe("0");
      expect(result.emailVerified).toBe(false);
    });

    it("should persist the user to the database", async () => {
      const created = await UserDAO.create(validPayload);

      const fromDb = await UserModel.findById(created._id);

      expect(fromDb).not.toBeNull();
      expect(fromDb?.username).toBe("alice");
    });

    it("should throw a duplicate key error when username already exists", async () => {
      await UserModel.create(validPayload);

      await expect(UserDAO.create(validPayload)).rejects.toThrow();
    });
  });

  describe("findByUsername", () => {
    it("should return the user when the username matches", async () => {
      await UserModel.create(validPayload);

      const result: HydratedDocument<IUserDoc> | null = await UserDAO.findByUsername("alice");

      expect(result).not.toBeNull();
      expect(result?.username).toBe("alice");
    });

    it("should return null when no user has that username", async () => {
      const result = await UserDAO.findByUsername("ghost");

      expect(result).toBeNull();
    });
  });

  describe("findByEmail", () => {
    it("should return the user when the email matches", async () => {
      await UserModel.create(validPayload);

      const result = await UserDAO.findByEmail("alice@example.com");

      expect(result).not.toBeNull();
      expect(result?.email).toBe("alice@example.com");
    });

    it("should return null when no user has that email", async () => {
      const result = await UserDAO.findByEmail("nobody@example.com");

      expect(result).toBeNull();
    });
  });

  describe("findByEmailOrUsername", () => {
    it("should return the user when the email matches", async () => {
      await UserModel.create(validPayload);

      const result = await UserDAO.findByEmailOrUsername("alice@example.com", "unknown");

      expect(result).not.toBeNull();
    });

    it("should return the user when the username matches", async () => {
      await UserModel.create(validPayload);

      const result = await UserDAO.findByEmailOrUsername("other@example.com", "alice");

      expect(result).not.toBeNull();
    });

    it("should return null when neither matches", async () => {
      const result = await UserDAO.findByEmailOrUsername("ghost@example.com", "ghost");

      expect(result).toBeNull();
    });
  });

  describe("updateById", () => {
    it("should update the specified fields of an existing user", async () => {
      const created = await UserModel.create(validPayload);

      await UserDAO.updateById(created._id.toString(), { plan: "1", emailVerified: true });

      const updated = await UserModel.findById(created._id);
      expect(updated?.plan).toBe("1");
      expect(updated?.emailVerified).toBe(true);
    });

    it("should not throw when updating a non-existent id", async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();

      await expect(UserDAO.updateById(fakeId, { plan: "1" })).resolves.not.toThrow();
    });
  });
});
