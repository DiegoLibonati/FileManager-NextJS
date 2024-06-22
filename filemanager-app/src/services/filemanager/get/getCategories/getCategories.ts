import axiosInstance from "@/services/axios";
import { Category } from "@/app/lib/entities";

export const getCategories = async (): Promise<Category[]> => {
  const response = await axiosInstance.get(`/filemanager/categories`);
  return response.data.data;
};
