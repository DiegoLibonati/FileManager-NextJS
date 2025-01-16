import { Category } from "@/app/lib/entities";

import axiosInstance from "@/services/axios";

export const getCategories = async (): Promise<Category[]> => {
  const response = await axiosInstance.get(`/filemanager/categories`);
  return response.data.data;
};
