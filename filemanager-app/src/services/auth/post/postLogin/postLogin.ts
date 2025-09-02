import { FormAuth } from "@src/app/lib/entities";

import axiosInstance from "@src/services/axios";

export const postLogin = async (form: Partial<FormAuth>) => {
  return await axiosInstance.post("/auth/login", form);
};
