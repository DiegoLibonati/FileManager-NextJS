import { cookies } from "next/headers";
import * as jose from "jose";

type JWTConfig = {
  payload?: Record<string, string> | null;
  cookieName?: string;
  token?: string;
};

export class Jwt {
  constructor(
    public config?: JWTConfig,
    public secretKey: string = process.env.SECRET_KEY_AUTH!
  ) {}

  async signJWT(): Promise<string> {
    try {
      const token = await new jose.SignJWT(this.config?.payload!)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30d")
        .sign(new TextEncoder().encode(this.secretKey));

      cookies().set(this.config?.cookieName!, token);

      return token;
    } catch (e) {
      console.log(e);
      return "";
    }
  }

  async verifyJWT(): Promise<jose.JWTVerifyResult<jose.JWTPayload> | false> {
    try {
      const session = await jose.jwtVerify(
        this.config?.token!,
        new TextEncoder().encode(this.secretKey)
      );

      return session;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async deleteCookieJWT(): Promise<void> {
    cookies().delete(this.config?.cookieName!);
  }
}
