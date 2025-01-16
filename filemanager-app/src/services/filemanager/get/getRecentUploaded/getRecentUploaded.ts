import { File } from "@/app/lib/entities";

import axiosInstance from "@/services/axios";

export const getRecentUploaded = async (): Promise<File> => {
  const response = await axiosInstance.get(`/filemanager/recent_upload`);

  return response.data.data;
};
