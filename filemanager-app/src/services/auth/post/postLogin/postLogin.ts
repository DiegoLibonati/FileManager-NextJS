import axiosInstance from "@/services/axios";
import { FormAuth } from "@/app/lib/entities";

export const postLogin = async (form: Partial<FormAuth>) => {
  return await axiosInstance.post("/auth/login", form);
};
