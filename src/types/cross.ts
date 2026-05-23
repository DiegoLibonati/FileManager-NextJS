import type { IUser } from "@/types/models";

export type Env = "development" | "production" | "test";

export type UserPublicData = IUser;

export type LogLevel = "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent";
