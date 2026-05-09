import type { Category } from "@/types/app";
import type { DefaultResponse } from "@/types/responses";

import { categoriesExtension } from "@/lib/categories";

export const roundToOneDecimal = (num: number): number => {
  if (num % 1 !== 0) {
    return Math.floor(num * 10) / 10;
  }
  return num;
};

export const getTitleByParams = (param: Record<string, string | string[] | undefined>): string => {
  const { categoryId, folderPath } = param;

  if (!categoryId && !folderPath) return "";

  if (categoryId === "music") return "All music 🎵";
  if (categoryId === "videos") return "All videos 🎥";
  if (categoryId === "images") return "All images 🖼️";
  if (categoryId === "documents") return "All docs 📕";

  const pathStr = Array.isArray(folderPath) ? folderPath.join("/") : (folderPath ?? "");
  const lastSegment = pathStr.split("/").at(-1) ?? "";
  return `${parseEscapeString(lastSegment.toUpperCase())} 📁`;
};

export const getCategoryByExtension = (extension: string, categories: Category[]): Category => {
  if (categoriesExtension.music!.includes(extension))
    return categories.find((c) => c.id === "music")!;
  if (categoriesExtension.videos!.includes(extension))
    return categories.find((c) => c.id === "videos")!;
  if (categoriesExtension.images!.includes(extension))
    return categories.find((c) => c.id === "images")!;

  return categories.find((c) => c.id === "documents")!;
};

export const bytesToMB = (bytes: string): string =>
  String(roundToOneDecimal(parseInt(bytes) / 1048576));

export const validExtensions = (categoriesExtension: Record<string, string[]>): string[] =>
  Object.values(categoriesExtension).flat();

export const getExtension = (filename: string): string => filename.split(".").at(-1) ?? "";

export const parseEscapeString = (str: string): string => str.replaceAll("%20", " ");

export const getErrorMessage = (e: unknown): string =>
  e instanceof Error ? e.message : "An unexpected error occurred.";

export const throwApiError = async (response: Response): Promise<never> => {
  const data = (await response.json().catch(() => null)) as DefaultResponse | null;
  throw new Error(data?.message ?? `HTTP error! status: ${response.status}`);
};
