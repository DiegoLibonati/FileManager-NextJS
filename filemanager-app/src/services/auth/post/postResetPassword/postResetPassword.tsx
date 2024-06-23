import axiosInstance from "@/services/axios";

export const postResetPassword = async (
  id: string,
  username: string,
  password: string
) => {
  return await axiosInstance.post("/auth/reset", {
    id: id,
    username: username,
    password: password,
  });
};
