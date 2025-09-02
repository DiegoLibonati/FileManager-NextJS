import { File } from "@src/app/lib/entities";

import axiosInstance from "@src/services/axios";

export const getRecentUploaded = async (): Promise<File> => {
  const response = await axiosInstance.get(`/filemanager/recent_upload`);

  return response.data.data;
};
