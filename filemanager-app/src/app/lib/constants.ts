import { Category } from "../../../next-env";

export const categoriesExtension: Record<string, string[]> = {
  documents: ["txt"],
  images: ["png"],
  videos: ["mp4"],
  music: ["mp3"],
};

export const categories: Category[] = [
  {
    id: "documents",
    name: "Docs",
    icon_color: "#59e766",
    background_color: "#ecf9ed",
  },
  {
    id: "images",
    name: "Images",
    icon_color: "#00b5dd",
    background_color: "#ecf3f9",
  },
  {
    id: "videos",
    name: "Videos",
    icon_color: "#dd004f",
    background_color: "#f9ecf5",
  },
  {
    id: "music",
    name: "Music",
    icon_color: "#ddac00",
    background_color: "#f9f4ec",
  },
];

