import { FormAuth } from "@src/app/lib/entities";

import axiosInstance from "@src/services/axios";

export const postSendEmailResetPassword = async (
  form: Pick<FormAuth, "email">
) => {
  return await axiosInstance.post("/auth/send_email_reset", form);
};
