import { Types } from "mongoose";

export const idToString = (id: unknown): string => {
  if (id instanceof Types.ObjectId) return id.toHexString();
  return String(id);
};
