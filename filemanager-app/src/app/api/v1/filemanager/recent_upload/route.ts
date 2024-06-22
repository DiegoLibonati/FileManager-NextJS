import connectMongo from "@/helpers/connectMongo";
import RecentFile from "@/models/recentFile";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectMongo();

  const payload = JSON.parse(req.headers.get("payload")!);

  const recentUploadedExist = await RecentFile.findOne({
    uploader: payload.username,
  });

  return NextResponse.json(
    {
      data: recentUploadedExist,
      message: "Recent upload sent successfully!.",
    },
    { status: 200 }
  );
}
