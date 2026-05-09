import * as jose from "jose";
import { cookies } from "next/headers";

import type { JWTConfig } from "@/types/api";

import { getEnvs } from "@/server/configs/env.config";

export class Jwt {
  constructor(public config?: JWTConfig) {}

  private get secret(): Uint8Array {
    return new TextEncoder().encode(getEnvs().JWT_SECRET);
  }

  async signJWT(): Promise<string> {
    try {
      const token = await new jose.SignJWT((this.config?.payload ?? {}) as Record<string, unknown>)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30d")
        .sign(this.secret);

      const cookieStore = await cookies();
      cookieStore.set(this.config?.cookieName ?? "", token);

      return token;
    } catch {
      return "";
    }
  }

  async verifyJWT(): Promise<jose.JWTVerifyResult | false> {
    try {
      return await jose.jwtVerify(this.config?.token ?? "", this.secret);
    } catch {
      return false;
    }
  }

  async deleteCookieJWT(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(this.config?.cookieName ?? "");
  }
}
