import axiosInstance from "@/services/axios";

export const postCreateFolder = async (path: string) => {
  return await axiosInstance.post(
    "/filemanager",
    {},
    {
      params: {
        path: path,
      },
    }
  );
};
