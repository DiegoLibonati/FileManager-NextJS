import axiosInstance from "@/services/axios";
import { Category } from "../../../../../next-env";

export const getCategories = async (): Promise<Category[]> => {
  const response = await axiosInstance.get(`/filemanager/categories`);
  return response.data.data;
};
