import User from "@/models/user";
import connectMongo from "@/app/lib/connectMongo";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET(req: NextRequest) {
  await connectMongo();

  const payload = JSON.parse(req.headers.get("payload")!);

  const user = await User.findOne({ username: payload.username });

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
      message: "Verification email sent successfully!.",
    },
    { status: 200 }
  );
}
