import mongoose from "mongoose";

import { connectDb } from "@/server/configs/mongo.config";

export const HealthService = {
  async checkReadiness(): Promise<{ db: boolean }> {
    try {
      await connectDb();
      return { db: mongoose.connection.readyState === mongoose.ConnectionStates.connected };
    } catch {
      return { db: false };
    }
  },
};
