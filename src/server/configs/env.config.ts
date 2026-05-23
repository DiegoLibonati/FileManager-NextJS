import { z } from "zod";

import type { Envs } from "@/types/api";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5050),
  JWT_SECRET: z.string().min(1),
  MONGO_HOST: z.string().min(1),
  MONGO_PORT: z.coerce.number().int().positive(),
  MONGO_USER: z.string().min(1),
  MONGO_PASS: z.string().min(1),
  MONGO_DB_NAME: z.string().min(1),
  MONGO_AUTH_SOURCE: z.string().min(1).default("admin"),
  EMAIL: z.email(),
  EMAIL_PASS: z.string().min(1),
  CLOUD_PATH: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.url(),
  NEXT_PUBLIC_API_URL: z.url(),
  NEXT_REDIRECT_IF_ROUTE_NOT_EXISTS: z.stringbool().default(false),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),
  RATE_LIMIT_WINDOW_MS: z.coerce
    .number()
    .int()
    .positive()
    .default(15 * 60 * 1000),
  RATE_LIMIT_MAX: z.coerce.number().int().nonnegative().default(0),
  BODY_LIMIT: z.string().default("1gb"),
  SEED_DEFAULT_DATA: z.stringbool().default(false),
});

let _envs: Envs | null = null;

export const getEnvs = (): Envs => {
  if (_envs) return _envs;

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid environment variables:\n${issues}`);
  }

  const {
    NODE_ENV,
    PORT,
    JWT_SECRET,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_USER,
    MONGO_PASS,
    MONGO_DB_NAME,
    MONGO_AUTH_SOURCE,
    EMAIL,
    EMAIL_PASS,
    CLOUD_PATH,
    NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL,
    NEXT_REDIRECT_IF_ROUTE_NOT_EXISTS,
    LOG_LEVEL,
    RATE_LIMIT_WINDOW_MS,
    RATE_LIMIT_MAX,
    BODY_LIMIT,
    SEED_DEFAULT_DATA,
  } = parsed.data;

  _envs = {
    ENV: NODE_ENV,
    PORT,
    JWT_SECRET,
    DATABASE_URL: `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=${MONGO_AUTH_SOURCE}`,
    EMAIL,
    EMAIL_PASS,
    CLOUD_PATH,
    NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL,
    NEXT_REDIRECT_IF_ROUTE_NOT_EXISTS,
    LOG_LEVEL,
    RATE_LIMIT_WINDOW_MS,
    RATE_LIMIT_MAX,
    BODY_LIMIT,
    SEED_DEFAULT_DATA,
  };

  return _envs;
};
