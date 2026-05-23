import type { Document } from "mongoose";
import type { RecentFile, User } from "@/types/app";
import type { Env, LogLevel } from "@/types/cross";

export interface Session {
  username: string;
  email: string;
  plan: string;
  emailVerified: boolean;
}

export interface RateBucket {
  count: number;
  resetAt: number;
}

export interface IUserDoc extends Document, User {
  password: string;
}

export interface IRecentFileDoc extends Document, RecentFile {}

export interface JWTConfig {
  payload?: Record<string, unknown>;
  token?: string;
}

export interface ExceptionInfo {
  status: number;
  code: string;
  message: string;
}

export interface CodesSuccess {
  login: "SUCCESS_LOGIN";
  logout: "SUCCESS_LOGOUT";
  register: "SUCCESS_REGISTER";
  verify: "SUCCESS_VERIFY";
  resetPassword: "SUCCESS_RESET_PASSWORD";
  sendEmailReset: "SUCCESS_SEND_EMAIL_RESET";
  getDirectory: "SUCCESS_GET_DIRECTORY";
  createFolder: "SUCCESS_CREATE_FOLDER";
  deleteItem: "SUCCESS_DELETE_ITEM";
  upload: "SUCCESS_UPLOAD";
  getCategories: "SUCCESS_GET_CATEGORIES";
  getCategoryFiles: "SUCCESS_GET_CATEGORY_FILES";
  getFolders: "SUCCESS_GET_FOLDERS";
  getRecentUpload: "SUCCESS_GET_RECENT_UPLOAD";
  getSpaceUsed: "SUCCESS_GET_SPACE_USED";
  changePlan: "SUCCESS_CHANGE_PLAN";
  sendVerificationEmail: "SUCCESS_SEND_VERIFICATION_EMAIL";
  getUserInfo: "SUCCESS_GET_USER_INFO";
  healthLive: "SUCCESS_HEALTH_LIVE";
  healthReady: "SUCCESS_HEALTH_READY";
  alive: "SUCCESS_ALIVE";
}

export interface CodesNot {
  validId: "NOT_VALID_ID";
}

export interface CodesError {
  generic: "ERROR_GENERIC";
  unauthorized: "ERROR_UNAUTHORIZED";
  forbidden: "ERROR_FORBIDDEN";
  rateLimit: "ERROR_RATE_LIMIT";
  invalidCredentials: "ERROR_INVALID_CREDENTIALS";
  notFound: "ERROR_NOT_FOUND";
  validation: "ERROR_VALIDATION";
  malformedBody: "ERROR_MALFORMED_BODY";
}

export interface MessagesSuccess {
  login: string;
  logout: string;
  register: string;
  resetPassword: string;
  sendEmailReset: string;
  getDirectory: string;
  createFolder: string;
  deleteFolder: string;
  deleteFile: string;
  upload: string;
  getCategories: string;
  getCategoryFiles: string;
  getFolders: string;
  getRecentUpload: string;
  getSpaceUsed: string;
  changePlan: string;
  sendVerificationEmail: string;
  getUserInfo: string;
  healthLive: string;
  healthReady: string;
  alive: string;
}

export interface MessagesNot {
  validId: string;
}

export interface MessagesError {
  generic: string;
  unauthorized: string;
  forbidden: string;
  rateLimit: string;
  invalidCredentials: string;
  notFound: string;
  validation: string;
  malformedBody: string;
}

export interface MessagesValidation {
  login: string;
  register: string;
  verify: string;
  resetPassword: string;
  sendEmailReset: string;
  plan: string;
  path: string;
  pathAndType: string;
  pathAndFile: string;
  categoryName: string;
}

export type UserCreatePayload = User & { password: string };

export type RecentFileCreatePayload = RecentFile;

export interface RequestPayload {
  username: string;
  email: string;
  plan: string;
  emailVerified: boolean;
}

export interface Envs {
  PORT: number;
  ENV: Env;
  JWT_SECRET: string;
  DATABASE_URL: string;
  EMAIL: string;
  EMAIL_PASS: string;
  CLOUD_PATH: string;
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_API_URL: string;
  NEXT_REDIRECT_IF_ROUTE_NOT_EXISTS: boolean;
  LOG_LEVEL: LogLevel;
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX: number;
  BODY_LIMIT: string;
  SEED_DEFAULT_DATA: boolean;
}
