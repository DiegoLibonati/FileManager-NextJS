import { FileManagerController } from "@/server/controllers/filemanager.controller";

export function GET(): Response {
  return FileManagerController.getCategories();
}

export const dynamic = "force-dynamic";
