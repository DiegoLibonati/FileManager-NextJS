import { File } from "@src/app/lib/entities";

import axiosInstance from "@src/services/axios";

export const getCategoryFiles = async (
  categoryName: string
): Promise<File[]> => {
  const response = await axiosInstance.get(`/filemanager/categories/files`, {
    params: { category: categoryName },
  });

  return response.data.data;
};
