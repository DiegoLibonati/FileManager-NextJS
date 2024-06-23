import User from "@/models/user";
import connectMongo from "@/app/lib/connectMongo";
import { NextRequest, NextResponse } from "next/server";
import { Email } from "@/app/lib/email";
import { Encrpyt } from "@/app/lib/encrypt";

export async function POST(req: NextRequest) {
  await connectMongo();

  const body: { email: string } = await req.json();

  const emailUser = body.email.trim();

  if (!emailUser) {
    return NextResponse.json(
      {
        error: "Email is required.",
      },
      { status: 400 }
    );
  }

  const accountExists = await User.findOne({ email: emailUser });

  if (!accountExists) {
    return NextResponse.json(
      {
        error: `There is no email: ${emailUser} registered`,
      },
      { status: 400 }
    );
  }

  const encrypt = new Encrpyt();
  const hashedId = await encrypt.cryptString(accountExists._id.toString());
  const instanceEmail = new Email();

  const result = instanceEmail.sendEmail(
    emailUser,
    "You can now change your password in FileManager APP.",
    `Enter the following link to reset your password: ${process.env.NEXT_PUBLIC_API_URL}/new?id=${hashedId}&username=${accountExists.username}`
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
      message: "Password reset email sent successfully!.",
    },
    { status: 200 }
  );
}
