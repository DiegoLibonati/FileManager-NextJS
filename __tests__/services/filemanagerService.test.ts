import filemanagerService from "@/services/filemanagerService";

import { mockFetchSuccess, mockFetchError } from "@tests/__mocks__/fetch.mock";

describe("filemanagerService", () => {
  describe("getDirectory", () => {
    it("should call the filemanager endpoint with the encoded path", async () => {
      mockFetchSuccess({ code: "SUCCESS", message: "ok", data: [] });

      await filemanagerService.getDirectory("/my folder");

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/v1/filemanager?path=%2Fmy%20folder",
        expect.objectContaining({ credentials: "include" })
      );
    });

    it("should return the response data on success", async () => {
      const mockData = { code: "SUCCESS", message: "ok", data: [{ id: "1" }] };
      mockFetchSuccess(mockData);

      const result = await filemanagerService.getDirectory("/docs");

      expect(result).toEqual(mockData);
    });

    it("should throw when the response is not ok", async () => {
      mockFetchError(401);

      await expect(filemanagerService.getDirectory("/docs")).rejects.toThrow();
    });
  });

  describe("createFolder", () => {
    it("should POST to the filemanager endpoint with the path", async () => {
      mockFetchSuccess({ code: "SUCCESS", message: "Created" });

      await filemanagerService.createFolder("/new-folder");

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/v1/filemanager",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ path: "/new-folder" }),
        })
      );
    });
  });

  describe("deleteItem", () => {
    it("should DELETE with encoded path and type query params", async () => {
      mockFetchSuccess({ code: "SUCCESS", message: "Deleted" });

      await filemanagerService.deleteItem("/docs/file.txt", "file");

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("path=%2Fdocs%2Ffile.txt"),
        expect.objectContaining({ method: "DELETE" })
      );
    });
  });

  describe("getCategories", () => {
    it("should call the categories endpoint", async () => {
      mockFetchSuccess({ code: "SUCCESS", message: "ok", data: [] });

      await filemanagerService.getCategories();

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/v1/filemanager/categories",
        expect.objectContaining({ credentials: "include" })
      );
    });
  });

  describe("getCategoryFiles", () => {
    it("should call the categories/files endpoint with the encoded category", async () => {
      mockFetchSuccess({ code: "SUCCESS", message: "ok", data: [] });

      await filemanagerService.getCategoryFiles("documents");

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/v1/filemanager/categories/files?category=documents",
        expect.anything()
      );
    });
  });

  describe("getAllFolders", () => {
    it("should call the folders endpoint", async () => {
      mockFetchSuccess({ code: "SUCCESS", message: "ok", data: [] });

      await filemanagerService.getAllFolders();

      expect(global.fetch).toHaveBeenCalledWith("/api/v1/filemanager/folders", expect.anything());
    });
  });

  describe("getRecentUpload", () => {
    it("should call the recent_upload endpoint", async () => {
      mockFetchSuccess({ code: "SUCCESS", message: "ok", data: null });

      await filemanagerService.getRecentUpload();

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/v1/filemanager/recent_upload",
        expect.anything()
      );
    });
  });

  describe("getSpaceUsed", () => {
    it("should call the space_used endpoint", async () => {
      mockFetchSuccess({ code: "SUCCESS", message: "ok", data: {} });

      await filemanagerService.getSpaceUsed();

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/v1/filemanager/space_used",
        expect.anything()
      );
    });
  });

  describe("upload", () => {
    it("should POST the form data to the upload endpoint", async () => {
      mockFetchSuccess({ code: "SUCCESS", message: "ok", data: {} });
      const formData = new FormData();
      formData.append("path", "/docs");
      formData.append("file", new File(["content"], "photo.png"));

      await filemanagerService.upload(formData);

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/v1/filemanager/upload",
        expect.objectContaining({ method: "POST", body: formData })
      );
    });
  });
});
