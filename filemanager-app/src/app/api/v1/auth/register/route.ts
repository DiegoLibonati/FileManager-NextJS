import connectMongo from "@/app/lib/connectMongo";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { Encrpyt } from "@/app/lib/encrypt";
import { IUser } from "../../../../../../next-env";
import { FileManager } from "@/app/lib/fileManager";

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

  const accountExists = await User.findOne({ username: username });

  if (accountExists) {
    return NextResponse.json(
      {
        error: `An account already exists with this username: ${username}.`,
      },
      { status: 400 }
    );
  }

  const pathCloud = `${process.cwd()}/src/cloud/${username}`;

  const fileManager = new FileManager(pathCloud);

  await fileManager.createFolder();

  const encrypt = new Encrpyt(password);

  const passwordHashed = await encrypt.cryptPassword();

  const user = await User.create({
    username: username,
    email: email,
    password: passwordHashed,
    plan: "0",
  });

  return NextResponse.json(
    {
      data: user,
      message: "User successfully created!",
    },
    { status: 201 }
  );
}
