import fs from "fs/promises";
import path from "path";
import { File, Folder } from "../../next-env";
import { getCategoryByExtension, getExtension } from "../helpers/utils";
import { categories } from "../helpers/constants";

export class FileManager {
  // /home/app/src/cloud/Die2/carpeta/carpetita
  constructor(public path: string) {}

  async getAllFiles(): Promise<File[]> {
    let filesList: File[] = [];

    const files = await fs.readdir(this.path, { withFileTypes: true });

    for (const file of files) {
      this.path = path.join(file.parentPath, file.name);
      if (file.isDirectory()) {
        const subFiles = await this.getAllFiles();
        filesList = filesList.concat(subFiles);
      } else if (file.isFile()) {
        const fileStat = await fs.stat(this.path);
        const extension = getExtension(file.name);
        const category = getCategoryByExtension(extension, categories);

        filesList.push({
          id: this.path,
          filename: file.name,
          size: String(fileStat.size),
          path: this.parsePath(this.path),
          type: "file",
          idCategory: category.id,
          bgColor: category.background_color,
          color: category.icon_color,
          extension: extension,
        });
      }
    }

    return filesList;
  }

  async getAllFolders(): Promise<Folder[]> {
    let folderList: Folder[] = [];

    const foldersInPath = (
      await fs.readdir(this.path, { withFileTypes: true })
    ).filter((item) => item.isDirectory());

    for (const folder of foldersInPath) {
      this.path = path.join(folder.parentPath, folder.name);
      const folderStat = await fs.stat(this.path);

      folderList.push({
        id: this.path,
        foldername: folder.name,
        size: String(folderStat.size),
        path: this.parsePath(this.path),
        type: "folder",
        len: String(
          (await this.getFoldersDirectory(this.path)).length +
            (await this.getFilesDirectory(this.path)).length
        ),
        bgColor: "#fdf0a1",
        color: "#f6c136",
      });

      const subFolders = await this.getAllFolders();
      if (subFolders.length > 0) {
        folderList = [...folderList, ...subFolders];
      }
    }

    return folderList;
  }

  async getAllFilesExtension(extensions: string[]): Promise<File[]> {
    let filesList: File[] = [];

    const files = await fs.readdir(this.path, { withFileTypes: true });

    for (const extension of extensions) {
      for (const file of files) {
        this.path = path.join(file.parentPath, file.name);
        if (file.isDirectory()) {
          const subFiles = await this.getAllFilesExtension(extensions);
          filesList = filesList.concat(subFiles);
        } else if (path.extname(file.name) === `.${extension}`) {
          const fileStat = await fs.stat(this.path);
          const category = getCategoryByExtension(extension, categories);

          filesList.push({
            id: this.path,
            filename: file.name,
            size: String(fileStat.size),
            path: this.parsePath(this.path),
            type: "file",
            idCategory: category.id,
            bgColor: category.background_color,
            color: category.icon_color,
            extension: extension,
          });
        }
      }
    }

    return filesList;
  }

  async getFilesDirectory(customPath: string = ""): Promise<File[]> {
    const filesInPath = (
      await fs.readdir(customPath || this.path, { withFileTypes: true })
    ).filter((item) => item.isFile());

    const files = await Promise.all(
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
          extension: extension,
        };
      })
    );

    return files;
  }

  async getFoldersDirectory(customPath: string = ""): Promise<Folder[]> {
    const foldersInPath = (
      await fs.readdir(customPath || this.path, { withFileTypes: true })
    ).filter((item) => item.isDirectory());

    const folders = await Promise.all(
      foldersInPath.map(async (folder) => {
        const folderPath = path.join(folder.parentPath, folder.name);
        const folderStat = await fs.stat(folderPath);

        return {
          id: folderPath,
          foldername: folder.name,
          size: String(folderStat.size),
          path: this.parsePath(folderPath),
          type: "folder",
          len: String(
            (await this.getFoldersDirectory(folderPath)).length +
              (await this.getFilesDirectory(folderPath)).length
          ),
          bgColor: "#fdf0a1",
          color: "#f6c136",
        };
      })
    );

    return folders;
  }

  async deleteFile() {
    await fs.unlink(this.path);
  }

  async deleteFolder() {
    await fs.rmdir(this.path, { recursive: true });
  }

  async createFolder() {
    await fs.mkdir(this.path);
  }

  async writeFile(buffer: Uint8Array) {
    await fs.writeFile(this.path, buffer);
  }

  parsePath(path: string): string {
    const arrPath = path.split("/");
    const indexOFCloudFolder = arrPath.indexOf("cloud");

    return `/${arrPath
      .slice(indexOFCloudFolder + 2, arrPath.length)
      .join("/")}`;
  }
}
