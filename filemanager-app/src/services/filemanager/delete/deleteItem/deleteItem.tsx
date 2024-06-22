import axiosInstance from "@/services/axios";

export const deleteItem = (path: string, type: string) => {
  return axiosInstance.delete("/filemanager", {
    params: {
      path: path,
      type: type,
    },
  });
};
