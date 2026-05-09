import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { RequestPayload } from "@/types/payloads";

import { FileManagerService } from "@/server/services/filemanager.service";

import { getExceptionMessage } from "@/server/helpers/get_exception_message.helper";
import { getPayload } from "@/server/helpers/get_payload.helper";

import { CODES_ERROR, CODES_SUCCESS } from "@/server/constants/codes.constant";
import { MESSAGES_SUCCESS, MESSAGES_VALIDATION } from "@/server/constants/messages.constant";

export const FileManagerController = {
  async getDirectory(req: NextRequest): Promise<NextResponse> {
    try {
      const dirPath = req.nextUrl.searchParams.get("path");
      if (!dirPath) {
        return NextResponse.json(
          { code: CODES_ERROR.validation, message: MESSAGES_VALIDATION.path },
          { status: 400 }
        );
      }

      const { username } = getPayload(req) as RequestPayload;
      const data = await FileManagerService.getDirectory(username, dirPath);
      return NextResponse.json(
        { code: CODES_SUCCESS.getDirectory, message: MESSAGES_SUCCESS.getDirectory, data },
        { status: 200 }
      );
    } catch (error) {
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status });
    }
  },

  async createFolder(req: NextRequest): Promise<NextResponse> {
    try {
      const body = (await req.json()) as { path?: string };
      const folderPath = body.path?.trim();
      if (!folderPath) {
        return NextResponse.json(
          { code: CODES_ERROR.validation, message: MESSAGES_VALIDATION.path },
          { status: 400 }
        );
      }

      const { username } = getPayload(req) as RequestPayload;
      await FileManagerService.createFolder(username, folderPath);
      return NextResponse.json(
        { code: CODES_SUCCESS.createFolder, message: MESSAGES_SUCCESS.createFolder },
        { status: 201 }
      );
    } catch (error) {
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status });
    }
  },

  async deleteItem(req: NextRequest): Promise<NextResponse> {
    try {
      const itemPath = req.nextUrl.searchParams.get("path");
      const type = req.nextUrl.searchParams.get("type");
      if (!itemPath || !type) {
        return NextResponse.json(
          { code: CODES_ERROR.validation, message: MESSAGES_VALIDATION.pathAndType },
          { status: 400 }
        );
      }

      const { username } = getPayload(req) as RequestPayload;
      await FileManagerService.deleteItem(username, itemPath, type);

      const message =
        type === "folder" ? MESSAGES_SUCCESS.deleteFolder : MESSAGES_SUCCESS.deleteFile;
      return NextResponse.json({ code: CODES_SUCCESS.deleteItem, message }, { status: 200 });
    } catch (error) {
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status });
    }
  },

  getCategories(): NextResponse {
    return NextResponse.json(
      {
        code: CODES_SUCCESS.getCategories,
        message: MESSAGES_SUCCESS.getCategories,
        data: FileManagerService.getCategories(),
      },
      { status: 200 }
    );
  },

  async getCategoryFiles(req: NextRequest): Promise<NextResponse> {
    try {
      const categoryName = req.nextUrl.searchParams.get("category");
      if (!categoryName) {
        return NextResponse.json(
          { code: CODES_ERROR.validation, message: MESSAGES_VALIDATION.categoryName },
          { status: 400 }
        );
      }

      const { username } = getPayload(req) as RequestPayload;
      const result = await FileManagerService.getCategoryFiles(username, categoryName);

      if (!Array.isArray(result)) {
        return NextResponse.json(
          { code: CODES_ERROR.generic, message: result.error },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          code: CODES_SUCCESS.getCategoryFiles,
          message: MESSAGES_SUCCESS.getCategoryFiles,
          data: result,
        },
        { status: 200 }
      );
    } catch (error) {
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status });
    }
  },

  async getAllFolders(req: NextRequest): Promise<NextResponse> {
    try {
      const { username } = getPayload(req) as RequestPayload;
      const data = await FileManagerService.getAllFolders(username);
      return NextResponse.json(
        { code: CODES_SUCCESS.getFolders, message: MESSAGES_SUCCESS.getFolders, data },
        { status: 200 }
      );
    } catch (error) {
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status });
    }
  },

  async getRecentUpload(req: NextRequest): Promise<NextResponse> {
    try {
      const { username } = getPayload(req) as RequestPayload;
      const data = await FileManagerService.getRecentUpload(username);
      return NextResponse.json(
        { code: CODES_SUCCESS.getRecentUpload, message: MESSAGES_SUCCESS.getRecentUpload, data },
        { status: 200 }
      );
    } catch (error) {
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status });
    }
  },

  async getSpaceUsed(req: NextRequest): Promise<NextResponse> {
    try {
      const { username } = getPayload(req) as RequestPayload;
      const data = await FileManagerService.getSpaceUsed(username);
      return NextResponse.json(
        { code: CODES_SUCCESS.getSpaceUsed, message: MESSAGES_SUCCESS.getRecentUpload, data },
        { status: 200 }
      );
    } catch (error) {
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status });
    }
  },

  async upload(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.formData();
      const rawPath = body.get("path");
      const uploadPath = typeof rawPath === "string" ? rawPath.trim() : undefined;
      const file = body.get("file") as File | null;

      if (!uploadPath || !file) {
        return NextResponse.json(
          { code: CODES_ERROR.validation, message: MESSAGES_VALIDATION.pathAndFile },
          { status: 400 }
        );
      }

      const { username } = getPayload(req) as RequestPayload;
      const result = await FileManagerService.upload(username, uploadPath, file);

      if ("error" in result) {
        return NextResponse.json(
          { code: CODES_ERROR.generic, message: result.error },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { code: CODES_SUCCESS.upload, message: MESSAGES_SUCCESS.upload, data: result.recentFile },
        { status: 200 }
      );
    } catch (error) {
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status });
    }
  },
};
