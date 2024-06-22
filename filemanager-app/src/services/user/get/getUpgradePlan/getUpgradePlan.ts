import axiosInstance from "@/services/axios";

export const getUpgradePlan = async (plan: string) => {
  return await axiosInstance.get(`/user/change_plan`, {
    params: {
      plan: plan,
    },
  });
};
