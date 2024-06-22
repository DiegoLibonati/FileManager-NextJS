import User from "@/models/user";
import connectMongo from "@/app/lib/connectMongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectMongo();

  const payload = JSON.parse(req.headers.get("payload")!);

  const user = await User.findOne({ username: payload.username });

  const data = {
    username: user.username,
    email: user.email,
    plan: user.plan,
  };

  return NextResponse.json(
    {
      data: data,
      message: "User information successfully delivered!.",
    },
    { status: 200 }
  );
}
