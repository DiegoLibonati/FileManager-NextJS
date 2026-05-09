/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";

import { FileManagerController } from "@/server/controllers/filemanager.controller";

import { GET as fmGET, POST as fmPOST, DELETE as fmDELETE } from "@/app/api/v1/filemanager/route";
import { GET as categoriesGET } from "@/app/api/v1/filemanager/categories/route";
import { GET as categoryFilesGET } from "@/app/api/v1/filemanager/categories/files/route";
import { GET as foldersGET } from "@/app/api/v1/filemanager/folders/route";
import { GET as recentUploadGET } from "@/app/api/v1/filemanager/recent_upload/route";
import { GET as spaceUsedGET } from "@/app/api/v1/filemanager/space_used/route";
import { POST as uploadPOST } from "@/app/api/v1/filemanager/upload/route";

jest.mock("@/server/controllers/filemanager.controller", () => ({
  FileManagerController: {
    getDirectory: jest.fn().mockResolvedValue(new Response("{}", { status: 200 })),
    createFolder: jest.fn().mockResolvedValue(new Response("{}", { status: 200 })),
    deleteItem: jest.fn().mockResolvedValue(new Response("{}", { status: 200 })),
    getCategories: jest.fn().mockResolvedValue(new Response("{}", { status: 200 })),
    getCategoryFiles: jest.fn().mockResolvedValue(new Response("{}", { status: 200 })),
    getAllFolders: jest.fn().mockResolvedValue(new Response("{}", { status: 200 })),
    getRecentUpload: jest.fn().mockResolvedValue(new Response("{}", { status: 200 })),
    getSpaceUsed: jest.fn().mockResolvedValue(new Response("{}", { status: 200 })),
    upload: jest.fn().mockResolvedValue(new Response("{}", { status: 200 })),
  },
}));

const okResponse = (): Response => new Response("{}", { status: 200 });

const req = (): NextRequest => new NextRequest("http://localhost/api/v1/filemanager");

beforeEach(() => {
  (FileManagerController.getDirectory as jest.Mock).mockResolvedValue(okResponse());
  (FileManagerController.createFolder as jest.Mock).mockResolvedValue(okResponse());
  (FileManagerController.deleteItem as jest.Mock).mockResolvedValue(okResponse());
  (FileManagerController.getCategories as jest.Mock).mockResolvedValue(okResponse());
  (FileManagerController.getCategoryFiles as jest.Mock).mockResolvedValue(okResponse());
  (FileManagerController.getAllFolders as jest.Mock).mockResolvedValue(okResponse());
  (FileManagerController.getRecentUpload as jest.Mock).mockResolvedValue(okResponse());
  (FileManagerController.getSpaceUsed as jest.Mock).mockResolvedValue(okResponse());
  (FileManagerController.upload as jest.Mock).mockResolvedValue(okResponse());
});

describe("FileManager route handlers", () => {
  it("GET /filemanager should delegate to getDirectory", async () => {
    const request = req();
    await fmGET(request);

    expect(FileManagerController.getDirectory).toHaveBeenCalledWith(request);
  });

  it("POST /filemanager should delegate to createFolder", async () => {
    const request = req();
    await fmPOST(request);

    expect(FileManagerController.createFolder).toHaveBeenCalledWith(request);
  });

  it("DELETE /filemanager should delegate to deleteItem", async () => {
    const request = req();
    await fmDELETE(request);

    expect(FileManagerController.deleteItem).toHaveBeenCalledWith(request);
  });

  it("GET /filemanager/categories should delegate to getCategories", () => {
    categoriesGET();

    expect(FileManagerController.getCategories).toHaveBeenCalled();
  });

  it("GET /filemanager/categories/files should delegate to getCategoryFiles", async () => {
    const request = req();
    await categoryFilesGET(request);

    expect(FileManagerController.getCategoryFiles).toHaveBeenCalledWith(request);
  });

  it("GET /filemanager/folders should delegate to getAllFolders", async () => {
    const request = req();
    await foldersGET(request);

    expect(FileManagerController.getAllFolders).toHaveBeenCalledWith(request);
  });

  it("GET /filemanager/recent_upload should delegate to getRecentUpload", async () => {
    const request = req();
    await recentUploadGET(request);

    expect(FileManagerController.getRecentUpload).toHaveBeenCalledWith(request);
  });

  it("GET /filemanager/space_used should delegate to getSpaceUsed", async () => {
    const request = req();
    await spaceUsedGET(request);

    expect(FileManagerController.getSpaceUsed).toHaveBeenCalledWith(request);
  });

  it("POST /filemanager/upload should delegate to upload", async () => {
    const request = req();
    await uploadPOST(request);

    expect(FileManagerController.upload).toHaveBeenCalledWith(request);
  });
});
