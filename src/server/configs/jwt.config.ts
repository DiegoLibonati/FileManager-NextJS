import * as jose from "jose";

import type { JWTConfig } from "@/types/api";

import {
  JWT_ALGORITHM,
  JWT_AUDIENCE,
  JWT_EXPIRATION,
  JWT_ISSUER,
} from "@/server/constants/vars.constant";

let _secret: Uint8Array | null = null;

const getJwtSecret = (): Uint8Array => {
  if (_secret) return _secret;

  const raw = process.env.JWT_SECRET;
  if (!raw) {
    throw new Error("Missing required environment variable: JWT_SECRET");
  }

  _secret = new TextEncoder().encode(raw);
  return _secret;
};

export class Jwt {
  constructor(public config?: JWTConfig) {}

  signJWT(): Promise<string> {
    return new jose.SignJWT(this.config?.payload ?? {})
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setIssuer(JWT_ISSUER)
      .setAudience(JWT_AUDIENCE)
      .setExpirationTime(JWT_EXPIRATION)
      .sign(getJwtSecret());
  }

  async verifyJWT(): Promise<jose.JWTVerifyResult | false> {
    if (!this.config?.token) return false;

    try {
      return await jose.jwtVerify(this.config.token, getJwtSecret(), {
        algorithms: [JWT_ALGORITHM],
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
      });
    } catch {
      return false;
    }
  }
}
