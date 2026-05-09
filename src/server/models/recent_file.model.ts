import mongoose, { Schema } from "mongoose";

import type { IRecentFileDoc } from "@/types/api";

const recentFileSchema = new Schema<IRecentFileDoc>(
  {
    filename: { type: String, required: true },
    extension: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    uploader: { type: String, required: true },
    idCategory: { type: String, required: true },
    bgColor: { type: String, required: true },
    color: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

export const RecentFileModel =
  (mongoose.models.RecentFile as mongoose.Model<IRecentFileDoc> | undefined) ??
  mongoose.model<IRecentFileDoc>("RecentFile", recentFileSchema);
