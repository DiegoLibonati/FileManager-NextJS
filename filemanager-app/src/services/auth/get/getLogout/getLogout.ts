import axiosInstance from "@/services/axios";

export const getLogout = async () => {
  return await axiosInstance.get("/auth/logout");
};
