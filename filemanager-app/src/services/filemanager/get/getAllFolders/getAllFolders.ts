import axiosInstance from "@/services/axios";
import { Folder } from "@/app/lib/entities";

export const getAllFolders = async (): Promise<Folder[]> => {
  const response = await axiosInstance.get(`/filemanager/folders`, {});
  return response.data.data;
};
