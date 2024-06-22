import axiosInstance from "@/services/axios";
import { FormAuth } from "@/app/lib/entities";

export const postRegister = async (form: Partial<FormAuth>) => {
  return await axiosInstance.post("/auth/register", form);
};
