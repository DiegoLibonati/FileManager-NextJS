import type { Document } from "mongoose";
import type { RecentFile, User } from "@/types/app";
import type { Env } from "@/types/cross";

export interface Session {
  username: string;
  email: string;
  plan: string;
  emailVerified: boolean;
}

export interface IUserDoc extends Document, User {
  password: string;
}

export interface IRecentFileDoc extends Document, RecentFile {}

export interface JWTConfig {
  payload?: object | null;
  cookieName?: string;
  token?: string;
}

export interface ExceptionInfo {
  status: number;
  code: string;
  message: string;
}

export interface CodesSuccess {
  login: string;
  logout: string;
  register: string;
  verify: string;
  resetPassword: string;
  sendEmailReset: string;
  getDirectory: string;
  createFolder: string;
  deleteItem: string;
  upload: string;
  getCategories: string;
  getCategoryFiles: string;
  getFolders: string;
  getRecentUpload: string;
  getSpaceUsed: string;
  changePlan: string;
  sendVerificationEmail: string;
  getUserInfo: string;
}

export interface CodesNot {
  validId: string;
}

export interface CodesError {
  generic: string;
  unauthorized: string;
  invalidCredentials: string;
  notFound: string;
  validation: string;
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
  changePlan: string;
  sendVerificationEmail: string;
  getUserInfo: string;
}

export interface MessagesNot {
  validId: string;
}

export interface MessagesError {
  generic: string;
  unauthorized: string;
  invalidCredentials: string;
  notFound: string;
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

export interface Envs {
  PORT: number;
  ENV: Env;
  JWT_SECRET: string;
  DATABASE_URL: string;
  EMAIL: string;
  EMAIL_PASS: string;
  CLOUD_PATH: string;
  NEXT_PUBLIC_API_URL: string;
}
