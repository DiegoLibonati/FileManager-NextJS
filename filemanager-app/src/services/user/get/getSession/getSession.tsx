import axiosInstance from "@/services/axios";

export const getSession = async () => {
  const response = await axiosInstance.get(`/user/user_info`);
  return response.data.data;
};
