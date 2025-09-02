import axiosInstance from "@src/services/axios";

export const getSession = async () => {
  const response = await axiosInstance.get(`/user/user_info`);
  return response.data.data;
};
