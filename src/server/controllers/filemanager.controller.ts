import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { RequestPayload } from "@/types/api";

import { FileManagerService } from "@/server/services/filemanager.service";

import { getPayload } from "@/server/helpers/get_payload.helper";
import { validateBody, validateQuery } from "@/server/helpers/validate.helper";
import { withErrorHandler } from "@/server/helpers/with_error_handler.helper";

import {
  pathQuerySchema,
  createFolderBodySchema,
  deleteItemQuerySchema,
  categoryFilesQuerySchema,
} from "@/server/schemas/filemanager.schema";

import { BadRequestError } from "@/server/errors/bad_request.error";

import { CODES_ERROR, CODES_SUCCESS } from "@/server/constants/codes.constant";
import { MESSAGES_SUCCESS, MESSAGES_VALIDATION } from "@/server/constants/messages.constant";

export const FileManagerController = {
  getDirectory: withErrorHandler(
    "FileManagerController.getDirectory",
    async (req: NextRequest): Promise<NextResponse> => {
      const { path: dirPath } = validateQuery(req, pathQuerySchema);
      const { username } = getPayload(req) as RequestPayload;
      const data = await FileManagerService.getDirectory(username, dirPath);
      return NextResponse.json(
        { code: CODES_SUCCESS.getDirectory, message: MESSAGES_SUCCESS.getDirectory, data },
        { status: 200 }
      );
    }
  ),

  createFolder: withErrorHandler(
    "FileManagerController.createFolder",
    async (req: NextRequest): Promise<NextResponse> => {
      const { path: folderPath } = await validateBody(req, createFolderBodySchema);
      const { username } = getPayload(req) as RequestPayload;
      await FileManagerService.createFolder(username, folderPath);
      return NextResponse.json(
        { code: CODES_SUCCESS.createFolder, message: MESSAGES_SUCCESS.createFolder },
        { status: 201 }
      );
    }
  ),

  deleteItem: withErrorHandler(
    "FileManagerController.deleteItem",
    async (req: NextRequest): Promise<NextResponse> => {
      const { path: itemPath, type } = validateQuery(req, deleteItemQuerySchema);
      const { username } = getPayload(req) as RequestPayload;
      await FileManagerService.deleteItem(username, itemPath, type);

      const message =
        type === "folder" ? MESSAGES_SUCCESS.deleteFolder : MESSAGES_SUCCESS.deleteFile;
      return NextResponse.json({ code: CODES_SUCCESS.deleteItem, message }, { status: 200 });
    }
  ),

  getCategories: (): NextResponse => {
    return NextResponse.json(
      {
        code: CODES_SUCCESS.getCategories,
        message: MESSAGES_SUCCESS.getCategories,
        data: FileManagerService.getCategories(),
      },
      { status: 200 }
    );
  },

  getCategoryFiles: withErrorHandler(
    "FileManagerController.getCategoryFiles",
    async (req: NextRequest): Promise<NextResponse> => {
      const { category: categoryName } = validateQuery(req, categoryFilesQuerySchema);
      const { username } = getPayload(req) as RequestPayload;
      const result = await FileManagerService.getCategoryFiles(username, categoryName);

      if (!Array.isArray(result)) {
        throw new BadRequestError(CODES_ERROR.generic, result.error);
      }

      return NextResponse.json(
        {
          code: CODES_SUCCESS.getCategoryFiles,
          message: MESSAGES_SUCCESS.getCategoryFiles,
          data: result,
        },
        { status: 200 }
      );
    }
  ),

  getAllFolders: withErrorHandler(
    "FileManagerController.getAllFolders",
    async (req: NextRequest): Promise<NextResponse> => {
      const { username } = getPayload(req) as RequestPayload;
      const data = await FileManagerService.getAllFolders(username);
      return NextResponse.json(
        { code: CODES_SUCCESS.getFolders, message: MESSAGES_SUCCESS.getFolders, data },
        { status: 200 }
      );
    }
  ),

  getRecentUpload: withErrorHandler(
    "FileManagerController.getRecentUpload",
    async (req: NextRequest): Promise<NextResponse> => {
      const { username } = getPayload(req) as RequestPayload;
      const data = await FileManagerService.getRecentUpload(username);
      return NextResponse.json(
        { code: CODES_SUCCESS.getRecentUpload, message: MESSAGES_SUCCESS.getRecentUpload, data },
        { status: 200 }
      );
    }
  ),

  getSpaceUsed: withErrorHandler(
    "FileManagerController.getSpaceUsed",
    async (req: NextRequest): Promise<NextResponse> => {
      const { username } = getPayload(req) as RequestPayload;
      const data = await FileManagerService.getSpaceUsed(username);
      return NextResponse.json(
        { code: CODES_SUCCESS.getSpaceUsed, message: MESSAGES_SUCCESS.getSpaceUsed, data },
        { status: 200 }
      );
    }
  ),

  upload: withErrorHandler(
    "FileManagerController.upload",
    async (req: NextRequest): Promise<NextResponse> => {
      const body = await req.formData();
      const rawPath = body.get("path");
      const uploadPath = typeof rawPath === "string" ? rawPath.trim() : undefined;
      const file = body.get("file") as File | null;

      if (!uploadPath || !file) {
        throw new BadRequestError(CODES_ERROR.validation, MESSAGES_VALIDATION.pathAndFile);
      }

      const { username } = getPayload(req) as RequestPayload;
      const result = await FileManagerService.upload(username, uploadPath, file);

      if ("error" in result) {
        throw new BadRequestError(CODES_ERROR.generic, result.error);
      }

      return NextResponse.json(
        { code: CODES_SUCCESS.upload, message: MESSAGES_SUCCESS.upload, data: result.recentFile },
        { status: 200 }
      );
    }
  ),
};
