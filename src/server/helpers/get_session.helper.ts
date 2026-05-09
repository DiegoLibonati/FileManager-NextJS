import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import type { Session } from "@/types/api";

import { getEnvs } from "@/server/configs/env.config";

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(getEnvs().JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return {
      username: typeof payload.username === "string" ? payload.username : "",
      email: typeof payload.email === "string" ? payload.email : "",
      plan: typeof payload.plan === "string" ? payload.plan : "0",
      emailVerified: Boolean(payload.emailVerified),
    };
  } catch {
    return null;
  }
}
