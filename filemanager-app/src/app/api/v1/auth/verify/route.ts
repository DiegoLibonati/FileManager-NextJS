import connectMongo from "@/app/lib/connectMongo";
import { Encrpyt } from "@/app/lib/encrypt";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectMongo();

  const searchParams = req.nextUrl.searchParams;

  const hashedId = searchParams.get("id");
  const username = searchParams.get("username");

  if (!hashedId || !username) {
    return NextResponse.json(
      {
        error: "Id and username are required.",
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
  const compareIds = await encrypt.compareString(accountExists._id.toString(), hashedId);

  if (!compareIds) {
    return NextResponse.json(
      {
        error: `Invalid email validation link.`,
      },
      { status: 400 }
    );
  }

  await User.updateOne({ _id: accountExists._id }, { emailVerified: true });

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    status: 307,
  });
}
