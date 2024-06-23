import connectMongo from "@/app/lib/connectMongo";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { Encrpyt } from "@/app/lib/encrypt";
import { IUser } from "@/app/lib/entities";
import { FileManager } from "@/app/lib/fileManager";
import { Email } from "@/app/lib/email";

export async function POST(req: NextRequest) {
  await connectMongo();
  const body: IUser = await req.json();

  const username = body.username.trim();
  const email = body.email.trim();
  const password = body.password.trim();

  if (!username || !email || !password) {
    return NextResponse.json(
      {
        error:
          "A username, password and email are required to create an account.",
      },
      { status: 400 }
    );
  }

  const accountExists = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (accountExists) {
    return NextResponse.json(
      {
        error: `An account already exists with this username: ${username} or this email: ${email}.`,
      },
      { status: 400 }
    );
  }

  const pathCloud = `${process.cwd()}/src/cloud/${username}`;

  const fileManager = new FileManager(pathCloud);

  await fileManager.createFolder();

  const encrypt = new Encrpyt();

  const passwordHashed = await encrypt.cryptString(password);

  const user = await User.create({
    username: username,
    email: email,
    password: passwordHashed,
    plan: "0",
    emailVerified: false,
  });

  const instanceEmail = new Email();
  const hashedId = await encrypt.cryptString(user._id.toString());

  const result = instanceEmail.sendEmail(
    user.email,
    "Welcome to FileManager APP, it's a pleasure to have you with us.",
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
      data: user,
      message: "User successfully created!",
    },
    { status: 201 }
  );
}
