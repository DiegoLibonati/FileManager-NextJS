import { SpaceUsed } from "@src/app/lib/entities";

import axiosInstance from "@src/services/axios";

export const getSpaceUsed = async (): Promise<SpaceUsed> => {
  const response = await axiosInstance.get(`/filemanager/space_used`);
  return response.data.data;
};
