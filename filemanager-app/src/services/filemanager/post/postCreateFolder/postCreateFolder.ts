import axiosInstance from "@src/services/axios";

export const postCreateFolder = async (path: string) => {
  return await axiosInstance.post("/filemanager", { path: path });
};
