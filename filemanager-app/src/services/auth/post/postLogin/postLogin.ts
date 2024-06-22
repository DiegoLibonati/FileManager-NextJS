import axiosInstance from "@/services/axios";
import { FormAuth } from "../../../../../next-env";

export const postLogin = async (form: Partial<FormAuth>) => {
  return await axiosInstance.post("/auth/login", form);
};
