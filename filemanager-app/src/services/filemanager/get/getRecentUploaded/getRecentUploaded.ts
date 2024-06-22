import axiosInstance from "@/services/axios";
import { File } from "../../../../../next-env";

export const getRecentUploaded = async (): Promise<File> => {
  const response = await axiosInstance.get(`/filemanager/recent_upload`);

  return response.data.data;
};
