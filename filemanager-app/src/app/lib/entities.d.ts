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

export type User = {
  username: string;
  email: string;
  plan: Plan;
};

export type Plan = "0" | "1";

export type TypeAlert = "error" | "info" | "warning" | "loading";

export type FolderType = "simple" | "withActions";

export type User = {
  username: string;
  email: string;
  plan: Plan;
};

export type Alert = {
  type: TypeAlert;
  message: string;
  open: boolean;
};

export type Session = {} & User;

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

export type UseUserStore = {
  user: User | null;
  handleSetUser: (user: User | null) => void;
};

export type UseAlertStore = {
  alert: AlertState;
  handleSetAlert: (type: TypeAlert, message: string, open: boolean) => void;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ** Interfaces Redux **

export interface ProviderReduxProps {
  children: ReactNode;
}

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

// ** Types Hooks **
export type UseForm<T> = {
  formState: T;
  onChangeInput: ChangeEventHandler<HTMLInputElement>;
  onClearForm: () => void;
};

export type UseSession<T> = {
  session: T;
};

// ** Props Interfaces **
export interface HeadingProps extends GeneralShared {
  element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  onClick?: MouseEventHandler<HTMLHeadingElement>;
}

export interface ParagraphProps extends GeneralShared {}

export interface CircleProgressProps {
  percentage: string;
}

export interface CardProps extends GeneralShared {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export interface CardItemProps
  extends GeneralShared,
    Partial<CategoryShared>,
    ColorsShared {
  title: string;
  subTitle: string;
  path: string;
  type: string;
}

export interface HeaderTitleProps {}

export interface FileListProps {
  files: File[];
}

export interface FolderListProps {
  folders: Folder[];
  folderType: FolderType;
}

export interface CardCategoryProps
  extends GeneralShared,
    CategoryShared,
    ColorsShared {
  href: string;
  categoryName: string;
}

export interface CardIconProps
  extends GeneralShared,
    Partial<CategoryShared>,
    ColorsShared {}

export interface CardNotFoundProps extends GeneralShared {}

export interface ButtonActionsProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  innerRef: LegacyRef<HTMLButtonElement>;
}

export interface DropdownActionsProps {
  offsetLeft: number;
  onClickDelete: MouseEventHandler<HTMLHeadingElement>;
}

export interface LoaderProps extends GeneralShared {
  color: string;
}

export interface CardSimpleProps extends ColorsShared {
  title: string;
  subTitle: string;
  type: string;
  path: string;
}

export interface LinealProgressProps {
  percentage: string;
}

export interface SectionFilesProps {
  idCategory: string;
}

export interface SectionFolderProps {
  folderPath: string;
}

export interface ButtonCreateProps extends GeneralShared {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export interface ButtonUpgradeProps {}

export interface NavBarProps {
  username: string;
}

export interface FormUploadProps {
  path: string;
}

// ** Props Pages Interfaces **
export interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

export interface FolderPageProps {
  params: {
    folderPath: string[];
  };
}

export interface UploadPageProps {
  params: {
    folderPath: string[];
  };
}

// ** Models Interfaces  **
export interface IUser {
  username: string;
  email: string;
  password: string;
  plan: Plan;
}

export interface IFile extends CategoryShared, ColorsShared {
  filename: string;
  extension: string;
  path: string;
  size: string;
  uploader: string;
  type: string;
}
