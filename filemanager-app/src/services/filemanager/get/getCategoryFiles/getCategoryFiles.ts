import axiosInstance from "@/services/axios";
import { File } from "../../../../../next-env";

export const getCategoryFiles = async (
  categoryName: string
): Promise<File[]> => {
  const response = await axiosInstance.get(`/filemanager/categories/files`, {
    params: { category: categoryName },
  });

  return response.data.data;
};
