/**
 * @jest-environment node
 */

import type { FolderItem, Category } from "@/types/app";

import { FileManagerService } from "@/server/services/filemanager.service";
import { RecentFileDAO } from "@/server/daos/recent_file.dao";
import { FileManager } from "@/server/helpers/file_manager.helper";

import { mockFolders } from "@tests/__mocks__/folders.mock";
import { mockFiles } from "@tests/__mocks__/files.mock";

const mockFileManagerInstance = {
  getFoldersDirectory: jest.fn(),
  getFilesDirectory: jest.fn(),
  getAllFolders: jest.fn(),
  getAllFilesExtension: jest.fn(),
  getAllFiles: jest.fn(),
  createFolder: jest.fn(),
  deleteFile: jest.fn(),
  deleteFolder: jest.fn(),
  writeFile: jest.fn(),
};

jest.mock("@/server/daos/recent_file.dao");
jest.mock("@/server/daos/user.dao");
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));
jest.mock("@/server/configs/env.config", () => ({
  getEnvs: (): { CLOUD_PATH: string } => ({ CLOUD_PATH: "/cloud" }),
}));

jest.mock("@/server/helpers/file_manager.helper", () => ({
  FileManager: jest.fn().mockImplementation(() => mockFileManagerInstance),
}));

beforeEach(() => {
  (FileManager as jest.Mock).mockImplementation(() => mockFileManagerInstance);
});

describe("filemanager.service", () => {
  describe("getDirectory", () => {
    it("should return combined folders and files for the given path", async () => {
      mockFileManagerInstance.getFoldersDirectory.mockResolvedValue([mockFolders[0]]);
      mockFileManagerInstance.getFilesDirectory.mockResolvedValue([mockFiles[0]]);

      const result = await FileManagerService.getDirectory("alice", "/docs");

      expect(result).toHaveLength(2);
      expect(result.some((i) => i.type === "folder")).toBe(true);
      expect(result.some((i) => i.type === "file")).toBe(true);
    });
  });

  describe("createFolder", () => {
    it("should call FileManager.createFolder with the correct path", async () => {
      mockFileManagerInstance.createFolder.mockResolvedValue(undefined);

      await FileManagerService.createFolder("alice", "/new-folder");

      expect(mockFileManagerInstance.createFolder).toHaveBeenCalled();
    });
  });

  describe("deleteItem", () => {
    it("should call deleteFolder when the type is folder", async () => {
      mockFileManagerInstance.deleteFolder.mockResolvedValue(undefined);

      await FileManagerService.deleteItem("alice", "/docs", "folder");

      expect(mockFileManagerInstance.deleteFolder).toHaveBeenCalled();
      expect(RecentFileDAO.deleteByUploaderAndPath).not.toHaveBeenCalled();
    });

    it("should call deleteFile and deleteByUploaderAndPath when type is file", async () => {
      mockFileManagerInstance.deleteFile.mockResolvedValue(undefined);
      (RecentFileDAO.deleteByUploaderAndPath as jest.Mock).mockResolvedValue(undefined);

      await FileManagerService.deleteItem("alice", "/docs/file.txt", "file");

      expect(RecentFileDAO.deleteByUploaderAndPath).toHaveBeenCalledWith("alice", "/docs/file.txt");
      expect(mockFileManagerInstance.deleteFile).toHaveBeenCalled();
    });
  });

  describe("getCategories", () => {
    it("should return the categories array", () => {
      const result: Category[] = FileManagerService.getCategories();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty("id");
    });
  });

  describe("getCategoryFiles", () => {
    it("should return an error object when the category does not exist", async () => {
      const result = await FileManagerService.getCategoryFiles("alice", "unknown-category");

      expect(result).toHaveProperty("error");
      expect((result as { error: string }).error).toContain("unknown-category");
    });

    it("should return a file list for a valid category", async () => {
      mockFileManagerInstance.getAllFilesExtension.mockResolvedValue([mockFiles[0]]);

      const result = await FileManagerService.getCategoryFiles("alice", "documents");

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("getAllFolders", () => {
    it("should return the folders list from FileManager", async () => {
      mockFileManagerInstance.getAllFolders.mockResolvedValue([mockFolders[0]]);

      const result: FolderItem[] = await FileManagerService.getAllFolders("alice");

      expect(result).toHaveLength(1);
      expect(result[0]!.foldername).toBe("docs");
    });
  });

  describe("getRecentUpload", () => {
    it("should return the recent file for the uploader", async () => {
      (RecentFileDAO.findByUploader as jest.Mock).mockResolvedValue(mockFiles[0]);

      const result = await FileManagerService.getRecentUpload("alice");

      expect(result).toEqual(mockFiles[0]);
      expect(RecentFileDAO.findByUploader).toHaveBeenCalledWith("alice");
    });

    it("should return null when there is no recent upload", async () => {
      (RecentFileDAO.findByUploader as jest.Mock).mockResolvedValue(null);

      const result = await FileManagerService.getRecentUpload("alice");

      expect(result).toBeNull();
    });
  });

  describe("upload", () => {
    it("should return an error for unsupported file extensions", async () => {
      const mockFile = new File(["content"], "virus.exe", { type: "application/exe" });

      const result = await FileManagerService.upload("alice", "/docs", mockFile);

      expect("error" in result).toBe(true);
      expect((result as { error: string }).error).toContain("exe");
    });

    it("should write the file and return the recent file on success", async () => {
      const mockFile = new File(["content"], "photo.png", { type: "image/png" });
      mockFileManagerInstance.writeFile.mockResolvedValue(undefined);
      (RecentFileDAO.deleteByUploader as jest.Mock).mockResolvedValue(undefined);
      (RecentFileDAO.create as jest.Mock).mockResolvedValue({ ...mockFiles[0], _id: "new-id" });

      const result = await FileManagerService.upload("alice", "/docs", mockFile);

      expect("recentFile" in result).toBe(true);
    });
  });
});
