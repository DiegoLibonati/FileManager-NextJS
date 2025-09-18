import { model, models, Schema } from "mongoose";

import { IFile } from "@src/app/lib/entities";

const RecentFileSchema = new Schema<IFile>(
  {
    filename: String,
    extension: String,
    path: String,
    size: String,
    uploader: String,
    idCategory: String,
    bgColor: String,
    color: String,
    type: String,
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_, ret) => {
        const { _id, ...rest } = ret;
        return rest;
      },
    },
  }
);

const RecentFile = models.RecentFile || model("RecentFile", RecentFileSchema);
export default RecentFile;
