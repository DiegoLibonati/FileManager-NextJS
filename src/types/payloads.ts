import type { RecentFile, User } from "@/types/app";

export type UserCreatePayload = User & { password: string };

export type RecentFileCreatePayload = RecentFile;

export interface RequestPayload {
  username: string;
  email: string;
  plan: string;
  emailVerified: boolean;
}
