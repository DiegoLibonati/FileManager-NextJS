import type { CSSProperties } from "react";
import type { FileItem, FolderItem, FolderType } from "@/types/app";

interface DefaultProps {
  className?: string;
  parentClassName?: string;
  children?: React.ReactNode;
  style?: CSSProperties;
}

interface DefaultColors {
  bgColor: string;
  color: string;
}

interface DefaultCategoryId {
  idCategory: string;
}

export interface ProviderReduxProps {
  children: React.ReactNode;
}

export interface ButtonActionsProps {
  innerRef: React.Ref<HTMLButtonElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ButtonCreateProps extends DefaultProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface CardProps extends DefaultProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface CardCategoryProps extends DefaultProps, DefaultColors, DefaultCategoryId {
  href: string;
  categoryName: string;
}

export type CardIconProps = DefaultProps & DefaultColors & Partial<DefaultCategoryId>;

export interface CardItemProps extends DefaultProps, DefaultColors, Partial<DefaultCategoryId> {
  title: string;
  subTitle: string;
  path: string;
  type: string;
}

export type CardNotFoundProps = DefaultProps;

export interface CardSimpleProps extends DefaultColors {
  title: string;
  subTitle: string;
  type: string;
  path: string;
}

export interface CircleProgressProps {
  percentage: string;
}

export interface LinealProgressProps {
  percentage: string;
}

export interface DropdownActionsProps {
  offsetLeft: number;
  onClickDelete: React.MouseEventHandler<HTMLHeadingElement>;
}

export interface FormUploadProps {
  path: string;
}

export interface HeadingProps extends DefaultProps {
  element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  onClick?: React.MouseEventHandler<HTMLHeadingElement>;
}

export interface FileListProps {
  files: FileItem[];
}

export interface FolderListProps {
  folders: FolderItem[];
  folderType: FolderType;
}

export interface LoaderProps extends DefaultProps {
  color: string;
}

export type ParagraphProps = DefaultProps;

export type SectionFilesProps = DefaultCategoryId;

export interface SectionFolderProps {
  folderPath: string;
}

export interface RootLayoutProps {
  children: React.ReactNode;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export interface NewPasswordPageProps {
  searchParams: {
    username: string;
  };
}

export interface CategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export interface FolderPageProps {
  params: Promise<{
    folderPath: string[];
  }>;
}

export interface UploadPageProps {
  params: Promise<{
    folderPath: string[];
  }>;
}

export interface FileManagerLayoutProps {
  children: React.ReactNode;
}
