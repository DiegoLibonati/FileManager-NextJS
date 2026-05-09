import type { Envs } from "@/types/api";

import { requireEnv } from "@/server/helpers/require_env.helper";

let _envs: Envs | null = null;

export const getEnvs = (): Envs => {
  if (_envs) return _envs;

  const MONGO_HOST = requireEnv("MONGO_HOST");
  const MONGO_PORT = requireEnv("MONGO_PORT");
  const MONGO_USER = requireEnv("MONGO_USER");
  const MONGO_PASS = requireEnv("MONGO_PASS");
  const MONGO_DB_NAME = requireEnv("MONGO_DB_NAME");
  const MONGO_AUTH_SOURCE = requireEnv("MONGO_AUTH_SOURCE");
  const EMAIL = requireEnv("EMAIL");
  const EMAIL_PASS = requireEnv("EMAIL_PASS");
  const CLOUD_PATH = requireEnv("CLOUD_PATH");
  const NEXT_PUBLIC_API_URL = requireEnv("NEXT_PUBLIC_API_URL");

  _envs = {
    PORT: Number(process.env.PORT) || 5050,
    ENV: process.env.NODE_ENV,
    JWT_SECRET: requireEnv("JWT_SECRET"),
    DATABASE_URL:
      MONGO_USER && MONGO_PASS
        ? `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=${MONGO_AUTH_SOURCE}`
        : `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`,
    EMAIL,
    EMAIL_PASS,
    CLOUD_PATH,
    NEXT_PUBLIC_API_URL,
  };

  return _envs;
};
