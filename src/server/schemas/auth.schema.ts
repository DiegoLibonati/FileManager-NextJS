import { z } from "zod";

export const loginBodySchema = z.object({
  username: z.string().trim().min(1).max(120),
  password: z.string().min(1).max(128),
});

export const registerBodySchema = z.object({
  username: z.string().trim().min(1).max(120),
  email: z.email().max(254),
  password: z.string().min(1).max(128),
});

export const verifyQuerySchema = z.object({
  id: z.string().min(1),
  username: z.string().min(1),
});

export const resetPasswordBodySchema = z.object({
  id: z.string().trim().min(1),
  username: z.string().trim().min(1).max(120),
  password: z.string().min(1).max(128),
});

export const sendEmailResetBodySchema = z.object({
  email: z.email().max(254),
});
