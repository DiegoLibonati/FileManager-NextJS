import type { HydratedDocument } from "mongoose";
import type { IRecentFileDoc } from "@/types/api";
import type { RecentFileCreatePayload } from "@/types/api";

import { connectDb } from "@/server/configs/mongo.config";

import { RecentFileModel } from "@/server/models/recent_file.model";

export const RecentFileDAO = {
  async findByUploader(uploader: string): Promise<HydratedDocument<IRecentFileDoc> | null> {
    await connectDb();
    return RecentFileModel.findOne({ uploader });
  },

  async create(data: RecentFileCreatePayload): Promise<HydratedDocument<IRecentFileDoc>> {
    await connectDb();
    return RecentFileModel.create(data);
  },

  async deleteByUploader(uploader: string): Promise<void> {
    await connectDb();
    await RecentFileModel.deleteOne({ uploader });
  },

  async deleteByUploaderAndPath(uploader: string, path: string): Promise<void> {
    await connectDb();
    await RecentFileModel.deleteOne({ uploader, path });
  },
};
