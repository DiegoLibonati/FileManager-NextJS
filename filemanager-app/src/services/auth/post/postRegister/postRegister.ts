import { FormAuth } from "@/app/lib/entities";

import axiosInstance from "@/services/axios";

export const postRegister = async (form: Partial<FormAuth>) => {
  return await axiosInstance.post("/auth/register", form);
};
