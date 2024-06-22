import axiosInstance from "@/services/axios";
import { File } from "@/app/lib/entities";

export const getRecentUploaded = async (): Promise<File> => {
  const response = await axiosInstance.get(`/filemanager/recent_upload`);

  return response.data.data;
};
