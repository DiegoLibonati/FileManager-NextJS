import { Folder } from "@src/app/lib/entities";

import axiosInstance from "@src/services/axios";

export const getAllFolders = async (): Promise<Folder[]> => {
  const response = await axiosInstance.get(`/filemanager/folders`, {});
  return response.data.data;
};
