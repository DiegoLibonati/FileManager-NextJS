/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";

import { FileManagerController } from "@/server/controllers/filemanager.controller";
import { FileManagerService } from "@/server/services/filemanager.service";

import { mockFiles } from "@tests/__mocks__/files.mock";
import { mockFolders } from "@tests/__mocks__/folders.mock";

jest.mock("@/server/services/filemanager.service");

const mockPayload = {
  username: "alice",
  email: "alice@example.com",
  plan: "0",
  emailVerified: false,
};

const buildRequest = (
  url: string,
  options: { method?: string; body?: BodyInit } = {}
): NextRequest =>
  new NextRequest(url, {
    ...options,
    headers: {
      payload: JSON.stringify(mockPayload),
      "Content-Type": "application/json",
    },
  });

describe("filemanager.controller", () => {
  describe("getDirectory", () => {
    it("should return 400 when path is missing", async () => {
      const req = buildRequest("http://localhost/api/v1/filemanager");

      const response = await FileManagerController.getDirectory(req);

      expect(response.status).toBe(400);
      expect(FileManagerService.getDirectory).not.toHaveBeenCalled();
    });

    it("should return 200 with directory contents", async () => {
      (FileManagerService.getDirectory as jest.Mock).mockResolvedValue([
        mockFiles[0],
        mockFolders[0],
      ]);
      const req = buildRequest("http://localhost/api/v1/filemanager?path=/docs");

      const response = await FileManagerController.getDirectory(req);
      const body = (await response.json()) as { data: unknown[] };

      expect(response.status).toBe(200);
      expect(body.data).toHaveLength(2);
    });
  });

  describe("createFolder", () => {
    it("should return 400 when path is missing", async () => {
      const req = buildRequest("http://localhost/api/v1/filemanager", {
        method: "POST",
        body: JSON.stringify({}),
      });

      const response = await FileManagerController.createFolder(req);

      expect(response.status).toBe(400);
    });

    it("should return 201 on successful folder creation", async () => {
      (FileManagerService.createFolder as jest.Mock).mockResolvedValue(undefined);
      const req = buildRequest("http://localhost/api/v1/filemanager", {
        method: "POST",
        body: JSON.stringify({ path: "/new-folder" }),
      });

      const response = await FileManagerController.createFolder(req);

      expect(response.status).toBe(201);
    });
  });

  describe("deleteItem", () => {
    it("should return 400 when path or type is missing", async () => {
      const req = buildRequest("http://localhost/api/v1/filemanager?path=/docs", {
        method: "DELETE",
      });

      const response = await FileManagerController.deleteItem(req);

      expect(response.status).toBe(400);
    });

    it("should return 200 on successful deletion", async () => {
      (FileManagerService.deleteItem as jest.Mock).mockResolvedValue(undefined);
      const req = buildRequest("http://localhost/api/v1/filemanager?path=/docs&type=folder", {
        method: "DELETE",
      });

      const response = await FileManagerController.deleteItem(req);

      expect(response.status).toBe(200);
    });
  });

  describe("getCategories", () => {
    it("should return 200 with the categories list", async () => {
      (FileManagerService.getCategories as jest.Mock).mockReturnValue([
        { id: "documents", name: "Docs", icon_color: "#59e766", background_color: "#ecf9ed" },
      ]);
      const response = FileManagerController.getCategories();
      const body = (await response.json()) as { data: unknown[] };

      expect(response.status).toBe(200);
      expect(Array.isArray(body.data)).toBe(true);
    });
  });

  describe("getCategoryFiles", () => {
    it("should return 400 when category name is missing", async () => {
      const req = buildRequest("http://localhost/api/v1/filemanager/categories/files");

      const response = await FileManagerController.getCategoryFiles(req);

      expect(response.status).toBe(400);
    });

    it("should return 400 when the service returns an error object", async () => {
      (FileManagerService.getCategoryFiles as jest.Mock).mockResolvedValue({
        error: "Category not found.",
      });
      const req = buildRequest(
        "http://localhost/api/v1/filemanager/categories/files?category=unknown"
      );

      const response = await FileManagerController.getCategoryFiles(req);

      expect(response.status).toBe(400);
    });

    it("should return 200 with the files list on success", async () => {
      (FileManagerService.getCategoryFiles as jest.Mock).mockResolvedValue([mockFiles[0]]);
      const req = buildRequest(
        "http://localhost/api/v1/filemanager/categories/files?category=documents"
      );

      const response = await FileManagerController.getCategoryFiles(req);

      expect(response.status).toBe(200);
    });
  });

  describe("getAllFolders", () => {
    it("should return 200 with the folders list", async () => {
      (FileManagerService.getAllFolders as jest.Mock).mockResolvedValue([mockFolders[0]]);
      const req = buildRequest("http://localhost/api/v1/filemanager/folders");

      const response = await FileManagerController.getAllFolders(req);
      const body = (await response.json()) as { data: unknown[] };

      expect(response.status).toBe(200);
      expect(body.data).toHaveLength(1);
    });
  });

  describe("getRecentUpload", () => {
    it("should return 200 with the recent file", async () => {
      (FileManagerService.getRecentUpload as jest.Mock).mockResolvedValue(mockFiles[0]);
      const req = buildRequest("http://localhost/api/v1/filemanager/recent_upload");

      const response = await FileManagerController.getRecentUpload(req);

      expect(response.status).toBe(200);
    });
  });

  describe("upload", () => {
    it("should return 400 when path or file is missing", async () => {
      const formData = new FormData();
      const req = new NextRequest("http://localhost/api/v1/filemanager/upload", {
        method: "POST",
        headers: { payload: JSON.stringify(mockPayload) },
        body: formData,
      });

      const response = await FileManagerController.upload(req);

      expect(response.status).toBe(400);
    });

    it("should return 400 when the service returns an error", async () => {
      (FileManagerService.upload as jest.Mock).mockResolvedValue({ error: "Invalid extension." });
      const formData = new FormData();
      formData.append("path", "/docs");
      formData.append("file", new File(["content"], "file.exe"));
      const req = new NextRequest("http://localhost/api/v1/filemanager/upload", {
        method: "POST",
        headers: { payload: JSON.stringify(mockPayload) },
        body: formData,
      });

      const response = await FileManagerController.upload(req);

      expect(response.status).toBe(400);
    });

    it("should return 200 with the recent file on successful upload", async () => {
      (FileManagerService.upload as jest.Mock).mockResolvedValue({ recentFile: mockFiles[0] });
      const formData = new FormData();
      formData.append("path", "/docs");
      formData.append("file", new File(["content"], "photo.png"));
      const req = new NextRequest("http://localhost/api/v1/filemanager/upload", {
        method: "POST",
        headers: { payload: JSON.stringify(mockPayload) },
        body: formData,
      });

      const response = await FileManagerController.upload(req);

      expect(response.status).toBe(200);
    });
  });
});
