import type { ResponseWithData, DefaultResponse } from "@/types/responses";
import type { User } from "@/types/app";

import { throwApiError } from "@/lib/utils";

const BASE = "/api/v1/user";

const userService = {
  async getUserInfo(): Promise<ResponseWithData<User>> {
    const response = await fetch(`${BASE}/user_info`, { credentials: "include" });

    if (!response.ok) return throwApiError(response);

    return (await response.json()) as ResponseWithData<User>;
  },

  async changePlan(plan: string): Promise<ResponseWithData<User>> {
    const response = await fetch(`${BASE}/change_plan?plan=${plan}`, {
      credentials: "include",
    });

    if (!response.ok) return throwApiError(response);

    return (await response.json()) as ResponseWithData<User>;
  },

  async sendVerificationEmail(): Promise<DefaultResponse> {
    const response = await fetch(`${BASE}/send_email_to_verify`, {
      credentials: "include",
    });

    if (!response.ok) return throwApiError(response);

    return (await response.json()) as DefaultResponse;
  },
};

export default userService;
