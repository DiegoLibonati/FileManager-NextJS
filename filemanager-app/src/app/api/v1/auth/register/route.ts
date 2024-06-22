import connectMongo from "@/app/lib/connectMongo";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { Encrpyt } from "@/app/lib/encrypt";
import { IUser } from "@/app/lib/entities";
import { FileManager } from "@/app/lib/fileManager";
import nodemailer from "nodemailer";

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
    emailVerified: false,
  });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // 587 for TLS, 465 for SSL
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Welcome to FileManager APP, it's a pleasure to have you with us.",
    text: `Enter the following link to verify your email address: ${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify?id=${user._id}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return NextResponse.json(
        {
          error: error,
        },
        { status: 400 }
      );
    }
    console.log("Email sent: " + info.response);
  });

  return NextResponse.json(
    {
      data: user,
      message: "User successfully created!",
    },
    { status: 201 }
  );
}
