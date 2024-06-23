import connectMongo from "@/app/lib/connectMongo";
import { Encrpyt } from "@/app/lib/encrypt";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectMongo();

  const body: { id: string; password: string; username: string } =
    await req.json();

  const password = body.password.trim();
  const hashedId = body.id.trim();
  const username = body.username.trim();

  if (!hashedId || !username || !password) {
    return NextResponse.json(
      {
        error: "Id, username and password are required.",
      },
      { status: 400 }
    );
  }

  const accountExists = await User.findOne({ username: username });

  if (!accountExists) {
    return NextResponse.json(
      {
        error: `This account does not have an email to verify.`,
      },
      { status: 400 }
    );
  }

  const encrypt = new Encrpyt();
  const compareIds = await encrypt.compareString(
    accountExists._id.toString(),
    hashedId
  );

  if (!compareIds) {
    return NextResponse.json(
      {
        error: `Invalid reset password link.`,
      },
      { status: 400 }
    );
  }

  const newPasswordHashed = await encrypt.cryptString(password);

  await User.updateOne(
    { _id: accountExists._id },
    { password: newPasswordHashed }
  );

  return NextResponse.json(
    {
      message: "Your password has been successfully reset!.",
    },
    { status: 200 }
  );
}
