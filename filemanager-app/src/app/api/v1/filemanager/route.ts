import { FileManager } from "@/app/lib/fileManager";
import RecentFile from "@/models/recentFile";
import { NextRequest, NextResponse } from "next/server";
import pathLib from "path";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json(
      {
        error: "Path is required.",
      },
      { status: 400 }
    );
  }

  const payload = JSON.parse(req.headers.get("payload")!);
  const pathCloud = pathLib.join(
    `${process.cwd()}/src/cloud`,
    payload.username as string,
    path
  );

  const fileManager = new FileManager(pathCloud);

  const folders = await fileManager.getFoldersDirectory();
  const files = await fileManager.getFilesDirectory();

  return NextResponse.json(
    {
      data: [...folders, ...files],
      message: "Files and directories sent successfully!.",
    },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const path = searchParams.get("path");
  console.log("path", path);

  if (!path) {
    return NextResponse.json(
      {
        error: "Path is required.",
      },
      { status: 400 }
    );
  }

  const payload = JSON.parse(req.headers.get("payload")!);
  const pathCloud = pathLib.join(
    `${process.cwd()}/src/cloud`,
    payload.username as string,
    path
  );

  const fileManager = new FileManager(pathCloud);
  await fileManager.createFolder();

  return NextResponse.json(
    {
      message: "Directory successfully created!.",
    },
    { status: 201 }
  );
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const path = searchParams.get("path");
  const type = searchParams.get("type");

  if (!path || !type) {
    return NextResponse.json(
      {
        error: "Path and type is required.",
      },
      { status: 400 }
    );
  }

  const payload = JSON.parse(req.headers.get("payload")!);
  const pathCloud = pathLib.join(
    `${process.cwd()}/src/cloud`,
    payload.username as string,
    path
  );

  const fileManager = new FileManager(pathCloud);

  if (type === "folder") {
    await fileManager.deleteFolder();

    return NextResponse.json(
      {
        message: "Folder successfully deleted!.",
      },
      { status: 200 }
    );
  }

  const recentFile = await RecentFile.findOne({
    uploader: payload.username,
    path: path,
  });

  if (recentFile) {
    await RecentFile.deleteOne({ uploader: payload.username, path: path });
  }

  await fileManager.deleteFile();

  return NextResponse.json(
    {
      message: "File successfully deleted!.",
    },
    { status: 200 }
  );
}
