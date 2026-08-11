/**
 * @jest-environment node
 */

import mongoose from "mongoose";

import { connectDb } from "@/server/configs/mongo.config";

import { DB_SERVER_SELECTION_TIMEOUT_MS } from "@/server/constants/vars.constant";

jest.mock("@/server/configs/env.config", () => ({
  getEnvs: (): { DATABASE_URL: string } => ({
    DATABASE_URL: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?authSource=${process.env.MONGO_AUTH_SOURCE}`,
  }),
}));

describe("mongo.config", () => {
  beforeEach((): void => {
    global._mongooseCache = undefined;
  });

  afterEach(async (): Promise<void> => {
    await mongoose.disconnect();
    global._mongooseCache = undefined;
  });

  describe("connectDb", () => {
    it("should pass serverSelectionTimeoutMS to mongoose.connect", async () => {
      const connectSpy = jest.spyOn(mongoose, "connect");

      await connectDb();

      expect(connectSpy).toHaveBeenCalledWith(expect.any(String), {
        serverSelectionTimeoutMS: DB_SERVER_SELECTION_TIMEOUT_MS,
      });
    });

    it("should reuse the cached connection on subsequent calls", async () => {
      const connectSpy = jest.spyOn(mongoose, "connect");

      const first = await connectDb();
      const second = await connectDb();

      expect(first).toBe(second);
      expect(connectSpy).toHaveBeenCalledTimes(1);
    });

    it("should reset the cached promise and reconnect after a failed attempt", async () => {
      const connectSpy = jest
        .spyOn(mongoose, "connect")
        .mockRejectedValueOnce(new Error("connection refused"));

      await expect(connectDb()).rejects.toThrow("connection refused");
      const result = await connectDb();

      expect(result).toBe(mongoose);
      expect(connectSpy).toHaveBeenCalledTimes(2);
    });
  });
});
