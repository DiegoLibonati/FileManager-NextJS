import { z } from "zod";

export const pathQuerySchema = z.object({
  path: z.string().min(1),
});

export const createFolderBodySchema = z.object({
  path: z.string().trim().min(1),
});

export const deleteItemQuerySchema = z.object({
  path: z.string().min(1),
  type: z.string().min(1),
});

export const categoryFilesQuerySchema = z.object({
  category: z.string().min(1),
});
