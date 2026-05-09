import type { FileItem } from "@/types/app";

export const mockFiles: FileItem[] = [
  {
    id: "1",
    filename: "photo.png",
    extension: "png",
    size: "1048576",
    path: "/docs/photo.png",
    type: "file",
    idCategory: "images",
    bgColor: "#ecf9ed",
    color: "#59e766",
  },
  {
    id: "2",
    filename: "report.pdf",
    extension: "pdf",
    size: "2097152",
    path: "/docs/report.pdf",
    type: "file",
    idCategory: "documents",
    bgColor: "#ecf9ed",
    color: "#59e766",
  },
];
