import type { ResponseWithData, DefaultResponse } from "@/types/responses";
import type { User } from "@/types/app";

import { throwApiError } from "@/lib/utils";

const BASE = "/api/v1/auth";

const authService = {
  async login(username: string, password: string): Promise<ResponseWithData<User>> {
    const response = await fetch(`${BASE}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) return throwApiError(response);

    return (await response.json()) as ResponseWithData<User>;
  },

  async logout(): Promise<DefaultResponse> {
    const response = await fetch(`${BASE}/logout`, { credentials: "include" });

    if (!response.ok) return throwApiError(response);

    return (await response.json()) as DefaultResponse;
  },

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<ResponseWithData<User>> {
    const response = await fetch(`${BASE}/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) return throwApiError(response);

    return (await response.json()) as ResponseWithData<User>;
  },

  async resetPassword(id: string, username: string, password: string): Promise<DefaultResponse> {
    const response = await fetch(`${BASE}/reset`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, username, password }),
    });

    if (!response.ok) return throwApiError(response);

    return (await response.json()) as DefaultResponse;
  },

  async sendEmailReset(email: string): Promise<DefaultResponse> {
    const response = await fetch(`${BASE}/send_email_reset`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) return throwApiError(response);

    return (await response.json()) as DefaultResponse;
  },
};

export default authService;
