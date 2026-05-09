import mongoose, { Schema } from "mongoose";

import type { IUserDoc } from "@/types/api";

const userSchema = new Schema<IUserDoc>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    plan: { type: String, default: "0" },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserModel =
  (mongoose.models.User as mongoose.Model<IUserDoc> | undefined) ??
  mongoose.model<IUserDoc>("User", userSchema);
