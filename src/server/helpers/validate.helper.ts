import type { ZodError, ZodType } from "zod";
import type { NextRequest } from "next/server";

import { BadRequestError } from "@/server/errors/bad_request.error";

import { CODES_ERROR } from "@/server/constants/codes.constant";
import { MESSAGES_ERROR } from "@/server/constants/messages.constant";

const toBadRequest = (err: ZodError): BadRequestError => {
  const issue = err.issues[0];
  if (!issue) return new BadRequestError(CODES_ERROR.validation, MESSAGES_ERROR.validation);

  const path = issue.path.length ? issue.path.join(".") : null;
  const message = path ? `${path}: ${issue.message}` : issue.message;
  return new BadRequestError(CODES_ERROR.validation, message);
};

export const validateBody = async <T>(req: Request, schema: ZodType<T>): Promise<T> => {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    throw new BadRequestError(CODES_ERROR.malformedBody, MESSAGES_ERROR.malformedBody);
  }
  const result = schema.safeParse(raw);
  if (!result.success) throw toBadRequest(result.error);
  return result.data;
};

export const validateParams = <T>(raw: unknown, schema: ZodType<T>): T => {
  const result = schema.safeParse(raw);
  if (!result.success) throw toBadRequest(result.error);
  return result.data;
};

export const validateQuery = <T>(req: NextRequest, schema: ZodType<T>): T => {
  const raw = Object.fromEntries(req.nextUrl.searchParams.entries());
  const result = schema.safeParse(raw);
  if (!result.success) throw toBadRequest(result.error);
  return result.data;
};
