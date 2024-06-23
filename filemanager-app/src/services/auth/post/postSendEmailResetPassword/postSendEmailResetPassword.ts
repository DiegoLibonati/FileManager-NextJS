import { FormAuth } from "@/app/lib/entities";
import axiosInstance from "@/services/axios";

export const postSendEmailResetPassword = async (
  form: Pick<FormAuth, "email">
) => {
  return await axiosInstance.post("/auth/send_email_reset", form);
};
