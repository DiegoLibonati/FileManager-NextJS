import type { z } from "zod";
import type {
  loginBodySchema,
  registerBodySchema,
  verifyQuerySchema,
  resetPasswordBodySchema,
  sendEmailResetBodySchema,
} from "@/server/schemas/auth.schema";
import type {
  pathQuerySchema,
  createFolderBodySchema,
  deleteItemQuerySchema,
  categoryFilesQuerySchema,
} from "@/server/schemas/filemanager.schema";
import type { changePlanQuerySchema } from "@/server/schemas/user.schema";

export type LoginBody = z.infer<typeof loginBodySchema>;
export type RegisterBody = z.infer<typeof registerBodySchema>;
export type VerifyQuery = z.infer<typeof verifyQuerySchema>;
export type ResetPasswordBody = z.infer<typeof resetPasswordBodySchema>;
export type SendEmailResetBody = z.infer<typeof sendEmailResetBodySchema>;

export type PathQuery = z.infer<typeof pathQuerySchema>;
export type CreateFolderBody = z.infer<typeof createFolderBodySchema>;
export type DeleteItemQuery = z.infer<typeof deleteItemQuerySchema>;
export type CategoryFilesQuery = z.infer<typeof categoryFilesQuerySchema>;

export type ChangePlanQuery = z.infer<typeof changePlanQuerySchema>;
