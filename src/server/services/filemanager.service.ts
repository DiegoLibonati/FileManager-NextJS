import { exec } from "child_process";
import path from "path";
import { revalidatePath } from "next/cache";

import type { HydratedDocument } from "mongoose";
import type { IRecentFileDoc } from "@/types/api";
import type { Category, FileItem, FolderItem, SpaceUsed } from "@/types/app";

import { categories, categoriesExtension } from "@/lib/categories";
import {
  getCategoryByExtension,
  getExtension,
  roundToOneDecimal,
  validExtensions,
} from "@/lib/utils";

import { RecentFileDAO } from "@/server/daos/recent_file.dao";
import { UserDAO } from "@/server/daos/user.dao";

import { getCloudPath } from "@/server/helpers/get_cloud_path.helper";
import { FileManager } from "@/server/helpers/file_manager.helper";

export const FileManagerService = {
  async getDirectory(username: string, dirPath: string): Promise<(FileItem | FolderItem)[]> {
    const cloudPath = getCloudPath(username, dirPath);
    const fm = new FileManager(cloudPath);
    const [folders, files] = await Promise.all([fm.getFoldersDirectory(), fm.getFilesDirectory()]);
    return [...folders, ...files];
  },

  async createFolder(username: string, folderPath: string): Promise<void> {
    await new FileManager(getCloudPath(username, folderPath)).createFolder();
  },

  async deleteItem(username: string, itemPath: string, type: string): Promise<void> {
    const fm = new FileManager(getCloudPath(username, itemPath));

    if (type === "folder") {
      await fm.deleteFolder();
      return;
    }

    await RecentFileDAO.deleteByUploaderAndPath(username, itemPath);
    await fm.deleteFile();
  },

  getCategories(): Category[] {
    return categories;
  },

  async getCategoryFiles(
    username: string,
    categoryName: string
  ): Promise<unknown[] | { error: string }> {
    const extensions = categoriesExtension[categoryName];
    if (!extensions) return { error: `Category ${categoryName} not found.` };

    return new FileManager(getCloudPath(username)).getAllFilesExtension(extensions);
  },

  async getAllFolders(username: string): Promise<FolderItem[]> {
    return new FileManager(getCloudPath(username)).getAllFolders();
  },

  async getRecentUpload(username: string): Promise<HydratedDocument<IRecentFileDoc> | null> {
    return RecentFileDAO.findByUploader(username);
  },

  async getSpaceUsed(username: string): Promise<SpaceUsed> {
    const user = await UserDAO.findByUsername(username);
    const plan = user?.plan ?? "0";
    const total_space = roundToOneDecimal(plan === "1" ? 2 : 1);
    const cloudPath = getCloudPath(username);

    const { stdout } = await new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
      exec("du -sm", { cwd: cloudPath }, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        if (stderr) {
          reject(new Error(stderr));
          return;
        }
        resolve({ stdout, stderr });
      });
    });

    const rawMb = parseFloat(stdout.split("\t")[0] ?? "0");
    const total_used = roundToOneDecimal(rawMb / 1024);
    const total_free = roundToOneDecimal(total_space - total_used);
    const percentage_used = roundToOneDecimal((total_space - total_free) * 100);
    const total_files = (await new FileManager(cloudPath).getAllFiles()).length;

    return {
      total_space: String(total_space),
      total_used: String(total_used),
      total_free: String(total_free),
      percentage_used: String(percentage_used),
      total_files,
    };
  },

  async upload(
    username: string,
    uploadPath: string,
    file: File
  ): Promise<{ recentFile: unknown } | { error: string }> {
    const extension = getExtension(file.name);

    if (!validExtensions(categoriesExtension).includes(extension)) {
      return {
        error: `${extension} is not a valid extension to upload, try again with a valid extension.`,
      };
    }

    const arrayBuffer = await file.arrayBuffer();
    await new FileManager(getCloudPath(username, uploadPath, file.name)).writeFile(
      new Uint8Array(arrayBuffer)
    );

    revalidatePath("/");

    const categoryFile = getCategoryByExtension(extension, categories);
    await RecentFileDAO.deleteByUploader(username);

    const recentFile = await RecentFileDAO.create({
      filename: file.name,
      extension,
      path: path.join(uploadPath, file.name),
      size: file.size,
      uploader: username,
      idCategory: categoryFile.id,
      bgColor: categoryFile.background_color,
      color: categoryFile.icon_color,
      type: "file",
    });

    return { recentFile };
  },
};
