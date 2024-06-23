import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { FileManager } from "@/app/lib/fileManager";
import connectMongo from "@/app/lib/connectMongo";
import {
  getCategoryByExtension,
  getExtension,
  validExtensions,
} from "@/app/lib/utils";
import { categories, categoriesExtension } from "@/app/lib/constants";
import RecentFile from "@/models/recentFile";
import pathLib from "path";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.formData();

    const path = body.get("path")?.toString().trim();
    const file = body.get("file") as File;

    if (!path || !file) {
      return NextResponse.json(
        {
          error: "Path and file are required.",
        },
        { status: 400 }
      );
    }

    const payload = JSON.parse(req.headers.get("payload")!);
    const extension = getExtension(file.name);

    if (!validExtensions(categoriesExtension).includes(extension)) {
      return NextResponse.json(
        {
          error: `${extension} is not a valid extension to upload, try again with a valid extension.`,
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const fileManager = new FileManager(
      pathLib.join(
        `${process.cwd()}/src/cloud`,
        payload.username as string,
        path,
        file.name
      )
    );
    await fileManager.writeFile(buffer);

    revalidatePath("/");

    const categoryFile = getCategoryByExtension(extension, categories);

    const recentUploadedExist = await RecentFile.findOne({
      uploader: payload.username,
    });

    if (recentUploadedExist) {
      await RecentFile.deleteOne({ uploader: payload.username });
    }

    const recentFile = await RecentFile.create({
      filename: file.name,
      extension: extension,
      path: pathLib.join(path, file.name),
      size: file.size,
      uploader: payload.username,
      idCategory: categoryFile.id,
      bgColor: categoryFile.background_color,
      color: categoryFile.icon_color,
      type: "file",
    });

    return NextResponse.json(
      {
        data: recentFile,
        message: "File successfully uploaded!.",
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
  }
}
