import axiosInstance from "@/services/axios";
import { SpaceUsed } from "@/app/lib/entities";

export const getSpaceUsed = async (): Promise<SpaceUsed> => {
  const response = await axiosInstance.get(`/filemanager/space_used`);
  return response.data.data;
};
