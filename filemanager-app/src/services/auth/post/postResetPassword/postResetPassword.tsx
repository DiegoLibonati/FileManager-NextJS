import { FormAuth } from "@/app/lib/entities";
import axiosInstance from "@/services/axios";

export const postResetPassword = async (
  form: Pick<FormAuth, "password">,
  params: Record<string, string>
) => {
  return await axiosInstance.post("/auth/reset", form, { params: params });
};
