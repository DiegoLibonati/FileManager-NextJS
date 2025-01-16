import { File, Folder } from "@/app/lib/entities";

import axiosInstance from "@/services/axios";

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
