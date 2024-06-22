import connectMongo from "@/app/lib/connectMongo";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectMongo();

  const searchParams = req.nextUrl.searchParams;

  const idUser = searchParams.get("id");

  if (!idUser) {
    return NextResponse.json(
      {
        error: "Id is required.",
      },
      { status: 400 }
    );
  }

  const accountExists = await User.findOne({ _id: idUser });

  if (!accountExists) {
    return NextResponse.json(
      {
        error: `This account does not have an email to verify.`,
      },
      { status: 400 }
    );
  }

  await User.updateOne({ _id: idUser }, { emailVerified: true });

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    status: 307,
  });
}
