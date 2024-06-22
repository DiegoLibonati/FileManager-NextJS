import { Category } from "../../next-env";
import { categoriesExtension } from "./constants";

export const roundToOneDecimal = (num: number): number => {
  if (num % 1 !== 0) {
    return Math.floor(num * 10) / 10;
  }
  return num;
};

export const getTitleByParams = (param: Record<string, string>): string => {

  
  const { categoryId, folderPath } = param;


  if (!categoryId && !folderPath) return "";

  if (categoryId === "music") return "All music 🎵";
  if (categoryId === "videos") return "All videos 🎥";
  if (categoryId === "images") return "All images 🖼️";
  if (categoryId === "documents") return "All docs 📕";

  return `${parseEscapeString(folderPath[folderPath.length - 1].toUpperCase())} 📁`;
};

export const getCategoryByExtension = (
  extension: string,
  categories: Category[]
): Category => {
  if (categoriesExtension.music.includes(extension))
    return categories.find((category) => category.id === "music")!;
  else if (categoriesExtension.videos.includes(extension))
    return categories.find((category) => category.id === "videos")!;
  else if (categoriesExtension.images.includes(extension))
    return categories.find((category) => category.id === "images")!;

  return categories.find((category) => category.id === "documents")!;
};

export const bytesToMB = (bytes: string): string => {
  const bytesInMB = 1048576; // 1 MB = 1024 * 1024 bytes
  return String(roundToOneDecimal(parseInt(bytes) / bytesInMB));
};

export const validExtensions = (
  categoriesExtension: Record<string, string[]>
) => {
  const extensions = [];

  for (const categoryExtensions of Object.values(categoriesExtension)) {
    extensions.push(...categoryExtensions);
  }

  return extensions;
};

export const getExtension = (filename: string) => {
  const arrExtension = filename.split(".");
  return arrExtension[arrExtension.length - 1];
};

export const parseEscapeString = (str: string): string => {
  let newStr: string = str;

  if (str.includes("%20")) {
    newStr = newStr.replace("%20", " ");
  }

  return newStr;
};
