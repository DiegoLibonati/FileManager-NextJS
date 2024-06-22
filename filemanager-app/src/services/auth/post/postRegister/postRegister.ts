import axiosInstance from "@/services/axios";
import { FormAuth } from "../../../../../next-env";

export const postRegister = async (form: Partial<FormAuth>) => {
  return await axiosInstance.post("/auth/register", form);
};
