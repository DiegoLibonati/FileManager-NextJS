import axiosInstance from "@/services/axios";
import { SpaceUsed } from "../../../../../next-env";

export const getSpaceUsed = async (): Promise<SpaceUsed> => {
  const response = await axiosInstance.get(`/filemanager/space_used`);
  return response.data.data;
};
