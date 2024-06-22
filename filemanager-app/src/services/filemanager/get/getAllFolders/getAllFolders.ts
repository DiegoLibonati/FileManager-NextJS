import axiosInstance from "@/services/axios";
import { Folder } from "../../../../../next-env";

export const getAllFolders = async (): Promise<Folder[]> => {
  const response = await axiosInstance.get(`/filemanager/folders`, {});
  return response.data.data;
};
