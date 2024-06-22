"use server";

import * as jose from "jose";
import { cookies } from "next/headers";
import { User } from "../../../next-env";

export const getSession = async (): Promise<User> => {
  const session = await jose.jwtVerify(
    cookies().get("token")!.value,
    new TextEncoder().encode(process.env.SECRET_KEY_AUTH!)
  );

  return session.payload as User;
};
