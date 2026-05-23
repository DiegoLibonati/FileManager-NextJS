import { http, HttpResponse } from "msw";

import filemanagerService from "@/services/filemanagerService";

import { mockMswServer } from "@tests/__mocks__/mswServer.mock";

describe("filemanagerService", () => {
  describe("getDirectory", () => {
    it("should return the response data on success", async () => {
      const mockData = { code: "SUCCESS", message: "ok", data: [{ id: "1" }] };
      mockMswServer.use(http.get("/api/v1/filemanager", () => HttpResponse.json(mockData)));

      const result = await filemanagerService.getDirectory("/docs");

      expect(result).toEqual(mockData);
    });

    it("should throw when the response is not ok", async () => {
      mockMswServer.use(
        http.get("/api/v1/filemanager", () => new HttpResponse(null, { status: 401 }))
      );

      await expect(filemanagerService.getDirectory("/docs")).rejects.toThrow();
    });
  });

  describe("createFolder", () => {
    it("should return the response data on success", async () => {
      const mockData = { code: "SUCCESS", message: "Created" };
      mockMswServer.use(http.post("/api/v1/filemanager", () => HttpResponse.json(mockData)));

      const result = await filemanagerService.createFolder("/new-folder");

      expect(result).toEqual(mockData);
    });

    it("should throw when the response is not ok", async () => {
      mockMswServer.use(
        http.post("/api/v1/filemanager", () => new HttpResponse(null, { status: 400 }))
      );

      await expect(filemanagerService.createFolder("/new-folder")).rejects.toThrow();
    });
  });

  describe("deleteItem", () => {
    it("should return the response data on success", async () => {
      const mockData = { code: "SUCCESS", message: "Deleted" };
      mockMswServer.use(http.delete("/api/v1/filemanager", () => HttpResponse.json(mockData)));

      const result = await filemanagerService.deleteItem("/docs/file.txt", "file");

      expect(result).toEqual(mockData);
    });

    it("should throw when the response is not ok", async () => {
      mockMswServer.use(
        http.delete("/api/v1/filemanager", () => new HttpResponse(null, { status: 400 }))
      );

      await expect(filemanagerService.deleteItem("/docs/file.txt", "file")).rejects.toThrow();
    });
  });

  describe("getCategories", () => {
    it("should return the response data on success", async () => {
      const mockData = { code: "SUCCESS", message: "ok", data: [] };
      mockMswServer.use(
        http.get("/api/v1/filemanager/categories", () => HttpResponse.json(mockData))
      );

      const result = await filemanagerService.getCategories();

      expect(result).toEqual(mockData);
    });

    it("should throw when the response is not ok", async () => {
      mockMswServer.use(
        http.get("/api/v1/filemanager/categories", () => new HttpResponse(null, { status: 500 }))
      );

      await expect(filemanagerService.getCategories()).rejects.toThrow();
    });
  });

  describe("getCategoryFiles", () => {
    it("should return the response data on success", async () => {
      const mockData = { code: "SUCCESS", message: "ok", data: [] };
      mockMswServer.use(
        http.get("/api/v1/filemanager/categories/files", () => HttpResponse.json(mockData))
      );

      const result = await filemanagerService.getCategoryFiles("documents");

      expect(result).toEqual(mockData);
    });

    it("should throw when the response is not ok", async () => {
      mockMswServer.use(
        http.get(
          "/api/v1/filemanager/categories/files",
          () => new HttpResponse(null, { status: 400 })
        )
      );

      await expect(filemanagerService.getCategoryFiles("documents")).rejects.toThrow();
    });
  });

  describe("getAllFolders", () => {
    it("should return the response data on success", async () => {
      const mockData = { code: "SUCCESS", message: "ok", data: [] };
      mockMswServer.use(http.get("/api/v1/filemanager/folders", () => HttpResponse.json(mockData)));

      const result = await filemanagerService.getAllFolders();

      expect(result).toEqual(mockData);
    });

    it("should throw when the response is not ok", async () => {
      mockMswServer.use(
        http.get("/api/v1/filemanager/folders", () => new HttpResponse(null, { status: 401 }))
      );

      await expect(filemanagerService.getAllFolders()).rejects.toThrow();
    });
  });

  describe("getRecentUpload", () => {
    it("should return the response data on success", async () => {
      const mockData = { code: "SUCCESS", message: "ok", data: null };
      mockMswServer.use(
        http.get("/api/v1/filemanager/recent_upload", () => HttpResponse.json(mockData))
      );

      const result = await filemanagerService.getRecentUpload();

      expect(result).toEqual(mockData);
    });

    it("should throw when the response is not ok", async () => {
      mockMswServer.use(
        http.get("/api/v1/filemanager/recent_upload", () => new HttpResponse(null, { status: 500 }))
      );

      await expect(filemanagerService.getRecentUpload()).rejects.toThrow();
    });
  });

  describe("getSpaceUsed", () => {
    it("should return the response data on success", async () => {
      const mockData = { code: "SUCCESS", message: "ok", data: {} };
      mockMswServer.use(
        http.get("/api/v1/filemanager/space_used", () => HttpResponse.json(mockData))
      );

      const result = await filemanagerService.getSpaceUsed();

      expect(result).toEqual(mockData);
    });

    it("should throw when the response is not ok", async () => {
      mockMswServer.use(
        http.get("/api/v1/filemanager/space_used", () => new HttpResponse(null, { status: 500 }))
      );

      await expect(filemanagerService.getSpaceUsed()).rejects.toThrow();
    });
  });

  describe("upload", () => {
    it("should return the response data on success", async () => {
      const mockData = { code: "SUCCESS", message: "ok", data: {} };
      mockMswServer.use(http.post("/api/v1/filemanager/upload", () => HttpResponse.json(mockData)));
      const formData = new FormData();
      formData.append("path", "/docs");
      formData.append("file", new File(["content"], "photo.png"));

      const result = await filemanagerService.upload(formData);

      expect(result).toEqual(mockData);
    });

    it("should throw when the upload fails", async () => {
      mockMswServer.use(
        http.post("/api/v1/filemanager/upload", () => new HttpResponse(null, { status: 400 }))
      );
      const formData = new FormData();
      formData.append("path", "/docs");
      formData.append("file", new File(["content"], "photo.png"));

      await expect(filemanagerService.upload(formData)).rejects.toThrow();
    });
  });
});
