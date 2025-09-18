import { NextRequest, NextResponse } from "next/server";

import { IUser } from "@src/app/lib/entities";

import connectMongo from "@src/app/lib/connectMongo";
import { Encrpyt } from "@src/app/lib/encrypt";
import { Jwt } from "@src/app/lib/jwt";
import User from "@src/models/user";

export async function POST(req: NextRequest) {
  await connectMongo();
  const body: Pick<IUser, "username" | "password"> = await req.json();

  const username = body.username.trim();
  const password = body.password.trim();

  if (!username || !password) {
    return NextResponse.json(
      {
        error: "A username and password are required to log in to an account.",
      },
      { status: 400 }
    );
  }

  const accountExists = await User.findOne({ username: username });

  if (!accountExists) {
    return NextResponse.json(
      {
        error: `There is no account with the username: ${username}.`,
      },
      { status: 400 }
    );
  }

  const encrypt = new Encrpyt();

  const passwordAreEqual = await encrypt.compareString(
    password,
    accountExists.password
  );

  if (!passwordAreEqual) {
    return NextResponse.json(
      {
        error: `Incorrect password.`,
      },
      { status: 400 }
    );
  }

  const data = {
    username: accountExists.username,
    email: accountExists.email,
    plan: accountExists.plan,
    emailVerified: accountExists.emailVerified,
  };

  const jwt = new Jwt({ cookieName: "token", payload: data });

  await jwt.signJWT();

  return NextResponse.json(
    {
      data: data,
      message: "User successfully logged in!",
    },
    { status: 200 }
  );
}

export const dynamic = "force-dynamic";
