import type { IRecentFile, IUser } from "@/types/models";

export type Plan = "0" | "1";
export type FolderType = "simple" | "withActions";
export type TypeAlert = "error" | "info" | "warning" | "loading";
export type User = Omit<IUser, "_id">;
export type RecentFile = Omit<IRecentFile, "_id">;

export interface FileItem {
  id: string;
  filename: string;
  extension: string;
  path: string;
  size: string;
  type: string;
  idCategory: string;
  bgColor: string;
  color: string;
  uploader?: string;
}

export interface FolderItem {
  id: string;
  foldername: string;
  path: string;
  type: string;
  size: string;
  len?: string;
  bgColor: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  icon_color: string;
  background_color: string;
}

export interface SpaceUsed {
  total_space: string;
  total_free: string;
  total_used: string;
  percentage_used: string;
  total_files: number;
}

export interface Alert {
  type: TypeAlert;
  message: string;
  open: boolean;
}
