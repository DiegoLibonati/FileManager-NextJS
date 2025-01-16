import { File } from "@/app/lib/entities";

import axiosInstance from "@/services/axios";

export const getCategoryFiles = async (
  categoryName: string
): Promise<File[]> => {
  const response = await axiosInstance.get(`/filemanager/categories/files`, {
    params: { category: categoryName },
  });

  return response.data.data;
};
