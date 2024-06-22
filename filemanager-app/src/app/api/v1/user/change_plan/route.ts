import User from "@/models/user";
import connectMongo from "@/app/lib/connectMongo";
import { NextRequest, NextResponse } from "next/server";
import { Jwt } from "@/app/lib/jwt";

export async function GET(req: NextRequest) {
  await connectMongo();
  const searchParams = req.nextUrl.searchParams;

  const jwt = new Jwt();
  const plan = searchParams.get("plan");

  if (!plan) {
    return NextResponse.json(
      {
        error: "Plan is required.",
      },
      { status: 400 }
    );
  }

  const payload = JSON.parse(req.headers.get("payload")!);
  await User.updateOne({ username: payload.username }, { plan: plan });

  const user = await User.findOne({ username: payload.username });

  const data = {
    username: user.username,
    email: user.email,
    plan: user.plan,
  };

  jwt.config = {
    cookieName: "token",
    payload: data,
  };

  await jwt.signJWT();

  return NextResponse.json(
    {
      data: data,
      message: "Plan successfully changed!.",
    },
    { status: 200 }
  );
}
