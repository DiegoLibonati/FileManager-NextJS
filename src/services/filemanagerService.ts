import type { ResponseWithData, DefaultResponse } from "@/types/responses";
import type { FileItem, FolderItem, Category, SpaceUsed } from "@/types/app";

import { throwApiError } from "@/lib/utils";

const BASE = "/api/v1/filemanager";

const filemanagerService = {
  async getDirectory(path: string): Promise<ResponseWithData<(FileItem & FolderItem)[]>> {
    const response = await fetch(`${BASE}?path=${encodeURIComponent(path)}`, {
      credentials: "include",
    });

    if (!response.ok) return throwApiError(response);

    return (await response.json()) as ResponseWithData<(FileItem & FolderItem)[]>;
  },

  async createFolder(path: string): Promise<DefaultResponse> {
    const response = await fetch(BASE, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    });

    if (!response.ok) return throwApiError(response);

    return (await response.json()) as DefaultResponse;
  },

  async deleteItem(path: string, type: string): Promise<DefaultResponse> {
    const response = await fetch(
      `${BASE}?path=${encodeURIComponent(path)}&type=${encodeURIComponent(type)}`,
      { method: "DELETE", credentials: "include" }
    );

    if (!response.ok) return throwApiError(response);

    return (await response.json()) as DefaultResponse;
  },

  async getCategories(): Promise<ResponseWithData<Category[]>> {
    const response = await fetch(`${BASE}/categories`, { credentials: "include" });

    if (!response.ok) return throwApiError(response);

    return (await response.json()) as ResponseWithData<Category[]>;
  },

  async getCategoryFiles(category: string): Promise<ResponseWithData<FileItem[]>> {
    const response = await fetch(
      `${BASE}/categories/files?category=${encodeURIComponent(category)}`,
      { credentials: "include" }
    );

    if (!response.ok) return throwApiError(response);

    return (await response.json()) as ResponseWithData<FileItem[]>;
  },

  async getAllFolders(): Promise<ResponseWithData<FolderItem[]>> {
    const response = await fetch(`${BASE}/folders`, { credentials: "include" });

    if (!response.ok) return throwApiError(response);

    return (await response.json()) as ResponseWithData<FolderItem[]>;
  },

  async getRecentUpload(): Promise<ResponseWithData<FileItem | null>> {
    const response = await fetch(`${BASE}/recent_upload`, { credentials: "include" });

    if (!response.ok) return throwApiError(response);

    return (await response.json()) as ResponseWithData<FileItem>;
  },

  async getSpaceUsed(): Promise<ResponseWithData<SpaceUsed>> {
    const response = await fetch(`${BASE}/space_used`, { credentials: "include" });

    if (!response.ok) return throwApiError(response);

    return (await response.json()) as ResponseWithData<SpaceUsed>;
  },

  async upload(form: FormData): Promise<ResponseWithData<FileItem>> {
    const response = await fetch(`${BASE}/upload`, {
      method: "POST",
      credentials: "include",
      body: form,
    });

    if (!response.ok) return throwApiError(response);

    return (await response.json()) as ResponseWithData<FileItem>;
  },
};

export default filemanagerService;
