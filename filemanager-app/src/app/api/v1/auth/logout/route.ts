import connectMongo from "@/helpers/connectMongo";
import { NextResponse } from "next/server";
import { Jwt } from "@/libs/jwt";

export async function GET() {
  await connectMongo();

  const jwt = new Jwt({ cookieName: "token" });
  jwt.deleteCookieJWT();

  return NextResponse.json(
    {
      message: "You sign out it successfully",
    },
    { status: 200 }
  );
}
