import type { TypeAlert, User } from "@/types/app";

export interface UserState {
  user: User | null;
}

export interface AlertState {
  type: TypeAlert;
  message: string;
  open: boolean;
}
