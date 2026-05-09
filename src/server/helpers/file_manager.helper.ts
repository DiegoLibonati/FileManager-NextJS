import fs from "fs/promises";
import path from "path";

import type { FileItem, FolderItem } from "@/types/app";

import { getCategoryByExtension, getExtension } from "@/lib/utils";
import { categories } from "@/lib/categories";

export class FileManager {
  constructor(private readonly basePath: string) {}

  async getAllFiles(currentPath: string = this.basePath): Promise<FileItem[]> {
    let filesList: FileItem[] = [];

    const files = await fs.readdir(currentPath, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(file.parentPath, file.name);

      if (file.isDirectory()) {
        filesList = filesList.concat(await this.getAllFiles(filePath));
      } else if (file.isFile()) {
        const fileStat = await fs.stat(filePath);
        const extension = getExtension(file.name);
        const category = getCategoryByExtension(extension, categories);

        filesList.push({
          id: filePath,
          filename: file.name,
          size: String(fileStat.size),
          path: this.parsePath(filePath),
          type: "file",
          idCategory: category.id,
          bgColor: category.background_color,
          color: category.icon_color,
          extension,
        });
      }
    }

    return filesList;
  }

  async getAllFolders(currentPath: string = this.basePath): Promise<FolderItem[]> {
    let folderList: FolderItem[] = [];

    const foldersInPath = (await fs.readdir(currentPath, { withFileTypes: true })).filter((item) =>
      item.isDirectory()
    );

    for (const folder of foldersInPath) {
      const folderPath = path.join(folder.parentPath, folder.name);
      const [folderStat, subFolders, subFiles] = await Promise.all([
        fs.stat(folderPath),
        this.getFoldersDirectory(folderPath),
        this.getFilesDirectory(folderPath),
      ]);

      folderList.push({
        id: folderPath,
        foldername: folder.name,
        size: String(folderStat.size),
        path: this.parsePath(folderPath),
        type: "folder",
        len: String(subFolders.length + subFiles.length),
        bgColor: "#fdf0a1",
        color: "#f6c136",
      });

      const nestedFolders = await this.getAllFolders(folderPath);
      if (nestedFolders.length > 0) {
        folderList = [...folderList, ...nestedFolders];
      }
    }

    return folderList;
  }

  async getAllFilesExtension(
    extensions: string[],
    currentPath: string = this.basePath
  ): Promise<FileItem[]> {
    let filesList: FileItem[] = [];

    const files = await fs.readdir(currentPath, { withFileTypes: true });

    for (const extension of extensions) {
      for (const file of files) {
        const filePath = path.join(file.parentPath, file.name);

        if (file.isDirectory()) {
          filesList = filesList.concat(await this.getAllFilesExtension(extensions, filePath));
        } else if (path.extname(file.name) === `.${extension}`) {
          const fileStat = await fs.stat(filePath);
          const category = getCategoryByExtension(extension, categories);

          filesList.push({
            id: filePath,
            filename: file.name,
            size: String(fileStat.size),
            path: this.parsePath(filePath),
            type: "file",
            idCategory: category.id,
            bgColor: category.background_color,
            color: category.icon_color,
            extension,
          });
        }
      }
    }

    return filesList;
  }

  async getFilesDirectory(customPath: string = this.basePath): Promise<FileItem[]> {
    const filesInPath = (await fs.readdir(customPath, { withFileTypes: true })).filter((item) =>
      item.isFile()
    );

    return Promise.all(
      filesInPath.map(async (file) => {
        const filePath = path.join(file.parentPath, file.name);
        const fileStat = await fs.stat(filePath);
        const extension = getExtension(file.name);
        const category = getCategoryByExtension(extension, categories);

        return {
          id: filePath,
          filename: file.name,
          size: String(fileStat.size),
          path: this.parsePath(filePath),
          type: "file",
          idCategory: category.id,
          bgColor: category.background_color,
          color: category.icon_color,
          extension,
        };
      })
    );
  }

  async getFoldersDirectory(customPath: string = this.basePath): Promise<FolderItem[]> {
    const foldersInPath = (await fs.readdir(customPath, { withFileTypes: true })).filter((item) =>
      item.isDirectory()
    );

    return Promise.all(
      foldersInPath.map(async (folder) => {
        const folderPath = path.join(folder.parentPath, folder.name);
        const [folderStat, subFolders, subFiles] = await Promise.all([
          fs.stat(folderPath),
          this.getFoldersDirectory(folderPath),
          this.getFilesDirectory(folderPath),
        ]);

        return {
          id: folderPath,
          foldername: folder.name,
          size: String(folderStat.size),
          path: this.parsePath(folderPath),
          type: "folder",
          len: String(subFolders.length + subFiles.length),
          bgColor: "#fdf0a1",
          color: "#f6c136",
        };
      })
    );
  }

  async deleteFile(): Promise<void> {
    await fs.unlink(this.basePath);
  }

  async deleteFolder(): Promise<void> {
    await fs.rm(this.basePath, { recursive: true, force: true });
  }

  async createFolder(): Promise<void> {
    await fs.mkdir(this.basePath, { recursive: true });
  }

  async writeFile(buffer: Uint8Array): Promise<void> {
    await fs.writeFile(this.basePath, buffer);
  }

  private parsePath(filePath: string): string {
    const parts = filePath.split("/");
    const cloudIndex = parts.indexOf("cloud");
    return `/${parts.slice(cloudIndex + 2).join("/")}`;
  }
}
