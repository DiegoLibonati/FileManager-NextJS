import axiosInstance from "@/services/axios";

export const getSendEmailToVerify = async () => {
  return await axiosInstance.get(`/user/send_email_to_verify`);
};
