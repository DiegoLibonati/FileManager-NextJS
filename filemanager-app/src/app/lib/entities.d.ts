import { store } from "@/redux/store";
import { CSSProperties } from "react";

// ** Components **

// ** Types **
export type SpaceUsed = {
  total_space: string;
  total_free: string;
  percentage_used: string;
  total_used: string;
  total_files: number;
};

export type Category = {
  id: string;
  name: string;
  icon_color: string;
  background_color: string;
};

export type File = {
  filename: string;
  path: string;
  type: string;
  size: string;
  extension: string;
  id: string;
  uploader?: string;
} & CategoryShared &
  ColorsShared;

export type Folder = {
  id: string;
  foldername: string;
  path: string;
  type: string;
  size: string;
  len?: string;
} & ColorsShared;
export type FolderType = "simple" | "withActions";

export type User = {
  username: string;
  email: string;
  plan: Plan;
  emailVerified: boolean;
};
export type Session = {} & User;
export type Plan = "0" | "1";

export type Alert = {
  type: TypeAlert;
  message: string;
  open: boolean;
};
export type TypeAlert = "error" | "info" | "warning" | "loading";

// ** Types Form **
export type FormUpload = {
  folderName: string;
};

export type FormAuth = {
  username: string;
  password: string;
  email: string;
};

// ** Types Redux **

export type UserState = {
  user: User | null;
};

export type AlertState = {
  type: TypeAlert;
  message: string;
  open: boolean;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ** Types Shared **
export type GeneralShared = {
  children?: ReactNode | ReactNode[] | string | string[];
  className?: string;
  parentClassName?: string;
  style?: CSSProperties;
};

export type CategoryShared = {
  idCategory: string;
};

export type ColorsShared = { bgColor: string; color: string };

// ** Models Interfaces  **
export interface IUser {
  username: string;
  email: string;
  password: string;
  plan: Plan;
  emailVerified: boolean;
}

export interface IFile extends CategoryShared, ColorsShared {
  filename: string;
  extension: string;
  path: string;
  size: string;
  uploader: string;
  type: string;
}
