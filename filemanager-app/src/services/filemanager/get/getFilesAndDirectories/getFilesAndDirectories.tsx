import axiosInstance from "@/services/axios";
import { File, Folder } from "../../../../../next-env";

export const getFilesAndDirectories = async (
  path: string
): Promise<(File & Folder)[]> => {
  const response = await axiosInstance.get("/filemanager", {
    params: {
      path: path === "/root" ? "/" : path,
    },
  });
  return response.data.data;
};
