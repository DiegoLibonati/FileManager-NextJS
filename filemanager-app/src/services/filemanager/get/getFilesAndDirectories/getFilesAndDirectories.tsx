import { File, Folder } from "@src/app/lib/entities";

import axiosInstance from "@src/services/axios";

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
