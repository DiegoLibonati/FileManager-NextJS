import mongoose from "mongoose";

import { getEnvs } from "@/server/configs/env.config";

import { DB_SERVER_SELECTION_TIMEOUT_MS } from "@/server/constants/vars.constant";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var _mongooseCache: MongooseCache | undefined;
}

function getCache(): MongooseCache {
  global._mongooseCache ??= { conn: null, promise: null };
  return global._mongooseCache;
}

export async function connectDb(): Promise<typeof mongoose> {
  const cache = getCache();

  if (cache.conn) return cache.conn;

  cache.promise ??= mongoose.connect(getEnvs().DATABASE_URL, {
    serverSelectionTimeoutMS: DB_SERVER_SELECTION_TIMEOUT_MS,
  });

  try {
    cache.conn = await cache.promise;
  } catch (error) {
    cache.promise = null;
    throw error;
  }

  return cache.conn;
}
