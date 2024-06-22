import User from "@/models/user";
import connectMongo from "@/helpers/connectMongo";
import { FileManager } from "@/libs/fileManager";
import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import { roundToOneDecimal } from "@/helpers/utils";
import path from "path";

export async function GET(req: NextRequest) {
  await connectMongo();

  const payload = JSON.parse(req.headers.get("payload")!);

  const user = await User.findOne({ username: payload.username });

  // SPACE IN GB
  const spaceByPlan = user.plan === "1" ? 2 : 1;

  const total_space = roundToOneDecimal(spaceByPlan);
  const pathCloud = path.join(
    `${process.cwd()}/src/cloud`,
    payload.username as string
  );
  const fileManager = new FileManager(pathCloud);
  let total_used: number;
  let total_free: number;
  let percentage_used: number;

  const { stdout } = await new Promise<{ stdout: string; stderr: string }>(
    (resolve, reject) => {
      exec("du -sm", { cwd: pathCloud }, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        if (stderr) {
          reject(stderr);
          return;
        }
        resolve({ stdout, stderr });
      });
    }
  );

  total_used = parseFloat(stdout.split("\t")[0]); // Obtiene el tamaño en MB como número

  total_used = roundToOneDecimal(total_used / 1024);
  total_free = roundToOneDecimal(total_space - total_used!);
  percentage_used = roundToOneDecimal((total_space - total_free) * 100);

  return NextResponse.json(
    {
      data: {
        total_space: String(total_space),
        total_used: String(total_used),
        total_free: String(total_free),
        percentage_used: String(percentage_used),
        total_files: (await fileManager.getAllFiles()).length,
      },
    },
    { status: 200 }
  );
}
