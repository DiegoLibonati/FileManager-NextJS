import { NextRequest, NextResponse } from "next/server";

import connectMongo from "@src/app/lib/connectMongo";
import { Email } from "@src/app/lib/email";
import { Encrpyt } from "@src/app/lib/encrypt";
import User from "@src/models/user";

export async function GET(req: NextRequest) {
  await connectMongo();

  const payload = JSON.parse(req.headers.get("payload")!);

  const user = await User.findOne({ username: payload.username });

  const encrypt = new Encrpyt();
  const hashedId = await encrypt.cryptString(user._id.toString());
  const instanceEmail = new Email();

  const result = instanceEmail.sendEmail(
    user.email,
    "You can now verify your email in FileManager APP.",
    `Enter the following link to verify your email address: ${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify?id=${hashedId}&username=${user.username}`
  );

  if (result instanceof Error) {
    return NextResponse.json(
      {
        error: result,
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      message: "Verification email sent successfully!.",
    },
    { status: 200 }
  );
}

export const dynamic = "force-dynamic";
