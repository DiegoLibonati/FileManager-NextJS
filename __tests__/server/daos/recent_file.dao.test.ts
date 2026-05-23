/**
 * @jest-environment node
 */

import mongoose from "mongoose";

import type { HydratedDocument } from "mongoose";
import type { IRecentFileDoc } from "@/types/api";
import type { RecentFileCreatePayload } from "@/types/api";

import { RecentFileDAO } from "@/server/daos/recent_file.dao";
import { connectDb } from "@/server/configs/mongo.config";
import { RecentFileModel } from "@/server/models/recent_file.model";

jest.mock("@/server/configs/env.config", () => ({
  getEnvs: (): { DATABASE_URL: string } => ({
    DATABASE_URL: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?authSource=${process.env.MONGO_AUTH_SOURCE}`,
  }),
}));

const validPayload: RecentFileCreatePayload = {
  filename: "photo.png",
  extension: "png",
  path: "/images/photo.png",
  size: 204800,
  uploader: "alice",
  idCategory: "images",
  bgColor: "#ecf3f9",
  color: "#00b5dd",
  type: "file",
};

describe("recent_file.dao", () => {
  beforeAll(async (): Promise<void> => {
    await connectDb();
  });

  afterAll(async (): Promise<void> => {
    await mongoose.disconnect();
    global._mongooseCache = undefined;
  });

  beforeEach(async (): Promise<void> => {
    await RecentFileModel.deleteMany({});
  });

  describe("create", () => {
    it("should insert a recent file and return a document with a generated id", async () => {
      const result: HydratedDocument<IRecentFileDoc> = await RecentFileDAO.create(validPayload);

      expect(result._id).toBeDefined();
      expect(result.filename).toBe("photo.png");
      expect(result.uploader).toBe("alice");
    });

    it("should persist the recent file to the database", async () => {
      const created = await RecentFileDAO.create(validPayload);

      const fromDb = await RecentFileModel.findById(created._id);

      expect(fromDb).not.toBeNull();
      expect(fromDb?.filename).toBe("photo.png");
    });
  });

  describe("findByUploader", () => {
    it("should return the recent file for the given uploader", async () => {
      await RecentFileModel.create(validPayload);

      const result = await RecentFileDAO.findByUploader("alice");

      expect(result).not.toBeNull();
      expect(result?.uploader).toBe("alice");
    });

    it("should return null when no file exists for the uploader", async () => {
      const result = await RecentFileDAO.findByUploader("ghost");

      expect(result).toBeNull();
    });
  });

  describe("deleteByUploader", () => {
    it("should delete the recent file for the given uploader", async () => {
      await RecentFileModel.create(validPayload);

      await RecentFileDAO.deleteByUploader("alice");

      const fromDb = await RecentFileModel.findOne({ uploader: "alice" });
      expect(fromDb).toBeNull();
    });

    it("should not throw when there is no file for the uploader", async () => {
      await expect(RecentFileDAO.deleteByUploader("ghost")).resolves.not.toThrow();
    });
  });

  describe("deleteByUploaderAndPath", () => {
    it("should delete the file matching uploader and path", async () => {
      await RecentFileModel.create(validPayload);

      await RecentFileDAO.deleteByUploaderAndPath("alice", "/images/photo.png");

      const fromDb = await RecentFileModel.findOne({ uploader: "alice" });
      expect(fromDb).toBeNull();
    });

    it("should not delete files that do not match the path", async () => {
      await RecentFileModel.create(validPayload);

      await RecentFileDAO.deleteByUploaderAndPath("alice", "/other/path.png");

      const fromDb = await RecentFileModel.findOne({ uploader: "alice" });
      expect(fromDb).not.toBeNull();
    });
  });
});
