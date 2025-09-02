import { FormAuth } from "@src/app/lib/entities";

import axiosInstance from "@src/services/axios";

export const postRegister = async (form: Partial<FormAuth>) => {
  return await axiosInstance.post("/auth/register", form);
};
