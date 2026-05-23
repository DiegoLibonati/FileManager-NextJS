/**
 * @jest-environment node
 */

import mongoose from "mongoose";

import { HealthService } from "@/server/services/health.service";

jest.mock("@/server/configs/mongo.config", () => ({
  connectDb: jest.fn(),
}));

describe("health.service", () => {
  describe("checkReadiness", () => {
    it("should return db true when mongoose is connected", async () => {
      Object.defineProperty(mongoose.connection, "readyState", {
        value: mongoose.ConnectionStates.connected,
        configurable: true,
      });

      const result = await HealthService.checkReadiness();

      expect(result).toEqual({ db: true });
    });

    it("should return db false when mongoose is disconnected", async () => {
      Object.defineProperty(mongoose.connection, "readyState", {
        value: mongoose.ConnectionStates.disconnected,
        configurable: true,
      });

      const result = await HealthService.checkReadiness();

      expect(result).toEqual({ db: false });
    });

    it("should return db false when connectDb throws", async () => {
      const { connectDb } = jest.requireMock("@/server/configs/mongo.config");
      connectDb.mockRejectedValue(new Error("Connection failed"));

      const result = await HealthService.checkReadiness();

      expect(result).toEqual({ db: false });
    });
  });
});
